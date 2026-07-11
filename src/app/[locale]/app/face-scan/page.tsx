import { getTranslations } from "next-intl/server";
import { ShieldCheck, Check, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { canUseFaceScan, hasPremiumAccess } from "@/lib/entitlements";
import { FaceScanClient } from "@/components/face-scan-client";
import { FaceScanPreview } from "@/components/face-scan-preview";
import { BuyScanButton } from "@/components/buy-scan-button";

export default async function FaceScanPage() {
  const t = await getTranslations("faceScanPage");
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("signInPrompt")}</p>
        <Button asChild>
          <Link href="/sign-in">{t("signInCta")}</Link>
        </Button>
      </Card>
    );
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, subscriptionStatus: true, faceScanCredits: true },
  });

  if (canUseFaceScan(user)) {
    return <FaceScanClient />;
  }

  const isPremium = hasPremiumAccess(user);
  const paywallFeatures = t.raw("paywallFeatures") as string[];

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <FaceScanPreview />

      <Card className="w-full items-start gap-3 text-left">
        <ul className="flex w-full flex-col gap-2.5">
          {paywallFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
      </Card>

      {isPremium ? (
        // hasPremiumAccess is true but canUseFaceScan returned false only
        // happens if entitlements/db are momentarily inconsistent — treat
        // as a soft error and point to a refresh rather than a paywall.
        <p className="text-sm text-muted-foreground">{t("premiumGlitchHint")}</p>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1">
            <p className="font-serif text-3xl">{t("scanPrice")}</p>
            <p className="text-xs text-muted-foreground">{t("scanPriceHint")}</p>
          </div>
          <BuyScanButton buyLabel={t("buyCta")} comingSoonLabel={t("comingSoon")} />
          <Button asChild variant="link">
            <Link href="/app/upgrade">
              <Sparkles className="size-3.5" />
              {t("unlimitedWithPremium")}
            </Link>
          </Button>
        </>
      )}

      <p className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-left text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        {t("disclaimer")}
      </p>
    </div>
  );
}
