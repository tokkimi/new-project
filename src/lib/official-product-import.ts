import { cleanCatalogProduct, shouldExcludeProduct } from "@/lib/catalog-cleanup";
import type { SeedProduct } from "@/lib/seed-data/products";

export type OfficialProductSource = {
  brand: string;
  baseUrl: string;
  origin: string;
};

export const OFFICIAL_PRODUCT_SOURCES: OfficialProductSource[] = [
  { brand: "COSRX", baseUrl: "https://www.cosrx.com", origin: "South Korea" },
  { brand: "Beauty of Joseon", baseUrl: "https://beautyofjoseon.com", origin: "South Korea" },
  { brand: "SKIN1004", baseUrl: "https://skin1004.com", origin: "South Korea" },
  { brand: "Anua", baseUrl: "https://anua.us", origin: "South Korea" },
  { brand: "Medicube", baseUrl: "https://medicube.us", origin: "South Korea" },
  { brand: "Round Lab", baseUrl: "https://roundlab.com", origin: "South Korea" },
  { brand: "mixsoon", baseUrl: "https://mixsoon.us", origin: "South Korea" },
  { brand: "APRILSKIN", baseUrl: "https://aprilskin.us", origin: "South Korea" },
  { brand: "TOCOBO", baseUrl: "https://tocobo.us", origin: "South Korea" },
  { brand: "AXIS-Y", baseUrl: "https://www.axis-y.com", origin: "South Korea" },
  { brand: "Haruharu Wonder", baseUrl: "https://haruharuusa.com", origin: "South Korea" },
  { brand: "numbuzin", baseUrl: "https://numbuzinus.com", origin: "South Korea" },
  { brand: "NEOGEN", baseUrl: "https://neogenlab.us", origin: "South Korea" },
  { brand: "Then I Met You", baseUrl: "https://thenimetyou.com", origin: "South Korea" },
  { brand: "KraveBeauty", baseUrl: "https://kravebeauty.com", origin: "South Korea" },
  { brand: "Peach & Lily", baseUrl: "https://www.peachandlily.com", origin: "South Korea" },
  { brand: "Glow Recipe", baseUrl: "https://www.glowrecipe.com", origin: "United States" },
  { brand: "Good Molecules", baseUrl: "https://www.goodmolecules.com", origin: "United States" },
  { brand: "Naturium", baseUrl: "https://naturium.com", origin: "United States" },
  { brand: "Cocokind", baseUrl: "https://www.cocokind.com", origin: "United States" },
  { brand: "Versed", baseUrl: "https://versedskin.com", origin: "United States" },
  { brand: "BYOMA", baseUrl: "https://byoma.com", origin: "United Kingdom" },
  { brand: "Bubble", baseUrl: "https://hellobubble.com", origin: "United States" },
  { brand: "INNBEAUTY PROJECT", baseUrl: "https://www.innbeautyproject.com", origin: "United States" },
  { brand: "Topicals", baseUrl: "https://mytopicals.com", origin: "United States" },
  { brand: "Summer Fridays", baseUrl: "https://summerfridays.com", origin: "United States" },
  { brand: "Tower 28", baseUrl: "https://www.tower28beauty.com", origin: "United States" },
  { brand: "Herbivore", baseUrl: "https://www.herbivorebotanicals.com", origin: "United States" },
  { brand: "Biossance", baseUrl: "https://www.biossance.com", origin: "United States" },
  { brand: "Farmacy", baseUrl: "https://www.farmacybeauty.com", origin: "United States" },
  { brand: "Youth To The People", baseUrl: "https://www.youthtothepeople.com", origin: "United States" },
  { brand: "Kopari", baseUrl: "https://koparibeauty.com", origin: "United States" },
  { brand: "OSEA", baseUrl: "https://oseamalibu.com", origin: "United States" },
  { brand: "MARA", baseUrl: "https://themarabeauty.com", origin: "United States" },
  { brand: "Eadem", baseUrl: "https://eadem.co", origin: "United States" },
  { brand: "Dieux", baseUrl: "https://www.dieuxskin.com", origin: "United States" },
  { brand: "Experiment", baseUrl: "https://experimentbeauty.com", origin: "United States" },
  { brand: "Prequel", baseUrl: "https://prequelskin.com", origin: "United States" },
  { brand: "Stratia", baseUrl: "https://www.stratiaskin.com", origin: "United States" },
  { brand: "The Inkey List", baseUrl: "https://www.theinkeylist.com", origin: "United Kingdom" },
  { brand: "PSA", baseUrl: "https://psaskin.com", origin: "Singapore" },
  { brand: "Allies of Skin", baseUrl: "https://us.allies.shop", origin: "Singapore" },
  { brand: "Wishful", baseUrl: "https://wishfulskin.com", origin: "United Arab Emirates" },
  { brand: "Aavrani", baseUrl: "https://aavrani.com", origin: "United States" },
  { brand: "Ranavat", baseUrl: "https://www.ranavat.com", origin: "United States" },
  { brand: "Furtuna Skin", baseUrl: "https://www.furtunaskin.com", origin: "Italy" },
  { brand: "Indie Lee", baseUrl: "https://indielee.com", origin: "United States" },
  { brand: "Pai Skincare", baseUrl: "https://www.paiskincare.us", origin: "United Kingdom" },
  { brand: "REN Clean Skincare", baseUrl: "https://usa.renskincare.com", origin: "United Kingdom" },
  { brand: "Alpha-H", baseUrl: "https://us.alpha-h.com", origin: "Australia" },
  { brand: "Emma Lewisham", baseUrl: "https://emmalewisham.com", origin: "New Zealand" },
  { brand: "Manucurist", baseUrl: "https://us.manucurist.com", origin: "France" },
  { brand: "Typology", baseUrl: "https://us.typology.com", origin: "France" },
];

type ShopifyProduct = {
  title: string;
  handle: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  tags?: string[];
  variants?: Array<{ price?: string }>;
  images?: Array<{ src?: string }>;
};

const CATEGORY_RULES: Array<[string, string]> = [
  ["cleanser|cleansing|wash|foam|balm", "cleanser"],
  ["toner|mist", "toner"],
  ["essence", "essence"],
  ["serum|ampoule|treatment|booster", "serum"],
  ["cream|moisturizer|moisturiser|lotion|gel", "moisturizer"],
  ["sunscreen|sun cream|spf|sun stick", "sunscreen"],
  ["mask|sleeping pack|sheet", "mask"],
  ["eye", "eye"],
  ["oil", "oil"],
  ["exfoliant|peel|aha|bha|pha|pad", "exfoliant"],
];

const INGREDIENT_RULES: Array<[string, string]> = [
  ["niacinamide", "niacinamide"],
  ["hyaluronic|sodium hyaluronate", "hyaluronic_acid"],
  ["retinol|retinal|retinoid", "retinol"],
  ["vitamin c|ascorbic|ascorbyl", "vitamin_c"],
  ["centella|cica|madecassoside|asiatica", "centella"],
  ["ceramide", "ceramides"],
  ["salicylic|bha", "bha"],
  ["glycolic|lactic|mandelic|aha", "aha"],
  ["peptide", "peptides"],
  ["spf|sunscreen|uv filter", "spf"],
];

const SKIN_RULES: Array<[string, string[]]> = [
  ["oily|sebum|pore|acne|blemish", ["oily", "combination"]],
  ["dry|dehydrated|moisture|hydrating|hyaluronic", ["dry", "normal"]],
  ["sensitive|calm|soothing|redness|barrier|cica|centella", ["sensitive", "dry"]],
  ["combination", ["combination"]],
];

const CONCERN_RULES: Array<[string, string]> = [
  ["acne|blemish|breakout", "acne"],
  ["pore|sebum", "pores"],
  ["bright|glow|dull", "dullness"],
  ["dark spot|hyperpigmentation|pigment|tone", "pigmentation"],
  ["redness|calm|soothing|cica|centella", "redness"],
  ["barrier|ceramide|repair", "barrier"],
  ["wrinkle|firm|aging|retinol|peptide", "aging"],
  ["hydrating|moisture|hyaluronic|dehydrated", "hydration"],
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(value = ""): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>|<\/li>|<\/div>|<\/h\d>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractIngredients(text: string): string | null {
  const match = text.match(/(?:ingredients|inci|full ingredients)\s*:?\s*([\s\S]{30,900})/i);
  if (!match) return null;
  return match[1]
    .replace(/\b(?:how to use|directions|usage|benefits|warning|caution)\b[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickCategory(text: string): string {
  for (const [pattern, category] of CATEGORY_RULES) {
    if (new RegExp(pattern, "i").test(text)) return category;
  }
  return "treatment";
}

function pickIngredients(text: string): string[] {
  return INGREDIENT_RULES.filter(([pattern]) => new RegExp(pattern, "i").test(text)).map(([, id]) => id);
}

function pickSkinTypes(text: string): string[] {
  const skinTypes = new Set<string>();
  for (const [pattern, values] of SKIN_RULES) {
    if (new RegExp(pattern, "i").test(text)) values.forEach((value) => skinTypes.add(value));
  }
  if (!skinTypes.size) ["normal", "combination"].forEach((value) => skinTypes.add(value));
  return [...skinTypes];
}

function pickConcerns(text: string): string[] {
  const concerns = new Set<string>();
  for (const [pattern, value] of CONCERN_RULES) {
    if (new RegExp(pattern, "i").test(text)) concerns.add(value);
  }
  if (!concerns.size) concerns.add("hydration");
  return [...concerns];
}

function usageFor(category: string, ingredientIds: string[]): string[] {
  if (category === "sunscreen") {
    return ["Apply as the last morning skincare step", "Use generously on face and neck", "Reapply every 2 hours during sun exposure"];
  }
  if (category === "cleanser") {
    return ["Massage onto damp skin", "Rinse thoroughly with lukewarm water", "Use morning and/or evening"];
  }
  if (category === "exfoliant" || ingredientIds.includes("retinol")) {
    return ["Use in the evening after cleansing", "Start 2-3 times per week, then adjust to tolerance", "Use SPF every morning while using this product"];
  }
  if (category === "toner" || category === "essence") {
    return ["Apply after cleansing", "Pat into skin with hands or a cotton pad", "Follow with serum or moisturizer"];
  }
  if (category === "serum") {
    return ["Apply after toner or essence", "Use 2-3 drops and press into skin", "Follow with moisturizer"];
  }
  if (category === "moisturizer") {
    return ["Apply after serum or treatment", "Smooth evenly over face and neck", "Use morning and/or evening"];
  }
  return ["Apply to clean skin", "Use as directed by the brand", "Follow with moisturizer or SPF when used in the morning"];
}

function isSkincareProduct(product: ShopifyProduct): boolean {
  const text = `${product.title} ${product.product_type ?? ""} ${(product.tags ?? []).join(" ")}`.toLowerCase();
  if (/\b(shampoo|conditioner|fragrance|candle|brush|tool|bag|apparel|hat|shirt|supplement|gummy)\b/.test(text)) return false;
  return /\b(cleanser|cleansing|toner|essence|serum|ampoule|cream|moisturizer|moisturiser|sunscreen|spf|mask|balm|oil|peel|pad|exfoliant|lotion|mist|eye|skin|face|acne|pore|barrier|hydrating|bright)\b/.test(text);
}

export async function fetchOfficialProducts(source: OfficialProductSource, page: number, limit: number): Promise<SeedProduct[]> {
  const base = source.baseUrl.replace(/\/$/, "");
  const response = await fetch(`${base}/products.json?limit=${limit}&page=${page}`, {
    headers: { "user-agent": "Haru Skin official catalog importer" },
    next: { revalidate: 0 },
  });
  if (!response.ok) return [];
  const data = (await response.json()) as { products?: ShopifyProduct[] };
  const products = data.products ?? [];

  return products
    .filter((product) => product.title && product.handle && product.images?.[0]?.src && isSkincareProduct(product))
    .map((product) => {
      const plain = stripHtml(product.body_html);
      const text = `${product.title} ${product.product_type ?? ""} ${(product.tags ?? []).join(" ")} ${plain}`;
      const category = pickCategory(text);
      const ingredientIds = pickIngredients(text);
      const officialUrl = `${base}/products/${product.handle}`;
      const fullIngredients =
        extractIngredients(plain) ??
        `Official product page did not expose a complete INCI list in structured data. Visible official information indicates: ${ingredientIds.length ? ingredientIds.join(", ") : "no specific active detected"}. Verify the complete composition from the official product page or packaging.`;
      const seedProduct: SeedProduct = {
        slug: `official-${slugify(source.brand)}-${slugify(product.handle)}`,
        name: product.title.trim(),
        brand: source.brand,
        category,
        ingredientIds,
        fullIngredients,
        origin: source.origin,
        description: plain.slice(0, 520) || `${source.brand} official skincare product.`,
        usageSteps: usageFor(category, ingredientIds),
        imageUrl: product.images?.[0]?.src,
        officialUrl,
        price: Number(product.variants?.[0]?.price ?? 0) || 0,
        currency: "USD",
        skinTypes: pickSkinTypes(text),
        concerns: pickConcerns(text),
      };
      return cleanCatalogProduct(seedProduct);
    })
    .filter((product) => !shouldExcludeProduct(product));
}
