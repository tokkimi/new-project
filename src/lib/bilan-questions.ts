export interface BilanOption {
  value: string;
  labelEn: string;
  labelKo: string;
}

export interface BilanQuestion {
  id: string;
  labelEn: string;
  labelKo: string;
  options: BilanOption[];
}

export const WELLBEING_QUESTIONS: BilanQuestion[] = [
  {
    id: "moodToday",
    labelEn: "How would you describe your mood today?",
    labelKo: "오늘 기분은 어떤가요?",
    options: [
      { value: "calm", labelEn: "Calm", labelKo: "차분함" },
      { value: "neutral", labelEn: "Neutral", labelKo: "보통" },
      { value: "stressed", labelEn: "Stressed", labelKo: "스트레스 받음" },
      { value: "overwhelmed", labelEn: "Overwhelmed", labelKo: "지침" },
    ],
  },
  {
    id: "sleepLastNight",
    labelEn: "How did you sleep last night?",
    labelKo: "어젯밤 잠은 어땠나요?",
    options: [
      { value: "great", labelEn: "Great, well rested", labelKo: "충분히 잘 잤어요" },
      { value: "ok", labelEn: "OK, could be better", labelKo: "그럭저럭이었어요" },
      { value: "poor", labelEn: "Poor, disrupted", labelKo: "제대로 못 잤어요" },
    ],
  },
  {
    id: "skinFeelsToday",
    labelEn: "How does your skin feel right now?",
    labelKo: "지금 피부 상태는 어떤가요?",
    options: [
      { value: "comfortable", labelEn: "Comfortable", labelKo: "편안함" },
      { value: "tight", labelEn: "Tight or dry", labelKo: "당기거나 건조함" },
      { value: "oily", labelEn: "Oily or shiny", labelKo: "유분기 있음" },
      { value: "irritated", labelEn: "Irritated or itchy", labelKo: "자극되거나 가려움" },
    ],
  },
];

export const AGE_QUESTION: BilanQuestion = {
  id: "ageRange",
  labelEn: "What's your age range?",
  labelKo: "연령대가 어떻게 되세요?",
  options: [
    { value: "teens", labelEn: "Teens", labelKo: "10대" },
    { value: "20s", labelEn: "20s", labelKo: "20대" },
    { value: "30s", labelEn: "30s", labelKo: "30대" },
    { value: "40s", labelEn: "40s", labelKo: "40대" },
    { value: "50plus", labelEn: "50+", labelKo: "50대 이상" },
  ],
};

export const LIFESTYLE_QUESTIONS: BilanQuestion[] = [
  {
    id: "waterIntake",
    labelEn: "How much water do you usually drink per day?",
    labelKo: "하루에 물을 보통 얼마나 마시나요?",
    options: [
      { value: "low", labelEn: "Less than 1L", labelKo: "1L 미만" },
      { value: "medium", labelEn: "1-2L", labelKo: "1~2L" },
      { value: "high", labelEn: "2L or more", labelKo: "2L 이상" },
    ],
  },
  {
    id: "smokes",
    labelEn: "Do you smoke?",
    labelKo: "흡연하시나요?",
    options: [
      { value: "no", labelEn: "No", labelKo: "아니요" },
      { value: "occasionally", labelEn: "Occasionally", labelKo: "가끔" },
      { value: "yes", labelEn: "Yes, regularly", labelKo: "네, 자주" },
    ],
  },
  {
    id: "sleepHours",
    labelEn: "How many hours do you usually sleep?",
    labelKo: "보통 몇 시간 정도 주무세요?",
    options: [
      { value: "under6", labelEn: "Under 6 hours", labelKo: "6시간 미만" },
      { value: "6to8", labelEn: "6-8 hours", labelKo: "6~8시간" },
      { value: "over8", labelEn: "Over 8 hours", labelKo: "8시간 이상" },
    ],
  },
  {
    id: "stressLevel",
    labelEn: "How would you rate your everyday stress level?",
    labelKo: "평소 스트레스 수준은 어느 정도인가요?",
    options: [
      { value: "low", labelEn: "Low", labelKo: "낮음" },
      { value: "medium", labelEn: "Medium", labelKo: "보통" },
      { value: "high", labelEn: "High", labelKo: "높음" },
    ],
  },
  {
    id: "sunExposure",
    labelEn: "How much daily sun exposure do you get?",
    labelKo: "하루에 햇빛 노출은 어느 정도인가요?",
    options: [
      { value: "low", labelEn: "Low, mostly indoors", labelKo: "적음, 주로 실내" },
      { value: "medium", labelEn: "Medium, some time outside", labelKo: "보통, 가끔 외출" },
      { value: "high", labelEn: "High, outside most of the day", labelKo: "많음, 대부분 야외" },
    ],
  },
  {
    id: "exerciseFrequency",
    labelEn: "How often do you exercise?",
    labelKo: "운동은 얼마나 자주 하시나요?",
    options: [
      { value: "rarely", labelEn: "Rarely", labelKo: "거의 안 함" },
      { value: "weekly", labelEn: "A few times a week", labelKo: "주 몇 회" },
      { value: "frequent", labelEn: "Almost daily", labelKo: "거의 매일" },
    ],
  },
];

export function allBilanQuestions(): BilanQuestion[] {
  return [...WELLBEING_QUESTIONS, AGE_QUESTION, ...LIFESTYLE_QUESTIONS];
}
