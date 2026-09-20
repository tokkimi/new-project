"use client";

import * as React from "react";
import { Sparkles, X } from "lucide-react";

const TIPS: { en: string; ko: string; fr: string; ja: string }[] = [
  {
    en: "Finish every morning routine with SPF, even indoors or on cloudy days.",
    ko: "실내에 있거나 흐린 날에도 아침 루틴은 SPF로 마무리하세요.",
    fr: "Terminez chaque routine du matin par un SPF, même en intérieur ou par temps couvert.",
    ja: "室内や曇りの日でも、朝のルーティンはSPFで仕上げましょう。",
  },
  {
    en: "Patch test a new active for a few days before using it on your face.",
    ko: "새로운 활성 성분은 얼굴에 바르기 전 며칠 동안 패치 테스트를 해보세요.",
    fr: "Testez un nouvel actif quelques jours sur une petite zone avant de l’appliquer sur le visage.",
    ja: "新しい有効成分は、顔に使う前に数日間パッチテストをしましょう。",
  },
  {
    en: "Layer from lightest to richest: toner, essence, serum, moisturizer, then SPF.",
    ko: "토너, 에센스, 세럼, 보습제, SPF 순서로 가벼운 제형부터 바르세요.",
    fr: "Appliquez du plus léger au plus riche : lotion, essence, sérum, hydratant, puis SPF.",
    ja: "化粧水、エッセンス、美容液、保湿剤、SPFの順に軽い質感から重ねましょう。",
  },
  {
    en: "Avoid using retinol and AHA/BHA on the same night; alternate them instead.",
    ko: "레티놀과 AHA/BHA는 같은 밤에 겹치지 말고 번갈아 사용하세요.",
    fr: "Évitez rétinol et AHA/BHA le même soir ; alternez-les plutôt.",
    ja: "レチノールとAHA/BHAは同じ夜に重ねず、交互に使いましょう。",
  },
  {
    en: "Cleanse gently: an over-stripped barrier usually makes concerns look worse.",
    ko: "세안은 부드럽게 하세요. 장벽이 과하게 벗겨지면 고민이 더 도드라질 수 있어요.",
    fr: "Nettoyez en douceur : une barrière décapée aggrave souvent les signes visibles.",
    ja: "洗顔はやさしく。落としすぎたバリアは悩みを目立たせやすくします。",
  },
  {
    en: "Give a new product four to six weeks before judging the result.",
    ko: "새 제품의 효과는 최소 4~6주 사용한 뒤 판단하세요.",
    fr: "Laissez quatre à six semaines à un nouveau produit avant de juger son effet.",
    ja: "新しい製品は、効果を判断する前に4〜6週間ほど続けましょう。",
  },
  {
    en: "Keep the evening routine simple when skin feels tight, red, or irritated.",
    ko: "피부가 당기거나 붉거나 자극받은 밤에는 저녁 루틴을 단순하게 유지하세요.",
    fr: "Gardez la routine du soir simple quand la peau tiraille, rougit ou s’irrite.",
    ja: "つっぱり、赤み、刺激を感じる夜は、夜のルーティンをシンプルにしましょう。",
  },
  {
    en: "Wash pillowcases and makeup brushes regularly to reduce breakout triggers.",
    ko: "트러블 유발 요인을 줄이려면 베개 커버와 메이크업 브러시를 자주 세척하세요.",
    fr: "Lavez régulièrement taies d’oreiller et pinceaux pour limiter les facteurs de boutons.",
    ja: "吹き出物のきっかけを減らすため、枕カバーとメイクブラシを定期的に洗いましょう。",
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
  const lang = locale === "ko" || locale === "fr" || locale === "ja" ? locale : "en";
  const storageKey = "haru-tip-of-the-day-seen";
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "true");
    window.requestAnimationFrame(() => setVisible(true));
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/42 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.6rem] border border-black/10 bg-white px-5 py-5 text-black shadow-[0_24px_90px_-35px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center text-black">
            <Sparkles className="size-5" strokeWidth={1.35} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-black/55">{label}</p>
            <p className="mt-1.5 text-sm leading-6 text-black sm:text-[15px]">{tip[lang]}</p>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Close"
            className="shrink-0 rounded-full border border-black/15 p-2 text-black/65 transition hover:bg-black/5 hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
