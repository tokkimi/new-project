import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  ingredientIds: string[];
  fullIngredients: string;
  origin: string;
  description: string;
  usageSteps: string[];
  officialUrl?: string;
  price: number;
  currency: string;
  skinTypes: string[];
  concerns: string[];
  featured?: boolean;
};

// Researched product data — real products, real actives, real brand HQ.
// imageUrl intentionally omitted: no verified official image URLs were
// confirmed during research, and hotlinking a guessed CDN path is not
// acceptable. Add real photos via the admin once you have licensed/
// official assets.
const PRODUCTS: SeedProduct[] = [
  {
    slug: "cosrx-low-ph-good-morning-gel-cleanser",
    name: "Low pH Good Morning Gel Cleanser",
    brand: "COSRX",
    category: "cleanser",
    ingredientIds: [],
    fullIngredients:
      "Tea tree leaf oil, betaine salicylate, cocamidopropyl betaine, low-pH surfactant base",
    origin: "South Korea",
    description:
      "A low-pH gel cleanser built around tea tree oil and a trace of BHA, designed to clean without stripping the skin barrier — a K-beauty staple for the first AM step.",
    usageSteps: [
      "Massage a small amount onto damp skin",
      "Work into a light lather",
      "Rinse off with lukewarm water",
    ],
    officialUrl: "https://cosrx.com",
    price: 13,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["acne", "barrier"],
    featured: true,
  },
  {
    slug: "cosrx-advanced-snail-96-mucin-power-essence",
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "essence",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Snail secretion filtrate 96.3%, sodium hyaluronate, panthenol, allantoin, arginine, betaine",
    origin: "South Korea",
    description:
      "COSRX's signature snail mucin essence — hydrating, barrier-supportive, and one of the most reviewed K-beauty products worldwide.",
    usageSteps: [
      "Apply after toner/first essence",
      "Pat or press 2-3 drops onto face and neck",
      "Leave on, no rinse — follow with moisturizer",
    ],
    officialUrl: "https://cosrx.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration", "redness", "dullness"],
    featured: true,
  },
  {
    slug: "round-lab-vita-niacinamide-dark-spot-serum",
    name: "Vita Niacinamide Dark Spot Serum",
    brand: "Round Lab",
    category: "serum",
    ingredientIds: ["niacinamide", "vitamin_c"],
    fullIngredients:
      "Niacinamide, 3-O-ethyl ascorbic acid (stabilized vitamin C), seaberry (Hippophae rhamnoides) water/extract",
    origin: "South Korea",
    description:
      "Pairs niacinamide with a stabilized vitamin C derivative to fade dark spots and even tone without the instability of pure L-ascorbic acid.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops onto face",
      "Follow with moisturizer/SPF — best used AM given the vitamin C",
    ],
    officialUrl: "https://roundlab.com",
    price: 20,
    currency: "USD",
    skinTypes: ["normal", "combination"],
    concerns: ["pigmentation", "dullness"],
    featured: true,
  },
  {
    slug: "some-by-mi-retinol-intense-reactivating-serum",
    name: "Retinol Intense Reactivating Serum",
    brand: "Some By Mi",
    category: "serum",
    ingredientIds: ["retinol", "niacinamide"],
    fullIngredients: "Retinal, retinol, bakuchiol, niacinamide, panthenol",
    origin: "South Korea",
    description:
      "A retinal/retinol blend reinforced with bakuchiol (a gentler retinol alternative) for cell turnover and fine lines — a strong evening active, not a beginner product.",
    usageSteps: [
      "PM only — start 2-3x/week to build tolerance",
      "Apply a few drops to clean, dry skin as the last step before moisturizer",
      "Avoid the eye area; always follow with SPF the next morning",
    ],
    price: 20,
    currency: "USD",
    skinTypes: ["normal", "combination"],
    concerns: ["aging", "pores"],
    featured: true,
  },
  {
    slug: "cosrx-bha-blackhead-power-liquid",
    name: "BHA Blackhead Power Liquid",
    brand: "COSRX",
    category: "toner",
    ingredientIds: ["bha", "niacinamide"],
    fullIngredients: "Betaine salicylate 4% (BHA), niacinamide, willow bark water, panthenol",
    origin: "South Korea",
    description:
      "A cult-favorite BHA toner that unclogs pores and smooths texture — start every other day to build tolerance.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat in, leave on",
      "Follow with moisturizer",
    ],
    officialUrl: "https://cosrx.com",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores"],
    featured: true,
  },
  {
    slug: "beauty-of-joseon-green-plum-refreshing-toner",
    name: "Green Plum Refreshing Toner: AHA + BHA",
    brand: "Beauty of Joseon",
    category: "toner",
    ingredientIds: ["aha", "bha"],
    fullIngredients:
      "Glycolic acid 2%, salicylic acid 0.5%, green plum water 25%, mung bean extract 2%",
    origin: "South Korea",
    description:
      "A gentle daily-use AHA/BHA toner — low enough concentration for regular use, but still a real exfoliant to factor into your routine.",
    usageSteps: [
      "Apply after cleansing",
      "Sweep with a cotton pad or pat with hands",
      "Leave on, follow with essence/moisturizer",
    ],
    officialUrl: "https://beautyofjoseon.com",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["dullness", "pores", "pigmentation"],
    featured: true,
  },
  {
    slug: "beauty-of-joseon-dynasty-cream",
    name: "Dynasty Cream",
    brand: "Beauty of Joseon",
    category: "moisturizer",
    ingredientIds: ["niacinamide"],
    fullIngredients: "Rice bran water, ginseng root water, squalane, niacinamide, glycerin",
    origin: "South Korea",
    description:
      "A rich, ginseng-forward moisturizer for barrier repair and a dewy glow — the final leave-on layer of the routine.",
    usageSteps: [
      "Scoop a pea-to-nickel-size amount",
      "Massage in as the final leave-on layer (before sunscreen in AM)",
    ],
    officialUrl: "https://beautyofjoseon.com",
    price: 21,
    currency: "USD",
    skinTypes: ["dry", "normal"],
    concerns: ["hydration", "barrier"],
    featured: true,
  },
  {
    slug: "beauty-of-joseon-relief-sun",
    name: "Relief Sun: Rice + Probiotics SPF50+ PA++++",
    brand: "Beauty of Joseon",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide"],
    fullIngredients:
      "Rice extract 30%, niacinamide, ginseng root extract, green tea extract, probiotic ferment complex, chemical UV filters",
    origin: "South Korea",
    description:
      "The best-selling K-beauty sunscreen — a genuinely comfortable, non-greasy SPF50+ that doubles as the final step of a morning routine.",
    usageSteps: [
      "Apply as the last AM step",
      "Use about two finger-lengths, generously",
      "Reapply every 2 hours during sun exposure",
    ],
    officialUrl: "https://beautyofjoseon.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration", "dullness"],
    featured: true,
  },
  {
    slug: "la-roche-posay-effaclar-duo",
    name: "Effaclar Duo(+) Dual Action Acne Spot Treatment",
    brand: "La Roche-Posay",
    category: "spot",
    ingredientIds: ["benzoyl_peroxide", "niacinamide"],
    fullIngredients: "Micronized benzoyl peroxide 5.5%, lipo-hydroxy acid (LHA), niacinamide",
    origin: "France",
    description:
      "A dermatologist staple: micronized, lower-irritation benzoyl peroxide for acne spot treatment, from one of the largest pharmacy skincare brands.",
    usageSteps: [
      "Apply after cleansing/toning",
      "Apply a thin layer to blemishes or affected areas, 1-2x/day",
      "Leave on — do not rinse",
    ],
    officialUrl: "https://www.laroche-posay.us",
    price: 35,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne"],
    featured: true,
  },
  {
    slug: "klairs-freshly-juiced-vitamin-drop",
    name: "Freshly Juiced Vitamin Drop",
    brand: "Dear, Klairs",
    category: "serum",
    ingredientIds: ["vitamin_c"],
    fullIngredients:
      "Ascorbic acid (pure vitamin C) 5%, centella asiatica extract, citrus/anise/broccoli botanical extracts",
    origin: "South Korea",
    description:
      "A low-strength, sensitive-skin-friendly pure vitamin C serum — a gentler entry point than high-percentage L-ascorbic acid formulas.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Apply a few drops evenly, pat in",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://klairs.com",
    price: 22,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "dry", "combination", "oily"],
    concerns: ["dullness", "pigmentation"],
  },
  {
    slug: "the-ordinary-niacinamide-10-zinc-1",
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    category: "serum",
    ingredientIds: ["niacinamide"],
    fullIngredients: "Niacinamide 10%, zinc PCA 1%",
    origin: "Canada",
    description:
      "The product that made niacinamide mainstream — high concentration, budget price, targets oil and enlarged pores.",
    usageSteps: [
      "Apply after cleansing/toning, AM and/or PM",
      "Apply a few drops to face",
      "Avoid layering directly under pure vitamin C — space them out",
    ],
    officialUrl: "https://theordinary.com",
    price: 10,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "acne", "dullness"],
  },
  {
    slug: "dr-jart-cicapair-color-correcting-treatment",
    name: "Cicapair Tiger Grass Color Correcting Treatment SPF30",
    brand: "Dr. Jart+",
    category: "sunscreen",
    ingredientIds: ["niacinamide", "centella", "spf"],
    fullIngredients:
      "Madecassoside, centella asiatica extract, niacinamide, titanium dioxide/zinc oxide",
    origin: "South Korea",
    description:
      "A green-to-beige color-correcting SPF that calms redness while protecting from UV — a 3-in-1 moisturizer/primer/sunscreen for reactive skin.",
    usageSteps: [
      "Last AM step",
      "Apply evenly over the face — the green tint neutralizes redness as it sets",
      "Leave on as the final layer",
    ],
    officialUrl: "https://drjart.com",
    price: 50,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "combination"],
    concerns: ["redness", "pigmentation"],
  },
  {
    slug: "torriden-dive-in-hyaluronic-acid-serum",
    name: "DIVE-IN Low Molecule Hyaluronic Acid Serum",
    brand: "Torriden",
    category: "serum",
    ingredientIds: ["hyaluronic_acid", "centella"],
    fullIngredients:
      "5 types of hyaluronic acid, panthenol, allantoin, madecassoside, beta-glucan",
    origin: "South Korea",
    description:
      "Five molecular weights of hyaluronic acid for hydration at every skin depth — a lightweight, dedicated hydration serum.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Pat/press a few drops in",
      "Follow immediately with moisturizer to seal in hydration",
    ],
    price: 19,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination", "oily"],
    concerns: ["hydration", "dullness"],
  },
  {
    slug: "tosowoong-copper-peptide-face-serum",
    name: "Copper Peptide Face Serum",
    brand: "TOSOWOONG",
    category: "serum",
    ingredientIds: ["peptides"],
    fullIngredients:
      "Copper tripeptide-1 (GHK-Cu), multi-peptide complex (11+ peptides incl. acetyl hexapeptide-8)",
    origin: "South Korea",
    description:
      "A dedicated copper-peptide serum for firmness and barrier repair — pairs poorly with acidic exfoliants (apply at a different time).",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    price: 21,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "barrier"],
  },
  {
    slug: "isntree-tw-real-eye-cream",
    name: "TW-Real Eye Cream",
    brand: "ISNTREE",
    category: "eye",
    ingredientIds: ["niacinamide", "ceramides"],
    fullIngredients:
      "Adenosine, 4 peptides, 61% bifida ferment lysate, ceramide, niacinamide",
    origin: "South Korea",
    description:
      "A peptide-and-ceramide eye cream for fine lines and puffiness, gentle enough for the delicate orbital area.",
    usageSteps: [
      "Last step, AM & PM",
      "Dot a small amount around the orbital bone with your ring finger",
      "Gently pat/tap in — avoid direct contact with the eyes",
    ],
    price: 18,
    currency: "USD",
    skinTypes: ["normal", "dry"],
    concerns: ["aging"],
  },
  {
    slug: "isntree-hyaluronic-acid-watery-sun-gel",
    name: "Hyaluronic Acid Watery Sun Gel SPF50+ PA++++",
    brand: "ISNTREE",
    category: "sunscreen",
    ingredientIds: ["hyaluronic_acid", "niacinamide", "centella", "spf"],
    fullIngredients: "Niacinamide, multiple hyaluronic acid types, centella asiatica extract",
    origin: "South Korea",
    description:
      "A watery, hydrating sunscreen with hyaluronic acid and centella baked in — a favorite for dehydrated or combination skin.",
    usageSteps: ["Last AM step", "Apply generously as the final layer", "Reapply every 2 hours in the sun"],
    price: 19,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["hydration"],
  },
  {
    slug: "medicube-zero-pore-pad-2",
    name: "Zero Pore Pad 2.0",
    brand: "Medicube",
    category: "toner",
    ingredientIds: ["bha", "aha"],
    fullIngredients: "Salicylic acid (BHA), lactic acid (AHA), panthenol, allantoin",
    origin: "South Korea",
    description:
      "Textured exfoliating toner pads for pore care — one side textured for gentle physical buffing, the other smooth for product application.",
    usageSteps: [
      "After cleansing, wipe the textured side over the face",
      "Follow with the smooth side",
      "Leave on, continue with the rest of your routine",
    ],
    officialUrl: "https://medicube.us",
    price: 26,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "acne"],
  },
  {
    slug: "medicube-deep-vita-a-retinol-serum",
    name: "Deep Vita A Retinol Serum",
    brand: "Medicube",
    category: "serum",
    ingredientIds: ["retinol"],
    fullIngredients: "Hydroxypinacolone retinoate (HPR, 4th-gen retinoid ester), soothing complex",
    origin: "South Korea",
    description:
      "Uses HPR, a gentler retinoid ester, instead of classic retinol — aims for similar results with less irritation.",
    usageSteps: [
      "PM step, as the last layer before moisturizer",
      "Apply a few drops",
      "Always follow with SPF the next morning",
    ],
    officialUrl: "https://medicube.us",
    price: 34,
    currency: "USD",
    skinTypes: ["normal", "combination"],
    concerns: ["aging"],
  },
  {
    slug: "anua-heartleaf-77-soothing-toner",
    name: "Heartleaf 77% Soothing Toner",
    brand: "Anua",
    category: "toner",
    ingredientIds: ["centella"],
    fullIngredients: "Houttuynia cordata (heartleaf) extract 77%, panthenol, centella asiatica extract",
    origin: "South Korea",
    description:
      "Anua's breakout product — a heartleaf-forward calming toner that can be layered 2-3x for redness-prone or oily, irritated skin.",
    usageSteps: [
      "After cleansing",
      "Sweep with a cotton pad or pat with hands, layer 2-3x if desired",
      "Leave on, follow with serum/moisturizer",
    ],
    officialUrl: "https://anua.com",
    price: 18,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "combination"],
    concerns: ["redness", "acne"],
  },
  {
    slug: "aestura-atobarrier-365-cream",
    name: "ATOBARRIER365 Cream",
    brand: "Aestura",
    category: "moisturizer",
    ingredientIds: ["ceramides", "niacinamide"],
    fullIngredients: "High-density ceramide capsules, niacinamide, phytosphingosine, squalane",
    origin: "South Korea",
    description:
      "A dermocosmetic barrier-repair cream built around ceramide capsules — developed with a compromised-barrier/atopic-skin focus.",
    usageSteps: ["Last leave-on layer, AM/PM", "Apply generously over face and neck", "Massage in"],
    price: 24,
    currency: "USD",
    skinTypes: ["dry", "sensitive"],
    concerns: ["barrier", "redness", "hydration"],
  },
  {
    slug: "purito-wonder-releaf-centella-serum-unscented",
    name: "Wonder Releaf Centella Serum (Unscented)",
    brand: "PURITO SEOUL",
    category: "serum",
    ingredientIds: ["centella", "niacinamide", "peptides", "ceramides"],
    fullIngredients:
      "Centella asiatica extract 34,860ppm, niacinamide, 4 peptides, ceramide NP",
    origin: "South Korea",
    description:
      "A high-concentration centella serum in a fragrance-free formula, aimed squarely at redness and barrier repair for reactive skin.",
    usageSteps: ["Apply after toner", "Apply a few drops, pat in", "Follow with moisturizer"],
    officialUrl: "https://purito.com",
    price: 21,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "dry", "combination", "oily"],
    concerns: ["redness", "barrier"],
  },
  {
    slug: "purito-plainet-squalane-oil-100",
    name: "Plainet Squalane Oil 100",
    brand: "PURITO SEOUL",
    category: "oil",
    ingredientIds: [],
    fullIngredients: "100% squalane (sugarcane-derived)",
    origin: "South Korea",
    description:
      "A single-ingredient squalane oil — an occlusive final step or a booster mixed into moisturizer/foundation.",
    usageSteps: [
      "Final AM/PM step, or mix into moisturizer",
      "Press 2-3 drops onto the face",
      "Can be layered over moisturizer to seal in hydration",
    ],
    officialUrl: "https://purito.com",
    price: 16,
    currency: "USD",
    skinTypes: ["dry", "normal", "sensitive"],
    concerns: ["hydration", "dullness"],
  },
];

async function main() {
  for (const p of PRODUCTS) {
    await db.product.upsert({
      where: { slug: p.slug },
      create: { ...p },
      update: { ...p },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
