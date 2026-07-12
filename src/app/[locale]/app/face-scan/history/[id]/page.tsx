import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft, Check } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { SkinScoreRing, ModuleScoreBar, severityBadgeClass } from "@/components/skin-score";
import type { FaceScanAnalysis } from "@/lib/face-scan-engine";

export default async function FaceScanHistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const session = await auth();

  if (!session?.user?.id) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const scan = await db.faceScanResult.findUnique({ where: { id } });
  if (!scan || scan.userId !== session.user.id) notFound();

  const t = await getTranslations("faceScanPage");
  const tProfile = await getTranslations("profile");
  const analysis = scan.analysis as unknown as FaceScanAnalysis;
  const flaggedModules = analysis.modules.filter((m) => m.flagged);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link href="/app/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        {tProfile("tabs.scans")}
      </Link>

      <section className="flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div>
          <h1 className="font-serif text-3xl">{t("resultTitle")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { dateStyle: "full" }).format(
              scan.createdAt
            )}
          </p>
          {scan.summary && <p className="mt-3 max-w-md text-muted-foreground">{scan.summary}</p>}
          {analysis.skinType && (
            <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t(`skinTypes.${analysis.skinType}`)}
            </span>
          )}
        </div>
        <SkinScoreRing score={scan.overallScore} />
      </section>

      <div className="flex flex-col gap-4">
        {flaggedModules.length === 0 ? (
          <Card className="items-center gap-2 py-10 text-center">
            <p className="font-medium">{t("noConcern")}</p>
          </Card>
        ) : (
          flaggedModules.map((module) => (
            <Card key={module.id} className="gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl">{t(`modules.${module.id}.name`)}</h3>
                <span className={severityBadgeClass(module.severity)}>{t(`severity.${module.severity}`)}</span>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{t("moduleScoreLabel")}</span>
                  <span className="text-muted-foreground">{module.score}/9</span>
                </div>
                <ModuleScoreBar score={module.score} />
              </div>
              {module.note && <p className="text-sm text-muted-foreground">{module.note}</p>}
              <div className="grid gap-4 sm:grid-cols-2">
                <ModuleInfoList title={t("causesLabel")} items={t.raw(`modules.${module.id}.causes`) as string[]} />
                <ModuleInfoList title={t("tipsLabel")} items={t.raw(`modules.${module.id}.tips`) as string[]} />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function ModuleInfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className={cn("flex gap-2")}>
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
