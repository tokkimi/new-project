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
  climate?: string;
  workEnvironment?: string;
  medicalTreatment?: string;
  pregnancyOrBreastfeeding?: string;
  urgentSigns?: string;
  bareSkinAfterWash?: string;
  middayShine?: string;
  reactivity?: string;
  cleanseFrequency?: string;
  spfUse?: string;
  strongActives?: string;
  activeFrequency?: string;
  mainConcern?: string;
  goalSpeed?: string;
}

export interface LifestyleFlag {
  id: string;
  severity: "low" | "medium" | "high";
  en: string;
  ko: string;
  fr: string;
  ja: string;
}

const FLAG_RULES: Array<{
  id: string;
  test: (a: LifestyleAnswers) => boolean;
  severity: LifestyleFlag["severity"];
  penalty: number;
  en: string;
  ko: string;
  fr: string;
  ja: string;
}> = [
  {
    id: "medical-treatment",
    test: (a) => a.medicalTreatment === "yes",
    severity: "high",
    penalty: 12,
    en: "You mention a prescribed dermatology treatment. Avoid stacking strong actives without professional advice.",
    ko: "처방받은 피부과 치료를 사용 중이라고 답했습니다. 전문가 조언 없이 강한 활성 성분을 겹쳐 사용하지 마세요.",
    fr: "Vous indiquez utiliser un traitement dermatologique prescrit. Évitez de superposer des actifs puissants sans avis professionnel.",
    ja: "処方された皮膚科治療を使用中との回答です。専門家の助言なしに強い有効成分を重ねないでください。",
  },
  {
    id: "urgent-signs",
    test: (a) => a.urgentSigns === "yes",
    severity: "high",
    penalty: 24,
    en: "Deep pain, swelling, oozing, blistering or a rapidly changing spot should be checked by a health professional.",
    ko: "깊은 통증, 붓기, 진물, 물집 또는 빠르게 변하는 반점은 의료 전문가에게 확인받는 것이 좋습니다.",
    fr: "Douleur profonde, gonflement, suintement, cloques ou tache qui change vite doivent être vérifiés par un professionnel de santé.",
    ja: "強い痛み、腫れ、滲出、水ぶくれ、急に変化する斑点は医療専門家に相談してください。",
  },
  {
    id: "pregnancy-caution",
    test: (a) => a.pregnancyOrBreastfeeding === "yes",
    severity: "medium",
    penalty: 8,
    en: "Pregnancy or breastfeeding can change which actives are appropriate. Be cautious with retinoids and strong exfoliating acids.",
    ko: "임신 또는 수유 중에는 적합한 활성 성분이 달라질 수 있습니다. 레티노이드와 강한 각질 케어 성분은 주의하세요.",
    fr: "Grossesse ou allaitement peuvent modifier les actifs adaptés. Soyez prudent(e) avec les rétinoïdes et les acides exfoliants forts.",
    ja: "妊娠中または授乳中は適した成分が変わります。レチノイドや強い角質ケア酸は慎重に扱ってください。",
  },
  {
    id: "smoking-regular",
    test: (a) => a.smokes === "yes",
    severity: "high",
    penalty: 20,
    en: "Regular smoking accelerates collagen breakdown, dulls tone and slows visible skin recovery.",
    ko: "규칙적인 흡연은 콜라겐 손상을 빠르게 하고 피부 톤을 칙칙하게 보이게 하며 회복을 늦출 수 있습니다.",
    fr: "Le tabagisme régulier accélère la dégradation du collagène, ternit le teint et ralentit la récupération visible.",
    ja: "習慣的な喫煙はコラーゲンの低下、くすみ、肌回復の遅れにつながることがあります。",
  },
  {
    id: "smoking-occasional",
    test: (a) => a.smokes === "occasionally",
    severity: "medium",
    penalty: 8,
    en: "Occasional smoking can still affect circulation and skin oxygenation over time.",
    ko: "가끔의 흡연도 시간이 지나면 혈액순환과 피부 산소 공급에 영향을 줄 수 있습니다.",
    fr: "Même occasionnel, le tabac peut affecter la circulation et l'oxygénation de la peau avec le temps.",
    ja: "時々の喫煙でも、時間とともに巡りや肌の酸素供給に影響することがあります。",
  },
  {
    id: "low-water",
    test: (a) => a.waterIntake === "low",
    severity: "medium",
    penalty: 10,
    en: "Low water intake can make skin look duller and less plump, especially when the barrier is stressed.",
    ko: "수분 섭취가 적으면 장벽이 예민할 때 피부가 더 칙칙하고 덜 탄탄해 보일 수 있습니다.",
    fr: "Une hydratation insuffisante peut rendre la peau plus terne et moins rebondie, surtout si la barrière est fragilisée.",
    ja: "水分摂取が少ないと、特にバリアが乱れている時に肌がくすみ、ふっくら感が減ることがあります。",
  },
  {
    id: "poor-sleep",
    test: (a) => a.sleepHours === "under6" || a.sleepLastNight === "poor",
    severity: "medium",
    penalty: 12,
    en: "Short or disrupted sleep limits overnight skin recovery and can increase puffiness or dullness.",
    ko: "짧거나 끊긴 수면은 밤사이 피부 회복을 제한하고 붓기나 칙칙함을 늘릴 수 있습니다.",
    fr: "Un sommeil court ou perturbé limite la récupération nocturne et peut augmenter les poches ou le teint terne.",
    ja: "短い睡眠や途切れた睡眠は夜間の肌回復を妨げ、むくみやくすみにつながることがあります。",
  },
  {
    id: "high-stress",
    test: (a) => a.stressLevel === "high" || a.moodToday === "stressed" || a.moodToday === "overwhelmed",
    severity: "medium",
    penalty: 10,
    en: "High stress can trigger breakouts, redness and a more reactive skin barrier.",
    ko: "높은 스트레스는 트러블, 붉어짐, 민감한 장벽 반응을 유발할 수 있습니다.",
    fr: "Un stress élevé peut déclencher boutons, rougeurs et une barrière cutanée plus réactive.",
    ja: "強いストレスは吹き出物、赤み、バリアの敏感な反応につながることがあります。",
  },
  {
    id: "high-sun",
    test: (a) => a.sunExposure === "high",
    severity: "medium",
    penalty: 10,
    en: "High daily sun exposure makes consistent morning SPF and reapplication the first priority.",
    ko: "매일 햇빛 노출이 많다면 아침 SPF와 덧바르기가 가장 우선입니다.",
    fr: "Une forte exposition solaire quotidienne rend le SPF du matin et la réapplication prioritaires.",
    ja: "日差しを多く浴びる日は、朝のSPFと塗り直しが最優先です。",
  },
  {
    id: "no-spf",
    test: (a) => a.spfUse === "rarely",
    severity: "high",
    penalty: 18,
    en: "SPF is missing from the routine. Add a broad-spectrum sunscreen every morning before focusing on strong actives.",
    ko: "루틴에 SPF가 부족합니다. 강한 활성 성분보다 매일 아침 자외선 차단제를 먼저 추가하세요.",
    fr: "Le SPF manque dans la routine. Ajoutez une protection solaire large spectre chaque matin avant les actifs puissants.",
    ja: "ルーティンにSPFが不足しています。強い成分より先に、毎朝の日焼け止めを整えましょう。",
  },
  {
    id: "too-much-cleansing",
    test: (a) => a.cleanseFrequency === "too_much",
    severity: "medium",
    penalty: 8,
    en: "Cleansing too often can weaken the barrier. Keep cleansing gentle and avoid stripping the skin.",
    ko: "세안을 너무 자주 하면 장벽이 약해질 수 있습니다. 부드럽게 세안하고 과도한 세정을 피하세요.",
    fr: "Nettoyer trop souvent peut fragiliser la barrière. Gardez un nettoyage doux sans décaper la peau.",
    ja: "洗いすぎはバリアを弱めます。やさしく洗い、肌を取りすぎないようにしてください。",
  },
  {
    id: "daily-strong-actives",
    test: (a) => a.strongActives === "yes" && a.activeFrequency === "daily",
    severity: "high",
    penalty: 16,
    en: "Strong actives are used almost daily. Space retinoids, exfoliating acids and acne treatments to reduce irritation risk.",
    ko: "강한 활성 성분을 거의 매일 사용 중입니다. 레티노이드, 산, 여드름 성분은 간격을 두어 자극 위험을 줄이세요.",
    fr: "Les actifs puissants sont utilisés presque tous les jours. Espacez rétinoïdes, acides et soins anti-imperfections pour limiter l'irritation.",
    ja: "強い有効成分をほぼ毎日使っています。レチノイド、酸、ニキビケア成分は間隔を空けて刺激を減らしましょう。",
  },
  {
    id: "skin-irritated-today",
    test: (a) => a.skinFeelsToday === "irritated",
    severity: "medium",
    penalty: 8,
    en: "Skin feels irritated today. Keep tonight simple: cleanse gently, moisturize, and skip new actives.",
    ko: "오늘 피부가 자극받은 느낌입니다. 오늘 밤은 부드러운 세안과 보습만 하고 새 활성 성분은 쉬어가세요.",
    fr: "Votre peau est irritée aujourd'hui. Ce soir, faites simple : nettoyage doux, hydratation, sans nouvel actif.",
    ja: "今日は肌に刺激感があります。今夜はやさしく洗い、保湿し、新しい有効成分は休みましょう。",
  },
  {
    id: "fast-product-switching",
    test: (a) => a.goalSpeed === "fast",
    severity: "low",
    penalty: 5,
    en: "Changing products very often makes it harder to know what helps or irritates. Introduce one product at a time.",
    ko: "제품을 너무 자주 바꾸면 무엇이 도움이 되거나 자극이 되는지 알기 어렵습니다. 하나씩 도입하세요.",
    fr: "Changer très souvent de produits rend les résultats difficiles à lire. Introduisez un produit à la fois.",
    ja: "製品を頻繁に変えると、何が合うか判断しにくくなります。1つずつ導入してください。",
  },
];

export function evaluateLifestyle(answers: LifestyleAnswers): { score: number; flags: LifestyleFlag[] } {
  const flags: LifestyleFlag[] = [];
  let penalty = 0;

  for (const rule of FLAG_RULES) {
    if (rule.test(answers)) {
      flags.push({ id: rule.id, severity: rule.severity, en: rule.en, ko: rule.ko, fr: rule.fr, ja: rule.ja });
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
