import { db } from "@/lib/db";

/** Markets we model a formulation for. Codes match ProductMarketFormula.market. */
export const MARKETS = ["KR", "EU", "US", "JP"] as const;
export type Market = (typeof MARKETS)[number];

export type MarketFormula = {
  market: string;
  inciText: string;
  sourceName: string | null;
  sourceUrl: string | null;
};

/**
 * Verified market-specific formulations for a product. Returns [] when we have
 * none (the common case) or if the DB is unavailable — the product page then
 * falls back to the general INCI. Never fabricates a variant.
 */
export async function findMarketFormulas(productId: string): Promise<MarketFormula[]> {
  try {
    const rows = await db.productMarketFormula.findMany({
      where: { productId },
      orderBy: { market: "asc" },
      select: { market: true, inciText: true, sourceName: true, sourceUrl: true },
    });
    return rows;
  } catch {
    return [];
  }
}
