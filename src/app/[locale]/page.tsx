import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { BeautyNews } from "@/components/marketing/beauty-news";
import { IngredientBase } from "@/components/marketing/ingredient-base";
import { FinalCta } from "@/components/marketing/final-cta";
import { db } from "@/lib/db";
import { getSeoMetadata } from "@/lib/seo";

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

  const [newsItems, latestProducts, koreanProducts] = await Promise.all([
    db.newsItem.findMany({ orderBy: { publishedAt: "desc" }, take: 50 }),
    db.product.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    db.product.findMany({ where: { origin: "South Korea" }, take: 10 }),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ProductShowcase latest={latestProducts} madeInKorea={koreanProducts} />
        <FeatureShowcase />
        <BeautyNews items={newsItems} />
        <IngredientBase />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
