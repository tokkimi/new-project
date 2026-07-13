"use client";
import * as React from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, Camera, Check, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuditResultView } from "@/components/audit-result-view";
import type { AuditResult } from "@/lib/audit-engine";
import {
  AUDIT_QUESTION_SECTIONS,
  type BilanQuestion,
  type BilanQuestionSection,
} from "@/lib/bilan-questions";

type Lang = "en" | "ko" | "fr" | "ja";
type Step = "consent" | "routine" | "face_scan" | `section:${string}`;
type ScanModule = {
  id: string;
  score: number;
  severity?: string;
  note?: string;
  flagged?: boolean;
};
type ScanSummary = {
  id: string;
  overallScore: number;
  skinType: string | null;
  summary: string | null;
  analysis: unknown;
  createdAt: string;
} | null;
type BilanResult = {
  id: string;
  overallScore: number;
  routineScore: number;
  lifestyleScore: number;
  scanScore: number | null;
  flags: { id: string; severity: string; text: string }[];
};

const INTL_LOCALE: Record<Lang, string> = { en: "en-US", ko: "ko-KR", fr: "fr-FR", ja: "ja-JP" };

const UI: Record<Lang, {
  introTitle: string;
  introText: string;
  start: string;
  consentTitle: string;
  consentText: string;
  estimatedTime: string;
  routineTitle: string;
  routineText: string;
  finalScanTitle: string;
  finalScanText: string;
  finalScanRequired: string;
  noScan: string;
  takeScan: string;
  scanScore: string;
  back: string;
  next: string;
  finish: string;
  saving: string;
  resultTitle: string;
  resultSubtitle: string;
  overallScore: string;
  sectionScan: string;
  scanObserved: string;
  scanSignals: string;
  completeAuditTitle: string;
  completeAuditText: string;
  sectionLifestyle: string;
  routineIssues: string;
  flagsNone: string;
  viewProfile: string;
  restart: string;
  section: string;
}> = {
  en: {
    introTitle: "Complete Haru Skin Audit",
    introText:
      "A deeper audit that separates baseline skin tendency, current skin state, safety flags, routine structure, lifestyle context, product fit and a final face scan.",
    start: "Start the full audit",
    consentTitle: "Consent and limits",
    consentText:
      "Haru provides cosmetic and educational guidance. It does not diagnose medical conditions and does not replace a dermatologist. Camera results can be influenced by light, makeup, filters, angle, device quality and recent heat, cold or sun exposure.",
    estimatedTime: "Estimated time: 8-12 min",
    routineTitle: "Current shelf analysis",
    routineText: "Haru first checks missing basics, active conflicts, duplicate actives and product fit.",
    finalScanTitle: "Final face scan",
    finalScanText:
      "The audit should end with a fresh face scan so Haru can compare declared answers with visible skin signals.",
    finalScanRequired:
      "Take a new scan, then return here to generate the complete result. If you just scanned, continue.",
    noScan: "No recent face scan found.",
    takeScan: "Take a face scan",
    scanScore: "Skin score",
    back: "Back",
    next: "Next",
    finish: "See my complete audit",
    saving: "Saving...",
    resultTitle: "Your audit",
    resultSubtitle: "Each result is separated into a clear page.",
    overallScore: "Overall score",
    sectionScan: "Face scan",
    scanObserved: "Observed by the scan",
    scanSignals: "Main visible signals",
    completeAuditTitle: "Complete audit",
    completeAuditText:
      "This score combines the questionnaire, your current routine and the latest face scan into one action plan.",
    sectionLifestyle: "Lifestyle and context",
    routineIssues: "issues",
    flagsNone: "Nothing major flagged here.",
    viewProfile: "View in my profile",
    restart: "Start a new audit",
    section: "Section",
  },
  fr: {
    introTitle: "Audit Haru Skin complet",
    introText:
      "Un audit approfondi qui separe type de peau de base, etat actuel, securite, routine, mode de vie, produits et scan visage final.",
    start: "Demarrer l'audit complet",
    consentTitle: "Consentement et limites",
    consentText:
      "Haru fournit une analyse cosmetique et educative. Haru ne pose pas de diagnostic medical et ne remplace pas un dermatologue. Le scan peut etre influence par la lumiere, le maquillage, les filtres, l'angle, la qualite de l'appareil et une exposition recente au chaud, au froid ou au soleil.",
    estimatedTime: "Temps estime : 8-12 min",
    routineTitle: "Analyse de l'etagere actuelle",
    routineText: "Haru verifie d'abord les etapes manquantes, conflits d'actifs, doublons et l'adequation des produits.",
    finalScanTitle: "Scan visage final",
    finalScanText:
      "L'audit doit finir par un nouveau scan visage afin de croiser vos reponses avec les signaux visibles de la peau.",
    finalScanRequired:
      "Faites un nouveau scan, puis revenez ici pour generer le resultat complet. Si vous venez de le faire, continuez.",
    noScan: "Aucun scan visage recent trouve.",
    takeScan: "Faire un scan visage",
    scanScore: "Score de peau",
    back: "Retour",
    next: "Suivant",
    finish: "Voir mon audit complet",
    saving: "Enregistrement...",
    resultTitle: "Votre audit",
    resultSubtitle: "Chaque resultat est separe en page claire.",
    overallScore: "Score global",
    sectionScan: "Scan visage",
    scanObserved: "Observations du scan",
    scanSignals: "Signaux visibles principaux",
    completeAuditTitle: "Audit complet",
    completeAuditText:
      "Ce score regroupe le questionnaire, la routine actuelle et le dernier scan visage dans un plan d'action.",
    sectionLifestyle: "Mode de vie et contexte",
    routineIssues: "points",
    flagsNone: "Rien de majeur a signaler ici.",
    viewProfile: "Voir dans mon profil",
    restart: "Commencer un nouvel audit",
    section: "Section",
  },
  ko: {} as (typeof UI)["en"],
  ja: {} as (typeof UI)["en"],
};
UI.ko = UI.en;
UI.ja = UI.en;

function localized<T extends { labelEn: string; labelKo: string; labelFr: string; labelJa: string }>(
  item: T,
  lang: Lang
) {
  return { en: item.labelEn, ko: item.labelKo, fr: item.labelFr, ja: item.labelJa }[lang];
}

function sectionTitle(section: BilanQuestionSection, lang: Lang) {
  return {
    en: section.titleEn,
    ko: section.titleKo,
    fr: section.titleFr,
    ja: section.titleJa,
  }[lang];
}

function sectionDescription(section: BilanQuestionSection, lang: Lang) {
  return {
    en: section.descriptionEn,
    ko: section.descriptionKo,
    fr: section.descriptionFr,
    ja: section.descriptionJa,
  }[lang];
}

function QuestionGroup({
  questions,
  answers,
  onAnswer,
  lang,
}: {
  questions: BilanQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q) => (
        <div key={q.id}>
          <p className="mb-3 text-sm font-medium leading-6">{localized(q, lang)}</p>
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
                  {localized(opt, lang)}
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
  const lang: Lang = locale === "ko" || locale === "fr" || locale === "ja" ? locale : "en";
  const t = UI[lang];
  const router = useRouter();

  const [started, setStarted] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>(initialAnswers);
  const [saving, setSaving] = React.useState(false);
  const [result, setResult] = React.useState<BilanResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const steps = React.useMemo<Step[]>(
    () => [
      "consent",
      "routine",
      ...AUDIT_QUESTION_SECTIONS.map((section) => `section:${section.id}` as const),
      "face_scan",
    ],
    []
  );

  const current = steps[step];
  const currentSection =
    current?.startsWith("section:")
      ? AUDIT_QUESTION_SECTIONS.find((section) => section.id === current.replace("section:", ""))
      : null;
  const progress = ((step + 1) / steps.length) * 100;
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
      <Card className="items-center gap-5 py-14 text-center">
        <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {t.estimatedTime}
        </p>
        <h2 className="font-serif text-3xl">{t.introTitle}</h2>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground">{t.introText}</p>
        <Button size="lg" onClick={() => setStarted(true)}>
          {t.start}
          <ArrowRight className="size-4" />
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {t.section} {step + 1} / {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {current === "consent" && (
        <Card className="gap-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <h2 className="font-serif text-2xl">{t.consentTitle}</h2>
          <p className="text-sm leading-7 text-muted-foreground">{t.consentText}</p>
        </Card>
      )}

      {current === "routine" && (
        <Card className="gap-4">
          <h2 className="font-serif text-2xl">{t.routineTitle}</h2>
          <p className="text-sm leading-7 text-muted-foreground">{t.routineText}</p>
          <div className="rounded-3xl bg-secondary/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{t.overallScore}</span>
              <span className={`font-serif text-3xl ${scoreTone(auditResult.score)}`}>
                {auditResult.score}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {auditResult.issues.length} {t.routineIssues}
            </p>
          </div>
        </Card>
      )}

      {currentSection && (
        <Card className="gap-5">
          <div>
            <h2 className="font-serif text-2xl">{sectionTitle(currentSection, lang)}</h2>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">
              {sectionDescription(currentSection, lang)}
            </p>
          </div>
          <QuestionGroup questions={currentSection.questions} answers={answers} onAnswer={setAnswer} lang={lang} />
        </Card>
      )}

      {current === "face_scan" && (
        <Card className="gap-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Camera className="size-5" />
          </span>
          <div>
            <h2 className="font-serif text-2xl">{t.finalScanTitle}</h2>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">{t.finalScanText}</p>
          </div>
          <div className="rounded-3xl bg-secondary/60 p-4">
            {latestScan ? (
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat(INTL_LOCALE[lang], { dateStyle: "medium" }).format(
                    new Date(latestScan.createdAt)
                  )}
                </div>
                <div className="font-serif text-2xl">
                  {t.scanScore} {latestScan.overallScore}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t.noScan}</p>
            )}
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{t.finalScanRequired}</p>
          <Button asChild variant="outline" className="self-start">
            <Link href="/app/face-scan">
              <Camera className="size-4" />
              {t.takeScan}
            </Link>
          </Button>
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

function scanModules(latestScan: ScanSummary) {
  const analysis = latestScan?.analysis;
  if (!analysis || typeof analysis !== "object") return [];
  const modules = (analysis as { modules?: unknown }).modules;
  if (!Array.isArray(modules)) return [];
  return modules
    .filter((module): module is ScanModule => {
      return (
        !!module &&
        typeof module === "object" &&
        typeof (module as ScanModule).id === "string" &&
        typeof (module as ScanModule).score === "number"
      );
    })
    .sort((a, b) => Number(b.flagged) - Number(a.flagged) || b.score - a.score)
    .slice(0, 5);
}

function scanSummary(latestScan: ScanSummary) {
  const analysis = latestScan?.analysis;
  if (analysis && typeof analysis === "object" && typeof (analysis as { summary?: unknown }).summary === "string") {
    return (analysis as { summary: string }).summary;
  }
  return latestScan?.summary ?? null;
}

function BilanResultView({
  result,
  latestScan,
  auditResult,
  t,
  onRestart,
}: {
  result: BilanResult;
  latestScan: ScanSummary;
  auditResult: AuditResult;
  t: (typeof UI)["en"];
  onRestart: () => void;
}) {
  const modules = scanModules(latestScan);
  const summary = scanSummary(latestScan);

  return (
    <div className="flex flex-col gap-7">
      <section className="flex min-h-[calc(100svh-9rem)] flex-col justify-center gap-5 rounded-[2rem] border border-border/50 bg-card/90 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.resultTitle}</p>
          <h3 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{t.sectionScan}</h3>
        </div>
        {latestScan ? (
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] bg-secondary/60 p-5">
              <p className="text-sm font-medium text-muted-foreground">{t.scanScore}</p>
              <span className={`font-serif text-6xl ${scoreTone(latestScan.overallScore)}`}>
                {latestScan.overallScore}
              </span>
              {latestScan.skinType && <p className="mt-2 text-muted-foreground">{latestScan.skinType}</p>}
            </div>
            <div className="rounded-[1.5rem] bg-secondary/40 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.scanObserved}</p>
              {summary && <p className="mt-3 text-sm leading-7 text-muted-foreground">{summary}</p>}
              {modules.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.scanSignals}</p>
                  {modules.map((module) => (
                    <div key={module.id} className="rounded-2xl bg-card/80 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium capitalize">{module.id.replace(/([A-Z])/g, " $1")}</span>
                        <span className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                          {module.score}/9
                        </span>
                      </div>
                      {module.note && <p className="mt-1 text-sm leading-6 text-muted-foreground">{module.note}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Card className="rounded-[1.5rem] bg-secondary/50">
            <p className="text-sm text-muted-foreground">{t.noScan}</p>
            <Button asChild variant="outline" className="self-start">
              <Link href="/app/face-scan">{t.takeScan}</Link>
            </Button>
          </Card>
        )}
      </section>

      <section className="flex min-h-[calc(100svh-10rem)] flex-col items-center justify-center gap-5 rounded-[2rem] bg-card p-6 text-center shadow-[0_22px_80px_-56px_rgba(0,0,0,0.45)]">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.completeAuditTitle}</p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">{t.overallScore}</h2>
        <span className={`font-serif text-7xl ${scoreTone(result.overallScore)}`}>{result.overallScore}</span>
        <p className="max-w-xl text-sm text-muted-foreground">{t.completeAuditText}</p>
      </section>

      <section className="flex min-h-[calc(100svh-9rem)] flex-col justify-center gap-5 rounded-[2rem] border border-border/50 bg-card/90 p-6">
        <h3 className="font-serif text-3xl">{t.sectionLifestyle}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {result.flags.length === 0 ? (
            <Card className="rounded-[1.5rem] bg-secondary/50">
              <p className="text-sm text-muted-foreground">{t.flagsNone}</p>
            </Card>
          ) : (
            result.flags.map((flag) => (
              <Card key={flag.id} className="rounded-[1.5rem] bg-secondary/50">
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${flag.severity === "high" ? "bg-destructive/10 text-destructive" : flag.severity === "medium" ? "bg-warning/20 text-am-foreground" : "bg-success/15 text-success"}`}>
                  {flag.severity}
                </span>
                <p className="text-sm leading-6 text-muted-foreground">{flag.text}</p>
              </Card>
            ))
          )}
        </div>
      </section>

      <AuditResultView result={auditResult} />

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
