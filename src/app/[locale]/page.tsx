import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { BeautyNews } from "@/components/marketing/beauty-news";
import { IngredientBase } from "@/components/marketing/ingredient-base";
import { FinalCta } from "@/components/marketing/final-cta";
import { db } from "@/lib/db";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const newsItems = await db.newsItem.findMany({
    orderBy: { publishedAt: "desc" },
    take: 12,
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeatureShowcase />
        <BeautyNews items={newsItems} />
        <IngredientBase />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
