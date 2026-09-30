import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { SkinGoalsShowcase } from "@/components/marketing/skin-goals-showcase";
import { StartHere } from "@/components/marketing/start-here";
import { ScanShowcase } from "@/components/marketing/scan-showcase";
import { AuditShowcase } from "@/components/marketing/audit-showcase";
import { WellnessShowcase } from "@/components/marketing/wellness-showcase";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SubscriptionPreview } from "@/components/marketing/subscription-preview";
import { ProductDecoder } from "@/components/marketing/product-decoder";
import { KBeautyRoutineBuilder } from "@/components/marketing/kbeauty-routine-builder";
import { BeautyNews } from "@/components/marketing/beauty-news";
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
      barcode: null,
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
  // Prefer products that actually carry a real (official) product photo so the
  // home strips are full of genuine imagery, not category swatches.
  const withImage = { imageUrl: { startsWith: "http" } };
  const routineSlugs = [
    "round-lab-birch-juice-moisturizing-cleanser",
    "cosrx-advanced-snail-96-mucin-power-essence",
    "skin1004-madagascar-centella-ampoule",
    "beauty-of-joseon-relief-sun",
    "cosrx-low-ph-good-morning-gel-cleanser",
    "round-lab-1025-dokdo-toner",
    "cosrx-bha-blackhead-power-liquid",
    "round-lab-birch-juice-moisturizing-sun-cream-spf50",
    "beauty-of-joseon-green-plum-refreshing-toner",
    "round-lab-vita-niacinamide-dark-spot-serum",
    "beauty-of-joseon-glow-serum-propolis-niacinamide",
  ];
  const [latest, madeInKorea, routinePicks] = await Promise.all([
    db.product
      .findMany({ where: withImage, orderBy: { createdAt: "desc" }, take: 12 })
      .catch(() => []),
    db.product
      .findMany({
        where: { origin: "South Korea", ...withImage },
        orderBy: { featured: "desc" },
        take: 12,
      })
      .catch(() => []),
    db.product.findMany({ where: { slug: { in: routineSlugs } } }).catch(() => []),
  ]);

  return {
    latest: latest.length ? latest : fallbackProducts(),
    madeInKorea: madeInKorea.length
      ? madeInKorea
      : fallbackProducts((product) => product.origin === "South Korea"),
    routinePicks: routinePicks.length
      ? routinePicks
      : fallbackProducts((product) => routineSlugs.includes(product.slug)),
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

  return (
    <div className="haru-public flex flex-1 flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <ProductDecoder />
        <SubscriptionPreview />
        <WellnessShowcase />
        <SkinGoalsShowcase />
        <StartHere />
        <ScanShowcase />
        <AuditShowcase />
        <Suspense fallback={<div className="h-[48rem]" aria-busy="true" />}><HomeRoutineBuilder /></Suspense>
        <Suspense fallback={<div className="mx-auto h-80 max-w-6xl rounded-3xl" aria-busy="true" />}><HomeProducts /></Suspense>
        <Suspense fallback={null}><HomeNews /></Suspense>
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

async function HomeProducts() {
  const products = await getHomeProducts();
  return <ProductShowcase latest={products.latest} madeInKorea={products.madeInKorea} />;
}

async function HomeRoutineBuilder() {
  const products = await getHomeProducts();
  return <KBeautyRoutineBuilder products={products.routinePicks} />;
}

async function HomeNews() {
  return <BeautyNews items={await getRecentNews(24)} />;
}
