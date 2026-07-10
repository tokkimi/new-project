import { CONFLICT_RULES, INGREDIENTS, type ConflictRule, type TimeSlot, findIngredient } from "@/data/ingredients";
import { categoryOrder } from "@/lib/categories";
import type { Product } from "@/generated/prisma/client";

export type RoutineStep = {
  product: Product;
  order: number;
};

export type RoutineWarning = {
  rule: ConflictRule;
  productA: Product;
  productB: Product;
};

export type RoutineResult = {
  am: RoutineStep[];
  pm: RoutineStep[];
  warnings: RoutineWarning[];
  duplicateActives: { ingredientId: string; products: Product[] }[];
};

function productActives(product: Product): string[] {
  return product.ingredientIds.filter((id) =>
    INGREDIENTS.some((ing) => ing.id === id)
  );
}

/**
 * A single "am" or "pm" active makes the whole product time-restricted, even if it
 * also contains "both" actives (e.g. a vitamin C + vitamin E serum stays AM-only —
 * the antioxidant-for-daytime-protection use case drives it, not the flexible one).
 */
function productSlots(product: Product): TimeSlot[] {
  const actives = productActives(product);
  const strictPrefs = new Set(
    actives
      .map((id) => findIngredient(id)?.timePref)
      .filter((tp): tp is "am" | "pm" => tp === "am" || tp === "pm")
  );
  if (strictPrefs.size > 0) return Array.from(strictPrefs);
  return ["am", "pm"];
}

function buildSlot(products: Product[], slot: TimeSlot): RoutineStep[] {
  return products
    .filter((p) => productSlots(p).includes(slot))
    .map((p) => {
      const actives = productActives(p);
      const maxWeight = actives.length
        ? Math.max(...actives.map((id) => findIngredient(id)?.layerWeight ?? 0))
        : 0;
      const order = categoryOrder(p.category) + maxWeight / 100;
      return { product: p, order };
    })
    .sort((a, b) => a.order - b.order);
}

function findConflicts(products: Product[], slot: TimeSlot): RoutineWarning[] {
  const inSlot = buildSlot(products, slot).map((s) => s.product);
  const warnings: RoutineWarning[] = [];

  for (const rule of CONFLICT_RULES) {
    const productsWithA = inSlot.filter((p) => p.ingredientIds.includes(rule.a));
    const productsWithB = inSlot.filter((p) => p.ingredientIds.includes(rule.b));
    if (productsWithA.length && productsWithB.length) {
      for (const pa of productsWithA) {
        for (const pb of productsWithB) {
          if (pa.id === pb.id) continue;
          warnings.push({ rule, productA: pa, productB: pb });
        }
      }
    }
  }
  return warnings;
}

function findDuplicates(products: Product[]) {
  const byIngredient = new Map<string, Product[]>();
  for (const p of products) {
    for (const id of productActives(p)) {
      const ing = findIngredient(id);
      // Only flag "hero" actives as duplicates worth mentioning, not hydrators.
      if (!ing || ing.layerWeight < 20) continue;
      const list = byIngredient.get(id) ?? [];
      list.push(p);
      byIngredient.set(id, list);
    }
  }
  return Array.from(byIngredient.entries())
    .filter(([, products]) => products.length > 1)
    .map(([ingredientId, products]) => ({ ingredientId, products }));
}

export function buildRoutine(products: Product[]): RoutineResult {
  const am = buildSlot(products, "am");
  const pm = buildSlot(products, "pm");

  const amWarnings = findConflicts(products, "am");
  const pmWarnings = findConflicts(products, "pm");

  // De-duplicate warnings that appear identically in both slots.
  const seen = new Set<string>();
  const warnings = [...amWarnings, ...pmWarnings].filter((w) => {
    const key = `${w.rule.id}-${[w.productA.id, w.productB.id].sort().join("-")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    am,
    pm,
    warnings,
    duplicateActives: findDuplicates(products),
  };
}

/** Warnings that a candidate product would introduce if added to an existing shelf. */
export function previewAddConflicts(candidate: Product, shelf: Product[]): RoutineWarning[] {
  if (shelf.some((p) => p.id === candidate.id)) return [];
  const withCandidate = buildRoutine([...shelf, candidate]).warnings;
  return withCandidate.filter(
    (w) => w.productA.id === candidate.id || w.productB.id === candidate.id
  );
}

export function severityTone(severity: ConflictRule["severity"]) {
  switch (severity) {
    case "avoid":
      return "destructive" as const;
    case "space_out":
    case "sequence":
      return "warning" as const;
    case "note":
      return "success" as const;
  }
}
