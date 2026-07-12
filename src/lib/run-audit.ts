import { db } from "@/lib/db";
import { auditRoutine, type AuditResult } from "@/lib/audit-engine";

/**
 * Scopes the catalog fetch to the shelf's own categories with a lean field
 * select — the full unfiltered catalog (12k+ rows, every column) used to be
 * fetched on every audit render, which is what made the page unusably slow.
 */
export async function runUserAudit(userId: string): Promise<AuditResult> {
  const [profile, shelfItems] = await Promise.all([
    db.skinProfile.findUnique({ where: { userId } }),
    db.shelfItem.findMany({ where: { userId }, include: { product: true } }),
  ]);

  const shelf = shelfItems.map((i) => i.product);
  const shelfCategories = Array.from(new Set(shelf.map((p) => p.category)));

  const catalog = shelfCategories.length
    ? await db.product.findMany({
        where: { category: { in: shelfCategories } },
        select: { id: true, slug: true, name: true, brand: true, category: true, skinTypes: true, concerns: true },
      })
    : [];

  return auditRoutine(
    shelf,
    catalog,
    profile
      ? { skinType: profile.skinType, concerns: profile.concerns, sensitivities: profile.sensitivities }
      : null
  );
}
