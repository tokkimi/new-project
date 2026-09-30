import { Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { HaruPremiumPlan } from "@/components/haru-premium-plan";

export function SubscriptionPreview() {
  const t = useTranslations("upgradePage");
  return (
    <section className="border-y border-border/70 bg-[#080707] py-20 text-foreground sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-7 px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-primary"><Crown className="size-4" /> {t("kicker")}</div>
          <h2 className="text-balance font-serif text-3xl font-medium tracking-tight sm:text-4xl">{t("heroTitle")}</h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{t("heroText")}</p>
        </div>
        <HaruPremiumPlan />
      </div>
    </section>
  );
}
