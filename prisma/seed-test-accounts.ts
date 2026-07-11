import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedTestAccounts } from "../src/lib/seed-runner";

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

seedTestAccounts(db)
  .then(({ adminEmail, premiumEmail, premiumShelfItems }) => {
    console.log(`Admin account ready: ${adminEmail}`);
    console.log(`Premium test account ready: ${premiumEmail}`);
    console.log(`  - subscriptionStatus: ACTIVE, skin profile filled, ${premiumShelfItems} shelf items seeded`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
