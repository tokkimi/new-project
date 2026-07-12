import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  seedBrands,
  seedCategories,
  seedCompatibilityRules,
  seedIngredients,
  seedProductIngredients,
  seedProducts,
  seedProductSources,
} from "../src/lib/seed-runner";

const connectionString =
  process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  const categories = await seedCategories(db);
  const products = await seedProducts(db);
  const ingredients = await seedIngredients(db);
  const compatibilityRules = await seedCompatibilityRules(db);
  const productIngredients = await seedProductIngredients(db);
  const brands = await seedBrands(db);
  const sources = await seedProductSources(db);
  console.log(
    `Seeded ${categories} categories, ${products} products, ${ingredients} ingredients, ` +
      `${compatibilityRules} compatibility rules, ${productIngredients} product-ingredient links, ` +
      `${brands} brands, and ${sources} product sources.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
