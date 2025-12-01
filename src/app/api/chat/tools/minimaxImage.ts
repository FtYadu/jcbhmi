import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import type { JSONSchema } from "openai/lib/jsonschema.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { generateMinimaxImage } from "../services/minimax";

export const minimaxImageTool: RunnableToolFunctionWithParse<{
  prompt: string;
  size?: string;
}> = {
  type: "function",
  function: {
    name: "generate_minimax_image",
    description:
      "Generate an image using Minimax. Provide a concise visual prompt and optional size (e.g., 1024x1024).",
    parse: JSON.parse,
    parameters: zodToJsonSchema(
      z.object({
        prompt: z.string().min(1, "Prompt required"),
        size: z
          .string()
          .optional()
          .describe("Image size in WxH format, e.g., 1024x1024"),
      }),
    ) as JSONSchema,
    function: async ({ prompt, size }: { prompt: string; size?: string }) => {
      const result = await generateMinimaxImage({ prompt, size });
      return JSON.stringify(result);
    },
    strict: true,
  },
};
