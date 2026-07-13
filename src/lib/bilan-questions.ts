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

export function allBilanQuestions(): BilanQuestion[] {
  return [...WELLBEING_QUESTIONS, AGE_QUESTION, ...LIFESTYLE_QUESTIONS];
}
