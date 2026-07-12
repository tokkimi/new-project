import { db } from "@/lib/db";

/** News published in roughly the last two weeks, newest first — for the home carousel. */
export async function getRecentNews(limit: number) {
  const cutoff = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  return db.newsItem.findMany({
    where: { publishedAt: { gte: cutoff } },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}
