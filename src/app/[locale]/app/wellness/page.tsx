import { ArrowRight, Brain, CloudRain, Moon, ShieldCheck, Waves, Wind } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WellnessPlayer, type SoundMode } from "@/components/wellness-player";

const copy = {
  en: {
    title: "Wellness",
    subtitle: "Stress, sleep and facial tension can change how skin looks and feels. This space keeps the support practical, calm and non-medical.",
    science: "Stress and skin",
    scienceText: "Stress can influence sleep, picking, itching, oiliness and inflammation signals. Haru treats this as lifestyle support, not diagnosis or treatment.",
    breathing: "Two-minute breathing",
    breathingText: "Inhale for 4, hold for 2, exhale for 6. Repeat five times before a night routine or when the jaw feels tense.",
    sleep: "Sleep cue",
    sleepText: "Keep the last skincare step simple at night: cleanse, moisturize, pause the phone brightness, and let actives wait if the skin feels hot.",
    sounds: "Integrated calming sounds",
    soundsText: "These sounds are relaxation supports only. Frequencies are not presented as skin treatments, collagen boosters or medical therapy.",
    faceCare: "Face care library",
    faceCareText: "Gentle massage, face yoga, jaw release and scalp tension routines.",
    openFaceCare: "Open face care",
  },
  ko: {
    title: "웰니스",
    subtitle: "스트레스, 수면, 얼굴 긴장은 피부가 보이고 느껴지는 방식에 영향을 줄 수 있어요. 이 공간은 의학적 치료가 아니라 실용적인 회복 지원입니다.",
    science: "스트레스와 피부",
    scienceText: "스트레스는 수면, 만지기 습관, 가려움, 유분감, 염증 신호에 영향을 줄 수 있어요. Haru는 이를 진단이 아닌 생활 지원으로 다룹니다.",
    breathing: "2분 호흡",
    breathingText: "4초 들이마시고, 2초 멈추고, 6초 내쉬세요. 밤 루틴 전이나 턱이 긴장될 때 다섯 번 반복하세요.",
    sleep: "수면 힌트",
    sleepText: "밤 마지막 단계는 단순하게 유지하세요. 세안, 보습, 화면 밝기 줄이기, 피부가 뜨거우면 활성 성분은 쉬어 주세요.",
    sounds: "내장 릴랙싱 사운드",
    soundsText: "이 소리는 휴식 보조용입니다. 주파수를 피부 치료, 콜라겐 증가, 의학적 치료로 설명하지 않습니다.",
    faceCare: "페이스 케어 라이브러리",
    faceCareText: "부드러운 마사지, 페이스 요가, 턱 이완, 두피 긴장 루틴을 확인하세요.",
    openFaceCare: "페이스 케어 열기",
  },
};

export default async function WellnessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[locale === "ko" ? "ko" : "en"];

  const players: Array<[SoundMode, string, string]> =
    locale === "ko"
      ? [
          ["white", "화이트 노이즈", "집중과 휴식을 위한 균일한 소리"],
          ["pink", "핑크 노이즈", "더 부드럽고 낮은 톤의 소리"],
          ["rain", "비 소리", "짧은 휴식이나 밤 루틴 전"],
          ["ocean", "파도 소리", "느린 호흡과 함께 사용"],
          ["calm432", "432 Hz 톤", "휴식 분위기를 위한 단순한 톤"],
          ["soft528", "528 Hz 톤", "의학적 효과가 아닌 편안한 청취용"],
        ]
      : [
          ["white", "White noise", "Even sound for focus or winding down"],
          ["pink", "Pink noise", "Softer low-frequency sound"],
          ["rain", "Rain texture", "Short reset before an evening routine"],
          ["ocean", "Ocean texture", "Use with slow breathing"],
          ["calm432", "432 Hz tone", "A simple relaxation tone"],
          ["soft528", "528 Hz tone", "For calm listening, not medical effect"],
        ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section className="rounded-[2rem] bg-card p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.4)] sm:p-8">
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t.subtitle}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <WellnessCard icon={Brain} title={t.science} text={t.scienceText} />
        <WellnessCard icon={Wind} title={t.breathing} text={t.breathingText} />
        <WellnessCard icon={Moon} title={t.sleep} text={t.sleepText} />
      </div>

      <section className="rounded-[2rem] bg-secondary/60 p-5 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <CloudRain className="mt-1 size-5 shrink-0 text-primary" />
          <div>
            <h2 className="font-serif text-2xl">{t.sounds}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.soundsText}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {players.map(([mode, label, description]) => (
            <WellnessPlayer key={mode} mode={mode} label={label} description={description} />
          ))}
        </div>
      </section>

      <Card className="rounded-[2rem] bg-card/90">
        <div className="flex items-start gap-3">
          <Waves className="mt-1 size-5 shrink-0 text-primary" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl">{t.faceCare}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.faceCareText}</p>
          </div>
        </div>
        <Button asChild className="self-start">
          <Link href="/app/wellness/face-care">
            {t.openFaceCare}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <p className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        {t.soundsText}
      </p>
    </div>
  );
}

function WellnessCard({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <Card className="rounded-[1.5rem]">
      <Icon className="size-5 text-primary" />
      <h2 className="font-serif text-xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </Card>
  );
}
