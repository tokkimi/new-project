import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const ADMIN_EMAIL = "admin@haru.app";
const ADMIN_PASSWORD = "HaruAdmin!2026";

const PREMIUM_EMAIL = "premium-tester@haru.app";
const PREMIUM_PASSWORD = "HaruPremium!2026";

async function main() {
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
  console.log(`Admin account ready: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);

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

  console.log(`Premium test account ready: ${PREMIUM_EMAIL} / ${PREMIUM_PASSWORD}`);
  console.log(`  - subscriptionStatus: ACTIVE, skin profile filled, ${featured.length} shelf items seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
