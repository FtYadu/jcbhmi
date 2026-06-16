import type {
  RunnableToolFunctionWithParse,
  RunnableToolFunctionWithoutParse,
} from "openai/lib/RunnableFunction.mjs";
import { googleImageTool } from "./tools/googleImage";
import { weatherTool } from "./tools/weather";
import { googleWebSearchTool } from "./tools/webSearchTool";
import { minimaxImageTool } from "./tools/minimaxImage";
import { wavespeedVideoTool } from "./tools/wavespeedVideo";
import { geminiPromptTool } from "./tools/geminiPrompt";

type Tool =
  | RunnableToolFunctionWithoutParse
  // Tools declare their own parsed-argument shapes; `any` keeps the union
  // assignable across those differing shapes (generic parameter is invariant).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | RunnableToolFunctionWithParse<any>;

export const createTools = (options?: {
  writeProgress?: (progress: { title: string; content: string }) => void;
}): Tool[] => {
  const writeProgress =
    options?.writeProgress ??
    (() => {
      return;
    });

  const toolset: Tool[] = [
    googleImageTool,
    weatherTool,
    googleWebSearchTool(writeProgress),
  ];

  if (process.env.MINIMAX_API_KEY) {
    toolset.push(minimaxImageTool);
  }
  if (process.env.WAVESPEED_API_KEY) {
    toolset.push(wavespeedVideoTool);
  }
  if (process.env.GEMINI_API_KEY) {
    toolset.push(geminiPromptTool);
  }

  return toolset;
};
