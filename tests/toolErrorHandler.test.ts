import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createToolErrorMessage } from "@/app/api/chat/tools/utils/toolErrorHandler";

describe("createToolErrorMessage", () => {
  it("returns a user-friendly message with context", () => {
    const message = createToolErrorMessage(new Error("network timeout"), {
      action: "calling service",
      userFriendlyContext: "for demo",
      technicalDetails: true,
    });

    assert.match(message, /calling service/);
    assert.match(message, /network timeout/);
  });

  it("provides a suggestion for rate limits", () => {
    const message = createToolErrorMessage("429 rate limit", {
      action: "fetching data",
    });
    assert.match(message, /rate limiting/i);
  });
});
