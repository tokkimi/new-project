"use client";

import * as React from "react";
import { Check, Crown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { subscriptionPrice, type SubscriptionPlan } from "@/lib/subscription-plans";
import { SubscribeButton } from "@/components/subscribe-button";

export function HaruPremiumPlan({ checkout = false, signedIn = false }: { checkout?: boolean; signedIn?: boolean }) {
  const t = useTranslations("upgradePage");
  const locale = useLocale();
  const [plan, setPlan] = React.useState<SubscriptionPlan>("monthly");
  const features = t.raw("premiumFeatures") as string[];

  return (
    <Card className="w-full gap-0 overflow-hidden rounded-[1.35rem] border-white/18 bg-white/[0.055] p-0 shadow-[0_24px_70px_-46px_rgba(0,0,0,.95)]">
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs text-muted-foreground">{t("kicker")}</p><h2 className="mt-1 font-serif text-2xl text-foreground">{t("premiumTitle")}</h2></div>
          <Crown className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div role="group" aria-label={t("premiumTitle")} className="flex items-center gap-1 rounded-full border border-border bg-black/15 p-1">
          {(["monthly", "annual"] as const).map((value) => <button key={value} type="button" onClick={() => setPlan(value)} aria-pressed={plan === value} className={cn("flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition-colors", plan === value ? "bg-white/12 text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {t(value)} {value === "annual" && <Badge className="border-0 bg-primary px-1.5 py-0 text-[9px] text-primary-foreground">-58%</Badge>}
          </button>)}
        </div>
        <div className="flex items-baseline gap-1.5"><span className="font-serif text-4xl text-foreground">{subscriptionPrice(plan, locale)}</span><span className="text-xs text-muted-foreground">{t(`${plan}Period`)}</span></div>
        <p className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">{t(`${plan}Billing`)}</p>
        <ul className="grid gap-2.5">{features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm leading-5"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />{feature}</li>)}</ul>
      </div>
      <div className="border-t border-border bg-white/[0.025] p-5 sm:p-6">
        {checkout ? <SubscribeButton plan={plan} signedIn={signedIn} subscribeLabel={t("choosePlan")} comingSoonLabel={t("checkoutError")} /> : <Link href="/app/upgrade" className="haru-cta w-full">{t("subscribeCta")}</Link>}
        <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">{t("ctaText")}</p>
      </div>
    </Card>
  );
}
