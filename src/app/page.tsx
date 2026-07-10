import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { IngredientBase } from "@/components/marketing/ingredient-base";
import { FinalCta } from "@/components/marketing/final-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeatureShowcase />
        <IngredientBase />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
