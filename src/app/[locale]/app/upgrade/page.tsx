import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasPremiumAccess } from "@/lib/entitlements";
import { SubscribeButton } from "@/components/subscribe-button";
import { ManageBillingButton } from "@/components/manage-billing-button";

export default async function UpgradePage() {
  const t = await getTranslations("upgradePage");
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

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="text-center">
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="gap-5">
          <div>
            <h2 className="font-serif text-xl">{t("freeTitle")}</h2>
            <p className="mt-1 font-serif text-2xl">{t("freePrice")}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
          {!isPremium && (
            <Badge variant="secondary" className="w-fit">
              {t("currentPlanLabel")}
            </Badge>
          )}
        </Card>

        <Card className="gap-5 border-primary/30 bg-primary/5">
          <div>
            <h2 className="font-serif text-xl">{t("premiumTitle")}</h2>
            <p className="mt-1 font-serif text-2xl">{t("premiumPrice")}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
          {isPremium ? (
            <div className="flex items-center gap-2">
              <Badge className="w-fit">{t("currentPlanLabel")}</Badge>
              {user?.stripeCustomerId && <ManageBillingButton label={t("manageBilling")} />}
            </div>
          ) : (
            <SubscribeButton
              subscribeLabel={t("subscribeCta")}
              comingSoonLabel={t("comingSoon")}
              signedIn={!!session?.user}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
