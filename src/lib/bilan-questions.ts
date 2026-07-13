export interface BilanOption {
  value: string;
  labelEn: string;
  labelKo: string;
  labelFr: string;
  labelJa: string;
}

export interface BilanQuestion {
  id: string;
  labelEn: string;
  labelKo: string;
  labelFr: string;
  labelJa: string;
  options: BilanOption[];
}

export const WELLBEING_QUESTIONS: BilanQuestion[] = [
  {
    id: "moodToday",
    labelEn: "How would you describe your mood today?",
    labelKo: "오늘 기분은 어떤가요?",
    labelFr: "Comment décririez-vous votre humeur aujourd'hui ?",
    labelJa: "今日の気分はいかがですか？",
    options: [
      { value: "calm", labelEn: "Calm", labelKo: "차분함", labelFr: "Calme", labelJa: "穏やか" },
      { value: "neutral", labelEn: "Neutral", labelKo: "보통", labelFr: "Neutre", labelJa: "普通" },
      { value: "stressed", labelEn: "Stressed", labelKo: "스트레스 받음", labelFr: "Stressé·e", labelJa: "ストレスを感じる" },
      { value: "overwhelmed", labelEn: "Overwhelmed", labelKo: "지침", labelFr: "Débordé·e", labelJa: "疲れきっている" },
    ],
  },
  {
    id: "sleepLastNight",
    labelEn: "How did you sleep last night?",
    labelKo: "어젯밤 잠은 어땠나요?",
    labelFr: "Comment avez-vous dormi la nuit dernière ?",
    labelJa: "昨夜の睡眠はいかがでしたか？",
    options: [
      { value: "great", labelEn: "Great, well rested", labelKo: "충분히 잘 잤어요", labelFr: "Très bien, reposé·e", labelJa: "とてもよく眠れた" },
      { value: "ok", labelEn: "OK, could be better", labelKo: "그럭저럭이었어요", labelFr: "Correct, pourrait être mieux", labelJa: "まあまあ" },
      { value: "poor", labelEn: "Poor, disrupted", labelKo: "제대로 못 잤어요", labelFr: "Mauvais, perturbé", labelJa: "あまり眠れなかった" },
    ],
  },
  {
    id: "skinFeelsToday",
    labelEn: "How does your skin feel right now?",
    labelKo: "지금 피부 상태는 어떤가요?",
    labelFr: "Comment se sent votre peau en ce moment ?",
    labelJa: "今の肌の状態はどうですか？",
    options: [
      { value: "comfortable", labelEn: "Comfortable", labelKo: "편안함", labelFr: "Confortable", labelJa: "快適" },
      { value: "tight", labelEn: "Tight or dry", labelKo: "당기거나 건조함", labelFr: "Tiraillée ou sèche", labelJa: "つっぱる、または乾燥している" },
      { value: "oily", labelEn: "Oily or shiny", labelKo: "유분기 있음", labelFr: "Grasse ou brillante", labelJa: "オイリー、またはテカリがある" },
      { value: "irritated", labelEn: "Irritated or itchy", labelKo: "자극되거나 가려움", labelFr: "Irritée ou qui démange", labelJa: "刺激がある、またはかゆい" },
    ],
  },
];

export const AGE_QUESTION: BilanQuestion = {
  id: "ageRange",
  labelEn: "What's your age range?",
  labelKo: "연령대가 어떻게 되세요?",
  labelFr: "Quelle est votre tranche d'âge ?",
  labelJa: "年齢層を教えてください",
  options: [
    { value: "teens", labelEn: "Teens", labelKo: "10대", labelFr: "Adolescence", labelJa: "10代" },
    { value: "20s", labelEn: "20s", labelKo: "20대", labelFr: "20 ans", labelJa: "20代" },
    { value: "30s", labelEn: "30s", labelKo: "30대", labelFr: "30 ans", labelJa: "30代" },
    { value: "40s", labelEn: "40s", labelKo: "40대", labelFr: "40 ans", labelJa: "40代" },
    { value: "50plus", labelEn: "50+", labelKo: "50대 이상", labelFr: "50 ans et plus", labelJa: "50代以上" },
  ],
};

export const LIFESTYLE_QUESTIONS: BilanQuestion[] = [
  {
    id: "waterIntake",
    labelEn: "How much water do you usually drink per day?",
    labelKo: "하루에 물을 보통 얼마나 마시나요?",
    labelFr: "Combien d'eau buvez-vous généralement par jour ?",
    labelJa: "1日にどのくらいの水を飲みますか？",
    options: [
      { value: "low", labelEn: "Less than 1L", labelKo: "1L 미만", labelFr: "Moins d'1 L", labelJa: "1L未満" },
      { value: "medium", labelEn: "1-2L", labelKo: "1~2L", labelFr: "1 à 2 L", labelJa: "1〜2L" },
      { value: "high", labelEn: "2L or more", labelKo: "2L 이상", labelFr: "2 L ou plus", labelJa: "2L以上" },
    ],
  },
  {
    id: "smokes",
    labelEn: "Do you smoke?",
    labelKo: "흡연하시나요?",
    labelFr: "Fumez-vous ?",
    labelJa: "喫煙しますか？",
    options: [
      { value: "no", labelEn: "No", labelKo: "아니요", labelFr: "Non", labelJa: "いいえ" },
      { value: "occasionally", labelEn: "Occasionally", labelKo: "가끔", labelFr: "Occasionnellement", labelJa: "たまに" },
      { value: "yes", labelEn: "Yes, regularly", labelKo: "네, 자주", labelFr: "Oui, régulièrement", labelJa: "はい、定期的に" },
    ],
  },
  {
    id: "sleepHours",
    labelEn: "How many hours do you usually sleep?",
    labelKo: "보통 몇 시간 정도 주무세요?",
    labelFr: "Combien d'heures dormez-vous en général ?",
    labelJa: "普段何時間くらい眠りますか？",
    options: [
      { value: "under6", labelEn: "Under 6 hours", labelKo: "6시간 미만", labelFr: "Moins de 6 heures", labelJa: "6時間未満" },
      { value: "6to8", labelEn: "6-8 hours", labelKo: "6~8시간", labelFr: "6 à 8 heures", labelJa: "6〜8時間" },
      { value: "over8", labelEn: "Over 8 hours", labelKo: "8시간 이상", labelFr: "Plus de 8 heures", labelJa: "8時間以上" },
    ],
  },
  {
    id: "stressLevel",
    labelEn: "How would you rate your everyday stress level?",
    labelKo: "평소 스트레스 수준은 어느 정도인가요?",
    labelFr: "Comment évalueriez-vous votre niveau de stress au quotidien ?",
    labelJa: "普段のストレスレベルはどのくらいですか？",
    options: [
      { value: "low", labelEn: "Low", labelKo: "낮음", labelFr: "Faible", labelJa: "低い" },
      { value: "medium", labelEn: "Medium", labelKo: "보통", labelFr: "Moyen", labelJa: "普通" },
      { value: "high", labelEn: "High", labelKo: "높음", labelFr: "Élevé", labelJa: "高い" },
    ],
  },
  {
    id: "sunExposure",
    labelEn: "How much daily sun exposure do you get?",
    labelKo: "하루에 햇빛 노출은 어느 정도인가요?",
    labelFr: "Quelle est votre exposition quotidienne au soleil ?",
    labelJa: "1日の紫外線への曝露はどのくらいですか？",
    options: [
      { value: "low", labelEn: "Low, mostly indoors", labelKo: "적음, 주로 실내", labelFr: "Faible, surtout en intérieur", labelJa: "少ない、主に室内" },
      { value: "medium", labelEn: "Medium, some time outside", labelKo: "보통, 가끔 외출", labelFr: "Moyenne, un peu de temps dehors", labelJa: "普通、時々外出" },
      { value: "high", labelEn: "High, outside most of the day", labelKo: "많음, 대부분 야외", labelFr: "Élevée, dehors la majeure partie de la journée", labelJa: "多い、ほとんど屋外" },
    ],
  },
  {
    id: "exerciseFrequency",
    labelEn: "How often do you exercise?",
    labelKo: "운동은 얼마나 자주 하시나요?",
    labelFr: "À quelle fréquence faites-vous de l'exercice ?",
    labelJa: "運動はどのくらいの頻度でしますか？",
    options: [
      { value: "rarely", labelEn: "Rarely", labelKo: "거의 안 함", labelFr: "Rarement", labelJa: "ほとんどしない" },
      { value: "weekly", labelEn: "A few times a week", labelKo: "주 몇 회", labelFr: "Quelques fois par semaine", labelJa: "週に数回" },
      { value: "frequent", labelEn: "Almost daily", labelKo: "거의 매일", labelFr: "Presque tous les jours", labelJa: "ほぼ毎日" },
    ],
  },
];

const YES_NO = [
  { value: "yes", labelEn: "Yes", labelKo: "Yes", labelFr: "Oui", labelJa: "Yes" },
  { value: "sometimes", labelEn: "Sometimes", labelKo: "Sometimes", labelFr: "Parfois", labelJa: "Sometimes" },
  { value: "no", labelEn: "No", labelKo: "No", labelFr: "Non", labelJa: "No" },
];

const LEVELS = [
  { value: "low", labelEn: "Low", labelKo: "Low", labelFr: "Faible", labelJa: "Low" },
  { value: "moderate", labelEn: "Moderate", labelKo: "Moderate", labelFr: "Modéré", labelJa: "Moderate" },
  { value: "high", labelEn: "High", labelKo: "High", labelFr: "Élevé", labelJa: "High" },
  { value: "unsure", labelEn: "I am not sure", labelKo: "I am not sure", labelFr: "Je ne sais pas", labelJa: "I am not sure" },
];

export type BilanQuestionSection = {
  id: string;
  titleEn: string;
  titleKo: string;
  titleFr: string;
  titleJa: string;
  descriptionEn: string;
  descriptionKo: string;
  descriptionFr: string;
  descriptionJa: string;
  questions: BilanQuestion[];
};

export const AUDIT_QUESTION_SECTIONS: BilanQuestionSection[] = [
  {
    id: "general_profile",
    titleEn: "General profile",
    titleKo: "General profile",
    titleFr: "Profil général",
    titleJa: "General profile",
    descriptionEn: "Context that can influence how skin looks and behaves.",
    descriptionKo: "Context that can influence how skin looks and behaves.",
    descriptionFr: "Le contexte qui peut influencer l'apparence et le comportement de la peau.",
    descriptionJa: "Context that can influence how skin looks and behaves.",
    questions: [
      AGE_QUESTION,
      {
        id: "climate",
        labelEn: "What is your usual climate?",
        labelKo: "What is your usual climate?",
        labelFr: "Quel est votre climat habituel ?",
        labelJa: "What is your usual climate?",
        options: [
          { value: "dry", labelEn: "Dry", labelKo: "Dry", labelFr: "Sec", labelJa: "Dry" },
          { value: "temperate", labelEn: "Temperate", labelKo: "Temperate", labelFr: "Tempéré", labelJa: "Temperate" },
          { value: "humid", labelEn: "Humid", labelKo: "Humid", labelFr: "Humide", labelJa: "Humid" },
          { value: "variable", labelEn: "Variable", labelKo: "Variable", labelFr: "Variable", labelJa: "Variable" },
        ],
      },
      {
        id: "workEnvironment",
        labelEn: "Which environment affects your skin most?",
        labelKo: "Which environment affects your skin most?",
        labelFr: "Quel environnement influence le plus votre peau ?",
        labelJa: "Which environment affects your skin most?",
        options: [
          { value: "indoor_ac", labelEn: "Indoor air conditioning", labelKo: "Indoor air conditioning", labelFr: "Climatisation", labelJa: "Indoor air conditioning" },
          { value: "heating", labelEn: "Heating", labelKo: "Heating", labelFr: "Chauffage", labelJa: "Heating" },
          { value: "outdoor", labelEn: "Outdoor work", labelKo: "Outdoor work", labelFr: "Extérieur", labelJa: "Outdoor work" },
          { value: "mask", labelEn: "Regular mask wearing", labelKo: "Regular mask wearing", labelFr: "Port régulier d'un masque", labelJa: "Regular mask wearing" },
        ],
      },
    ],
  },
  {
    id: "safety_history",
    titleEn: "Safety and history",
    titleKo: "Safety and history",
    titleFr: "Sécurité et antécédents",
    titleJa: "Safety and history",
    descriptionEn: "Haru does not diagnose; these answers help flag when cosmetic guidance is not enough.",
    descriptionKo: "Haru does not diagnose; these answers help flag when cosmetic guidance is not enough.",
    descriptionFr: "Haru ne diagnostique pas ; ces réponses aident à repérer quand un avis cosmétique ne suffit pas.",
    descriptionJa: "Haru does not diagnose; these answers help flag when cosmetic guidance is not enough.",
    questions: [
      {
        id: "medicalTreatment",
        labelEn: "Are you currently using a prescribed dermatology treatment?",
        labelKo: "Are you currently using a prescribed dermatology treatment?",
        labelFr: "Utilisez-vous actuellement un traitement dermatologique prescrit ?",
        labelJa: "Are you currently using a prescribed dermatology treatment?",
        options: YES_NO,
      },
      {
        id: "pregnancyOrBreastfeeding",
        labelEn: "Are you pregnant, trying to conceive, or breastfeeding?",
        labelKo: "Are you pregnant, trying to conceive, or breastfeeding?",
        labelFr: "Êtes-vous enceinte, en projet de grossesse ou allaitante ?",
        labelJa: "Are you pregnant, trying to conceive, or breastfeeding?",
        options: [
          ...YES_NO,
          { value: "prefer_not", labelEn: "Prefer not to answer", labelKo: "Prefer not to answer", labelFr: "Je préfère ne pas répondre", labelJa: "Prefer not to answer" },
        ],
      },
      {
        id: "urgentSigns",
        labelEn: "Any deep pain, swelling, oozing, blistering, or rapidly changing spot?",
        labelKo: "Any deep pain, swelling, oozing, blistering, or rapidly changing spot?",
        labelFr: "Douleur profonde, gonflement, suintement, cloques ou tache qui change vite ?",
        labelJa: "Any deep pain, swelling, oozing, blistering, or rapidly changing spot?",
        options: YES_NO,
      },
    ],
  },
  {
    id: "baseline_skin_type",
    titleEn: "Baseline skin tendency",
    titleKo: "Baseline skin tendency",
    titleFr: "Type de peau de base",
    titleJa: "Baseline skin tendency",
    descriptionEn: "This separates stable skin tendency from temporary skin state.",
    descriptionKo: "This separates stable skin tendency from temporary skin state.",
    descriptionFr: "On sépare la tendance stable de l'état cutané temporaire.",
    descriptionJa: "This separates stable skin tendency from temporary skin state.",
    questions: [
      {
        id: "perceivedSkinType",
        labelEn: "What skin type do you think you have?",
        labelKo: "What skin type do you think you have?",
        labelFr: "Quel type de peau pensez-vous avoir ?",
        labelJa: "What skin type do you think you have?",
        options: [
          { value: "dry", labelEn: "Dry", labelKo: "Dry", labelFr: "Sèche", labelJa: "Dry" },
          { value: "oily", labelEn: "Oily", labelKo: "Oily", labelFr: "Grasse", labelJa: "Oily" },
          { value: "combination", labelEn: "Combination", labelKo: "Combination", labelFr: "Mixte", labelJa: "Combination" },
          { value: "balanced", labelEn: "Balanced", labelKo: "Balanced", labelFr: "Équilibrée", labelJa: "Balanced" },
          { value: "unsure", labelEn: "I am not sure", labelKo: "I am not sure", labelFr: "Je ne sais pas", labelJa: "I am not sure" },
        ],
      },
      {
        id: "afterCleansing",
        labelEn: "30 minutes after gentle cleansing with no product, your skin usually feels...",
        labelKo: "30 minutes after gentle cleansing with no product, your skin usually feels...",
        labelFr: "30 minutes après un nettoyage doux sans produit, votre peau est plutôt...",
        labelJa: "30 minutes after gentle cleansing with no product, your skin usually feels...",
        options: [
          { value: "tight_all", labelEn: "Tight everywhere", labelKo: "Tight everywhere", labelFr: "Tiraille partout", labelJa: "Tight everywhere" },
          { value: "tzone_shiny", labelEn: "Shiny on the T-zone", labelKo: "Shiny on the T-zone", labelFr: "Brillante sur la zone T", labelJa: "Shiny on the T-zone" },
          { value: "shiny_all", labelEn: "Shiny everywhere", labelKo: "Shiny everywhere", labelFr: "Brillante partout", labelJa: "Shiny everywhere" },
          { value: "comfortable", labelEn: "Comfortable", labelKo: "Comfortable", labelFr: "Confortable", labelJa: "Comfortable" },
          { value: "tight_and_shiny", labelEn: "Tight but shiny", labelKo: "Tight but shiny", labelFr: "Tiraille mais brille", labelJa: "Tight but shiny" },
        ],
      },
      {
        id: "shineTiming",
        labelEn: "Without powder or touch-up, when does shine appear?",
        labelKo: "Without powder or touch-up, when does shine appear?",
        labelFr: "Sans poudre ni retouche, quand la brillance apparaît-elle ?",
        labelJa: "Without powder or touch-up, when does shine appear?",
        options: [
          { value: "under1", labelEn: "Under 1 hour", labelKo: "Under 1 hour", labelFr: "Moins d'une heure", labelJa: "Under 1 hour" },
          { value: "1to3", labelEn: "1 to 3 hours", labelKo: "1 to 3 hours", labelFr: "1 à 3 heures", labelJa: "1 to 3 hours" },
          { value: "end_day", labelEn: "End of the day", labelKo: "End of the day", labelFr: "Fin de journée", labelJa: "End of the day" },
          { value: "rarely", labelEn: "Almost never", labelKo: "Almost never", labelFr: "Presque jamais", labelJa: "Almost never" },
        ],
      },
    ],
  },
  {
    id: "barrier_hydration",
    titleEn: "Hydration and barrier",
    titleKo: "Hydration and barrier",
    titleFr: "Hydratation et barrière",
    titleJa: "Hydration and barrier",
    descriptionEn: "Checks dehydration, barrier stress, over-cleansing and over-exfoliation risk.",
    descriptionKo: "Checks dehydration, barrier stress, over-cleansing and over-exfoliation risk.",
    descriptionFr: "Évalue déshydratation, barrière fragilisée, nettoyage excessif et sur-exfoliation.",
    descriptionJa: "Checks dehydration, barrier stress, over-cleansing and over-exfoliation risk.",
    questions: [
      { id: "tightDespiteCream", labelEn: "Does your skin feel tight even after moisturizer?", labelKo: "Does your skin feel tight even after moisturizer?", labelFr: "Votre peau tire-t-elle malgré la crème ?", labelJa: "Does your skin feel tight even after moisturizer?", options: YES_NO },
      { id: "waterStings", labelEn: "Can water or simple products sting?", labelKo: "Can water or simple products sting?", labelFr: "L'eau ou des produits simples peuvent-ils piquer ?", labelJa: "Can water or simple products sting?", options: YES_NO },
      { id: "recentActiveIncrease", labelEn: "Have you recently increased acids, retinoids or exfoliants?", labelKo: "Have you recently increased acids, retinoids or exfoliants?", labelFr: "Avez-vous récemment augmenté acides, rétinoïdes ou exfoliants ?", labelJa: "Have you recently increased acids, retinoids or exfoliants?", options: YES_NO },
      { id: "hotWaterOrScrub", labelEn: "Do you use hot water, scrubs, brushes or rough towels on the face?", labelKo: "Do you use hot water, scrubs, brushes or rough towels on the face?", labelFr: "Utilisez-vous eau chaude, gommages, brosses ou serviettes abrasives ?", labelJa: "Do you use hot water, scrubs, brushes or rough towels on the face?", options: YES_NO },
    ],
  },
  {
    id: "sensitivity_reactivity",
    titleEn: "Sensitivity and reactivity",
    titleKo: "Sensitivity and reactivity",
    titleFr: "Sensibilité et réactivité",
    titleJa: "Sensitivity and reactivity",
    descriptionEn: "Separates sensitive skin patterns from temporary irritation.",
    descriptionKo: "Separates sensitive skin patterns from temporary irritation.",
    descriptionFr: "On distingue la sensibilité de fond d'une irritation temporaire.",
    descriptionJa: "Separates sensitive skin patterns from temporary irritation.",
    questions: [
      { id: "reactsWeather", labelEn: "Does your skin react to cold, heat, wind or sun?", labelKo: "Does your skin react to cold, heat, wind or sun?", labelFr: "Votre peau réagit-elle au froid, chaud, vent ou soleil ?", labelJa: "Does your skin react to cold, heat, wind or sun?", options: YES_NO },
      { id: "reactsFragrance", labelEn: "Does fragrance or essential oil often bother your skin?", labelKo: "Does fragrance or essential oil often bother your skin?", labelFr: "Parfums ou huiles essentielles gênent-ils souvent votre peau ?", labelJa: "Does fragrance or essential oil often bother your skin?", options: YES_NO },
      { id: "reactionDelay", labelEn: "When you react, when does it usually appear?", labelKo: "When you react, when does it usually appear?", labelFr: "Quand une réaction apparaît-elle généralement ?", labelJa: "When you react, when does it usually appear?", options: [
        { value: "immediate", labelEn: "Immediately", labelKo: "Immediately", labelFr: "Immédiatement", labelJa: "Immediately" },
        { value: "hours", labelEn: "After a few hours", labelKo: "After a few hours", labelFr: "Après quelques heures", labelJa: "After a few hours" },
        { value: "next_day", labelEn: "Next day or later", labelKo: "Next day or later", labelFr: "Le lendemain ou plus tard", labelJa: "Next day or later" },
        { value: "rare", labelEn: "Rarely reacts", labelKo: "Rarely reacts", labelFr: "Réagit rarement", labelJa: "Rarely reacts" },
      ] },
    ],
  },
  {
    id: "blemishes_congestion",
    titleEn: "Blemishes and congestion",
    titleKo: "Blemishes and congestion",
    titleFr: "Imperfections et congestion",
    titleJa: "Blemishes and congestion",
    descriptionEn: "Looks at blackheads, closed bumps, inflamed blemishes and picking risk without blaming hygiene.",
    descriptionKo: "Looks at blackheads, closed bumps, inflamed blemishes and picking risk without blaming hygiene.",
    descriptionFr: "Analyse points noirs, bosses fermées, boutons inflammatoires et manipulation sans culpabiliser l'hygiène.",
    descriptionJa: "Looks at blackheads, closed bumps, inflamed blemishes and picking risk without blaming hygiene.",
    questions: [
      { id: "comedones", labelEn: "Do you often have blackheads or closed bumps?", labelKo: "Do you often have blackheads or closed bumps?", labelFr: "Avez-vous souvent points noirs ou petites bosses fermées ?", labelJa: "Do you often have blackheads or closed bumps?", options: LEVELS },
      { id: "inflamedBlemishes", labelEn: "How frequent are red or painful blemishes?", labelKo: "How frequent are red or painful blemishes?", labelFr: "Quelle est la fréquence des boutons rouges ou douloureux ?", labelJa: "How frequent are red or painful blemishes?", options: LEVELS },
      { id: "picking", labelEn: "Do you pick or squeeze blemishes?", labelKo: "Do you pick or squeeze blemishes?", labelFr: "Manipulez-vous ou percez-vous les imperfections ?", labelJa: "Do you pick or squeeze blemishes?", options: YES_NO },
    ],
  },
  {
    id: "redness_pigmentation_texture",
    titleEn: "Redness, marks and texture",
    titleKo: "Redness, marks and texture",
    titleFr: "Rougeurs, marques et texture",
    titleJa: "Redness, marks and texture",
    descriptionEn: "Checks visible redness, post-blemish marks, pores, texture and dullness.",
    descriptionKo: "Checks visible redness, post-blemish marks, pores, texture and dullness.",
    descriptionFr: "Évalue rougeurs, marques post-imperfections, pores, texture et éclat.",
    descriptionJa: "Checks visible redness, post-blemish marks, pores, texture and dullness.",
    questions: [
      { id: "rednessPattern", labelEn: "How would you describe redness?", labelKo: "How would you describe redness?", labelFr: "Comment décririez-vous vos rougeurs ?", labelJa: "How would you describe redness?", options: [
        { value: "none", labelEn: "Little or none", labelKo: "Little or none", labelFr: "Peu ou pas", labelJa: "Little or none" },
        { value: "temporary", labelEn: "Temporary flushing", labelKo: "Temporary flushing", labelFr: "Rougeurs temporaires", labelJa: "Temporary flushing" },
        { value: "persistent", labelEn: "Persistent", labelKo: "Persistent", labelFr: "Persistantes", labelJa: "Persistent" },
        { value: "with_heat", labelEn: "With heat or burning", labelKo: "With heat or burning", labelFr: "Avec chaleur ou brûlure", labelJa: "With heat or burning" },
      ] },
      { id: "marksLast", labelEn: "Do marks stay after blemishes?", labelKo: "Do marks stay after blemishes?", labelFr: "Les marques restent-elles après les boutons ?", labelJa: "Do marks stay after blemishes?", options: LEVELS },
      { id: "texturePores", labelEn: "How much do texture and visible pores bother you?", labelKo: "How much do texture and visible pores bother you?", labelFr: "Texture et pores visibles vous gênent-ils ?", labelJa: "How much do texture and visible pores bother you?", options: LEVELS },
    ],
  },
  {
    id: "routine_products",
    titleEn: "Routine and product use",
    titleKo: "Routine and product use",
    titleFr: "Routine et produits",
    titleJa: "Routine and product use",
    descriptionEn: "Checks routine complexity, active stacking, frequency and missing basic steps.",
    descriptionKo: "Checks routine complexity, active stacking, frequency and missing basic steps.",
    descriptionFr: "Évalue complexité, accumulation d'actifs, fréquence et étapes de base manquantes.",
    descriptionJa: "Checks routine complexity, active stacking, frequency and missing basic steps.",
    questions: [
      { id: "routineStepsCount", labelEn: "How many steps do you usually use at night?", labelKo: "How many steps do you usually use at night?", labelFr: "Combien d'étapes utilisez-vous généralement le soir ?", labelJa: "How many steps do you usually use at night?", options: [
        { value: "1to3", labelEn: "1 to 3", labelKo: "1 to 3", labelFr: "1 à 3", labelJa: "1 to 3" },
        { value: "4to6", labelEn: "4 to 6", labelKo: "4 to 6", labelFr: "4 à 6", labelJa: "4 to 6" },
        { value: "7plus", labelEn: "7 or more", labelKo: "7 or more", labelFr: "7 ou plus", labelJa: "7 or more" },
        { value: "inconsistent", labelEn: "It changes a lot", labelKo: "It changes a lot", labelFr: "Cela change beaucoup", labelJa: "It changes a lot" },
      ] },
      { id: "usesRetinoid", labelEn: "Do you use retinoids, exfoliating acids or acne treatments?", labelKo: "Do you use retinoids, exfoliating acids or acne treatments?", labelFr: "Utilisez-vous rétinoïdes, acides exfoliants ou anti-acné ?", labelJa: "Do you use retinoids, exfoliating acids or acne treatments?", options: YES_NO },
      { id: "newProducts", labelEn: "How often do you introduce new skincare products?", labelKo: "How often do you introduce new skincare products?", labelFr: "À quelle fréquence ajoutez-vous de nouveaux produits ?", labelJa: "How often do you introduce new skincare products?", options: [
        { value: "rare", labelEn: "Rarely", labelKo: "Rarely", labelFr: "Rarement", labelJa: "Rarely" },
        { value: "monthly", labelEn: "About monthly", labelKo: "About monthly", labelFr: "Environ chaque mois", labelJa: "About monthly" },
        { value: "weekly", labelEn: "Very often", labelKo: "Very often", labelFr: "Très souvent", labelJa: "Very often" },
      ] },
    ],
  },
  {
    id: "lifestyle_environment",
    titleEn: "Sleep, stress and environment",
    titleKo: "Sleep, stress and environment",
    titleFr: "Sommeil, stress et environnement",
    titleJa: "Sleep, stress and environment",
    descriptionEn: "Lifestyle is not blamed, but it can change how skin feels and recovers.",
    descriptionKo: "Lifestyle is not blamed, but it can change how skin feels and recovers.",
    descriptionFr: "Le mode de vie n'est pas culpabilisant, mais il peut influencer confort et récupération.",
    descriptionJa: "Lifestyle is not blamed, but it can change how skin feels and recovers.",
    questions: [...WELLBEING_QUESTIONS, ...LIFESTYLE_QUESTIONS],
  },
  {
    id: "goals_preferences",
    titleEn: "Goals and preferences",
    titleKo: "Goals and preferences",
    titleFr: "Objectifs et préférences",
    titleJa: "Goals and preferences",
    descriptionEn: "The plan should fit your budget, tolerance and real life.",
    descriptionKo: "The plan should fit your budget, tolerance and real life.",
    descriptionFr: "Le plan doit respecter budget, tolérance et réalité du quotidien.",
    descriptionJa: "The plan should fit your budget, tolerance and real life.",
    questions: [
      { id: "mainGoal", labelEn: "What should Haru prioritize first?", labelKo: "What should Haru prioritize first?", labelFr: "Que doit prioriser Haru en premier ?", labelJa: "What should Haru prioritize first?", options: [
        { value: "comfort", labelEn: "Comfort and barrier", labelKo: "Comfort and barrier", labelFr: "Confort et barrière", labelJa: "Comfort and barrier" },
        { value: "blemishes", labelEn: "Blemishes and congestion", labelKo: "Blemishes and congestion", labelFr: "Imperfections et congestion", labelJa: "Blemishes and congestion" },
        { value: "marks", labelEn: "Marks and tone", labelKo: "Marks and tone", labelFr: "Marques et teint", labelJa: "Marks and tone" },
        { value: "aging", labelEn: "Texture and visible aging", labelKo: "Texture and visible aging", labelFr: "Texture et âge visible", labelJa: "Texture and visible aging" },
      ] },
      { id: "budget", labelEn: "What budget should recommendations respect?", labelKo: "What budget should recommendations respect?", labelFr: "Quel budget les recommandations doivent-elles respecter ?", labelJa: "What budget should recommendations respect?", options: [
        { value: "low", labelEn: "Low", labelKo: "Low", labelFr: "Petit budget", labelJa: "Low" },
        { value: "mid", labelEn: "Mid-range", labelKo: "Mid-range", labelFr: "Intermédiaire", labelJa: "Mid-range" },
        { value: "high", labelEn: "Premium", labelKo: "Premium", labelFr: "Premium", labelJa: "Premium" },
        { value: "use_mine", labelEn: "Use what I already own", labelKo: "Use what I already own", labelFr: "Utiliser mes produits actuels", labelJa: "Use what I already own" },
      ] },
      { id: "maxSteps", labelEn: "Maximum routine steps you can realistically follow?", labelKo: "Maximum routine steps you can realistically follow?", labelFr: "Nombre maximal d'étapes réaliste pour vous ?", labelJa: "Maximum routine steps you can realistically follow?", options: [
        { value: "3", labelEn: "3", labelKo: "3", labelFr: "3", labelJa: "3" },
        { value: "4to5", labelEn: "4 to 5", labelKo: "4 to 5", labelFr: "4 à 5", labelJa: "4 to 5" },
        { value: "6plus", labelEn: "6 or more", labelKo: "6 or more", labelFr: "6 ou plus", labelJa: "6 or more" },
      ] },
    ],
  },
  {
    id: "scan_preparation",
    titleEn: "Prepare the face scan",
    titleKo: "Prepare the face scan",
    titleFr: "Préparer le scan visage",
    titleJa: "Prepare the face scan",
    descriptionEn: "The final scan should be taken in conditions that do not distort shine, redness or texture.",
    descriptionKo: "The final scan should be taken in conditions that do not distort shine, redness or texture.",
    descriptionFr: "Le scan final doit éviter les conditions qui faussent brillance, rougeurs ou texture.",
    descriptionJa: "The final scan should be taken in conditions that do not distort shine, redness or texture.",
    questions: [
      { id: "scanMakeup", labelEn: "Will your face be free of makeup and beauty filter?", labelKo: "Will your face be free of makeup and beauty filter?", labelFr: "Votre visage sera-t-il sans maquillage ni filtre beauté ?", labelJa: "Will your face be free of makeup and beauty filter?", options: YES_NO },
      { id: "scanLighting", labelEn: "Can you use soft natural or diffuse light?", labelKo: "Can you use soft natural or diffuse light?", labelFr: "Pouvez-vous utiliser une lumière naturelle ou diffuse ?", labelJa: "Can you use soft natural or diffuse light?", options: YES_NO },
      { id: "scanRecentHeat", labelEn: "Did you have sport, hot shower, cold exposure or strong sun in the last hour?", labelKo: "Did you have sport, hot shower, cold exposure or strong sun in the last hour?", labelFr: "Sport, douche chaude, froid ou soleil fort dans la dernière heure ?", labelJa: "Did you have sport, hot shower, cold exposure or strong sun in the last hour?", options: YES_NO },
    ],
  },
];

export function allBilanQuestions(): BilanQuestion[] {
  return AUDIT_QUESTION_SECTIONS.flatMap((section) => section.questions);
}
