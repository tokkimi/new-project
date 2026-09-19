import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { ROUTINE_GUIDES } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tIng, tGoals] = await Promise.all([
    getTranslations("routineGuides"),
    getTranslations("ingredients"),
    getTranslations("skinGoals"),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-[#efe6dc] text-[#2a201a]">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#79573f]">
                {tGoals("eyebrow")}
              </p>
              <h1 className="mt-4 text-balance font-serif text-4xl leading-tight sm:text-5xl">
                {t("indexTitle")}
              </h1>
              <p className="mt-4 max-w-xl leading-7 text-[#75675d]">{t("indexSubtitle")}</p>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-[30px] border border-white/60 shadow-[0_28px_80px_-58px_rgba(36,30,24,0.7)] sm:min-h-[360px]">
              <Image
                src="/today-skincare-ritual.png"
                alt={tGoals("imageAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROUTINE_GUIDES.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex min-h-64 flex-col rounded-[28px] border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <h2 className="mt-8 font-serif text-3xl leading-tight">
                  {t(`guides.${guide.slug}.title`)}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t(`guides.${guide.slug}.goal`)}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {guide.actives.slice(0, 3).map((id) =>
                    findIngredient(id) ? (
                      <Badge key={id} variant="secondary">
                        {tIng(`${id}.name`)}
                      </Badge>
                    ) : null
                  )}
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {t("disclaimer")}
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
