import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FaceCareSession } from "@/components/face-care-session";
import { getFaceCareRoutine } from "@/lib/face-care-data";

const labels = {
  en: {
    back: "Face care",
    goal: "Goal",
    duration: "Duration",
    difficulty: "Difficulty",
    zones: "Zones",
    frequency: "Frequency",
    precautions: "Precautions",
    evidence: "Evidence",
    start: "Start",
    pause: "Pause",
    next: "Next",
    previous: "Previous",
    restart: "Do it again",
    stepOf: "Step {current} of {total}",
    done: "Session complete",
    doneText: "Nice and easy. Come back whenever your face feels tense.",
  },
  ko: {
    back: "페이스 케어",
    goal: "목표",
    duration: "시간",
    difficulty: "난이도",
    zones: "부위",
    frequency: "빈도",
    precautions: "주의",
    evidence: "근거",
    start: "시작",
    pause: "일시정지",
    next: "다음",
    previous: "이전",
    restart: "다시 하기",
    stepOf: "{total}단계 중 {current}단계",
    done: "세션 완료",
    doneText: "잘하셨어요. 얼굴이 긴장될 때 언제든 다시 오세요.",
  },
};

export default async function FaceCareRoutinePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "ko" ? "ko" : "en";
  const t = labels[lang];

  const routine = getFaceCareRoutine(slug);
  if (!routine) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link href="/app/wellness/face-care" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        {t.back}
      </Link>

      <section>
        <h1 className="font-serif text-4xl">{routine.name[lang]}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{routine.goal[lang]}</p>
      </section>

      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
        <Fact label={t.duration} value={routine.duration[lang]} icon={Clock} />
        <Fact label={t.difficulty} value={routine.difficulty[lang]} />
        <Fact label={t.zones} value={routine.zones[lang]} />
        <Fact label={t.frequency} value={routine.frequency[lang]} />
        <Fact label={t.evidence} value={routine.evidence[lang]} icon={ShieldCheck} />
      </div>

      <p className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>
          <span className="font-medium text-foreground">{t.precautions}: </span>
          {routine.precautions[lang]}
        </span>
      </p>

      <FaceCareSession
        steps={routine.steps.map((step) => ({
          diagram: step.diagram,
          seconds: step.seconds,
          title: step.title[lang],
          instruction: step.instruction[lang],
        }))}
        labels={t}
      />
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
