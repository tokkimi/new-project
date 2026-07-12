import { db } from "@/lib/db";
import { NEWS } from "@/lib/seed-data/news";

/** News published in roughly the last two weeks, newest first. */
export async function getRecentNews(limit: number) {
  const cutoff = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  const fallback = NEWS.filter((item) => new Date(item.publishedAt) >= cutoff)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit)
    .map((item) => ({
      id: `seed-${item.publishedAt}-${item.title}`,
      category: item.category,
      title: item.title,
      summary: item.summary,
      sourceName: item.sourceName,
      sourceUrl: item.sourceUrl ?? null,
      imageUrl: item.imageUrl ?? null,
      featured: false,
      publishedAt: new Date(item.publishedAt),
      createdAt: new Date(item.publishedAt),
      updatedAt: new Date(item.publishedAt),
    }));

  const rows = await db.newsItem
    .findMany({
      where: { publishedAt: { gte: cutoff } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    })
    .catch(() => []);
  const byTitle = new Map([...fallback, ...rows].map((item) => [item.title, item]));
  return [...byTitle.values()]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}
