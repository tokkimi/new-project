import { AlertTriangle, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const routines = {
  en: [
    ["Lymphatic drainage", "Reduce the feeling of puffiness", "5 min", "Easy", "Cheeks, jaw, neck", "2-4x/week", "Use very light pressure; avoid inflamed or painful areas.", "Supportive self-care"],
    ["Gua Sha basics", "Slow facial massage with slip", "6 min", "Easy", "Jaw, cheeks, brow", "1-3x/week", "Never scrape dry skin; pause with active acne, irritation or broken skin.", "Limited but commonly used relaxation practice"],
    ["Kobido-inspired lift", "Relax facial tension", "8 min", "Medium", "Cheeks, temples, forehead", "1-2x/week", "Keep movements gentle; no promise of permanent structural change.", "Wellness and tension support"],
    ["Jaw release", "Ease clenching tension", "4 min", "Easy", "Masseter, temples", "Daily if comfortable", "Stop if pain increases; dental or jaw pain needs a clinician.", "Tension support"],
    ["Scalp massage", "Relax scalp and forehead tension", "5 min", "Easy", "Scalp, temples, forehead", "Daily or as needed", "Avoid irritated scalp areas.", "Relaxation support"],
    ["Soft face yoga", "Gentle mobility", "7 min", "Easy", "Eyes, cheeks, lips", "3x/week", "Do not pull hard or repeat movements that create discomfort.", "Low-risk mobility practice"],
  ],
  ko: [
    ["림프 드레나주", "붓는 느낌 완화", "5분", "쉬움", "볼, 턱, 목", "주 2-4회", "아주 약한 압력으로 진행하고 염증이나 통증 부위는 피하세요.", "셀프 케어 보조"],
    ["괄사 기본", "오일감 있는 상태에서 느린 얼굴 마사지", "6분", "쉬움", "턱, 볼, 눈썹 주변", "주 1-3회", "마른 피부에 문지르지 말고, 활성 트러블이나 자극, 상처가 있으면 쉬세요.", "제한적 근거의 릴랙싱 관행"],
    ["고바도식 이완", "얼굴 긴장 완화", "8분", "중간", "볼, 관자놀이, 이마", "주 1-2회", "동작은 부드럽게 하고 얼굴 구조가 영구적으로 바뀐다고 말하지 않습니다.", "웰니스와 긴장 완화 보조"],
    ["턱 이완", "이 악물기 긴장 완화", "4분", "쉬움", "저작근, 관자놀이", "편안하면 매일", "통증이 심해지면 중단하세요. 치아나 턱 통증은 전문가 상담이 필요합니다.", "긴장 완화 보조"],
    ["두피 마사지", "두피와 이마 긴장 완화", "5분", "쉬움", "두피, 관자놀이, 이마", "매일 또는 필요할 때", "두피가 자극된 부위는 피하세요.", "휴식 보조"],
    ["부드러운 페이스 요가", "가벼운 움직임", "7분", "쉬움", "눈가, 볼, 입 주변", "주 3회", "세게 당기지 말고 불편한 동작은 반복하지 마세요.", "저위험 움직임 연습"],
  ],
};

const labels = {
  en: {
    title: "Face care",
    subtitle: "Massage, jaw release and face yoga are presented as comfort and relaxation practices, not as permanent reshaping or medical treatment.",
    goal: "Goal",
    duration: "Duration",
    difficulty: "Difficulty",
    zones: "Zones",
    frequency: "Frequency",
    precautions: "Precautions",
    evidence: "Evidence",
  },
  ko: {
    title: "페이스 케어",
    subtitle: "마사지, 턱 이완, 페이스 요가는 편안함과 휴식을 위한 연습입니다. 영구적인 얼굴 변화나 의학적 치료로 설명하지 않습니다.",
    goal: "목표",
    duration: "시간",
    difficulty: "난이도",
    zones: "부위",
    frequency: "빈도",
    precautions: "주의",
    evidence: "근거",
  },
};

export default async function FaceCarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "ko" ? "ko" : "en";
  const t = labels[lang];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section>
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t.subtitle}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        {routines[lang].map(([name, goal, duration, difficulty, zones, frequency, precautions, evidence]) => (
          <Card key={name} className="rounded-[1.5rem]">
            <Sparkles className="size-5 text-primary" />
            <h2 className="font-serif text-2xl">{name}</h2>
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <Fact label={t.goal} value={goal} />
              <Fact label={t.duration} value={duration} icon={Clock} />
              <Fact label={t.difficulty} value={difficulty} />
              <Fact label={t.zones} value={zones} />
              <Fact label={t.frequency} value={frequency} />
              <Fact label={t.evidence} value={evidence} icon={ShieldCheck} />
            </div>
            <p className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                <span className="font-medium text-foreground">{t.precautions}: </span>
                {precautions}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Fact({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </p>
      <p className="mt-1 text-foreground">{value}</p>
    </div>
  );
}
