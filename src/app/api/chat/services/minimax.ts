import { createToolErrorMessage } from "../tools/utils/toolErrorHandler";

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const MINIMAX_BASE_URL =
  process.env.MINIMAX_BASE_URL ??
  "https://api.minimax.chat/v1/text_to_image";
const MINIMAX_TIMEOUT_MS = Number(process.env.MINIMAX_TIMEOUT_MS ?? 20000);

export type MinimaxImageRequest = {
  prompt: string;
  size?: string;
  model?: string;
};

export type MinimaxImageResponse = {
  imageUrl?: string;
  base64?: string;
  raw?: unknown;
  error?: string;
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateMinimaxImage(
  params: MinimaxImageRequest,
): Promise<MinimaxImageResponse> {
  if (!MINIMAX_API_KEY) {
    return {
      error: "MINIMAX_API_KEY is not configured.",
    };
  }

  const payload = {
    model: params.model ?? "minimax-image-1",
    prompt: params.prompt,
    size: params.size ?? "1024x1024",
  };

  try {
    const response = await fetchWithTimeout(
      MINIMAX_BASE_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MINIMAX_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
      MINIMAX_TIMEOUT_MS,
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        error: createToolErrorMessage(text, {
          action: "generating image via Minimax",
          technicalDetails: true,
        }),
      };
    }

    const data = (await response.json()) as any;
    const imageUrl = data?.data?.[0]?.url ?? data?.imageUrl ?? data?.output?.[0];
    const base64 = data?.data?.[0]?.b64_json ?? data?.base64;

    return { imageUrl, base64, raw: data };
  } catch (error) {
    return {
      error: createToolErrorMessage(error, {
        action: "generating image via Minimax",
        technicalDetails: true,
        suggestion: "Please try again with a shorter prompt or later.",
      }),
    };
  }
}
