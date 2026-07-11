import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isVisionConfigured, getVisionClient, parseDataUrl } from "@/lib/vision";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { INGREDIENTS } from "@/data/ingredients";

const TOOL = {
  name: "report_label_read",
  description: "Report what was read off the product packaging/label in the photo.",
  input_schema: {
    type: "object" as const,
    properties: {
      legible: {
        type: "boolean",
        description: "Whether the label was legible enough to extract meaningful info.",
      },
      brand: { type: ["string", "null"], description: "Brand name visible on the packaging." },
      productName: { type: ["string", "null"], description: "Product name visible on the packaging." },
      category: {
        type: ["string", "null"],
        enum: [...PRODUCT_CATEGORIES, null],
        description: "Best-guess product category from the packaging/format.",
      },
      ingredientsText: {
        type: ["string", "null"],
        description:
          "The visible ingredients/INCI list text if shown in the photo, as close to verbatim as legible. Null if no ingredients list is visible in this photo.",
      },
    },
    required: ["legible", "brand", "productName", "category", "ingredientsText"],
  },
};

const SYSTEM_PROMPT = `You are a product-label reading assistant embedded in a consumer skincare app called Haru. You are shown a photo of a skincare product's packaging or ingredients label. Read exactly what's visible — do not invent a brand or product name if it isn't legible. If an ingredients/INCI list is visible in the photo, transcribe it as accurately as you can (it's fine if it's partial). Call the report_label_read tool with your result. Do not include any other commentary.`;

function normalizeWords(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function matchScore(candidateWords: string[], targetWords: string[]): number {
  if (targetWords.length === 0) return 0;
  const set = new Set(candidateWords);
  const overlap = targetWords.filter((w) => set.has(w)).length;
  return overlap / targetWords.length;
}

export async function POST(request: Request) {
  const { ok } = rateLimit(clientKey(request, "scan-analyze"), { limit: 15, windowMs: 60 * 1000 });
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
      tool_choice: { type: "tool", name: "report_label_read" },
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
            { type: "text", text: "Read this product label/packaging photo." },
          ],
        },
      ],
    });

    const toolUse = message.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    const read = toolUse.input as {
      legible: boolean;
      brand: string | null;
      productName: string | null;
      category: string | null;
      ingredientsText: string | null;
    };

    if (!read.legible && !read.brand && !read.productName && !read.ingredientsText) {
      return NextResponse.json({ matched: null, read, detectedIngredientIds: [] });
    }

    // Try to match against the real catalog first.
    const catalog = await db.product.findMany();
    const candidateWords = normalizeWords(`${read.brand ?? ""} ${read.productName ?? ""}`);
    let best: { product: (typeof catalog)[number]; score: number } | null = null;
    for (const product of catalog) {
      const targetWords = normalizeWords(`${product.brand} ${product.name}`);
      const score = matchScore(candidateWords, targetWords);
      if (score >= 0.5 && (!best || score > best.score)) {
        best = { product, score };
      }
    }

    // Detect our tracked actives from any ingredients text we could read,
    // even when the product isn't in our catalog.
    const ingredientsLower = (read.ingredientsText ?? "").toLowerCase();
    const detectedIngredientIds = ingredientsLower
      ? INGREDIENTS.filter((ing) => ing.aliases.some((alias) => ingredientsLower.includes(alias)))
          .map((ing) => ing.id)
      : [];

    return NextResponse.json({
      matched: best?.product ?? null,
      read,
      detectedIngredientIds,
    });
  } catch (error) {
    console.error("scan analyze error", error);
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
