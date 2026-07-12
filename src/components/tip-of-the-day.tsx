import { Sun } from "lucide-react";

const TIPS: { en: string; ko: string }[] = [
  {
    en: "Always finish your morning routine with SPF, even indoors or on cloudy days.",
    ko: "실내에 있거나 흐린 날에도 아침 루틴은 항상 선크림으로 마무리하세요.",
  },
  {
    en: "Patch test a new active on your inner arm for a few days before using it on your face.",
    ko: "새로운 활성 성분은 얼굴에 바르기 전 며칠간 팔 안쪽에 패치 테스트를 해보세요.",
  },
  {
    en: "Layer thinnest to thickest: toner, essence, serum, moisturizer, then SPF.",
    ko: "가장 묽은 제형부터 발라주세요: 토너, 에센스, 세럼, 보습제, 그다음 선크림.",
  },
  {
    en: "Avoid mixing retinol and AHA/BHA on the same night — alternate them instead.",
    ko: "레티놀과 AHA/BHA는 같은 날 밤에 함께 쓰지 말고 번갈아 사용하세요.",
  },
  {
    en: "Cleanse gently — a stripped skin barrier makes most concerns worse, not better.",
    ko: "부드럽게 세안하세요 — 피부 장벽이 손상되면 대부분의 고민이 더 심해질 수 있어요.",
  },
  {
    en: "Give a new product 4-6 weeks before judging whether it's working.",
    ko: "새 제품은 효과를 판단하기까지 4~6주 정도 사용해보세요.",
  },
  {
    en: "Fragrance-free doesn't always mean gentle — check the full ingredient list if your skin is reactive.",
    ko: "무향이라고 항상 순한 건 아니에요 — 피부가 예민하다면 전체 성분표를 확인하세요.",
  },
  {
    en: "Keep your evening routine simple on nights your skin feels tight, red, or irritated.",
    ko: "피부가 당기거나 붉거나 자극이 느껴지는 밤에는 저녁 루틴을 단순하게 유지하세요.",
  },
  {
    en: "Clean your makeup brushes and pillowcase regularly to reduce breakouts.",
    ko: "메이크업 브러시와 베갯잇을 자주 세척하면 트러블을 줄이는 데 도움이 돼요.",
  },
  {
    en: "Vitamin C in the morning and retinol at night is a classic, well-tolerated pairing.",
    ko: "아침엔 비타민C, 밤엔 레티놀 — 자극이 적으면서도 효과적인 조합이에요.",
  },
];

function dayIndex(length: number) {
  const start = new Date(new Date().getFullYear(), 0, 0).getTime();
  const diff = Date.now() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % length;
}

export function TipOfTheDay({ locale, label }: { locale: string; label: string }) {
  const tip = TIPS[dayIndex(TIPS.length)];

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-primary/8 px-4 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Sun className="size-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{label}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-foreground">{locale === "ko" ? tip.ko : tip.en}</p>
      </div>
    </div>
  );
}
