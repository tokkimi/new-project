import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasPremiumAccess } from "@/lib/entitlements";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isVisionConfigured, getVisionClient, parseDataUrl } from "@/lib/vision";
import { buildFaceScanAnalysis, MODULES, type RawModuleResult } from "@/lib/face-scan-engine";

const MODULE_DESCRIPTIONS: Record<string, string> = {
  pores: "visible pore size and density",
  blackheads: "visible blackheads/congestion, mainly around the nose and T-zone",
  wrinkles: "fine lines and wrinkles (e.g. crow's feet, forehead lines)",
  redness: "visible redness or reactive-looking skin",
  spots: "dark spots, sun spots, or uneven pigmentation",
  acne: "active blemishes and inflammation",
  acneScars: "post-acne marks or textured scarring",
  darkCircles: "under-eye darkness or discoloration",
  texture: "skin texture roughness or unevenness",
  oiliness: "visible shine / excess sebum",
  dryness: "visible dryness, flaking, or tightness",
  sensitivity: "visible signs of a strained/reactive skin barrier",
  radiance: "overall glow, luminosity, and evenness of the skin",
};

const TOOL = {
  name: "report_face_scan",
  description: "Report whether a human face is visible, and if so, a 0-9 severity score for each module.",
  input_schema: {
    type: "object" as const,
    properties: {
      faceDetected: {
        type: "boolean",
        description:
          "True only if a real human face is clearly visible in the photo. False for objects, rooms, pets, screenshots, blank/blurry images, or anything that isn't a person's face.",
      },
      scores: {
        type: "object",
        description: "One integer 0-9 per module key. Only meaningful when faceDetected is true.",
        properties: Object.fromEntries(
          MODULES.map((m) => [
            m,
            { type: "integer", minimum: 0, maximum: 9, description: MODULE_DESCRIPTIONS[m] },
          ])
        ),
        required: [...MODULES],
      },
    },
    required: ["faceDetected", "scores"],
  },
};

const SYSTEM_PROMPT = `You are a visual skincare estimation assistant embedded in a consumer skincare app called Haru. You are shown a user-submitted photo, in ordinary visible light (not UV, not polarized, no 3D scan — just what's actually visible in this photo).

FIRST, decide faceDetected: true only if a real human face is clearly visible and identifiable as a face in the photo. If the photo shows anything else — a room, an object, a fireplace, a pet, a screenshot, a blank or overly dark/blurry image, or anything where you cannot actually make out a face — set faceDetected to false. Do not be lenient here; when in doubt, false.

If faceDetected is true, your job is a general COSMETIC visual read, not a medical or dermatological diagnosis. Rate each of these 13 modules independently on a 0-9 severity scale, based ONLY on what is actually visible in THIS specific photo:
${MODULES.map((m) => `- ${m}: ${MODULE_DESCRIPTIONS[m]}`).join("\n")}

Scoring guide: 0-2 = clear/not notable, 3-4 = mild, 5-6 = moderate, 7-8 = notable, 9 = severe. Most real photos have a realistic spread across these scores — do not default every module to the same value, and do not assume the worst. Base every score strictly on this photo, not general assumptions about skin.

If faceDetected is false, still fill the scores object with all zeros (it will be ignored).

Call the report_face_scan tool with your result. Do not include any other commentary.`;

export async function POST(request: Request) {
  const { ok } = rateLimit(clientKey(request, "face-scan-analyze"), {
    limit: 10,
    windowMs: 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, subscriptionStatus: true, faceScanCredits: true },
  });
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const premium = hasPremiumAccess(user);
  if (!premium && user.faceScanCredits <= 0) {
    return NextResponse.json({ error: "payment_required" }, { status: 402 });
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
            { type: "text", text: "Analyze this photo." },
          ],
        },
      ],
    });

    const toolUse = message.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    const input = toolUse.input as { faceDetected: boolean; scores: Record<string, number> };
    if (!input.faceDetected) {
      return NextResponse.json({ error: "no_face_detected" }, { status: 422 });
    }

    const rawModules: RawModuleResult[] = MODULES.map((id) => ({
      id,
      score: Number(input.scores?.[id] ?? 0),
    }));

    const analysis = buildFaceScanAnalysis(rawModules);

    if (!premium) {
      // Atomic, race-safe decrement: only succeeds if a credit was still there.
      const spent = await db.user.updateMany({
        where: { id: user.id, faceScanCredits: { gt: 0 } },
        data: { faceScanCredits: { decrement: 1 } },
      });
      if (spent.count === 0) {
        return NextResponse.json({ error: "payment_required" }, { status: 402 });
      }
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("face-scan analyze error", error);
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
