import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Camera,
  ClipboardCheck,
  HeartPulse,
  ScanFace,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("todayPage");

  const tools = [
    { href: "/app/face-scan", icon: ScanFace, key: "scan" },
    { href: "/app/quiz", icon: UserRound, key: "profile" },
    { href: "/app/routine", icon: Sparkles, key: "routine" },
    { href: "/app/progress", icon: HeartPulse, key: "progress" },
  ] as const;

  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-[0_30px_90px_-70px_rgba(57,38,26,0.8)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{t("subtitle")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/app/face-scan">
                  <Camera className="size-4" />
                  {t("primaryCta")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/app/routine">{t("secondaryCta")}</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-primary/15 bg-primary/5 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{t("dailyTitle")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("dailyText")}</p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-primary shadow-sm">
                <ClipboardCheck className="size-5" />
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {["observe", "routine", "protect"].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 px-4 py-3"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm">{t(`daily.${item}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("manageEyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-3xl">{t("manageTitle")}</h2>
          </div>
          <p className="hidden max-w-md text-right text-sm text-muted-foreground md:block">
            {t("manageText")}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map(({ href, icon: Icon, key }) => (
            <Link key={key} href={href} className="group">
              <Card className="h-full gap-5 p-5 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/35 group-hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <div>
                  <h3 className="font-serif text-xl">{t(`tools.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {t(`tools.${key}.text`)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
