import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function isVisionConfigured() {
  return !!process.env.ANTHROPIC_API_KEY;
}

export function getVisionClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

// Cost/latency guard, and importantly a platform one: Vercel's default
// serverless request body limit is ~4.5MB, so this must stay comfortably
// under that regardless of per-image cost concerns.
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export function parseDataUrl(dataUrl: string): { mediaType: string; base64: string } | null {
  const match = /^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  const [, mediaType, base64] = match;
  const approxBytes = (base64.length * 3) / 4;
  if (approxBytes > MAX_IMAGE_BYTES) return null;
  return { mediaType: mediaType === "image/jpg" ? "image/jpeg" : mediaType, base64 };
}
