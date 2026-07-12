import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaceDiagram } from "@/components/face-diagram";
import { FACE_CARE_ROUTINES } from "@/lib/face-care-data";

const labels = {
  en: {
    title: "Face care",
    subtitle: "Massage, jaw release and face yoga are presented as comfort and relaxation practices, not as permanent reshaping or medical treatment. Each routine opens as a guided, step-by-step session.",
    duration: "Duration",
    start: "Start routine",
  },
  ko: {
    title: "페이스 케어",
    subtitle: "마사지, 턱 이완, 페이스 요가는 편안함과 휴식을 위한 연습입니다. 영구적인 얼굴 변화나 의학적 치료로 설명하지 않습니다. 각 루틴은 단계별 가이드 세션으로 진행됩니다.",
    duration: "시간",
    start: "루틴 시작",
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
        {FACE_CARE_ROUTINES.map((routine) => (
          <Card key={routine.slug} className="rounded-[1.5rem]">
            <div className="flex items-start gap-4">
              <FaceDiagram variant={routine.steps[0].diagram} className="size-20 shrink-0" />
              <div>
                <Sparkles className="size-5 text-primary" />
                <h2 className="mt-1 font-serif text-2xl">{routine.name[lang]}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{routine.goal[lang]}</p>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Clock className="size-3.5" />
              {t.duration}: {routine.duration[lang]} &middot; {routine.steps.length} {lang === "ko" ? "단계" : "steps"}
            </p>
            <Button asChild className="self-start">
              <Link href={`/app/wellness/face-care/${routine.slug}`}>
                {t.start}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
