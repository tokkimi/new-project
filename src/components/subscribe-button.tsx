"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { SubscriptionPlan } from "@/lib/subscription-plans";

export function SubscribeButton({ subscribeLabel, comingSoonLabel, signedIn, plan = "monthly" }: {
  subscribeLabel: string; comingSoonLabel: string; signedIn: boolean; plan?: SubscriptionPlan;
}) {
  const locale = useLocale();
  const t = useTranslations("upgradePage");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!signedIn) return <Button asChild size="lg"><Link href={`/sign-in?callbackUrl=${encodeURIComponent(`/${locale}/app/upgrade`)}`}>{subscribeLabel}</Link></Button>;
  const checkout = async () => {
    setLoading(true); setFailed(false);
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, locale }) });
      if (!response.ok) throw new Error("checkout");
      const data = await response.json();
      if (!data.url) throw new Error("checkout");
      window.location.assign(data.url);
    } catch { setFailed(true); } finally { setLoading(false); }
  };
  return <div className="flex flex-col gap-2"><Button size="lg" onClick={checkout} disabled={loading} aria-busy={loading}>{loading ? t("checkoutLoading") : subscribeLabel}</Button>{failed && <p role="alert" className="text-xs text-destructive">{comingSoonLabel}</p>}</div>;
}
