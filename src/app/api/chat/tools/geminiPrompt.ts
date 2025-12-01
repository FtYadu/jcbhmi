import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import type { JSONSchema } from "openai/lib/jsonschema.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { refinePromptWithGemini } from "../services/geminiMedia";

export const geminiPromptTool: RunnableToolFunctionWithParse<{
  prompt: string;
  tone?: string;
  format?: string;
}> = {
  type: "function",
  function: {
    name: "refine_prompt_with_gemini",
    description:
      "Refine a media-generation prompt using Gemini. Useful for improving quality before image/video generation.",
    parse: JSON.parse,
    parameters: zodToJsonSchema(
      z.object({
        prompt: z.string().min(1, "Prompt required"),
        tone: z.string().optional().describe("Tone, e.g., cinematic, playful"),
        format: z
          .string()
          .optional()
          .describe("Target format, e.g., image, video"),
      }),
    ) as JSONSchema,
    function: async ({
      prompt,
      tone,
      format,
    }: {
      prompt: string;
      tone?: string;
      format?: string;
    }) => {
      const result = await refinePromptWithGemini({ prompt, tone, format });
      return JSON.stringify(result);
    },
    strict: true,
  },
};
