"use client";

import type { ComponentType, ReactNode } from "react";
import { useLocale } from "next-intl";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";
import type { AuditResult } from "@/lib/audit-engine";

type Lang = "en" | "ko" | "fr" | "ja";
type ScoreKey = keyof AuditResult["scores"];

const UI: Record<
  Lang,
  {
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
    viewRoutine: string;
    baseline: string;
    sections: string;
    conclusions: string;
    emptyProducts: string;
    medicalLimit: string;
    noSignal: string;
    missingStep: Record<"cleanser" | "moisturizer" | "sunscreen", string>;
    missingHint: Record<"cleanser" | "moisturizer" | "sunscreen", string>;
    mismatchReason: string;
  }
> = {
  en: {
    eyebrow: "Routine audit",
    title: "Your complete audit",
    subtitle:
      "A cosmetic guidance report that separates your baseline skin tendency, current condition, product fit, safety priorities and next routine steps.",
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
    viewRoutine: "Edit my routine",
    baseline: "Baseline",
    sections: "sections",
    conclusions: "conclusions",
    emptyProducts: "Add products to your routine to receive product-by-product guidance.",
    medicalLimit: "Cosmetic guidance only, not a medical diagnosis.",
    noSignal: "No strong signal for now.",
    missingStep: {
      cleanser: "Cleanser missing",
      moisturizer: "Moisturizer missing",
      sunscreen: "Daily sunscreen missing",
    },
    missingHint: {
      cleanser: "Add a gentle cleanser so the routine starts from clean skin.",
      moisturizer: "Add a barrier-supporting moisturizer to reduce dryness and irritation risk.",
      sunscreen: "Use broad-spectrum SPF every morning, especially with actives.",
    },
    mismatchReason: "This product may not fully match the selected skin profile.",
  },
  ko: {
    eyebrow: "루틴 진단",
    title: "전체 감사 결과",
    subtitle:
      "기본 피부 경향, 현재 상태, 제품 적합도, 안전 우선순위와 다음 루틴 단계를 나누어 보여주는 화장품 가이드입니다.",
    score: "감사 점수",
    confidence: "신뢰도",
    profile: "피부 프로필",
    currentState: "현재 상태",
    sensitivity: "민감도",
    concerns: "고민",
    aggravating: "악화 가능 요인",
    why: "Haru가 이렇게 판단한 이유",
    evidence: "근거",
    limits: "한계",
    action: "권장 행동",
    scores: "세부 점수",
    priorities: "먼저 바꿀 것",
    immediate: "즉시",
    shortTerm: "단기",
    later: "나중에",
    products: "제품별 감사",
    keep: "유지",
    adjust: "조정",
    pause: "일시 중단",
    replace: "교체",
    frequency: "빈도",
    caution: "주의",
    routine: "추천 루틴",
    morning: "아침",
    evening: "저녁",
    calendar: "도입 일정",
    expected: "예상 변화",
    consult: "전문가 상담이 필요한 경우",
    consultText: "Haru는 진단하지 않습니다. 아래 신호는 의료 전문가에게 확인받는 것이 좋습니다.",
    viewRoutine: "내 루틴 수정",
    baseline: "기본 경향",
    sections: "섹션",
    conclusions: "결론",
    emptyProducts: "루틴에 제품을 추가하면 제품별 가이드를 받을 수 있습니다.",
    medicalLimit: "화장품 가이드이며 의학적 진단이 아닙니다.",
    noSignal: "현재 강한 신호는 없습니다.",
    missingStep: {
      cleanser: "클렌저가 없습니다",
      moisturizer: "보습제가 없습니다",
      sunscreen: "매일 쓰는 선크림이 없습니다",
    },
    missingHint: {
      cleanser: "순한 클렌저를 추가해 깨끗한 피부에서 루틴을 시작하세요.",
      moisturizer: "장벽 보습제를 추가해 건조함과 자극 위험을 줄이세요.",
      sunscreen: "특히 기능성 성분을 사용할 때는 매일 아침 자외선 차단제를 사용하세요.",
    },
    mismatchReason: "이 제품은 선택한 피부 프로필과 완전히 맞지 않을 수 있습니다.",
  },
  fr: {
    eyebrow: "Audit de routine",
    title: "Votre audit complet",
    subtitle:
      "Un rapport cosmétique qui distingue la tendance de peau, l'état actuel, l'adéquation des produits, les priorités de sécurité et les prochaines étapes.",
    score: "Score d'audit",
    confidence: "Fiabilité",
    profile: "Profil de peau",
    currentState: "État actuel",
    sensitivity: "Sensibilité",
    concerns: "Préoccupations",
    aggravating: "Facteurs aggravants possibles",
    why: "Pourquoi Haru indique cela",
    evidence: "Éléments observés",
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
    viewRoutine: "Modifier ma routine",
    baseline: "Tendance de base",
    sections: "sections",
    conclusions: "conclusions",
    emptyProducts: "Ajoutez des produits à votre routine pour recevoir un conseil produit par produit.",
    medicalLimit: "Conseil cosmétique uniquement, pas un diagnostic médical.",
    noSignal: "Aucun signal fort pour le moment.",
    missingStep: {
      cleanser: "Nettoyant manquant",
      moisturizer: "Hydratant manquant",
      sunscreen: "Protection solaire quotidienne manquante",
    },
    missingHint: {
      cleanser: "Ajoutez un nettoyant doux pour commencer la routine sur une peau propre.",
      moisturizer: "Ajoutez un hydratant de barrière pour limiter sécheresse et irritation.",
      sunscreen: "Utilisez un SPF large spectre chaque matin, surtout avec des actifs.",
    },
    mismatchReason: "Ce produit peut ne pas correspondre pleinement au profil de peau sélectionné.",
  },
  ja: {
    eyebrow: "ルーティン監査",
    title: "総合監査結果",
    subtitle:
      "肌の基本傾向、現在の状態、製品との相性、安全面の優先順位、次のルーティン手順を分けて示す化粧品ガイドです。",
    score: "監査スコア",
    confidence: "信頼度",
    profile: "肌プロフィール",
    currentState: "現在の状態",
    sensitivity: "敏感度",
    concerns: "悩み",
    aggravating: "悪化につながる可能性",
    why: "Haruがそう判断した理由",
    evidence: "根拠",
    limits: "限界",
    action: "推奨アクション",
    scores: "詳細スコア",
    priorities: "最初に見直すこと",
    immediate: "すぐに",
    shortTerm: "短期",
    later: "後で",
    products: "製品ごとの監査",
    keep: "継続",
    adjust: "調整",
    pause: "一時停止",
    replace: "変更",
    frequency: "頻度",
    caution: "注意",
    routine: "おすすめルーティン",
    morning: "朝",
    evening: "夜",
    calendar: "導入スケジュール",
    expected: "期待される変化",
    consult: "専門家に相談すべき場合",
    consultText: "Haruは診断を行いません。以下のサインは医療専門家に確認してください。",
    viewRoutine: "ルーティンを編集",
    baseline: "基本傾向",
    sections: "セクション",
    conclusions: "結論",
    emptyProducts: "ルーティンに製品を追加すると、製品ごとのガイドを受け取れます。",
    medicalLimit: "化粧品のためのガイドであり、医療診断ではありません。",
    noSignal: "現時点で強いサインはありません。",
    missingStep: {
      cleanser: "洗顔料がありません",
      moisturizer: "保湿剤がありません",
      sunscreen: "毎日のUVケアがありません",
    },
    missingHint: {
      cleanser: "やさしい洗顔料を加え、清潔な肌からルーティンを始めましょう。",
      moisturizer: "バリアを支える保湿剤で乾燥や刺激リスクを抑えましょう。",
      sunscreen: "有効成分を使う日は特に、毎朝広範囲対応のSPFを使いましょう。",
    },
    mismatchReason: "この製品は選択した肌プロフィールに完全には合わない可能性があります。",
  },
};

const SCORE_LABELS: Record<Lang, Record<ScoreKey, string>> = {
  en: {
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
  },
  ko: {
    oiliness_tendency: "유분 경향",
    dryness_tendency: "건조 경향",
    combination_pattern: "복합 패턴",
    dehydration_risk: "수분 부족 위험",
    barrier_impairment_risk: "장벽 스트레스 위험",
    sensitivity_score: "민감도",
    redness_score: "붉어짐",
    congestion_score: "모공 막힘",
    pigmentation_score: "색소 침착",
    routine_irritation_risk: "루틴 자극 위험",
    routine_consistency_score: "루틴 일관성",
  },
  fr: {
    oiliness_tendency: "Tendance grasse",
    dryness_tendency: "Tendance sèche",
    combination_pattern: "Profil mixte",
    dehydration_risk: "Risque de déshydratation",
    barrier_impairment_risk: "Risque de barrière fragilisée",
    sensitivity_score: "Sensibilité",
    redness_score: "Rougeurs",
    congestion_score: "Congestion",
    pigmentation_score: "Pigmentation",
    routine_irritation_risk: "Risque d'irritation",
    routine_consistency_score: "Régularité de la routine",
  },
  ja: {
    oiliness_tendency: "皮脂の傾向",
    dryness_tendency: "乾燥の傾向",
    combination_pattern: "混合パターン",
    dehydration_risk: "水分不足リスク",
    barrier_impairment_risk: "バリア負担リスク",
    sensitivity_score: "敏感度",
    redness_score: "赤み",
    congestion_score: "毛穴詰まり",
    pigmentation_score: "色素沈着",
    routine_irritation_risk: "ルーティン刺激リスク",
    routine_consistency_score: "ルーティン継続性",
  },
};

export function AuditResultView({ result }: { result: AuditResult }) {
  const locale = useLocale();
  const lang: Lang = locale === "ko" || locale === "fr" || locale === "ja" ? locale : "en";
  const t = UI[lang];
  const scoreLabels = SCORE_LABELS[lang];
  const missingSteps = result.issues.filter((i) => i.type === "missing_step");
  const mismatches = result.issues.filter((i) => i.type === "profile_mismatch");
  const sections = ["profile", "scores", "priorities", "products", "routine", "consult"];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 text-white">
      <section className="grid min-h-[calc(100svh-10rem)] items-center gap-7 rounded-[2rem] border border-white/28 bg-white/[0.06] p-5 shadow-[0_18px_70px_-50px_rgba(255,255,255,0.55)] backdrop-blur-md sm:p-8 lg:grid-cols-[1fr_auto]">
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">{t.eyebrow}</p>
          <div>
            <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">{t.title}</h2>
            <p className="mt-3 max-w-3xl text-white/70">{result.profile.summary || t.subtitle}</p>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-white/82">{t.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            <GlassBadge>
              {t.confidence}: {confidenceLabel(result.profile.confidence, lang)}
            </GlassBadge>
            <GlassBadge>
              {sections.length} {t.sections}
            </GlassBadge>
            {result.conclusions.length > 0 && (
              <GlassBadge>
                {result.conclusions.length} {t.conclusions}
              </GlassBadge>
            )}
          </div>
          <Button asChild variant="outline" className="rounded-full border-white/45 bg-transparent text-white hover:bg-white/10">
            <Link href="/app/shelf">
              {t.viewRoutine}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mx-auto flex size-44 flex-col items-center justify-center rounded-full border border-white/25 bg-white/[0.05] backdrop-blur-md sm:size-56">
          <span className="font-serif text-6xl text-white">{result.score}</span>
          <span className="text-sm text-white/70">/ 100</span>
          <span className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-white/60">{t.score}</span>
        </div>
      </section>

      <ResultSection index={1} title={t.profile} icon={ShieldCheck}>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3">
            <Fact label={t.baseline} value={result.profile.baselineSkinType} />
            <Fact label={t.sensitivity} value={result.profile.sensitivity} />
            <Fact label={t.currentState} value={joinOrNone(result.profile.currentState, t)} />
            <Fact label={t.concerns} value={joinOrNone(result.profile.concerns, t)} />
            <Fact label={t.aggravating} value={joinOrNone(result.profile.aggravatingFactors, t)} />
          </div>
          <div className="grid gap-3">
            {result.conclusions.length === 0 ? (
              <GlassPanel>
                <Check className="size-5" />
                <p className="font-medium">{t.noSignal}</p>
                <p className="text-sm text-white/65">{t.medicalLimit}</p>
              </GlassPanel>
            ) : (
              result.conclusions.map((conclusion) => (
                <GlassPanel key={conclusion.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge className={severityClass(conclusion.severity)}>{conclusion.severity}</Badge>
                      <h3 className="mt-2 font-serif text-xl text-white">{conclusion.label}</h3>
                    </div>
                    <span className="text-sm text-white/60">{Math.round(conclusion.confidence * 100)}%</span>
                  </div>
                  <WhyBlock
                    labels={t}
                    evidence={conclusion.supportingEvidence}
                    limits={[t.medicalLimit, ...conclusion.contradictoryEvidence]}
                    action={conclusion.recommendedAction}
                    interpretation={conclusion.interpretation}
                  />
                </GlassPanel>
              ))
            )}
          </div>
        </div>
      </ResultSection>

      <ResultSection index={2} title={t.scores} icon={Layers3}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(result.scores) as Array<[ScoreKey, number]>).map(([key, value]) => (
            <GlassPanel key={key}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">{scoreLabels[key]}</p>
                <p className="font-serif text-2xl text-white">{value}</p>
              </div>
              <Progress value={value} indicatorClassName={key.includes("risk") ? riskBar(value) : scoreBar(value)} />
            </GlassPanel>
          ))}
        </div>
      </ResultSection>

      <ResultSection index={3} title={t.priorities} icon={Sparkles}>
        <div className="grid gap-4 md:grid-cols-3">
          {result.priorities.map((priority) => (
            <GlassPanel key={priority.id}>
              <GlassBadge>
                {priority.level === "immediate" ? t.immediate : priority.level === "short_term" ? t.shortTerm : t.later}
              </GlassBadge>
              <h3 className="font-serif text-xl text-white">{priority.title}</h3>
              <p className="text-sm leading-6 text-white/68">{priority.text}</p>
            </GlassPanel>
          ))}
        </div>
        {(missingSteps.length > 0 || mismatches.length > 0) && (
          <div className="grid gap-3 md:grid-cols-2">
            {missingSteps.map((issue) =>
              issue.type === "missing_step" ? (
                <GlassPanel key={issue.step}>
                  <AlertTriangle className="size-5" />
                  <p className="font-medium">{t.missingStep[issue.step]}</p>
                  <p className="text-sm text-white/68">{t.missingHint[issue.step]}</p>
                </GlassPanel>
              ) : null
            )}
            {mismatches.slice(0, 4).map((issue) =>
              issue.type === "profile_mismatch" ? (
                <GlassPanel key={issue.product.id}>
                  <AlertTriangle className="size-5" />
                  <p className="font-medium">{issue.product.name}</p>
                  <p className="text-sm text-white/68">{t.mismatchReason}</p>
                </GlassPanel>
              ) : null
            )}
          </div>
        )}
      </ResultSection>

      <ResultSection index={4} title={t.products} icon={ClipboardList}>
        <div className="grid gap-3">
          {result.productDecisions.length === 0 ? (
            <GlassPanel>
              <p className="text-sm text-white/68">{t.emptyProducts}</p>
            </GlassPanel>
          ) : (
            result.productDecisions.map((decision) => (
              <GlassPanel key={decision.product.id}>
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
                      <h3 className="line-clamp-2 font-medium text-white">{decision.product.name}</h3>
                      <Badge className={decisionClass(decision.decision)}>{decisionLabel(decision.decision, t)}</Badge>
                    </div>
                    <p className="text-sm text-white/60">
                      {decision.product.brand} - {decision.product.category}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/68">{decision.reason}</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/[0.07] p-3 text-sm">
                    <p className="font-medium text-white">{t.frequency}</p>
                    <p className="text-white/68">{decision.frequency}</p>
                    {decision.caution && (
                      <>
                        <p className="mt-2 font-medium text-white">{t.caution}</p>
                        <p className="text-white/68">{decision.caution}</p>
                      </>
                    )}
                  </div>
                </div>
              </GlassPanel>
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
        <GlassPanel>
          <p className="text-sm leading-6 text-white/68">{t.consultText}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.consultSignals.map((signal) => (
              <li key={signal} className="flex gap-2 text-sm text-white/68">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
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
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="flex min-h-[calc(100svh-9rem)] scroll-mt-24 flex-col gap-5 rounded-[2rem] border border-white/24 bg-white/[0.055] p-5 shadow-[0_16px_60px_-48px_rgba(255,255,255,0.45)] backdrop-blur-md sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon className="size-5 text-white" />
          <h2 className="font-serif text-3xl text-white">{title}</h2>
        </div>
        <span className="text-sm text-white/55">{String(index).padStart(2, "0")}</span>
      </div>
      {children}
    </section>
  );
}

function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3 rounded-[1.5rem] border border-white/22 bg-white/[0.075] p-4 text-white backdrop-blur-md">
      {children}
    </div>
  );
}

function GlassBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/28 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/82 backdrop-blur-md">
      {children}
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <GlassPanel>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/55">{label}</p>
      <p className="mt-1 text-sm leading-6 text-white">{value}</p>
    </GlassPanel>
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
    <div className="grid gap-3 text-sm text-white/68 lg:grid-cols-3">
      <div>
        <p className="font-medium text-white">{labels.evidence}</p>
        <ul className="mt-1 space-y-1">
          {evidence.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-medium text-white">{labels.limits}</p>
        <ul className="mt-1 space-y-1">
          {limits.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-medium text-white">{labels.action}</p>
        <p className="mt-1">{interpretation}</p>
        <p className="mt-2">{action}</p>
      </div>
    </div>
  );
}

function RoutineList({ title, items }: { title: string; items: string[] }) {
  return (
    <GlassPanel>
      <h3 className="font-serif text-xl text-white">{title}</h3>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={`${title}-${item}-${index}`} className="flex gap-3 text-sm leading-6 text-white/68">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/24 text-xs text-white">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </GlassPanel>
  );
}

function scoreBar(score: number) {
  if (score >= 70) return "bg-white";
  if (score >= 40) return "bg-white/70";
  return "bg-white/45";
}

function riskBar(score: number) {
  if (score >= 70) return "bg-white/45";
  if (score >= 40) return "bg-white/70";
  return "bg-white";
}

function severityClass(severity: "low" | "moderate" | "high") {
  if (severity === "high") return "border border-white/25 bg-white/12 text-white hover:bg-white/12";
  if (severity === "moderate") return "border border-white/25 bg-white/10 text-white hover:bg-white/10";
  return "border border-white/25 bg-white/8 text-white hover:bg-white/8";
}

function decisionClass(decision: "keep" | "adjust" | "pause" | "replace") {
  if (decision === "keep") return "border border-white/25 bg-white/10 text-white hover:bg-white/10";
  if (decision === "pause" || decision === "replace") return "border border-white/25 bg-white/12 text-white hover:bg-white/12";
  return "border border-white/25 bg-white/8 text-white hover:bg-white/8";
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

function joinOrNone(values: string[], labels: (typeof UI)["en"]) {
  if (values.length > 0) return values.join(", ");
  return labels.noSignal;
}
