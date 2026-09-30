import { getLocale, getTranslations } from "next-intl/server";
import { Check, FileText, ScanFace, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasPremiumAccess } from "@/lib/entitlements";
import { ManageBillingButton } from "@/components/manage-billing-button";
import { HaruPremiumPlan } from "@/components/haru-premium-plan";

export default async function UpgradePage() {
  const t = await getTranslations("upgradePage");
  const locale = await getLocale();
  const session = await auth();

  const user = session?.user?.id
    ? await db.user.findUnique({
        where: { id: session.user.id },
        select: { role: true, subscriptionStatus: true, stripeCustomerId: true },
      })
    : null;

  const isPremium = hasPremiumAccess(user);
  const freeFeatures = t.raw("freeFeatures") as string[];
  const premiumFeatures = t.raw("premiumFeatures") as string[];
  const highlights = [
    { icon: ShieldCheck, title: t("auditIncluded"), text: t("auditText") },
    { icon: FileText, title: t("reportIncluded"), text: t("reportText") },
    { icon: ScanFace, title: t("trackingIncluded"), text: t("trackingText") },
    { icon: Sparkles, title: t("wellnessIncluded"), text: t("wellnessText") },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-24">
      <div className="grid gap-5 text-foreground lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{t("heroTitle")}</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">{t("heroText")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {highlights.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="gap-3 bg-white/[0.025] p-5">
            <Icon className="size-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{text}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="gap-5 bg-white/[0.025] p-6">
          <div>
            <h2 className="font-serif text-2xl text-foreground">{t("freeTitle")}</h2>
          <p className="mt-1 font-serif text-3xl text-foreground">{t("freePrice")}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("freeNote")}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                {f}
              </li>
            ))}
          </ul>
          {!isPremium && (
            <Badge variant="secondary" className="w-fit bg-white/10 text-foreground">
              {t("currentPlanLabel")}
            </Badge>
          )}
        </Card>

        <Card className="gap-5 border-border bg-transparent p-0">
          {isPremium ? (
            <div className="flex items-center gap-2">
              <Badge className="w-fit bg-white text-black">{t("currentPlanLabel")}</Badge>
              {user?.stripeCustomerId && <ManageBillingButton label={t("manageBilling")} />}
            </div>
          ) : (
            <HaruPremiumPlan checkout signedIn={!!session?.user} />
          )}
        </Card>
      </div>
    </div>
  );
}
