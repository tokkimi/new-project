import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Moon, Sparkles, Sun } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findGuide, stepsForSlot, type GuideStep } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";

export default async function GuideDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
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
      <><SiteHeader /><main className="mx-auto flex min-h-[60vh] max-w-lg flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-muted-foreground">{t("notFound")}</p>
        <Button asChild variant="link"><Link href="/guides">{t("backTo")}</Link></Button>
      </main><SiteFooter /></>
    );
  }

  const renderStep = (step: GuideStep, index: number) => (
    <li key={`${step.category}-${step.activeId ?? ""}-${index}`} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/65 p-4">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{index + 1}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{tCategories(step.category)}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {step.activeId && findIngredient(step.activeId) && <Badge>{tIng(`${step.activeId}.name`)}</Badge>}
          <span className="text-xs text-muted-foreground">{t(`freq.${step.freq}`)}</span>
        </div>
      </div>
    </li>
  );

  const am = stepsForSlot(guide, "am");
  const pm = stepsForSlot(guide, "pm");

  return (
    <><SiteHeader /><main className="flex-1">
      <section className="border-b border-border/60 bg-[#efe6dc] text-[#2a201a]">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-medium text-[#79573f] hover:text-[#4f3526]"><ArrowLeft className="size-4" />{t("backTo")}</Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-[#79573f]">{t("goalLabel")}</p>
          <h1 className="mt-3 text-balance font-serif text-5xl leading-tight sm:text-6xl">{t(`guides.${slug}.title`)}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#75675d]">{t(`guides.${slug}.goal`)}</p>
        </div>
      </section>

      <div className="mx-auto flex max-w-4xl flex-col gap-7 px-5 py-12 sm:px-6 sm:py-16">
        <Card className="gap-3 rounded-[28px] border-primary/15 bg-primary/5 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-serif text-2xl"><Sparkles className="size-5 text-primary" />{t("introLabel")}</h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">{t(`guides.${slug}.intro`)}</p>
        </Card>
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-5 rounded-[28px] p-6"><h2 className="flex items-center gap-2 font-serif text-2xl"><Sun className="size-5 text-am-foreground" />{t("slotAm")}</h2><ol className="flex flex-col gap-3">{am.map(renderStep)}</ol></Card>
          <Card className="gap-5 rounded-[28px] p-6"><h2 className="flex items-center gap-2 font-serif text-2xl"><Moon className="size-5 text-primary" />{t("slotPm")}</h2><ol className="flex flex-col gap-3">{pm.map(renderStep)}</ol></Card>
        </div>
        <Card className="gap-3 rounded-[28px] border-am/30 bg-am/10 p-6 sm:p-8">
          <h2 className="font-serif text-2xl">{t("keepInMind")}</h2>
          <p className="leading-7 text-muted-foreground">{t(`guides.${slug}.keepInMind`)}</p>
        </Card>
        <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-primary/20 bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div><p className="font-serif text-2xl">{t("buildCta")}</p><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{t("buildCtaSub")}</p></div>
          <Button asChild className="shrink-0"><Link href="/app/routine">{t("buildCta")}<ArrowRight className="size-4" /></Link></Button>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
      </div>
    </main><SiteFooter /></>
  );
}
