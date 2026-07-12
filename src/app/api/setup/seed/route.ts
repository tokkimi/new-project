import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import {
  seedProducts,
  seedNews,
  seedTestAccounts,
  seedCategories,
  seedBrands,
  seedProductSources,
  seedIngredients,
  seedCompatibilityRules,
  seedProductIngredients,
} from "@/lib/seed-runner";

/**
 * One-time-use setup endpoint to populate a freshly connected production
 * database without ever exposing DATABASE_URL to anyone outside Vercel.
 * Protected by SEED_SECRET (an env var the operator sets themselves) rather
 * than a user session, since the very first run happens before any user —
 * including the admin account — exists in the database.
 */
export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "setup-seed"), { limit: 5, windowMs: 60 * 1000 });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "SEED_SECRET is not configured" }, { status: 500 });
  }

  const token = new URL(request.url).searchParams.get("token");
  if (!token || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const categories = await seedCategories(db);
  const products = await seedProducts(db);
  const ingredients = await seedIngredients(db);
  const compatibilityRules = await seedCompatibilityRules(db);
  const productIngredients = await seedProductIngredients(db);
  const brands = await seedBrands(db);
  const sources = await seedProductSources(db);
  const news = await seedNews(db);
  const accounts = await seedTestAccounts(db);

  return NextResponse.json({
    ok: true,
    categories,
    products,
    ingredients,
    compatibilityRules,
    productIngredients,
    brands,
    sources,
    news,
    accounts,
  });
}
