import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import type { JSONSchema } from "openai/lib/jsonschema.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { generateWavespeedVideo } from "../services/wavespeed";

export const wavespeedVideoTool: RunnableToolFunctionWithParse<{
  prompt: string;
  durationSeconds?: number;
  resolution?: string;
}> = {
  type: "function",
  function: {
    name: "generate_wavespeed_video",
    description:
      "Generate a short video using Wavespeed. Provide a prompt, optional duration (seconds), and resolution (e.g., 1080p).",
    parse: JSON.parse,
    parameters: zodToJsonSchema(
      z.object({
        prompt: z.string().min(1, "Prompt required"),
        durationSeconds: z
          .number()
          .int()
          .positive()
          .max(30)
          .optional()
          .describe("Duration in seconds (max 30)"),
        resolution: z.string().optional().describe("Resolution, e.g., 1080p"),
      }),
    ) as JSONSchema,
    function: async ({
      prompt,
      durationSeconds,
      resolution,
    }: {
      prompt: string;
      durationSeconds?: number;
      resolution?: string;
    }) => {
      const result = await generateWavespeedVideo({
        prompt,
        durationSeconds,
        resolution,
      });
      return JSON.stringify(result);
    },
    strict: true,
  },
};
