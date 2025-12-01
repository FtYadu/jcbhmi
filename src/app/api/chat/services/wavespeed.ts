import { createToolErrorMessage } from "../tools/utils/toolErrorHandler";

const WAVESPEED_API_KEY = process.env.WAVESPEED_API_KEY;
const WAVESPEED_BASE_URL =
  process.env.WAVESPEED_BASE_URL ?? "https://api.wavespeed.ai/v1/video";
const WAVESPEED_TIMEOUT_MS = Number(process.env.WAVESPEED_TIMEOUT_MS ?? 30000);

export type WavespeedVideoRequest = {
  prompt: string;
  durationSeconds?: number;
  resolution?: string;
};

export type WavespeedVideoResponse = {
  videoUrl?: string;
  statusUrl?: string;
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

export async function generateWavespeedVideo(
  params: WavespeedVideoRequest,
): Promise<WavespeedVideoResponse> {
  if (!WAVESPEED_API_KEY) {
    return { error: "WAVESPEED_API_KEY is not configured." };
  }

  const payload = {
    prompt: params.prompt,
    duration: params.durationSeconds ?? 5,
    resolution: params.resolution ?? "1080p",
  };

  try {
    const response = await fetchWithTimeout(
      WAVESPEED_BASE_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WAVESPEED_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
      WAVESPEED_TIMEOUT_MS,
    );

    if (!response.ok) {
      const text = await response.text();
      return {
        error: createToolErrorMessage(text, {
          action: "generating video via Wavespeed",
          technicalDetails: true,
        }),
      };
    }

    const data = (await response.json()) as any;
    return {
      videoUrl: data?.videoUrl ?? data?.url,
      statusUrl: data?.statusUrl ?? data?.status,
      raw: data,
    };
  } catch (error) {
    return {
      error: createToolErrorMessage(error, {
        action: "generating video via Wavespeed",
        technicalDetails: true,
        suggestion: "Please try again later or shorten the prompt/duration.",
      }),
    };
  }
}
