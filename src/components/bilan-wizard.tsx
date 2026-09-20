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
  auditQuestions: string;
  scanMissingAdvice: string;
  scanContinue: string;
  saveError: string;
}> = {
  en: {
    introTitle: "Complete Haru Skin Audit",
    introText: "A deeper audit that separates baseline skin tendency, current skin state, safety flags, routine structure, lifestyle context, product fit and a final face scan.",
    start: "Start the full audit",
    consentTitle: "Consent and limits",
    consentText: "Haru provides cosmetic and educational guidance. It does not diagnose medical conditions and does not replace a dermatologist. Camera results can be influenced by light, makeup, filters, angle, device quality and recent heat, cold or sun exposure.",
    estimatedTime: "Estimated time: 8-12 min",
    routineTitle: "Current routine analysis",
    routineText: "Haru first checks missing basics, active conflicts, duplicate actives and product fit.",
    finalScanTitle: "Final face scan",
    finalScanText: "The audit ends with a fresh face scan so Haru can compare your answers with visible skin signals.",
    finalScanRequired: "Take a new scan, then return here to generate the complete result. If you just scanned, continue.",
    noScan: "No recent face scan found.",
    takeScan: "Take a face scan",
    scanScore: "Skin score",
    back: "Back",
    next: "Next",
    finish: "See my complete audit",
    saving: "Saving...",
    resultTitle: "Your audit",
    resultSubtitle: "Each result is presented as a clear page.",
    overallScore: "Overall score",
    sectionScan: "Face scan",
    scanObserved: "Observed by the scan",
    scanSignals: "Main visible signals",
    completeAuditTitle: "Complete audit",
    completeAuditText: "This score combines the questionnaire, your current routine and the latest face scan into one action plan.",
    sectionLifestyle: "Lifestyle and context",
    routineIssues: "issues",
    flagsNone: "Nothing major flagged here.",
    viewProfile: "View in my profile",
    restart: "Start a new audit",
    section: "Section",
    auditQuestions: "Audit questions",
    scanMissingAdvice: "You can finish the questionnaire now, but the complete audit is more reliable with a fresh face scan.",
    scanContinue: "Continue without a new scan",
    saveError: "The audit could not be saved. Please try again.",
  },
  ko: {
    introTitle: "Haru Skin 종합 감사",
    introText: "기본 피부 경향, 현재 피부 상태, 안전 신호, 루틴 구조, 생활 맥락, 제품 적합도와 마지막 얼굴 스캔을 나누어 확인합니다.",
    start: "종합 감사 시작",
    consentTitle: "동의 및 한계",
    consentText: "Haru는 화장품 사용과 교육 목적의 안내를 제공합니다. 의학적 진단을 하지 않으며 피부과 전문의를 대체하지 않습니다. 카메라 결과는 조명, 메이크업, 필터, 각도, 기기 품질, 최근 더위·추위·햇빛 노출의 영향을 받을 수 있습니다.",
    estimatedTime: "예상 시간: 8-12분",
    routineTitle: "현재 루틴 분석",
    routineText: "Haru가 먼저 빠진 기본 단계, 활성 성분 충돌, 중복 성분, 제품 적합도를 확인합니다.",
    finalScanTitle: "마지막 얼굴 스캔",
    finalScanText: "감사는 새로운 얼굴 스캔으로 마무리됩니다. Haru가 답변과 눈에 보이는 피부 신호를 함께 비교합니다.",
    finalScanRequired: "새 스캔을 진행한 뒤 이 화면으로 돌아와 전체 결과를 생성하세요. 방금 스캔했다면 계속 진행하세요.",
    noScan: "최근 얼굴 스캔이 없습니다.",
    takeScan: "얼굴 스캔하기",
    scanScore: "피부 점수",
    back: "이전",
    next: "다음",
    finish: "종합 감사 보기",
    saving: "저장 중...",
    resultTitle: "나의 감사 결과",
    resultSubtitle: "각 결과는 읽기 쉬운 페이지로 표시됩니다.",
    overallScore: "종합 점수",
    sectionScan: "얼굴 스캔",
    scanObserved: "스캔에서 관찰된 내용",
    scanSignals: "주요 시각 신호",
    completeAuditTitle: "종합 감사",
    completeAuditText: "이 점수는 설문, 현재 루틴, 최신 얼굴 스캔을 하나의 실행 계획으로 합친 결과입니다.",
    sectionLifestyle: "생활 맥락과 환경",
    routineIssues: "항목",
    flagsNone: "현재 크게 표시된 문제는 없습니다.",
    viewProfile: "프로필에서 보기",
    restart: "새 감사 시작",
    section: "섹션",
    auditQuestions: "감사 질문",
    scanMissingAdvice: "설문은 지금 마칠 수 있지만, 새로운 얼굴 스캔이 있으면 종합 감사의 신뢰도가 높아집니다.",
    scanContinue: "새 스캔 없이 계속",
    saveError: "감사를 저장하지 못했습니다. 다시 시도해 주세요.",
  },
  fr: {
    introTitle: "Audit Haru Skin complet",
    introText: "Un audit approfondi qui distingue le type de peau de base, l'état actuel, les signaux de sécurité, la structure de routine, le contexte de vie, l'adéquation des produits et le scan visage final.",
    start: "Démarrer l'audit complet",
    consentTitle: "Consentement et limites",
    consentText: "Haru fournit des conseils cosmétiques et éducatifs. Haru ne pose pas de diagnostic médical et ne remplace pas un dermatologue. Les résultats caméra peuvent être influencés par la lumière, le maquillage, les filtres, l'angle, la qualité de l'appareil et une exposition récente au chaud, au froid ou au soleil.",
    estimatedTime: "Temps estimé : 8-12 min",
    routineTitle: "Analyse de la routine actuelle",
    routineText: "Haru vérifie d'abord les étapes manquantes, les conflits d'actifs, les doublons et l'adéquation des produits.",
    finalScanTitle: "Scan visage final",
    finalScanText: "L'audit se termine par un nouveau scan visage afin de croiser vos réponses avec les signaux visibles de la peau.",
    finalScanRequired: "Faites un nouveau scan, puis revenez ici pour générer le résultat complet. Si vous venez de le faire, continuez.",
    noScan: "Aucun scan visage récent trouvé.",
    takeScan: "Faire un scan visage",
    scanScore: "Score de peau",
    back: "Retour",
    next: "Suivant",
    finish: "Voir mon audit complet",
    saving: "Enregistrement...",
    resultTitle: "Votre audit",
    resultSubtitle: "Chaque résultat est présenté dans une page claire.",
    overallScore: "Score global",
    sectionScan: "Scan visage",
    scanObserved: "Observations du scan",
    scanSignals: "Signaux visibles principaux",
    completeAuditTitle: "Audit complet",
    completeAuditText: "Ce score regroupe le questionnaire, la routine actuelle et le dernier scan visage dans un plan d'action.",
    sectionLifestyle: "Mode de vie et contexte",
    routineIssues: "points",
    flagsNone: "Rien de majeur à signaler ici.",
    viewProfile: "Voir dans mon profil",
    restart: "Commencer un nouvel audit",
    section: "Section",
    auditQuestions: "Questions d'audit",
    scanMissingAdvice: "Vous pouvez terminer le questionnaire maintenant, mais l'audit complet est plus fiable avec un scan visage récent.",
    scanContinue: "Continuer sans nouveau scan",
    saveError: "L'audit n'a pas pu être enregistré. Réessayez.",
  },
  ja: {
    introTitle: "Haru Skin 総合監査",
    introText: "本来の肌傾向、現在の肌状態、安全シグナル、ルーティン構成、生活背景、製品の相性、最後の顔スキャンを分けて確認します。",
    start: "総合監査を始める",
    consentTitle: "同意と限界",
    consentText: "Haruは化粧品と教育目的のガイダンスを提供します。医学的診断ではなく、皮膚科医の代わりにはなりません。カメラ結果は光、メイク、フィルター、角度、端末品質、直近の暑さ・寒さ・日差しの影響を受けることがあります。",
    estimatedTime: "目安時間: 8-12分",
    routineTitle: "現在のルーティン分析",
    routineText: "Haruは不足している基本ステップ、有効成分の衝突、重複、製品の相性を確認します。",
    finalScanTitle: "最後の顔スキャン",
    finalScanText: "監査は新しい顔スキャンで完了します。回答と目に見える肌シグナルを照合します。",
    finalScanRequired: "新しいスキャンを行い、この画面に戻って総合結果を生成してください。直前にスキャンした場合は続行できます。",
    noScan: "最近の顔スキャンが見つかりません。",
    takeScan: "顔スキャンを行う",
    scanScore: "肌スコア",
    back: "戻る",
    next: "次へ",
    finish: "総合監査を見る",
    saving: "保存中...",
    resultTitle: "あなたの監査",
    resultSubtitle: "各結果は読みやすいページとして表示されます。",
    overallScore: "総合スコア",
    sectionScan: "顔スキャン",
    scanObserved: "スキャンで観察された内容",
    scanSignals: "主な可視シグナル",
    completeAuditTitle: "総合監査",
    completeAuditText: "このスコアは質問票、現在のルーティン、最新の顔スキャンを1つの実行プランにまとめたものです。",
    sectionLifestyle: "生活背景と環境",
    routineIssues: "項目",
    flagsNone: "現時点で大きな問題は表示されていません。",
    viewProfile: "プロフィールで見る",
    restart: "新しい監査を始める",
    section: "セクション",
    auditQuestions: "監査質問",
    scanMissingAdvice: "質問票は今完了できますが、新しい顔スキャンがあると総合監査の信頼度が高まります。",
    scanContinue: "新しいスキャンなしで続行",
    saveError: "監査を保存できませんでした。もう一度お試しください。",
  },
};

function langFromLocale(locale: string): Lang {
  if (locale === "ko" || locale === "fr" || locale === "ja") return locale;
  return "en";
}

function questionLabel(question: BilanQuestion, lang: Lang) {
  if (lang === "ko") return question.labelKo;
  if (lang === "fr") return question.labelFr;
  if (lang === "ja") return question.labelJa;
  return question.labelEn;
}

function optionLabel(option: BilanQuestion["options"][number], lang: Lang) {
  if (lang === "ko") return option.labelKo;
  if (lang === "fr") return option.labelFr;
  if (lang === "ja") return option.labelJa;
  return option.labelEn;
}

function sectionTitle(section: BilanQuestionSection, lang: Lang) {
  if (lang === "ko") return section.titleKo;
  if (lang === "fr") return section.titleFr;
  if (lang === "ja") return section.titleJa;
  return section.titleEn;
}

function sectionDescription(section: BilanQuestionSection, lang: Lang) {
  if (lang === "ko") return section.descriptionKo;
  if (lang === "fr") return section.descriptionFr;
  if (lang === "ja") return section.descriptionJa;
  return section.descriptionEn;
}

function scoreTone(score: number) {
  if (score >= 70) return "text-foreground";
  if (score >= 40) return "text-muted-foreground";
  return "text-foreground";
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
      <section className="flex min-h-[calc(100svh-9rem)] flex-col justify-center gap-5 rounded-[2rem] border border-border bg-white/8 p-6 text-foreground backdrop-blur-md">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">{t.resultTitle}</p>
          <h3 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{t.sectionScan}</h3>
        </div>
        {latestScan ? (
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] border border-border bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-muted-foreground">{t.scanScore}</p>
              <span className={`text-6xl font-semibold ${scoreTone(latestScan.overallScore)}`}>
                {latestScan.overallScore}
              </span>
              {latestScan.skinType && <p className="mt-2 text-muted-foreground">{latestScan.skinType}</p>}
            </div>
            <div className="rounded-[1.5rem] border border-border bg-white/10 p-5 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{t.scanObserved}</p>
              {summary && <p className="mt-3 text-sm leading-7 text-muted-foreground">{summary}</p>}
              {modules.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{t.scanSignals}</p>
                  {modules.map((module) => (
                    <div key={module.id} className="rounded-2xl border border-border bg-white/10 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium capitalize">{module.id.replace(/([A-Z])/g, " $1")}</span>
                        <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
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
          <Card className="rounded-[1.5rem] border-border bg-white/10 text-foreground">
            <p className="text-sm text-muted-foreground">{t.noScan}</p>
            <Button asChild variant="outline" className="self-start">
              <Link href="/app/face-scan">{t.takeScan}</Link>
            </Button>
          </Card>
        )}
      </section>

      <section className="flex min-h-[calc(100svh-10rem)] flex-col items-center justify-center gap-5 rounded-[2rem] border border-border bg-white/8 p-6 text-center text-foreground backdrop-blur-md">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">{t.completeAuditTitle}</p>
        <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">{t.overallScore}</h2>
        <span className={`text-7xl font-semibold ${scoreTone(result.overallScore)}`}>{result.overallScore}</span>
        <p className="max-w-xl text-sm text-muted-foreground">{t.completeAuditText}</p>
      </section>

      <section className="flex min-h-[calc(100svh-9rem)] flex-col justify-center gap-5 rounded-[2rem] border border-border bg-white/8 p-6 text-foreground backdrop-blur-md">
        <h3 className="text-3xl font-semibold">{t.sectionLifestyle}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {result.flags.length === 0 ? (
            <Card className="rounded-[1.5rem] border-border bg-white/10 text-foreground">
              <p className="text-sm text-muted-foreground">{t.flagsNone}</p>
            </Card>
          ) : (
            result.flags.map((flag) => (
              <Card key={flag.id} className="rounded-[1.5rem] border-border bg-white/10 text-foreground">
                <span className="w-fit rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
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

export function BilanWizard({
  auditResult,
  latestScan,
  initialAnswers = {},
}: {
  auditResult: AuditResult;
  latestScan: ScanSummary;
  initialAnswers?: Record<string, string>;
}) {
  const locale = useLocale();
  const lang = langFromLocale(locale);
  const t = UI[lang];
  const router = useRouter();
  const [started, setStarted] = React.useState(false);
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>(initialAnswers);
  const [result, setResult] = React.useState<BilanResult | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const activeSection = AUDIT_QUESTION_SECTIONS[sectionIndex];
  const isLastSection = sectionIndex === AUDIT_QUESTION_SECTIONS.length - 1;

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const saveAudit = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/bilan/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, faceScanResultId: latestScan?.id ?? null, locale: lang }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error(data?.error || "save_failed");
      setResult(data as BilanResult);
      router.refresh();
    } catch {
      setError(t.saveError);
    } finally {
      setSaving(false);
    }
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
          setSectionIndex(0);
        }}
      />
    );
  }

  if (!started) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-foreground">
        <Card className="rounded-[2rem] border-border bg-white/8 p-7 text-foreground backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">{t.estimatedTime}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{t.introTitle}</h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{t.introText}</p>
            </div>
            <Button className="rounded-full border border-border bg-transparent text-foreground hover:bg-white/10" onClick={() => setStarted(true)}>
              {t.start}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
        <Card className="rounded-[2rem] border-border bg-white/8 p-6 text-foreground backdrop-blur-md">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-foreground" />
            <div>
              <h2 className="text-xl font-semibold">{t.consentTitle}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{t.consentText}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">{t.auditQuestions}</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{sectionTitle(activeSection, lang)}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{sectionDescription(activeSection, lang)}</p>
        </div>
        <span className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
          {t.section} {sectionIndex + 1}/{AUDIT_QUESTION_SECTIONS.length}
        </span>
      </div>

      {sectionIndex === 0 && (
        <Card className="rounded-[2rem] border-border bg-white/8 p-5 text-foreground backdrop-blur-md">
          <h2 className="text-xl font-semibold">{t.routineTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.routineText}</p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {activeSection.questions.map((question) => (
          <Card key={question.id} className="rounded-[1.75rem] border-border bg-white/10 p-5 text-foreground backdrop-blur-md">
            <h3 className="text-lg font-semibold leading-7">{questionLabel(question, lang)}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {question.options.map((option) => {
                const active = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateAnswer(question.id, option.value)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-border bg-white/20 text-foreground shadow-[0_0_18px_rgba(255,255,255,0.22)]"
                        : "border-border bg-transparent text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    {active && <Check className="mr-1 inline size-3.5" />}
                    {optionLabel(option, lang)}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {isLastSection && (
        <Card className="rounded-[2rem] border-border bg-white/8 p-5 text-foreground backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{t.finalScanTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{latestScan ? t.finalScanText : t.scanMissingAdvice}</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-border bg-transparent text-foreground hover:bg-white/10">
              <Link href="/app/face-scan">
                <Camera className="size-4" />
                {t.takeScan}
              </Link>
            </Button>
          </div>
        </Card>
      )}

      {error && <p className="text-sm text-foreground">{error}</p>}

      <div className="flex flex-wrap justify-between gap-3">
        <Button
          variant="outline"
          className="rounded-full border-border bg-transparent text-foreground hover:bg-white/10"
          onClick={() => setSectionIndex((index) => Math.max(0, index - 1))}
          disabled={sectionIndex === 0 || saving}
        >
          <ArrowLeft className="size-4" />
          {t.back}
        </Button>
        {isLastSection ? (
          <Button
            className="rounded-full border border-border bg-transparent text-foreground shadow-[0_0_18px_rgba(255,255,255,0.18)] hover:bg-white/10"
            onClick={saveAudit}
            disabled={saving}
          >
            {saving ? t.saving : t.finish}
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            className="rounded-full border border-border bg-transparent text-foreground shadow-[0_0_18px_rgba(255,255,255,0.18)] hover:bg-white/10"
            onClick={() => setSectionIndex((index) => Math.min(AUDIT_QUESTION_SECTIONS.length - 1, index + 1))}
          >
            {t.next}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
