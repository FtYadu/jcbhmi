import OpenAI from "openai";

export type DBMessage = OpenAI.Chat.ChatCompletionMessageParam & {
  id?: string;
};

type MessageStoreDriver = "memory" | "postgres";

const TTL_MS = Number(process.env.MESSAGE_TTL_MS ?? 1000 * 60 * 60 * 24); // default 24h
const DRIVER = (process.env.MESSAGE_STORE_DRIVER as MessageStoreDriver) ?? "memory";

interface MessageStore {
  addMessage: (message: DBMessage) => Promise<void> | void;
  getMessages: () => Promise<DBMessage[]> | DBMessage[];
  getOpenAICompatibleMessageList: (
    prepend?: Pick<DBMessage, "role" | "content">[],
  ) => Promise<DBMessage[]> | DBMessage[];
}

type MemoryRecord = {
  messages: DBMessage[];
  expiresAt: number;
};

const memoryStore: Map<string, MemoryRecord> = new Map();

function getMemoryStore(threadId: string): MessageStore {
  const now = Date.now();
  const existing = memoryStore.get(threadId);
  if (existing && existing.expiresAt < now) {
    memoryStore.delete(threadId);
  }

  if (!memoryStore.has(threadId)) {
    memoryStore.set(threadId, { messages: [], expiresAt: now + TTL_MS });
  }

  const record = memoryStore.get(threadId)!;

  const refreshTtl = () => {
    record.expiresAt = Date.now() + TTL_MS;
  };

  return {
    addMessage: (message: DBMessage) => {
      refreshTtl();
      record.messages.push(message);
    },
    getMessages: () => {
      if (record.expiresAt < Date.now()) {
        memoryStore.delete(threadId);
        return [];
      }
      return record.messages;
    },
    getOpenAICompatibleMessageList: (prepend = []) => {
      const messages = record.messages.filter(Boolean);
      return [...prepend, ...messages].map((m) => {
        const message = { ...m };
        delete message.id;
        return message;
      });
    },
  };
}

type PgPool = {
  query: (...args: unknown[]) => Promise<{ rows: any[] }>;
};

let pgPool: PgPool | null = null;
let ensuredTable = false;

async function getPostgresPool(): Promise<PgPool | null> {
  if (!process.env.DATABASE_URL) return null;

  if (!pgPool) {
    const pg = await import("pg").catch((error) => {
      console.warn(
        "Postgres driver not available; falling back to memory store.",
        error,
      );
      return null;
    });

    if (!pg) return null;

    const { Pool } = pg as unknown as { Pool: new (...args: any[]) => PgPool };
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_SSL === "false"
          ? false
          : { rejectUnauthorized: false },
    });
  }

  if (pgPool && !ensuredTable) {
    ensuredTable = true;
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        thread_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content JSONB NOT NULL,
        message_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_chat_messages_thread_id ON chat_messages(thread_id);
    `);
  }

  return pgPool;
}

function getPostgresStore(threadId: string): MessageStore {
  return {
    addMessage: async (message: DBMessage) => {
      const pool = await getPostgresPool();
      if (!pool) return;
      await pool.query(
        `INSERT INTO chat_messages (thread_id, role, content, message_id) VALUES ($1, $2, $3, $4)`,
        [threadId, message.role, message.content, message.id ?? null],
      );
    },
    getMessages: async () => {
      const pool = await getPostgresPool();
      if (!pool) return [];
      const res = await pool.query(
        `
        SELECT role, content, message_id
        FROM chat_messages
        WHERE thread_id = $1 AND created_at >= NOW() - INTERVAL '${TTL_MS} milliseconds'
        ORDER BY created_at ASC
      `,
        [threadId],
      );
      return res.rows.map((row) => {
        return {
          role: row.role,
          content: row.content,
          id: row.message_id ?? undefined,
        } as DBMessage;
      });
    },
    getOpenAICompatibleMessageList: async (prepend = []) => {
      const messages = await getPostgresStore(threadId).getMessages();
      return [...prepend, ...messages].map((m) => {
        const message = { ...m };
        delete message.id;
        return message;
      });
    },
  };
}

export const getMessageStore = async (id: string): Promise<MessageStore> => {
  if (DRIVER === "postgres") {
    return getPostgresStore(id);
  }

  return getMemoryStore(id);
};
