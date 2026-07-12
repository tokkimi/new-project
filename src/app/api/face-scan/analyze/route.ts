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

const SKIN_TYPES = ["oily", "dry", "combination", "normal", "sensitive"] as const;

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean (한국어)",
};

const TOOL = {
  name: "report_face_scan",
  description:
    "Report whether a human face is visible, and if so, a full zone-by-zone skin analysis: overall skin type, a written summary, and a 0-9 severity score plus a short observation note for each module.",
  input_schema: {
    type: "object" as const,
    properties: {
      faceDetected: {
        type: "boolean",
        description:
          "True only if a real human face is clearly visible in the photo. False for objects, rooms, pets, screenshots, blank/blurry images, or anything that isn't a person's face.",
      },
      skinType: {
        type: "string",
        enum: [...SKIN_TYPES],
        description:
          "Overall visible skin type read holistically from the whole face (T-zone shine vs cheeks, visible pore size, flaking, reactivity). Only meaningful when faceDetected is true.",
      },
      summary: {
        type: "string",
        description:
          "2-3 sentences summarizing what is specifically visible in THIS photo (not generic advice). Encouraging, factual, no medical claims. Only meaningful when faceDetected is true. Write in the requested output language.",
      },
      modules: {
        type: "object",
        description:
          "One entry per module. Only meaningful when faceDetected is true.",
        properties: Object.fromEntries(
          MODULES.map((m) => [
            m,
            {
              type: "object",
              properties: {
                score: {
                  type: "integer",
                  minimum: 0,
                  maximum: 9,
                  description: MODULE_DESCRIPTIONS[m],
                },
                note: {
                  type: "string",
                  description:
                    "One short specific sentence on what you actually see for this module in THIS photo, naming the facial zone when relevant (e.g. forehead, temples, nose/T-zone, cheeks, under-eyes, jawline, chin). Write in the requested output language.",
                },
              },
              required: ["score", "note"],
            },
          ])
        ),
        required: [...MODULES],
      },
    },
    required: ["faceDetected", "skinType", "summary", "modules"],
  },
};

function buildSystemPrompt(localeName: string) {
  return `You are a meticulous visual skincare estimation assistant embedded in a consumer skincare app called Haru. You are shown a user-submitted photo, in ordinary visible light (not UV, not polarized, no 3D scan — just what's actually visible in this photo).

FIRST, decide faceDetected: true only if a real human face is clearly visible and identifiable as a face in the photo. If the photo shows anything else — a room, an object, a fireplace, a pet, a screenshot, a blank or overly dark/blurry image, or anything where you cannot actually make out a face — set faceDetected to false. Do not be lenient here; when in doubt, false.

If faceDetected is true, your job is a thorough general COSMETIC visual read, not a medical or dermatological diagnosis. Work zone by zone before you score anything: deliberately look at the forehead, temples, nose bridge and T-zone, both cheeks, under-eye area, jawline, chin, and hairline edge in turn. Then rate each of these 13 modules independently on a 0-9 severity scale, based ONLY on what is actually visible in THIS specific photo:
${MODULES.map((m) => `- ${m}: ${MODULE_DESCRIPTIONS[m]}`).join("\n")}

Scoring guide: 0-2 = clear/not notable, 3-4 = mild, 5-6 = moderate, 7-8 = notable, 9 = severe. Most real photos have a realistic spread across these scores — do not default every module to the same value, and do not assume the worst. Base every score strictly on this photo, not general assumptions about skin.

For each module also write a one-sentence "note": a specific, concrete observation about what you actually see (mention the facial zone when it's localized, e.g. "light shine across the T-zone, cheeks stay matte"), not a generic definition of the module.

Also determine the overall skinType (oily, dry, combination, normal, or sensitive) from the whole face, and write a 2-3 sentence summary of what is specifically visible in this photo — grounded, specific, encouraging tone, no medical claims.

If faceDetected is false, still fill skinType with "normal", summary with an empty string, and every module's score with 0 and note with an empty string — none of it will be used.

Write every piece of text output (summary and all module notes) in ${localeName}.

Call the report_face_scan tool with your result. Do not include any other commentary.`;
}

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
  const locale = typeof body?.locale === "string" ? body.locale : "en";
  const localeName = LOCALE_NAMES[locale] ?? LOCALE_NAMES.en;

  const parsed = parseDataUrl(image);
  if (!parsed) {
    return NextResponse.json({ error: "image_too_large_or_invalid" }, { status: 400 });
  }

  try {
    const client = getVisionClient();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: buildSystemPrompt(localeName),
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

    const input = toolUse.input as {
      faceDetected: boolean;
      skinType?: string;
      summary?: string;
      modules: Record<string, { score: number; note?: string }>;
    };
    if (!input.faceDetected) {
      return NextResponse.json({ error: "no_face_detected" }, { status: 422 });
    }

    const rawModules: RawModuleResult[] = MODULES.map((id) => ({
      id,
      score: Number(input.modules?.[id]?.score ?? 0),
      note: input.modules?.[id]?.note,
    }));

    const skinType = SKIN_TYPES.includes(input.skinType as (typeof SKIN_TYPES)[number])
      ? (input.skinType as (typeof SKIN_TYPES)[number])
      : undefined;

    const analysis = buildFaceScanAnalysis(rawModules, { skinType, summary: input.summary });

    await db.faceScanResult.create({
      data: {
        userId: user.id,
        overallScore: analysis.overallScore,
        skinType: analysis.skinType,
        summary: analysis.summary,
        analysis,
      },
    });

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
