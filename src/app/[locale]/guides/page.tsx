import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { GoodHabits } from "@/components/marketing/good-habits";
import { ROUTINE_GUIDES } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tIng] = await Promise.all([
    getTranslations("routineGuides"),
    getTranslations("ingredients"),
  ]);

  return (
    <div className="haru-public flex flex-1 flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROUTINE_GUIDES.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex min-h-64 flex-col rounded-[28px] border border-border/70 bg-card p-0 overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={guideVisual(guide.slug)} alt="" fill sizes="(min-width: 1024px) 350px, (min-width: 640px) 48vw, 100vw" className="object-cover" /></div>
                <div className="flex flex-1 flex-col p-6">
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
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {t("disclaimer")}
          </p>
        </section>
        <GoodHabits />
      </main>
      <SiteFooter />
    </div>
  );
}
