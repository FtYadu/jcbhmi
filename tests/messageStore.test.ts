import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getMessageStore } from "@/app/api/chat/messageStore";

describe("messageStore", () => {
  it("stores and retrieves messages for a thread", async () => {
    const store = await getMessageStore("test-thread");
    await store.addMessage({ role: "user", content: "hello" });
    const messages = await store.getOpenAICompatibleMessageList();
    assert.equal(messages.length, 1);
    assert.equal((messages[0] as any).content, "hello");
  });
});
