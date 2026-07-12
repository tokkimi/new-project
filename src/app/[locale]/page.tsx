import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { AuditShowcase } from "@/components/marketing/audit-showcase";
import { WellnessShowcase } from "@/components/marketing/wellness-showcase";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { BeautyNews } from "@/components/marketing/beauty-news";
import { GoodHabits } from "@/components/marketing/good-habits";
import { FinalCta } from "@/components/marketing/final-cta";
import { db } from "@/lib/db";
import { getRecentNews } from "@/lib/news-queries";
import { getSeoMetadata } from "@/lib/seo";
import { PRODUCTS } from "@/lib/seed-data/products";
import type { Product } from "@/generated/prisma/client";

const FALLBACK_DATE = new Date("2027-01-01T00:00:00.000Z");

function fallbackProducts(filter?: (product: (typeof PRODUCTS)[number]) => boolean): Product[] {
  return PRODUCTS.filter(filter ?? (() => true))
    .slice(0, 10)
    .map((product) => ({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      ingredientIds: product.ingredientIds,
      fullIngredients: product.fullIngredients,
      origin: product.origin,
      description: product.description,
      usageSteps: product.usageSteps,
      imageUrl: product.imageUrl ?? null,
      officialUrl: product.officialUrl ?? null,
      price: product.price,
      currency: product.currency,
      skinTypes: product.skinTypes,
      concerns: product.concerns,
      featured: product.featured ?? false,
      createdAt: FALLBACK_DATE,
      updatedAt: FALLBACK_DATE,
      brandId: null,
    }));
}

async function getHomeProducts() {
  const [latest, madeInKorea] = await Promise.all([
    db.product.findMany({ orderBy: { createdAt: "desc" }, take: 10 }).catch(() => []),
    db.product.findMany({ where: { origin: "South Korea" }, take: 10 }).catch(() => []),
  ]);

  return {
    latest: latest.length ? latest : fallbackProducts(),
    madeInKorea: madeInKorea.length
      ? madeInKorea
      : fallbackProducts((product) => product.origin === "South Korea"),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return getSeoMetadata("/", locale, { title: t("title"), description: t("description") });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [newsItems, products] = await Promise.all([getRecentNews(24), getHomeProducts()]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <AuditShowcase />
        <WellnessShowcase />
        <ProductShowcase latest={products.latest} madeInKorea={products.madeInKorea} />
        <GoodHabits />
        <BeautyNews items={newsItems} />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
