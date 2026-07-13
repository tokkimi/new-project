import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { AuditResultView } from "@/components/audit-result-view";
import type { AuditResult } from "@/lib/audit-engine";
import { evaluateLifestyle, type LifestyleAnswers } from "@/lib/bilan-engine";

type Lang = "en" | "ko" | "fr" | "ja";

const INTL_LOCALE: Record<Lang, string> = { en: "en-US", ko: "ko-KR", fr: "fr-FR", ja: "ja-JP" };

const UI: Record<Lang, {
  title: string;
  overallScore: string;
  sectionScan: string;
  sectionRoutine: string;
  sectionLifestyle: string;
  noScan: string;
  routineIssues: string;
  flagsNone: string;
  back: string;
}> = {
  en: {
    title: "Check-in results",
    overallScore: "Overall score",
    sectionScan: "Face scan",
    sectionRoutine: "Routine",
    sectionLifestyle: "Lifestyle & wellbeing",
    noScan: "No face scan was used for this check-in.",
    routineIssues: "issues",
    flagsNone: "Nothing flagged here — good habits.",
    back: "My check-ins",
  },
  ko: {
    title: "체크인 결과",
    overallScore: "종합 점수",
    sectionScan: "얼굴 스캔",
    sectionRoutine: "루틴",
    sectionLifestyle: "생활 습관과 웰빙",
    noScan: "이번 체크인에는 얼굴 스캔이 없어요.",
    routineIssues: "개 항목",
    flagsNone: "특별히 지적할 사항이 없어요 — 좋은 습관이에요.",
    back: "내 체크인",
  },
  fr: {
    title: "Résultats du bilan",
    overallScore: "Score global",
    sectionScan: "Scan visage",
    sectionRoutine: "Routine",
    sectionLifestyle: "Mode de vie et bien-être",
    noScan: "Aucun scan visage n'a été utilisé pour ce bilan.",
    routineIssues: "points",
    flagsNone: "Rien à signaler ici — bonnes habitudes.",
    back: "Mes bilans",
  },
  ja: {
    title: "チェックイン結果",
    overallScore: "総合スコア",
    sectionScan: "顔スキャン",
    sectionRoutine: "ルーティン",
    sectionLifestyle: "生活習慣とウェルビーイング",
    noScan: "このチェックインでは顔スキャンは使用されませんでした。",
    routineIssues: "件の項目",
    flagsNone: "特に指摘する点はありません — 良い習慣です。",
    back: "マイチェックイン",
  },
};

function scoreTone(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-am-foreground";
  return "text-destructive";
}

export default async function BilanHistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  const lang: Lang = locale === "ko" || locale === "fr" || locale === "ja" ? locale : "en";
  const t = UI[lang];
  const session = await auth();

  if (!session?.user?.id) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const bilan = await db.bilan.findUnique({ where: { id } });
  if (!bilan || bilan.userId !== session.user.id) notFound();

  const auditResult = bilan.auditSnapshot as unknown as AuditResult;
  const lifestyle = (bilan.lifestyle ?? {}) as LifestyleAnswers;
  const { flags } = evaluateLifestyle(lifestyle);
  const scanSnapshot = bilan.scanSnapshot as { overallScore?: number; skinType?: string | null } | null;

  const sections = [
    {
      key: "overall",
      title: t.overallScore,
      content: (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className={`font-serif text-6xl ${scoreTone(bilan.overallScore)}`}>{bilan.overallScore}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      ),
    },
    {
      key: "scan",
      title: t.sectionScan,
      content:
        scanSnapshot && typeof scanSnapshot.overallScore === "number" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <span className={`font-serif text-5xl ${scoreTone(scanSnapshot.overallScore)}`}>
              {scanSnapshot.overallScore}
            </span>
            {scanSnapshot.skinType && <span className="text-sm text-muted-foreground">{scanSnapshot.skinType}</span>}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">{t.noScan}</p>
        ),
    },
    {
      key: "routine",
      title: t.sectionRoutine,
      content: (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className={`font-serif text-5xl ${scoreTone(auditResult.score)}`}>{auditResult.score}</span>
          <span className="text-sm text-muted-foreground">
            {auditResult.issues.length} {t.routineIssues}
          </span>
        </div>
      ),
    },
    {
      key: "lifestyle",
      title: t.sectionLifestyle,
      content: (
        <div className="flex flex-col gap-2 py-2">
          {flags.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t.flagsNone}</p>
          ) : (
            flags.map((flag) => (
              <p key={flag.id} className="rounded-xl bg-secondary/50 px-3 py-2 text-sm">
                {flag[lang]}
              </p>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link href="/app/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        {t.back}
      </Link>

      <div>
        <h1 className="font-serif text-3xl">{t.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat(INTL_LOCALE[lang], { dateStyle: "full" }).format(bilan.createdAt)}
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {sections.map((section) => (
          <Card key={section.key} className="w-[85%] shrink-0 snap-center sm:w-[360px]">
            <h3 className="font-serif text-lg">{section.title}</h3>
            {section.content}
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-xl">{t.sectionRoutine}</h2>
        <AuditResultView result={auditResult} />
      </div>
    </div>
  );
}
