import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { INGREDIENTS } from "@/data/ingredients";

export default async function IngredientsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tIng] = await Promise.all([
    getTranslations("ingredientDetail"),
    getTranslations("ingredients"),
  ]);

  const timeLabel = (pref: string) =>
    pref === "am" ? t("timeAm") : pref === "pm" ? t("timePm") : t("timeBoth");

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">{t("indexTitle")}</h1>
        <p className="mt-1 text-muted-foreground">{t("indexSubtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {INGREDIENTS.map((ing) => (
          <Link key={ing.id} href={`/app/ingredient/${ing.id}`} className="group">
            <Card className="h-full gap-2 transition-colors group-hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-serif text-xl">{tIng(`${ing.id}.name`)}</h2>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-sm text-muted-foreground">{tIng(`${ing.id}.summary`)}</p>
              <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {timeLabel(ing.timePref)}
              </span>
            </Card>
          </Link>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
