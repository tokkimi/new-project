import bcrypt from "bcryptjs";
import type { PrismaClient } from "@/generated/prisma/client";
import { PRODUCTS } from "@/lib/seed-data/products";
import { NEWS } from "@/lib/seed-data/news";

export async function seedProducts(db: PrismaClient): Promise<number> {
  for (const p of PRODUCTS) {
    await db.product.upsert({
      where: { slug: p.slug },
      create: { ...p },
      update: { ...p },
    });
  }
  return PRODUCTS.length;
}

export async function seedNews(db: PrismaClient): Promise<number> {
  for (const item of NEWS) {
    const existing = await db.newsItem.findFirst({ where: { title: item.title } });
    if (existing) {
      await db.newsItem.update({
        where: { id: existing.id },
        data: { ...item, publishedAt: new Date(item.publishedAt) },
      });
    } else {
      await db.newsItem.create({ data: { ...item, publishedAt: new Date(item.publishedAt) } });
    }
  }
  return NEWS.length;
}

const ADMIN_EMAIL = "admin@haru.app";
const ADMIN_PASSWORD = "HaruAdmin!2026";
const PREMIUM_EMAIL = "premium-tester@haru.app";
const PREMIUM_PASSWORD = "HaruPremium!2026";

export async function seedTestAccounts(db: PrismaClient) {
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      name: "Haru Admin",
      passwordHash: adminHash,
      role: "ADMIN",
    },
    update: { passwordHash: adminHash, role: "ADMIN" },
  });

  const premiumHash = await bcrypt.hash(PREMIUM_PASSWORD, 12);
  const premiumUser = await db.user.upsert({
    where: { email: PREMIUM_EMAIL },
    create: {
      email: PREMIUM_EMAIL,
      name: "Premium Tester",
      passwordHash: premiumHash,
      role: "USER",
      subscriptionStatus: "ACTIVE",
    },
    update: { passwordHash: premiumHash, subscriptionStatus: "ACTIVE" },
  });

  await db.skinProfile.upsert({
    where: { userId: premiumUser.id },
    create: {
      userId: premiumUser.id,
      skinType: "combination",
      concerns: ["acne", "dullness", "pores"],
      ageRange: "20s",
      sensitivities: ["fragrance"],
      climate: "humid",
      goals: [],
      budget: "mid",
    },
    update: {},
  });

  // Give the premium tester a starter shelf pulled from featured products,
  // so the routine/audit/scan flows all have something to show immediately.
  const featured = await db.product.findMany({ where: { featured: true }, take: 6 });
  for (const product of featured) {
    await db.shelfItem.upsert({
      where: { userId_productId: { userId: premiumUser.id, productId: product.id } },
      create: { userId: premiumUser.id, productId: product.id },
      update: {},
    });
  }

  return {
    adminEmail: ADMIN_EMAIL,
    premiumEmail: PREMIUM_EMAIL,
    premiumShelfItems: featured.length,
  };
}
