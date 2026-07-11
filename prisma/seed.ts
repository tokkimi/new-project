import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedProducts } from "../src/lib/seed-runner";

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

seedProducts(db)
  .then((count) => console.log(`Seeded ${count} products.`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
