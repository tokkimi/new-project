import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isVisionConfigured, getVisionClient, parseDataUrl } from "@/lib/vision";
import { buildFaceScanAnalysis, FACE_ZONES, type RawZoneResult } from "@/lib/face-scan-engine";
import { CONCERNS } from "@/lib/validation";

const SEVERITIES = ["low", "medium", "attention"] as const;

const ZONE_SCHEMA = {
  type: "object",
  properties: {
    flagged: {
      type: "boolean",
      description: "Whether this zone shows a visible concern worth flagging.",
    },
    severity: { type: "string", enum: [...SEVERITIES] },
    concern: {
      type: ["string", "null"],
      enum: [...CONCERNS, null],
      description: "The single best-fitting concern if flagged, else null.",
    },
  },
  required: ["flagged", "severity", "concern"],
};

const TOOL = {
  name: "report_face_scan",
  description: "Report the structured visual skin-condition read for each of the 5 face zones.",
  input_schema: {
    type: "object" as const,
    properties: {
      zones: {
        type: "object",
        properties: Object.fromEntries(FACE_ZONES.map((z) => [z, ZONE_SCHEMA])),
        required: [...FACE_ZONES],
      },
    },
    required: ["zones"],
  },
};

const SYSTEM_PROMPT = `You are a visual skincare estimation assistant embedded in a consumer skincare app called Haru. You are shown a user-submitted selfie-style photo. Your job is a general COSMETIC visual read, not a medical or dermatological diagnosis — similar to what a beauty counter consultant might eyeball.

Assess these 5 face zones independently, based ONLY on what is actually visible in this specific photo (lighting, texture, visible pores, shine, redness, dullness, fine lines, blemishes, under-eye area, etc.) — do not default to a generic pattern or assume every zone has an issue:
- forehead
- nose
- cheeks
- underEye (the under-eye area)
- chin (chin and jawline)

For each zone, decide:
- flagged: true only if something is genuinely visible worth noting; most real photos should have some zones flagged and some clear, not all-or-nothing.
- severity: "low" (barely worth mentioning), "medium" (visible, worth addressing), or "attention" (clearly visible, worth prioritizing). Use "low" whenever flagged is false.
- concern: if flagged, pick exactly ONE best-fitting label from this fixed list: ${CONCERNS.join(", ")}. If not flagged, use null.

If the photo doesn't clearly show a face (too blurry, obstructed, not a person), do your best effort from whatever is visible and lean toward flagged: false with severity "low" rather than guessing wildly.

Call the report_face_scan tool with your structured result. Do not include any other commentary.`;

export async function POST(request: Request) {
  const { ok } = rateLimit(clientKey(request, "face-scan-analyze"), {
    limit: 10,
    windowMs: 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  if (!isVisionConfigured()) {
    return NextResponse.json({ error: "vision_not_configured" }, { status: 501 });
  }

  const body = await request.json().catch(() => null);
  const image = typeof body?.image === "string" ? body.image : null;
  if (!image) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const parsed = parseDataUrl(image);
  if (!parsed) {
    return NextResponse.json({ error: "image_too_large_or_invalid" }, { status: 400 });
  }

  try {
    const client = getVisionClient();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "report_face_scan" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: parsed.mediaType as "image/png" | "image/jpeg" | "image/webp",
                data: parsed.base64,
              },
            },
            { type: "text", text: "Analyze this photo for the 5 face zones." },
          ],
        },
      ],
    });

    const toolUse = message.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    const input = toolUse.input as { zones: Record<string, RawZoneResult> };
    const rawZones: RawZoneResult[] = FACE_ZONES.map((id) => ({
      id,
      flagged: !!input.zones[id]?.flagged,
      severity: input.zones[id]?.severity ?? "low",
      concern: input.zones[id]?.concern ?? null,
    }));

    const analysis = buildFaceScanAnalysis(rawZones);
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("face-scan analyze error", error);
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
