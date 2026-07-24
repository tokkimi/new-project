import { CONFLICT_RULES, type ConflictRule } from "@/data/ingredients";
import type { Product } from "@/generated/prisma/client";

export type ScanConflict = { rule: ConflictRule; shelfProduct: Product };

/**
 * Pairwise conflicts between a set of detected actives (e.g. read off a label by
 * OCR when the product isn't in the catalog) and the actives already on the
 * shelf. Deliberately simpler than the slot-aware routine engine: for an
 * unrecognised product we don't know its AM/PM placement, so we only make the
 * honest claim "you have two actives that don't mix well." Callers should pair
 * this with an OCR-can-misread disclaimer.
 */
export function conflictsForDetected(
  detectedIds: string[],
  shelf: Product[]
): ScanConflict[] {
  const detected = new Set(detectedIds);
  const out: ScanConflict[] = [];
  const seen = new Set<string>();

  for (const rule of CONFLICT_RULES) {
    const detectedHasA = detected.has(rule.a);
    const detectedHasB = detected.has(rule.b);
    if (!detectedHasA && !detectedHasB) continue;

    for (const product of shelf) {
      const ids = new Set(product.ingredientIds);
      const conflicts =
        (detectedHasA && ids.has(rule.b)) || (detectedHasB && ids.has(rule.a));
      if (!conflicts) continue;

      const key = `${rule.id}:${product.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ rule, shelfProduct: product });
    }
  }

  return out;
}
