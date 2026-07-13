"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ClipboardList,
  Layers3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  SunMedium,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";
import type { AuditResult } from "@/lib/audit-engine";

type Lang = "en" | "ko" | "fr" | "ja";

const UI: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  score: string;
  confidence: string;
  profile: string;
  currentState: string;
  sensitivity: string;
  concerns: string;
  aggravating: string;
  why: string;
  evidence: string;
  limits: string;
  action: string;
  scores: string;
  priorities: string;
  immediate: string;
  shortTerm: string;
  later: string;
  products: string;
  keep: string;
  adjust: string;
  pause: string;
  replace: string;
  frequency: string;
  caution: string;
  routine: string;
  morning: string;
  evening: string;
  calendar: string;
  expected: string;
  consult: string;
  consultText: string;
  viewShelf: string;
}> = {
  en: {
    eyebrow: "Routine audit",
    title: "Your complete audit",
    subtitle: "A cosmetic guidance report that separates your baseline skin tendency, current condition, product fit, safety priorities and next routine steps.",
    score: "Audit score",
    confidence: "Confidence",
    profile: "Skin profile",
    currentState: "Current state",
    sensitivity: "Sensitivity",
    concerns: "Concerns",
    aggravating: "Possible aggravating factors",
    why: "Why Haru says this",
    evidence: "Evidence",
    limits: "Limits",
    action: "Action",
    scores: "Detailed scores",
    priorities: "What should change first",
    immediate: "Immediate",
    shortTerm: "Short term",
    later: "Later",
    products: "Product-by-product audit",
    keep: "Keep",
    adjust: "Adjust",
    pause: "Pause",
    replace: "Replace",
    frequency: "Frequency",
    caution: "Caution",
    routine: "Recommended routine",
    morning: "Morning",
    evening: "Evening",
    calendar: "Introduction calendar",
    expected: "Expected progress",
    consult: "When to consult",
    consultText: "Haru does not diagnose. These signs should be checked by a health professional.",
    viewShelf: "Edit my shelf",
  },
  ko: {
    eyebrow: "루틴 점검",
    title: "전체 감사 결과",
    subtitle: "기본 피부 경향, 현재 상태, 제품 적합성, 안전 우선순위, 다음 루틴 단계를 나누어 보여주는 코스메틱 가이드입니다.",
    score: "감사 점수",
    confidence: "신뢰도",
    profile: "피부 프로필",
    currentState: "현재 상태",
    sensitivity: "민감도",
    concerns: "고민",
    aggravating: "가능한 악화 요인",
    why: "Haru가 이렇게 말하는 이유",
    evidence: "근거",
    limits: "한계",
    action: "실행",
    scores: "세부 점수",
    priorities: "먼저 바꿀 것",
    immediate: "즉시",
    shortTerm: "단기",
    later: "나중에",
    products: "제품별 점검",
    keep: "유지",
    adjust: "조정",
    pause: "중단",
    replace: "교체",
    frequency: "빈도",
    caution: "주의",
    routine: "추천 루틴",
    morning: "아침",
    evening: "저녁",
    calendar: "도입 일정",
    expected: "기대 가능한 변화",
    consult: "상담이 필요한 경우",
    consultText: "Haru는 진단하지 않습니다. 이런 신호는 전문가 확인이 필요합니다.",
    viewShelf: "내 제품 수정",
  },
  fr: {
    eyebrow: "Audit de routine",
    title: "Votre audit complet",
    subtitle: "Un rapport cosmétique qui sépare tendance de peau, état actuel, produits, priorités de sécurité et prochaines étapes de routine.",
    score: "Score d'audit",
    confidence: "Confiance",
    profile: "Profil de peau",
    currentState: "État actuel",
    sensitivity: "Sensibilité",
    concerns: "Préoccupations",
    aggravating: "Facteurs aggravants possibles",
    why: "Pourquoi Haru dit cela",
    evidence: "Éléments",
    limits: "Limites",
    action: "Action",
    scores: "Scores détaillés",
    priorities: "Ce qui doit changer d'abord",
    immediate: "Immédiat",
    shortTerm: "Court terme",
    later: "Plus tard",
    products: "Audit produit par produit",
    keep: "Garder",
    adjust: "Ajuster",
    pause: "Mettre en pause",
    replace: "Remplacer",
    frequency: "Fréquence",
    caution: "Attention",
    routine: "Routine recommandée",
    morning: "Matin",
    evening: "Soir",
    calendar: "Calendrier d'introduction",
    expected: "Évolution attendue",
    consult: "Quand consulter",
    consultText: "Haru ne pose pas de diagnostic. Ces signaux doivent être vérifiés par un professionnel de santé.",
    viewShelf: "Modifier mon étagère",
  },
  ja: {
    eyebrow: "ルーティン監査",
    title: "総合監査",
    subtitle: "肌の基本傾向、現在の状態、製品との相性、安全優先度、次のルーティンを分けて表示します。",
    score: "監査スコア",
    confidence: "信頼度",
    profile: "肌プロフィール",
    currentState: "現在の状態",
    sensitivity: "敏感さ",
    concerns: "悩み",
    aggravating: "悪化要因の可能性",
    why: "Haruがそう判断した理由",
    evidence: "根拠",
    limits: "限界",
    action: "アクション",
    scores: "詳細スコア",
    priorities: "最初に変えること",
    immediate: "すぐに",
    shortTerm: "短期",
    later: "後で",
    products: "製品ごとの監査",
    keep: "継続",
    adjust: "調整",
    pause: "一時停止",
    replace: "交換",
    frequency: "頻度",
    caution: "注意",
    routine: "推奨ルーティン",
    morning: "朝",
    evening: "夜",
    calendar: "導入カレンダー",
    expected: "期待できる変化",
    consult: "相談が必要な時",
    consultText: "Haruは診断しません。これらのサインは専門家に確認してください。",
    viewShelf: "棚を編集",
  },
};

const SCORE_LABELS: Record<keyof AuditResult["scores"], string> = {
  oiliness_tendency: "Oiliness tendency",
  dryness_tendency: "Dryness tendency",
  combination_pattern: "Combination pattern",
  dehydration_risk: "Dehydration risk",
  barrier_impairment_risk: "Barrier stress risk",
  sensitivity_score: "Sensitivity",
  redness_score: "Redness",
  congestion_score: "Congestion",
  pigmentation_score: "Pigmentation",
  routine_irritation_risk: "Routine irritation risk",
  routine_consistency_score: "Routine consistency",
};

export function AuditResultView({ result }: { result: AuditResult }) {
  const legacy = useTranslations("auditPage");
  const categories = useTranslations("categories");
  const locale = useLocale();
  const lang: Lang = locale === "ko" || locale === "fr" || locale === "ja" ? locale : "en";
  const t = UI[lang];
  const missingSteps = result.issues.filter((i) => i.type === "missing_step");
  const mismatches = result.issues.filter((i) => i.type === "profile_mismatch");
  const sections = [
    "profile",
    "scores",
    "priorities",
    "products",
    "routine",
    "consult",
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
      <section className="grid min-h-[calc(100svh-10rem)] items-center gap-7 rounded-[2rem] bg-card p-5 shadow-[0_22px_80px_-56px_rgba(0,0,0,0.45)] sm:p-8 lg:grid-cols-[1fr_auto]">
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.eyebrow}</p>
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{t.title}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">{t.subtitle}</p>
          </div>
          <p className="max-w-3xl text-lg leading-8">{result.profile.summary}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{t.confidence}: {confidenceLabel(result.profile.confidence, lang)}</Badge>
            <Badge variant="outline">{sections.length} sections</Badge>
            {result.conclusions.length > 0 && <Badge variant="outline">{result.conclusions.length} conclusions</Badge>}
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/app/shelf">
              {t.viewShelf}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mx-auto flex size-44 flex-col items-center justify-center rounded-full bg-secondary/70 ring-1 ring-border/60 sm:size-56">
          <span className={cn("font-serif text-6xl", scoreToneText(result.score))}>{result.score}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
          <span className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.score}</span>
        </div>
      </section>

      <ResultSection index={1} title={t.profile} icon={ShieldCheck}>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <Fact label="Baseline" value={result.profile.baselineSkinType} />
            <Fact label={t.sensitivity} value={result.profile.sensitivity} />
            <Fact label={t.currentState} value={joinOrNone(result.profile.currentState, lang)} />
            <Fact label={t.concerns} value={joinOrNone(result.profile.concerns, lang)} />
            <Fact label={t.aggravating} value={joinOrNone(result.profile.aggravatingFactors, lang)} />
          </div>
          <div className="space-y-3">
            {result.conclusions.length === 0 ? (
              <Card className="rounded-[1.5rem] bg-secondary/50">
                <Check className="size-5 text-success" />
                <p className="font-medium">{legacy("noIssuesTitle")}</p>
                <p className="text-sm text-muted-foreground">{legacy("noIssuesText")}</p>
              </Card>
            ) : (
              result.conclusions.map((conclusion) => (
                <Card key={conclusion.id} className="rounded-[1.5rem] bg-secondary/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge className={severityClass(conclusion.severity)}>{conclusion.severity}</Badge>
                      <h3 className="mt-2 font-serif text-xl">{conclusion.label}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">{Math.round(conclusion.confidence * 100)}%</span>
                  </div>
                  <WhyBlock
                    labels={t}
                    evidence={conclusion.supportingEvidence}
                    limits={[
                      "This is cosmetic guidance, not a medical diagnosis.",
                      ...conclusion.contradictoryEvidence,
                    ]}
                    action={conclusion.recommendedAction}
                    interpretation={conclusion.interpretation}
                  />
                </Card>
              ))
            )}
          </div>
        </div>
      </ResultSection>

      <ResultSection index={2} title={t.scores} icon={Layers3}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(result.scores) as Array<[keyof AuditResult["scores"], number]>).map(([key, value]) => (
            <Card key={key} className="rounded-[1.5rem] bg-card/85 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">{SCORE_LABELS[key]}</p>
                <p className={cn("font-serif text-2xl", key.includes("risk") ? riskTone(value) : scoreToneText(value))}>
                  {value}
                </p>
              </div>
              <Progress value={value} indicatorClassName={key.includes("risk") ? riskBar(value) : scoreBar(value)} />
            </Card>
          ))}
        </div>
      </ResultSection>

      <ResultSection index={3} title={t.priorities} icon={Sparkles}>
        <div className="grid gap-4 md:grid-cols-3">
          {result.priorities.map((priority) => (
            <Card key={priority.id} className="rounded-[1.5rem] bg-card/85">
              <Badge variant="outline">
                {priority.level === "immediate" ? t.immediate : priority.level === "short_term" ? t.shortTerm : t.later}
              </Badge>
              <h3 className="font-serif text-xl">{priority.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{priority.text}</p>
            </Card>
          ))}
        </div>
        {(missingSteps.length > 0 || mismatches.length > 0) && (
          <div className="grid gap-3 md:grid-cols-2">
            {missingSteps.map((issue) =>
              issue.type === "missing_step" ? (
                <Card key={issue.step} className="rounded-[1.5rem] bg-secondary/50">
                  <AlertTriangle className="size-5 text-warning" />
                  <p className="font-medium">{legacy(`missingStep.${issue.step}`)}</p>
                  <p className="text-sm text-muted-foreground">{legacy(`missingStepHint.${issue.step}`)}</p>
                </Card>
              ) : null
            )}
            {mismatches.slice(0, 4).map((issue) =>
              issue.type === "profile_mismatch" ? (
                <Card key={issue.product.id} className="rounded-[1.5rem] bg-secondary/50">
                  <AlertTriangle className="size-5 text-destructive" />
                  <p className="font-medium">{issue.product.name}</p>
                  <p className="text-sm text-muted-foreground">{legacy("mismatchReason")}</p>
                </Card>
              ) : null
            )}
          </div>
        )}
      </ResultSection>

      <ResultSection index={4} title={t.products} icon={ClipboardList}>
        <div className="grid gap-3">
          {result.productDecisions.length === 0 ? (
            <Card className="rounded-[1.5rem] bg-secondary/50">
              <p className="text-sm text-muted-foreground">Add products to your shelf to receive product-by-product guidance.</p>
            </Card>
          ) : (
            result.productDecisions.map((decision) => (
              <Card key={decision.product.id} className="rounded-[1.5rem] p-4">
                <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <ProductImage
                    imageUrl={decision.product.imageUrl}
                    category={decision.product.category}
                    name={decision.product.name}
                    size="sm"
                    className="size-16 rounded-2xl"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="line-clamp-2 font-medium">{decision.product.name}</h3>
                      <Badge className={decisionClass(decision.decision)}>{decisionLabel(decision.decision, t)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{decision.product.brand} · {categories(decision.product.category)}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{decision.reason}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 p-3 text-sm sm:max-w-56">
                    <p className="font-medium">{t.frequency}</p>
                    <p className="text-muted-foreground">{decision.frequency}</p>
                    {decision.caution && (
                      <>
                        <p className="mt-2 font-medium">{t.caution}</p>
                        <p className="text-muted-foreground">{decision.caution}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ResultSection>

      <ResultSection index={5} title={t.routine} icon={SunMedium}>
        <div className="grid gap-4 lg:grid-cols-2">
          <RoutineList title={t.morning} items={result.recommendedRoutine.morning} />
          <RoutineList title={t.evening} items={result.recommendedRoutine.evening} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <RoutineList title={t.calendar} items={result.recommendedRoutine.introductionCalendar} />
          <RoutineList title={t.expected} items={result.recommendedRoutine.expectedProgress} />
        </div>
      </ResultSection>

      <ResultSection index={6} title={t.consult} icon={Stethoscope}>
        <Card className="rounded-[1.5rem] bg-secondary/50">
          <p className="text-sm leading-6 text-muted-foreground">{t.consultText}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.consultSignals.map((signal) => (
              <li key={signal} className="flex gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </Card>
      </ResultSection>
    </div>
  );
}

function ResultSection({
  index,
  title,
  icon: Icon,
  children,
}: {
  index: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[calc(100svh-9rem)] scroll-mt-24 flex-col gap-5 rounded-[2rem] border border-border/50 bg-card/90 p-5 shadow-[0_16px_60px_-48px_rgba(0,0,0,0.38)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
          <h2 className="font-serif text-3xl">{title}</h2>
        </div>
        <span className="text-sm text-muted-foreground">{String(index).padStart(2, "0")}</span>
      </div>
      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-[1.5rem] bg-secondary/50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm leading-6">{value}</p>
    </Card>
  );
}

function WhyBlock({
  labels,
  evidence,
  limits,
  interpretation,
  action,
}: {
  labels: (typeof UI)["en"];
  evidence: string[];
  limits: string[];
  interpretation: string;
  action: string;
}) {
  return (
    <div className="grid gap-3 text-sm text-muted-foreground lg:grid-cols-3">
      <div>
        <p className="font-medium text-foreground">{labels.evidence}</p>
        <ul className="mt-1 space-y-1">
          {evidence.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </div>
      <div>
        <p className="font-medium text-foreground">{labels.limits}</p>
        <ul className="mt-1 space-y-1">
          {limits.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </div>
      <div>
        <p className="font-medium text-foreground">{labels.action}</p>
        <p className="mt-1">{interpretation}</p>
        <p className="mt-2">{action}</p>
      </div>
    </div>
  );
}

function RoutineList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="rounded-[1.5rem] bg-secondary/50">
      <h3 className="font-serif text-xl">{title}</h3>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-xs text-foreground ring-1 ring-border/60">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function scoreToneText(score: number) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-am-foreground";
  return "text-destructive";
}

function riskTone(score: number) {
  if (score >= 70) return "text-destructive";
  if (score >= 40) return "text-am-foreground";
  return "text-success";
}

function scoreBar(score: number) {
  if (score >= 70) return "bg-success";
  if (score >= 40) return "bg-warning";
  return "bg-destructive";
}

function riskBar(score: number) {
  if (score >= 70) return "bg-destructive";
  if (score >= 40) return "bg-warning";
  return "bg-success";
}

function severityClass(severity: "low" | "moderate" | "high") {
  if (severity === "high") return "bg-destructive/10 text-destructive hover:bg-destructive/10";
  if (severity === "moderate") return "bg-warning/20 text-am-foreground hover:bg-warning/20";
  return "bg-success/15 text-success hover:bg-success/15";
}

function decisionClass(decision: "keep" | "adjust" | "pause" | "replace") {
  if (decision === "keep") return "bg-success/15 text-success hover:bg-success/15";
  if (decision === "pause" || decision === "replace") return "bg-destructive/10 text-destructive hover:bg-destructive/10";
  return "bg-warning/20 text-am-foreground hover:bg-warning/20";
}

function decisionLabel(decision: "keep" | "adjust" | "pause" | "replace", labels: (typeof UI)["en"]) {
  if (decision === "keep") return labels.keep;
  if (decision === "adjust") return labels.adjust;
  if (decision === "pause") return labels.pause;
  return labels.replace;
}

function confidenceLabel(confidence: "limited" | "medium" | "high", lang: Lang) {
  if (lang === "fr") {
    if (confidence === "limited") return "limitée";
    if (confidence === "medium") return "moyenne";
    return "élevée";
  }
  if (lang === "ko") {
    if (confidence === "limited") return "제한적";
    if (confidence === "medium") return "보통";
    return "높음";
  }
  if (lang === "ja") {
    if (confidence === "limited") return "限定的";
    if (confidence === "medium") return "中程度";
    return "高い";
  }
  return confidence;
}

function joinOrNone(values: string[], lang: Lang) {
  if (values.length > 0) return values.join(", ");
  if (lang === "fr") return "Aucun signal fort pour le moment.";
  if (lang === "ko") return "현재 강한 신호가 없습니다.";
  if (lang === "ja") return "今のところ強いサインはありません。";
  return "No strong signal for now.";
}
