export type ExpiryStatus = "none" | "ok" | "soon" | "expired";

export type ShelfCareItem = {
  productId: string;
  name: string;
  category: string;
  concerns: string[];
  price: number | null;
  currency: string | null;
  openedAt: string | null;
  paoMonths: number | null;
};

/** Days within which an opened product counts as "expiring soon". */
const SOON_DAYS = 30;

export function expiryDate(openedAt: string | null, paoMonths: number | null): Date | null {
  if (!openedAt || !paoMonths) return null;
  const d = new Date(openedAt);
  if (Number.isNaN(d.getTime())) return null;
  d.setMonth(d.getMonth() + paoMonths);
  return d;
}

export function expiryStatus(openedAt: string | null, paoMonths: number | null): ExpiryStatus {
  const end = expiryDate(openedAt, paoMonths);
  if (!end) return "none";
  const msLeft = end.getTime() - Date.now();
  if (msLeft <= 0) return "expired";
  if (msLeft <= SOON_DAYS * 24 * 60 * 60 * 1000) return "soon";
  return "ok";
}

export type DuplicateCluster = {
  category: string;
  concern: string;
  productIds: string[];
};

/**
 * Groups shelf products that plausibly do the same job: same category AND a
 * shared concern. Surfaces "you have several products doing a similar thing"
 * so the user can finish one before opening another — an honest nudge, not a
 * claim that any product is redundant.
 */
export function findNearDuplicates(items: ShelfCareItem[]): DuplicateCluster[] {
  const byKey = new Map<string, Set<string>>();
  for (const item of items) {
    for (const concern of item.concerns) {
      const key = `${item.category}::${concern}`;
      if (!byKey.has(key)) byKey.set(key, new Set());
      byKey.get(key)!.add(item.productId);
    }
  }
  const clusters: DuplicateCluster[] = [];
  for (const [key, ids] of byKey) {
    if (ids.size >= 2) {
      const [category, concern] = key.split("::");
      clusters.push({ category, concern, productIds: Array.from(ids) });
    }
  }
  // Largest clusters first; de-dupe so one product pair isn't reported twice
  // for two shared concerns by keeping only the biggest cluster per category.
  const seenCategory = new Set<string>();
  return clusters
    .sort((a, b) => b.productIds.length - a.productIds.length)
    .filter((c) => {
      if (seenCategory.has(c.category)) return false;
      seenCategory.add(c.category);
      return true;
    });
}

export function shelfValueByCurrency(items: ShelfCareItem[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const item of items) {
    if (typeof item.price === "number" && item.price > 0 && item.currency) {
      totals[item.currency] = (totals[item.currency] ?? 0) + item.price;
    }
  }
  return totals;
}
