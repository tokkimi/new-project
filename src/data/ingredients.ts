export type TimeSlot = "am" | "pm" | "both";

export type Ingredient = {
  id: string;
  name: string;
  aliases: string[];
  summary: string;
  timePref: TimeSlot;
  /** Lower = applied earlier in a routine step (thin/reactive actives first). */
  layerWeight: number;
};

export type ConflictSeverity = "avoid" | "space_out" | "sequence" | "note";

export type ConflictRule = {
  id: string;
  a: string;
  b: string;
  severity: ConflictSeverity;
  headline: string;
  reason: string;
  recommendation: string;
};

export const INGREDIENTS: Ingredient[] = [
  { id: "retinol", name: "Rétinol / Rétinoïdes", aliases: ["retinol", "retinal", "tretinoin", "adapalene"], summary: "Renouvellement cellulaire, anti-âge, acné.", timePref: "pm", layerWeight: 40 },
  { id: "vitamin_c", name: "Vitamine C (L-AA)", aliases: ["ascorbic acid", "vitamin c", "l-ascorbic acid"], summary: "Antioxydant, éclat, protection anti-pollution.", timePref: "am", layerWeight: 20 },
  { id: "niacinamide", name: "Niacinamide", aliases: ["vitamin b3", "nicotinamide"], summary: "Régule le sébum, apaise, renforce la barrière.", timePref: "both", layerWeight: 25 },
  { id: "aha", name: "AHA (glycolique / lactique)", aliases: ["glycolic acid", "lactic acid", "mandelic acid"], summary: "Exfoliant, texture et teint.", timePref: "pm", layerWeight: 30 },
  { id: "bha", name: "BHA (acide salicylique)", aliases: ["salicylic acid"], summary: "Exfoliant, désobstrue les pores, anti-imperfections.", timePref: "pm", layerWeight: 30 },
  { id: "benzoyl_peroxide", name: "Peroxyde de benzoyle", aliases: ["benzoyl peroxide", "bpo"], summary: "Antibactérien, traite l'acné inflammatoire.", timePref: "both", layerWeight: 35 },
  { id: "vitamin_e", name: "Vitamine E", aliases: ["tocopherol"], summary: "Antioxydant, souvent associé à la vitamine C.", timePref: "both", layerWeight: 22 },
  { id: "peptides", name: "Peptides / Cuivre-peptides", aliases: ["copper peptides", "ghk-cu", "peptides"], summary: "Fermeté, réparation de la barrière.", timePref: "both", layerWeight: 45 },
  { id: "hyaluronic_acid", name: "Acide hyaluronique", aliases: ["hyaluronic acid", "sodium hyaluronate"], summary: "Hydratation, repulpant.", timePref: "both", layerWeight: 15 },
  { id: "centella", name: "Centella asiatica (Cica)", aliases: ["cica", "centella", "madecassoside"], summary: "Apaisant, réparateur — pilier K-beauty.", timePref: "both", layerWeight: 18 },
  { id: "spf", name: "Filtre solaire (SPF)", aliases: ["spf", "sunscreen", "avobenzone", "zinc oxide"], summary: "Protection UV — étape finale du matin.", timePref: "am", layerWeight: 90 },
  { id: "ceramides", name: "Céramides", aliases: ["ceramide", "ceramides"], summary: "Restaure la barrière cutanée.", timePref: "both", layerWeight: 55 },
];

export const CONFLICT_RULES: ConflictRule[] = [
  {
    id: "retinol_aha_bha",
    a: "retinol",
    b: "aha",
    severity: "avoid",
    headline: "Sur-exfoliation à haut risque",
    reason: "Le rétinol et les AHA accélèrent tous les deux le renouvellement cellulaire : combinés le même soir, ils multiplient rougeurs, sensibilité et pelage.",
    recommendation: "Alterne les soirs (ex : rétinol lundi/mercredi/vendredi, AHA les autres soirs) plutôt que de les superposer.",
  },
  {
    id: "retinol_bha",
    a: "retinol",
    b: "bha",
    severity: "avoid",
    headline: "Sur-exfoliation à haut risque",
    reason: "Même logique qu'avec les AHA : le BHA et le rétinol cumulent l'irritation sur une barrière cutanée déjà fragilisée.",
    recommendation: "Réserve une soirée à chacun, jamais les deux en même temps.",
  },
  {
    id: "retinol_benzoyl",
    a: "retinol",
    b: "benzoyl_peroxide",
    severity: "avoid",
    headline: "Le peroxyde de benzoyle désactive le rétinol",
    reason: "Le peroxyde de benzoyle oxyde le rétinol et réduit fortement son efficacité en plus d'irriter la peau si combinés.",
    recommendation: "Utilise le peroxyde de benzoyle le matin et réserve le rétinol au soir, à distance d'au moins quelques heures — ou alterne les jours.",
  },
  {
    id: "vitc_retinol_timing",
    a: "vitamin_c",
    b: "retinol",
    severity: "sequence",
    headline: "Deux actifs puissants, deux moments différents",
    reason: "La vitamine C L-AA est instable à un pH proche de celui du rétinol actif ; les combiner peut neutraliser une partie de leur efficacité et irriter.",
    recommendation: "Vitamine C le matin (antioxydant + protection), rétinol le soir. Simple, efficace, zéro conflit.",
  },
  {
    id: "aha_bha_together",
    a: "aha",
    b: "bha",
    severity: "space_out",
    headline: "Cumul d'exfoliants",
    reason: "Utiliser deux exfoliants chimiques le même soir augmente le risque de barrière cutanée abîmée, surtout sur peau sensible.",
    recommendation: "Choisis-en un par soirée, ou réserve la combinaison aux peaux très tolérantes en commençant à faible fréquence.",
  },
  {
    id: "niacinamide_vitc_myth",
    a: "niacinamide",
    b: "vitamin_c",
    severity: "note",
    headline: "Mythe : cette combinaison est en réalité sûre",
    reason: "La croyance que niacinamide + vitamine C forment un complexe inefficace vient d'études anciennes à très haute température, non représentatives d'une routine réelle.",
    recommendation: "Tu peux les utiliser ensemble sans problème. Si ta peau réagit, ce n'est pas cette combinaison qui est en cause — regarde plutôt la concentration.",
  },
  {
    id: "peptides_aha",
    a: "peptides",
    b: "aha",
    severity: "space_out",
    headline: "Le pH acide peut désactiver certains peptides",
    reason: "Beaucoup de peptides fonctionnent mieux à pH neutre ; un exfoliant acide appliqué juste avant peut réduire leur efficacité.",
    recommendation: "Applique les peptides à un autre moment (routine du matin, ou une couche après rinçage/neutralisation du pH).",
  },
  {
    id: "spf_am_only",
    a: "spf",
    b: "retinol",
    severity: "note",
    headline: "Le rétinol augmente la photosensibilité",
    reason: "Le rétinol rend la peau plus sensible aux UV. Comme il s'utilise le soir, le vrai enjeu est ton SPF du lendemain matin.",
    recommendation: "Aucune application le même soir à gérer — assure-toi juste d'appliquer un SPF le matin après une soirée rétinol.",
  },
];

export type ProductCategory =
  | "cleanser"
  | "toner"
  | "essence"
  | "serum"
  | "spot"
  | "eye"
  | "moisturizer"
  | "oil"
  | "sunscreen";

export const CATEGORY_ORDER: Record<ProductCategory, number> = {
  cleanser: 0,
  toner: 10,
  essence: 15,
  serum: 20,
  spot: 50,
  eye: 60,
  moisturizer: 70,
  oil: 80,
  sunscreen: 90,
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  cleanser: "Nettoyant",
  toner: "Toner",
  essence: "Essence",
  serum: "Sérum",
  spot: "Soin ciblé",
  eye: "Contour des yeux",
  moisturizer: "Crème",
  oil: "Huile",
  sunscreen: "SPF",
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  ingredientIds: string[];
  image?: string;
};

export const DEMO_SHELF: Product[] = [
  { id: "p1", name: "Advanced Snail Mucin Essence", brand: "COSRX", category: "essence", ingredientIds: ["niacinamide", "hyaluronic_acid", "centella"] },
  { id: "p2", name: "Vitamin C 23 Serum", brand: "Round Lab", category: "serum", ingredientIds: ["vitamin_c", "vitamin_e"] },
  { id: "p3", name: "Retinol 0.3% Night Treatment", brand: "Some By Mi", category: "serum", ingredientIds: ["retinol", "peptides"] },
  { id: "p4", name: "BHA Blackhead Power Liquid", brand: "COSRX", category: "toner", ingredientIds: ["bha"] },
  { id: "p5", name: "Glycolic Acid 7% Toning Solution", brand: "Beauty of Joseon", category: "toner", ingredientIds: ["aha"] },
  { id: "p6", name: "Rice + Probiotic Barrier Cream", brand: "Beauty of Joseon", category: "moisturizer", ingredientIds: ["ceramides", "centella"] },
  { id: "p7", name: "Relief Sun Rice + Probiotics SPF50+", brand: "Beauty of Joseon", category: "sunscreen", ingredientIds: ["spf"] },
  { id: "p8", name: "Acne Spot Gel 5%", brand: "La Roche-Posay", category: "spot", ingredientIds: ["benzoyl_peroxide"] },
];

export function findIngredient(id: string): Ingredient | undefined {
  return INGREDIENTS.find((i) => i.id === id);
}
