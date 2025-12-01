import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";
import { DBMessage, getMessageStore } from "./messageStore";
import { createTools } from "./tools";
import { SYSTEM_PROMPTS } from "./systemPrompts";
import { z } from "zod";

const requestSchema = z.object({
  prompt: z.object({
    role: z.string(),
    content: z.any(),
    id: z.string().optional(),
  }),
  threadId: z.string().min(1, "threadId is required"),
  responseId: z.string().min(1, "responseId is required"),
});

function requireApiKey(req: NextRequest): NextResponse | null {
  const expected = process.env.CHAT_API_KEY;
  if (!expected) return null;

  const headerKey = req.headers.get("x-api-key");
  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = headerKey || bearer;

  if (!provided || provided !== expected) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  return null;
}

export async function POST(req: NextRequest) {
  const authResult = requireApiKey(req);
  if (authResult) return authResult;

  let parsedBody: z.infer<typeof requestSchema>;
  try {
    parsedBody = requestSchema.parse(await req.json());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid request payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { prompt, threadId, responseId } = parsedBody as {
    prompt: DBMessage;
    threadId: string;
    responseId: string;
  };

  if (
    !prompt?.content ||
    (typeof prompt.content === "string" && prompt.content.trim() === "")
  ) {
    return NextResponse.json(
      { error: "Prompt content cannot be empty." },
      { status: 400 },
    );
  }

  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed/",
    apiKey: process.env.THESYS_API_KEY,
  });
  const messageStore = await getMessageStore(threadId);

  await messageStore.addMessage(prompt);

  const messages = await messageStore.getOpenAICompatibleMessageList([
    {
      role: "system",
      content: SYSTEM_PROMPTS,
    },
  ]);

  const model =
    process.env.C1_MODEL ?? "c1/anthropic/claude-sonnet-4/v-20250930";

  const tools = createTools();

  const llmStream = await client.beta.chat.completions.runTools({
    model,
    temperature: 0.8 as unknown as number,
    messages,
    stream: true,
    tool_choice: tools.length > 0 ? "auto" : "none",
    tools,
  });

  const responseStream = transformStream(
    llmStream,
    (chunk) => {
      return chunk.choices?.[0]?.delta?.content ?? "";
    },
    {
      onEnd: ({ accumulated }) => {
        const message = accumulated.filter((message) => {
          return message;
        }).join("");
        Promise.resolve(
          messageStore.addMessage({
            role: "assistant",
            content: message,
            id: responseId,
          }),
        ).catch((error) => {
          console.error("Failed to persist assistant message", error);
        });
      },
    },
  ) as ReadableStream<string>;

  return new NextResponse(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
