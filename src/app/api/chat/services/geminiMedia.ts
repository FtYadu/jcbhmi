import { GoogleGenAI } from "@google/genai";
import { createToolErrorMessage } from "../tools/utils/toolErrorHandler";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-1.5-pro";
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS ?? 15000);

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

export type GeminiPromptRequest = {
  prompt: string;
  tone?: string;
  format?: string;
};

export type GeminiPromptResponse = {
  prompt: string;
  error?: string;
};

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Timeout exceeded")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

export async function refinePromptWithGemini(
  params: GeminiPromptRequest,
): Promise<GeminiPromptResponse> {
  if (!ai) {
    return { error: "GEMINI_API_KEY is not configured." };
  }

  const prompt = `Rewrite this prompt for media generation. Keep it concise, vivid, and executable. 
Tone: ${params.tone ?? "neutral"}.
Format target: ${params.format ?? "image/video"}.
Prompt: ${params.prompt}`;

  try {
    const result = await withTimeout(
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      }),
      GEMINI_TIMEOUT_MS,
    );

    // @ts-expect-error types from SDK
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return { prompt: text?.trim() || params.prompt };
  } catch (error) {
    return {
      error: createToolErrorMessage(error, {
        action: "refining prompt via Gemini",
        technicalDetails: true,
        suggestion: "Try a shorter prompt or different tone.",
      }),
      prompt: params.prompt,
    };
  }
}
