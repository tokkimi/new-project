export interface LifestyleAnswers {
  moodToday?: string;
  sleepLastNight?: string;
  skinFeelsToday?: string;
  ageRange?: string;
  waterIntake?: string;
  smokes?: string;
  sleepHours?: string;
  stressLevel?: string;
  sunExposure?: string;
  exerciseFrequency?: string;
}

export interface LifestyleFlag {
  id: string;
  severity: "low" | "medium" | "high";
  en: string;
  ko: string;
}

const FLAG_RULES: Array<{
  id: string;
  test: (a: LifestyleAnswers) => boolean;
  severity: LifestyleFlag["severity"];
  penalty: number;
  en: string;
  ko: string;
}> = [
  {
    id: "smoking-regular",
    test: (a) => a.smokes === "yes",
    severity: "high",
    penalty: 20,
    en: "Regular smoking accelerates collagen breakdown, dulls tone and slows skin repair.",
    ko: "잦은 흡연은 콜라겐 분해를 가속하고 피부 톤을 칙칙하게 하며 재생을 늦춰요.",
  },
  {
    id: "smoking-occasional",
    test: (a) => a.smokes === "occasionally",
    severity: "medium",
    penalty: 8,
    en: "Occasional smoking still affects circulation and skin oxygenation over time.",
    ko: "가끔의 흡연도 시간이 지나면 혈액순환과 피부 산소 공급에 영향을 줘요.",
  },
  {
    id: "low-water",
    test: (a) => a.waterIntake === "low",
    severity: "medium",
    penalty: 10,
    en: "Low water intake can leave skin looking duller and less plump.",
    ko: "물 섭취가 적으면 피부가 칙칙하고 탄력이 부족해 보일 수 있어요.",
  },
  {
    id: "poor-sleep",
    test: (a) => a.sleepHours === "under6" || a.sleepLastNight === "poor",
    severity: "medium",
    penalty: 12,
    en: "Short or disrupted sleep limits overnight skin repair and can increase puffiness.",
    ko: "짧거나 방해받은 수면은 밤사이 피부 재생을 제한하고 붓기를 늘릴 수 있어요.",
  },
  {
    id: "high-stress",
    test: (a) => a.stressLevel === "high" || a.moodToday === "stressed" || a.moodToday === "overwhelmed",
    severity: "medium",
    penalty: 10,
    en: "High stress can trigger breakouts, redness and a more reactive skin barrier.",
    ko: "높은 스트레스는 트러블, 붉은기, 더 예민한 피부 장벽을 유발할 수 있어요.",
  },
  {
    id: "high-sun",
    test: (a) => a.sunExposure === "high",
    severity: "medium",
    penalty: 10,
    en: "High daily sun exposure accelerates visible aging and pigmentation without consistent SPF.",
    ko: "매일 강한 햇빛 노출은 꾸준한 자외선 차단 없이는 노화와 색소침착을 가속해요.",
  },
  {
    id: "rarely-exercise",
    test: (a) => a.exerciseFrequency === "rarely",
    severity: "low",
    penalty: 4,
    en: "Regular movement supports circulation, which can help skin look brighter over time.",
    ko: "꾸준한 움직임은 혈액순환을 도와 시간이 지나면 피부가 더 밝아 보이는 데 도움이 돼요.",
  },
  {
    id: "skin-irritated-today",
    test: (a) => a.skinFeelsToday === "irritated",
    severity: "medium",
    penalty: 8,
    en: "Skin feels irritated today — keep today's routine simple and skip new actives.",
    ko: "오늘은 피부가 자극된 상태예요 — 루틴을 단순하게 유지하고 새 활성 성분은 쉬어주세요.",
  },
];

export function evaluateLifestyle(answers: LifestyleAnswers): { score: number; flags: LifestyleFlag[] } {
  const flags: LifestyleFlag[] = [];
  let penalty = 0;

  for (const rule of FLAG_RULES) {
    if (rule.test(answers)) {
      flags.push({ id: rule.id, severity: rule.severity, en: rule.en, ko: rule.ko });
      penalty += rule.penalty;
    }
  }

  const score = Math.max(0, 100 - penalty);
  return { score, flags };
}

export function combinedScore(parts: { value: number; weight: number }[]): number {
  const totalWeight = parts.reduce((sum, p) => sum + p.weight, 0);
  if (totalWeight === 0) return 0;
  const weighted = parts.reduce((sum, p) => sum + p.value * p.weight, 0);
  return Math.round(weighted / totalWeight);
}
