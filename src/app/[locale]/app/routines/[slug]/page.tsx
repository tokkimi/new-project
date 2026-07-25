import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findGuide, stepsForSlot, type GuideStep } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";

export default async function RoutineGuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = findGuide(slug);

  const [t, tCategories, tIng] = await Promise.all([
    getTranslations("routineGuides"),
    getTranslations("categories"),
    getTranslations("ingredients"),
  ]);

  if (!guide) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">{t("notFound")}</p>
        <Button asChild variant="link">
          <Link href="/app/routines">{t("backTo")}</Link>
        </Button>
      </div>
    );
  }

  const renderStep = (step: GuideStep, i: number) => (
    <li key={`${step.category}-${step.activeId ?? ""}-${i}`} className="flex items-start gap-3">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
        {i + 1}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{tCategories(step.category)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {step.activeId && findIngredient(step.activeId) && (
            <Link href={`/app/ingredient/${step.activeId}`}>
              <Badge className="cursor-pointer transition-opacity hover:opacity-80">
                {tIng(`${step.activeId}.name`)}
              </Badge>
            </Link>
          )}
          <span className="text-xs text-muted-foreground">{t(`freq.${step.freq}`)}</span>
        </div>
      </div>
    </li>
  );

  const am = stepsForSlot(guide, "am");
  const pm = stepsForSlot(guide, "pm");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2">
        <Link href="/app/routines">
          <ArrowLeft className="size-4" />
          {t("backTo")}
        </Link>
      </Button>

      <div>
        <h1 className="text-balance font-serif text-3xl">{t(`guides.${slug}.title`)}</h1>
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">{t("goalLabel")}:</span>{" "}
          {t(`guides.${slug}.goal`)}
        </p>
      </div>

      <Card className="gap-2">
        <h2 className="flex items-center gap-2 font-serif text-lg">
          <Sparkles className="size-4 text-primary" />
          {t("introLabel")}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{t(`guides.${slug}.intro`)}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="gap-3">
          <h2 className="flex items-center gap-2 font-serif text-lg">
            <Sun className="size-4 text-am-foreground" />
            {t("slotAm")}
          </h2>
          <ol className="flex flex-col gap-3">{am.map(renderStep)}</ol>
        </Card>
        <Card className="gap-3">
          <h2 className="flex items-center gap-2 font-serif text-lg">
            <Moon className="size-4 text-primary" />
            {t("slotPm")}
          </h2>
          <ol className="flex flex-col gap-3">{pm.map(renderStep)}</ol>
        </Card>
      </div>

      <Card className="gap-2 border-am/30 bg-am/10">
        <h2 className="font-serif text-lg">{t("keepInMind")}</h2>
        <p className="leading-relaxed text-muted-foreground">{t(`guides.${slug}.keepInMind`)}</p>
      </Card>

      <Card className="flex-row items-center justify-between gap-3 border-primary/25 bg-primary/5">
        <div className="min-w-0">
          <p className="font-medium">{t("buildCta")}</p>
          <p className="text-sm text-muted-foreground">{t("buildCtaSub")}</p>
        </div>
        <Button asChild size="icon" className="shrink-0" aria-label={t("buildCta")}>
          <Link href="/app/routine">
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
