import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTINE_GUIDES } from "@/lib/routine-guides";
import { findIngredient } from "@/data/ingredients";

export default async function RoutineGuidesPage({
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
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">{t("indexTitle")}</h1>
        <p className="mt-1 text-muted-foreground">{t("indexSubtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ROUTINE_GUIDES.map((guide) => (
          <Link key={guide.slug} href={`/app/routines/${guide.slug}`} className="group">
            <Card className="h-full gap-3 transition-colors group-hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-serif text-xl">{t(`guides.${guide.slug}.title`)}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {t(`guides.${guide.slug}.goal`)}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {guide.actives.map((id) =>
                  findIngredient(id) ? (
                    <Badge key={id} variant="secondary">
                      {tIng(`${id}.name`)}
                    </Badge>
                  ) : null
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
