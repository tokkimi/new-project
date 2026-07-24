import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasPremiumAccess } from "@/lib/entitlements";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isVisionConfigured, getVisionClient, parseDataUrl } from "@/lib/vision";
import {
  buildFaceScanAnalysis,
  CAPTURE_ISSUES,
  MODULES,
  type CaptureIssue,
  type RawModuleResult,
} from "@/lib/face-scan-engine";

const MODULE_DESCRIPTIONS: Record<string, string> = {
  pores: "visible pore size and density",
  blackheads: "visible blackheads/congestion, mainly around the nose and T-zone",
  wrinkles: "fine lines and wrinkles on facial skin, such as crow's feet or forehead lines",
  redness: "visible redness or reactive-looking facial skin",
  spots: "dark spots, sun spots, or uneven pigmentation on facial skin",
  acne: "active blemishes and inflammation on facial skin",
  acneScars: "post-acne marks or textured scarring on facial skin",
  darkCircles: "under-eye darkness or discoloration",
  texture: "skin texture roughness or unevenness on facial skin",
  oiliness: "visible shine or excess sebum on facial skin",
  dryness: "visible dryness, flaking, or tightness on facial skin",
  sensitivity: "visible signs of a strained or reactive facial skin barrier",
  radiance: "overall glow, luminosity, and evenness of the visible facial skin",
};

const SKIN_TYPES = ["oily", "dry", "combination", "normal", "sensitive"] as const;

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean",
  fr: "French",
  ja: "Japanese",
};

const TOOL = {
  name: "report_face_scan",
  description:
    "Report whether a usable human face photo is present, the capture quality, and if usable, a full facial-skin-only analysis with a confidence and observability flag per zone, plus a medical-referral flag for anything beyond cosmetic concern.",
  input_schema: {
    type: "object" as const,
    properties: {
      faceDetected: {
        type: "boolean",
        description:
          "True only if a real human face is clearly visible in the photo. False for objects, rooms, pets, screenshots, blank/blurry images, or anything that is not a person's face.",
      },
      captureQuality: {
        type: "object",
        description:
          "Objective assessment of whether THIS photo is good enough to read skin reliably, independent of what the skin looks like.",
        properties: {
          usable: {
            type: "boolean",
            description:
              "True if the photo is clear enough (adequate light, in focus, face front-on and large enough, no heavy makeup/filter, no major occlusion) to produce a trustworthy read. False if it is too poor to assess reliably — when false, prefer asking for a better photo over guessing.",
          },
          issues: {
            type: "array",
            description:
              "Every capture problem that is actually present. Empty when the photo is clean.",
            items: {
              type: "string",
              enum: [...CAPTURE_ISSUES],
            },
          },
        },
        required: ["usable", "issues"],
      },
      skinType: {
        type: "string",
        enum: [...SKIN_TYPES],
        description:
          "Overall visible skin type read holistically from facial skin only. Only meaningful when faceDetected is true.",
      },
      summary: {
        type: "string",
        description:
          "2-3 sentences summarizing what is specifically visible on the facial skin in THIS photo. Objective, factual, no cosmetic reassurance, no medical claims. Only meaningful when faceDetected is true. Write in the requested output language.",
      },
      medicalReferral: {
        type: "object",
        description:
          "Flag when the photo shows something that is beyond ordinary cosmetic concern and warrants seeing a dermatologist/doctor (e.g. a changing or irregular mole, an open/bleeding/crusting lesion, a rapidly spreading rash, signs of possible infection). Never diagnose; only advise a professional check.",
        properties: {
          advised: {
            type: "boolean",
            description: "True only if a professional check is genuinely warranted. Default false.",
          },
          reason: {
            type: "string",
            description:
              "If advised is true, one neutral sentence on what to have checked (no diagnosis, no alarm). Write in the requested output language. Empty otherwise.",
          },
        },
        required: ["advised", "reason"],
      },
      modules: {
        type: "object",
        description: "One entry per module. Only meaningful when faceDetected is true.",
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
                confidence: {
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  description:
                    "How reliably you could judge THIS module from THIS photo (0 = cannot tell at all, 1 = perfectly clear). Lower it when the relevant zone is dim, blurred, angled away, covered by makeup/hair, or out of frame.",
                },
                observable: {
                  type: "boolean",
                  description:
                    "False when the zone this module depends on was not actually visible/clear enough to assess in this photo. When false, the score is ignored and no recommendation is made.",
                },
                note: {
                  type: "string",
                  description:
                    "One short specific sentence on what you actually see on facial skin for this module in THIS photo, naming the visible facial zone when relevant. If not observable, say plainly it could not be reliably assessed. Do not mention background, wall, hair, clothes, neck, lips, eyebrows, or image artifacts. Write in the requested output language.",
                },
              },
              required: ["score", "confidence", "observable", "note"],
            },
          ])
        ),
        required: [...MODULES],
      },
    },
    required: ["faceDetected", "captureQuality", "skinType", "summary", "medicalReferral", "modules"],
  },
};

function buildSystemPrompt(localeName: string) {
  return `You are a strict visual skincare estimation assistant embedded in a consumer skincare app called Haru. You are shown a user-submitted photo in ordinary visible light. This is not UV, polarized, medical, or 3D imaging: assess only what is visibly present in this exact photo.

FIRST, decide faceDetected: true only if a real human face is clearly visible and identifiable as a face in the photo. If the photo shows anything else, or if the face is too dark, blurry, cropped, filtered, blocked, or too small to assess, set faceDetected to false. Do not be lenient here; when in doubt, false.

SECOND, assess captureQuality independently of what the skin looks like. Set usable=false when the photo is too poor to read skin reliably, and list every problem actually present in issues: "lighting" (too dark, blown-out, or strong coloured cast), "blur" (motion or focus blur), "angle" (face turned or tilted away, or too far/small), "makeupOrFilter" (visible foundation/heavy makeup or a beauty filter that hides real skin), "occlusion" (hair, hand, mask or object covering skin zones), "resolution" (too low-res/compressed to see texture). A good, clean photo has usable=true and an empty issues list. When usable=false, it is better to ask for a better photo than to guess.

THEN, per module, also report confidence (0-1, how reliably you could judge it from THIS photo) and observable (false when the relevant zone was not actually visible/clear enough). Be honest: dim, blurred, angled, covered or out-of-frame zones get low confidence and observable=false. Never report a confident score for a zone you could not actually see.

Also set medicalReferral.advised=true ONLY if the photo shows something beyond ordinary cosmetic concern that a person should have checked by a professional (e.g. a changing/irregular/bleeding mole, an open or crusting lesion, a rapidly spreading rash, possible infection). If so, give one neutral, non-alarming, non-diagnostic sentence in reason. Otherwise advised=false and reason empty. You never diagnose.

CRITICAL BOUNDARY RULE: score facial skin only. Valid zones are forehead, temples, nose bridge, T-zone, cheeks, under-eyes, jawline, and chin. Completely ignore walls, room background, hair, eyebrows, lashes, lips, teeth, clothing, jewelry, neck, shoulders, hands, lighting reflections outside the face, and compression artifacts. Never score wrinkles, spots, pores, redness, texture, acne, or any other module from anything outside the visible face. If a zone is not visible or reliable enough, say so and give a low score for that module.

If faceDetected is true, your job is a thorough general cosmetic visual read, not a medical or dermatological diagnosis. Work zone by zone before you score anything: deliberately look at the forehead, temples, nose bridge and T-zone, both cheeks, under-eye area, jawline, and chin in turn. Then rate each of these 13 modules independently on a 0-9 severity scale, based ONLY on facial skin that is actually visible in THIS specific photo:
${MODULES.map((m) => `- ${m}: ${MODULE_DESCRIPTIONS[m]}`).join("\n")}

Scoring guide: 0-2 = clear/not notable or not reliably visible, 3-4 = mild, 5-6 = moderate, 7-8 = notable, 9 = severe. Most real photos have a realistic spread across these scores. Do not default every module to the same value, do not assume the worst, and do not invent hidden concerns.

For each module also write a one-sentence note: a specific, concrete observation about what you actually see on the face. Mention the facial zone when localized. If a concern is not visible, say it is not clearly visible in the photo. Do not write positive reassurance for a module that receives a medium or attention score; describe the visible signal objectively.

Also determine the overall skinType (oily, dry, combination, normal, or sensitive) from the whole visible face, and write a 2-3 sentence summary of what is specifically visible in this photo. Keep it objective and specific, with no medical claims and no generic skincare advice.

If faceDetected is false, still fill skinType with "normal", summary with an empty string, and every module's score with 0 and note with an empty string. None of it will be used.

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
      captureQuality?: { usable?: boolean; issues?: string[] };
      skinType?: string;
      summary?: string;
      medicalReferral?: { advised?: boolean; reason?: string };
      modules: Record<string, { score: number; note?: string; confidence?: number; observable?: boolean }>;
    };
    if (!input.faceDetected) {
      return NextResponse.json({ error: "no_face_detected" }, { status: 422 });
    }

    // Reject an unusable photo BEFORE charging a credit — a dark/blurry/filtered
    // shot should cost the user nothing and prompt a retake, not a fake result.
    const rawIssues = Array.isArray(input.captureQuality?.issues) ? input.captureQuality!.issues : [];
    const issues = rawIssues.filter((i): i is CaptureIssue =>
      (CAPTURE_ISSUES as string[]).includes(i)
    );
    if (input.captureQuality && input.captureQuality.usable === false) {
      return NextResponse.json({ error: "low_quality", issues }, { status: 422 });
    }

    const rawModules: RawModuleResult[] = MODULES.map((id) => ({
      id,
      score: Number(input.modules?.[id]?.score ?? 0),
      note: input.modules?.[id]?.note,
      confidence: typeof input.modules?.[id]?.confidence === "number" ? input.modules[id].confidence : 1,
      observable: input.modules?.[id]?.observable ?? true,
    }));

    const skinType = SKIN_TYPES.includes(input.skinType as (typeof SKIN_TYPES)[number])
      ? (input.skinType as (typeof SKIN_TYPES)[number])
      : undefined;

    const analysis = buildFaceScanAnalysis(rawModules, {
      skinType,
      summary: input.summary,
      captureQuality: { usable: true, issues },
      medicalReferral: input.medicalReferral?.advised
        ? { advised: true, reason: input.medicalReferral.reason }
        : { advised: false },
    });

    // Grab the most recent earlier scan BEFORE saving this one, so the result
    // can show an honest same-person before/after comparison.
    const priorScan = await db.faceScanResult.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true, overallScore: true, analysis: true },
    });

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
      const spent = await db.user.updateMany({
        where: { id: user.id, faceScanCredits: { gt: 0 } },
        data: { faceScanCredits: { decrement: 1 } },
      });
      if (spent.count === 0) {
        return NextResponse.json({ error: "payment_required" }, { status: 402 });
      }
    }

    let previous: {
      createdAt: string;
      overallScore: number;
      modules: Array<{ id: string; score: number; observable?: boolean; confidence?: number }>;
    } | null = null;
    if (priorScan) {
      const priorAnalysis = priorScan.analysis as { modules?: Array<{ id: string; score: number; observable?: boolean; confidence?: number }> };
      previous = {
        createdAt: priorScan.createdAt.toISOString(),
        overallScore: priorScan.overallScore,
        modules: Array.isArray(priorAnalysis?.modules)
          ? priorAnalysis.modules.map((m) => ({
              id: m.id,
              score: m.score,
              observable: m.observable,
              confidence: m.confidence,
            }))
          : [],
      };
    }

    return NextResponse.json({ analysis, previous });
  } catch (error) {
    console.error("face-scan analyze error", error);
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
