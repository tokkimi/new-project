import { Camera, LineChart, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const copy = {
  en: {
    title: "Progress",
    subtitle: "Track scans, routine changes and personal notes without turning lighting differences into false results.",
    history: "Scan history",
    historyText: "Future saved scans will appear here with date, visible observations, confidence and recommended changes.",
    compare: "Before / after",
    compareText: "Comparisons should be read carefully: Haru flags photo quality and never treats lighting as guaranteed improvement.",
    routine: "Routine changes",
    routineText: "Products added after a scan or audit will be grouped here so you can understand what changed and why.",
    cta: "Start a new scan",
  },
  ko: {
    title: "진행 기록",
    subtitle: "조명 차이를 실제 결과처럼 보지 않도록 스캔, 루틴 변경, 개인 메모를 함께 추적하세요.",
    history: "스캔 기록",
    historyText: "저장된 스캔은 날짜, 보이는 관찰, 신뢰도, 추천 변경 사항과 함께 여기에 표시됩니다.",
    compare: "전후 비교",
    compareText: "비교는 조심스럽게 읽어야 합니다. Haru는 사진 품질을 표시하고 조명 변화를 확실한 개선으로 말하지 않습니다.",
    routine: "루틴 변경",
    routineText: "스캔이나 점검 뒤 추가한 제품은 무엇이 왜 바뀌었는지 이해할 수 있도록 여기에 묶입니다.",
    cta: "새 스캔 시작",
  },
};

export default async function ProgressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[locale === "ko" ? "ko" : "en"];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <section>
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t.subtitle}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <ProgressCard icon={Camera} title={t.history} text={t.historyText} />
        <ProgressCard icon={LineChart} title={t.compare} text={t.compareText} />
        <ProgressCard icon={ShieldCheck} title={t.routine} text={t.routineText} />
      </div>
      <Button asChild className="self-start">
        <Link href="/app/face-scan">{t.cta}</Link>
      </Button>
    </div>
  );
}

function ProgressCard({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <Card className="rounded-[1.5rem]">
      <Icon className="size-5 text-primary" />
      <h2 className="font-serif text-xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </Card>
  );
}
