"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, Camera, Check } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuditResultView } from "@/components/audit-result-view";
import type { AuditResult } from "@/lib/audit-engine";
import {
  WELLBEING_QUESTIONS,
  AGE_QUESTION,
  LIFESTYLE_QUESTIONS,
  type BilanQuestion,
} from "@/lib/bilan-questions";

const UI = {
  en: {
    introTitle: "Your complete beauty check-in",
    introText:
      "A full picture in a few steps: your latest face scan, a routine audit, and a few quick questions about how you're doing today and day to day. Nothing here replaces medical advice — it's a practical, honest snapshot.",
    start: "Start the full check-in",
    stepScanTitle: "Face scan",
    stepScanText: "Your most recent scan is used for this check-in.",
    noScan: "No recent face scan found.",
    takeScan: "Take a face scan",
    skipScan: "Continue without a scan",
    scanScore: "Skin score",
    stepRoutineTitle: "Routine audit",
    stepRoutineText: "Based on your current shelf and skin profile.",
    stepPersonalTitle: "About you today",
    stepLifestyleTitle: "Daily habits",
    back: "Back",
    next: "Next",
    finish: "See my results",
    saving: "Saving...",
    resultTitle: "Your bilan",
    resultSubtitle: "Swipe to see each section.",
    overallScore: "Overall score",
    sectionScan: "Face scan",
    sectionRoutine: "Routine",
    sectionLifestyle: "Lifestyle & wellbeing",
    sectionPlan: "Action plan",
    flagsNone: "Nothing flagged here — good habits.",
    viewProfile: "View in my profile",
    restart: "Start a new check-in",
  },
  ko: {
    introTitle: "종합 뷰티 체크인",
    introText:
      "몇 단계로 전체 그림을 확인하세요: 최근 얼굴 스캔, 루틴 점검, 그리고 오늘과 평소 컨디션에 대한 짧은 질문들. 의학적 조언을 대체하지 않는, 실용적이고 솔직한 스냅샷이에요.",
    start: "전체 체크인 시작",
    stepScanTitle: "얼굴 스캔",
    stepScanText: "가장 최근 스캔이 이번 체크인에 사용됩니다.",
    noScan: "최근 얼굴 스캔이 없어요.",
    takeScan: "얼굴 스캔하기",
    skipScan: "스캔 없이 계속하기",
    scanScore: "피부 점수",
    stepRoutineTitle: "루틴 점검",
    stepRoutineText: "현재 화장대와 피부 프로필을 기준으로 합니다.",
    stepPersonalTitle: "오늘의 나",
    stepLifestyleTitle: "생활 습관",
    back: "이전",
    next: "다음",
    finish: "결과 보기",
    saving: "저장 중...",
    resultTitle: "나의 바이런",
    resultSubtitle: "옆으로 넘겨 각 섹션을 확인하세요.",
    overallScore: "종합 점수",
    sectionScan: "얼굴 스캔",
    sectionRoutine: "루틴",
    sectionLifestyle: "생활 습관과 웰빙",
    sectionPlan: "실천 계획",
    flagsNone: "특별히 지적할 사항이 없어요 — 좋은 습관이에요.",
    viewProfile: "내 프로필에서 보기",
    restart: "새 체크인 시작",
  },
};

type ScanSummary = { id: string; overallScore: number; skinType: string | null; createdAt: string } | null;

type BilanResult = {
  id: string;
  overallScore: number;
  routineScore: number;
  lifestyleScore: number;
  scanScore: number | null;
  flags: { id: string; severity: string; text: string }[];
};

function QuestionGroup({
  questions,
  answers,
  onAnswer,
  lang,
}: {
  questions: BilanQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  lang: "en" | "ko";
}) {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q) => (
        <div key={q.id}>
          <p className="mb-2 text-sm font-medium">{lang === "ko" ? q.labelKo : q.labelEn}</p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt) => {
              const selected = answers[q.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onAnswer(q.id, opt.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {lang === "ko" ? opt.labelKo : opt.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BilanWizard({
  auditResult,
  latestScan,
  initialAnswers,
}: {
  auditResult: AuditResult;
  latestScan: ScanSummary;
  initialAnswers: Record<string, string>;
}) {
  const locale = useLocale();
  const lang: "en" | "ko" = locale === "ko" ? "ko" : "en";
  const t = UI[lang];
  const router = useRouter();

  const [started, setStarted] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>(initialAnswers);
  const [saving, setSaving] = React.useState(false);
  const [result, setResult] = React.useState<BilanResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const steps = ["scan", "routine", "personal", "lifestyle"] as const;

  const setAnswer = (id: string, value: string) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const finish = async () => {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/bilan/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, faceScanResultId: latestScan?.id ?? null, locale: lang }),
    });
    setSaving(false);
    if (!res.ok) {
      setError("save_failed");
      return;
    }
    const data = await res.json();
    setResult(data);
    router.refresh();
  };

  if (result) {
    return (
      <BilanResultView
        result={result}
        latestScan={latestScan}
        auditResult={auditResult}
        lang={lang}
        t={t}
        onRestart={() => {
          setResult(null);
          setStarted(false);
          setStep(0);
        }}
      />
    );
  }

  if (!started) {
    return (
      <Card className="items-center gap-4 py-14 text-center">
        <h2 className="font-serif text-2xl">{t.introTitle}</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t.introText}</p>
        <Button size="lg" onClick={() => setStarted(true)}>
          {t.start}
          <ArrowRight className="size-4" />
        </Button>
      </Card>
    );
  }

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col gap-5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {current === "scan" && (
        <Card className="gap-4">
          <h2 className="font-serif text-xl">{t.stepScanTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.stepScanText}</p>
          {latestScan ? (
            <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3">
              <span className="text-sm">
                {new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", { dateStyle: "medium" }).format(
                  new Date(latestScan.createdAt)
                )}
              </span>
              <span className="font-serif text-lg">
                {t.scanScore} {latestScan.overallScore}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3 rounded-2xl bg-secondary/50 px-4 py-4">
              <p className="text-sm text-muted-foreground">{t.noScan}</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/app/face-scan">
                  <Camera className="size-4" />
                  {t.takeScan}
                </Link>
              </Button>
            </div>
          )}
        </Card>
      )}

      {current === "routine" && (
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-xl">{t.stepRoutineTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.stepRoutineText}</p>
          <AuditResultView result={auditResult} />
        </div>
      )}

      {current === "personal" && (
        <Card className="gap-4">
          <h2 className="font-serif text-xl">{t.stepPersonalTitle}</h2>
          <QuestionGroup questions={[...WELLBEING_QUESTIONS, AGE_QUESTION]} answers={answers} onAnswer={setAnswer} lang={lang} />
        </Card>
      )}

      {current === "lifestyle" && (
        <Card className="gap-4">
          <h2 className="font-serif text-xl">{t.stepLifestyleTitle}</h2>
          <QuestionGroup questions={LIFESTYLE_QUESTIONS} answers={answers} onAnswer={setAnswer} lang={lang} />
        </Card>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" />
          {t.back}
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
            {t.next}
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="button" onClick={finish} disabled={saving}>
            {saving ? t.saving : t.finish}
            {!saving && <Check className="size-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}

function scoreTone(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-am-foreground";
  return "text-destructive";
}

function BilanResultView({
  result,
  latestScan,
  auditResult,
  lang,
  t,
  onRestart,
}: {
  result: BilanResult;
  latestScan: ScanSummary;
  auditResult: AuditResult;
  lang: "en" | "ko";
  t: (typeof UI)["en"];
  onRestart: () => void;
}) {
  const sections = [
    {
      key: "overall",
      title: t.overallScore,
      content: (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className={`font-serif text-6xl ${scoreTone(result.overallScore)}`}>{result.overallScore}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      ),
    },
    {
      key: "scan",
      title: t.sectionScan,
      content: latestScan ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className={`font-serif text-5xl ${scoreTone(latestScan.overallScore)}`}>{latestScan.overallScore}</span>
          {latestScan.skinType && <span className="text-sm text-muted-foreground">{latestScan.skinType}</span>}
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
            {auditResult.issues.length} {lang === "ko" ? "개 항목" : "issues"}
          </span>
        </div>
      ),
    },
    {
      key: "lifestyle",
      title: t.sectionLifestyle,
      content: (
        <div className="flex flex-col gap-2 py-2">
          {result.flags.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{t.flagsNone}</p>
          ) : (
            result.flags.map((flag) => (
              <p key={flag.id} className="rounded-xl bg-secondary/50 px-3 py-2 text-sm">
                {flag.text}
              </p>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-2xl">{t.resultTitle}</h2>
        <p className="text-sm text-muted-foreground">{t.resultSubtitle}</p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {sections.map((section) => (
          <Card key={section.key} className="w-[85%] shrink-0 snap-center sm:w-[360px]">
            <h3 className="font-serif text-lg">{section.title}</h3>
            {section.content}
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/app/profile">{t.viewProfile}</Link>
        </Button>
        <Button variant="outline" onClick={onRestart}>
          {t.restart}
        </Button>
      </div>
    </div>
  );
}
