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

const YES_NO: BilanOption[] = [
  { value: "yes", labelEn: "Yes", labelKo: "예", labelFr: "Oui", labelJa: "はい" },
  { value: "sometimes", labelEn: "Sometimes", labelKo: "가끔", labelFr: "Parfois", labelJa: "時々" },
  { value: "no", labelEn: "No", labelKo: "아니요", labelFr: "Non", labelJa: "いいえ" },
];

const LEVELS: BilanOption[] = [
  { value: "low", labelEn: "Low", labelKo: "낮음", labelFr: "Faible", labelJa: "低い" },
  { value: "moderate", labelEn: "Moderate", labelKo: "보통", labelFr: "Modéré", labelJa: "普通" },
  { value: "high", labelEn: "High", labelKo: "높음", labelFr: "Élevé", labelJa: "高い" },
  { value: "unsure", labelEn: "I am not sure", labelKo: "잘 모르겠어요", labelFr: "Je ne sais pas", labelJa: "わからない" },
];

export const WELLBEING_QUESTIONS: BilanQuestion[] = [
  {
    id: "moodToday",
    labelEn: "How would you describe your mood today?",
    labelKo: "오늘 기분은 어떤가요?",
    labelFr: "Comment décririez-vous votre humeur aujourd'hui ?",
    labelJa: "今日の気分はどうですか？",
    options: [
      { value: "calm", labelEn: "Calm", labelKo: "차분함", labelFr: "Calme", labelJa: "落ち着いている" },
      { value: "neutral", labelEn: "Neutral", labelKo: "보통", labelFr: "Neutre", labelJa: "普通" },
      { value: "stressed", labelEn: "Stressed", labelKo: "스트레스가 있음", labelFr: "Stressé(e)", labelJa: "ストレスを感じる" },
      { value: "overwhelmed", labelEn: "Overwhelmed", labelKo: "지쳐 있음", labelFr: "Débordé(e)", labelJa: "疲れ切っている" },
    ],
  },
  {
    id: "sleepLastNight",
    labelEn: "How did you sleep last night?",
    labelKo: "어젯밤 수면은 어땠나요?",
    labelFr: "Comment avez-vous dormi la nuit dernière ?",
    labelJa: "昨夜の睡眠はどうでしたか？",
    options: [
      { value: "great", labelEn: "Great, well rested", labelKo: "충분히 잘 잤어요", labelFr: "Très bien, reposé(e)", labelJa: "よく眠れて休めた" },
      { value: "ok", labelEn: "OK, could be better", labelKo: "괜찮지만 더 좋을 수 있어요", labelFr: "Correct, pourrait être mieux", labelJa: "普通だが改善できる" },
      { value: "poor", labelEn: "Poor, disrupted", labelKo: "자주 깨거나 좋지 않았어요", labelFr: "Mauvais, perturbé", labelJa: "浅い、または途切れた" },
    ],
  },
  {
    id: "skinFeelsToday",
    labelEn: "How does your skin feel right now?",
    labelKo: "지금 피부 느낌은 어떤가요?",
    labelFr: "Comment se sent votre peau en ce moment ?",
    labelJa: "今の肌の感覚はどうですか？",
    options: [
      { value: "comfortable", labelEn: "Comfortable", labelKo: "편안함", labelFr: "Confortable", labelJa: "快適" },
      { value: "tight", labelEn: "Tight or dry", labelKo: "당기거나 건조함", labelFr: "Tiraillée ou sèche", labelJa: "つっぱる・乾燥する" },
      { value: "oily", labelEn: "Oily or shiny", labelKo: "번들거리거나 유분감 있음", labelFr: "Grasse ou brillante", labelJa: "脂っぽい・テカる" },
      { value: "irritated", labelEn: "Irritated or itchy", labelKo: "자극감 또는 가려움", labelFr: "Irritée ou qui démange", labelJa: "刺激感・かゆみがある" },
    ],
  },
];

export const AGE_QUESTION: BilanQuestion = {
  id: "ageRange",
  labelEn: "What's your age range?",
  labelKo: "연령대는 어떻게 되나요?",
  labelFr: "Quelle est votre tranche d'âge ?",
  labelJa: "年齢層を教えてください。",
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
    labelJa: "1日にどのくらい水を飲みますか？",
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
      { value: "occasionally", labelEn: "Occasionally", labelKo: "가끔", labelFr: "Occasionnellement", labelJa: "時々" },
      { value: "yes", labelEn: "Yes, regularly", labelKo: "예, 정기적으로", labelFr: "Oui, régulièrement", labelJa: "はい、定期的に" },
    ],
  },
  {
    id: "sleepHours",
    labelEn: "How many hours do you usually sleep?",
    labelKo: "보통 몇 시간 정도 주무시나요?",
    labelFr: "Combien d'heures dormez-vous en général ?",
    labelJa: "普段の睡眠時間はどのくらいですか？",
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
    labelJa: "日常のストレスレベルはどの程度ですか？",
    options: [
      { value: "low", labelEn: "Low", labelKo: "낮음", labelFr: "Faible", labelJa: "低い" },
      { value: "medium", labelEn: "Medium", labelKo: "보통", labelFr: "Moyen", labelJa: "普通" },
      { value: "high", labelEn: "High", labelKo: "높음", labelFr: "Élevé", labelJa: "高い" },
    ],
  },
  {
    id: "sunExposure",
    labelEn: "How much daily sun exposure do you get?",
    labelKo: "하루 햇빛 노출은 어느 정도인가요?",
    labelFr: "Quelle est votre exposition quotidienne au soleil ?",
    labelJa: "日中の日差しをどの程度浴びますか？",
    options: [
      { value: "low", labelEn: "Low, mostly indoors", labelKo: "낮음, 주로 실내", labelFr: "Faible, surtout en intérieur", labelJa: "少ない、ほぼ屋内" },
      { value: "medium", labelEn: "Medium, some time outside", labelKo: "보통, 가끔 외출", labelFr: "Moyenne, un peu de temps dehors", labelJa: "普通、少し屋外" },
      { value: "high", labelEn: "High, outside most of the day", labelKo: "높음, 대부분 야외", labelFr: "Élevée, dehors la majeure partie de la journée", labelJa: "多い、長時間屋外" },
    ],
  },
  {
    id: "exerciseFrequency",
    labelEn: "How often do you exercise?",
    labelKo: "운동은 얼마나 자주 하나요?",
    labelFr: "À quelle fréquence faites-vous de l'exercice ?",
    labelJa: "運動はどのくらいの頻度でしますか？",
    options: [
      { value: "rarely", labelEn: "Rarely", labelKo: "거의 안 함", labelFr: "Rarement", labelJa: "ほとんどしない" },
      { value: "weekly", labelEn: "A few times a week", labelKo: "주 몇 회", labelFr: "Quelques fois par semaine", labelJa: "週に数回" },
      { value: "frequent", labelEn: "Almost daily", labelKo: "거의 매일", labelFr: "Presque tous les jours", labelJa: "ほぼ毎日" },
    ],
  },
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
    titleKo: "기본 프로필",
    titleFr: "Profil général",
    titleJa: "基本プロフィール",
    descriptionEn: "Context that can influence how skin looks and behaves.",
    descriptionKo: "피부의 상태와 반응에 영향을 줄 수 있는 배경입니다.",
    descriptionFr: "Le contexte qui peut influencer l'apparence et le comportement de la peau.",
    descriptionJa: "肌の見え方や反応に影響する背景です。",
    questions: [
      AGE_QUESTION,
      {
        id: "climate",
        labelEn: "What is your usual climate?",
        labelKo: "평소 생활하는 기후는 어떤가요?",
        labelFr: "Quel est votre climat habituel ?",
        labelJa: "普段の気候はどのような環境ですか？",
        options: [
          { value: "dry", labelEn: "Dry", labelKo: "건조함", labelFr: "Sec", labelJa: "乾燥" },
          { value: "temperate", labelEn: "Temperate", labelKo: "온화함", labelFr: "Tempéré", labelJa: "温和" },
          { value: "humid", labelEn: "Humid", labelKo: "습함", labelFr: "Humide", labelJa: "湿度が高い" },
          { value: "variable", labelEn: "Variable", labelKo: "변화가 큼", labelFr: "Variable", labelJa: "変化が大きい" },
        ],
      },
      {
        id: "workEnvironment",
        labelEn: "Which environment affects your skin most?",
        labelKo: "피부에 가장 영향을 주는 환경은 무엇인가요?",
        labelFr: "Quel environnement influence le plus votre peau ?",
        labelJa: "肌に最も影響する環境はどれですか？",
        options: [
          { value: "indoor_ac", labelEn: "Indoor air conditioning", labelKo: "실내 냉방", labelFr: "Climatisation", labelJa: "室内の冷房" },
          { value: "heating", labelEn: "Heating", labelKo: "난방", labelFr: "Chauffage", labelJa: "暖房" },
          { value: "outdoor", labelEn: "Outdoor work", labelKo: "야외 활동", labelFr: "Extérieur", labelJa: "屋外で過ごす時間" },
          { value: "mask", labelEn: "Regular mask wearing", labelKo: "마스크 착용", labelFr: "Port régulier d'un masque", labelJa: "マスクの着用" },
        ],
      },
    ],
  },
  {
    id: "safety_history",
    titleEn: "Safety and history",
    titleKo: "안전 확인 및 이력",
    titleFr: "Sécurité et antécédents",
    titleJa: "安全確認と履歴",
    descriptionEn: "Haru does not diagnose; these answers help flag when cosmetic guidance is not enough.",
    descriptionKo: "Haru는 진단하지 않습니다. 화장품 조언만으로 충분하지 않을 수 있는 상황을 확인합니다.",
    descriptionFr: "Haru ne diagnostique pas ; ces réponses aident à repérer quand un avis cosmétique ne suffit pas.",
    descriptionJa: "Haruは診断を行いません。化粧品の助言だけでは不十分な場合を確認します。",
    questions: [
      {
        id: "medicalTreatment",
        labelEn: "Are you currently using a prescribed dermatology treatment?",
        labelKo: "현재 처방받은 피부과 치료를 사용 중인가요?",
        labelFr: "Utilisez-vous actuellement un traitement dermatologique prescrit ?",
        labelJa: "現在、処方された皮膚科治療を使用していますか？",
        options: YES_NO,
      },
      {
        id: "pregnancyOrBreastfeeding",
        labelEn: "Are you pregnant, trying to conceive, or breastfeeding?",
        labelKo: "임신 중이거나 임신 준비 중이거나 수유 중인가요?",
        labelFr: "Êtes-vous enceinte, en projet de grossesse ou allaitante ?",
        labelJa: "妊娠中、妊活中、または授乳中ですか？",
        options: [
          ...YES_NO,
          { value: "prefer_not", labelEn: "Prefer not to answer", labelKo: "답변하지 않음", labelFr: "Je préfère ne pas répondre", labelJa: "回答しない" },
        ],
      },
      {
        id: "urgentSigns",
        labelEn: "Any deep pain, swelling, oozing, blistering, or rapidly changing spot?",
        labelKo: "깊은 통증, 붓기, 진물, 물집 또는 빠르게 변하는 반점이 있나요?",
        labelFr: "Douleur profonde, gonflement, suintement, cloques ou tache qui change vite ?",
        labelJa: "強い痛み、腫れ、滲出、水ぶくれ、急に変化する斑点はありますか？",
        options: YES_NO,
      },
    ],
  },
  {
    id: "baseline_skin_type",
    titleEn: "Baseline skin tendency",
    titleKo: "기본 피부 경향",
    titleFr: "Type de peau de base",
    titleJa: "基本の肌傾向",
    descriptionEn: "A short exercise to separate real skin type from temporary skin condition.",
    descriptionKo: "일시적인 피부 상태와 실제 피부 타입을 구분하는 간단한 확인입니다.",
    descriptionFr: "Un exercice court pour distinguer le vrai type de peau de l'état temporaire.",
    descriptionJa: "一時的な肌状態と本来の肌タイプを分けて確認します。",
    questions: [
      {
        id: "bareSkinAfterWash",
        labelEn: "After cleansing and waiting 30 minutes with no product, how does your skin feel?",
        labelKo: "세안 후 아무 제품도 바르지 않고 30분 뒤 피부는 어떤가요?",
        labelFr: "Après nettoyage et 30 minutes sans produit, comment se sent votre peau ?",
        labelJa: "洗顔後、何も塗らず30分待つと肌はどう感じますか？",
        options: [
          { value: "tight", labelEn: "Tight everywhere", labelKo: "전체적으로 당김", labelFr: "Tiraille partout", labelJa: "全体につっぱる" },
          { value: "shiny", labelEn: "Shiny everywhere", labelKo: "전체적으로 번들거림", labelFr: "Brille partout", labelJa: "全体がテカる" },
          { value: "mixed", labelEn: "Oily T-zone, drier cheeks", labelKo: "T존은 유분, 볼은 건조", labelFr: "Zone T grasse, joues plus sèches", labelJa: "Tゾーンは脂っぽく頬は乾燥" },
          { value: "comfortable", labelEn: "Mostly comfortable", labelKo: "대체로 편안함", labelFr: "Plutôt confortable", labelJa: "ほぼ快適" },
        ],
      },
      {
        id: "middayShine",
        labelEn: "How does your face look by midday?",
        labelKo: "점심 무렵 얼굴은 보통 어떻게 보이나요?",
        labelFr: "À midi, comment votre visage se présente-t-il ?",
        labelJa: "昼頃の顔の状態はどうですか？",
        options: [
          { value: "matte", labelEn: "Still matte or dry", labelKo: "여전히 매트하거나 건조", labelFr: "Encore mat ou sec", labelJa: "まだマットまたは乾燥" },
          { value: "tzone", labelEn: "Shiny on forehead/nose only", labelKo: "이마와 코만 번들거림", labelFr: "Brillance surtout front/nez", labelJa: "額と鼻だけテカる" },
          { value: "allover", labelEn: "Shiny all over", labelKo: "전체적으로 번들거림", labelFr: "Brillance partout", labelJa: "全体がテカる" },
          { value: "balanced", labelEn: "Balanced", labelKo: "균형 있음", labelFr: "Équilibré", labelJa: "バランスがよい" },
        ],
      },
      {
        id: "reactivity",
        labelEn: "How easily does your skin react to new products?",
        labelKo: "새 제품에 피부가 얼마나 쉽게 반응하나요?",
        labelFr: "Votre peau réagit-elle facilement aux nouveaux produits ?",
        labelJa: "新しい製品に肌は反応しやすいですか？",
        options: LEVELS,
      },
    ],
  },
  {
    id: "routine_and_products",
    titleEn: "Routine and products",
    titleKo: "루틴과 제품",
    titleFr: "Routine et produits",
    titleJa: "ルーティンと製品",
    descriptionEn: "Checks cleansing, SPF, strong actives, frequency and missing routine basics.",
    descriptionKo: "세안, SPF, 강한 활성 성분, 빈도와 빠진 기본 단계를 확인합니다.",
    descriptionFr: "Vérifie nettoyage, SPF, actifs puissants, fréquence et étapes de base manquantes.",
    descriptionJa: "洗顔、SPF、強い有効成分、頻度、不足している基本ステップを確認します。",
    questions: [
      {
        id: "cleanseFrequency",
        labelEn: "How often do you cleanse your face?",
        labelKo: "얼굴 세안은 얼마나 자주 하나요?",
        labelFr: "À quelle fréquence nettoyez-vous votre visage ?",
        labelJa: "顔はどのくらいの頻度で洗いますか？",
        options: [
          { value: "once", labelEn: "Once a day", labelKo: "하루 한 번", labelFr: "Une fois par jour", labelJa: "1日1回" },
          { value: "twice", labelEn: "Morning and evening", labelKo: "아침과 저녁", labelFr: "Matin et soir", labelJa: "朝と夜" },
          { value: "too_much", labelEn: "Three or more times", labelKo: "세 번 이상", labelFr: "Trois fois ou plus", labelJa: "3回以上" },
          { value: "irregular", labelEn: "Irregular", labelKo: "불규칙함", labelFr: "Irrégulier", labelJa: "不規則" },
        ],
      },
      {
        id: "spfUse",
        labelEn: "How often do you use SPF in the morning?",
        labelKo: "아침에 SPF를 얼마나 자주 바르나요?",
        labelFr: "À quelle fréquence utilisez-vous un SPF le matin ?",
        labelJa: "朝のSPFはどのくらい使いますか？",
        options: [
          { value: "daily", labelEn: "Every day", labelKo: "매일", labelFr: "Tous les jours", labelJa: "毎日" },
          { value: "sometimes", labelEn: "Sometimes", labelKo: "가끔", labelFr: "Parfois", labelJa: "時々" },
          { value: "rarely", labelEn: "Rarely", labelKo: "거의 안 함", labelFr: "Rarement", labelJa: "ほとんど使わない" },
        ],
      },
      {
        id: "strongActives",
        labelEn: "Do you use retinoids, exfoliating acids, benzoyl peroxide or high vitamin C?",
        labelKo: "레티노이드, 각질 제거산, 벤조일 퍼옥사이드 또는 고함량 비타민 C를 사용하나요?",
        labelFr: "Utilisez-vous rétinoïdes, acides exfoliants, peroxyde de benzoyle ou vitamine C forte ?",
        labelJa: "レチノイド、角質ケア酸、過酸化ベンゾイル、高濃度ビタミンCを使いますか？",
        options: YES_NO,
      },
      {
        id: "activeFrequency",
        labelEn: "If yes, how often?",
        labelKo: "사용한다면 빈도는 어느 정도인가요?",
        labelFr: "Si oui, à quelle fréquence ?",
        labelJa: "使う場合、頻度はどのくらいですか？",
        options: [
          { value: "rare", labelEn: "1-2 nights per week", labelKo: "주 1~2회", labelFr: "1 à 2 soirs par semaine", labelJa: "週1〜2夜" },
          { value: "moderate", labelEn: "3-4 times per week", labelKo: "주 3~4회", labelFr: "3 à 4 fois par semaine", labelJa: "週3〜4回" },
          { value: "daily", labelEn: "Almost daily", labelKo: "거의 매일", labelFr: "Presque tous les jours", labelJa: "ほぼ毎日" },
          { value: "none", labelEn: "I do not use them", labelKo: "사용하지 않음", labelFr: "Je n'en utilise pas", labelJa: "使っていない" },
        ],
      },
    ],
  },
  {
    id: "concerns_goals",
    titleEn: "Concerns and goals",
    titleKo: "고민과 목표",
    titleFr: "Préoccupations et objectifs",
    titleJa: "悩みと目標",
    descriptionEn: "Haru prioritizes advice around the changes you actually want.",
    descriptionKo: "Haru가 실제 목표에 맞춰 조언의 우선순위를 정합니다.",
    descriptionFr: "Haru priorise les conseils selon vos vrais objectifs.",
    descriptionJa: "Haruは実際の目標に合わせて優先順位を決めます。",
    questions: [
      {
        id: "mainConcern",
        labelEn: "What is your main skin concern?",
        labelKo: "가장 큰 피부 고민은 무엇인가요?",
        labelFr: "Quelle est votre principale préoccupation peau ?",
        labelJa: "一番気になる肌悩みは何ですか？",
        options: [
          { value: "acne", labelEn: "Breakouts", labelKo: "트러블", labelFr: "Boutons", labelJa: "ニキビ" },
          { value: "dryness", labelEn: "Dryness", labelKo: "건조", labelFr: "Sécheresse", labelJa: "乾燥" },
          { value: "redness", labelEn: "Redness or sensitivity", labelKo: "붉어짐 또는 민감함", labelFr: "Rougeurs ou sensibilité", labelJa: "赤み・敏感" },
          { value: "spots", labelEn: "Dark spots or uneven tone", labelKo: "색소와 톤 불균형", labelFr: "Taches ou teint irrégulier", labelJa: "シミ・色ムラ" },
          { value: "aging", labelEn: "Fine lines or firmness", labelKo: "잔주름 또는 탄력", labelFr: "Ridules ou fermeté", labelJa: "小じわ・ハリ" },
        ],
      },
      {
        id: "goalSpeed",
        labelEn: "How quickly do you usually change products?",
        labelKo: "제품을 보통 얼마나 빠르게 바꾸나요?",
        labelFr: "À quelle vitesse changez-vous habituellement de produits ?",
        labelJa: "普段どのくらい早く製品を変えますか？",
        options: [
          { value: "slow", labelEn: "Slowly, one at a time", labelKo: "천천히 하나씩", labelFr: "Lentement, un par un", labelJa: "ゆっくり一つずつ" },
          { value: "medium", labelEn: "A few changes together", labelKo: "몇 가지를 함께", labelFr: "Quelques changements ensemble", labelJa: "いくつか同時に" },
          { value: "fast", labelEn: "Very often", labelKo: "매우 자주", labelFr: "Très souvent", labelJa: "かなり頻繁" },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    titleEn: "Lifestyle context",
    titleKo: "생활 환경",
    titleFr: "Contexte de vie",
    titleJa: "生活環境",
    descriptionEn: "Sleep, stress, water, sun and movement can change what your skin needs that day.",
    descriptionKo: "수면, 스트레스, 수분, 햇빛, 움직임은 그날 피부가 필요로 하는 것을 바꿀 수 있습니다.",
    descriptionFr: "Sommeil, stress, eau, soleil et mouvement peuvent changer les besoins de la peau.",
    descriptionJa: "睡眠、ストレス、水分、日差し、運動はその日の肌ニーズを変えます。",
    questions: [...WELLBEING_QUESTIONS, ...LIFESTYLE_QUESTIONS],
  },
];
