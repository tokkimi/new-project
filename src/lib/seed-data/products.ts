import { GENERATED_PRODUCTS } from "./generated-products";

export type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  ingredientIds: string[];
  fullIngredients: string;
  origin: string;
  description: string;
  usageSteps: string[];
  imageUrl?: string;
  officialUrl?: string;
  price: number;
  currency: string;
  skinTypes: string[];
  concerns: string[];
  featured?: boolean;
};

// Researched product data - real products, real actives, real brand HQ.
// imageUrl is included only when it comes from a verified official product page.
// Unknown/unverified images stay null so the UI can fall back to a clean product visual.
const CORE_PRODUCTS: SeedProduct[] = [
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
      "A low-pH gel cleanser built around tea tree oil and a trace of BHA, designed to clean without stripping the skin barrier - a K-beauty staple for the first AM step.",
    usageSteps: [
      "Massage a small amount onto damp skin",
      "Work into a light lather",
      "Rinse off with lukewarm water",
    ],
    imageUrl:
      "https://www.cosrx.com/cdn/shop/files/low-ph-good-morning-gel-cleanser-cosrx-official-1_1200x1200.jpg?v=1768785801",
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
      "COSRX's signature snail mucin essence - hydrating, barrier-supportive, and one of the most reviewed K-beauty products worldwide.",
    usageSteps: [
      "Apply after toner/first essence",
      "Pat or press 2-3 drops onto face and neck",
      "Leave on, no rinse - follow with moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/james_800x1067_1_1_4e9750cc-2cd6-4817-ace5-be2305a85806.jpg?v=1763111577",
    officialUrl: "https://www.cosrx.com/products/advanced-snail-96-mucin-power-essence",
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
      "Follow with moisturizer/SPF - best used AM given the vitamin C",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/240328_roundlab_0182_re2.jpg?v=1772851005",
    officialUrl: "https://roundlab.com/products/vita-niacinamide-dark-spot-serum",
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
      "A retinal/retinol blend reinforced with bakuchiol (a gentler retinol alternative) for cell turnover and fine lines - a strong evening active, not a beginner product.",
    usageSteps: [
      "PM only - start 2-3x/week to build tolerance",
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
    fullIngredients:
      "Betaine salicylate 4% (BHA), niacinamide, willow bark water, panthenol",
    origin: "South Korea",
    description:
      "A cult-favorite BHA toner that unclogs pores and smooths texture - start every other day to build tolerance.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat in, leave on",
      "Follow with moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/bha-blackhead-power-liquid-cosrx-official-1.jpg?v=1689840681",
    officialUrl: "https://www.cosrx.com/products/bha-blackhead-power-liquid",
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
      "A gentle daily-use AHA/BHA toner - low enough concentration for regular use, but still a real exfoliant to factor into your routine.",
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
    fullIngredients:
      "Rice bran water, ginseng root water, squalane, niacinamide, glycerin",
    origin: "South Korea",
    description:
      "A rich, ginseng-forward moisturizer for barrier repair and a dewy glow - the final leave-on layer of the routine.",
    usageSteps: [
      "Scoop a pea-to-nickel-size amount",
      "Massage in as the final leave-on layer (before sunscreen in AM)",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/dynasty-cream-1-front.webp?v=1770618339",
    officialUrl: "https://beautyofjoseon.com/products/dynasty-cream",
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
      "The best-selling K-beauty sunscreen - a genuinely comfortable, non-greasy SPF50+ that doubles as the final step of a morning routine.",
    usageSteps: [
      "Apply as the last AM step",
      "Use about two finger-lengths, generously",
      "Reapply every 2 hours during sun exposure",
    ],
    imageUrl:
      "https://ie.beautyofjoseon.com/cdn/shop/files/02_0330___v2.jpg?v=1774857974",
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
    fullIngredients:
      "Micronized benzoyl peroxide 5.5%, lipo-hydroxy acid (LHA), niacinamide",
    origin: "France",
    description:
      "A dermatologist staple: micronized, lower-irritation benzoyl peroxide for acne spot treatment, from one of the largest pharmacy skincare brands.",
    usageSteps: [
      "Apply after cleansing/toning",
      "Apply a thin layer to blemishes or affected areas, 1-2x/day",
      "Leave on - do not rinse",
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
      "A low-strength, sensitive-skin-friendly pure vitamin C serum - a gentler entry point than high-percentage L-ascorbic acid formulas.",
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
      "The product that made niacinamide mainstream - high concentration, budget price, targets oil and enlarged pores.",
    usageSteps: [
      "Apply after cleansing/toning, AM and/or PM",
      "Apply a few drops to face",
      "Avoid layering directly under pure vitamin C - space them out",
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
      "A green-to-beige color-correcting SPF that calms redness while protecting from UV - a 3-in-1 moisturizer/primer/sunscreen for reactive skin.",
    usageSteps: [
      "Last AM step",
      "Apply evenly over the face - the green tint neutralizes redness as it sets",
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
      "Five molecular weights of hyaluronic acid for hydration at every skin depth - a lightweight, dedicated hydration serum.",
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
      "A dedicated copper-peptide serum for firmness and barrier repair - pairs poorly with acidic exfoliants (apply at a different time).",
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
      "Gently pat/tap in - avoid direct contact with the eyes",
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
    fullIngredients:
      "Niacinamide, multiple hyaluronic acid types, centella asiatica extract",
    origin: "South Korea",
    description:
      "A watery, hydrating sunscreen with hyaluronic acid and centella baked in - a favorite for dehydrated or combination skin.",
    usageSteps: [
      "Last AM step",
      "Apply generously as the final layer",
      "Reapply every 2 hours in the sun",
    ],
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
    fullIngredients:
      "Salicylic acid (BHA), lactic acid (AHA), panthenol, allantoin",
    origin: "South Korea",
    description:
      "Textured exfoliating toner pads for pore care - one side textured for gentle physical buffing, the other smooth for product application.",
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
    fullIngredients:
      "Hydroxypinacolone retinoate (HPR, 4th-gen retinoid ester), soothing complex",
    origin: "South Korea",
    description:
      "Uses HPR, a gentler retinoid ester, instead of classic retinol - aims for similar results with less irritation.",
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
    fullIngredients:
      "Houttuynia cordata (heartleaf) extract 77%, panthenol, centella asiatica extract",
    origin: "South Korea",
    description:
      "Anua's breakout product - a heartleaf-forward calming toner that can be layered 2-3x for redness-prone or oily, irritated skin.",
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
    fullIngredients:
      "High-density ceramide capsules, niacinamide, phytosphingosine, squalane",
    origin: "South Korea",
    description:
      "A dermocosmetic barrier-repair cream built around ceramide capsules - developed with a compromised-barrier/atopic-skin focus.",
    usageSteps: [
      "Last leave-on layer, AM/PM",
      "Apply generously over face and neck",
      "Massage in",
    ],
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
    usageSteps: [
      "Apply after toner",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
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
      "A single-ingredient squalane oil - an occlusive final step or a booster mixed into moisturizer/foundation.",
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
  {
    slug: "cerave-hydrating-facial-cleanser",
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    ingredientIds: ["ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Ceramides (NP, AP, EOP), hyaluronic acid, glycerin, MVE delivery technology",
    origin: "USA",
    description:
      "A non-foaming, dermatologist-developed cleanser that pairs three essential ceramides with hyaluronic acid to remove dirt and makeup without disrupting the skin barrier - a dermatology staple for normal-to-dry and sensitive skin.",
    usageSteps: [
      "Wet face with lukewarm water",
      "Massage gently over face, avoiding harsh rubbing",
      "Rinse thoroughly and pat dry",
    ],
    officialUrl: "https://www.cerave.com",
    price: 14,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "banila-co-clean-it-zero-cleansing-balm-original",
    name: "Clean It Zero Cleansing Balm Original",
    brand: "Banila Co",
    category: "cleanser",
    ingredientIds: ["vitamin_e"],
    fullIngredients:
      "Hot springs water, tocopheryl acetate (vitamin E), acerola fruit extract, botanical ester oil blend",
    origin: "South Korea",
    description:
      "The original balm-to-oil cleanser that popularized double cleansing in K-beauty - melts away makeup and sunscreen without stripping skin, then emulsifies into a milky texture on contact with water.",
    usageSteps: [
      "Scoop a small amount with dry hands onto dry skin",
      "Massage over face to dissolve makeup/sunscreen",
      "Add water to emulsify, then rinse off",
    ],
    officialUrl: "https://banilausa.com",
    price: 21,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["dullness"],
  },
  {
    slug: "cosrx-advanced-snail-peptide-eye-cream",
    name: "Advanced Snail Peptide Eye Cream",
    brand: "COSRX",
    category: "eye",
    ingredientIds: ["hyaluronic_acid", "niacinamide", "peptides"],
    fullIngredients:
      "Snail secretion filtrate 73.7%, niacinamide 2%, 5-peptide complex, adenosine, sodium hyaluronate",
    origin: "South Korea",
    description:
      "Combines COSRX's signature snail mucin with a five-peptide complex and niacinamide to target dark circles, puffiness, and fine lines around the eye area.",
    usageSteps: [
      "Last step, AM & PM",
      "Dot a small amount around the orbital bone",
      "Gently pat in with ring finger until absorbed",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/advanced-snail-peptide-eye-cream-cosrx-official-1.png?v=1724835637",
    officialUrl: "https://www.cosrx.com/products/advanced-snail-peptide-eye-cream",
    price: 28,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "cerave-eye-repair-cream",
    name: "Eye Repair Cream",
    brand: "CeraVe",
    category: "eye",
    ingredientIds: ["ceramides", "hyaluronic_acid", "niacinamide"],
    fullIngredients:
      "Three essential ceramides, hyaluronic acid, niacinamide, marine & botanical complex",
    origin: "USA",
    description:
      "An oil-free, fragrance-free eye cream developed with dermatologists to reduce the look of dark circles and puffiness while reinforcing the skin barrier around the delicate eye area.",
    usageSteps: [
      "Apply AM and/or PM",
      "Dot gently around the orbital bone",
      "Pat in until fully absorbed - avoid direct contact with eyes",
    ],
    officialUrl: "https://www.cerave.com",
    price: 17,
    currency: "USD",
    skinTypes: ["normal", "dry", "sensitive", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "the-ordinary-100-organic-cold-pressed-rose-hip-seed-oil",
    name: "100% Organic Cold-Pressed Rose Hip Seed Oil",
    brand: "The Ordinary",
    category: "oil",
    ingredientIds: [],
    fullIngredients:
      "100% organic, cold-pressed rosehip seed oil (Rosa canina), naturally rich in linoleic and linolenic essential fatty acids",
    origin: "Canada",
    description:
      "A single-ingredient, unrefined rosehip seed oil marketed to help address signs of aging and uneven skin tone through its naturally high essential fatty acid content.",
    usageSteps: [
      "Apply as the final step, AM or PM",
      "Press 2-3 drops between palms and press onto face",
      "Can be mixed into moisturizer for extra nourishment",
    ],
    officialUrl: "https://theordinary.com",
    price: 10,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["aging", "dullness"],
  },
  {
    slug: "sulwhasoo-concentrated-ginseng-renewing-facial-oil",
    name: "Concentrated Ginseng Renewing Facial Oil",
    brand: "Sulwhasoo",
    category: "oil",
    ingredientIds: [],
    fullIngredients:
      "Panax ginseng seed oil, camellia japonica seed oil, sesame seed oil",
    origin: "South Korea",
    description:
      "A luxury facial oil cold-pressed from ginseng seeds and blended with camellia and sesame oils, from the heritage Korean beauty house Sulwhasoo, aimed at nourishing and revitalizing dull, tired-looking skin.",
    usageSteps: [
      "Final PM step after moisturizer",
      "Warm 2-3 drops between palms",
      "Press gently over face and neck",
    ],
    officialUrl: "https://us.sulwhasoo.com",
    price: 84,
    currency: "USD",
    skinTypes: ["dry", "normal"],
    concerns: ["aging", "dullness", "hydration"],
  },
  {
    slug: "cosrx-acne-pimple-master-patch",
    name: "Acne Pimple Master Patch",
    brand: "COSRX",
    category: "spot",
    ingredientIds: [],
    fullIngredients:
      "Hydrocolloid patch (polyurethane film with absorbent hydrocolloid layer) - no topical actives",
    origin: "South Korea",
    description:
      "A best-selling hydrocolloid patch that absorbs fluid from popped or oozing blemishes and shields them from picking and bacteria - one of the most recognizable spot products in K-beauty.",
    usageSteps: [
      "Apply to clean, dry skin over a blemish",
      "Choose the dot size that fully covers the spot",
      "Leave on until it turns white/cloudy, then replace",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/acne-pimple-master-patch-cosrx-official-1.jpg?v=1724835736",
    officialUrl: "https://www.cosrx.com/products/acne-pimple-master-patch",
    price: 6,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["acne"],
  },
  {
    slug: "mario-badescu-drying-lotion",
    name: "Drying Lotion",
    brand: "Mario Badescu",
    category: "spot",
    ingredientIds: ["bha"],
    fullIngredients: "Salicylic acid, calamine, sulfur, camphor, zinc oxide",
    origin: "USA",
    description:
      "A cult-favorite overnight spot treatment: a settled layer of calamine and salicylic acid - you dab only the pink sediment from the bottom of the bottle directly onto blemishes to dry them out overnight.",
    usageSteps: [
      "Let the bottle settle, then dip a cotton swab into the pink sediment at the bottom",
      "Dab directly onto blemishes before bed",
      "Leave on overnight, rinse off in the morning",
    ],
    officialUrl: "https://www.mariobadescu.com",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne"],
  },
  {
    slug: "missha-time-revolution-first-treatment-essence",
    name: "Time Revolution The First Treatment Essence 5X",
    brand: "MISSHA",
    category: "essence",
    ingredientIds: ["niacinamide", "ceramides"],
    fullIngredients:
      "97% Desert Cica (yeast) ferment filtrate, niacinamide, ceramide NP, adenosine, bifida ferment lysate",
    origin: "South Korea",
    description:
      "MISSHA's iconic fermented 'first essence,' built around a high concentration of yeast ferment filtrate to prep skin, even tone, and support the moisture barrier before the rest of the routine.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Pat 2-3 drops onto face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://misshaus.com",
    price: 43,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["dullness", "aging", "hydration"],
  },
  {
    slug: "sk-ii-facial-treatment-essence",
    name: "Facial Treatment Essence",
    brand: "SK-II",
    category: "essence",
    ingredientIds: [],
    fullIngredients: "90%+ PITERA (Galactomyces ferment filtrate)",
    origin: "Japan",
    description:
      "SK-II's iconic essence built on PITERA, a proprietary fermentation ingredient first identified from sake brewers' hands - used to improve the look of skin texture, tone, and resilience.",
    usageSteps: [
      "Apply after cleansing, AM & PM",
      "Sweep onto a cotton pad or pat directly into skin",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://www.sk-ii.com",
    price: 99,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["aging", "dullness", "hydration"],
  },
  {
    slug: "illiyoon-ceramide-ato-concentrate-cream",
    name: "Ceramide Ato Concentrate Cream",
    brand: "ILLIYOON",
    category: "moisturizer",
    ingredientIds: ["ceramides"],
    fullIngredients:
      "Ceramide Ato Complex (3 ceramide types), panax ginseng root water, cholesterol, phytosphingosine",
    origin: "South Korea",
    description:
      "A fragrance-free, barrier-repair cream built around Illiyoon's 3-ceramide 'Ato Complex' - popular for very dry, sensitive, and eczema-prone skin on both face and body.",
    usageSteps: [
      "Apply to face and/or body after cleansing",
      "Massage in until absorbed",
      "Use daily, AM and/or PM",
    ],
    officialUrl: "https://theilliyoon.com",
    price: 24,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "pyunkang-yul-essence-toner",
    name: "Essence Toner",
    brand: "Pyunkang Yul",
    category: "toner",
    ingredientIds: [],
    fullIngredients:
      "91% astragalus membranaceus root extract, minimal-ingredient alcohol-free base",
    origin: "South Korea",
    description:
      "A minimalist, astragalus-root-based toner from Pyunkang Yul, a brand developed with a Korean oriental medicine clinic focused on sensitive and atopic-prone skin - designed to hydrate and rebuild the barrier with as few ingredients as possible.",
    usageSteps: [
      "Apply after cleansing",
      "Pat or sweep onto face with hands or a cotton pad",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://pyunkangyul.us",
    price: 17,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal", "combination"],
    concerns: ["hydration", "barrier", "redness"],
  },
  {
    slug: "etude-house-soonjung-ph-6-5-whip-cleanser",
    name: "SoonJung pH 6.5 Whip Cleanser",
    brand: "Etude House",
    category: "cleanser",
    ingredientIds: ["centella"],
    fullIngredients:
      "Panthenol, madecassoside (a centella asiatica derivative), camellia sinensis leaf extract, low-pH (6.5) surfactant base",
    origin: "South Korea",
    description:
      "A low-pH, fragrance-free whip cleanser built around madecassoside and panthenol to clean sensitive, redness-prone skin without disrupting the barrier.",
    usageSteps: [
      "Pump onto damp hands or a cleansing puff",
      "Work into a soft foam and massage over face",
      "Rinse with lukewarm water",
    ],
    officialUrl: "https://www.etudehouse.com",
    price: 15,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal", "combination"],
    concerns: ["redness", "barrier"],
  },
  {
    slug: "abib-heartleaf-acne-foam-cleanser",
    name: "Heartleaf Acne Foam Cleanser (Heartleaf Foam)",
    brand: "Abib",
    category: "cleanser",
    ingredientIds: ["bha", "centella"],
    fullIngredients:
      "Salicylic acid, Houttuynia cordata (heartleaf) extract, centella asiatica extract, panthenol",
    origin: "South Korea",
    description:
      "A mildly acidic foaming cleanser with salicylic acid and heartleaf extract that clears pores and calms redness for acne-prone, sensitive skin.",
    usageSteps: [
      "Lather with water",
      "Massage gently over face",
      "Rinse thoroughly",
    ],
    officialUrl: "https://en.abib.com",
    price: 15,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive"],
    concerns: ["acne", "redness", "pores"],
  },
  {
    slug: "youth-to-the-people-superfood-antioxidant-cleanser",
    name: "Superfood Antioxidant Cleanser (Kale + Green Tea)",
    brand: "Youth To The People",
    category: "cleanser",
    ingredientIds: ["vitamin_c", "vitamin_e"],
    fullIngredients:
      "Kale, spinach, green tea, and alfalfa antioxidant blend, tetrahexyldecyl ascorbate (vitamin C), tocopheryl acetate (vitamin E), panthenol",
    origin: "USA",
    description:
      "A sulfate-free gel cleanser packed with kale, spinach, and green tea antioxidants that removes makeup and daily grime without stripping the skin barrier.",
    usageSteps: [
      "Massage onto damp skin",
      "Work into a gentle lather",
      "Rinse with lukewarm water",
    ],
    officialUrl: "https://www.youthtothepeople.com",
    price: 36,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["dullness"],
  },
  {
    slug: "skin1004-madagascar-centella-toning-toner",
    name: "Madagascar Centella Toning Toner",
    brand: "SKIN1004",
    category: "toner",
    ingredientIds: ["centella", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "84% centella asiatica extract, niacinamide, gluconolactone (PHA), hyaluronic acid, adenosine",
    origin: "South Korea",
    description:
      "A daily gentle-exfoliating toner combining a high concentration of centella asiatica with PHA and niacinamide to hydrate, soothe, and smooth texture.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with essence/serum",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 19,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration", "dullness", "pores"],
  },
  {
    slug: "by-wishtrend-mandelic-acid-5-skin-prep-water",
    name: "Mandelic Acid 5% Skin Prep Water",
    brand: "By Wishtrend",
    category: "toner",
    ingredientIds: ["aha", "hyaluronic_acid", "centella"],
    fullIngredients:
      "Mandelic acid 5%, beta-glucan, panthenol, centella asiatica extract, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A gentle exfoliating toner using mandelic acid, a larger-molecule AHA that's less irritating than glycolic acid, to smooth texture and fade dark spots while beta-glucan and centella soothe.",
    usageSteps: [
      "Apply after cleansing with a cotton pad",
      "Sweep over face, avoiding the eye area",
      "Follow with serum/moisturizer - start 2-3x/week to build tolerance",
    ],
    officialUrl: "https://www.wishtrend.com",
    price: 22,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "pigmentation", "dullness"],
  },
  {
    slug: "haruharu-wonder-black-rice-hyaluronic-toner",
    name: "Black Rice Hyaluronic Toner",
    brand: "Haruharu Wonder",
    category: "toner",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Korean black rice extract 2,000ppm, hyaluronic acid 600ppm, beta-glucan, panthenol",
    origin: "South Korea",
    description:
      "A 95%-naturally-derived toner built around Korean black rice extract and hyaluronic acid for deep, plumping hydration - a favorite base step for a 'glass skin' routine.",
    usageSteps: [
      "Apply after cleansing",
      "Pat into skin with hands or a cotton pad",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://haruharuusa.com",
    price: 22,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "skin1004-madagascar-centella-ampoule",
    name: "Madagascar Centella Ampoule",
    brand: "SKIN1004",
    category: "essence",
    ingredientIds: ["centella"],
    fullIngredients:
      "Centella asiatica extract (Madagascar-grown, high madecassoside/TECA content), glycerin, butylene glycol",
    origin: "South Korea",
    description:
      "SKIN1004's hero product - a minimalist, fragrance-free centella ampoule formulated to soothe redness and reinforce the skin barrier for sensitive and irritated skin.",
    usageSteps: [
      "Apply after toner",
      "Pat 2-3 drops onto face and neck",
      "Follow with moisturizer",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 17,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal", "combination", "oily"],
    concerns: ["hydration", "redness", "barrier"],
  },
  {
    slug: "manyo-bifida-biome-complex-ampoule",
    name: "Bifida Biome Complex Ampoule",
    brand: "Ma:nyo",
    category: "essence",
    ingredientIds: ["niacinamide", "hyaluronic_acid", "peptides", "centella"],
    fullIngredients:
      "Bifida ferment lysate, 5-strain probiotic 'Bifida Biome' complex, 10 types of hyaluronic acid, niacinamide, acetyl hexapeptide-8, copper tripeptide-1, madecassic acid",
    origin: "South Korea",
    description:
      "A probiotic-fermented ampoule that pairs Ma:nyo's Bifida Biome complex with ten molecular weights of hyaluronic acid and peptides to rebuild a microbiome-friendly skin barrier.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    price: 29,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    concerns: ["barrier", "hydration", "aging"],
  },
  {
    slug: "neogen-dermalogy-real-ferment-micro-essence",
    name: "Dermalogy Real Ferment Micro Essence",
    brand: "Neogen",
    category: "essence",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "93%+ fermented ingredients incl. bifida ferment lysate, saccharomyces (sake) ferment filtrate, birch juice, rice ferment filtrate, niacinamide, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A fermentation-forward first essence inspired by sake brewing, combining bifida and saccharomyces ferment filtrates with birch juice to instantly plump and prep skin.",
    usageSteps: [
      "Apply after cleansing, AM & PM",
      "Pat or sweep onto face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://neogenlab.us",
    price: 34,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["hydration", "dullness"],
  },
  {
    slug: "innisfree-green-tea-seed-hyaluronic-serum",
    name: "Green Tea Seed Hyaluronic Serum",
    brand: "innisfree",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Jeju green tea leaf water, camellia sinensis seed oil, niacinamide, sodium hyaluronate, panthenol",
    origin: "South Korea",
    description:
      "Innisfree's best-selling serum, built on Jeju green tea and green tea seed oil, formulated with a 'Green Tea Tri-biotics' complex to hydrate and support the skin microbiome.",
    usageSteps: [
      "Apply after toner",
      "Press a few drops onto face and neck",
      "Follow with moisturizer",
    ],
    officialUrl: "https://us.innisfree.com",
    price: 34,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "oily"],
    concerns: ["hydration", "dullness"],
  },
  {
    slug: "numbuzin-no3-skin-softening-serum",
    name: "No.3 Skin Softening Serum",
    brand: "numbuzin",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Bifida ferment lysate 42%, galactomyces ferment filtrate 21%, niacinamide, sodium hyaluronate, adenosine, panthenol",
    origin: "South Korea",
    description:
      "A fermented, texture-smoothing serum blending bifida and galactomyces ferments with niacinamide to visibly refine pores and soften rough skin texture.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    officialUrl: "https://us.numbuzin.com",
    price: 26,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "dullness", "hydration"],
  },
  {
    slug: "kravebeauty-great-barrier-relief",
    name: "Great Barrier Relief",
    brand: "KraveBeauty",
    category: "serum",
    ingredientIds: ["niacinamide", "ceramides"],
    fullIngredients:
      "Ceramide NP, niacinamide, tamanu oil, beta-glucan, madecassoside",
    origin: "USA",
    description:
      "A reparative, fragrance-free serum built around ceramide NP and niacinamide to restore a compromised moisture barrier - developed by esthetician Liah Yoo for dry and sensitized skin.",
    usageSteps: [
      "Apply after toner/essence",
      "Massage a few drops into face and neck",
      "Follow with moisturizer to seal in",
    ],
    officialUrl: "https://kravebeauty.com",
    price: 32,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "naturium-niacinamide-serum-12-zinc-2",
    name: "Niacinamide Serum 12% Plus Zinc 2%",
    brand: "Naturium",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid", "vitamin_e"],
    fullIngredients:
      "Niacinamide 12%, zinc PCA 2%, sodium hyaluronate, tocopheryl acetate (vitamin E)",
    origin: "USA",
    description:
      "A high-strength niacinamide and zinc PCA serum aimed at oil control, visibly refined pores, and fading dark spots - one of Naturium's flagship, best-selling formulas.",
    usageSteps: [
      "Apply after cleansing/toning, AM or PM",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://naturium.com",
    price: 16,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "acne", "pigmentation"],
  },
  {
    slug: "peace-out-salicylic-acid-acne-healing-dots",
    name: "Salicylic Acid Acne Healing Dots",
    brand: "Peace Out Skincare",
    category: "spot",
    ingredientIds: ["bha", "retinol"],
    fullIngredients:
      "Salicylic acid 0.5%, retinyl acetate (vitamin A), aloe barbadensis leaf extract, hydrocolloid patch",
    origin: "USA",
    description:
      "A hydrocolloid pimple patch infused with salicylic acid and a retinoid derivative, clinically tested to visibly reduce blemishes in hours while shielding them from picking.",
    usageSteps: [
      "Apply to a clean, dry blemish",
      "Choose the dot size that fully covers the spot",
      "Leave on for several hours or overnight, then replace",
    ],
    officialUrl: "https://peaceoutskincare.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["acne", "pores"],
  },
  {
    slug: "hero-cosmetics-mighty-patch-original",
    name: "Mighty Patch Original",
    brand: "Hero Cosmetics",
    category: "spot",
    ingredientIds: [],
    fullIngredients: "Medical-grade hydrocolloid (no active drug ingredients)",
    origin: "USA",
    description:
      "The viral, best-selling hydrocolloid acne patch - absorbs fluid from whiteheads overnight and shields blemishes from picking, with no active drug ingredients.",
    usageSteps: [
      "Apply to a clean, dry blemish that has come to a head",
      "Leave on for at least 6 hours or overnight",
      "Peel off once it turns white/opaque",
    ],
    officialUrl: "https://www.herocosmetics.us",
    price: 12,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["acne"],
  },
  {
    slug: "glow-recipe-avocado-melt-retinol-eye-sleeping-mask",
    name: "Avocado Melt Retinol Eye Sleeping Mask",
    brand: "Glow Recipe",
    category: "eye",
    ingredientIds: ["retinol", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Encapsulated retinol, avocado oil and fruit extract, niacinamide, sodium hyaluronate, coffeeberry (coffea arabica fruit) extract",
    origin: "USA",
    description:
      "An overnight eye treatment that pairs encapsulated, slow-release retinol with avocado oil and niacinamide to smooth fine lines and depuff while you sleep.",
    usageSteps: [
      "PM only, as the last step",
      "Dot a small amount around the orbital bone",
      "Gently pat in - avoid direct contact with eyes",
    ],
    officialUrl: "https://www.glowrecipe.com",
    price: 39,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "first-aid-beauty-eye-duty-triple-remedy-am-gel-cream",
    name: "Eye Duty Triple Remedy AM Gel Cream",
    brand: "First Aid Beauty",
    category: "eye",
    ingredientIds: ["peptides", "hyaluronic_acid", "vitamin_e"],
    fullIngredients:
      "Palmitoyl hexapeptide-12, palmitoyl tetrapeptide-7, sodium hyaluronate, adenosine, tocopheryl acetate",
    origin: "USA",
    description:
      "A fast-absorbing peptide gel-cream for the eye area that targets puffiness and fine lines with a lightweight, makeup-friendly finish for daytime wear.",
    usageSteps: [
      "Apply AM as the last step before SPF",
      "Dot gently around the orbital bone",
      "Pat in until absorbed",
    ],
    officialUrl: "https://www.firstaidbeauty.com",
    price: 30,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "then-i-met-you-snail-mucin-eye-cream",
    name: "Snail Mucin Eye Cream",
    brand: "Then I Met You",
    category: "eye",
    ingredientIds: ["niacinamide", "peptides", "hyaluronic_acid"],
    fullIngredients:
      "Snail secretion filtrate, niacinamide, acetyl tetrapeptide-5, hyaluronic acid, caffeine, Volufiline",
    origin: "South Korea",
    description:
      "A firming, brightening eye cream from Charlotte Cho's Then I Met You, combining snail mucin with Volufiline and a de-puffing peptide to target dark circles, puffiness, and fine lines.",
    usageSteps: [
      "Apply AM and/or PM as the last step",
      "Dot around the orbital bone with ring finger",
      "Gently pat in until absorbed",
    ],
    officialUrl: "https://thenimetyou.com",
    price: 36,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "hydration", "pigmentation"],
  },
  {
    slug: "etude-house-soonjung-2x-barrier-intensive-cream",
    name: "SoonJung 2X Barrier Intensive Cream",
    brand: "Etude House",
    category: "moisturizer",
    ingredientIds: ["centella"],
    fullIngredients:
      "Panthenol, madecassoside, sunflower seed oil, shea butter, camellia sinensis (green tea) leaf extract",
    origin: "South Korea",
    description:
      "A 92%-natural-origin barrier cream built around panthenol and madecassoside to repair and calm compromised, redness-prone skin.",
    usageSteps: [
      "Scoop a pea-sized amount",
      "Massage in as the final leave-on layer",
      "Use AM and/or PM",
    ],
    officialUrl: "https://www.etudehouse.com",
    price: 23,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal"],
    concerns: ["barrier", "redness", "hydration"],
  },
  {
    slug: "dr-g-red-blemish-clear-soothing-cream",
    name: "R.E.D Blemish Clear Soothing Cream",
    brand: "Dr.G",
    category: "moisturizer",
    ingredientIds: ["niacinamide", "centella"],
    fullIngredients:
      "Niacinamide, centella asiatica extract, madecassoside, panthenol, beta-glucan, epigallocatechin gallate",
    origin: "South Korea",
    description:
      "A dermatologist-developed calming cream that soothes visible redness before and after breakouts while niacinamide helps even tone - a favorite for sensitive, blemish-prone skin.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in gently",
    ],
    price: 30,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "combination"],
    concerns: ["redness", "acne", "barrier"],
  },
  {
    slug: "vanicream-daily-facial-moisturizer",
    name: "Daily Facial Moisturizer with Hyaluronic Acid and Ceramides",
    brand: "Vanicream",
    category: "moisturizer",
    ingredientIds: ["ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Squalane, hyaluronic acid, a 5-ceramide complex (ceramide NP, EOP, NG, AS, AP), phytosterols",
    origin: "USA",
    description:
      "A fragrance-free, dye-free moisturizer formulated without common irritants, combining a five-ceramide complex with hyaluronic acid to support the skin barrier for very sensitive skin.",
    usageSteps: [
      "Apply to clean skin, AM and/or PM",
      "Massage in until absorbed",
    ],
    officialUrl: "https://www.vanicream.com",
    price: 15,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration"],
  },
  {
    slug: "kiehls-midnight-recovery-concentrate",
    name: "Midnight Recovery Concentrate",
    brand: "Kiehl's",
    category: "oil",
    ingredientIds: ["vitamin_e"],
    fullIngredients:
      "Squalane, evening primrose oil, lavender oil, rosehip seed oil (rosa canina fruit oil), tocopherol (vitamin E)",
    origin: "USA",
    description:
      "Kiehl's iconic overnight facial oil blend of botanical and essential oils, including evening primrose and lavender, formulated to restore radiance and support the skin barrier overnight.",
    usageSteps: [
      "Final PM step",
      "Warm 2-3 drops between palms",
      "Press gently over face and neck",
    ],
    officialUrl: "https://www.kiehls.com",
    price: 54,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["aging", "dullness", "hydration"],
  },
  {
    slug: "skin1004-madagascar-centella-tone-brightening-tone-up-sunscreen",
    name: "Madagascar Centella Tone Brightening Tone-Up Sunscreen SPF50+ PA++++",
    brand: "SKIN1004",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "centella"],
    fullIngredients:
      "Titanium dioxide, centella asiatica extract 29,400ppm, niacinamide, tranexamic acid, chemical + mineral UV filter blend",
    origin: "South Korea",
    description:
      "A hybrid mineral-chemical sunscreen with a soft tone-up finish, combining a high concentration of centella with niacinamide and tranexamic acid to brighten while protecting.",
    usageSteps: [
      "Apply as the last AM step",
      "Use generously, about two finger-lengths",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["redness", "pigmentation"],
  },
  {
    slug: "tatcha-silken-pore-perfecting-sunscreen-spf-35",
    name: "Silken Pore Perfecting Sunscreen SPF 35",
    brand: "Tatcha",
    category: "sunscreen",
    ingredientIds: ["spf"],
    fullIngredients:
      "Zinc oxide 15%, octisalate 5%, Japanese wild rose (rosa multiflora) extract, loquat leaf extract, silk extract",
    origin: "USA",
    description:
      "A lightweight, silicone-based mineral-chemical hybrid sunscreen that leaves a matte, pore-blurring finish - a favorite for oily and combination skin wanting SPF without shine.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://www.tatcha.com",
    price: 48,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores"],
  },
  {
    slug: "isntree-green-tea-fresh-cleanser",
    name: "Green Tea Fresh Cleanser",
    brand: "ISNTREE",
    category: "cleanser",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Camellia sinensis (green tea) leaf extract/powder from Jeju & Boseong, 4 types of hyaluronic acid, sodium cocoyl alaninate (low-pH surfactant base)",
    origin: "South Korea",
    description:
      "A low-pH gel cleanser built around Jeju and Boseong green tea leaf extract and powder that clears sebum and impurities while several hyaluronic acid types help offset post-cleanse tightness.",
    usageSteps: [
      "Massage onto damp skin",
      "Work into a light lather",
      "Rinse off with lukewarm water",
    ],
    officialUrl: "https://isntree-global.com",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dullness", "hydration"],
  },
  {
    slug: "dr-ceuracle-tea-tree-purifine-cleansing-foam",
    name: "Tea Tree Purifine Cleansing Foam",
    brand: "Dr.Ceuracle",
    category: "cleanser",
    ingredientIds: [],
    fullIngredients:
      "Melaleuca alternifolia (tea tree) leaf extract and oil, shea butter, trehalose, hippophae rhamnoides (sea buckthorn) fruit extract, centella asiatica extract",
    origin: "South Korea",
    description:
      "A gel-to-foam cleanser built around tea tree extract that soothes blemish-prone skin while shea butter and trehalose keep the wash from over-drying.",
    usageSteps: [
      "Dispense onto damp hands",
      "Work into a foam and massage over face",
      "Rinse thoroughly with lukewarm water",
    ],
    officialUrl: "https://www.dr-ceuracle.com",
    price: 26,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive"],
    concerns: ["acne", "redness"],
  },
  {
    slug: "mixsoon-bean-cleansing-oil",
    name: "Bean Cleansing Oil",
    brand: "Mixsoon",
    category: "cleanser",
    ingredientIds: ["vitamin_e"],
    fullIngredients:
      "Glycine soja (soybean), jojoba, sunflower seed and camellia japonica seed oils, fermented soybean/pomegranate/barley/pear extracts, tocopherol",
    origin: "South Korea",
    description:
      "A plant-oil cleansing oil enriched with fermented soybean and fruit extracts that dissolves makeup and sebum while leaving a balanced, non-greasy finish.",
    usageSteps: [
      "Massage onto dry skin to dissolve makeup and sunscreen",
      "Add water to emulsify into a milky texture",
      "Rinse off with lukewarm water",
    ],
    officialUrl: "https://mixsoon.us",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["dullness", "hydration"],
  },
  {
    slug: "goodal-green-tangerine-vita-c-cleansing-foam",
    name: "Green Tangerine Vita C Cleansing Foam",
    brand: "Goodal",
    category: "cleanser",
    ingredientIds: ["vitamin_c", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Citrus tangerina (tangerine) extract, 3-O-ethyl ascorbic acid, arbutin, niacinamide, hyaluronic acid, coconut-derived surfactant base",
    origin: "South Korea",
    description:
      "A brightening foam cleanser built around green tangerine extract and a stabilized vitamin C derivative that cleanses while targeting the look of dark spots.",
    usageSteps: [
      "Lather with water",
      "Massage gently over face",
      "Rinse thoroughly with lukewarm water",
    ],
    price: 14,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "manyo-pure-cleansing-oil",
    name: "Pure Cleansing Oil",
    brand: "Ma:nyo",
    category: "cleanser",
    ingredientIds: ["vitamin_e"],
    fullIngredients:
      "Soybean, hazelnut, grape seed, olive, camellia, evening primrose and jojoba oils, rice ferment filtrate (sake), tea tree leaf oil, tocopherol",
    origin: "South Korea",
    description:
      "A best-selling multi-oil cleansing oil that blends a dozen-plus botanical oils with rice ferment filtrate to melt away makeup and sunscreen without stripping skin.",
    usageSteps: [
      "Massage onto dry skin to dissolve makeup and sunscreen",
      "Emulsify with a little water",
      "Rinse thoroughly with lukewarm water",
    ],
    officialUrl: "https://manyo.us",
    price: 22,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal"],
    concerns: ["dullness"],
  },
  {
    slug: "pyunkang-yul-low-ph-pore-deep-cleansing-foam",
    name: "Low pH Pore Deep Cleansing Foam",
    brand: "Pyunkang Yul",
    category: "cleanser",
    ingredientIds: ["aha", "centella"],
    fullIngredients:
      "Sodium cocoyl isethionate, diatomaceous earth, fruit-derived AHA, centella asiatica extract, witch hazel extract, tea tree leaf extract",
    origin: "South Korea",
    description:
      "A low-pH foaming cleanser with fine diatomaceous earth and a small amount of fruit AHA to clear pores, balanced with centella and witch hazel to keep it non-irritating.",
    usageSteps: [
      "Lather with water",
      "Massage over face, focusing on the T-zone",
      "Rinse thoroughly with lukewarm water",
    ],
    officialUrl: "https://pyunkangyul.us",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "dullness"],
  },
  {
    slug: "cerave-foaming-facial-cleanser",
    name: "Foaming Facial Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    ingredientIds: ["ceramides", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Ceramides (NP, AP, EOP), niacinamide, hyaluronic acid, sodium lauroyl sarcosinate, cocamidopropyl hydroxysultaine",
    origin: "USA",
    description:
      "A foaming gel cleanser for normal-to-oily skin that pairs three essential ceramides and niacinamide with gentle surfactants to remove excess oil without disrupting the barrier.",
    usageSteps: [
      "Wet face with lukewarm water",
      "Massage into a light lather",
      "Rinse thoroughly and pat dry",
    ],
    officialUrl: "https://www.cerave.com",
    price: 14,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "la-roche-posay-toleriane-hydrating-gentle-cleanser",
    name: "Toleriane Hydrating Gentle Cleanser",
    brand: "La Roche-Posay",
    category: "cleanser",
    ingredientIds: ["ceramides", "niacinamide"],
    fullIngredients:
      "Prebiotic thermal spring water, ceramide-3, niacinamide, glycerin, panthenol",
    origin: "France",
    description:
      "A non-foaming, dermatologist-recommended cream cleanser with ceramide-3 and niacinamide that removes makeup and impurities while maintaining the skin's natural moisture barrier and pH.",
    usageSteps: [
      "Apply to dry or damp skin",
      "Massage gently - no heavy lather needed",
      "Rinse with lukewarm water or wipe off with a cotton pad",
    ],
    officialUrl: "https://www.laroche-posay.us",
    price: 17,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "round-lab-birch-juice-moisturizing-cleanser",
    name: "Birch Juice Moisturizing Cleanser",
    brand: "Round Lab",
    category: "cleanser",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Betula platyphylla japonica (birch) juice 10,000ppm, hyaluronic acid, artemisia annua extract, low-pH gel base",
    origin: "South Korea",
    description:
      "A low-pH gel cleanser built around birch sap that clears hidden sebum and dead skin cells while hyaluronic acid helps offset the tightness typical of clarifying cleansers.",
    usageSteps: [
      "Massage onto damp skin",
      "Work into a light lather",
      "Rinse off with lukewarm water",
    ],
    officialUrl: "https://roundlab.com",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["pores", "hydration"],
  },
  {
    slug: "illiyoon-ceramide-ato-gentle-skin-cleanser",
    name: "Ceramide Ato Gentle Skin Cleanser",
    brand: "ILLIYOON",
    category: "cleanser",
    ingredientIds: ["ceramides", "vitamin_c", "centella"],
    fullIngredients:
      "Ceramide NP, gluconolactone (PHA), 3-O-ethyl ascorbic acid, madecassoside, panax ginseng root water, squalane",
    origin: "South Korea",
    description:
      "A gel-to-foam, low-pH cleanser powered by PHA and soy-derived ceramides that gently exfoliates while cleansing, aimed at refining texture and supporting the moisture barrier.",
    usageSteps: [
      "Lather with water",
      "Massage gently over face",
      "Rinse thoroughly with lukewarm water",
    ],
    officialUrl: "https://theilliyoon.com",
    price: 16,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    concerns: ["barrier", "dullness"],
  },
  {
    slug: "vanicream-gentle-facial-cleanser",
    name: "Gentle Facial Cleanser",
    brand: "Vanicream",
    category: "cleanser",
    ingredientIds: [],
    fullIngredients:
      "Water, glycerin, coco-glucoside, sodium cocoyl glycinate, caprylyl glycol",
    origin: "USA",
    description:
      "A soap-free, fragrance-free cleanser formulated without common irritants that removes makeup and excess oil without drying skin - a dermatology staple for very sensitive skin.",
    usageSteps: [
      "Apply to wet skin",
      "Massage gently - no heavy lather needed",
      "Rinse thoroughly with lukewarm water",
    ],
    officialUrl: "https://www.vanicream.com",
    price: 11,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration"],
  },
  {
    slug: "cosrx-salicylic-acid-daily-gentle-cleanser",
    name: "Salicylic Acid Daily Gentle Cleanser",
    brand: "COSRX",
    category: "cleanser",
    ingredientIds: ["bha"],
    fullIngredients:
      "Salicylic acid 0.5%, willow bark water, tea tree leaf oil, lemon fruit oil, foaming surfactant base",
    origin: "South Korea",
    description:
      "A foaming cleanser for oily and blemish-prone skin that combines a low dose of salicylic acid with willow bark water and tea tree oil to clear excess sebum and dead skin cells.",
    usageSteps: [
      "Massage onto damp skin",
      "Work into a foam",
      "Rinse off with lukewarm water",
    ],
    officialUrl: "https://cosrx.com",
    price: 13,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores"],
  },
  {
    slug: "im-from-rice-toner",
    name: "Rice Toner",
    brand: "I'm From",
    category: "toner",
    ingredientIds: ["niacinamide"],
    fullIngredients:
      "Oryza sativa (rice) extract 77.78%, niacinamide, rice bran extract, portulaca oleracea extract, adenosine",
    origin: "South Korea",
    description:
      "A cult-favorite, alcohol-free toner built on a high concentration of Yeoju rice extract and niacinamide that smooths texture and evens tone while nourishing skin.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://theimfrom.com",
    price: 22,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive"],
    concerns: ["dullness", "hydration"],
    featured: true,
  },
  {
    slug: "round-lab-1025-dokdo-toner",
    name: "1025 Dokdo Toner",
    brand: "Round Lab",
    category: "toner",
    ingredientIds: [],
    fullIngredients:
      "Deep sea water from Ulleungdo/Dokdo, chondrus crispus extract, sugarcane extract, betaine, panthenol, allantoin",
    origin: "South Korea",
    description:
      "Round Lab's breakout mineral toner, built on deep sea water sourced near Ulleungdo and Dokdo islands to hydrate and soothe without a sticky finish.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Dokdo_Toner_2025.png?v=1772851199",
    officialUrl: "https://roundlab.com/products/1025-dokdo-toner",
    price: 17,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration", "redness"],
    featured: true,
  },
  {
    slug: "manyo-galactomy-clearskin-toner",
    name: "Galactomy Clearskin Toner",
    brand: "Ma:nyo",
    category: "toner",
    ingredientIds: [],
    fullIngredients:
      "Galactomyces ferment filtrate, rice bran extract, mung bean seed extract, soybean seed extract, willow bark extract, panthenol",
    origin: "South Korea",
    description:
      "A fermentation-forward toner built on galactomyces ferment filtrate to hydrate, refine texture, and prep skin for the rest of the routine.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://manyo.us",
    price: 29,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dullness", "pores"],
  },
  {
    slug: "klairs-supple-preparation-facial-toner",
    name: "Supple Preparation Facial Toner",
    brand: "Dear, Klairs",
    category: "toner",
    ingredientIds: ["centella", "hyaluronic_acid"],
    fullIngredients:
      "Licorice root extract, centella asiatica extract, beta-glucan, panthenol, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A hydrating, first-step toner formulated with licorice and centella extracts to prep and calm sensitive or dry skin before the rest of the routine.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://klairs.com",
    price: 22,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal", "combination"],
    concerns: ["hydration", "redness"],
  },
  {
    slug: "torriden-dive-in-toner",
    name: "DIVE-IN Low Molecule Hyaluronic Acid Toner",
    brand: "Torriden",
    category: "toner",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "5 types of hyaluronic acid, panthenol, allantoin, portulaca oleracea extract, trehalose",
    origin: "South Korea",
    description:
      "The toner companion to Torriden's Dive-In serum, using five molecular weights of hyaluronic acid to hydrate at multiple skin depths in a lightweight, non-sticky formula.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://torriden.us",
    price: 22,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination", "oily"],
    concerns: ["hydration"],
  },
  {
    slug: "mixsoon-galactomyces-toner",
    name: "Galactomyces Toner",
    brand: "Mixsoon",
    category: "toner",
    ingredientIds: [],
    fullIngredients:
      "Galactomyces ferment filtrate, 1,2-hexanediol, minimal-ingredient base",
    origin: "South Korea",
    description:
      "A minimalist toner led by galactomyces ferment filtrate, aimed at brightening and hydrating in a short, low-irritation ingredient list.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://mixsoon.us",
    price: 25,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["dullness", "hydration"],
  },
  {
    slug: "numbuzin-no5-vitamin-boosting-essential-toner",
    name: "No.5 Vitamin Boosting Essential Toner",
    brand: "numbuzin",
    category: "toner",
    ingredientIds: ["niacinamide", "vitamin_c"],
    fullIngredients:
      "Niacinamide, 3-O-ethyl ascorbic acid, ascorbic acid, glutathione, madecassoside, adenosine",
    origin: "South Korea",
    description:
      "A brightening first-step toner combining glutathione, vitamin C, and niacinamide to gently fade hyperpigmentation and even out dull, uneven skin tone.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://us.numbuzin.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "combination", "oily"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "paulas-choice-skin-balancing-pore-reducing-toner",
    name: "Skin Balancing Pore-Reducing Toner",
    brand: "Paula's Choice",
    category: "toner",
    ingredientIds: ["niacinamide", "hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Niacinamide, sodium hyaluronate, ceramide NP, ceramide AP, ceramide EOP, panthenol, adenosine",
    origin: "USA",
    description:
      "An alcohol-free toner for oily and combination skin that pairs niacinamide with ceramides and hyaluronic acid to minimize the look of large pores while replenishing hydration.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://www.paulaschoice.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["pores", "hydration"],
  },
  {
    slug: "isntree-hyaluronic-acid-toner",
    name: "Hyaluronic Acid Toner",
    brand: "ISNTREE",
    category: "toner",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Sodium hyaluronate, hyaluronic acid, hydrolyzed sodium hyaluronate, birch sap, beta-glucan, panthenol",
    origin: "South Korea",
    description:
      "A hydration-focused toner built on multiple forms of hyaluronic acid and birch sap to replenish moisture and prevent water loss in dehydrated skin.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://isntree-global.com",
    price: 20,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination", "oily"],
    concerns: ["hydration"],
  },
  {
    slug: "thayers-original-witch-hazel-facial-toner",
    name: "Original Witch Hazel Facial Toner",
    brand: "Thayers",
    category: "toner",
    ingredientIds: [],
    fullIngredients:
      "Witch hazel (Hamamelis virginiana) extract, aloe vera leaf extract, glycerin, citric acid",
    origin: "USA",
    description:
      "A long-running, alcohol-free witch hazel toner that removes residual impurities and preps skin, built on a proprietary blend of witch hazel, aloe, and glycerin.",
    usageSteps: [
      "Apply to a cotton pad after cleansing",
      "Sweep over face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://www.thayers.com",
    price: 11,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["dullness", "pores"],
  },
  {
    slug: "innisfree-green-tea-balancing-toner",
    name: "Green Tea Balancing Toner",
    brand: "innisfree",
    category: "toner",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Jeju green tea extract, niacinamide, hyaluronic acid, zinc PCA, gluconolactone",
    origin: "South Korea",
    description:
      "A Jeju green-tea toner from innisfree formulated with niacinamide and hyaluronic acid to balance oil, refine pores, and hydrate combination and oily skin.",
    usageSteps: [
      "Apply after cleansing with a cotton pad or hands",
      "Pat or sweep over face",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://us.innisfree.com",
    price: 19,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "hydration"],
  },
  {
    slug: "then-i-met-you-birch-milk-refining-toner",
    name: "Birch Milk Refining Toner",
    brand: "Then I Met You",
    category: "toner",
    ingredientIds: ["aha"],
    fullIngredients:
      "Betula platyphylla japonica (birch) juice 86%+, glycolic acid, lactic acid, gluconolactone (PHA), squalane, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A milky toner from Charlotte Cho's Then I Met You that blends hydrating birch juice with a gentle 1% AHA/PHA blend to exfoliate, refine pores, and strengthen the skin barrier.",
    usageSteps: [
      "Apply to a cotton pad or hands after cleansing",
      "Sweep or pat over face, avoiding the eye area",
      "Follow with serum/moisturizer - start a few times a week to build tolerance",
    ],
    officialUrl: "https://thenimetyou.com",
    price: 32,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["pores", "dullness", "hydration"],
  },
  {
    slug: "eucerin-sun-gel-creme-oil-control-spf50",
    name: "Sun Gel-Creme Oil Control SPF 50+",
    brand: "Eucerin",
    category: "sunscreen",
    ingredientIds: ["spf"],
    fullIngredients:
      "Homosalate, octocrylene, butyl methoxydibenzoylmethane, ethylhexyl salicylate, licorice root (glycyrrhiza inflata) extract, glycyrrhetinic acid",
    origin: "Germany",
    description:
      "A dermocosmetic, oil-free chemical sunscreen with a matte, dry-touch finish designed specifically for oily and blemish-prone skin, from the German dermatology brand Eucerin.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face",
      "Reapply every 2 hours in the sun",
    ],
    price: 19,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores"],
  },
  {
    slug: "im-from-mugwort-essence",
    name: "Mugwort Essence",
    brand: "I'm From",
    category: "essence",
    ingredientIds: [],
    fullIngredients:
      "Artemisia Princeps (mugwort) extract, butylene glycol, glycerin, 1,2-hexanediol, sodium hyaluronate, ethylhexylglycerin",
    origin: "South Korea",
    description:
      "A minimalist essence built on South Korean-grown mugwort extract, formulated without fragrance, essential oils, or alcohol to soothe and calm sensitive, redness-prone skin.",
    usageSteps: [
      "Apply after cleansing/toner",
      "Pat 2-3 drops onto face and neck",
      "Follow with serum/moisturizer",
    ],
    price: 23,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "combination", "normal"],
    concerns: ["redness", "barrier"],
    featured: true,
  },
  {
    slug: "mixsoon-bean-essence",
    name: "Bean Essence",
    brand: "Mixsoon",
    category: "essence",
    ingredientIds: [],
    fullIngredients:
      "Water, propanediol, glycerin, Lactobacillus/soybean ferment extract, Lactobacillus/pomegranate fruit ferment extract, Saccharomyces/barley seed ferment filtrate, Lactobacillus/pear juice ferment filtrate",
    origin: "South Korea",
    description:
      "A vegan, fragrance-free essence built on fermented soybean extract and barley beta-glucan, designed to hydrate and prep skin for a smooth, glass-skin finish.",
    usageSteps: [
      "Apply after cleansing/toner",
      "Pat a few drops into face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://mixsoon.us",
    price: 35,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive"],
    concerns: ["hydration", "dullness"],
  },
  {
    slug: "then-i-met-you-the-giving-essence",
    name: "The Giving Essence",
    brand: "Then I Met You",
    category: "essence",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Galactomyces ferment filtrate, Aspergillus ferment extract filtrate, Saccharomyces ferment filtrate, niacinamide 5%, ellagic acid, aronia melanocarpa fruit extract, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A fermentation-forward essence from Charlotte Cho's Then I Met You, combining 78% naturally fermented ingredients with 5% niacinamide to brighten and hydrate.",
    usageSteps: [
      "Apply after cleansing/toner, AM & PM",
      "Pat 2-3 drops onto face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://thenimetyou.com",
    price: 50,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["dullness", "hydration"],
  },
  {
    slug: "manyo-galac-niacin-3-0-essence",
    name: "Galac Niacin 3.0 Essence",
    brand: "Ma:nyo",
    category: "essence",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Galactomyces ferment filtrate, niacinamide 4%, panthenol, sodium hyaluronate, 1,2-hexanediol, witch hazel water",
    origin: "South Korea",
    description:
      "Manyo Factory's long-running fermented essence, pairing a high concentration of galactomyces ferment filtrate with niacinamide to brighten tone and prep the skin barrier.",
    usageSteps: [
      "Apply after toner",
      "Pat 2-3 drops onto face and neck",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://manyo.us",
    price: 24,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["dullness", "hydration", "pigmentation"],
  },
  {
    slug: "skin1004-madagascar-centella-poremizing-fresh-ampoule",
    name: "Madagascar Centella Poremizing Fresh Ampoule",
    brand: "SKIN1004",
    category: "essence",
    ingredientIds: ["centella", "peptides", "hyaluronic_acid"],
    fullIngredients:
      "Water, centella asiatica extract, pink mineral salt, tripeptide-3, acetyl hexapeptide-8, acetyl octapeptide-3, copper tripeptide-1, palmitoyl pentapeptide-4, sodium hyaluronate, panthenol",
    origin: "South Korea",
    description:
      "A pore-focused ampoule combining centella asiatica with a nine-peptide complex and pink mineral salt to cleanse and refine the look of pores while hydrating.",
    usageSteps: [
      "Apply after toner",
      "Pat 2-3 drops onto face and neck",
      "Follow with moisturizer",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 23,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "hydration", "dullness"],
  },
  {
    slug: "isntree-onion-newpair-b5-ampoule",
    name: "Onion Newpair B5 Ampoule",
    brand: "ISNTREE",
    category: "essence",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Allium Cepa (onion) bulb extract 85%, panthenol 5%, niacinamide, ferulic acid, caffeine, tranexamic acid, sodium hyaluronate, hydrolyzed hyaluronic acid",
    origin: "South Korea",
    description:
      "A high-concentration red onion extract ampoule that pairs niacinamide and tranexamic acid to target post-acne marks, dullness, and a weakened skin barrier.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    officialUrl: "https://theisntree.com",
    price: 27,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["acne", "pigmentation", "barrier"],
  },
  {
    slug: "cosrx-full-fit-propolis-light-ampoule",
    name: "Full Fit Propolis Light Ampoule",
    brand: "COSRX",
    category: "essence",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Propolis extract 83%, butylene glycol, glycerin, betaine, 1,2-hexanediol, sodium hyaluronate, panthenol, arginine",
    origin: "South Korea",
    description:
      "A lightweight, propolis-forward ampoule that hydrates and calms while imparting a subtle glow - a gentler follow-up to COSRX's heavier snail mucin essence.",
    usageSteps: [
      "Apply after toner/essence",
      "Pat 2-3 drops onto face",
      "Follow with moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-light-ampoule-cosrx-official-1.jpg?v=1724835475",
    officialUrl: "https://www.cosrx.com/products/full-fit-propolis-light-ampoule",
    price: 24,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "dry", "combination"],
    concerns: ["redness", "hydration", "dullness"],
  },
  {
    slug: "missha-time-revolution-night-repair-borabit-ampoule",
    name: "Time Revolution Night Repair Borabit Ampoule",
    brand: "MISSHA",
    category: "essence",
    ingredientIds: ["retinol", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Water, bifida ferment lysate, niacinamide, retinol, sorbus commixta extract, Lactobacillus/rice ferment filtrate, sodium hyaluronate, adenosine",
    origin: "South Korea",
    description:
      "A cult-favorite overnight repair ampoule often compared to prestige 'advanced night repair' serums, combining retinol and fermented extracts to target fine lines and uneven tone.",
    usageSteps: [
      "PM step, after toner/essence",
      "Pat a few drops into skin",
      "Follow with moisturizer; use SPF the next morning",
    ],
    officialUrl: "https://misshaus.com",
    price: 50,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "dullness"],
  },
  {
    slug: "anua-peach-70-niacinamide-serum",
    name: "Peach 70% Niacinamide Serum",
    brand: "Anua",
    category: "serum",
    ingredientIds: ["niacinamide", "vitamin_c", "hyaluronic_acid", "centella"],
    fullIngredients:
      "Prunus Persica (peach) fruit water 70%, niacinamide, 3-O-ethyl ascorbic acid, sodium hyaluronate, centella asiatica extract, alpha-arbutin, panthenol",
    origin: "South Korea",
    description:
      "Anua's breakout brightening serum, blending niacinamide with a stabilized vitamin C derivative and peach fruit water to fade dullness and even tone.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops onto face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://anua.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "combination", "oily", "dry"],
    concerns: ["dullness", "pigmentation", "hydration"],
  },
  {
    slug: "beauty-of-joseon-glow-serum-propolis-niacinamide",
    name: "Glow Serum: Propolis + Niacinamide",
    brand: "Beauty of Joseon",
    category: "serum",
    ingredientIds: ["niacinamide", "bha", "hyaluronic_acid"],
    fullIngredients:
      "Water, dipropylene glycol, glycerin, propolis extract 60%, niacinamide 2%, betaine salicylate, sodium hyaluronate, centella asiatica extract, tocopherol",
    origin: "South Korea",
    description:
      "A cushiony, glow-boosting serum pairing propolis extract with niacinamide to refine pores, hydrate, and calm reactive skin - one of Beauty of Joseon's best-known products.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops onto face",
      "Follow with moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/glow-serum-propolis-niacinamide-1-front.webp?v=1770278801",
    officialUrl: "https://beautyofjoseon.com/products/glow-serum-propolis-niacinamide",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["pores", "dullness", "hydration"],
    featured: true,
  },
  {
    slug: "goodal-green-tangerine-vita-c-dark-spot-serum",
    name: "Green Tangerine Vita C Dark Spot Serum",
    brand: "Goodal",
    category: "serum",
    ingredientIds: ["niacinamide", "vitamin_c"],
    fullIngredients:
      "Citrus Tangerina (green tangerine) extract 70%, niacinamide 4%, ascorbyl glucoside, arbutin, madecassoside, centella asiatica extract",
    origin: "South Korea",
    description:
      "A brightening serum built on fresh green tangerine extract with niacinamide and a vitamin C derivative to fade dark spots and even tone, formulated to be gentle enough for sensitive skin.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Pat a few drops onto face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://thegoodal.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "combination", "sensitive", "dry"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "cosrx-the-vitamin-c-23-serum",
    name: "The Vitamin C 23 Serum",
    brand: "COSRX",
    category: "serum",
    ingredientIds: ["vitamin_c", "niacinamide", "vitamin_e", "hyaluronic_acid"],
    fullIngredients:
      "Water, ascorbic acid 23%, butylene glycol, dimethicone, panthenol, 3-O-ethyl ascorbic acid, squalane, caffeine, sodium hyaluronate, niacinamide, tocotrienols, tocopherol",
    origin: "South Korea",
    description:
      "A high-strength, 23% pure vitamin C serum reinforced with vitamin E and niacinamide to target dullness, uneven tone, and early signs of aging - a potent, advanced-user formula.",
    usageSteps: [
      "AM step, after toner",
      "Apply a few drops to face, avoiding eye area",
      "Follow with moisturizer/SPF",
    ],
    imageUrl:
      "https://www.cosrx.com/cdn/shop/files/Advanced_VitaminC23_00_1200x1200.webp?v=1760935746",
    officialUrl: "https://www.cosrx.com",
    price: 18,
    currency: "USD",
    skinTypes: ["normal", "combination", "oily"],
    concerns: ["dullness", "pigmentation", "aging"],
  },
  {
    slug: "skinceuticals-c-e-ferulic",
    name: "C E Ferulic",
    brand: "SkinCeuticals",
    category: "serum",
    ingredientIds: ["vitamin_c", "vitamin_e", "hyaluronic_acid"],
    fullIngredients:
      "Water, ethoxydiglycol, ascorbic acid 15%, glycerin, propylene glycol, laureth-23, tocopherol 1%, ferulic acid 0.5%, panthenol, sodium hyaluronate",
    origin: "USA",
    description:
      "A dermatologist-favorite antioxidant serum combining 15% pure vitamin C, vitamin E, and ferulic acid to protect against environmental damage and improve the look of fine lines and photodamage.",
    usageSteps: [
      "AM step, after cleansing",
      "Apply 4-5 drops to face, neck, and chest",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://www.skinceuticals.com",
    price: 182,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "pigmentation", "dullness"],
    featured: true,
  },
  {
    slug: "paulas-choice-10-niacinamide-booster",
    name: "10% Niacinamide Booster",
    brand: "Paula's Choice",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Water, niacinamide 10%, acetyl glucosamine, ascorbyl glucoside, sodium hyaluronate, licorice root extract, allantoin, panthenol",
    origin: "USA",
    description:
      "A concentrated niacinamide booster designed to be mixed into moisturizer or used alone to visibly minimize enlarged pores and brighten uneven tone.",
    usageSteps: [
      "Apply after cleansing/toning, AM or PM",
      "Apply a few drops alone or mixed into moisturizer",
      "Follow with SPF in the AM",
    ],
    officialUrl: "https://www.paulaschoice.com",
    price: 44,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["pores", "dullness", "pigmentation"],
  },
  {
    slug: "la-roche-posay-pure-vitamin-c10-serum",
    name: "Pure Vitamin C10 Serum",
    brand: "La Roche-Posay",
    category: "serum",
    ingredientIds: ["vitamin_c", "bha", "hyaluronic_acid"],
    fullIngredients:
      "Water, ascorbic acid 10%, glycerin, sodium hyaluronate, adenosine, salicylic acid, La Roche-Posay thermal spring water",
    origin: "France",
    description:
      "A pure vitamin C serum from the dermocosmetic brand La Roche-Posay, formulated with salicylic acid and hyaluronic acid to brighten tone and smooth texture for sensitive skin.",
    usageSteps: [
      "AM step, after cleansing",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://www.laroche-posay.us",
    price: 40,
    currency: "USD",
    skinTypes: ["normal", "combination", "sensitive"],
    concerns: ["dullness", "pigmentation", "aging"],
  },
  {
    slug: "dear-klairs-midnight-blue-youth-activating-drop",
    name: "Midnight Blue Youth Activating Drop",
    brand: "Dear, Klairs",
    category: "serum",
    ingredientIds: ["peptides"],
    fullIngredients:
      "Water, butylene glycol, sh-oligopeptide-1, sh-polypeptide-1, blueberry (Vaccinium angustifolium) fruit extract, guaiazulene, adenosine",
    origin: "South Korea",
    description:
      "A calming night serum combining EGF/FGF-mimicking peptides with guaiazulene (derived from German chamomile) to soothe irritation and support skin renewal overnight.",
    usageSteps: [
      "PM step, after toner",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://klairs.com",
    price: 26,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "dry", "combination"],
    concerns: ["redness", "barrier", "aging"],
  },
  {
    slug: "some-by-mi-aha-bha-pha-30-days-miracle-serum",
    name: "AHA·BHA·PHA 30 Days Miracle Serum",
    brand: "Some By Mi",
    category: "serum",
    ingredientIds: ["aha", "niacinamide", "centella"],
    fullIngredients:
      "Centella asiatica extract 14.51%, tea tree leaf water 10,000ppm, niacinamide, glycolic acid, lactic acid, malic acid, lactobionic acid, tea tree oil",
    origin: "South Korea",
    description:
      "A blemish-focused serum blending AHA and PHA acids with a high concentration of centella and tea tree to exfoliate, unclog pores, and calm acne-prone, oily skin.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Apply a few drops to face",
      "Start every other day; follow with moisturizer",
    ],
    price: 20,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores", "dullness"],
  },
  {
    slug: "purito-seoul-centella-green-level-buffet-serum",
    name: "Centella Green Level Buffet Serum",
    brand: "PURITO SEOUL",
    category: "serum",
    ingredientIds: [
      "centella",
      "niacinamide",
      "peptides",
      "hyaluronic_acid",
      "ceramides",
    ],
    fullIngredients:
      "Centella asiatica extract 49%, water, niacinamide, sodium hyaluronate, asiaticoside, asiatic acid, madecassic acid, palmitoyl peptides, ceramide NP, panthenol",
    origin: "South Korea",
    description:
      "A high-concentration centella serum with niacinamide, peptides, and ceramide layered in to calm redness, hydrate, and support the moisture barrier.",
    usageSteps: [
      "Apply after toner",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://purito.com",
    price: 21,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "dry", "combination", "normal"],
    concerns: ["redness", "barrier", "hydration"],
  },
  {
    slug: "medicube-triple-collagen-serum",
    name: "Triple Collagen Serum",
    brand: "Medicube",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Water, glycerin, butylene glycol, niacinamide, hydrolyzed collagen, soluble collagen, collagen extract, atelocollagen, sodium hyaluronate, adenosine",
    origin: "South Korea",
    description:
      "A lightweight serum built around a triple-collagen complex and niacinamide to plump, firm, and hydrate dull, tired-looking skin.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://medicube.us",
    price: 23,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "dullness", "hydration"],
  },
  {
    slug: "dr-jart-cicapair-intensive-soothing-repair-serum",
    name: "Cicapair Intensive Soothing Repair Serum",
    brand: "Dr. Jart+",
    category: "serum",
    ingredientIds: ["centella", "peptides"],
    fullIngredients:
      "Water, glycerin, butylene glycol, propanediol, allantoin, asiaticoside, madecassic acid, asiatic acid, centella asiatica leaf extract, palmitoyl tripeptide-8",
    origin: "South Korea",
    description:
      "A cica-complex serum from Dr. Jart+'s Cicapair line, formulated to reinforce the skin barrier and calm visible redness for sensitive, reactive skin.",
    usageSteps: [
      "Apply after toner",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://www.drjart.com",
    price: 54,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "combination"],
    concerns: ["redness", "barrier"],
  },
  {
    slug: "the-ordinary-alpha-arbutin-2-ha",
    name: "Alpha Arbutin 2% + HA",
    brand: "The Ordinary",
    category: "serum",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Water, alpha-arbutin 2%, propanediol, hydrolyzed sodium hyaluronate, ergothioneine, citric acid",
    origin: "Canada",
    description:
      "A high-strength, purified alpha arbutin serum paired with hyaluronic acid to visibly even skin tone and fade dark spots.",
    usageSteps: [
      "Apply after cleansing/toning, AM and/or PM",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://theordinary.com",
    price: 10,
    currency: "USD",
    skinTypes: ["normal", "combination", "oily", "dry"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "numbuzin-no5-glutathione-vitamin-concentrated-serum",
    name: "No.5+ Glutathione Vitamin Concentrated Serum",
    brand: "numbuzin",
    category: "serum",
    ingredientIds: ["niacinamide", "vitamin_c", "hyaluronic_acid"],
    fullIngredients:
      "Vaccinium vitis-idaea fruit extract, niacinamide, tranexamic acid 4%, glutathione, 3-O-ethyl ascorbic acid, ascorbic acid, ascorbyl glucoside, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A brightening serum combining glutathione, two forms of vitamin C, niacinamide, and tranexamic acid to target dark spots and dullness for a radiant tone.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Pat a few drops into skin",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://us.numbuzin.com",
    price: 26,
    currency: "USD",
    skinTypes: ["normal", "combination", "dry"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "dr-ceuracle-pdrn-retinol-shot-ampoule",
    name: "PDRN & Retinol Shot Ampoule",
    brand: "Dr.Ceuracle",
    category: "serum",
    ingredientIds: ["retinol", "centella", "hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Water, glycerin, dipropylene glycol, squalane, coptis japonica root extract, hydrolyzed sodium hyaluronate, centella asiatica extract, ceramide NP, retinol, sodium DNA",
    origin: "South Korea",
    description:
      "A skin-booster ampoule pairing retinol with PDRN (a salmon DNA-derived polynucleotide) and micro spicules to support cell turnover and a smoother, 'glass skin' texture.",
    usageSteps: [
      "PM step, after toner",
      "Apply a few drops, pat in gently",
      "Follow with moisturizer; always use SPF the next morning",
    ],
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "combination", "dry"],
    concerns: ["aging", "dullness"],
  },
  {
    slug: "torriden-balanceful-cica-serum",
    name: "Balanceful Cica Serum",
    brand: "Torriden",
    category: "serum",
    ingredientIds: ["centella", "hyaluronic_acid"],
    fullIngredients:
      "Water, dipropylene glycol, butylene glycol, gluconolactone, panthenol, allantoin, sodium hyaluronate, centella asiatica extract, madecassoside, asiatic acid, madecassic acid, asiaticoside",
    origin: "South Korea",
    description:
      "A hypoallergenic, sub-acidic serum built on Torriden's five-type centella complex (T-TECA) to soothe irritation and gently exfoliate with gluconolactone (PHA).",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    price: 19,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "dry", "combination", "normal"],
    concerns: ["redness", "hydration", "barrier"],
  },
  {
    slug: "aestura-atobarrier365-hydro-cera-ha-serum",
    name: "ATOBARRIER365 Hydro Cera-HA Serum",
    brand: "Aestura",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid", "vitamin_c", "ceramides"],
    fullIngredients:
      "Water, butylene glycol, glycerin, niacinamide, sodium hyaluronate, 3-O-ethyl ascorbic acid, ceramide NP, cholesterol, panthenol, adenosine",
    origin: "South Korea",
    description:
      "A barrier-focused serum from the dermocosmetic brand Aestura, built on the patented Cera-HA complex to deliver long-lasting hydration alongside niacinamide and ceramide.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://int.aestura.com",
    price: 26,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    concerns: ["barrier", "hydration", "dullness"],
  },
  {
    slug: "sulwhasoo-first-care-activating-serum-vi",
    name: "First Care Activating Serum VI",
    brand: "Sulwhasoo",
    category: "serum",
    ingredientIds: [],
    fullIngredients:
      "Water, butylene glycol, glycerin, betaine, ophiopogon japonicus root extract, licorice root extract, honey, walnut seed extract, camellia sinensis leaf extract, JAUM Balancing Complex botanical blend",
    origin: "South Korea",
    description:
      "Sulwhasoo's iconic first-step serum, built around Korean herbal extracts in its JAUM Balancing Complex to prep and harmonize skin before the rest of the routine.",
    usageSteps: [
      "Apply after cleansing, AM & PM",
      "Sweep onto a cotton pad or pat directly into skin",
      "Follow with serum/moisturizer",
    ],
    officialUrl: "https://us.sulwhasoo.com",
    price: 68,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["hydration", "dullness", "aging"],
  },
  {
    slug: "numbuzin-no5-goodbye-blemish-serum",
    name: "No.5 Goodbye Blemish Serum",
    brand: "numbuzin",
    category: "serum",
    ingredientIds: ["niacinamide", "vitamin_c", "centella", "hyaluronic_acid"],
    fullIngredients:
      "Hippophae rhamnoides extract, niacinamide, ascorbyl glucoside, ascorbic acid, 3-O-ethyl ascorbic acid, centella asiatica extract, sodium hyaluronate, panthenol",
    origin: "South Korea",
    description:
      "A vitamin-tree-extract serum from numbuzin's No.5 line, combining three vitamin C forms with niacinamide and centella to fade post-acne marks and even tone.",
    usageSteps: [
      "Apply after toner, AM or PM",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://us.numbuzin.com",
    price: 22,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["acne", "pigmentation", "dullness"],
  },
  {
    slug: "the-ordinary-multi-peptide-ha-serum",
    name: "Multi-Peptide + HA Serum",
    brand: "The Ordinary",
    category: "serum",
    ingredientIds: ["peptides", "hyaluronic_acid"],
    fullIngredients:
      "Water, glycerin, Lactococcus ferment lysate, acetyl hexapeptide-8, pentapeptide-18, palmitoyl tripeptide-1, palmitoyl tetrapeptide-7, sodium hyaluronate",
    origin: "Canada",
    description:
      "Formerly known as 'Buffet,' a multi-technology peptide serum combining Matrixyl 3000 and other peptide complexes with hyaluronic acid to visibly smooth texture and address multiple signs of aging.",
    usageSteps: [
      "Apply after cleansing/toning, AM and/or PM",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://theordinary.com",
    price: 19,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "haruharu-wonder-black-rice-hyaluronic-anti-wrinkle-serum",
    name: "Black Rice Hyaluronic Anti-Wrinkle Serum",
    brand: "Haruharu Wonder",
    category: "serum",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Water, glycerin, camellia japonica seed oil, oryza sativa (rice) extract 10,000ppm, hyaluronic acid 2,000ppm, panax ginseng root extract",
    origin: "South Korea",
    description:
      "A 95%-naturally-derived milky serum built on fermented black rice and hyaluronic acid to firm, soothe, and hydrate for a plump, radiant look.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    officialUrl: "https://haruharuusa.com",
    price: 27,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "abib-heartleaf-teca-capsule-serum-calming-drop",
    name: "Heartleaf TECA Capsule Serum Calming Drop",
    brand: "Abib",
    category: "serum",
    ingredientIds: ["centella", "niacinamide", "hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Centella asiatica extract (TECA), houttuynia cordata (heartleaf) extract, niacinamide, panthenol, hyaluronic acid, ceramide, allantoin, madecassoside",
    origin: "South Korea",
    description:
      "A calming serum built on TECA (a purified centella complex) and Abib's heartleaf elixir, clinically tested to reduce inflammatory blemishes over four weeks.",
    usageSteps: [
      "Apply after toner, AM & PM",
      "Apply a few drops, pat in",
      "Follow with moisturizer",
    ],
    officialUrl: "https://en.abib.com",
    price: 32,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "combination", "normal"],
    concerns: ["redness", "acne", "barrier"],
  },
  {
    slug: "skin1004-probio-cica-intensive-ampoule",
    name: "Probio-Cica Intensive Ampoule",
    brand: "SKIN1004",
    category: "serum",
    ingredientIds: ["centella", "ceramides"],
    fullIngredients:
      "Centella asiatica extract, ceramide NP, phytosterol, fatty acid complex (3:1:1 ratio), panthenol, madecassoside",
    origin: "South Korea",
    description:
      "An ampoule pairing centella with a ceramide-phytosterol-fatty acid complex in a dermatologist-informed 3:1:1 ratio to lock in moisture and support a compromised barrier.",
    usageSteps: [
      "Apply after toner",
      "Pat a few drops into skin",
      "Follow with moisturizer",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-ampoule-serum-probio-cica-intensive-ampoule-40032156156150.png?v=1709706726",
    officialUrl: "https://skin1004.com/products/probio-cica-intensive-ampoule",
    price: 20,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "cerave-skin-renewing-vitamin-c-serum",
    name: "Skin Renewing Vitamin C Serum",
    brand: "CeraVe",
    category: "serum",
    ingredientIds: ["vitamin_c", "hyaluronic_acid", "ceramides", "vitamin_e"],
    fullIngredients:
      "Water, ascorbic acid 10%, glycerin, dimethicone, panthenol, ceramide NP, ceramide AP, ceramide EOP, sodium hyaluronate, tocopheryl acetate",
    origin: "USA",
    description:
      "A dermatologist-developed vitamin C serum pairing 10% L-ascorbic acid with three essential ceramides and hyaluronic acid to brighten tone without compromising the skin barrier.",
    usageSteps: [
      "AM step, after cleansing",
      "Apply a few drops to face",
      "Follow with moisturizer/SPF",
    ],
    officialUrl: "https://www.cerave.com",
    price: 25,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["dullness", "pigmentation", "barrier"],
  },
  {
    slug: "glow-recipe-watermelon-glow-niacinamide-dew-drops",
    name: "Watermelon Glow Niacinamide Dew Drops",
    brand: "Glow Recipe",
    category: "serum",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Water, propanediol, glycereth-26, glycerin, niacinamide, citrullus lanatus (watermelon) fruit extract, sodium hyaluronate, moringa oleifera seed oil",
    origin: "USA",
    description:
      "A liquid-highlighter-serum hybrid that uses light-reflecting watermelon extract and niacinamide to create a natural dewy glow while hydrating with hyaluronic acid.",
    usageSteps: [
      "Apply after serum/moisturizer, AM or PM",
      "Press 2-3 drops onto high points of the face or all over",
      "Can be mixed with foundation or worn alone",
    ],
    officialUrl: "https://www.glowrecipe.com",
    price: 34,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "oily"],
    concerns: ["dullness", "hydration"],
  },
  {
    slug: "round-lab-1025-dokdo-cream",
    name: "1025 Dokdo Cream",
    brand: "Round Lab",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Deep sea water, triple hyaluronic acid (hyaluronic acid, hydrolyzed hyaluronic acid, sodium hyaluronate), quintuple ceramide complex (NP, AP, AS, EOP, NS), shea butter, beta-glucan",
    origin: "South Korea",
    description:
      "A lightweight, fragrance-free gel-cream built around a five-ceramide complex and triple hyaluronic acid, formulated with Dokdo deep-sea water for sensitive, redness-prone, and acne-prone skin.",
    usageSteps: [
      "Apply as the final leave-on layer, AM/PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-cream-round-lab-1_66b8271b-613f-4510-82e8-b15abb0f1e37.jpg?v=1772849283",
    officialUrl: "https://roundlab.com/products/1025-dokdo-cream",
    price: 26,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration", "barrier", "redness"],
  },
  {
    slug: "cosrx-balancium-comfort-ceramide-cream",
    name: "Balancium Comfort Ceramide Cream",
    brand: "COSRX",
    category: "moisturizer",
    ingredientIds: ["centella", "ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Centella asiatica leaf water, ceramide NP, sodium hyaluronate, asiaticoside, asiatic acid, madecassic acid, panthenol",
    origin: "South Korea",
    description:
      "A barrier-repair moisturizer built around centella asiatica leaf water and ceramide NP, formulated to calm redness and reinforce a compromised skin barrier.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Scoop a pea-sized amount",
      "Massage in until absorbed",
    ],
    imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/balancium-comfort-ceramide-cream-cosrx-official-1.jpg?v=1724836862",
    officialUrl: "https://www.cosrx.com/products/balancium-comfort-ceramide-cream",
    price: 22,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "redness", "hydration"],
  },
  {
    slug: "im-from-rice-cream",
    name: "Rice Cream",
    brand: "I'm From",
    category: "moisturizer",
    ingredientIds: ["ceramides", "hyaluronic_acid"],
    fullIngredients:
      "41% rice bran water, ceramide NP, sodium hyaluronate, hydrolyzed hyaluronic acid, shea butter, rice bran oil, adenosine",
    origin: "South Korea",
    description:
      "A rich, glow-boosting cream built on a high concentration of rice bran water and ceramide NP, formulated to soften rough texture and support the moisture barrier.",
    usageSteps: [
      "Apply as the final leave-on layer, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in until absorbed",
    ],
    officialUrl: "https://theimfrom.com",
    price: 34,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["hydration", "barrier", "dullness"],
  },
  {
    slug: "skin1004-madagascar-centella-cream",
    name: "Madagascar Centella Cream",
    brand: "SKIN1004",
    category: "moisturizer",
    ingredientIds: ["centella"],
    fullIngredients:
      "Centella asiatica extract, TECA complex (madecassoside, asiaticoside, madecassic acid, asiatic acid), panthenol, shea butter",
    origin: "South Korea",
    description:
      "A soothing daily moisturizer built around centella asiatica extract and its TECA complex, formulated to calm and nourish sensitive, easily irritated skin.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 18,
    currency: "USD",
    skinTypes: ["sensitive", "dry", "normal", "combination", "oily"],
    concerns: ["redness", "hydration", "barrier"],
  },
  {
    slug: "goodal-green-tangerine-vita-c-dark-spot-care-cream",
    name: "Green Tangerine Vita C Dark Spot Care Cream",
    brand: "Goodal",
    category: "moisturizer",
    ingredientIds: ["niacinamide", "vitamin_c"],
    fullIngredients:
      "68% green tangerine (Citrus Tangerina) extract, niacinamide 4%, sodium ascorbyl phosphate, panthenol, adenosine, meadowfoam seed oil",
    origin: "South Korea",
    description:
      "A brightening moisturizer combining a high concentration of green tangerine extract with niacinamide and a stable vitamin C derivative to fade dark spots and even tone.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in until absorbed",
    ],
    officialUrl: "https://thegoodal.com",
    price: 28,
    currency: "USD",
    skinTypes: ["normal", "combination", "dry"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "belif-the-true-cream-aqua-bomb",
    name: "The True Cream Aqua Bomb",
    brand: "belif",
    category: "moisturizer",
    ingredientIds: ["niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Sodium hyaluronate, niacinamide, herbal blend (oat kernel extract, calendula flower extract, raspberry leaf extract, chickweed extract), panthenol",
    origin: "South Korea",
    description:
      "belif's iconic gel-cream, formulated with a proprietary herbal complex plus hyaluronic acid and niacinamide, for an intense burst of hydration with a lightweight, bouncy finish.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Scoop a pea-to-nickel-size amount",
      "Massage in as the final layer",
    ],
    officialUrl: "https://belifbrand.com",
    price: 38,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "dry"],
    concerns: ["hydration", "dullness"],
    featured: true,
  },
  {
    slug: "laneige-water-bank-blue-hyaluronic-cream",
    name: "Water Bank Blue Hyaluronic Cream",
    brand: "Laneige",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Squalane, hydrolyzed hyaluronic acid, ceramide NP, Undaria pinnatifida (sea algae) extract, glycerin, butylene glycol",
    origin: "South Korea",
    description:
      "A gel-cream moisturizer built on Laneige's signature Blue Hyaluronic Acid complex and ceramide NP, formulated for long-lasting hydration on normal-to-dry, sensitive skin.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    officialUrl: "https://us.laneige.com",
    price: 38,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "innisfree-green-tea-seed-hyaluronic-cream",
    name: "Green Tea Seed Hyaluronic Cream",
    brand: "innisfree",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid", "ceramides"],
    fullIngredients:
      "Jeju green tea leaf water, camellia sinensis seed oil, squalane, ceramide, sodium hyaluronate, cholesterol, panthenol",
    origin: "South Korea",
    description:
      "Innisfree's best-selling cream, built on a Green Tea Barrier Complex of green tea seed oil, squalane, and ceramide, formulated with five types of hyaluronic acid to lock in moisture.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in until absorbed",
    ],
    officialUrl: "https://us.innisfree.com",
    price: 32,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "klairs-rich-moist-soothing-cream",
    name: "Rich Moist Soothing Cream",
    brand: "Dear, Klairs",
    category: "moisturizer",
    ingredientIds: ["centella", "ceramides", "hyaluronic_acid", "vitamin_e"],
    fullIngredients:
      "Yeast-derived beta-glucan, ceramide NP, shea butter, jojoba seed oil, centella asiatica extract, sodium hyaluronate, tocopheryl acetate",
    origin: "South Korea",
    description:
      "A spreadable, non-sticky cream combining beta-glucan, ceramide NP, and centella asiatica extract, formulated for sensitive, dry skin that needs richer barrier support.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    officialUrl: "https://klairs.com",
    price: 25,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "cerave-moisturizing-cream",
    name: "Moisturizing Cream",
    brand: "CeraVe",
    category: "moisturizer",
    ingredientIds: ["ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Three essential ceramides (NP, AP, EOP), hyaluronic acid, petrolatum, glycerin, MVE delivery technology",
    origin: "USA",
    description:
      "A dermatologist-developed, fragrance-free rich cream combining three essential ceramides with hyaluronic acid and petrolatum, formulated for very dry to normal skin on the face and body.",
    usageSteps: [
      "Apply to clean skin, AM and/or PM",
      "Massage in until absorbed",
    ],
    officialUrl: "https://www.cerave.com",
    price: 19,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["hydration", "barrier"],
    featured: true,
  },
  {
    slug: "la-roche-posay-toleriane-double-repair-face-moisturizer",
    name: "Toleriane Double Repair Face Moisturizer",
    brand: "La Roche-Posay",
    category: "moisturizer",
    ingredientIds: ["ceramides", "niacinamide"],
    fullIngredients:
      "Ceramide-3, niacinamide, glycerin, squalane, La Roche-Posay Prebiotic Thermal Water, dimethicone",
    origin: "France",
    description:
      "A dermatologist-developed oil-free moisturizer pairing ceramide-3 with niacinamide and prebiotic thermal water, designed to repair the skin barrier within an hour and hydrate for 48 hours.",
    usageSteps: [
      "Apply to clean skin, AM and/or PM",
      "Smooth evenly over face and neck",
      "Follow with SPF in the morning",
    ],
    officialUrl: "https://www.laroche-posay.us",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "dry", "sensitive", "combination", "oily"],
    concerns: ["barrier", "hydration"],
  },
  {
    slug: "first-aid-beauty-ultra-repair-cream",
    name: "Ultra Repair Cream Intense Hydration",
    brand: "First Aid Beauty",
    category: "moisturizer",
    ingredientIds: ["ceramides"],
    fullIngredients:
      "Colloidal oatmeal, shea butter, ceramide NP, squalane, allantoin, licorice root extract, feverfew extract",
    origin: "USA",
    description:
      "A clinically tested, whipped colloidal oatmeal cream formulated to strengthen the skin barrier and relieve very dry, distressed, or eczema-prone skin on face and body.",
    usageSteps: [
      "Apply to clean skin, AM and/or PM",
      "Massage in until absorbed",
      "Reapply as needed to dry patches",
    ],
    officialUrl: "https://www.firstaidbeauty.com",
    price: 38,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "torriden-dive-in-low-molecular-hyaluronic-acid-cream",
    name: "DIVE-IN Low Molecular Hyaluronic Acid Cream",
    brand: "Torriden",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid", "ceramides", "centella"],
    fullIngredients:
      "Five types of hyaluronic acid, ceramide NP, madecassoside, madecassic acid, jojoba seed oil, macadamia seed oil, beta-glucan",
    origin: "South Korea",
    description:
      "A cream companion to Torriden's hyaluronic acid serum, layering five molecular weights of hyaluronic acid with ceramide NP and centella derivatives to seal in hydration.",
    usageSteps: [
      "Apply as the final leave-on step, AM & PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    officialUrl: "https://torriden.us",
    price: 24,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination", "oily"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "isntree-hyaluronic-acid-moist-cream",
    name: "Hyaluronic Acid Moist Cream",
    brand: "ISNTREE",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "10 types of hyaluronic acid, shea butter, argan oil, apricot kernel oil, safflower seed oil, beta-glucan",
    origin: "South Korea",
    description:
      "A lightweight, fragrance-free cream layering ten types of hyaluronic acid with argan and apricot oils, designed to hydrate without a heavy or greasy finish.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in until absorbed",
    ],
    officialUrl: "https://theisntree.com",
    price: 23,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive", "oily"],
    concerns: ["hydration"],
  },
  {
    slug: "aestura-atobarrier365-hydro-soothing-cream",
    name: "ATOBARRIER365 Hydro Soothing Cream",
    brand: "Aestura",
    category: "moisturizer",
    ingredientIds: [],
    fullIngredients:
      "Squalane, cholesterol, phytosphingosine, hydroxypropyl bispalmitamide MEA, carnauba wax extract, allantoin",
    origin: "South Korea",
    description:
      "A lighter, gel-textured version of Aestura's barrier-repair cream line, using squalane and lipid-mimicking ingredients to soothe and hydrate compromised skin.",
    usageSteps: [
      "Apply as the final leave-on layer, AM/PM",
      "Apply generously over face and neck",
      "Massage in",
    ],
    officialUrl: "https://int.aestura.com",
    price: 28,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "haruharu-wonder-black-rice-hyaluronic-cream",
    name: "Black Rice Hyaluronic Cream (Unscented)",
    brand: "Haruharu Wonder",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Korean black rice extract 10,000ppm, hyaluronic acid 200ppm, evening primrose oil, panax ginseng root extract, safflower seed oil",
    origin: "South Korea",
    description:
      "A 95%-naturally-derived cream built around Korean black rice extract and evening primrose oil, formulated to firm and deeply hydrate without fragrance.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly over face",
      "Massage in until absorbed",
    ],
    officialUrl: "https://haruharuusa.com",
    price: 24,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "sensitive"],
    concerns: ["hydration", "aging"],
  },
  {
    slug: "vanicream-moisturizing-cream",
    name: "Moisturizing Cream",
    brand: "Vanicream",
    category: "moisturizer",
    ingredientIds: [],
    fullIngredients:
      "Purified water, petrolatum, sorbitol, cetearyl alcohol, propylene glycol, ceteareth-20, simethicone, glyceryl stearate",
    origin: "USA",
    description:
      "An 11-ingredient, dye- and fragrance-free cream developed for red, irritated, cracking, or itchy skin, formulated without common allergens or masking fragrance.",
    usageSteps: [
      "Apply to clean skin, AM and/or PM",
      "Massage in until absorbed",
    ],
    officialUrl: "https://www.vanicream.com",
    price: 17,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["barrier", "hydration", "redness"],
  },
  {
    slug: "pyunkang-yul-nutrition-cream",
    name: "Nutrition Cream",
    brand: "Pyunkang Yul",
    category: "moisturizer",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Astragalus membranaceus root extract, shea butter, macadamia seed oil, beeswax, sodium hyaluronate",
    origin: "South Korea",
    description:
      "A richer, oil-and-beeswax-based moisturizer from Pyunkang Yul's minimalist line, formulated to deeply nourish and seal in moisture for dry and combination skin.",
    usageSteps: [
      "Apply as the final leave-on step, AM/PM",
      "Take an appropriate amount and spread evenly",
      "Massage in until absorbed",
    ],
    officialUrl: "https://pyunkangyul.us",
    price: 19,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["hydration", "barrier"],
  },
  {
    slug: "biossance-100-squalane-oil",
    name: "100% Squalane Oil",
    brand: "Biossance",
    category: "oil",
    ingredientIds: [],
    fullIngredients: "100% squalane (sugarcane-derived)",
    origin: "USA",
    description:
      "A single-ingredient, sugarcane-derived squalane oil that is bioidentical to skin's natural lipids, formulated as a fast-absorbing, weightless moisturizer for face and body.",
    usageSteps: [
      "Final AM/PM step, or mix into moisturizer",
      "Press 2-3 drops onto the face",
      "Can be layered over moisturizer to seal in hydration",
    ],
    officialUrl: "https://www.biossance.com",
    price: 34,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "josie-maran-100-pure-argan-oil",
    name: "The Original 100% Pure Argan Oil",
    brand: "Josie Maran",
    category: "oil",
    ingredientIds: [],
    fullIngredients: "100% pure, organic Argania spinosa (argan) kernel oil",
    origin: "USA",
    description:
      "A single-ingredient, certified organic argan oil marketed to nourish and condition dry skin and hair, from the brand credited with popularizing argan oil in the US market.",
    usageSteps: [
      "Final PM step, or mix into moisturizer",
      "Warm 2-3 drops between palms",
      "Press gently over face and neck",
    ],
    officialUrl: "https://www.josiemaran.com",
    price: 48,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["hydration", "dullness"],
  },
  {
    slug: "trilogy-certified-organic-rosehip-oil",
    name: "Certified Organic Rosehip Oil",
    brand: "Trilogy",
    category: "oil",
    ingredientIds: [],
    fullIngredients: "100% certified organic Rosa canina (rosehip) seed oil",
    origin: "New Zealand",
    description:
      "An award-winning, single-ingredient certified organic rosehip oil, cold-pressed and unrefined, marketed to help fade the look of scars and even skin tone over time.",
    usageSteps: [
      "Apply as the final step, AM or PM",
      "Press 2-3 drops between palms and press onto face",
      "Can be mixed into moisturizer",
    ],
    officialUrl: "https://www.trilogyproducts.com",
    price: 22,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["aging", "pigmentation", "dullness"],
  },
  {
    slug: "aromatica-organic-rosehip-oil",
    name: "Organic Rosehip Oil",
    brand: "Aromatica",
    category: "oil",
    ingredientIds: [],
    fullIngredients:
      "100% ECOCERT-certified organic, cold-pressed Rosa canina (rosehip) fruit oil",
    origin: "South Korea",
    description:
      "A single-ingredient, cold-pressed organic rosehip oil from Korean clean-beauty brand Aromatica, left undeodorized to preserve its natural nutrient content.",
    usageSteps: [
      "Apply as the final step, AM or PM",
      "Press 2-3 drops between palms and press onto face",
      "Can be mixed into moisturizer for extra nourishment",
    ],
    officialUrl: "https://global.aromatica.co",
    price: 24,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["aging", "dullness"],
  },
  {
    slug: "the-ordinary-100-plant-derived-squalane",
    name: "100% Plant-Derived Squalane",
    brand: "The Ordinary",
    category: "oil",
    ingredientIds: [],
    fullIngredients: "100% plant-derived squalane (sugarcane-derived)",
    origin: "Canada",
    description:
      "A single-ingredient, sugarcane-derived squalane formulated to support surface-level hydration and the skin's moisture barrier, at The Ordinary's characteristic low price point.",
    usageSteps: [
      "Apply as the final step, AM or PM, on skin or hair",
      "Press 2-3 drops between palms and press onto face",
      "Can be mixed into moisturizer",
    ],
    officialUrl: "https://theordinary.com",
    price: 10,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination", "oily"],
    concerns: ["hydration"],
  },
  {
    slug: "herbivore-botanicals-phoenix-facial-oil",
    name: "Phoenix Rosehip + Sea Buckthorn Deep Renewal Facial Oil",
    brand: "Herbivore Botanicals",
    category: "oil",
    ingredientIds: ["vitamin_e"],
    fullIngredients:
      "Jojoba seed oil, rosehip seed oil, meadowfoam seed oil, chia seed oil, CoQ10, sea buckthorn oil, tocopherol (vitamin E), rose absolute",
    origin: "USA",
    description:
      "A luxury blend of rosehip and sea buckthorn oils with CoQ10 and vitamin E, formulated to rehydrate and rejuvenate dull, aging skin at the surface level.",
    usageSteps: [
      "Final PM step after moisturizer",
      "Warm 2-3 drops between palms",
      "Press gently over face and neck",
    ],
    officialUrl: "https://www.herbivorebotanicals.com",
    price: 88,
    currency: "USD",
    skinTypes: ["dry", "normal"],
    concerns: ["aging", "dullness", "hydration"],
  },
  {
    slug: "goodal-green-tangerine-vita-c-dark-circle-eye-cream",
    name: "Green Tangerine Vita C Dark Circle Eye Cream",
    brand: "Goodal",
    category: "eye",
    ingredientIds: ["vitamin_c", "niacinamide"],
    fullIngredients:
      "Citrus Tangerina (green tangerine) extract 54%, niacinamide, ethyl ascorbyl ether (vitamin C derivative, 2000ppm), arbutin, adenosine",
    origin: "South Korea",
    description:
      "A brightening eye cream built on a high concentration of green tangerine extract and a stabilized vitamin C derivative, formulated to target dark circles and dullness around the eyes.",
    usageSteps: [
      "Apply AM and/or PM as the last step",
      "Dot gently around the orbital bone",
      "Pat in with ring finger until absorbed",
    ],
    officialUrl: "https://goodalskincare.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["pigmentation", "dullness"],
  },
  {
    slug: "belif-the-true-cream-moisturizing-eye-bomb",
    name: "The True Cream Moisturizing Eye Bomb",
    brand: "belif",
    category: "eye",
    ingredientIds: ["peptides", "ceramides"],
    fullIngredients:
      "Squalane, ceramide NP, panthenol, bakuchiol, caffeine, centella asiatica leaf extract, peptides",
    origin: "South Korea",
    description:
      "A rich, ceramide-and-bakuchiol eye cream that firms and moisturizes the eye area, formulated with caffeine to help reduce the look of puffiness.",
    usageSteps: [
      "Apply AM and/or PM as the last step",
      "Dot a small amount around the orbital bone",
      "Gently pat in until absorbed",
    ],
    officialUrl: "https://www.belifusa.com",
    price: 38,
    currency: "USD",
    skinTypes: ["dry", "normal", "combination"],
    concerns: ["aging", "hydration"],
    featured: true,
  },
  {
    slug: "missha-time-revolution-primestem-100-eye-cream",
    name: "Time Revolution Primestem 100 Eye Cream",
    brand: "MISSHA",
    category: "eye",
    ingredientIds: ["niacinamide", "ceramides", "vitamin_e"],
    fullIngredients:
      "Helichrysum italicum flower water, niacinamide, angelica archangelica callus extract, ceramide, tocopherol (vitamin E), shea butter",
    origin: "South Korea",
    description:
      "A firming eye cream built around plant stem cell-derived angelica callus extract, paired with niacinamide and ceramides to lift, hydrate, and strengthen the eye area's barrier.",
    usageSteps: [
      "Apply AM and/or PM as the last step",
      "Dot around the orbital bone",
      "Gently pat in until absorbed",
    ],
    officialUrl: "https://misshaus.com",
    price: 38,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "mixsoon-bean-eye-cream",
    name: "Bean Eye Cream",
    brand: "Mixsoon",
    category: "eye",
    ingredientIds: ["niacinamide", "peptides"],
    fullIngredients:
      "Lactobacillus/soybean ferment extract, lactobacillus/rice ferment extract, hibiscus syriacus callus extract, niacinamide, peptide complex (BIOME5X)",
    origin: "South Korea",
    description:
      "A fermented bean and peptide eye cream that firms, brightens, and hydrates the delicate eye area using mixsoon's proprietary moisture-retention complex.",
    usageSteps: [
      "Apply AM and/or PM as the last step",
      "Dot around the orbital bone",
      "Gently pat in until absorbed",
    ],
    officialUrl: "https://mixsoon.us",
    price: 20,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "numbuzin-no9-nad-retinol-volumetox-eye-cream",
    name: "No.9 NAD+ Retinol Volumetox Eye Cream",
    brand: "numbuzin",
    category: "eye",
    ingredientIds: ["retinol", "peptides", "niacinamide", "ceramides"],
    fullIngredients:
      "NAD+, retinol, 50-peptide complex, niacinamide, ceramide, adenosine",
    origin: "South Korea",
    description:
      "An anti-aging eye cream combining NAD+ and retinol with a 50-peptide complex to firm skin, smooth the look of wrinkles, and restore volume to hollow under-eye areas.",
    usageSteps: [
      "Apply as the last step, as directed on packaging",
      "Dot a small amount around the orbital bone",
      "Gently pat in until absorbed",
    ],
    officialUrl: "https://us.numbuzin.com",
    price: 21,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination"],
    concerns: ["aging"],
  },
  {
    slug: "round-lab-birch-juice-moisturizing-eye-balm",
    name: "Birch Juice Moisturizing Eye Balm",
    brand: "Round Lab",
    category: "eye",
    ingredientIds: ["hyaluronic_acid"],
    fullIngredients:
      "Birch (Betula platyphylla japonica) sap 90%, sodium hyaluronate, amino acids",
    origin: "South Korea",
    description:
      "A cooling stick-format eye balm built on a 90% birch sap base to hydrate, de-puff, and calm the eye area and other dry, tired spots.",
    usageSteps: [
      "Apply AM and/or PM",
      "Glide the stick gently around the orbital bone",
      "Pat in with fingertips if desired",
    ],
    officialUrl: "https://roundlab.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "anua-retinol-01-caffeine-revitalizing-eye-cream",
    name: "Retinol 0.1 Caffeine Revitalizing Eye Cream",
    brand: "Anua",
    category: "eye",
    ingredientIds: ["retinol", "niacinamide", "ceramides"],
    fullIngredients:
      "Retinol 0.1%, caffeine, niacinamide, ceramides, panthenol",
    origin: "South Korea",
    description:
      "A firming eye cream that combines a low-strength retinol with caffeine to tighten eye contours and reduce puffiness, buffered with niacinamide and ceramides for sensitive skin.",
    usageSteps: [
      "PM - start every other night to build tolerance",
      "Dot a small amount around the orbital bone",
      "Gently pat in; follow with SPF the next morning",
    ],
    officialUrl: "https://anua.com",
    price: 22,
    currency: "USD",
    skinTypes: ["normal", "dry", "combination", "sensitive"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "skin1004-madagascar-centella-probio-cica-bakuchiol-eye-cream",
    name: "Madagascar Centella Probio-Cica Bakuchiol Eye Cream",
    brand: "SKIN1004",
    category: "eye",
    ingredientIds: ["centella", "ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Fermented centella asiatica extract, bakuchiol, ceramides, low-molecular collagen, hyaluronic acid",
    origin: "South Korea",
    description:
      "An eye cream pairing fermented centella asiatica with bakuchiol, a plant-based retinol alternative, to smooth the look of fine lines while soothing and hydrating the eye area.",
    usageSteps: [
      "Apply AM and/or PM as the last step before moisturizer",
      "Massage gently from inner to outer eye area",
      "Follow with moisturizer",
    ],
    officialUrl: "https://www.skin1004.com",
    price: 20,
    currency: "USD",
    skinTypes: ["sensitive", "normal", "dry", "combination"],
    concerns: ["aging", "hydration"],
  },
  {
    slug: "some-by-mi-aha-bha-pha-30-days-miracle-cream",
    name: "AHA. BHA. PHA 30 Days Miracle Cream",
    brand: "Some By Mi",
    category: "spot",
    ingredientIds: ["aha", "bha", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Centella asiatica extract 70.78%, tea tree leaf water 10,000ppm, niacinamide, adenosine, sodium hyaluronate, AHA/BHA/PHA exfoliant blend",
    origin: "South Korea",
    description:
      "A triple-acid exfoliating cream for acne-prone skin, combining AHA, BHA, and PHA with a high concentration of centella and tea tree water to clear congestion while calming irritation.",
    usageSteps: [
      "Apply after toner/serum, AM or PM",
      "Spread a thin layer over acne-prone areas or the full face",
      "Start every other day to build tolerance",
    ],
    officialUrl: "https://some-by-mi.com",
    price: 19,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "redness", "barrier"],
  },
  {
    slug: "cosrx-ac-collection-blemish-spot-clearing-serum",
    name: "AC Collection Blemish Spot Clearing Serum",
    brand: "COSRX",
    category: "spot",
    ingredientIds: ["niacinamide", "hyaluronic_acid", "centella"],
    fullIngredients:
      "Propolis extract, niacinamide 4%, centella asiatica-derived asiaticoside/asiatic acid/madecassic acid, panthenol, tea tree leaf oil, sodium hyaluronate, ceramide NP",
    origin: "South Korea",
    description:
      "A targeted blemish serum that pairs niacinamide with a three-part centella complex and propolis to calm active breakouts and fade the marks they leave behind.",
    usageSteps: [
      "Apply after toner",
      "Spot-apply or spread thinly over blemish-prone areas",
      "Follow with moisturizer",
    ],
    officialUrl: "https://www.cosrx.com",
    price: 20,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive"],
    concerns: ["acne", "redness", "pigmentation"],
  },
  {
    slug: "starface-hydro-star-salicylic-acid-patches",
    name: "Hydro-Star + Salicylic Acid Pimple Patches",
    brand: "Starface",
    category: "spot",
    ingredientIds: ["bha"],
    fullIngredients:
      "Hydrocolloid (cellulose gum, polyisobutene, polyurethane film), salicylic acid",
    origin: "USA",
    description:
      "The viral star-shaped hydrocolloid patch, in a version boosted with salicylic acid to unclog pores and flatten surface-level pimples and whiteheads.",
    usageSteps: [
      "Apply to a clean, dry blemish",
      "Leave on for at least 6 hours or overnight",
      "Peel off once it turns white/cloudy",
    ],
    officialUrl: "https://starface.world",
    price: 13,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["acne"],
  },
  {
    slug: "rael-miracle-patch-invisible-spot-cover",
    name: "Miracle Patch Invisible Spot Cover",
    brand: "Rael",
    category: "spot",
    ingredientIds: [],
    fullIngredients:
      "Hydrocolloid (cellulose gum, polyisoprene, polyisobutene) - no active drug ingredients",
    origin: "USA",
    description:
      "A clear, ultra-thin hydrocolloid patch that absorbs fluid from surfaced blemishes and blends into skin for barely-there daytime coverage.",
    usageSteps: [
      "Apply to a clean, dry blemish that has come to a head",
      "Leave on for 4-8 hours",
      "Remove once it turns white/opaque",
    ],
    officialUrl: "https://www.getrael.com",
    price: 8,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "sensitive"],
    concerns: ["acne"],
  },
  {
    slug: "innisfree-bija-salicylic-spot-serum",
    name: "Bija Salicylic Spot Serum",
    brand: "innisfree",
    category: "spot",
    ingredientIds: ["bha"],
    fullIngredients:
      "Torreya nucifera (bija) seed oil, salicylic acid, castor seed oil, cocoa extract, dipotassium glycyrrhizate",
    origin: "South Korea",
    description:
      "A daily, non-stripping spot gel-serum combining salicylic acid with bija seed oil to exfoliate dead skin buildup and calm blemish-prone areas.",
    usageSteps: [
      "Apply after cleansing, AM or PM",
      "Apply a moderate amount to trouble areas",
      "Follow with moisturizer",
    ],
    officialUrl: "https://us.innisfree.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "pores"],
  },
  {
    slug: "dr-g-red-blemish-clear-soothing-spot-balm",
    name: "R.E.D Blemish Clear Soothing Spot Balm",
    brand: "Dr.G",
    category: "spot",
    ingredientIds: ["niacinamide", "centella"],
    fullIngredients:
      "Madecassoside, asiaticoside, asiatic acid, centella asiatica leaf extract, tranexamic acid, niacinamide, licorice root extract, panthenol",
    origin: "South Korea",
    description:
      "An intensive spot balm that pairs madecassoside and licorice extract to soothe active blemishes with tranexamic acid and niacinamide to fade the pigmentation they leave behind.",
    usageSteps: [
      "Apply after serum/moisturizer, AM/PM",
      "Dab a small amount directly onto blemishes",
      "Leave on, no need to rinse",
    ],
    officialUrl: "https://dr-g.com",
    price: 20,
    currency: "USD",
    skinTypes: ["sensitive", "oily", "combination"],
    concerns: ["acne", "redness", "pigmentation"],
  },
  {
    slug: "abib-heartleaf-calming-spot-patch",
    name: "Heartleaf Calming Spot Patch",
    brand: "Abib",
    category: "spot",
    ingredientIds: [],
    fullIngredients:
      "Hydrocolloid patch enriched with houttuynia cordata (heartleaf) extract, centella asiatica extract, and tea tree oil",
    origin: "South Korea",
    description:
      "A dermatologist-tested hydrocolloid spot patch infused with heartleaf and centella extracts to absorb fluid and speed healing on acne-prone skin.",
    usageSteps: [
      "Apply to a clean, dry blemish",
      "Leave on until it turns white/cloudy",
      "Replace with a new patch as needed",
    ],
    officialUrl: "https://en.abib.com",
    price: 15,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive"],
    concerns: ["acne", "redness"],
  },
  {
    slug: "round-lab-birch-juice-moisturizing-sun-cream-spf50",
    name: "Birch Juice Moisturizing Sun Cream SPF50+ PA++++",
    brand: "Round Lab",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Ethylhexyl triazone, diethylamino hydroxybenzoyl hexyl benzoate, methylene bis-benzotriazolyl tetramethylbutylphenol, niacinamide, birch (Betula platyphylla japonica) sap, sodium hyaluronate, adenosine",
    origin: "South Korea",
    description:
      "A lightweight, lotion-like hybrid sunscreen built on Round Lab's birch sap base, formulated for a no-white-cast finish on sensitive skin.",
    usageSteps: [
      "Apply as the last AM step",
      "Use about two finger-lengths, generously",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://roundlab.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "anua-heartleaf-silky-moisture-sun-cream-spf50",
    name: "Heartleaf Silky Moisture Sun Cream SPF50+ PA++++",
    brand: "Anua",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Houttuynia cordata (heartleaf) extract 30%, ethylhexyl triazone, terephthalylidene dicamphor sulfonic acid, niacinamide, panthenol, 10 types of hyaluronic acid",
    origin: "South Korea",
    description:
      "A silky, fragrance-free chemical sunscreen built on a high concentration of heartleaf extract, formulated to protect and calm sensitive, redness-prone skin without a white cast.",
    usageSteps: [
      "Apply as the last AM step",
      "Use generously over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://anua.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["redness", "hydration"],
  },
  {
    slug: "missha-all-around-safe-block-essence-sun-spf45",
    name: "All-Around Safe Block Essence Sun SPF45 PA+++",
    brand: "MISSHA",
    category: "sunscreen",
    ingredientIds: ["spf"],
    fullIngredients:
      "Ethylhexyl methoxycinnamate, ethylhexyl salicylate, phenylbenzimidazole sulfonic acid, diethylamino hydroxybenzoyl hexyl benzoate, lotus/chrysanthemum/camellia flower extracts, thanaka extract",
    origin: "South Korea",
    description:
      "A budget-friendly, oil-free chemical sunscreen with a lightweight essence texture and a blend of botanical extracts for a soothing, non-sticky finish.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://misshaus.com",
    price: 14,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["hydration"],
  },
  {
    slug: "purito-centella-green-level-unscented-sun-spf50",
    name: "Centella Green Level Unscented Sun SPF50+ PA++++",
    brand: "PURITO SEOUL",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "centella", "hyaluronic_acid"],
    fullIngredients:
      "Butyloctyl salicylate, diethylamino hydroxybenzoyl hexyl benzoate, ethylhexyl triazone, niacinamide, centella asiatica extract, madecassoside, hyaluronic acid, adenosine, tocopherol",
    origin: "South Korea",
    description:
      "A cult-favorite fragrance-free chemical sunscreen that pairs UV filters with centella asiatica and niacinamide for a soothing, no-white-cast daily wear formula.",
    usageSteps: [
      "Apply as the last AM step",
      "Use about two finger-lengths, generously",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://purito.com",
    price: 18,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["redness", "hydration"],
    featured: true,
  },
  {
    slug: "etude-house-sunprise-mild-airy-finish-spf50",
    name: "Sunprise Mild Airy Finish SPF50+/PA+++",
    brand: "Etude House",
    category: "sunscreen",
    ingredientIds: ["spf", "hyaluronic_acid", "centella"],
    fullIngredients:
      "Zinc oxide (nano), sodium hyaluronate, centella asiatica extract, aloe barbadensis leaf juice, sunflower seed oil, tocopherol",
    origin: "South Korea",
    description:
      "A mineral sunscreen with a weightless, non-sticky finish built around zinc oxide, formulated to control oil while staying gentle enough for sensitive skin.",
    usageSteps: [
      "Apply as the last AM step",
      "Spread thinly and evenly over face",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://www.etudehouse.com",
    price: 16,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "innisfree-daily-uv-defense-sunscreen-spf50",
    name: "Daily UV Defense Sunscreen Broad Spectrum SPF50+",
    brand: "innisfree",
    category: "sunscreen",
    ingredientIds: ["spf", "centella"],
    fullIngredients:
      "Butyloctyl salicylate, ethylhexyl methoxycrylene, camellia sinensis (green tea) leaf extract, centella asiatica extract, witch hazel flower water",
    origin: "South Korea",
    description:
      "A weightless, invisible-finish daily sunscreen formulated without oxybenzone or octinoxate, earning the Skin Cancer Foundation's Daily Use Seal.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and body",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://us.innisfree.com",
    price: 22,
    currency: "USD",
    skinTypes: ["oily", "dry", "combination", "normal", "sensitive"],
    concerns: ["hydration"],
  },
  {
    slug: "eltamd-uv-clear-broad-spectrum-spf46",
    name: "UV Clear Broad-Spectrum SPF 46",
    brand: "EltaMD",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "hyaluronic_acid"],
    fullIngredients:
      "Octinoxate 7.5%, zinc oxide 9.0%, niacinamide 5%, sodium hyaluronate, hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer",
    origin: "USA",
    description:
      "A dermatologist-recommended hybrid sunscreen formulated with niacinamide for acne-prone and post-procedure skin - one of the most widely recommended facial sunscreens in the US.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://eltamd.com",
    price: 45,
    currency: "USD",
    skinTypes: ["oily", "combination", "sensitive", "normal"],
    concerns: ["acne", "pigmentation"],
    featured: true,
  },
  {
    slug: "supergoop-unseen-sunscreen-spf40",
    name: "Unseen Sunscreen SPF 40",
    brand: "Supergoop",
    category: "sunscreen",
    ingredientIds: ["spf"],
    fullIngredients:
      "Avobenzone 3%, homosalate 8%, octisalate 5%, octocrylene 4%, meadowfoam seed oil, shea butter, jojoba esters",
    origin: "USA",
    description:
      "A totally invisible, weightless, scentless gel sunscreen that doubles as a makeup primer, leaving no white cast or greasy residue.",
    usageSteps: [
      "Apply as the last AM step",
      "Massage a thin layer evenly over face",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://supergoop.com",
    price: 40,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal", "dry"],
    concerns: ["hydration"],
  },
  {
    slug: "la-roche-posay-anthelios-ultra-light-fluid-spf60",
    name: "Anthelios Ultra-Light Fluid Facial Sunscreen SPF 60",
    brand: "La Roche-Posay",
    category: "sunscreen",
    ingredientIds: ["spf"],
    fullIngredients:
      "Avobenzone 3%, homosalate 10%, octisalate 5%, octocrylene 7%, Cell-Ox Shield antioxidant complex",
    origin: "France",
    description:
      "An oxybenzone-free, fast-absorbing chemical sunscreen fluid with a non-whitening finish designed to sit smoothly under makeup.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://www.laroche-posay.us",
    price: 30,
    currency: "USD",
    skinTypes: ["oily", "combination", "normal"],
    concerns: ["hydration"],
  },
  {
    slug: "cerave-hydrating-mineral-sunscreen-spf30",
    name: "Hydrating Mineral Sunscreen Face Lotion SPF 30",
    brand: "CeraVe",
    category: "sunscreen",
    ingredientIds: ["spf", "niacinamide", "ceramides", "hyaluronic_acid"],
    fullIngredients:
      "Titanium dioxide 6%, zinc oxide 5%, niacinamide, ceramide NP, ceramide AP, ceramide EOP, sodium hyaluronate",
    origin: "USA",
    description:
      "A 100%-mineral facial sunscreen developed with dermatologists, combining zinc oxide and titanium dioxide with CeraVe's three essential ceramides and niacinamide to protect while supporting the skin barrier.",
    usageSteps: [
      "Apply as the last AM step",
      "Smooth evenly over face and neck",
      "Reapply every 2 hours in the sun",
    ],
    officialUrl: "https://www.cerave.com",
    price: 17,
    currency: "USD",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    concerns: ["hydration", "barrier"],
  },
  {
      slug: "cosrx-azelaic-acid-20-b5-redness-soothing-cream",
      name: "Azelaic Acid 20 B5 Redness Soothing Cream",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#AzelaicAcid20 #IntensiveSpotCare #NonComedogenic #DermCream A clinically tested, high-strength 20% azelaic acid cream that intensively targets persistent blemishes, stubborn redness, and post-acne marks - a clinic-grade derm cream for pre, active, and post ac",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/AzelaicAcid_20_Cream_00-elementor-io-optimized_053c8df8-aeba-4cb7-afd5-e07570dfad48.webp?v=1782711153",
      officialUrl: "https://www.cosrx.com/products/cosrx-azelaic-acid-20-ac-blemish-spot-serum",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "cosrx-azelaic-acid-10-b5-redness-soothing-cream",
      name: "Azelaic Acid 10 B5 Redness Soothing Cream",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#AzelaicAcid10 #BlemishCare #NonComedogenic #RednessRescueCream #DermCream A highly concentrated 99% pure 10% azelaic acid cream that visibly reduces redness, controls blemishes, and rebalances skin's natural pH - a clinic-grade derm cream for pre, active, and",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/AzelaicAcid_10_Cream_00.webp?v=1782456881",
      officialUrl: "https://www.cosrx.com/products/cosrx-azelaic-acid10-b5-redness-soothing-cream",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness",
          "aging"
      ]
  },
  {
      slug: "cosrx-one-step-moisture-up-pad",
      name: "One Step Moisture Up Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Full of strong natural moisture energy with high content of Alaskan glacier water Alaska glacier water fills your skin with moisture, Moisture toning pads with BHA and PHA to gently care your skin texture.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Moisture_Pad_0.jpg?v=1710475791",
      officialUrl: "https://www.cosrx.com/products/one-step-moisture-up-pad",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-the-blue-peptide-bakuchiol-plump-bounce-cream",
      name: "The Blue Peptide Bakuchiol Plump Bounce Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#CopperPeptide(GHK-Cu) #Bakuchiol #Anti-agingCream A high-performance anti-aging water-texture cream powered by Copper Tripeptide-1 (GHK-Cu), Bakuchiol (a plant-based retinol alternative), and Ceramides to visibly firm skin and reinforce the moisture barrier.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/BluePeptide_Cream_00.webp?v=1779876169",
      officialUrl: "https://www.cosrx.com/products/the-blue-peptide-bakuchiol-plump-bounce-cream",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "cosrx-the-blue-peptide-bakuchiol-plump-glow-serum",
      name: "The Blue Peptide Bakuchiol Plump Glow Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#CopperPeptide(GHK-Cu) #Bakuchiol #SkinPlumping A powerfully-formulated hydro-glow booster powered by Copper Tripeptide-1 (GHK-Cu) and Bakuchiol (a plant-based retinol alternative) to help visibly improve the look of skin density.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/BluePeptide_Serum_00.jpg?v=1777444989",
      officialUrl: "https://www.cosrx.com/products/cosrx-the-blue-peptide-bakuchiol-plump-glow-serum",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness",
          "aging"
      ]
  },
  {
      slug: "cosrx-red-rice-inositol-pore-clarifying-deep-cleanser",
      name: "RED RICE INOSITOL Pore Clarifying Deep Cleanser",
      brand: "COSRX",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#FaceMaskToFoam #DeepCleansing #RedRice A Low pH cleanser with a stretchy, bouncy texture that adheres closely to the skin to lift away impurities and excess sebum, leaving the skin smooth and clarified.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Thumb_RedRice_Inositol_DeepCleanser_800x1067_1.webp?v=1775037121",
      officialUrl: "https://www.cosrx.com/products/cosrx-red-rice-inositol-pore-clarifying-deep-cleanser",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "cosrx-red-rice-inositol-exfoliating-care-pore-wash-off-peel-serum",
      name: "RED RICE INOSITOL Exfoliating Care Pore Wash-Off Peel Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Wash-Off Exfoliator #HydratingPeelOff One solution for every concern making your skin look dull and uneven - powered by Red Rice.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Thumb_RedRice_Inositol_Serum_800x1067_1cb5f547-d3ec-4d5b-bbd8-4d4c7700dd16.webp?v=1775037226",
      officialUrl: "https://www.cosrx.com/products/cosrx-red-rice-inositol-exfoliating-care-pore-peel-serum",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "cosrx-one-step-original-clear-skin-calming-pad",
      name: "One Step Original Clear Skin Calming Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#GreenCalmingPad #CalmingTonerPad Soothes sensitive skin while visibly refining texture and supporting the skin barrier.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/OneStep_Calming_Pad_00.jpg?v=1774854164",
      officialUrl: "https://www.cosrx.com/products/one-step-original-clear-skin-calming-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "cosrx-one-step-original-tone-clarifying-moisture-pad",
      name: "One Step Original Tone Clarifying Moisture Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#BlueMoisturePad #RiceWaterToningPad Drenches skin in 69% rice water to deliver deep hydration and visibly clearer-looking skin in one swipe.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/One-Step_Moisture_Pad_00.webp?v=1774854127",
      officialUrl: "https://www.cosrx.com/products/one-step-original-tone-clarifying-moisture-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "cosrx-one-step-original-peptide-collagen-lifting-glow-pad",
      name: "One Step Original Peptide Collagen Lifting Glow Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#PinkPeptidePad #GlowTonerPad Visibly firms, lifts, and illuminates the lookof skin with every use.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/1_800x1067_40e9bec3-18f2-4c99-9778-941e17858fa3.webp?v=1774854217",
      officialUrl: "https://www.cosrx.com/products/one-step-original-peptide-collagen-lifting-glow-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness",
          "aging"
      ]
  },
  {
      slug: "cosrx-one-step-original-blemish-pore-clear-pad",
      name: "One Step Original Blemish Pore Clear Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#RedPorePad #PoreTonerPad Gently removes impurities and excess sebum for smooth, visibly refined skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/OneStep_Blemish_Pad_00.jpg?v=1774854088",
      officialUrl: "https://www.cosrx.com/products/one-step-original-blemish-pore-clear-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-5-pdrn-collagen-vitalizing-hydrogel-eye-patch",
      name: "5 PDRN Collagen Vitalizing Hydrogel Eye Patch",
      brand: "COSRX",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "5 PDRN Serum-Solidified Eye Patches for Brightening Dark Circles Daily PDRN eye patches formulated with 5 PDRN Complex and low-molecular collagen to brighten dark circles, depuff, and restore vitality to the eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/5PDRN_EyePatch_00.webp?v=1772608315",
      officialUrl: "https://www.cosrx.com/products/cosrx-5-pdrn-collagen-vitalizing-hydrogel-eye-patch",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "cosrx-advanced-snail-92-all-in-one-cream",
      name: "Advanced Snail 92 All in One Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "K-Beauty Favorite Cream for Boosting Elasticity The Advanced Snail 92 All In One Cream by COSRX helps repair stressed skin barriers and boost elasticity with 92% snail mucin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/snail_cream_thumbnail.png?v=1748420673",
      officialUrl: "https://www.cosrx.com/products/advanced-snail-92-all-in-one-cream",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "barrier"
      ]
  },
  {
      slug: "cosrx-the-ceramide-skin-barrier-moisturizer",
      name: "The Ceramide Skin Barrier Moisturizer",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Barrier-Repairing Moisturizer for Sensitive Skin The Ceramide Skin Barrier Moisturizer by COSRX replenishes the moisture barrier with a powerful blend of 7 ceramides, cholesterol, fatty acids, and 5 types of hyaluronic acid.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Skinbarrier_Moisturizer_800x1067_shape.jpg?v=1752553177",
      officialUrl: "https://www.cosrx.com/products/the-ceramide-skin-barrier-moisturizer",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "cosrx-the-peptide-collagen-hydrogel-eye-patch",
      name: "The Peptide Collagen Hydrogel Eye Patch",
      brand: "COSRX",
      category: "eye",
      ingredientIds: [
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Brightening & De-puff Eye Patch Solution COSRX's The Peptide Collagen Hydrogel Eye Patch features a potent blend of 4 peptides + collagen, caffeine, niacinamide, and hyaluronic acid to helps soften under-eye puffiness, smooth fine lines, and brighten dark circ",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Peptide-eye-patch2___800x1067-_-_-jpg.webp?v=1768284034",
      officialUrl: "https://www.cosrx.com/products/the-peptide-collagen-hydrogel-eye-patch",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "cosrx-advanced-the-vitamin-c-23-serum",
      name: "Advanced The Vitamin C 23 Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "vitamin_c"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Power-Brightening Pure Vitamin C Serum COSRX's Advanced The Vitamin C 23 Serum features a high strength 23% pure vitamin C with Super Vitamin E and Glutathione to target uneven skin tone, early signs of aging, and dullness.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Advanced_VitaminC23_00.webp?v=1760935746",
      officialUrl: "https://www.cosrx.com/products/cosrx-advanced-the-vitamin-c-23-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-vitamin-e-vitalizing-sunscreen-spf-50",
      name: "Vitamin E Vitalizing Sunscreen SPF 50+",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf",
          "vitamin_e"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family, vitamin E family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Lightweight Vitamin E Sunscreen for All Skin Tones This broad-spectrum SPF 50+ sunscreen protects against UV damage while hydrating with vitamin E, cocoa, and cotton seed extracts.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/VitaminE_SunScreen_00.jpg?v=1778562098",
      officialUrl: "https://www.cosrx.com/products/vitamin-e-vitalizing-sunscreen-spf-50",
      price: 16.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-the-niacinamide-15-serum",
      name: "The Niacinamide 15 Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Total Breakout Care & Oil Control COSRX's The Niacinamide 15 Serum is formulated with 15% niacinamide, paired with zinc PCA to deeply refine the appearance of pores, regulate excess sebum, and help reduce the look of post-acne marks.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/niacin.png?v=1748420816",
      officialUrl: "https://www.cosrx.com/products/the-niacinamide-15-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-the-ceramide-skin-barrier-moisturizing-mist",
      name: "The Ceramide Skin Barrier Moisturizing Mist",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Moisturizing Barrier Mist for Instant Skin Relief A soft, ultra-fine mist enriched with a 5-Ceramide Complex, cholesterol, fatty acids and five types of hyaluronic acid.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Skinbarrier_Mist_00_484b9ebd-d4b7-4386-9752-e56852ae7773.webp?v=1755070277",
      officialUrl: "https://www.cosrx.com/products/cosrx-the-ceramide-skin-barrier-moisturizing-mist",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "cosrx-the-retinol-0-5-oil",
      name: "The Retinol 0.5 Oil",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Advanced Retinol Oil for Youthful-looking Skin COSRX's The Retinol 0.5 Oil harnesses 0.5% pure retinol in a nourishing oil base with squalane and vitamin E to target deep wrinkles, uneven texture, and skin firmness loss.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/the-retinol-0-5-oil-cosrx-official-1.jpg?v=1724836571",
      officialUrl: "https://www.cosrx.com/products/the-retinol-0-5-oil",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "cosrx-advanced-snail-mucin-gel-cleanser",
      name: "Advanced Snail Mucin Gel Cleanser",
      brand: "COSRX",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Smoothest lather supercharged with Snail Mucin!",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/advanced-snail-mucin-gel-cleanser-cosrx-official-1.png?v=1724835788",
      officialUrl: "https://www.cosrx.com/products/advanced-snail-mucin-gel-cleanser",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "barrier"
      ]
  },
  {
      slug: "cosrx-skin-barrier-moisturizing-body-cream",
      name: "Skin Barrier Moisturizing Body Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Cloud-soft texture, perfect for body & face Clinically proven to deliver 100-hour hydration and strengthen the skin barrier.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Skinbarrier_Cream_00_9ea9d922-f996-448a-b5b0-372c79f1043c.webp?v=1755070414",
      officialUrl: "https://www.cosrx.com/products/cosrx-skin-barrier-moisturizing-body-cream",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "cosrx-5-pdrn-hyaluronic-acid-vital-hydrating-hydrogel-mask",
      name: "5 PDRN Hyaluronic Acid Vital Hydrating Hydrogel Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Home Care for Vitality, Glow, and Firmness with PDRN & Hyaluronic Acid This hydrogel mask, formulated with 5 PDRN and 8 types of Hyaluronic Acid, turns transparent as it delivers active ingredients onto the skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/5PDRN_Hydrogel_Mask_00.webp?v=1761526641",
      officialUrl: "https://www.cosrx.com/products/cosrx-5-pdrn-hyaluronic-acid-vital-hydrating-hydrogel-mask",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-5-pdrn-collagen-intense-vitalizing-serum",
      name: "5 PDRN Collagen Intense Vitalizing Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Daily Boost Serum for Vitality, Glow, Firmness, and Vitalizing with 5 PDRN & Collagen A daily PDRN serum with 5 PDRN and Low-Molecular-Weight Collagen to help manage skin elasticity and enhance overall skin health.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/5PDRN_Serum_00_41bfc9ae-bbf5-40a2-a27c-35b27a2f0780.webp?v=1761526605",
      officialUrl: "https://www.cosrx.com/products/cosrx-5-pdrn-collagen-intense-vitalizing-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "cosrx-5-pdrn-b5-vital-soothing-toner",
      name: "5 PDRN B5 Vital Soothing Toner",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Revitalizing Toner for Glow, Firmness & Soothing with 5 PDRN & Vitamin B5 A daily PDRN toner with 5 PDRN and Panthenol(B5) to soothe irritated skin and enhance overall skin health.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/5PDRN_Toner_00.webp?v=1761526535",
      officialUrl: "https://www.cosrx.com/products/cosrx-5-pdrn-b5-vital-soothing-toner",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "cosrx-pdrn-exosome-skinplaning-glaze-mask",
      name: "PDRN EXOSOME Skinplaning Glaze Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Opalescent Cream-To-Film A one layer peel-off mask that instantly transforms dull, uneven skin into a plump, glazed glow.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/PDRN_Exosome_mask_00_7c9e832c-f72c-443a-b1a4-730bc669b15b.webp?v=1770886507",
      officialUrl: "https://www.cosrx.com/products/cosrx-pdrn-exosome-skinplaning-glaze-mask",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-airy-light-invisible-sun-stick",
      name: "Airy-Light Invisible Sun Stick",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#High Protection SPF 50 PA ++++ with Airy Light Texture A lightweight, transparent sunscreen stick that glides on effortlessly to provide powerful UV protection without a white cast, leaving a powdery soft-matte finish for all-day comfort and convenient on-the",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Airy-Light_SunStick_00.webp?v=1749081344",
      officialUrl: "https://www.cosrx.com/products/airy-light-invisible-sun-stick",
      price: 0,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-airy-light-oil-control-clear-sunscreen-stick-spf-50",
      name: "AIRY-LIGHT OIL CONTROL CLEAR SUNSCREEN STICK SPF 50",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Broad-Spectrum SPF 50 Protection With A Clear, Airy-Light Texture An airy, transparent formula glides on smoothly without a white cast, providing powerful UV protection with waterproof resistance to water and sweat-all in a portable sunscreen stick.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Airy-Light_Clear_SunStick_00_ffd57aae-2ac6-4ab6-870a-ccd935fc20c3.jpg?v=1778562098",
      officialUrl: "https://www.cosrx.com/products/cosrx-airy-light-clear-sunscreen-stick",
      price: 16.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-the-alpha-arbutin-discoloration-care-hydrogel-mask",
      name: "The Alpha-Arbutin Discoloration Care Hydrogel Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Fade, Brighten and Glow Powered by Alpha-Arbutin This hydrogel mask, formulated with Alpha-Arbutin and Low-Molecular-Weight Collagen, turns transparent as it delivers active ingredients onto the skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Alpha-Arbutin_Hydroge_Mask_00.webp?v=1749692231",
      officialUrl: "https://www.cosrx.com/products/cosrx-the-alpha-arbutin-discoloration-care-hydrogel-mask",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-the-peptide-collagen-lifting-glow-hydrogel-mask",
      name: "The Peptide Collagen Lifting Glow Hydrogel Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Lift, Firm and Glow with Peptides & Collagen This hydrogel mask, formulated with 6 types of Peptides and Low-Molecular-Weight Collagen, turns transparent as it delivers active ingredients onto the skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Peptide_Hydrogel_Mask_00.webp?v=1749777658",
      officialUrl: "https://www.cosrx.com/products/cosrx-the-peptide-collagen-lifting-glow-hydrogel-mask",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness",
          "aging"
      ]
  },
  {
      slug: "cosrx-advanced-snail-mucin-glass-glow-hydrogel-mask-3ea",
      name: "Advanced Snail Mucin Glass Glow Hydrogel Mask_3ea",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Glow now with Snail Mucin Achieve glass-like skin in just one use with the premium Snail & Collagen Hydrogel Mask!",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Snail_Hydrogel_Mask_BAZAAR.jpg?v=1759391631",
      officialUrl: "https://www.cosrx.com/products/cosrx-advanced-snail-mucin-glass-glow-hydrogel-mask_3ea",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "cosrx-the-alpha-arbutin-2-discoloration-care-serum",
      name: "The Alpha-Arbutin 2 Discoloration Care Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Stubborn acne scars?",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Alpha-Albutin_800x1067_9f78595b-1e4f-4147-a56c-aade2a3286da.jpg?v=1726731345",
      officialUrl: "https://www.cosrx.com/products/the-alpha-arbutin-2-discoloration-care-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-ultra-light-invisible-sunscreen-spf50-pa",
      name: "Ultra-Light Invisible Sunscreen SPF50 PA++++",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#100% Invisible #Perfect Protection Amazing Lightness!",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/0_Ultra_light_invisible_800x1067_3b3f194c-15a5-4c66-92ec-58275778c6c9.jpg?v=1714098876",
      officialUrl: "https://www.cosrx.com/products/ultra-light-invisible-sunscreen-spf50",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-balancium-comfort-ceramide-soft-cream-sheet-mask",
      name: "Balancium Comfort Ceramide Soft Cream Sheet Mask",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Milky and soft!",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/balancium-comfort-ceramide-soft-cream-sheet-mask-cosrx-official-1.jpg?v=1724835930",
      officialUrl: "https://www.cosrx.com/products/comfort-ceramide-soft-cream-sheet-mask",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "cosrx-the-aha-bha-pha-lha-35-peel",
      name: "The AHA BHA PHA LHA 35 Peel",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Immediate skin resurfacing in 10 minutes Dramatically smooths skin texture and clears congested pores with a powerful multi-acid blend.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/The_35peel_0.webp?v=1724836979",
      officialUrl: "https://www.cosrx.com/products/the-aha-bha-pha-lha-35-peel",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "cosrx-one-step-green-calming-pad",
      name: "One Step Green Calming Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The most gentle hero born to soothe your sensitivity!",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Green_Pad_0.jpg?v=1694078299",
      officialUrl: "https://www.cosrx.com/products/one-step-green-calming-pad",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "cosrx-the-aha-2-bha-2-blemish-treatment-serum",
      name: "The AHA 2 BHA 2 Blemish Treatment Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The REBALLUTION of blemish spot care Highly concentrated with 2% AHA and 2% BHA, this serum in a pure cotton ball quickly and easily soothes acne-scarred skin and instantly cares for blackheads and whiteheads.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/AHA2BHA2_Treatment_00_0ee6119d-bd30-4aa2-b7f6-3ecf59cc7151.jpg?v=1778462937",
      officialUrl: "https://www.cosrx.com/products/the-aha-2-bha-2-blemish-treatment-serum",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-aloe-54-2-aqua-tone-up-sunscreen-spf-50-pa",
      name: "Aloe 54.2 Aqua Tone-up Sunscreen SPF 50+ PA++++",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Infused with aloe barbadensis leaf water, the lightweight sunscreen protects against harmful UV rays and soothes sunburn while providing a soft, non-greasy appearance all day.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/aloe-54-2-aqua-tone-up-sunscreen-spf-50-pa-cosrx-official-1.jpg?v=1724836911",
      officialUrl: "https://www.cosrx.com/products/aloe-54-2-aqua-tone-up-sunscreen-spf-50-pa",
      price: 0,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "hydration"
      ]
  },
  {
      slug: "cosrx-the-vitamin-c-13-serum",
      name: "The Vitamin C 13 Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "vitamin_c"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Use everyday like a daily vitamin C for your skin A gentle, water-based vitamin C serum that provides moisture and absorbs quickly without stickiness.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/The_VitaminC13_00.webp?v=1762850506",
      officialUrl: "https://www.cosrx.com/products/the-vitamin-c-13-serum",
      price: 21,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "cosrx-lip-plump-refresh-aha-bha-vitamin-c-lip-plumper",
      name: "Lip Plump - Refresh AHA BHA Vitamin C Lip Plumper",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "vitamin_c",
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family, AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Ultra glow plumper containing Volufiline and vitamin derivatives to leave your lips volumized and full of energy.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/lip-plump-refresh-aha-bha-vitamin-c-lip-plumper-cosrx-official-1.jpg?v=1724836331",
      officialUrl: "https://www.cosrx.com/products/lip-plump-refresh-aha-bha-viamin-c-lip-plumper",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-hydrium-watery-toner",
      name: "Hydrium Watery Toner",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Full of hydration for dewy skin!",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-watery-toner-cosrx-official-1.jpg?v=1724836011",
      officialUrl: "https://www.cosrx.com/products/hydrium-watery-toner",
      price: 29,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "cosrx-two-in-one-poreless-power-liquid",
      name: "Two in One Poreless Power Liquid",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Daily pore tightener, skin cooler!",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/two-in-one-poreless-power-liquid-cosrx-official-1.jpg?v=1724835162",
      officialUrl: "https://www.cosrx.com/products/two-in-one-poreless-power-liquid",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-aha-7-whitehead-power-liquid",
      name: "AHA 7 Whitehead Power Liquid",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Size : 100ml / 3.38 fl.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/aha-7-whitehead-power-liquid-cosrx-official-1.jpg?v=1724835611",
      officialUrl: "https://www.cosrx.com/products/aha-7-whitehead-power-liquid",
      price: 11,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-aha-bha-clarifying-treatment-toner",
      name: "AHA/BHA Clarifying Treatment Toner",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Benefits of AHA & BHA for Clear Skin!",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/ahabha-clarifying-treatment-toner-cosrx-official-1.jpg?v=1724835581",
      officialUrl: "https://www.cosrx.com/products/aha-bha-clarifying-treatment-toner",
      price: 14,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-centella-water-alcohol-free-toner",
      name: "Centella Water Alcohol-Free Toner",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Size : 150ml / 5.07 fl.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/centella-water-alcohol-free-toner-cosrx-official-1.jpg?v=1724835527",
      officialUrl: "https://www.cosrx.com/products/centella-water-alcohol-free-toner",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "cosrx-refresh-abc-daily-toner-aha-bha-vitamin-c",
      name: "Refresh ABC Daily Toner (AHA BHA Vitamin C)",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "vitamin_c",
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family, AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Daily savior toner for dull skin owners !",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/refresh-abc-daily-toner-aha-bha-vitamin-c-cosrx-official-1.jpg?v=1724835175",
      officialUrl: "https://www.cosrx.com/products/refresh-abc-daily-toner-aha-bha-vitamin-c",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-full-fit-propolis-synergy-toner",
      name: "Full Fit Propolis Synergy Toner",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Daily boosting toner creates synergy with Propolis Light Ampoule A toner that contains 72.6% of Black bee Propolis extract and 10% Honey extract which will make your skin glowy and smooth.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-synergy-toner-cosrx-official-1.jpg?v=1724835425",
      officialUrl: "https://www.cosrx.com/products/full-fit-propolis-synergy-toner",
      price: 20.3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "cosrx-the-retinol-0-1-cream",
      name: "The Retinol 0.1 Cream",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "0.1% pure retinol with low irritation An irritation-reduced solution created with the optimal ratio of key ingredients for first-time retinol users just starting to notice the appearance of fine lines caused by dry skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/RetinolCream_800x1067_7e167f9b-dc45-4d41-babf-65b26b14cf23.jpg?v=1746679017",
      officialUrl: "https://www.cosrx.com/products/the-retinol-0-1-cream",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "cosrx-lip-sleep-balancium-ceramide-lip-butter-sleeping-mask",
      name: "Lip Sleep - Balancium Ceramide Lip Butter Sleeping Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Shea butter and naturally derived ceramide blankets your lips like butter leaving it hydrated and revitalized Size: 0.70 fl.oz / 20g",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/lip-sleep-balancium-ceramide-lip-butter-sleeping-mask-cosrx-official-1.jpg?v=1724836282",
      officialUrl: "https://www.cosrx.com/products/lip-sleep-balancium-ceramide-lip-butter-sleeping-mask",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "cosrx-oil-free-ultra-moisturizing-lotion-with-birch-sap",
      name: "Oil-Free Ultra-Moisturizing Lotion with Birch Sap",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Daily moisturizer for all skin type and all situation!",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/oil-free-ultra-moisturizing-lotion-with-birch-sap-cosrx-official-1.png?v=1724836818",
      officialUrl: "https://www.cosrx.com/products/oil-free-ultra-moisturizing-lotion-with-birch-sap",
      price: 17.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-one-step-original-clear-pad",
      name: "One Step Original Clear Pad",
      brand: "COSRX",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Quantity : 70 Pads Wipe out excess dirt and apply acne-fighting toner for clear, blemish-free skin Soft cotton pads pre-soaked in essence to remove dead skin cells and excess sebum.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/Original_Pad_0.jpg?v=1694078299",
      officialUrl: "https://www.cosrx.com/products/one-step-original-clear-pad",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-the-hyaluronic-acid-3-serum",
      name: "The Hyaluronic Acid 3 Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Customized 3% hyaluronic acid for enhanced skin hydration Hydration is an essential part of any skincare routine, but it's important to choose the right formula for your skin type.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/the-hyaluronic-acid-3-serum-cosrx-official-1.jpg?v=1724836664",
      officialUrl: "https://www.cosrx.com/products/the-hyaluronic-acid-3-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-aloe-soothing-sun-cream-spf50-pa",
      name: "Aloe Soothing Sun Cream SPF50+/ PA+++",
      brand: "COSRX",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Size : 1.69 fl.oz / 50ml Is this moisturizer?",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/aloe-soothing-sun-cream-spf50-pa-cosrx-official-1.jpg?v=1724835559",
      officialUrl: "https://www.cosrx.com/products/aloe-soothing-sun-cream-spf50-pa",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-hydrium-triple-hyaluronic-moisturizing-cleanser",
      name: "Hydrium Triple Hyaluronic Moisturizing Cleanser",
      brand: "COSRX",
      category: "cleanser",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vitamin B5 and three types of hyaluronic acid work to lock-in hydration!",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-triple-hyaluronic-moisturizing-cleanser-cosrx-official-1.jpg?v=1724836058",
      officialUrl: "https://www.cosrx.com/products/triple-hyaluronic-moisturizing-cleanser",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-master-patch-intensive-90ea",
      name: "Master Patch Intensive [90ea]",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Original Acne Patch, Just More Intense Comfortable spot treatment to solve your unplanned breakouts.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/master-patch-intensive-90ea-cosrx-official-1.jpg?v=1724836494",
      officialUrl: "https://www.cosrx.com/products/master-patch-intensive-90-ea",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-master-patch-basic-90ea",
      name: "Master Patch Basic [90ea]",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Original Acne Patch, Just Better What it is: Comfortable spot treatment to solve your unplanned breakouts.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/master-patch-basic-90ea-cosrx-official-1.jpg?v=1724836465",
      officialUrl: "https://www.cosrx.com/products/master-patch-basic-90-ea",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-master-patch-x-large",
      name: "Master Patch X-Large",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Original Acne Patch, Just Bigger What it is: Comfortable hydrocolloid patch to solve your large area of oily pores.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/master-patch-x-large-cosrx-official-1.jpg?v=1724836481",
      officialUrl: "https://www.cosrx.com/products/master-patch-x-large-10-ea",
      price: 9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-master-patch-intensive-36ea",
      name: "Master Patch Intensive [36ea]",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Original Acne Patch, Just More Intense Comfortable spot treatment to solve your unplanned breakouts.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/master-patch-intensive-36ea-cosrx-official-1.jpg?v=1724836510",
      officialUrl: "https://www.cosrx.com/products/master-patch-intensive-36-ea",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-master-patch-basic-36ea",
      name: "Master Patch Basic [36ea]",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Original Acne Patch, Just Better What it is: Comfortable spot treatment to solve your unplanned breakouts.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/master-patch-basic-36ea-cosrx-official-1.jpg?v=1724836449",
      officialUrl: "https://www.cosrx.com/products/master-patch-basic-36-ea",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-advanced-snail-radiance-dual-essence",
      name: "Advanced Snail Radiance Dual Essence",
      brand: "COSRX",
      category: "essence",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "2 in 1 Elasticity & Radiance in One Pump High-efficacy snail essence mixes with the radiance essence upon pumping to create a combination of plumping and brightening care.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/advanced-snail-radiance-dual-essence-cosrx-official-1.png?v=1724835811",
      officialUrl: "https://www.cosrx.com/products/advanced-snail-radiance-dual-essence",
      price: 19.6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "cosrx-refresh-aha-bha-vitamin-c-daily-cream",
      name: "Refresh AHA/BHA Vitamin C Daily Cream",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "vitamin_c",
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family, AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothing, Calming, Strengthening, Protecting Pure Fit CICA-7 Complex 58.6%, Cica cream calms sensitive skin comfortably and helps recover skin quickly.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/refresh-ahabha-vitamin-c-daily-cream-cosrx-official-1.jpg?v=1724836430",
      officialUrl: "https://www.cosrx.com/products/ahabha-refresh-vitamin-c-daily-cream",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-refresh-aha-bha-vitamin-c-booster-serum",
      name: "Refresh AHA/BHA Vitamin C Booster Serum",
      brand: "COSRX",
      category: "ampoule",
      ingredientIds: [
          "vitamin_c",
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family, AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Daily skin-boosting serum for bright skin!",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/refresh-ahabha-vitamin-c-booster-serum-cosrx-official-1.jpg?v=1724836411",
      officialUrl: "https://www.cosrx.com/products/ahabha-refresh-vitamin-c-booster-serum",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-poreless-clarifying-charcoal-mask-pink",
      name: "Poreless Clarifying Charcoal Mask Pink",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Wear Pink, Look Flawless, Feel Cute What it is: Purifying, skin-perfecting, and color-changing mask to turn your self-care night into a professional spa!",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/poreless-clarifying-charcoal-mask-pink-cosrx-official-1.jpg?v=1724836344",
      officialUrl: "https://www.cosrx.com/products/poreless-clarifying-charcoal-mask",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "cosrx-lip-scrub-full-fit-honey-sugar-lip-scrub",
      name: "Lip Scrub - Full Fit Honey Sugar Lip Scrub",
      brand: "COSRX",
      category: "lip-care",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Lip scrub has never been so sweet!",
      usageSteps: [
          "Apply directly to lips",
          "Reapply as needed",
          "Use daily or before sleep for extra comfort"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/lip-scrub-full-fit-honey-sugar-lip-scrub-cosrx-official-1.jpg?v=1724836318",
      officialUrl: "https://www.cosrx.com/products/lip-scrub-full-fit-propolis-honey-sugar-lip-scrub",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-creamy-foam-cleanser",
      name: "Pure Fit Cica Creamy Foam Cleanser",
      brand: "COSRX",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Rich and luxurious foam for pleasant and satisfying cleanse A creamy foam cleanser with Pure Fit Cica-7 Complex to protect the skin while whisking away dirt and impurities, leaving the skin feeling fresh and clean.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-creamy-foam-cleanser-cosrx-official-1.jpg?v=1724836245",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-creamy-foam-cleanser",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-clear-cleansing-oil",
      name: "Pure Fit Cica Clear Cleansing Oil",
      brand: "COSRX",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Watery and lightweight oil for refreshing deep cleanse What it is: A watery, refreshing cleansing oil that immediately melts away long-wear makeup, pore impurities and dust for a deep, hydrating cleanse without that greasy finish.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-clear-cleansing-oil-cosrx-official-1.jpg?v=1724836229",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-clear-cleansing-oil",
      price: 29,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "cosrx-low-ph-goodnight-soft-peeling-gel",
      name: "Low pH Goodnight Soft Peeling Gel",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Gentle low pH peeling gel enriched with naturally derived ingredients to improve skin condition.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/low-ph-goodnight-soft-peeling-gel-cosrx-official-1.jpg?v=1724836210",
      officialUrl: "https://www.cosrx.com/products/low-ph-goodnight-soft-peeling-gel",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "cosrx-advanced-snail-hydrogel-eye-patch",
      name: "Advanced Snail Hydrogel Eye Patch",
      brand: "COSRX",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "#Plumping, #Moisturizing, #Brightening Hydrogel eye patch which visibly hydrates, plumps and brightens the delicate eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/AnyConv.com__Snail-eye-patch2_800x1067_e8793905-5ab9-4172-a398-5d25b6cf39cc.webp?v=1765523642",
      officialUrl: "https://www.cosrx.com/products/advanced-snail-hydrogel-eye-patch",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-cream-intense",
      name: "Pure Fit Cica Cream Intense",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Strong skin barrier with thick Cica Cream Intense What it is: Moisturizing cica cream infused with 7 types of centella extract to soothe sensitive skin and provide deep hydration Size: 1.7 fl.oz / 50ml WHY IT'S SPECIAL: 61.2% of Pure Fit CICA-7 Complex Large a",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-cream-intense-cosrx-official-1.jpg?v=1724836149",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-cream-intensive",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-ultimate-nourishing-rice-overnight-spa-mask",
      name: "Ultimate Nourishing Rice Overnight Spa Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Size : 60ml / 2.02 fl.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/ultimate-nourishing-rice-overnight-spa-mask-cosrx-official-1.jpg?v=1724836096",
      officialUrl: "https://www.cosrx.com/products/ultimate-nourishing-rice-overnight-spa-mask",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-hydrium-triple-hyaluronic-water-wave-sheet-mask",
      name: "Hydrium Triple Hyaluronic Water Wave Sheet Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Hydrating, Moisturizing, Refreshing, Eco-friendly Formulated with triple hyaluronic acid to deliver the ultimate hydration",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-triple-hyaluronic-water-wave-sheet-mask-cosrx-official-1.jpg?v=1724836079",
      officialUrl: "https://www.cosrx.com/products/triple-hyaluronic-water-wave-sheet-mask",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-full-fit-propolis-nourishing-magnet-sheet-mask",
      name: "Full Fit Propolis Nourishing Magnet Sheet Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "3 honey- derived to Nourishing, Moisturizing, Plumping!",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-nourishing-magnet-sheet-mask-cosrx-official-1.jpg?v=1724836038",
      officialUrl: "https://www.cosrx.com/products/propolis-nourishing-magnet-sheet-mask",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-perfect-sebum-centella-powder-puff-opp",
      name: "Perfect Sebum Centella Powder Puff OPP",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Official COSRX product imported from the brand catalog. Full product details should be verified against the official page before allergy-sensitive use.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/perfect-sebum-centella-powder-puff-opp-cosrx-official.jpg?v=1724836036",
      officialUrl: "https://www.cosrx.com/products/perfect-sebum-centella-powder-puff-opp",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "cosrx-full-fit-propolis-honey-overnight-mask",
      name: "Full Fit Propolis Honey Overnight Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "3-in-1 hydrating mask can be used as an overnight mask, a cream or as a wash off mask Size : 2.03 fl.oz / 60ml Enriched with more than 70% of Propolis Extract and natural beeswax, this mask provides intensive hydration with refreshing moisture.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/full-fit-propolis-honey-overnight-mask-cosrx-official-1.jpg?v=1724835974",
      officialUrl: "https://www.cosrx.com/products/full-fit-propolis-honey-overnight-mask",
      price: 9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-advanced-snail-mucin-power-sheet-mask-10-sheets",
      name: "Advanced Snail Mucin Power Sheet Mask 10 Sheets",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Nourished & plump skin on one sheet!",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/advanced-snail-mucin-power-sheet-mask-10-sheets-cosrx-official-1.jpg?v=1724835952",
      officialUrl: "https://www.cosrx.com/products/cosrx-advanced-snail-mucin-power-sheet-mask-10-sheets",
      price: 17.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-calming-true-sheet-mask",
      name: "Pure Fit Cica Calming True Sheet Mask",
      brand: "COSRX",
      category: "mask",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Quick & easy treatment for the entire face This soothing mask is formulated with Centella extracts to calm sensitive skin Size : 1 ea",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-calming-true-sheet-mask-cosrx-official-1.jpg?v=1724835917",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-calming-true-sheet-mask",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "cosrx-clear-fit-master-patch",
      name: "Clear Fit Master Patch",
      brand: "COSRX",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Matt, Gradient, Ultra thin!",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/clear-fit-master-patch-cosrx-official-1.jpg?v=1724835502",
      officialUrl: "https://www.cosrx.com/products/clear-fit-master-patch",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "cosrx-full-fit-propolis-light-cream",
      name: "Full Fit Propolis Light Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Cream infused with Full fit Pro Complex Moisturizing cream with high percentage of black bee propolis complex and antioxidants.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/FullfitCream_2type_800x1067_245c55aa-861b-4c7d-b3b9-98bf84de4415.jpg?v=1745370401",
      officialUrl: "https://www.cosrx.com/products/full-fit-propolis-light-cream",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-galactomyces-95-tone-balancing-essence",
      name: "Galactomyces 95 Tone Balancing Essence",
      brand: "COSRX",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Multi - acting enhancer for dull, rough skin!",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/galactomyces-95-tone-balancing-essence-cosrx-official-1.jpg?v=1724835413",
      officialUrl: "https://www.cosrx.com/products/galactomyces-95-tone-balancing-essence",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "cosrx-hyaluronic-acid-hydra-power-essence",
      name: "Hyaluronic Acid Hydra Power Essence",
      brand: "COSRX",
      category: "essence",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Dewy skin from deep skin layers!",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hyaluronic-acid-hydra-power-essence-cosrx-official-1.jpg?v=1724835383",
      officialUrl: "https://www.cosrx.com/products/hyaluronic-acid-hydra-power-essence",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-hyaluronic-acid-intensive-cream",
      name: "Hyaluronic Acid Intensive Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Feel the supple skin all day long!",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hyaluronic-acid-intensive-cream-cosrx-official-1.jpg?v=1724835365",
      officialUrl: "https://www.cosrx.com/products/hyaluronic-acid-intensive-cream",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-hydrium-triple-hyaluronic-moisture-ampoule",
      name: "Hydrium Triple Hyaluronic Moisture Ampoule",
      brand: "COSRX",
      category: "ampoule",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Gift your skin with deep & long - lasting hydration!",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-triple-hyaluronic-moisture-ampoule-cosrx-official-1.jpg?v=1724835343",
      officialUrl: "https://www.cosrx.com/products/hydrium-triple-hyaluronic-moisture-ampoule",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-hydrium-green-tea-aqua-soothing-gel-cream",
      name: "Hydrium Green Tea Aqua Soothing Gel Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Cooling relief for heated angry skin!",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-green-tea-aqua-soothing-gel-cream-cosrx-official-1.jpg?v=1724835322",
      officialUrl: "https://www.cosrx.com/products/hydrium-green-tea-aqua-soothing-gel-cream",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-hydrium-centella-aqua-soothing-ampoule",
      name: "Hydrium Centella Aqua Soothing Ampoule",
      brand: "COSRX",
      category: "ampoule",
      ingredientIds: [
          "hyaluronic_acid",
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family, centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Pure hydration without any irritation!",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-centella-aqua-soothing-ampoule-cosrx-official-1.jpg?v=1689840666",
      officialUrl: "https://www.cosrx.com/products/hydrium-centella-aqua-soothing-ampoule",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-cream",
      name: "Pure Fit Cica Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothing, Calming, Strengthening, Protecting Pure Fit CICA-7 Complex 58.6%, Cica cream calms sensitive skin comfortably and helps recover skin quickly.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-cream-cosrx-official-1.jpg?v=1724835235",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-cream",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "cosrx-pure-fit-cica-serum",
      name: "Pure Fit Cica Serum",
      brand: "COSRX",
      category: "serum",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothing, Calming, Strengthening, Protecting What it is: With 7 cica ingredients that help calm sensitive skin, this serum provides concentrated care for irritated skin WHY IT'S SPECIAL: Restoring the natural power of the skin A plant-based serum that consists",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/pure-fit-cica-serum-cosrx-official-1.jpg?v=1724835220",
      officialUrl: "https://www.cosrx.com/products/pure-fit-cica-serum",
      price: 14,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "cosrx-hydrium-moisture-power-enriched-cream",
      name: "Hydrium Moisture Power Enriched Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Pure hydration without any irritation!",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/hydrium-moisture-power-enriched-cream-cosrx-official-1.jpg?v=1689840658",
      officialUrl: "https://www.cosrx.com/products/hydrium-moisture-power-enriched-cream",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "cosrx-centella-blemish-cream",
      name: "Centella Blemish Cream",
      brand: "COSRX",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Centella eraser for all red and dark traces Jar type cream which makes the red and dull spots disappear left from acne.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0513/3775/6828/files/centella-blemish-cream-cosrx-official-1.jpg?v=1724835126",
      officialUrl: "https://www.cosrx.com/products/centella-blemish-cream",
      price: 21,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "beauty-of-joseon-revive-under-eye-patch-ginseng-retinal",
      name: "Revive Under Eye Patch: Ginseng + Retinal",
      brand: "Beauty of Joseon",
      category: "eye",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A rejuvenating hydrogel eye patch infused with ginseng water, retinal, and pearl glow to visibly firm, under-eye clarity Improvement , and smooth wrinkles, puffiness, and dark circles.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/revive-under-eye-patch-1-front.webp?v=1769674453",
      officialUrl: "https://beautyofjoseon.com/products/revive-under-eye-patch",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-relief-sun-aqua-fresh-rice-b5-spf50-pa",
      name: "Relief Sun Aqua-Fresh : Rice + B5 (SPF50+ PA++++)",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "For those who loved our Relief Sun but found it a bit too rich.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/03_0612.jpg?v=1782765884",
      officialUrl: "https://beautyofjoseon.com/products/relief-sun-aqua-fresh-rice-b5-spf50-pa-uk",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-relief-sun-rice-probiotics-spf50-pa",
      name: "Relief Sun : Rice + Probiotics (SPF50+ PA++++)",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Our iconic best seller that took over TikTok.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/02_0612.jpg?v=1782766185",
      officialUrl: "https://beautyofjoseon.com/products/relief-sun-rice-probiotics-spf50-pa-uk",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-tinted-mineral-dayscreen-spf-30",
      name: "Tinted Mineral Dayscreen SPF 30",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "From sun to screen, get real-life coverage with tinted SPF that works on your schedule.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/04_0626_TintedMineralDayscreen-Global__23N.jpg?v=1782748754",
      officialUrl: "https://beautyofjoseon.com/products/tinted-mineral-dayscreen-spf-30-global",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-glow-sun-stick",
      name: "Glow Sun Stick",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The SPF to keep in every bag.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/01_0529.jpg?v=1780214537",
      officialUrl: "https://beautyofjoseon.com/products/glow-sun-stick-sunscreen-stick",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-pore-firming-serum",
      name: "Pore Firming Serum",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Clinically proven pore care, done different.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/01_0527__-US.jpg?v=1780177063",
      officialUrl: "https://beautyofjoseon.com/products/pore-firming-red-bean-pdrn-serum-global",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "acne",
          "aging"
      ]
  },
  {
      slug: "beauty-of-joseon-hydra-shield-body-sun-lotion-spf-50",
      name: "Hydra Shield Body Sun Lotion SPF 50+",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Upgrade your body SPF with enhanced moisture that dives deep but stays light.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/05_0612__EU_UK.jpg?v=1782766006",
      officialUrl: "https://beautyofjoseon.com/products/hydra-shield-body-sun-lotion-spf-50-eu",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-comfort-protection-mineral-body-sun-lotion-spf-40",
      name: "Comfort Protection Mineral Body Sun Lotion SPF 40",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothe and shield, all over.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/BOJ260504_6fd1088e-01ab-4905-a3d2-cb2a6612e9f1.jpg?v=1777888996",
      officialUrl: "https://beautyofjoseon.com/products/comfort-protection-mineral-body-sun-lotion-spf-40",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-comfort-protection-mineral-body-sun-lotion-spf-30",
      name: "Comfort Protection Mineral Body Sun Lotion SPF 30",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothe and shield, all over.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/03_0612__EU_UK.jpg?v=1782766038",
      officialUrl: "https://beautyofjoseon.com/products/comfort-protection-mineral-body-sun-lotion-spf-30",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-ginseng-essence-water-mini-40ml",
      name: "Ginseng Essence Water Mini 40ml",
      brand: "Beauty of Joseon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "*Rewards purchases only - limit one per order* Ginseng Essence Water Mini delivers the same powerful benefits of our full-sized formula, now in a convenient travel-friendly size.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/KakaoTalk_Photo_2024-09-09-19-26-33.jpg?v=1762198998",
      officialUrl: "https://beautyofjoseon.com/products/ginseng-essence-water-mini-40ml-rewards",
      price: 5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-dayscreen-moisturizer-spf-30",
      name: "Dayscreen Moisturizer SPF 30",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Meet your lightest suncare layer.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/01_0409__-Global.jpg?v=1777585155",
      officialUrl: "https://beautyofjoseon.com/products/dayscreen-moisturizer-sunscreen-global",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-calming-barrier-serum",
      name: "Calming Barrier Serum",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Stressed skin?",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/001_61356454-461b-424d-8ef7-32589fb88d92.png?v=1777585365",
      officialUrl: "https://beautyofjoseon.com/products/calming-barrier-serum",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "barrier",
          "redness"
      ]
  },
  {
      slug: "beauty-of-joseon-revive-firming-moisturizer-ginseng-retinol",
      name: "Revive Firming Moisturizer : Ginseng + Retinol",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Gentle firming care made easier than ever before.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/boj-revive-firming-moisturizer-1-front.webp?v=1769652462",
      officialUrl: "https://beautyofjoseon.com/products/revive-firming-moisturizer",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "beauty-of-joseon-matte-sun-stick-mugwort-camelia-spf-50-pa",
      name: "Matte Sun Stick : Mugwort+Camelia (SPF 50+ PA++++)",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A Beauty of Joseon x @glowbyramon collaboration.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/04_0612.jpg?v=1782766125",
      officialUrl: "https://beautyofjoseon.com/products/matte-sun-stick-mugwort-camelia-spf-50-pa-uk",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness",
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-dynasty-cream-10ml",
      name: "Dynasty Cream 10ml",
      brand: "Beauty of Joseon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "*Gift with purchase only* Our best-selling creamy moisturizer that sinks in for long-lasting hydration and leaves skin looking dewy, plump, and bouncy.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Dynasty-Cream-10ml_Beauty-of-Joseon_62949240-52404429324660.jpg?v=1762679472",
      officialUrl: "https://beautyofjoseon.com/products/dynasty-cream-10ml",
      price: 3.75,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-daily-tinted-fluid-sunscreen",
      name: "Daily Tinted Fluid Sunscreen",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Meet the Tint + SPF You'll Actually Wear Naturally radiant, this tinted fluid sunscreen celebrates your skin's beauty with the perfect balance of hydration and control-not too dewy, not too matte.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/DTFS_LP100_Thumbnail_1_8b32d7e3-3b13-44ec-93fe-b7fbb3074da0.jpg?v=1763424563",
      officialUrl: "https://beautyofjoseon.com/products/daily-tinted-fluid-sunscreen-uk-eu",
      price: 10,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-day-dew-sunscreen",
      name: "Day Dew Sunscreen",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Our most innovative SPF yet.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/05_0612.jpg?v=1782766246",
      officialUrl: "https://beautyofjoseon.com/products/day-dew-sunscreen",
      price: 15.3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-porcelain-gwalsa-gua-sha",
      name: "Porcelain Gwalsa (Gua Sha)",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Used in traditional Korean medicine for centures, this ceramic massage tool for face and body is designed for lymphatic drainage and meridian release.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Porcelain-Gwalsa-Gua-Sha-_Beauty-of-Joseon_25252097-52106078028148.jpg?v=1762679795",
      officialUrl: "https://beautyofjoseon.com/products/porcelain-gwalsa-guasha",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-glow-replenishing-rice-milk",
      name: "Glow Replenishing Rice Milk",
      brand: "Beauty of Joseon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A hydrating, balancing toner with an innovative dual-layer formula that helps intensely moisturize while balancing sebum for skin that's glowy, not greasy.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/glow-replenshing-rice-milk-1-front.webp?v=1769660112",
      officialUrl: "https://beautyofjoseon.com/products/glow-replenishing-rice-milk",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-ground-rice-and-honey-glow-mask",
      name: "Ground Rice and Honey Glow Mask",
      brand: "Beauty of Joseon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A wash-off mask made with Korean rice extracts and honey to help brighten, soothe, hydrate, and gently exfoliate skin in one step.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/ground-rice-honey-glow-mask-1-front.webp?v=1770286001",
      officialUrl: "https://beautyofjoseon.com/products/ground-rice-and-honey-glow-mask",
      price: 13.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-jelloskin-massage-cream-for-face-and-body",
      name: "JELLOSKIN Massage Cream For Face and Body",
      brand: "Beauty of Joseon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A Beauty of Joseon x @glowwithava collaboration and your ultimate essential for head-to-toe wellness.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/JELLOSKIN-Massage-Cream-For-Face-and-Body_Beauty-of-Joseon_48732715-52106152837492.jpg?v=1762679712",
      officialUrl: "https://beautyofjoseon.com/products/jelloskin-massage-cream-for-face-and-body",
      price: 12.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "beauty-of-joseon-bojagi",
      name: "Bojagi",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Bojagi : Korean traditional wrapping clothes Deriving its name from the Korean word 'bok,' which translates to 'luck,' Bojagi has traditionally signified the 'wrapping of good fortune.' During the Joseon Dynasty, this took a special place in wedding ceremonies",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Bojagi_Beauty-of-Joseon_99432926-52106082124148.jpg?v=1762679838",
      officialUrl: "https://beautyofjoseon.com/products/bojagi",
      price: 11,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-nobang-soap-saver",
      name: "Nobang Soap Saver",
      brand: "Beauty of Joseon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What it is Organza is a fabric most similar to the nobang used in the Korean Tradition cloth Hanbok.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Nobang-Soap-Saver_Beauty-of-Joseon_66766969-52106085171572.jpg?v=1762679809",
      officialUrl: "https://beautyofjoseon.com/products/nobang-soap-saver",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-hanbok-scrunchie",
      name: "Hanbok Scrunchie",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Your favorite Hanbok-inspired hair accessory.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Hanbok-Scrunchie_Beauty-of-Joseon_26523192-52105559540084.jpg?v=1762679712",
      officialUrl: "https://beautyofjoseon.com/products/hanbok-scrunchie",
      price: 13,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-red-bean-refreshing-pore-mask",
      name: "Red Bean Refreshing Pore Mask",
      brand: "Beauty of Joseon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A non-drying clarifying mask with kaolin clay and red bean extract that gently exfoliates and absorbs excess sebum without uncomfortable tightness.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/red-bean-refreshing-pore-mask-1-front.webp?v=1770286693",
      officialUrl: "https://beautyofjoseon.com/products/red-bean-refreshing-pore-mask",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-ginseng-moist-sun-serum-spf-50-pa",
      name: "Ginseng Moist Sun Serum (SPF 50+ PA++++)",
      brand: "Beauty of Joseon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A sunscreen that feels just like your favorite serum.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/Perfect-Hanbang-Sun-Trio-Relief-Sun-Matte-Sun-Stick-Sun-Serum-_Beauty-of-Joseon_81380730-52106203398516.jpg?v=1762679751",
      officialUrl: "https://beautyofjoseon.com/products/ginseng-moist-sun-serum",
      price: 21,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-ginseng-cleansing-oil",
      name: "Ginseng Cleansing Oil",
      brand: "Beauty of Joseon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A deep cleansing oil with ginseng and micellar technology that emulsifies to help rinse away dirt, sebum, and impurities.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/ginseng-cleansing-oil-1-front.webp?v=1770617682",
      officialUrl: "https://beautyofjoseon.com/products/ginseng-cleansing-oil",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-light-on-serum-centella-vita-c",
      name: "Light On Serum : Centella + Vita C",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "vitamin_c",
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family, centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A lightweight vitamin C serum with Centella asiatica that helps brighten, target skin texture, and soothe.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/light-on-serum-centella-vita-c-1-front.webp?v=1770286241",
      officialUrl: "https://beautyofjoseon.com/products/light-on-serum-centella-vita-c",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "redness"
      ]
  },
  {
      slug: "beauty-of-joseon-red-bean-water-gel",
      name: "Red Bean Water Gel",
      brand: "Beauty of Joseon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This lightweight gel moisturizer is formulated with red bean and peptides to help maintain optimal sebum levels while bringing bounce back to your skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/red-bean-water-gel-1-front.webp?v=1770286899",
      officialUrl: "https://beautyofjoseon.com/products/red-bean-water-gel",
      price: 16.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "beauty-of-joseon-green-plum-refreshing-toner-aha-bha",
      name: "Green Plum Refreshing Toner : AHA + BHA",
      brand: "Beauty of Joseon",
      category: "toner",
      ingredientIds: [
          "aha",
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A gentle yet effective smoothing toner that helps reset your skin's natural glow by sweeping away dead skin cells and cleansing clogged pores.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/green-plum-refreshing-toner-aha-bha-1-front.webp?v=1770279162",
      officialUrl: "https://beautyofjoseon.com/products/green-plum-refreshing-toner-aha-bha",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-revive-eye-serum-ginseng-retinal",
      name: "Revive Eye Serum : Ginseng + Retinal",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A powerful Korean eye cream with a fast-absorbing serum texture that helps target the look of wrinkles, brighten, and hydrate for firmer-looking refreshed under eyes.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/revive-eye-serum-ginseng-retinal-1-front.webp?v=1770287139",
      officialUrl: "https://beautyofjoseon.com/products/revive-eye-serum-ginseng-retinal",
      price: 14.45,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "beauty-of-joseon-glow-deep-serum-rice-alpha-arbutin",
      name: "Glow Deep Serum : Rice + Alpha-Arbutin",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A brightening serum with alpha arbutin and rice bran water that helps target dullness and dark spots for brighter-looking, naturally radiant skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/glow-deep-serum-rice-alpha-arbutin-1-front.webp?v=1770617920",
      officialUrl: "https://beautyofjoseon.com/products/glow-deep-serum-rice-alpha-arbutin",
      price: 10.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-green-plum-refreshing-cleanser",
      name: "Green Plum Refreshing Cleanser",
      brand: "Beauty of Joseon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A pH-balanced gentle daily cleanser with plum and mung bean extracts that deeply cleanses and refreshes while supporting your moisture barrier.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/green-plum-refreshing-cleanser-1-front.webp?v=1770618132",
      officialUrl: "https://beautyofjoseon.com/products/green-plum-refreshing-cleanser",
      price: 13,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-radiance-cleansing-balm",
      name: "Radiance Cleansing Balm",
      brand: "Beauty of Joseon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Even the most stubborn waterproof mascara is no match for our buttery cleansing balm.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/radiance-cleansing-balm-1-front.webp?v=1770286511",
      officialUrl: "https://beautyofjoseon.com/products/radiance-cleansing-balm",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "beauty-of-joseon-revive-serum-ginseng-snail-mucin",
      name: "Revive Serum : Ginseng + Snail Mucin",
      brand: "Beauty of Joseon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Your plumping elixir for a complexion that's lost its bounce.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/revive-serum-ginseng-snail-mucin-1-front.webp?v=1769753293",
      officialUrl: "https://beautyofjoseon.com/products/revive-serum-ginseng-snail-mucin",
      price: 10.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "beauty-of-joseon-apricot-blossom-peeling-gel",
      name: "Apricot Blossom Peeling Gel",
      brand: "Beauty of Joseon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This smoothing gel cleanser is infused with plum blossom water and plant-based exfoliants to improve the look of dullness and uneven texture.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/apricot-blossom-peeling-gel-1-front.webp?v=1770618553",
      officialUrl: "https://beautyofjoseon.com/products/apricot-blossom-peeling-gel",
      price: 13,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-ginseng-essence-water",
      name: "Ginseng Essence Water",
      brand: "Beauty of Joseon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A barrier-boosting essence packed with ginseng water and niacinamide for lasting hydration, antioxidant benefits, and a glow boost.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/ginseng-essence-water-1-front.webp?v=1770618733",
      officialUrl: "https://beautyofjoseon.com/products/ginseng-essence-water",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "beauty-of-joseon-centella-asiatica-calming-mask-10-sheets",
      name: "Centella Asiatica Calming Mask (10 Sheets)",
      brand: "Beauty of Joseon",
      category: "mask",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "These lightweight sheet masks stick comfortably to your face without slipping off.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0558/4135/7989/files/centella-asiatica-calming-mask-1.webp?v=1770618911",
      officialUrl: "https://beautyofjoseon.com/products/centella-asiatica-calming-mask-10-sheets",
      price: 16.25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-mix-and-match-case-tinted-puff",
      name: "mixsoon Mix&Match Case+Tinted Puff",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Refillable Mesh Cushion Case + Tinted Puff Customize your cushion experience with the mixsoon Mix&Match Case + Tinted Puff.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Please_enter_a_title._11.jpg?v=1781673878",
      officialUrl: "https://mixsoon.us/products/mixsoon-mix-match-case-tinted-puff",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-20ml-x",
      name: "믹순 콩 클렌징 오일 미니어처 [20ml_단상자X]",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Official Mixsoon product imported from the brand catalog. Full product details should be verified against the official page before allergy-sensitive use.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0839521524772c28a94a097b490bfc14.jpg?v=1761198459",
      officialUrl: "https://mixsoon.us/products/claim-gift-_-mixsoon-bean-cleansing-oil-20ml",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-15ml-x",
      name: "믹순 콩 크림 미니어처 [15ml_단상자X]",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Official Mixsoon product imported from the brand catalog. Full product details should be verified against the official page before allergy-sensitive use.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/BeanCream.png?v=1781836485",
      officialUrl: "https://mixsoon.us/products/믹순-콩-크림-미니어처-15ml_단상자x",
      price: 9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-bifida-toner-150ml",
      name: "mixsoon Bifida Toner 150ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Bifida Toner is a refreshing, two-way toner designed to hydrate and strengthen your skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/bcfbb2f20ea4b8a80306be9e01f68d5a.jpg?v=1699431242",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-toner-150ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-centella-stick-balm-11-5ml",
      name: "mixsoon Centella Stick Balm 11.5ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Centella Stick Balm is a convenient, multi-purpose balm stick designed to soothe, hydrate, and protect sensitive skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/2_74e8888f-d5cc-4ba0-a2ee-cbd5550148d4.jpg?v=1726213114",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-stick-balm-11-5ml",
      price: 35,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-1-1-bean-cleansing-oil-195ml",
      name: "mixsoon 1 + 1 Bean Cleansing Oil 195ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon 1 + 1 Bean Cleansing Oil 195ml Bundle contains 2 Bean Cleansing Oil 195ml.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/195ml_2.png?v=1780641830",
      officialUrl: "https://mixsoon.us/products/mixsoon-1-1-bean-cleansing-oil-195ml",
      price: 45,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-1-1-centella-cleansing-foam-150ml",
      name: "mixsoon 1 + 1 Centella Cleansing Foam 150ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon 1 + 1 Centella Cleansing Foam 150ml Bundle contains 2 Centella Cleansing Foam 150ml.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/150ml_2.png?v=1780641679",
      officialUrl: "https://mixsoon.us/products/mixsoon-1-1-centella-cleansing-foam-150ml",
      price: 32.4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "mixsoon-1-1-bean-cream-65ml",
      name: "mixsoon 1+1 Bean Cream 65ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon 1 + 1 Bean Cream Bundle contains 2 Bean Cream 65ml.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/65ml_2.png?v=1780640731",
      officialUrl: "https://mixsoon.us/products/mixsoon-1-1-bean-cream-65ml",
      price: 72,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-1-1-bean-cream-50ml",
      name: "mixsoon 1+1 Bean Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon 1 + 1 Bean Cream Bundle contains 2 Bean Cream 50ml.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/50ml_2.png?v=1780640570",
      officialUrl: "https://mixsoon.us/products/mixsoon-1-1-bean-cream-50ml",
      price: 63,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer",
      name: "mixsoon PDRN Collagen Tinted Moisturizer",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/jpg_7b2de56c-1ea4-4544-a76a-a16f9411adbd.jpg?v=1780381914",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-centella-hyal-sunscreen-50ml",
      name: "mixsoon Centella Hyal Sunscreen 50ml",
      brand: "Mixsoon",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Protect and hydrate your skin in one step with mixsoon Centella Hyal Sunscreen .",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/png_93d5bc58-2aa3-42a3-a8a3-f8b55c61c591.png?v=1776847829",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-sunscreen-50ml",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-17-bare-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 17 Bare 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/17_a2eb22e5-7d20-41d1-abcd-628e4dccb361.jpg?v=1776234916",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-17-bare-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-10-ease-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 10 Ease 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/10_7537d53c-7a5d-426a-b7c8-9c6c27732ca9.jpg?v=1776234891",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-10-ease",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-30-melt-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 30 Melt 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_40860798-5c59-4fa3-9471-b49f970bf045.jpg?v=1776238978",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-30-melt-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-27-unseen-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 27 Unseen 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/27.jpg?v=1776235146",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-27-unseen-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-23-aura-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 23 Aura 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/23_fd5043e8-a949-445e-950a-84ffecefa28b.jpg?v=1776234856",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-23-aura-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-21-soft-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 21 Soft 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/21_a17c852e-1ba3-4334-a212-2de78e3688ab.jpg?v=1776238743",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-21-soft-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-60-trace-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 60 Trace 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/60.jpg?v=1776239496",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-60-trace-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-50-haze-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 50 Haze 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/50_5d9cbc22-91e3-4ff0-b103-b025d1fd55c5.jpg?v=1776239410",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-50-haze-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-45-calm-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 45 Calm 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/45.jpg?v=1776239319",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-45-calm-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-tinted-moisturizer-no-40-dew-50ml",
      name: "mixsoon PDRN Collagen Tinted Moisturizer No. 40 Dew 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "74% Skincare-Infused Base • Rice PDRN • Peptides • 24H Vibrant Glow & Luminous Hydration The mixsoon PDRN Collagen Tinted Moisturizer is a high-performance hybrid created to illuminate and hydrate the skin with a 74% skin-active essence.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/40.jpg?v=1776239207",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-tinted-moisturizer-no-40-dew-50ml",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-house-edition",
      name: "mixsoon Bean House Edition",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bean House Edition The mixsoon Bean House Edition is a set that brings together four of our most-loved Bean products in one festive package.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/house_bean_nukki.png?v=1764308355",
      officialUrl: "https://mixsoon.us/products/mixsoon-holiday-box-bean-special",
      price: 86,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-pdrn-house-edition",
      name: "mixsoon PDRN House Edition",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon PDRN House Edition The mixsoon PDRN House Edition is a gift set featuring four collagen-boosting essentials: the PDRN Collagen Gel Cleanser, Serum, Cream, and Eye Serum.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/pdrnboxnukki.png?v=1765175103",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-special-holiday-box-limited-edition",
      price: 80,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-1-1-bean-sunscreen-50ml",
      name: "mixsoon 1+1 Bean Sunscreen 50ml",
      brand: "Mixsoon",
      category: "sunscreen",
      ingredientIds: [
          "ceramides",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon 1 + 1 Bean Sunscreen 50ml Bundle contains 2 Bean Sunscreen 50ml.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/bean_sunscreen_1_1.png?v=1775106379",
      officialUrl: "https://mixsoon.us/products/mixsoon-1-1-bean-sunscreen-50ml",
      price: 54,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-hydrogel-mask-35g-5ea",
      name: "mixsoon PDRN Collagen Hydrogel Mask 35g*5ea",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "PDRN derived from Rice mixsoon PDRN Collagen Hydrogel Mask is a premium hydrogel sheet mask that delivers intensive hydration, elasticity, and radiance to dull and tired skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/psrncollagenmasknukki.png?v=1770343037",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-hydrogel-mask-35g-5ea",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-daisy-essence-30ml",
      name: "mixsoon Daisy Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Daisy Essence is a gentle yet powerful essence designed to restore vitality and clarity to dull, fatigued skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30ml_NEW.jpg?v=1744162626",
      officialUrl: "https://mixsoon.us/products/mixsoon-daisy-essence-30ml",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-intensive-silk-hair-mist",
      name: "and by mixsoon Intensive Silk Hair Mist",
      brand: "Mixsoon",
      category: "mist",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Intensive Silk Hair Mist is a refreshing protein hair mist designed to care for damaged hair while leaving it instantly smooth, soft, and tangle-free.",
      usageSteps: [
          "Mist over face as needed",
          "Keep eyes closed while spraying",
          "Use before or after makeup for added comfort"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/d3ad4498abc583a9dd520993ebde8ca0.png?v=1782443011",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-intensive-silk-hair-mist",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-tea-tree-moisture-conditioner",
      name: "and by mixsoon Tea Tree Moisture Conditioner",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Tea Tree Moisture Conditioner is a gentle, moisture-rich protein conditioner designed to nourish dry, damaged hair while leaving it smooth, glossy, and lightweight.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1a4239bc41d5477dffc540d83acc3263.png?v=1782443295",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-tea-tree-moisture-conditioner",
      price: 30,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-tea-tree-scalp-shampoo",
      name: "and by mixsoon Tea Tree Scalp Shampoo",
      brand: "Mixsoon",
      category: "hair",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Tea Tree Scalp Shampoo is a refreshing, mildly acidic scalp shampoo designed to gently cleanse while maintaining a comfortable and healthy scalp environment.",
      usageSteps: [
          "Apply to hair or scalp as directed",
          "Massage gently if used on scalp",
          "Rinse or leave in according to the product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0c4bbece4558dbc6ab6addf121dd3bb6.png?v=1782443354",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-tea-tree-scalp-shampoo",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-tea-tree-aha-retinol-body-lotion",
      name: "and by mixsoon Tea Tree AHA Retinol Body Lotion",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "retinol",
          "aha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family, AHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Tea Tree Moisture Conditioner is a gentle, moisture-rich protein conditioner designed to nourish dry, damaged hair while leaving it smooth, glossy, and lightweight.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/3daf7ecf700ebcd441f2c25dbaa2ed13.png?v=1782443403",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-tea-tree-aha-retinol-body-lotion",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-tea-tree-aha-body-mist",
      name: "and by mixsoon Tea Tree AHA Body Mist",
      brand: "Mixsoon",
      category: "mist",
      ingredientIds: [
          "aha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Tea Tree AHA Body Mist is a lightweight, hydrating body mist designed to gently smooth skin texture while delivering instant moisture and soothing care without any stickiness.",
      usageSteps: [
          "Mist over face as needed",
          "Keep eyes closed while spraying",
          "Use before or after makeup for added comfort"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/b1ecbaed1785cc9d05058245d08d41f6.png?v=1782443106",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-tea-tree-aha-body-mist",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-and-by-mixsoon-tea-tree-aha-body-wash",
      name: "and by mixsoon Tea Tree AHA Body Wash",
      brand: "Mixsoon",
      category: "body",
      ingredientIds: [
          "aha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: AHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Intensive Silk Hair Mist is a refreshing protein hair mist designed to care for damaged hair while leaving it instantly smooth, soft, and tangle-free.",
      usageSteps: [
          "Apply to clean body skin",
          "Massage until absorbed",
          "Use daily or as needed"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/cda0fad9bdc61137505e858d69ae1085.png?v=1782443167",
      officialUrl: "https://mixsoon.us/products/and-by-mixsoon-tea-tree-aha-body-wash",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-centella-cleansing-foam-miniature-20ml",
      name: "mixsoon Centella Cleansing Foam Miniature 20ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Official Mixsoon product imported from the brand catalog. Full product details should be verified against the official page before allergy-sensitive use.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/10d48abae837effbc3885924d832f26c.jpg?v=1761198564",
      officialUrl: "https://mixsoon.us/products/claim-gift-_-mixsoon-centella-cleansing-foam-20ml",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "mixsoon-daisy-toner-300ml",
      name: "mixsoon Daisy Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "pH 5~8 • Alcohol-Free mixsoon Daisy Toner is a refreshing, lightweight toner formulated with pure daisy flower extract to help brighten and balance uneven skin tone.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonDaisyToner300ml.png?v=1724656722",
      officialUrl: "https://mixsoon.us/products/mixsoon-daisy-toner-300ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-collagen-hydrogel-eye-patch-single-pack",
      name: "mixsoon Collagen Hydrogel Eye Patch Single Pack",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Alcohol-Free • Fragrance-Free mixsoon Collagen Hydrogel Eye Patch is a targeted treatment designed to firm, brighten, and hydrate the delicate eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/nukki.png?v=1764651432",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-hydrogel-eye-patch-single-pack",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-hyalraebae-pore-blurring-cream-50ml",
      name: "mixsoon Hyalraebae Pore Blurring Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~7 • Safety-Tested for Children • Alcohol-Free The Hyalraebae Pore Blurring Cream is a must-have for achieving a flawless, smooth complexion.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_f5d67f27-5334-48b1-85b7-23f75c4f7769.jpg?v=1781491433",
      officialUrl: "https://mixsoon.us/products/mixsoon-hyalraebae-pore-blurring-cream-50ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-hyalraebae-pore-bubble-serum-70ml",
      name: "mixsoon Hyalraebae Pore Bubble Serum 70ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~7 The Hyalraebae Pore Bubble Serum is designed to deliver deep hydration while refining pores for smoother, more even skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/133ddf6956952f1c0f7450485fbabecc.jpg?v=1781491325",
      officialUrl: "https://mixsoon.us/products/mixsoon-hyalraebae-pore-bubble-serum-70ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-black-rice-peeling-ampoule-100ml",
      name: "mixsoon Black Rice Peeling Ampoule 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan mixsoon Black Rice Peeling Ampoule is an intensive hydrating exfoliating treatment that refines rough skin texture while nourishing it from within.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/new_label_black.png?v=1762409544",
      officialUrl: "https://mixsoon.us/products/mixsoon-black-rice-peeling-ampoule",
      price: 40,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-white-rice-peeling-ampoule-100ml",
      name: "mixsoon White Rice Peeling Ampoule 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan mixsoon White Rice Peeling Ampoule gently exfoliates and deeply hydrates the skin with a mild, non-irritating formula perfect for everyday care.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/new_label_white.png?v=1762409552",
      officialUrl: "https://mixsoon.us/products/mixsoon-white-rice-peeling-ampoule",
      price: 40,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-collagen-powder-lime-flavor-100g",
      name: "mixsoon Collagen Powder Lime Flavor 100g",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Collagen Powder Lime Flavor is formulated with low-molecular-weight fish collagen peptides (1,000 Da) for superior absorption and effective results.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/7320e6e14854acb98a1bf1046a4ed994.png?v=1775106203",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-powder-lime-flavor-100g",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "mixsoon-collagen-powder-pomegranate-flavor-100g",
      name: "mixsoon Collagen Powder Pomegranate Flavor 100g",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Collagen Powder Pomegranate Flavor is formulated with low-molecular-weight fish collagen peptides (1,000 Da) for superior absorption and effective results.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/d34723961a86c699282d1898b78fb5f7.png?v=1775106185",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-powder-pomegranate-flavor-100g",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-serum-30ml",
      name: "mixsoon PDRN Collagen Serum 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "PDRN derived from Rice • Low-Molecule Collagen • Peptide • Niacinamide Benefits: The mixsoon PDRN Collagen Serum is a moisture-boosting, firming treatment that combines plant-based PDRN, collagen, and peptides to help restore skin elasticity and vitality.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/pdrn_collagen_serum.png?v=1775108639",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-serum",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-collagen-hydrogel-mask-pack-1pack-3ea",
      name: "mixsoon Bean Collagen Hydrogel Mask Pack (1PACK 3EA)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Highly Concentrated Fermented Soybean • Low-Molecular Collagen • Wrinkle Improvement • Brightening mixsoon Bean Collagen Hydrogel Mask is designed to provide deep nourishment and a radiant glow with its high-adhesion hydrogel that stays securely in place witho",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Bean_Collagen_Hydrogel_Mask_Pack_1PACK_3EA.jpg?v=1775105951",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-collagen-hydrogel-mask-pack-1pack-5ea-사본",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "barrier",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-gel-cleanser-100ml",
      name: "mixsoon PDRN Collagen Gel Cleanser 100ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "PDRN derived from Rice • Low-Molecule Collagen • Peptide mixsoon PDRN Collagen Gel Cleanser is a gentle yet effective formula designed to provide deep hydration while cleansing the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/pdrngelcleansernew.png?v=1762409534",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-gel-cleanser",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "mixsoon-bifida-mask-pack-1-ea",
      name: "mixsoon Bifida Mask Pack 1 EA",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon BIFIDA Mask Pack is a revitalizing sheet mask designed to strengthen and hydrate your skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/BifidaMaskPack.png?v=1752739711",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-mask-pack-1-ea",
      price: 2.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-centella-mask-pack-1-ea",
      name: "mixsoon Centella Mask Pack 1 EA",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Centella Mask Pack is a deeply hydrating and calming sheet mask designed to soothe tired, sensitive, or redness-prone skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/centella_mask_pack_1ea_thumbnail.png?v=1761549859",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-mask-pack-1-ea",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-heartleaf-toner-300ml",
      name: "mixsoon Heartleaf Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~8 • Alcohol-Free Revitalize and soothe your skin with mixsoon's Houttuynia Cordata Toner, a carefully crafted toner formulated with 100% pure Houttuynia Cordata extract.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/300ml___1_ec810f80-3452-4347-9e77-fc2bcd293deb.jpg?v=1724656728",
      officialUrl: "https://mixsoon.us/products/mixsoon-heartleaf-toner-300ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-eye-serum-20ml",
      name: "mixsoon PDRN Collagen Eye Serum 20ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "PDRN derived from Rice • Low-Molecule Collagen • Peptide • Niacinamide Benefits: The mixsoon PDRN Collagen Serum is a moisture-boosting, firming treatment that combines plant-based PDRN, collagen, and peptides to restore skin elasticity and vitality.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/pdrneyecreamnew.png?v=1762409467",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-eye-serum-20ml",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-pdrn-collagen-cream-50ml",
      name: "mixsoon PDRN Collagen Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "PDRN derived from Rice • Low-Molecule Collagen • Peptide • Niacinamide Benefits: The mixsoon PDRN Collagen Cream is a moisture-rich, hydrating formula that delivers deep, lasting hydration with a lightweight, silky application.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/pdrn_cream_new.png?v=1762409520",
      officialUrl: "https://mixsoon.us/products/mixsoon-pdrn-collagen-cream-50ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-vitamin-c-cream-30ml",
      name: "mixsoon Vitamin C Cream 30ml",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "vitamin_c"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Rejuvenate your skin with the mixsoon Vitamin C Cream, a daily vitality-boosting moisturizer designed to gently brighten and hydrate.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/vitccreamnewthumb.png?v=1762409498",
      officialUrl: "https://mixsoon.us/products/mixsoon-vitamin-c-cream-30ml",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-vitamin-c-20-serum-10ml",
      name: "mixsoon Vitamin C 20 Serum 10ml",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "vitamin_c"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Revitalize and brighten your skin with the mixsoon Vitamin C 20 Serum, a high-concentration formula packed with 20% pure Vitamin C.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/vitcserumnewthumb.png?v=1762409447",
      officialUrl: "https://mixsoon.us/products/mixsoon-vitamin-c-20-serum-10ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "mixsoon-cica-hyal-deep-soothing-cream-50ml",
      name: "mixsoon Cica Hyal Deep Soothing Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon's Cica Hyal Deep Soothing Cream is a hydrating and soothing solution designed for sensitive skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/e0af30198ba2190c0df5f12ac6c8f9bc.jpg?v=1750406423",
      officialUrl: "https://mixsoon.us/products/mixsoon-cica-hyal-deep-soothing-cream",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-peptide-cica-hyalshot-350",
      name: "mixsoon Peptide Cica Hyalshot 350",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "centella",
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Alcohol-Free • Fragrance-Free The Peptide Cica Hyalshot 350 is an intensive skincare treatment designed to target complex skin concerns with precision.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/2cd0c61581884005a05bcd8214c5152c.jpg?v=1750209183",
      officialUrl: "https://mixsoon.us/products/mixsoon-peptide-cica-hyalshot-350",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-peptide-cica-hyalshot-150-50ml",
      name: "mixsoon Peptide Cica Hyalshot 150 (50ml)",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "centella",
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Peptide Cica Hyalshot 150 is a gentle yet effective skincare treatment designed for sensitive or delicate skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/ca252059647f5e4afdd85d512417dfbe.jpg?v=1750207546",
      officialUrl: "https://mixsoon.us/products/mixsoon-peptide-cica-hyalshot-150",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-essence-mist-pump",
      name: "mixsoon Essence Mist Pump",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Upgrade your skincare routine with our Mist Pump, designed for effortless application and maximum absorption.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/093a329b1597186d275035f6fa183972.jpg?v=1775104817",
      officialUrl: "https://mixsoon.us/products/mixsoon-essence-mist-pump",
      price: 2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-master-deep-barrier-face-mask-5ea",
      name: "mixsoon Master Deep Barrier Face Mask 5ea",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Master Deep Barrier Mask is a powerful skincare treatment designed to restore and reinforce your skin's natural barrier.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1a2df4851458fcbfbd271e7af6db45a7.jpg?v=1750495795",
      officialUrl: "https://mixsoon.us/products/mixsoon-master-deep-barrier-face-mask",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-heartleaf-toner-150ml",
      name: "mixsoon Heartleaf Toner 150ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Revitalize and soothe your skin with mixsoon's Houttuynia Cordata Toner, a carefully crafted toner formulated with 100% pure Houttuynia Cordata extract.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonHeartleafToner150ml.png?v=1690433299",
      officialUrl: "https://mixsoon.us/products/mixsoon-heartleaf-toner-150ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-derma-booster-pro",
      name: "mixsoon Derma Booster PRO",
      brand: "Mixsoon",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Derma Booster Pro is an advanced all-in-one beauty device designed to deliver professional-grade skincare in the comfort of your home.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Please_enter_a_title..jpg?v=1781158203",
      officialUrl: "https://mixsoon.us/products/mixsoon-derma-booster-pro-the-ultimate-3-in-1-solution-for-daily-skin-radiance-and-firmness",
      price: 299,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-spa-centella-toner-1000ml",
      name: "mixsoon spa Centella Toner 1000ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume Toner",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/78d3a1e681c138f978be3856c1bb9c37_3356dfbd-e9d6-4c91-b25d-616905803656.png?v=1783411980",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-centella-toner-1000ml",
      price: 108,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "mixsoon-spa-bifida-toner-1000ml",
      name: "mixsoon spa Bifida Toner 1000ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume Toner",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/199f82a0c5f4e4f63e1a7388b9de2570.png?v=1783412096",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-bifida-toner-1000ml",
      price: 108,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-spa-galactomyces-toner-1000ml",
      name: "mixsoon spa Galactomyces Toner 1000ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume Toner mixsoon Moisturizing Galactomyces Toner is a gentle yet effective skincare essential designed to refine and hydrate your skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/89acbacbc3787efd3e3a84a240eb38a6.png?v=1783412184",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-centella-essence-500ml-copy",
      price: 108,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-spa-centella-essence-500ml",
      name: "mixsoon spa Centella Essence 500ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume essence",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/b45e656c966fe6ac84e6085095ad46c4_4b496361-6740-4051-83cc-d8ebb980f1f8.png?v=1783412220",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-centella-essence",
      price: 144,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-spa-bifida-essence-500ml",
      name: "mixsoon spa Bifida Essence 500ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume essence",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/f7d188a788b336ca491b69a11a1e1337.png?v=1783412139",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-bifida-essence-500ml",
      price: 144,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-spa-galactomyces-essence-500ml",
      name: "mixsoon spa Galactomyces Essence 500ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume essence",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/53af4212e59bd949aaddb61ad2f8bcae.png?v=1783412049",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-bean-essence-copy",
      price: 144,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-spa-bean-essence-500ml",
      name: "mixsoon spa Bean Essence 500ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon spa line - Large volume essence",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/71365a0ab4db4faf710f8c38ebfef2db.png?v=1783412015",
      officialUrl: "https://mixsoon.us/products/mixsoon-spa-bean-essence",
      price: 158,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-bean-essence-20ml",
      name: "mixsoon Bean Essence 20ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~6 • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: A lightweight, hydrating formula that smooths skin texture and reduces the look of roughness.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/20_fbe09aa8-5371-4ab0-9bd7-08a9f69dfbf6.png?v=1782367349",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-essence-20ml",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-bean-cream-65ml",
      name: "mixsoon Bean Cream 65ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon's Bean Cream combines powerful natural ingredients, effective hydration, and barrier protection in a lightweight, clean formula that's perfect for daily use.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/bean65.png?v=1782362567",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-cream-25ml-copy",
      price: 40,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-collagen-glass-skin-mask-80ml",
      name: "mixsoon Collagen Glass Skin Mask 80ml",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Collagen Glass Skin Mask is a deeply hydrating peel-off mask that helps reveal your skin's natural glow.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Collagen_Glass_Skin_Mask.png?v=1775106644",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-glass-skin-mask-peel-off-packs-2-71-fl-oz-80ml",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-cream-25ml",
      name: "mixsoon Bean Cream 25ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon's Bean Cream combines powerful natural ingredients, effective hydration, and barrier protection in a lightweight, clean formula that's perfect for daily use.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/bean25.png?v=1782363159",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-cream-25ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-bean-cleansing-oil-100ml",
      name: "mixsoon Bean Cleansing Oil 100ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Discover the refreshing power of the mixsoon Bean Cleansing Oil, a lightweight yet deeply effective cleansing oil designed to remove makeup, sunscreen, and impurities without leaving behind any greasy residue.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/oil100.png?v=1782363017",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-cleansing-oil-195ml-copy",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-amino-powder-stick-1pack-0-1g-10ea",
      name: "mixsoon Amino Powder Stick 1PACK(0.1g * 10ea)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Amino Acid Powder is a premium skincare powder designed to nourish and hydrate the skin with 100% pure L-Serine, a naturally occurring amino acid.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_8463f888-3df3-4208-9489-daf88e1dab2e.jpg?v=1744965161",
      officialUrl: "https://mixsoon.us/products/mixsoon-amino-powder-8g-copy",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "mixsoon-reishi-mushroom-essence-30ml",
      name: "mixsoon Reishi Mushroom Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Reishi Mushroom Stem Essence is a powerful skincare treatment designed to restore and rejuvenate the skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/reishimushroom.png?v=1783410448",
      officialUrl: "https://mixsoon.us/products/mixsoon-reishi-mushroom-essence-100ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-lotus-flower-essence-30ml",
      name: "mixsoon Lotus Flower Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Lotus Flower Essence is a lightweight, deeply hydrating essence made with 100% pure lotus extract.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_d6d423bc-1534-4ad9-943e-af8b77d63572.png?v=1783410323",
      officialUrl: "https://mixsoon.us/products/mixsoon-lotus-flower-essence-100ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-mung-bean-seed-essence-30ml",
      name: "mixsoon Mung Bean Seed Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Mung Bean Essence is the ultimate soothing solution for irritated, sensitive skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_41719ba0-7647-4919-bae8-8b8200c202e8.png?v=1782363933",
      officialUrl: "https://mixsoon.us/products/mixsoon-mung-bean-seed-essence-100ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-noni-fruit-essence-30ml",
      name: "mixsoon Noni Fruit Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Noni Essence is a revitalizing skincare product designed to nourish and hydrate the skin with the power of 100% Noni Fruit Extract.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_6fe06ac1-cda7-43f0-a724-28d8f07084b1.png?v=1782364057",
      officialUrl: "https://mixsoon.us/products/mixsoon-noni-fruit-essence-100ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-soybean-milk-serum-30ml",
      name: "mixsoon Soybean Milk Serum 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Soybean Milk Serum is an intensive, vegan-friendly serum designed to hydrate and firm the skin, leaving it with a smooth, radiant glow.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/soybean30.png?v=1782362790",
      officialUrl: "https://mixsoon.us/products/mixsoon-soybean-milk-serum-50ml-copy",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "mixsoon-glacier-water-ice-soothing-gel-150ml",
      name: "mixsoon Glacier Water Ice Soothing Gel 150ml",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Glacier Water Ice Soothing Gel is a refreshing, featherlight moisturizer designed to cool, hydrate, and revitalize tired skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Glacier_Water_Ice_Soothing_gel.jpg?v=1775105011",
      officialUrl: "https://mixsoon.us/products/mixsoon-glacier-water-ice-soothing-gel-150ml",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-collagen-cleansing-balm",
      name: "mixsoon Collagen Cleansing Balm",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Alcohol-Free mixsoon Collagen Cleansing Balm is a luxurious, ultra-gentle cleansing balm that effortlessly melts away makeup, impurities, and sunscreen, leaving your skin refreshed and nourished.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_2ec68af3-e803-42d4-ad19-56a7039ce324.jpg?v=1744172849",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-cleansing-balm",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-balancing-ampoule-mist-100ml",
      name: "mixsoon Bean Balancing Ampoule Mist 100ml",
      brand: "Mixsoon",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Bean Balancing Ampoule Mist is a refreshing and hydrating mist that brings balance to your skin, leaving it soft, radiant, and nourished.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/3203891b9c233570a527aad96e956803.jpg?v=1742358897",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-ampoule-balancing-mist-100ml",
      price: 30,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-green-cica-modeling-face-mask-5ea",
      name: "mixsoon Green Cica Modeling Face Mask 5ea",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Green Cica Modeling Pack is the perfect solution for an at-home facial that delivers soothing and cooling effects.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonGreenCicaModelingFaceMask5ea.png?v=1690433370",
      officialUrl: "https://mixsoon.us/products/mixsoon-green-cica-modeling-face-mask-5ea",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "mixsoon-h-c-t-mist-50ml",
      name: "mixsoon H.C.T Mist 50ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The H.C.T.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonH.C.TMist50ml.png?v=1690345506",
      officialUrl: "https://mixsoon.us/products/mixsoon-h-c-t-mist-50ml",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-h-c-t-essence-50ml",
      name: "mixsoon H.C.T Essence 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon H.C.T.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonH.C.TEssence50ml.png?v=1690345519",
      officialUrl: "https://mixsoon.us/products/mixsoon-h-c-t-essence-50ml",
      price: 35,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-centella-asiatica-toner-150ml",
      name: "mixsoon Centella Asiatica Toner 150ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Revitalize and restore balance to your skin with the mixsoon Centella Asiatica Toner , a soothing and moisturizing formula that delivers instant hydration from the very first step.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/150ml___1.jpg?v=1710395839",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-toner-150ml-copy",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bifida-ferment-essence-30ml",
      name: "mixsoon Bifida Ferment Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bifida Ferment Essence is a hydrating and skin-rejuvenating essence that harnesses the power of Bifida Ferment Lysate, a probiotic-rich ingredient known for strengthening the skin's natural barrier, soothing irritation, and providing deep hydration.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_5fd99966-a121-4d48-8ef9-8b1dd95bd6c0.png?v=1782363392",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-ferment-essence-100ml-copy-1",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-galactomyces-ferment-essence-30ml",
      name: "mixsoon Galactomyces Ferment Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Galactomyces Ferment Essence is a luxurious, vegan skincare product designed to provide deep hydration and enhance skin radiance.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_97ce85f1-cd5d-4801-998a-55e1c08542f0.png?v=1782363262",
      officialUrl: "https://mixsoon.us/products/mixsoon-galactomyces-ferment-essence-30ml",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-weekly-bean-mask-pack-130g-7ea",
      name: "mixsoon Weekly Bean Mask Pack 130g (7ea)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Weekly Bean Mask Pack is a nourishing 7-day treatment designed to rejuvenate and hydrate the skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/7_a971291b-50d9-454c-b1a4-f5792907bd70.png?v=1783410052",
      officialUrl: "https://mixsoon.us/products/mixsoon-weekly-bean-mask-pack-130g-7ea",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-hyaluronic-acid-toner-pad",
      name: "mixsoon Hyaluronic Acid Toner Pad",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Hyaluronic Acid Toner Pad is a versatile skincare essential designed to deeply hydrate, soothe, and refresh your skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/f26fb0c36aea50b4cb6beec0a12b0c90.jpg?v=1737519055",
      officialUrl: "https://mixsoon.us/products/mixsoon-hyaluronic-acid-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-collagen-toner-pad-110ea",
      name: "mixsoon Collagen Toner Pad (110ea)",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 6 • Alcohol-Free • Fragrance-Free mixsoon Collagen Toner Pad is a nourishing skincare essential that combines the power of Enoki mushrooms, PDRN, and Hyaluronic Acid to deeply hydrate, firm, and rejuvenate the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/33e5beb64f7f6022aecde4a7270202f3.jpg?v=1737519012",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-hinoki-essence-30ml",
      name: "mixsoon Hinoki Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Hinoki Essence is a soothing, vegan skincare essential that helps calm and restore stressed skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_7f8ffe76-3659-4f28-89ba-5096a54fe1d8.png?v=1783410548",
      officialUrl: "https://mixsoon.us/products/mixsoon-hinoki-essence-100ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bean-eye-cream-20ml",
      name: "mixsoon Bean Eye Cream 20ml",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • HRIPT Tested • Alcohol-Free • Fragrance-Free Benefits: The mixsoon Bean Eye Cream is a luxurious and nourishing treatment specifically designed to target the delicate under-eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MX_1x1_beaneyecream.jpg?v=1701937287",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-eye-cream-20ml",
      price: 30,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-master-gentle-recipe-foam-cleanser-150ml",
      name: "mixsoon Master Gentle Recipe Foam Cleanser 150ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Master Gentle Recipe Foam Cleanser is a hydrating and soothing facial cleanser designed to gently cleanse your skin without irritation.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonMasterGentleRecipeFoamCleanser150ml.png?v=1766120590",
      officialUrl: "https://mixsoon.us/products/mixsoon-master-gentle-recipe-foam-cleanser-150ml",
      price: 23,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "mixsoon-melting-collagen-cheek-film",
      name: "mixsoon Melting Collagen Cheek Film",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Melting Collagen Cheek Film is an innovative 5-day at-home treatment specially designed to target sagging, dull skin around the cheeks and smile lines.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_652db253-d12a-44fe-b2f4-6a2502c98fc3.jpg?v=1735799704",
      officialUrl: "https://mixsoon.us/products/influencer-mixsoon-melting-collagen-cheek-film-copy",
      price: 44,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-sunscreen-50ml",
      name: "mixsoon Bean Sunscreen 50ml",
      brand: "Mixsoon",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bean Sunscreen SPF 50 is a broad-spectrum sunscreen designed to offer powerful UV protection without leaving a white cast.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/7dcd886ab7529ad95bcdf489bf055edd.jpg?v=1781491387",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-sunscreen-50ml",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-natural-bean-lip-mask-balm",
      name: "mixsoon Natural Bean Lip Mask Balm",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Natural Bean Lip Mask Balm is a nourishing lip balm that deeply hydrates and restores moisture to dry, flaky lips.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_ce621e94-6a3e-4b50-98f1-c777e6a9db2f.jpg?v=1775204785",
      officialUrl: "https://mixsoon.us/products/influencer-mixsoon-natural-bean-lip-mask-balm-copy",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-master-serum-60ml",
      name: "mixsoon Master Serum 60ml",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Master Serum is a highly effective, lightweight serum designed to provide deep hydration, soothe irritated skin, and strengthen the skin barrier.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonMasterSerum60ml.png?v=1766120186",
      officialUrl: "https://mixsoon.us/products/mixsoon-master-serum-60ml",
      price: 38,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "mixsoon-glacier-water-hyaluronic-acid-serum-100ml",
      name: "mixsoon Glacier Water Hyaluronic Acid Serum 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~8 • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: The mixsoon Glacier Water Hyaluronic Acid Serum offers an invigorating burst of hydration designed to restore and rejuvenate dry, tired skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/100ml___1_10829c26-a31e-4d46-a2be-34189a7e9488.jpg?v=1735538220",
      officialUrl: "https://mixsoon.us/products/mixsoon-glacier-water-hyaluronic-acid-serum-30ml-copy-1",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-soondy-centella-asiatica-essence-30ml",
      name: "mixsoon Soondy Centella Asiatica Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Soondy Centella Asiatica Essence is a soothing and restorative essence that harnesses the power of Centella Asiatica, also known as Cica, to promote healthy, hydrated skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_58e2f70e-ac34-4928-8ecc-02f39475a456.png?v=1783409957",
      officialUrl: "https://mixsoon.us/products/influencer-mixsoon-soondy-centella-asiatica-essence-30ml-copy",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bean-collagen-hydrogel-mask-pack-1pack-5ea",
      name: "mixsoon Bean Collagen Hydrogel Mask Pack (1PACK 5EA)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Highly Concentrated Fermented Soybean • Low-Molecular Collagen • Wrinkle Improvement • Brightening mixsoon Bean Collagen Hydrogel Mask is designed to provide deep nourishment and a radiant glow with its high-adhesion hydrogel that stays securely in place witho",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Bean_Collagen_Hydrogel_Mask_Pack_1PACK_5EA.jpg?v=1775105980",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-collagen-hydrogel-mask-5ea",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "barrier",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-master-serum-30ml",
      name: "mixsoon Master Serum 30ml",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Master Serum is a highly effective, lightweight serum designed to provide deep hydration, soothe irritated skin, and strengthen the skin barrier.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_50c63d3e-e1cb-4c4a-8b17-1d452d53c62b.png?v=1783409850",
      officialUrl: "https://mixsoon.us/products/mixsoon-master-serum-60ml-copy",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "mixsoon-glacier-water-hyaluronic-acid-serum-30ml",
      name: "mixsoon Glacier Water Hyaluronic Acid Serum 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~8 • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: The mixsoon Glacier Water Hyaluronic Acid Serum offers an invigorating burst of hydration designed to restore and rejuvenate dry, tired skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/14___30ml.jpg?v=1733819652",
      officialUrl: "https://mixsoon.us/products/mixsoon-glacier-water-hyaluronic-acid-serum-300ml-copy",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-peptide-cica-hyal-shot-1-69-fl-oz-50ml",
      name: "mixsoon Peptide Cica Hyal-Shot 1.69 fl.oz/50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "centella",
          "peptides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, peptide family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Peptide Cica Hyal-shot is a next-level skincare treatment designed to hydrate, firm, and soothe.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Peptide_Cica_Hyal_Shot_50ml.png?v=1775105656",
      officialUrl: "https://mixsoon.us/products/mixsoon-peptide-cica-hyal-shot-1-69-fl-oz-50ml",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-essence-30ml",
      name: "mixsoon Bean Essence 30ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~6 • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: A lightweight, hydrating formula that smooths skin texture and reduces the look of roughness.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/30_7978df5a-cc4d-4d52-83b1-1df65ae97f6c.png?v=1781770063",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-essence-30ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-bean-essence-50ml",
      name: "mixsoon Bean Essence 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~6 • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: A lightweight, hydrating formula that smooths skin texture and reduces the look of roughness.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/ae12968a693c13fbdf71aa20fded05bb.jpg?v=1781491135",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-essence-50ml",
      price: 35,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-leaflet",
      name: "mixsoon Leaflet",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "NOT FOR SALE",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/eac4ee22b2d0057944836043c719a035.jpg?v=1725358362",
      officialUrl: "https://mixsoon.us/products/mixsoon-leaflet",
      price: 0,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-bean-essence-sachet-1-5ml",
      name: "mixsoon Bean Essence Sachet [1.5ml]",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Official Mixsoon product imported from the brand catalog. Full product details should be verified against the official page before allergy-sensitive use.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/21u35DIsi6L1.jpg?v=1724914530",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-essence-sachet-1-5ml",
      price: 1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-melting-collagen-eye-film",
      name: "mixsoon Melting Collagen Eye Film",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Melting Collagen Eye Film is a specialized 5-day home care treatment designed to rejuvenate the delicate under-eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_f5de6671-5584-4067-a183-f3b662dca6f0.jpg?v=1721893246",
      officialUrl: "https://mixsoon.us/products/mixsoon-melting-collagen-eye-film",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-melting-collagen-neck-and-forehead-film",
      name: "mixsoon Melting Collagen Neck & Forehead Film",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Melting Collagen Neck & Forehead Film is a 5-day intensive care treatment designed to target the neck and forehead areas.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_83431288-ef25-48de-8e5e-7ce6eb286301.jpg?v=1721893087",
      officialUrl: "https://mixsoon.us/products/mixsoon-melting-collagen-neck-forehead-film",
      price: 39,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-vitamin-c-powder-stick-1-pack-0-1g-10ea",
      name: "mixsoon Vitamin C Powder Stick 1 Pack (0.1g * 10ea)",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [
          "vitamin_c"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: vitamin C family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Vitamin C Powder is a pure, potent skincare booster designed to enhance your daily routine.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/C____1_4d499331-85f4-4495-bb0b-ad4d7be24dcf.jpg?v=1721892901",
      officialUrl: "https://mixsoon.us/products/mixsoon-vitamin-c-powder-stick-10ea",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "mixsoon-collagen-powder-stick-1pack-0-1g-10ea",
      name: "mixsoon Collagen Powder Stick 1PACK(0.1g * 10ea)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Collagen Powder is a concentrated skincare booster designed to restore firmness, elasticity, and hydration to tired or aging skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_fb19f6d7-3c9e-4b1c-80bf-1aad0be18ff1.jpg?v=1721892769",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-powder-stick-10ea",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "mixsoon-collagen-hydrogel-eye-patch",
      name: "mixsoon Collagen Hydrogel Eye Patch",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Collagen Hydrogel Eye Patch is a targeted treatment designed to firm, brighten, and hydrate the delicate eye area.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_701088f8-0d29-4ccf-8458-b80758d75009.jpg?v=1739930360",
      officialUrl: "https://mixsoon.us/products/mixsoon-collagen-hydrogel-eye-patch",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-cica-hyal-hydrogel-eye-patch",
      name: "mixsoon Cica-Hyal Hydrogel Eye Patch",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [
          "hyaluronic_acid",
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family, centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Cica-Hyal Hydrogel Eye Patch is a rejuvenating treatment designed to hydrate, soothe, and brighten the delicate skin around the eyes.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_a2849ede-6058-49db-b561-08667f58acfc.jpg?v=1721889536",
      officialUrl: "https://mixsoon.us/products/mixsoon-cica-hyal-hydrogel-eye-patch",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-bean-hydrogel-eye-patch",
      name: "mixsoon Bean Hydrogel Eye Patch",
      brand: "Mixsoon",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bean Hydrogel Eye Patch is a nourishing treatment designed to rejuvenate the delicate skin around the eyes.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_3fd04bb5-7329-4e36-b63e-53f474a96b48.jpg?v=1721888973",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-hydrogel-eye-patch",
      price: 30,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-vegan-plumping-glow-balm",
      name: "mixsoon Vegan Plumping Glow Balm",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan mixsoon Vegan Plumping Glow Balm delivers plump, hydrated, and naturally vibrant lips in one smooth swipe.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/0_eed39071-c521-4881-ab98-d27bf648fc75.jpg?v=1721888801",
      officialUrl: "https://mixsoon.us/products/mixsoon-vegan-plumping-glow-balm",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-niacinamide-powder-stick-1pack-0-1g-10ea",
      name: "mixsoon Niacinamide Powder Stick 1PACK(0.1g * 10ea)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Niacinamide Powder is a high-purity, water-free formula designed to target dark spots, uneven skin tone, and dullness.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/97c9ca6c264e60280fa7d0961e7924f4.png?v=1783412488",
      officialUrl: "https://mixsoon.us/products/mixsoon-niacinamide-powder-stick-10ea",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "aging"
      ]
  },
  {
      slug: "mixsoon-amino-powder-8g",
      name: "mixsoon Amino Powder 8g",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Amino Acid Powder is a premium skincare powder designed to nourish and hydrate the skin with 100% pure L-Serine, a naturally occurring amino acid.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_0d783ad5-535a-4f5e-92a1-fd233348936d.jpg?v=1714099060",
      officialUrl: "https://mixsoon.us/products/mixsoon-amino-powder-8g",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness"
      ]
  },
  {
      slug: "mixsoon-soybean-milk-serum-50ml",
      name: "mixsoon Soybean Milk Serum 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Soybean Milk Serum is an intensive, vegan-friendly serum designed to hydrate and firm the skin, leaving it with a smooth, radiant glow.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/b4d840972dc49774537b0d48ddd11168.png?v=1782357449",
      officialUrl: "https://mixsoon.us/products/mixsoon-soybean-milk-serum-50ml",
      price: 38,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "mixsoon-premium-galactomyces-serum-50ml",
      name: "mixsoon Premium Galactomyces Serum 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Bring back radiance and clarity with the Premium Galactomyces Serum, powered by Galactomyces Ferment Filtrate.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/2_4185d499-6fe7-43cc-b533-5bf9d69dd2f5.jpg?v=1713268271",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-galactomyces-serum-50ml",
      price: 62,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-premium-centella-asiatica-serum-50ml",
      name: "mixsoon Premium Centella Asiatica Serum 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Soothe and protect sensitive skin with mixsoon Premium Centella Asiatica Serum.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/2_3e162a0f-00ce-4410-bbd8-117f47699875.jpg?v=1713268168",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-centella-asiatica-serum-50ml",
      price: 62,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-premium-bifida-serum-50ml",
      name: "mixsoon Premium Bifida Serum 50ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Strengthen and restore your skin's resilience with the mixsoon Premium Bifida Serum, a highly concentrated treatment formulated to repair, firm, and revitalize the skin from within.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/2_b7bc2563-d0f7-4ac8-9199-5e9bdeda94d8.jpg?v=1713268186",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-bifida-serum-50ml",
      price: 62,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-bean-toner-pad",
      name: "mixsoon Bean Toner Pad",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bean Toner Pad is made with a soft, plant-based cotton material that gently glides across the skin without irritation.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/b86042891b0ffd284767ca29c2cc30e6.png?v=1783408387",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-galactomyces-toner-pad",
      name: "mixsoon Galactomyces Toner Pad",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Galactomyces Toner Pad is the ultimate solution for achieving radiant, smooth, and translucent skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/3e863b3cc6367c3782c95dc727a8d842.png?v=1783408519",
      officialUrl: "https://mixsoon.us/products/mixsoon-galactomyces-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-centella-toner-pad",
      name: "mixsoon Centella Toner Pad",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Centella Toner Pad offers fast and effective calming care, ideal for sensitive or irritated skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/ac44f2136e547fa9e9b72609bad40e92.png?v=1783408251",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bifida-toner-pad",
      name: "mixsoon Bifida Toner Pad",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Bifida Toner Pad is a powerful, hydrating solution designed to strengthen and protect your skin's barrier.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/255605c47f5305a46766d5928841bc07.png?v=1783408282",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-toner-pad",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-bean-toner-300ml",
      name: "mixsoon Bean Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • Alcohol-Free • Fragrance-Free mixsoon Bean Toner is a deeply hydrating and nutrient-rich toner formulated with mixsoon's signature fermented soybean extract from Paju Jangdan beans.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/BacktoSchool_______2_b0a8a7da-229b-4f51-929f-1e113d00bafa.jpg?v=1724656797",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-toner-300ml",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "mixsoon-premium-galactomyces-cream-50ml",
      name: "mixsoon Premium Galactomyces Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan Fragrance-Free • Alcohol-Free • Barrier Cream • Sensitive Skin Safe mixsoon Premium Galactomyces Cream is a luxurious skin-brightening solution designed to restore clarity, vitality, and radiance to dull or uneven skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main.jpg?v=1709001829",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-galactomyces-cream-50ml",
      price: 58,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-premium-centella-asiatica-cream-50ml",
      name: "mixsoon Premium Centella Asiatica Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • Fragrance-Free • Alcohol-Free • Sensitive Skin Safe • Cica Barrier Repair Cream Soothe, hydrate, and protect your skin with mixsoon Premium Centella Asiatica Moisture Cream, specially formulated for sensitive and easily irritated skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_076e7d74-14e3-4079-9ca4-456e141cfd17.jpg?v=1709001877",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-centella-asiatica-cream-50ml",
      price: 58,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "mixsoon-premium-bifida-cream-50ml",
      name: "mixsoon Premium Bifida Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • Fragrance-Free • Alcohol-Free • Sensitive Skin Safe • Barrier + Repair Cream Revitalize your skin's resilience with mixsoon Premium Bifida Elasticity Cream, a luxurious wrinkle-care solution designed to restore firmness, refine pores, and strengthen th",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_b9e80408-5448-4e97-94f0-606aaf134478.jpg?v=1709001708",
      officialUrl: "https://mixsoon.us/products/mixsoon-premium-bifida-cream-50ml",
      price: 58,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-bifida-cream-60ml",
      name: "mixsoon Bifida Cream 60ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • Alcohol-Free • Fragrance-Free mixsoon Bifida Cream is a hydrating shield cream formulated with BIFIDA Ferment Lysate to restore and strengthen the skin's barrier.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_071ff754-4a4c-45ef-bd00-eed5b3eac2a9.jpg?v=1723440422",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-cream-60ml",
      price: 35,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-bean-cleansing-oil-195ml",
      name: "mixsoon Bean Cleansing Oil 195ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Discover the refreshing power of the mixsoon Bean Cleansing Oil, a lightweight yet deeply effective cleansing oil designed to remove makeup, sunscreen, and impurities without leaving behind any greasy residue.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/da878369109358208ad525b900960d62.jpg?v=1781491008",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-cleansing-oil-195ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-skin-round-pads-240ea",
      name: "mixsoon Skin Round Pads (240ea)",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Skin Round Pads are made with natural, skin-friendly materials, suitable for all skin types.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonSkin-PackRoundPads_240ea.png?v=1690433551",
      officialUrl: "https://mixsoon.us/products/mixsoon-skin-pack-round-pads-240ea",
      price: 12,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-blending-case",
      name: "mixsoon Blending Case",
      brand: "Mixsoon",
      category: "serum",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A practical container that lets you soak cotton pads with essence or toner for full absorption without waste.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 1-3 drops over face and neck",
          "Follow with moisturizer and SPF in the morning"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/MixsoonBlendingCase.png?v=1690433578",
      officialUrl: "https://mixsoon.us/products/mixsoon-blending-case",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-centella-cleansing-water-300ml",
      name: "mixsoon Centella Cleansing Water 300ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Centella Cleansing Water is a gentle yet effective cleansing solution designed to remove impurities while soothing and hydrating the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_c0f21b7b-c0ce-4877-ac20-8e6aca937c2b.jpg?v=1710394702",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-cleansing-water-300ml",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bifida-toner-300ml",
      name: "mixsoon Bifida Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The mixsoon Bifida Toner is a refreshing, two-way toner designed to hydrate and strengthen your skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/BacktoSchool_______2_6050c383-4837-4b40-987c-d511592e02ba.jpg?v=1767832860",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-toner-300ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-morning-fog-mist-case",
      name: "mixsoon Morning Fog Mist Case",
      brand: "Mixsoon",
      category: "mist",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Morning Fog Mist Case is a sleek pump sprayer that creates an ultra-fine mist, making it easy to apply toners and essences evenly across your face.",
      usageSteps: [
          "Mist over face as needed",
          "Keep eyes closed while spraying",
          "Use before or after makeup for added comfort"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/50ml.jpg?v=1747817864",
      officialUrl: "https://mixsoon.us/products/mixsoon-morning-fog-mist-case",
      price: 5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-galactomyces-toner-300ml",
      name: "mixsoon Galactomyces Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 4~7 • Alcohol-Free • Fragrance-Free • HRIPT Tested mixsoon Galactomyces Toner is a gentle yet effective skincare essential designed to refine and hydrate your skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/1_63c5c768-8111-4365-89c1-ba3868ce3525.jpg?v=1724656725",
      officialUrl: "https://mixsoon.us/products/mixsoon-galactomyces-toner-300ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-lotus-flower-essence-100ml",
      name: "mixsoon Lotus Flower Essence 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "pH 4~7 • Vegan • Alcohol-Free • Fragrance-Free mixsoon Lotus Flower Essence is a lightweight, deeply hydrating essence made with pure lotus extract.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_e7cf7319-b281-4580-823d-516965558131.jpg?v=1724656474",
      officialUrl: "https://mixsoon.us/products/mixsoon-lotus-flower-essence-50ml",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "mixsoon-centella-asiatica-toner-300ml",
      name: "mixsoon Centella Asiatica Toner 300ml",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 4~7 • Alcohol-Free • Safety-Tested for Children • HRIPT Tested Revitalize and restore balance to your skin with the mixsoon Centella Asiatica Toner , a soothing and moisturizing formula that delivers instant hydration from the very first step.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/BacktoSchool_______2_6738e470-1aa5-4b77-8733-0404960cc788.jpg?v=1739930362",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-toner-300ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-glacier-water-hyaluronic-acid-serum-300ml",
      name: "mixsoon Glacier Water Hyaluronic Acid Serum 300ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~8 • HRIPT Tested • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: The mixsoon Glacier Water Hyaluronic Acid Serum offers an invigorating burst of hydration designed to restore and rejuvenate dry, tired skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/300ml___1_4d05e0a2-ad7d-4dff-a7fb-9941b7393b23.jpg?v=1710388577",
      officialUrl: "https://mixsoon.us/products/mixsoon-glacier-water-hyaluronic-acid-serum-300ml",
      price: 29,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-spot-clean-care-patch",
      name: "mixsoon Spot Clean Care Patch",
      brand: "Mixsoon",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Spot Cleancare Patch is a fast and hygienic solution for soothing and protecting troubled areas.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/611Ac1iiH8L._SX466.jpg?v=1775105079",
      officialUrl: "https://mixsoon.us/products/mixsoon-spot-clean-care-patch",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-vegan-melting-lip-balm-dry-rose",
      name: "mixsoon Vegan Melting Lip Balm (Dry Rose)",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan The mixsoon Vegan Melting Lip Balm is a nourishing, plant-based lip treatment designed to revive and protect sensitive lips.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Melting_lip_balm.png?v=1736140103",
      officialUrl: "https://mixsoon.us/products/mixsoon-vegan-melting-lip-balm-dry-rose",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-bifida-face-mask-5ea",
      name: "mixsoon Bifida Face Mask 5ea",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bifida Mask Pack is a revitalizing sheet mask designed to strengthen and hydrate your skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/bifida_mask_pack.jpg?v=1763434665",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-face-mask-5ea",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-soybean-milk-pad-10ea",
      name: "mixsoon Soybean Milk Pad (10ea)",
      brand: "Mixsoon",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 5~6 • HRIPT Tested • Alcohol-Free mixsoon Soybean Milk Pads combine the enriching effects of fermented beans with a rich blend of skin-nourishing ingredients to provide intensive hydration and skin care.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/52f1a0139a4e89c1faf07642cc5763d5.jpg?v=1766390260",
      officialUrl: "https://mixsoon.us/products/mixsoon-soybean-milk-pad-10ea",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne",
          "aging"
      ]
  },
  {
      slug: "mixsoon-vegan-melting-lip-balm-clear",
      name: "mixsoon Vegan Melting Lip Balm (Clear)",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • Safety-Tested for Children The mixsoon Vegan Melting Lip Balm is a nourishing, plant-based lip treatment designed to revive and protect sensitive lips.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Meltinglipbalmclear___LowCapac.png?v=1736139775",
      officialUrl: "https://mixsoon.us/products/mixsoon-vegan-melting-lip-balm-clear",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "mixsoon-centella-cleansing-foam-150ml",
      name: "mixsoon Centella Cleansing Foam 150ml",
      brand: "Mixsoon",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon's Centella Cleansing Foam is a gentle yet effective cleanser that refreshes and soothes your skin with the calming power of Centella Asiatica.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/Centella_cleansing_foam_170038ad-56c9-407d-a0c4-6fbcc220701a.png?v=1775108055",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-cleansing-foam-150ml",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-centella-face-mask-1pack-5ea",
      name: "mixsoon Centella Face Mask 1PACK (5ea)",
      brand: "Mixsoon",
      category: "mask",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Centella Mask Pack is a deeply hydrating and calming sheet mask designed to soothe tired, sensitive, or redness-prone skin.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/mixsoon_Centella_Face_Mask.jpg?v=1763434699",
      officialUrl: "https://mixsoon.us/products/mixsoon-centella-face-mask-5ea",
      price: 20,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "mixsoon-bean-cream-50ml",
      name: "mixsoon Bean Cream 50ml",
      brand: "Mixsoon",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon's Bean Cream combines powerful natural ingredients, effective hydration, and barrier protection in a lightweight, clean formula that's perfect for daily use.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/4463b72e5bb6c168a0456422f803c192.jpg?v=1781491522",
      officialUrl: "https://mixsoon.us/products/mixsoon-bean-cream-50ml",
      price: 35,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "mixsoon-galactomyces-ferment-essence-100ml",
      name: "mixsoon Galactomyces Ferment Essence 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vegan • pH 4~7 • HRIPT Tested • Safety-Tested for Children • Alcohol-Free • Fragrance-Free Benefits: Mixsoon Galactomyces Ferment Essence is a luxurious, vegan formula that deeply hydrates and enhances skin radiance.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_46f3cbe8-5db1-44d2-b94c-c140f09a20c9.jpg?v=1724656449",
      officialUrl: "https://mixsoon.us/products/mixsoon-galactomyces-essence-100ml",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "mixsoon-bifida-ferment-essence-100ml",
      name: "mixsoon Bifida Ferment Essence 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "mixsoon Bifida Ferment Essence is a hydrating and skin-rejuvenating essence that harnesses the power of Bifida Ferment Lysate, a probiotic-rich ingredient known for strengthening the skin's natural barrier, soothing irritation, and providing deep hydration.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/main_567c0ba5-9250-4fd4-8b38-96426dbbd351.jpg?v=1724656430",
      officialUrl: "https://mixsoon.us/products/mixsoon-bifida-essence-100ml",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "mixsoon-soondy-centella-asiatica-essence-100ml",
      name: "mixsoon Soondy Centella Asiatica Essence 100ml",
      brand: "Mixsoon",
      category: "essence",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Soondy Centella Asiatica Essence is a soothing and restorative essence that harnesses the power of Centella Asiatica, also known as Cica, to promote healthy, hydrated skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0797/3299/8445/files/9022a705161ff42b7879d88f1fd6d0e8.png?v=1782356563",
      officialUrl: "https://mixsoon.us/products/mixsoon-soondy-centella-essence-100ml",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-vita-niacinamide-glow-capsule-cream",
      name: "Vita Niacinamide Glow Capsule Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Vita Niacinamide Glow Capsule Cream delivers lightweight hydration and visible radiance with a refreshing, glow-boosting finish.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/250626_roundlab_vita_0226_fin5.webp?v=1778194562",
      officialUrl: "https://roundlab.com/products/vita-niacinamide-glow-capsule-cream",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-pine-cica-deep-pore-cleansing-oil-200ml",
      name: "Pine Cica Deep Pore Cleansing Oil 200ml",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Cica Deep Pore Cleaning Oil is a gentle yet effective cleansing oil designed to dissolve makeup, sunscreen, and pore impurities while maintaining skin comfort.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pinecleansingoil5.png?v=1772853085",
      officialUrl: "https://roundlab.com/products/pine-cica-deep-pore-cleansing-oil-200ml",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-shampoo",
      name: "Pine Calming Cica Shampoo",
      brand: "Round Lab",
      category: "body",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Cica Calming Shampoo gently cleanses the scalp while helping calm irritation and maintain a fresh, balanced feel.",
      usageSteps: [
          "Apply to clean body skin",
          "Massage until absorbed",
          "Use daily or as needed"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/PINECALMINGCICASHAMPOO5.webp?v=1773943696",
      officialUrl: "https://roundlab.com/products/pine-calming-cica-shampoo",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-cica-deep-pore-clay-mask-cleanser",
      name: "Pine Cica Deep Pore Clay Mask Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Cica Deep Pore Clay Mask Cleanser is a dual-action cleanser designed to help purify pores while maintaining skin comfort.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine_cica_pore_mask_cleanser_2.png?v=1773348901",
      officialUrl: "https://roundlab.com/products/pine-cica-deep-pore-clay-mask-cleanser",
      price: 21,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-hand-cream",
      name: "Birch Moisturizing Hand Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Juice Moisturizing Hand Cream delivers lightweight yet lasting hydration to dry, rough hands.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch_hand_cream_3.webp?v=1776117448",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-hand-cream",
      price: 8.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-juice-moisturizing-peeling-cleansing-oil",
      name: "Birch Juice Moisturizing Peeling Cleansing Oil",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Moisturizing Peeling Cleansing Oil is a gentle oil cleanser designed to dissolve makeup, sunscreen, and impurities while helping maintain skin hydration.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch_cleansing_oil.png?v=1773347308",
      officialUrl: "https://roundlab.com/products/birch-juice-moisturizing-peeling-cleansing-oil",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-eye-cream-30ml",
      name: "Camellia Deep Collagen Eye Cream 30ml",
      brand: "Round Lab",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Camellia Deep Collagen Eye Cream is designed to nourish and hydrate the delicate under-eye area while helping improve the appearance of smoother, more supple skin.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/eye_cream2.png?v=1774894005",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-eye-cream-30ml",
      price: 30,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-milky-pdrn-toner-150ml",
      name: "Camellia Deep Collagen Milky PDRN Toner 150ml",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Camellia Deep Collagen Milky PDRN Toner delivers nourishing hydration and elasticity care in a comforting milky formula.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Camellia_PDRN_Toner_150ML.png?v=1772853067",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-milky-pdrn-toner-150ml",
      price: 29,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "aging"
      ]
  },
  {
      slug: "round-lab-pine-cica-calming-scalp-tonic",
      name: "Pine Cica Calming Scalp Tonic",
      brand: "Round Lab",
      category: "body",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Description The Round Lab Pine Cica Calming Scalp Tonic is a refreshing, lightweight scalp mist that helps soothe irritation, balance excess oil, and support a healthier scalp environment.",
      usageSteps: [
          "Apply to clean body skin",
          "Massage until absorbed",
          "Use daily or as needed"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Pine_Cica_Tonic_3.webp?v=1772852559",
      officialUrl: "https://roundlab.com/products/pine-cica-calming-scalp-tonic",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-eye-balm",
      name: "Birch Moisturizing Eye Balm",
      brand: "Round Lab",
      category: "eye",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Eye Balm is a gentle eye balm infused with Inje's Birch Tree Sap to hydrate and refresh the delicate skin around the eyes.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_eye_balm_3.webp?v=1772852729",
      officialUrl: "https://roundlab.com/products/round-lab-birch-juice-moisturizing-eye-balm-10g",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-cleansing-balm-50ml",
      name: "1025 Dokdo Cleansing Balm 50ml",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Description The 1025 Dokdo Cleansing Balm is a gentle, cleansing balm that transforms from a solid balm to a silky oil and finally into a soft, milky emulsion when water is added.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Dokdo_Cleansing_Balm_50ml.webp?v=1772852500",
      officialUrl: "https://roundlab.com/products/1025-dokdo-cleansing-balm-50ml",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-intensive-cream",
      name: "Birch Moisturizing Intensive Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Intensive Cream delivers deep, lasting hydration with a cushiony, replenishing texture that comforts dry and weakened skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/62.webp?v=1772852637",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-intensive-cream",
      price: 40,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-toner",
      name: "Soybean Panthenol Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Soybean Panthenol Toner is a deeply soothing and barrier-supporting toner that replenishes hydration while strengthening the skin's natural defenses.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Soybean_Panthenol_Toner.png?v=1772852432",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-toner",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-water-gel-mask-sheet",
      name: "1025 Dokdo Water Gel Mask Sheet",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A dense water gel mask that wakes up tired skin with the power of a highly adhered gel sheet.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-water-gel-mask-sheet-round-lab-1.jpg?v=1772849523",
      officialUrl: "https://roundlab.com/products/1025-dokdo-mask-sheet",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-double-gel-mask",
      name: "Birch Moisturizing Double Gel Mask",
      brand: "Round Lab",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Moisturizing Double Gel Mask delivers layered hydration and soothing comfort in a cooling hydrogel sheet.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Gel_Mask23.webp?v=1772852351",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-gel-mask",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-jelly-mask-cleanser",
      name: "Camellia Deep Collagen Jelly Mask Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Camellia Collagen Jelly Mask Cleanser is a dual-action formula that works as both a refreshing daily cleanser and a nourishing mask.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Collagen_Jelly_Mask_Cleanser33.png?v=1772852365",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-jelly-mask-cleanser",
      price: 21,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-lip-balm",
      name: "Birch Moisturizing Lip Balm",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Round Lab Birch Juice Moisturizing Lip Balm - Cushiony, Everyday Lip Hydration Experience long-lasting, comfortable moisture with Round Lab's melting lip balm, infused with birch sap from Inje to help relieve dryness and smooth the look of lip lines.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Lip_Balm26.webp?v=1772852360",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-lip-balm",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-cleanser",
      name: "Soybean Panthenol Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Description The Soybean Panthenol Low pH Cleanser is a gentle foaming cleanser that purifies skin without stripping away essential moisture.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Soybean_Panthenol_Cleanser_main.jpg?v=1772852299",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-cleanser",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-cleansing-oil",
      name: "Soybean Panthenol Cleansing Oil",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Description The Soybean Panthenol Cleansing Oil is a nourishing, barrier-supporting cleanser designed to effectively remove makeup, sunscreen, and daily impurities while keeping skin hydrated and comfortable.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/panthenol_claensing_oil_4.png?v=1772852303",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-cleansing-oil",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "barrier"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-v-lifting-gel-mask",
      name: "Camellia Deep Collagen V Lifting Gel Mask",
      brand: "Round Lab",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Sculpt, cool, and revive-one mask does it all.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Collagen_Vline_Mask_2.png?v=1772852289",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-v-lifting-gel-mask",
      price: 42.99,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "round-lab-deal-birch-mild-up-sunscreen-uvlock-spf-50-broad-spectrum",
      name: "[DEAL] Birch Mild-Up Sunscreen UVLock SPF 50+ Broad Spectrum",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A lightweight mineral sunscreen that offers broad-spectrum UV protection while hydrating and soothing the skin.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Juice_Mild-Up_Sunscreen_UVLock_SPF_50_Broad_Spectrum_Round_Lab_2.png?v=1772850750",
      officialUrl: "https://roundlab.com/products/deal-birch-mild-up-sunscreen-uvlock-spf-50-broad-spectrum",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-firming-ampoule",
      name: "Camellia Deep Collagen Firming Ampoule",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Camellia Deep Collagen Firming Ampoule 30ml The Camellia Deep Collagen Firming Ampoule deeply nourishes and firms the skin with a powerful blend of camellia flower extract and hydrolyzed collagen.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/CAMELLIA_AMPOULE_6_1.jpg?v=1772850956",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-firming-ampoule",
      price: 32,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-firming-cream",
      name: "Camellia Deep Collagen Firming Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Camellia Deep Collagen Firming Cream 50ml Experience the power of Jeju Camellia with the Camellia Deep Collagen Firming Cream.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/CAMELLIACREAM_2.jpg?v=1772850991",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-firming-cream",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness",
          "aging"
      ]
  },
  {
      slug: "round-lab-vita-niacinamide-dark-spot-serum-mask",
      name: "Vita Niacinamide Dark Spot Serum Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Vita Niacinamide Dark Spot Serum Mask A skin-brightening sheet mask infused with a potent blend of niacinamide and vitamin-rich ingredients to target dark spots and enhance radiance.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Vita_Mask_Square.jpg?v=1772851045",
      officialUrl: "https://roundlab.com/products/vita-niacinamide-dark-spot-mask",
      price: 5.3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "round-lab-vita-niacinamide-dark-spot-cream",
      name: "Vita Niacinamide Dark Spot Cream",
      brand: "Round Lab",
      category: "spot",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Vita Niacinamide Dark Spot Cream is designed to improve skin tone, enhance radiance, and promote a smoother, more even complexion.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/240328_roundlab_0193_re2.jpg?v=1772851037",
      officialUrl: "https://roundlab.com/products/vita-niacinamide-dark-spot-cream",
      price: 33,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "round-lab-deal-birch-moisturizing-sunscreen-uvlock-spf-45-broad-spectrum",
      name: "[DEAL] Birch Moisturizing Sunscreen UVLock SPF 45+ Broad Spectrum",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A lightweight sunscreen that offers broad-spectrum UV protection while hydrating, brightening, and soothing the skin.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/BIRCH_JUICE_MOISTURIZING_UVLOCK3_Large_10126e46-dfcc-4cd5-970c-146d4be65989.webp?v=1772852134",
      officialUrl: "https://roundlab.com/products/deal-birch-moisturizing-sunscreen-uvlock-spf-45-broad-spectrum",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-cream-double-pack",
      name: "Birch Moisturizing Cream Double Pack",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Moisturizing Cream is a lightweight yet deeply hydrating moisturizer designed to soothe, strengthen the skin barrier, and lock in moisture.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Untitled_design_4_7bcc2eb0-0bc8-496d-bcd4-c1a85ea9005d.png?v=1772851186",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-cream-2-pack",
      price: 72,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-deal-dokdo-cleanser-double-2-pack",
      name: "[DEAL] Dokdo Cleanser Double 2-Pack",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This multi-award winning cleanser offers a low acidic pH(5.0-6.0) foamy and creamy cleansing, and gently purifies and removes excess sebum and impurities while keeping a moisture balance of the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/image_41.png?v=1772851684",
      officialUrl: "https://roundlab.com/products/deal-dokdo-cleanser-double-2-pack",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-camellia-deep-collagen-firming-gel-mask",
      name: "Camellia Deep Collagen Firming Gel Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A hydrogel mask that delivers deep hydration, firming, and elasticity care to the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/240813_roundlab_mask_0311__2.jpg?v=1772851164",
      officialUrl: "https://roundlab.com/products/camellia-deep-collagen-firming-gel-mask",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "aging"
      ]
  },
  {
      slug: "round-lab-birch-mild-up-sunscreen-uvlock-spf-50-broad-spectrum",
      name: "Birch Mild-Up Sunscreen UVLock SPF 50+ Broad Spectrum",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Round Lab Mineral Sunscreen - Gentle, Effective Physical UV Protection Experience superior sun protection with Round Lab's lightweight mineral sunscreen, specifically formulated for sensitive, dry, normal, and combination skin.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Juice_Mild-Up_Sunscreen_UVLock_SPF_50_Broad_Spectrum_Round_Lab_2.png?v=1772850750",
      officialUrl: "https://roundlab.com/products/birch-juice-mild-up-uvlock-sunscreen",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-cleanser",
      name: "Birch Moisturizing Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Unbeatable No.1 Foam Cleanser.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch-moisturizing-cleanser-round-lab-1.png?v=1772849387",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-cleanser",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-juice-moisturizing-ampoule",
      name: "Birch Juice Moisturizing Ampoule",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Juice Ampoule provides 7-second absorption and 3-day moisture retention.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Ampoule_new.webp?v=1774308060",
      officialUrl: "https://roundlab.com/products/birch-juice-ampoule",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-dokdo-cleansing-water",
      name: "Dokdo Cleansing Water",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Dokdo cleansing water gently removes impurities while maintaining skin's moisture balance.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Dokdo_Cleansing_Water.webp?v=1772852478",
      officialUrl: "https://roundlab.com/products/dokdo-cleansing-water",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-sunscreen-uvlock-spf-45-broad-spectrum",
      name: "Birch Moisturizing Sunscreen UVLock SPF 45+ Broad Spectrum",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Korea's #1 sunscreen 20M+ sold worldwide.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/BIRCH_JUICE_MOISTURIZING_UVLOCK3_Large_10126e46-dfcc-4cd5-970c-146d4be65989.webp?v=1772852134",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-uv-sunscreen",
      price: 24.99,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-toner-pad",
      name: "Pine Calming Cica Toner Pad",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Calming Cica Toner pad smooths rough skin texture with just one sheet, gently removing dead skin cells and waste products that block your pores.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine-calming-cica-pad-round-lab-1.png?v=1772849576",
      officialUrl: "https://roundlab.com/products/pine-tree-cica-pad",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-sunscreen-uvlock-spf-45-broad-spectrum-subscription",
      name: "Birch Moisturizing Sunscreen UVLock SPF 45+ Broad Spectrum [Subscription]",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A lightweight sunscreen that offers broad-spectrum UV protection while hydrating, brightening, and soothing the skin.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/BIRCH_JUICE_MOISTURIZING_UVLOCK3_Large_10126e46-dfcc-4cd5-970c-146d4be65989.webp?v=1772852134",
      officialUrl: "https://roundlab.com/products/round-lab-birch-moisturizing-sunscreen-spf-50-pa",
      price: 24.99,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-body-wash",
      name: "Pine Calming Cica Body Wash",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Description Round Lab's Pine Calming Cica Body Wash is a low-pH gel cleanser created from sustainably harvested Pinus densiflora (red pine) leaves, extracted at low temperature to help preserve their naturally calming properties.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/7_7970bdfb-d259-40bc-b360-3a686e48a8d3.png?v=1772850581",
      officialUrl: "https://roundlab.com/products/pine-cica-calming-body-wash",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-juice-cleansing-pad",
      name: "Birch Juice Cleansing Pad",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The birch juice cleansing pad harnesses the rejuvenating sap extracted from Inje birch trees with its densely woven grid pattern enabling the pad to absorb and retain a generous concentration of this precious essence.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/3_ed5badc4-8dde-4566-a06b-1f74044714d7.png?v=1772850575",
      officialUrl: "https://roundlab.com/products/birch-juice-cleansing-pad",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-sheet-mask",
      name: "Soybean Panthenol Sheet Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Renew your skin with this deeply hydrating microfiber sheet mask infused with nourishing black bean essence.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/ROUND_LAB_SOYBEAN_PANTHENOL_MASK_2.jpg?v=1772852411",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-mask",
      price: 3.99,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "barrier",
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-lotion",
      name: "Pine Calming Cica Lotion",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Cica Lotion envelops skin in soothing pine and cica to hydrate, calm irritation, and restore a healthy glow.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/3_6c17196d-6319-4cee-a2b6-9c7d606ca995.png?v=1772850343",
      officialUrl: "https://roundlab.com/products/pine-calming-cica-lotion",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-cream",
      name: "Soybean Panthenol Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Experience deep, long-lasting hydration for 120 hours with this black soybean cream that strengthens the skin barrier.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/12.png?v=1772850358",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-cream",
      price: 38,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "barrier"
      ]
  },
  {
      slug: "round-lab-soybean-panthenol-ampoule",
      name: "Soybean Panthenol Ampoule",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Replenish and restore your skin's moisture barrier with this powerful black soybean serum.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/5_1291eeac-cfd9-46c1-9b13-414350ca01c3.png?v=1772850347",
      officialUrl: "https://roundlab.com/products/soybean-panthenol-ampoule",
      price: 34,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "barrier",
          "redness"
      ]
  },
  {
      slug: "round-lab-deal-1025-dokdo-cleanser",
      name: "[DEAL] 1025 Dokdo Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A low acidic pH(5.0-6.0) foamy and creamy cleanser gently purifies and removes excess sebum and impurities while keeping a moisture balance of the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-cleanser-round-lab-3_667c8548-20d9-49c1-9035-4beb0ccc90b3.jpg?v=1772850409",
      officialUrl: "https://roundlab.com/products/1025-dokdo-cleanser-deal",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-deal-1025-dokdo-toner",
      name: "[DEAL] 1025 Dokdo Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Voted for the Best Toner in Toner Category in South Korea for three consecutive years Presenting a special toner that exfoliates dead skin cells while filling up the skin with moisture.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-toner-round-lab-1_b70f78ac-e80f-4f05-b942-3ff25b4e049e.jpg?v=1772850423",
      officialUrl: "https://roundlab.com/products/1025-dokdo-toner-deal",
      price: 10,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-deal-birch-moisturizing-cleanser",
      name: "[DEAL] Birch Moisturizing Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Unbeatable No.1 Foam Cleanser.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch-moisturizing-cleanser-round-lab-1_4550fd52-3767-47ca-8b35-35aece5869fe.png?v=1772850435",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-cleanser-deal",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-toner-pad",
      name: "1025 Dokdo Toner Pad",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This Dokdo Toner Pad is made with concentrated minerals from Ulleungdo's deep seawater, soaked in a relaxing cotton pad.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/2_40ce13c0-04f0-4259-9333-1a1f4a2e62e1.png?v=1772850278",
      officialUrl: "https://roundlab.com/products/1025-dokdo-pad",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-soothing-gel",
      name: "Birch Moisturizing Soothing Gel",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Birch Soothing Gel is a non-sticky, water jelly formula.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Soothing_Gel.jpg?v=1776122688",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-soothing-gel",
      price: 14,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-peeling-gel",
      name: "1025 Dokdo Peeling Gel",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "If your daily skincare absorption speed is slowing down, it's time for periodic exfoliation!",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/27.png?v=1772850062",
      officialUrl: "https://roundlab.com/products/1025-dokdo-peeling-gel",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-cleanser",
      name: "Pine Calming Cica Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This cleanser has a dense foam bubble texture help to cleanse the skin refreshingly and cleanly by smoothly filling the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/PCC4.png?v=1772849975",
      officialUrl: "https://roundlab.com/products/pine-calming-cica-cleanser",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-cleansing-gel",
      name: "1025 Dokdo Cleansing Gel",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Dokdo Cleansing Gel features a low pH formula and plant-derived ingredients, creating dense foams that effectively remove skin waste.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/DCO1_4b49a819-ead0-4d77-8bdf-3fd4e8ab9fb5.png?v=1772849982",
      officialUrl: "https://roundlab.com/products/1025-dokdo-cleansing-gel",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-sun-cushion-spf-50",
      name: "Birch Moisturizing Sun Cushion SPF 50+",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Birch Moisturizing Sun Cushion SPF50+ Hydrating Mineral Sunscreen in a Cushion Format Experience sun protection that soothes and hydrates.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Sun_Cushion___main.png?v=1772852345",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-sun-cushion",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-wash-off-mask",
      name: "Birch Moisturizing Wash Off Mask",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "When you have skin concerns such as dullness, excessive sebum, rough skin texture, and dehydration-related problems, it's time for the Birch Juice Wash Off Mask, full of moisture!",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch-moisturizing-wash-off-mask-round-lab-1.png?v=1772849727",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-wash-off-mask",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-toner",
      name: "Pine Calming Cica Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Calming Cica Toner is Immediate cooling, calms the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine-calming-cica-toner-round-lab-5.jpg?v=1772849751",
      officialUrl: "https://roundlab.com/products/pine-calming-cica-toner",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-sun-stick-spf-50",
      name: "Birch Moisturizing Sun Stick SPF 50+",
      brand: "Round Lab",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Birch Moisturizing Sunscreen Stick SPF 50+ A hydrating, lightweight sun stick for daily UV protection and skin comfort.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/New_Birch_sun_stick_3.png?v=1772851481",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-sun-stick",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-mugwort-calming-serum",
      name: "Mugwort Calming Serum",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This is a powerful mugwort-enriched soothing serum that rich in antioxidants to promote healing and skin hydration.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/mugwort-calming-serum-round-lab-1.png?v=1772849465",
      officialUrl: "https://roundlab.com/products/mugwort-calming-serum",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "round-lab-mugwort-calming-sheet-mask",
      name: "Mugwort Calming Sheet Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This mask is made with a pure cotton sheet mask soaked in clean, natural ingredients.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/mugwort-calming-sheet-mask-round-lab-1.png?v=1772849529",
      officialUrl: "https://roundlab.com/products/mugwort-calming-sheet-mask",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-ampoule",
      name: "Pine Calming Cica Ampoule",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Calming Cica Ampoule is an ampoule that with soft and watery spread-ability, quickly addressing skin concerns like hormonal breakouts, acne and rosacea that has become sensitive to external stimuli and improve irritated skin barrier.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine-calming-cica-ampoule-round-lab-1.png?v=1772849532",
      officialUrl: "https://roundlab.com/products/pine-tree-cica-care-ampoule",
      price: 25,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-sheet-mask",
      name: "Birch Moisturizing Sheet Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Birch Tree Moisturizing Mask is a water ampoule type mask that is packed with Birch Sap which maintains the skin's moisture balance, and Hyaluronic Acid.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch-moisturizing-sheet-mask-round-lab-1.png?v=1772849578",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-sheet-mask",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-mugwort-calming-cream",
      name: "Mugwort Calming Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A cream that makes the skin dewy and healthy with Sea Breeze Artemisa extract and Madecassoside, relieving and soothing the skin that has been irritated by stress and external environments.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/mugwort-calming-moisturizer-round-lab-1.png?v=1772849461",
      officialUrl: "https://roundlab.com/products/mugwort-calming-cream",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-cream",
      name: "Pine Calming Cica Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This gel type pine calming cream distributes softly, densely replaces moisture, and leaves a refreshing feel as soon as it touches the skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine-calming-cica-cream-round-lab-1.png?v=1772849583",
      officialUrl: "https://roundlab.com/products/pine-tree-cica-cream",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-serum",
      name: "Birch Moisturizing Serum",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Need extra moisture for your dull and dry skin Long-lasting moisture that sinks in as soon as it touches your skin for dewy and supple skin that looks incredible and feels even better.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Serum_2026.jpg?v=1776123015",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-serum",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-nourishing-cleanser",
      name: "Soybean Nourishing Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A Cleanser with a scrub foam texture that deep cleanses to get rid of waste underneath the skin, leaving your skin moisturized.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/soybean-nourishing-cleanser-round-lab-1.png?v=1772849633",
      officialUrl: "https://roundlab.com/products/soybean-nourishing-cleanser",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-toner",
      name: "Birch Moisturizing Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "An ampoule-like of toner which richly infused with Birch Extract forms a moisture barrier and Vitamin Hyaluronic Acid gives deep hydration.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Screenshot2026-04-13at4.27.42PM.png?v=1776122911",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-toner",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-mugwort-calming-toner",
      name: "Mugwort Calming Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Mugwort Calming Toner uses Mugwort extract to calm and heal irritated skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/mugwort-calming-toner-round-lab-1.png?v=1772849391",
      officialUrl: "https://roundlab.com/products/mugwort-calming-toner",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "round-lab-pine-calming-cica-sheet-mask",
      name: "Pine Calming Cica Sheet Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Pine Calming Cica Mask is innovated with a double wave sheet.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/pine-calming-cica-sheet-mask-round-lab-1.png?v=1772849582",
      officialUrl: "https://roundlab.com/products/pine-tree-cica-sheet-mask",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "round-lab-soybean-nourishing-cream",
      name: "Soybean Nourishing Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The intensive moisturizing cream type that is packed with the active ingredients of Black Soybeans and strong skincare ingredients of ceramide provides a soft nourishment care to the skin with zero stickiness Texture: Creamy Scent: Unscented Skin type: Dry, No",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/soybean-nourishing-cream-round-lab-1.png?v=1772849458",
      officialUrl: "https://roundlab.com/products/soybean-nourishing-cream",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-nourishing-serum",
      name: "Soybean Nourishing Serum",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A nourishing serum with 7 types of vitamin B ingredients obtained by fermenting lactobacillus derived from soymilk and soymilk fermentation filtrate to make the skin lively and moist.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/soybean-nourishing-serum-round-lab-1.png?v=1772849527",
      officialUrl: "https://roundlab.com/products/soybean-nourishing-serum",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-nourishing-sheet-mask",
      name: "Soybean Nourishing Sheet Mask",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A mask with a mixture of rich, active ingredients of Black Soybean Extract and Adenosine supply dense nourishment to the skin to make a firm complexion.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/soybean-nourishing-sheet-mask-round-lab-1.png?v=1772849525",
      officialUrl: "https://roundlab.com/products/soybean-nourishing-sheet-mask",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-soybean-nourishing-toner",
      name: "Soybean Nourishing Toner",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "This toner has a mixture of rich, active ingredients of Black Soybean Extract and Adenosine, supply dense nourishment to the skin to make a firm complexion.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Soybean_toner_concept_2.webp?v=1774557122",
      officialUrl: "https://roundlab.com/products/soybean-nourishing-toner",
      price: 27,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-mugwort-calming-cleanser",
      name: "Mugwort Calming Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A gentle cleanser with 4-CICA ingredients that makes the skin dewy and healthy by relieving and soothing the skin that has been irritated by stress and external environments Texture:Creamy Scent: Mugwort leaf extract, black tea extract, salvia oil Skin type: N",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/mugwort-calming-cleanser-round-lab-1.png?v=1772849459",
      officialUrl: "https://roundlab.com/products/mugwort-calming-cleanser",
      price: 17,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-toner-pad",
      name: "Birch Moisturizing Toner Pad",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Our Birch Tree Moisturizing Pad ranks No.1 in the multi patch category.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Birch_Toner_Pad_new.webp?v=1774308077",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-pad",
      price: 28,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "round-lab-birch-moisturizing-cream",
      name: "Birch Moisturizing Cream",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A light cream which provides full moisture, strengthens the skin barrier and soothing care.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/birch-moisturizing-cream-round-lab-3.jpg?v=1775165383",
      officialUrl: "https://roundlab.com/products/birch-moisturizing-cream",
      price: 36,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-sleeping-pack",
      name: "1025 Dokdo Sleeping Pack",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "Tiring from a long day but can't give up the skincare all-in-one night cream reduces sebum, hydrates, and repairs the skin overnight.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-sleeping-pack-round-lab-1.jpg?v=1772849333",
      officialUrl: "https://roundlab.com/products/1025-dokdo-sleeping-pack",
      price: 24,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-mud-pack",
      name: "1025 Dokdo Mud Pack",
      brand: "Round Lab",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The Dokdo Mud Pack will take care of skin's impurities and smoothly leave the skin with nothing but moisture.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Dokdo_Mud_Pack_new_2025.webp?v=1772852340",
      officialUrl: "https://roundlab.com/products/1025-dokdo-mud-pack",
      price: 19,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-lotion",
      name: "1025 Dokdo Lotion",
      brand: "Round Lab",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A lightweight moisturizer made with Ulleungdo deep sea water rich in minerals and Triple Hyaluronic Acid.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-lotion-round-lab-1.jpg?v=1772849282",
      officialUrl: "https://roundlab.com/products/1025-dokdo-lotion",
      price: 22,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-cleansing-oil",
      name: "1025 Dokdo Cleansing Oil",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The light-weight cleansing oil to remove makeup, sebum, blackhead, fine dust and to keep the moisture balance of the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-cleansing-oil-round-lab-1_e3e7ee17-149e-4bcb-814d-88ce57e96d63.jpg?v=1772849281",
      officialUrl: "https://roundlab.com/products/1025-dokdo-cleansing-oil",
      price: 26,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-cleanser",
      name: "1025 Dokdo Cleanser",
      brand: "Round Lab",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "A low acidic pH(5.0-6.0) foamy and creamy cleanser gently purifies and removes excess sebum and impurities while keeping a moisture balance of the skin.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/Dokdo_cleanser_renewed.webp?v=1772852868",
      officialUrl: "https://roundlab.com/products/1025-dokdo-cleanser",
      price: 15,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "round-lab-1025-dokdo-ampoule",
      name: "1025 Dokdo Ampoule",
      brand: "Round Lab",
      category: "essence",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "The watery textured 1025 Dokdo Ampoule effectively soothes and moisturizes the skin.",
      usageSteps: [
          "Apply after toner",
          "Press evenly over face and neck",
          "Follow with serum or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0651/7656/8022/files/1025-dokdo-ampoule-round-lab-1.jpg?v=1772849330",
      officialUrl: "https://roundlab.com/products/1025-dokdo-ampoule",
      price: 31,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-60-off-centella-ampoule-100ml",
      name: "[60% Off] Centella Ampoule 100ml",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An all-rounder ampoule formulated to help soothe visible redness and comfort sensitive-looking skin, featuring high quality Madagascar Centella Asiatica extract.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-ampoule-serum-100ml-60-off-centella-ampoule-100ml-1236473896.png?v=1777884370",
      officialUrl: "https://skin1004.com/products/60-off-centella-ampoule",
      price: 8.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-pdrn-1-5-cream",
      name: "PDRN 1.5 Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An intensive barrier cream with 99% pure vegan PDRN, designed to help visibly soothe redness and support the skin barrier for skin affected by external stressors.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cream-30ml-pdrn-1-5-cream-1240593970.png?v=1779871809",
      officialUrl: "https://skin1004.com/products/pdrn-1-5-cream",
      price: 18.7,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-soft-mask-brush",
      name: "Soft Mask Brush",
      brand: "SKIN1004",
      category: "mask",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A curved, mess-free brush that evenly spreads skincare formulas for precise application.",
      usageSteps: [
          "Apply after cleansing as directed",
          "Leave on for the official recommended time",
          "Remove or rinse, then finish with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-soft-mask-brush-1234624081.png?v=1777366570",
      officialUrl: "https://skin1004.com/products/soft-mask-brush",
      price: 5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-poremizing-glow-wrapping-mask",
      name: "Poremizing Glow Wrapping Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A bouncy gel type wrapping mask that peels off to reveal visibly refined pores, firmer-feeling skin, and a fresh, dewy glow with an temporary cooling sensation from the moment of application.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-100ml-poremizing-glow-wrapping-mask-1234624057.png?v=1777366089",
      officialUrl: "https://skin1004.com/products/poremizing-glow-wrapping-mask",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "skin1004-poremizing-clear-ampoule-pad",
      name: "Poremizing Clear Ampoule Pad",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A dual-textured ampoule pad clinically tested to visibly refine pores, balance excess sebum , and firm skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-60-pads-poremizing-clear-ampoule-pad-1234624072.png?v=1777366390",
      officialUrl: "https://skin1004.com/products/poremizing-clear-ampoule-pad",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "hydration",
          "acne"
      ]
  },
  {
      slug: "skin1004-azelaic-acid-10-ampoule",
      name: "Azelaic Acid 10 Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A facial ampoule highly concentrated with azelaic acid, designed to help manage the appearance of breakouts, visible redness, and marks for clearer-looking skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-30ml-azelaic-acid-10-ampoule-1228179733.png?v=1773996608",
      officialUrl: "https://skin1004.com/products/azelaic-acid-10-ampoule",
      price: 16.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-hyalu-teca-firming-cream",
      name: "Hyalu-Teca Firming Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A skin-firming cream that helps leave the skin feeling more resilient and achieve ultimate dewy glow.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-hyalu-teca-firming-cream-1224172548.png?v=1772095630",
      officialUrl: "https://skin1004.com/products/hyalu-teca-firming-cream",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "skin1004-hyalu-teca-glass-skin-milk",
      name: "Hyalu-Teca Glass Skin Milk",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A rich yet lightweight milky essence that absorbs quickly to hydrate and smooth skin, revealing a dewy, elastic glass-skin glow.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-hyalu-teca-glass-skin-milk-1224172560.png?v=1772095928",
      officialUrl: "https://skin1004.com/products/hyalu-teca-glass-skin-milk",
      price: 19.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "skin1004-hyalu-teca-plumping-ampoule",
      name: "Hyalu-Teca Plumping Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An intensive Hyalu-Teca ampoule that builds moisture density within the skin for a visibly plump, water-glow finish.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-hyalu-teca-plumping-ampoule-1224164594.png?v=1772088609",
      officialUrl: "https://skin1004.com/products/hyalu-teca-plumping-ampoule",
      price: 17.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-centella-teca-ampoule",
      name: "Centella Teca Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A replenishing ampoule formulated to support the skin's natural restorative processes, featuring 50× higher TECA extraction efficiency for ultimate soothing power Skin Concern: Skin Irritation, Dryness Product Benefits: Intensive Soothing, Hydratin",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-centella-teca-ampoule-1217895426.png?v=1769136489",
      officialUrl: "https://skin1004.com/products/centella-teca-ampoule",
      price: 15.3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-teca-soothing-toner",
      name: "Centella Teca Soothing Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A gentle LHA exfoliating toner designed to hydrate dry skin from within, featuring 50× higher TECA extraction efficiency for the ultimate soothing power Skin Concern: Skin Irritation, Inner Dryness, Moisture Imbalance Product Benefits: Soothing, Hy",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-210ml-centella-teca-soothing-toner-1217895427.png?v=1769136548",
      officialUrl: "https://skin1004.com/products/centella-teca-soothing-toner",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-teca-cream",
      name: "Centella Teca Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A concentrated TECA cream that supports skin balance and completes your slow-aging routine, featuring 50× higher TECA extraction efficiency for ultimate soothing power Skin Concern: Unsettled Skin Balance, Post-Irritation traces, Visible Redness Pr",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-75ml-centella-teca-cream-1217895425.png?v=1769136430",
      officialUrl: "https://skin1004.com/products/centella-teca-cream",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-water-fit-sun-serum-uv",
      name: "Hyalu-Cica Water-Fit Sun Serum UV",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What it is: A lightweight serum-like sunscreen that hydrates and soothes the skin for a fresh, no white cast finish.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-hyalu-cica-water-fit-sun-serum-uv-1204112543.png?v=1762764544",
      officialUrl: "https://skin1004.com/products/hyalu-cica-water-fit-sun-serum-uv",
      price: 15.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-gentle-cleansing-milk",
      name: "Hyalu-Cica Gentle Cleansing Milk",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A mild yet effective cleansing milk powered by 8 types of Hyaluronic Acid and Madagascar Centella Asiatica.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-200ml-hyalu-cica-gentle-cleansing-milk-1182575513.png?v=1754045589",
      officialUrl: "https://skin1004.com/products/hyalu-cica-gentle-cleansing-milk",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-mild-peeling-gel",
      name: "Tea-Trica Mild Peeling Gel",
      brand: "SKIN1004",
      category: "oil",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A gentle peeling gel that removes dead skin cells and impurities using natural cellulose and plant-derived enzymes.",
      usageSteps: [
          "Use after serum or mixed with moisturizer",
          "Massage a small amount into skin",
          "Use mostly in the evening or as needed"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-125ml-tea-trica-mild-peeling-gel-1182575509.png?v=1754045586",
      officialUrl: "https://skin1004.com/products/tea-trica-mild-peeling-gel",
      price: 16.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily"
      ],
      concerns: [
          "dullness",
          "acne"
      ]
  },
  {
      slug: "skin1004-tone-brightening-dark-spot-ampoule-pad",
      name: "Tone Brightening Dark Spot Ampoule Pad",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An ampoule pad that targets visible dark spots and uneven skin tone with brightening actives and skin texture care.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-60ea-tone-brightening-dark-spot-ampoule-pad-1191834346.png?v=1757329144",
      officialUrl: "https://skin1004.com/products/tone-brightening-dark-spot-ampoule-pad",
      price: 19.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-jelly-fit-ampoule-pad",
      name: "Hyalu-Cica Jelly-Fit Ampoule Pad",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A jelly-fit ampoule pad that delivers skin texture care and deep hydration with a hydrogel mask-like effect.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-60ea-hyalu-cica-jelly-fit-ampoule-pad-1191834350.png?v=1757329149",
      officialUrl: "https://skin1004.com/products/hyalu-cica-jelly-fit-ampoule-pad",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-velvet-finish-sunscreen",
      name: "Poremizing Velvet Finish Sunscreen",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight sunscreen with natural coverage that shields against UV rays while blurring pores, uneven texture, and tone-for a flawless finish.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-poremizing-velvet-finish-sunscreen-1174822618.png?v=1750755196",
      officialUrl: "https://skin1004.com/products/poremizing-velvet-finish-sunscreen",
      price: 16,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "hydration"
      ]
  },
  {
      slug: "skin1004-matrixyl-10-boosting-shot-ampoule",
      name: "Matrixyl 10 Boosting Shot Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: With the power of Matrixyl and hyaluronic acid, the Boosting Shot helps provide intensive hydration and a firmer-looking appearance for visibly hydrated and plump skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-30ml-matrixyl-10-boosting-shot-ampoule-1170007523.png?v=1750078022",
      officialUrl: "https://skin1004.com/products/matrixyl-10-boosting-shot-ampoule",
      price: 25.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration"
      ]
  },
  {
      slug: "skin1004-niacinamide-10-boosting-shot-ampoule",
      name: "Niacinamide 10 Boosting Shot Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "niacinamide"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: niacinamide. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: Formulated with Niacinamide to help refine pores and visibly even the look of skin tone, Tranexamic Acid to enhance skin texture and help support the skin's natural barrier, and a Boosting Shot system that helps the skin feel hydrated and refreshed",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-30ml-niacinamide-10-boosting-shot-ampoule-1170007513.png?v=1750077965",
      officialUrl: "https://skin1004.com/products/niacinamide-10-boosting-shot-ampoule",
      price: 19.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness"
      ]
  },
  {
      slug: "skin1004-retinol-0-2-boosting-shot-ampoule",
      name: "Retinol 0.2 Boosting Shot Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "retinol"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: retinoid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A blend of Retinol and Retinal that helps improve the appearance of skin firmness and texture, delivered through a Boosting Shot system for healthier-looking skin Product Benefits: Elasticity Boost, Smoother Texture, Helps reduce the appearance of",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-30ml-retinol-0-2-boosting-shot-ampoule-1170007504.png?v=1750078128",
      officialUrl: "https://skin1004.com/products/retinol-0-2-boosting-shot-ampoule",
      price: 21.6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "aging"
      ]
  },
  {
      slug: "skin1004-probio-cica-nourishing-mask",
      name: "Probio-Cica Nourishing Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask infused with Fermented Madagascan Centella, Ceramides, and 9-Peptide Complex to deeply nourish and firm.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-probio-cica-nourishing-mask-1123859809.jpg?v=1738697068",
      officialUrl: "https://skin1004.com/products/probio-cica-nourishing-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-relaxing-mask",
      name: "Tea-Trica Relaxing Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask packed with Tea Tree Complex, Madagascan Centella, and Salicylic Acid to soothe irritation, clarify pores, and helps maintain healthy-looking Skin Product Benefits: Soothing, Pore Care, Skin Barrier Support Skin Type: Normal, Oily, Sen",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-tea-trica-relaxing-mask-1123859803.jpg?v=1738697065",
      officialUrl: "https://skin1004.com/products/tea-trica-relaxing-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-hydrating-mask",
      name: "Hyalu-Cica Hydrating Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask enriched with 8 types of Hyaluronic Acid, Centella, and Ceramide to deeply hydrate, plump, and lock in moisture.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-hyalu-cica-hydrating-mask-1123859799.jpg?v=1738697062",
      officialUrl: "https://skin1004.com/products/hyalu-cica-hydrating-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-glow-mask",
      name: "Tone Brightening Glow Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask infused with a rich essence of Madagascan Centella and Niacinamide that leaves the skin looking radiant and glowing.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-tone-brightening-glow-mask-41978941997302.png?v=1729742876",
      officialUrl: "https://skin1004.com/products/tone-brightening-glow-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-clarifying-mask",
      name: "Poremizing Clarifying Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask with a rich essence of Himalayan Pink Salt & Succinic Acid gives elasticity and tension to pores.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-poremizing-clarifying-mask-41978925318390.png?v=1729743046",
      officialUrl: "https://skin1004.com/products/poremizing-clarifying-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-probio-cica-glow-sun-ampoule",
      name: "Probio-Cica Glow Sun Ampoule",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A super moisturizing sunscreen with fermented Centella and Panthenol Product Benefits: Calming, Anti-Aging, Hydrating Skin Type: Dry, Normal, Sensitive Key Ingredients: Lactobacillus/Centella Asiatica Extract Ferment Filtrate, Centella Asiatica Ext",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-probio-cica-glow-sun-ampoule-41175245684982.png?v=1726249968",
      officialUrl: "https://skin1004.com/products/probio-cica-glow-sun-ampoule",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-soothing-sun-milk",
      name: "Tea-Trica Soothing Sun Milk",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A super lightweight,moisturizing sunscreen with natural dewy finish Product Benefits: Calming, Acne, Sensitive Skin Type: Acne, Normal, Sensitive Key Ingredients Centella Asiatica Extract, Melaleuca Alternifolia (Tea Tree) Leaf Water, King Pine Lea",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-50ml-tea-trica-soothing-sun-milk-40739484205302.png?v=1717741910",
      officialUrl: "https://skin1004.com/products/tea-trica-soothing-sun-milk",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness",
          "hydration"
      ]
  },
  {
      slug: "skin1004-tea-trica-spot-cream",
      name: "Tea-Trica Spot Cream",
      brand: "SKIN1004",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A spot cream with 15% Tea tree water and 1% TECA provides relief to troubled looking skin areas.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-tea-trica-spot-cream-40537571131638.png?v=1715325774",
      officialUrl: "https://skin1004.com/products/tea-trica-spot-cream",
      price: 17.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-quick-clay-stick-mask",
      name: "Poremizing Quick Clay Stick Mask",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A smooth stick mask with 5 kinds of clays (18% Kaolin) and fine Red bean powder to soak up excess sebum and minimize the appearance of pores for a smoother-looking complexion.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-mask-pad-27g-poremizing-quick-clay-stick-mask-1246455499.png?v=1782787390",
      officialUrl: "https://skin1004.com/products/poremizing-quick-clay-stick-mask",
      price: 19.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-b5-cream",
      name: "Tea-Trica B5 Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A soothing and hydrating gel cream formulated with 5% Panthenol, Tea Tree, and Cica Exosome that helps soothe sensitive skin, strengthen the skin barrier, and provide lightweight hydration.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cream-tea-trica-b5-cream-1125798220.png?v=1738700592",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-tea-trica-b5-cream",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-quick-calming-pad",
      name: "Centella Quick Calming Pad",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An essence-rich toner pad with Centella and Panthenol soothes and hydrates the skin in a simple 2-minute step.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-mask-pad-70-pads-130ml-centella-quick-calming-pad-38642832474358.png?v=1677149423",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-quick-calming-pad",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-probio-cica-enrich-cream",
      name: "Probio-Cica Enrich Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella",
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A thick and smooth cream with fermented Centella, Shea butter and Ceramide NP provides rich moisturization without feeling heavy or sticky.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cream-probio-cica-enrich-cream-40032154747126.png?v=1709706716",
      officialUrl: "https://skin1004.com/products/probio-cica-enrich-cream",
      price: 10,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "barrier",
          "redness"
      ]
  },
  {
      slug: "skin1004-probio-cica-essence-toner",
      name: "Probio-Cica Essence Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella",
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A rich essence toner with fermented Centella, 5 Hyaluronic acids and Ceramide NP soothes and moisturizes the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-toner-210-ml-probio-cica-essence-toner-40032155336950.png?v=1709706722",
      officialUrl: "https://skin1004.com/products/probio-cica-essence-toner",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "barrier",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-silky-fit-sun-stick",
      name: "Hyalu-Cica Silky-Fit Sun Stick",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A chemical sun stick glides smoothly on the skin and provides moisture with a matte and silky finish Product Benefits: Moisturizing, Sebum improvement, UV Protection Skin Type: Sensitive, Normal, Dry Key Ingredients: Centella Asiatica Extract, Hyal",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-sun-hyalu-cica-silky-fit-sun-stick-40032143180022.png?v=1709706355",
      officialUrl: "https://skin1004.com/products/hyalu-cica-silky-fit-sun-stick-20g",
      price: 8.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "redness",
          "hydration"
      ]
  },
  {
      slug: "skin1004-probio-cica-bakuchiol-eye-cream",
      name: "Probio-Cica Bakuchiol Eye Cream",
      brand: "SKIN1004",
      category: "eye",
      ingredientIds: [
          "centella",
          "ceramides"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, ceramide/barrier family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A gentle eye cream with fermented Centella and Bakuchiol (vegan retinol) helps improve the look of fine lines and wrinkles for a smoother-looking complexion.",
      usageSteps: [
          "Apply a small amount around the eye area",
          "Tap gently without rubbing",
          "Use before moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cream-probio-cica-bakuchiol-eye-cream-40032154091766.png?v=1709707078",
      officialUrl: "https://skin1004.com/products/probio-cica-bakuchiol-eye-cream",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "barrier",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-water-fit-sun-serum",
      name: "Hyalu-Cica Water-Fit Sun Serum",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A serum-like chemical sunscreen that is super lightweight, hydrating, and quickly absorbed, with a non-greasy, dewy finish Product Benefits: Moisturizing, Soothing, UV Protection Skin Type: Sensitive, Normal, Dry Key Ingredients: Centella Asiatica",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-sun-hyalu-cica-water-fit-sun-serum-spf50-pa-42321189568758.jpg?v=1733104913",
      officialUrl: "https://skin1004.com/products/hyalu-cica-water-fit-sun-serum-spf50-pa",
      price: 8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-deep-cleansing-foam",
      name: "Poremizing Deep Cleansing Foam",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A rich, creamy cleanser with Mineral salts, Kaolin and Papain acts like a magnet to absorb impurities and excess sebum.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-125ml-poremizing-deep-cleansing-foam-1246455498.png?v=1782787450",
      officialUrl: "https://skin1004.com/products/poremizing-deep-cleansing-foam",
      price: 11.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-light-gel-cream",
      name: "Poremizing Light Gel Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight gel with Aloe, Niacinamide and Adenosine provides a refreshing, cooling sensation and lasting hydration to the skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-75ml-poremizing-light-gel-cream-1246455497.png?v=1782787508",
      officialUrl: "https://skin1004.com/products/poremizing-light-gel-cream",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-bha-foam",
      name: "Tea-Trica BHA Foam",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [
          "bha",
          "hyaluronic_acid"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: BHA exfoliant family, hyaluronic acid family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-tea-trica-bha-foam-38642932678902.png?v=1677150498",
      officialUrl: "https://skin1004.com/products/tea-trica-bha-foam",
      price: 13.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-moisture-cream",
      name: "Hyalu-Cica Moisture Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight cream with 5 Hyaluronic acids and Hydrolyzed Collagen provides deep hydration that lasts up to 100 hours.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cream-hyalu-cica-moisture-cream-40032069222646.png?v=1709704922",
      officialUrl: "https://skin1004.com/products/madagascar-centella-hyalu-cica-moisture-cream-75ml",
      price: 15.75,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-first-ampoule",
      name: "Hyalu-Cica First Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A watery ampoule with 5 Hyaluronic acids, Birch sap, and Ivy quickly boosts moisture and prepares the skin for the next skincare step.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-hyalu-cica-first-ampoule-38642852888822.png?v=1677149599",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-hyalu-cica-first-ampoule",
      price: 20.7,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-capsule-cream",
      name: "Tone Brightening Capsule Cream",
      brand: "SKIN1004",
      category: "spot",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A cream with Niacinamide, Tranexamic Acid, Bisabolol, and encapsulated Madewhite that moisturizes and helps improve the look of uneven skin tone for a brighter-looking complexion.",
      usageSteps: [
          "Apply directly to target areas",
          "Let it set before moisturizer",
          "Use as directed by the official product instructions"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-cream-tone-brightening-capsule-cream-38642938314998.png?v=1677150683",
      officialUrl: "https://skin1004.com/products/madagascar-centella-tone-brightening-capsule-cream-75m",
      price: 18.9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-tone-up-sunscreen",
      name: "Tone Brightening Tone-Up Sunscreen",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight peach-colored tinted sunscreen with Madewhite corrects uneven skin tone with a natural finish.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-sun-tone-brightening-tone-up-sunscreen-38642942935286.png?v=1677150854",
      officialUrl: "https://skin1004.com/products/madagascar-centella-tone-brightening-tone-up-sunscreen",
      price: 17.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "redness",
          "hydration"
      ]
  },
  {
      slug: "skin1004-tea-trica-spot-cover-patch",
      name: "Tea-Trica Spot Cover Patch",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: Amazingly thin and skin-like pimple patches that absorb excess sebum and impurities from the skin's surface, helping keep the skin clean and protected.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-mask-pad-1-pack-22ea-tea-trica-spot-cover-patch-38642934939894.png?v=1677150674",
      officialUrl: "https://skin1004.com/products/tea-trica-spot-cover-patch",
      price: 4.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-clear-toner",
      name: "Poremizing Clear Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An exfoliating toner with mineral salts and 4-HAs (AHA, BHA, PHA, LHA) helps remove surface impurities and dead skin cells.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-toner-210ml-poremizing-clear-toner-38642869174518.png?v=1677149781",
      officialUrl: "https://skin1004.com/products/poremizing-clear-toner",
      price: 17.1,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-poremizing-fresh-ampoule",
      name: "Poremizing Fresh Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A Pore Care functional ampoule with Pink mineral salt and 9 Peptides cleanses pores and helps the skin look smoother.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-100ml-poremizing-fresh-ampoule-38642870780150.png?v=1677149786",
      officialUrl: "https://skin1004.com/products/poremizing-fresh-ampoule",
      price: 9.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-purifying-toner",
      name: "Tea-Trica Purifying Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A Tea tree water toner with Cypress that balances oil & sebum, and removes dead skin cells.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-toner-210ml-tea-trica-purifying-toner-38642933399798.png?v=1677150500",
      officialUrl: "https://skin1004.com/products/tea-trica-purifying-toner",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tea-trica-relief-ampoule",
      name: "Tea-Trica Relief Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A non-comedogenic ampoule with Tea tree, Pine tree, and Cypress that helps care for blemish-prone skin and maintain a healthy-looking complexion Product Benefits: Calming, Acne, Sensitive Skin Type: Acne, Oily, Sensitive Key Ingredients: Centella A",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-100ml-tea-trica-relief-ampoule-38642934055158.png?v=1677150503",
      officialUrl: "https://skin1004.com/products/tea-trica-relief-ampoule",
      price: 9.8,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-air-fit-suncream-light",
      name: "Centella Air-Fit Suncream Light",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A physical sunscreen with a lightweight, non-whitecast formula gives a natural finish without clogging pores.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-sun-50ml-centella-air-fit-suncream-light-spf30-pa-38642815467766.png?v=1677149069",
      officialUrl: "https://skin1004.com/products/madagascar-centella-air-fit-suncream-light-spf30-pa",
      price: 15.3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-air-fit-suncream-plus",
      name: "Centella Air-Fit Suncream Plus",
      brand: "SKIN1004",
      category: "sunscreen",
      ingredientIds: [
          "centella",
          "spf"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family, UV filter family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight physical sunscreen with a slight tint that blurs the skin and pores to a natural matte finish.",
      usageSteps: [
          "Apply as the last morning skincare step",
          "Use enough product for face and neck",
          "Reapply every 2 hours during sun exposure"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-sun-50ml-centella-air-fit-suncream-plus-spf50-pa-38642816647414.png?v=1677149072",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-air-fit-suncream-plus",
      price: 16.2,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-ampoule",
      name: "Centella Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An all-rounder ampoule formulated to help soothe visible redness and comfort sensitive-looking skin, featuring high quality Madagascan Centella Asiatica extract Product Benefits: Soothing, Hydrating Skin Type: Suitable for all skin types, especiall",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-ampoule-serum-centella-ampoule-1246455500.png?v=1782787571",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-ampoule",
      price: 17.6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-capsule-ampoule",
      name: "Tone Brightening Capsule Ampoule",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is An ampoule for daily use, formulated with Niacinamide, Tranexamic Acid, and encapsulated Madewhite to help improve the look of uneven skin tone and dullness for a more radiant-looking complexion.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-ampoule-serum-100ml-brightening-capsule-ampoule-38642788630774.png?v=1677148702",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-tone-brightening-capsule-ampoule",
      price: 9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-boosting-toner",
      name: "Tone Brightening Boosting Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A mild exfoliating toner with fruit extracts, Madewhite, and Niacinamide that gently refines and preps the skin for the next step in your skincare routine.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-toner-210ml-tone-brightening-boosting-toner-38642937135350.png?v=1677150680",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-tone-brightening-boosting-toner",
      price: 18,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-tone-brightening-cleansing-gel-foam",
      name: "Tone Brightening Cleansing Gel Foam",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [],
      fullIngredients: "Full INCI not available in the official product feed. Composition needs manual verification from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A moisturizing gel cleanser for gentle cleansing that helps reveal a healthy-looking glow Product Benefits: Soothing, Radiance, Clear-looking, Dullness, Mild exfoliating Skin Type: Normal, Combination, Oily Key Ingredients: Centella Asiatica Extrac",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-cleanser-125ml-tone-brightening-cleansing-gel-foam-38642975965430.png?v=1677151217",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-tone-brightening-cleansing-gel-foam",
      price: 12.6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-sleeping-pack",
      name: "Hyalu-Cica Sleeping Pack",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A lightweight gel sleeping mask with 5 Hyaluronic acids and Melatonin calms and moisturizes the skin overnight.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-mask-pad-hyalu-cica-sleeping-pack-38642854985974.png?v=1677149605",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-hyalu-cica-sleeping-pack",
      price: 7,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-blue-serum",
      name: "Hyalu-Cica Blue Serum",
      brand: "SKIN1004",
      category: "ampoule",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: An all-in-one lightweight serum with Centella, 5 Hyaluronic acids, Ceramide NP, Niacinamide, and Adenosine to hydrate and soothe the skin.",
      usageSteps: [
          "Apply after toner or essence",
          "Use 2-3 drops and press into skin",
          "Follow with moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-ampoule-serum-hyalu-cica-blue-serum-40032061096182.png?v=1709704927",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-hyalu-cica-blue-serum",
      price: 14,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "redness"
      ]
  },
  {
      slug: "skin1004-hyalu-cica-brightening-toner",
      name: "Hyalu-Cica Brightening Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A highly hydrating toner with AHA, LHA gently exfoliates while soothing and brightening the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-toner-hyalu-cica-brightening-toner-40032065356022.png?v=1709704933",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-hyalu-cica-brightening-toner",
      price: 6,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-watergel-sheet-ampoule-mask",
      name: "Centella Watergel Sheet Ampoule Mask",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A sheet mask with a rich essence of Centella, Glycerin, and Chamomile intensely soothes and hydrates the skin.",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-mask-pad-centella-watergel-sheet-ampoule-mask-38642839388406.png?v=1677149612",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-watergel-sheet-ampoule-mask",
      price: 3,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-cream",
      name: "Centella Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A light cream formulated with Panthenol and TECA that soothes, moisturizes, and nourishes the skin.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-cream-centella-cream-38642822906102.png?v=1677149063",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-cream",
      price: 9,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-soothing-cream",
      name: "Centella Soothing Cream",
      brand: "SKIN1004",
      category: "moisturizer",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A non sticky soothing gel formulated with Centella, Trehalose, and Ceramide NP that moisturizes the skin and helps support the skin natural barrier.",
      usageSteps: [
          "Apply after serum or treatment",
          "Smooth evenly over face and neck",
          "Use morning and/or evening"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-cream-centella-soothing-cream-38642833588470.png?v=1677149426",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-soothing-cream",
      price: 7.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-toning-toner",
      name: "Centella Toning Toner",
      brand: "SKIN1004",
      category: "toner",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A gentle, PHA exfoliating toner designed for daily use to promote smoother-looking skin Product Benefits: Soothing, Mild exfoliation Skin Type: Normal, Sensitive looking skin Key Ingredients: Centella Asiatica Extract, Gluconolactone, Betaine",
      usageSteps: [
          "Apply after cleansing",
          "Pat into the face with hands or a cotton pad",
          "Follow with essence, serum, or moisturizer"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-toner-centella-toning-toner-38642837750006.png?v=1766754925",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-toning-toner",
      price: 5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-ampoule-foam",
      name: "Centella Ampoule Foam",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: A pH-balanced (pH 5) cleanser formulated with coconut-derived surfactants and citric acid that gently cleanses the skin without leaving it feeling dry or tight.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/products/skin1004-cleanser-centella-ampoule-foam-38642819825910.png?v=1677149057",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-ampoule-foam",
      price: 4,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
  {
      slug: "skin1004-centella-light-cleansing-oil",
      name: "Centella Light Cleansing Oil",
      brand: "SKIN1004",
      category: "cleanser",
      ingredientIds: [
          "centella"
      ],
      fullIngredients: "Official feed did not expose full INCI. Name/tags indicate: centella/cica family. Verify complete composition from packaging or official ingredient page.",
      origin: "South Korea",
      description: "What It Is: Centella and 4 plant-derived oils* gently dissolve makeup, sunscreen and excess sebum on the skin, leaving it clean and refreshed.",
      usageSteps: [
          "Use on damp skin as the cleansing step",
          "Massage gently, then rinse well",
          "Follow with toner or serum"
      ],
      imageUrl: "https://cdn.shopify.com/s/files/1/0590/4538/0253/files/skin1004-cleanser-centella-light-cleansing-oil-42321970594038.jpg?v=1733104905",
      officialUrl: "https://skin1004.com/products/skin1004-madagascar-centella-light-cleansing-oil",
      price: 5.5,
      currency: "USD",
      skinTypes: [
          "normal",
          "combination",
          "dry",
          "oily",
          "sensitive"
      ],
      concerns: [
          "hydration",
          "dullness",
          "acne",
          "redness"
      ]
  },
];

export const PRODUCTS: SeedProduct[] = [...CORE_PRODUCTS, ...GENERATED_PRODUCTS];
