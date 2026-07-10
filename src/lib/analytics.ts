import { db } from "@/lib/db";

export async function getDashboardStats() {
  const now = new Date();
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    newUsersThisWeek,
    premiumUsers,
    totalProducts,
    totalNews,
    totalShelfItems,
    newsletterSubscribers,
    eventCounts,
    recentUsers,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    db.user.count({ where: { subscriptionStatus: { in: ["ACTIVE", "TRIALING"] } } }),
    db.product.count(),
    db.newsItem.count(),
    db.shelfItem.count(),
    db.newsletterSubscriber.count(),
    db.event.groupBy({
      by: ["type"],
      _count: { type: true },
      where: { createdAt: { gte: fourteenDaysAgo } },
    }),
    db.user.findMany({
      where: { createdAt: { gte: fourteenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const dayBuckets: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = day.toISOString().slice(0, 10);
    dayBuckets.push({ date: key, count: 0 });
  }
  for (const u of recentUsers) {
    const key = u.createdAt.toISOString().slice(0, 10);
    const bucket = dayBuckets.find((b) => b.date === key);
    if (bucket) bucket.count += 1;
  }

  const eventMap = Object.fromEntries(eventCounts.map((e) => [e.type, e._count.type]));

  return {
    totalUsers,
    newUsersThisWeek,
    premiumUsers,
    totalProducts,
    totalNews,
    totalShelfItems,
    newsletterSubscribers,
    signupsByDay: dayBuckets,
    events: {
      pageViews: eventMap["page_view"] ?? 0,
      scansCompleted: eventMap["scan_completed"] ?? 0,
      routinesBuilt: eventMap["routine_built"] ?? 0,
      auditsRun: eventMap["audit_run"] ?? 0,
      shelfItemsAdded: eventMap["shelf_item_added"] ?? 0,
      checkoutsStarted: eventMap["checkout_started"] ?? 0,
    },
  };
}
