import { getTranslations } from "next-intl/server";
import { AlertTriangle, Sparkles, ArrowRight, Wand2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasPremiumAccess } from "@/lib/entitlements";
import { auditRoutine } from "@/lib/audit-engine";

export default async function AuditPage() {
  const t = await getTranslations("auditPage");
  const tCategories = await getTranslations("categories");
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("signInPrompt")}</p>
        <Button asChild>
          <Link href="/sign-in">{t("signInPrompt")}</Link>
        </Button>
      </Card>
    );
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, subscriptionStatus: true },
  });

  if (!hasPremiumAccess(user)) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-6" />
        </span>
        <h1 className="font-serif text-2xl">{t("upgradeTitle")}</h1>
        <p className="text-muted-foreground">{t("upgradeText")}</p>
        <Button asChild size="lg">
          <Link href="/app/upgrade">{t("upgradeCta")}</Link>
        </Button>
      </Card>
    );
  }

  const profile = await db.skinProfile.findUnique({ where: { userId: session.user.id } });

  if (!profile) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Wand2 className="size-6" />
        </span>
        <h1 className="font-serif text-2xl">{t("needsProfileTitle")}</h1>
        <p className="text-muted-foreground">{t("needsProfileText")}</p>
        <Button asChild size="lg">
          <Link href="/app/quiz">{t("needsProfileCta")}</Link>
        </Button>
      </Card>
    );
  }

  const [shelfItems, catalog] = await Promise.all([
    db.shelfItem.findMany({ where: { userId: session.user.id }, include: { product: true } }),
    db.product.findMany(),
  ]);
  const shelf = shelfItems.map((i) => i.product);

  const result = auditRoutine(shelf, catalog, {
    skinType: profile.skinType,
    concerns: profile.concerns,
    sensitivities: profile.sensitivities,
  });

  const missingSteps = result.issues.filter((i) => i.type === "missing_step");
  const mismatches = result.issues.filter((i) => i.type === "profile_mismatch");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{t("scoreLabel")}</p>
          <p className="font-serif text-2xl">{result.score}/100</p>
        </div>
        <Progress
          value={result.score}
          indicatorClassName={
            result.score >= 70 ? "bg-success" : result.score >= 40 ? "bg-warning" : "bg-destructive"
          }
        />
      </Card>

      {result.issues.length === 0 ? (
        <Card className="items-center gap-2 py-10 text-center">
          <p className="font-medium">{t("noIssuesTitle")}</p>
          <p className="text-sm text-muted-foreground">{t("noIssuesText")}</p>
        </Card>
      ) : (
        <>
          {missingSteps.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-warning" />
                <h2 className="font-serif text-xl">{t("missingStepsTitle")}</h2>
              </div>
              {missingSteps.map((issue) =>
                issue.type === "missing_step" ? (
                  <Card key={issue.step} className="gap-1.5">
                    <p className="font-medium">{t(`missingStep.${issue.step}`)}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(`missingStepHint.${issue.step}`)}
                    </p>
                  </Card>
                ) : null
              )}
            </section>
          )}

          {mismatches.length > 0 && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <h2 className="font-serif text-xl">{t("mismatchTitle")}</h2>
              </div>
              {mismatches.map((issue) =>
                issue.type === "profile_mismatch" ? (
                  <Card key={issue.product.id} className="gap-3">
                    <div>
                      <p className="font-medium">{issue.product.name}</p>
                      <p className="text-sm text-muted-foreground">{issue.product.brand}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("mismatchReason")}</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t("alternativesLabel")}
                      </p>
                      {issue.alternatives.length === 0 ? (
                        <p className="text-sm text-muted-foreground">{t("noAlternatives")}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {issue.alternatives.map((alt) => (
                            <Link key={alt.id} href={`/app/product/${alt.slug}`}>
                              <Badge variant="outline" className="cursor-pointer hover:border-primary/50">
                                {alt.name} · {tCategories(alt.category)}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ) : null
              )}
            </section>
          )}
        </>
      )}

      <Button asChild variant="outline">
        <Link href="/app/profile">
          {t("title")}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
