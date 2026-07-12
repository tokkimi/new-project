import { CONFLICT_RULES, INGREDIENTS } from "@/data/ingredients";

export type SeedIngredient = {
  id: string;
  name: string;
  inciName?: string;
  aliases: string[];
  description?: string;
  origin?: string;
  function?: string;
  benefits: string[];
  sideEffects: string[];
  recommendedConcentration?: string | null;
  pregnancySafety?: string;
  photosensitivity?: boolean;
  precautions: string[];
  timePreference: "am" | "pm" | "both";
  layerWeight: number;
  sourceNotes?: string;
};

const baseById = new Map(INGREDIENTS.map((ingredient) => [ingredient.id, ingredient]));

function ingredient(data: Omit<SeedIngredient, "aliases" | "timePreference" | "layerWeight">): SeedIngredient {
  const base = baseById.get(data.id);
  return {
    ...data,
    aliases: base?.aliases ?? [],
    timePreference: base?.timePref ?? "both",
    layerWeight: base?.layerWeight ?? 50,
  };
}

export const SEED_INGREDIENTS: SeedIngredient[] = [
  ingredient({
    id: "retinol",
    name: "Retinoids",
    inciName: "Retinol / Retinal / Retinoid derivatives",
    description: "Vitamin A family used for visible aging, uneven texture, and breakout-prone routines.",
    origin: "Synthetic or converted vitamin A derivatives",
    function: "Skin-conditioning active",
    benefits: ["Texture refinement", "Fine-line care", "Breakout support"],
    sideEffects: ["Dryness", "Peeling", "Irritation"],
    recommendedConcentration: null,
    pregnancySafety: "Avoid unless a clinician explicitly approves.",
    photosensitivity: true,
    precautions: ["Introduce gradually", "Use sunscreen every morning", "Avoid layering with strong exfoliants at first"],
    sourceNotes: "General dermatology guidance; exact concentration depends on the specific retinoid and product.",
  }),
  ingredient({
    id: "vitamin_c",
    name: "Vitamin C",
    inciName: "Ascorbic Acid / Vitamin C derivatives",
    description: "Antioxidant family used for brightness, tone, and environmental support.",
    origin: "Synthetic or biofermentation-derived, depending on supplier",
    function: "Antioxidant / brightening active",
    benefits: ["Dullness care", "Tone evening", "Antioxidant support"],
    sideEffects: ["Stinging", "Irritation in sensitive skin"],
    recommendedConcentration: null,
    pregnancySafety: "Generally considered compatible with pregnancy-focused routines, but product formulas vary.",
    photosensitivity: false,
    precautions: ["Patch test if sensitive", "Pair with daily sunscreen for pigmentation goals"],
  }),
  ingredient({
    id: "niacinamide",
    name: "Niacinamide",
    inciName: "Niacinamide",
    description: "Vitamin B3 derivative used broadly for barrier support, uneven tone, and oil-control routines.",
    origin: "Synthetic vitamin derivative",
    function: "Skin-conditioning / barrier-support active",
    benefits: ["Barrier support", "Sebum balance", "Tone evening"],
    sideEffects: ["Temporary flushing or tingling in some users"],
    recommendedConcentration: null,
    pregnancySafety: "Generally considered compatible with pregnancy-focused routines, but product formulas vary.",
    photosensitivity: false,
    precautions: ["Patch test when used in high-strength formulas"],
  }),
  ingredient({
    id: "aha",
    name: "AHA",
    inciName: "Glycolic Acid / Lactic Acid / Mandelic Acid",
    description: "Water-soluble exfoliating acids used for dullness, texture, and uneven tone.",
    origin: "Synthetic or plant-derived depending on supplier",
    function: "Exfoliant",
    benefits: ["Texture smoothing", "Glow", "Uneven-tone care"],
    sideEffects: ["Stinging", "Dryness", "Barrier irritation"],
    recommendedConcentration: null,
    pregnancySafety: "Depends on acid, concentration, and product directions.",
    photosensitivity: true,
    precautions: ["Use sunscreen", "Avoid over-exfoliation", "Do not combine with multiple strong actives when irritated"],
  }),
  ingredient({
    id: "bha",
    name: "BHA",
    inciName: "Salicylic Acid / Betaine Salicylate",
    description: "Oil-soluble exfoliant family used for pores, blackheads, and blemish-prone skin.",
    origin: "Synthetic or willow-related derivatives depending on ingredient",
    function: "Exfoliant",
    benefits: ["Pore care", "Blackhead care", "Sebum-prone routine support"],
    sideEffects: ["Dryness", "Stinging", "Irritation"],
    recommendedConcentration: null,
    pregnancySafety: "Ask a clinician for pregnancy-specific use, especially leave-on acid products.",
    photosensitivity: true,
    precautions: ["Use sunscreen", "Avoid over-exfoliation", "Patch test if aspirin-sensitive"],
  }),
  ingredient({
    id: "benzoyl_peroxide",
    name: "Benzoyl Peroxide",
    inciName: "Benzoyl Peroxide",
    description: "Acne-care active used in some blemish routines; can be drying and bleach fabric.",
    origin: "Synthetic",
    function: "Anti-acne active",
    benefits: ["Blemish support"],
    sideEffects: ["Dryness", "Irritation", "Fabric bleaching"],
    recommendedConcentration: null,
    pregnancySafety: "Ask a clinician for pregnancy-specific use.",
    photosensitivity: false,
    precautions: ["Avoid eyes and lips", "Introduce gradually", "Use with barrier support"],
  }),
  ingredient({
    id: "vitamin_e",
    name: "Vitamin E",
    inciName: "Tocopherol / Tocopheryl Acetate",
    description: "Antioxidant and emollient family commonly used in moisturizers and oils.",
    origin: "Plant-derived or synthetic depending on supplier",
    function: "Antioxidant / emollient",
    benefits: ["Antioxidant support", "Comfort", "Barrier feel"],
    sideEffects: ["May feel heavy for some oily or acne-prone users"],
    recommendedConcentration: null,
    pregnancySafety: "Generally considered compatible with pregnancy-focused routines, but product formulas vary.",
    photosensitivity: false,
    precautions: ["Patch test if prone to clogged pores"],
  }),
  ingredient({
    id: "peptides",
    name: "Peptides",
    inciName: "Peptide complexes",
    description: "A broad group of signaling or conditioning ingredients used in firming and repair-positioned formulas.",
    origin: "Synthetic or biotechnology-derived depending on peptide",
    function: "Skin-conditioning active",
    benefits: ["Firmness support", "Fine-line care", "Barrier comfort"],
    sideEffects: ["Low irritation potential, formula dependent"],
    recommendedConcentration: null,
    pregnancySafety: "Unknown for many specific peptides; evaluate the full formula.",
    photosensitivity: false,
    precautions: ["Avoid assuming all peptide complexes have the same evidence or function"],
  }),
  ingredient({
    id: "hyaluronic_acid",
    name: "Hyaluronic Acid",
    inciName: "Hyaluronic Acid / Sodium Hyaluronate",
    description: "Humectant family used for hydration and plumping feel.",
    origin: "Biotechnology fermentation or animal-derived depending on supplier",
    function: "Humectant",
    benefits: ["Hydration", "Plumping feel", "Barrier comfort"],
    sideEffects: ["Can feel tight if used without an occlusive layer in very dry air"],
    recommendedConcentration: null,
    pregnancySafety: "Generally considered compatible with pregnancy-focused routines.",
    photosensitivity: false,
    precautions: ["Seal with moisturizer in dry climates"],
  }),
  ingredient({
    id: "centella",
    name: "Centella Asiatica",
    inciName: "Centella Asiatica Extract / Madecassoside",
    description: "Cica family used in K-beauty for soothing, visible redness, and barrier-support routines.",
    origin: "Plant extract",
    function: "Soothing / skin-conditioning",
    benefits: ["Redness comfort", "Barrier support", "Post-blemish routine support"],
    sideEffects: ["Rare sensitivity to botanical extracts"],
    recommendedConcentration: null,
    pregnancySafety: "Unknown for every derivative and concentration; evaluate the full formula.",
    photosensitivity: false,
    precautions: ["Patch test if reactive to botanicals"],
  }),
  ingredient({
    id: "spf",
    name: "UV Filters",
    inciName: "Organic and/or inorganic sunscreen filters",
    description: "UV-filter systems used in sunscreen products; exact behavior depends on the filter blend and testing.",
    origin: "Synthetic and/or mineral depending on formula",
    function: "UV protection",
    benefits: ["Sun protection", "Pigmentation prevention support", "Photoaging prevention support"],
    sideEffects: ["Eye sting or cast depending on filter system"],
    recommendedConcentration: null,
    pregnancySafety: "Use sunscreen in pregnancy; choose filters and formulas according to clinician advice if needed.",
    photosensitivity: false,
    precautions: ["Apply enough product", "Reapply when exposed", "Do not infer SPF from ingredient names alone"],
  }),
  ingredient({
    id: "ceramides",
    name: "Ceramides",
    inciName: "Ceramide NP / Ceramide AP / Ceramide EOP and related lipids",
    description: "Skin-identical lipid family used for barrier repair and dryness-prone routines.",
    origin: "Synthetic, biotechnology-derived, or plant-derived depending on supplier",
    function: "Barrier-support lipid",
    benefits: ["Barrier support", "Dryness care", "Comfort"],
    sideEffects: ["Usually low irritation; formula texture can feel rich"],
    recommendedConcentration: null,
    pregnancySafety: "Generally considered compatible with pregnancy-focused routines.",
    photosensitivity: false,
    precautions: ["Best evaluated with the whole lipid system, not the ceramide name alone"],
  }),
];

export const SEED_COMPATIBILITY_RULES = CONFLICT_RULES.map((rule) => ({
  id: rule.id,
  ingredientAId: rule.a,
  ingredientBId: rule.b,
  severity: rule.severity,
}));
