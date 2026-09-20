import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaceDiagram } from "@/components/face-diagram";
import { FACE_CARE_ROUTINES, type FaceCareLang } from "@/lib/face-care-data";

const labels: Record<
  FaceCareLang,
  {
    title: string;
    subtitle: string;
    duration: string;
    start: string;
    steps: string;
  }
> = {
  en: {
    title: "Face care",
    subtitle:
      "Gentle massage, jaw release and face yoga are presented as comfort and relaxation practices, not medical treatment. Each routine opens as a guided step-by-step session.",
    duration: "Duration",
    start: "Start routine",
    steps: "steps",
  },
  ko: {
    title: "페이스 케어",
    subtitle:
      "마사지, 턱 이완, 페이스 요가는 편안함과 휴식을 위한 루틴입니다. 의학적 치료가 아니며, 각 루틴은 단계별 가이드로 진행됩니다.",
    duration: "소요 시간",
    start: "루틴 시작",
    steps: "단계",
  },
  fr: {
    title: "Face care",
    subtitle:
      "Massage doux, relachement de la machoire et face yoga sont proposes comme pratiques de confort et de relaxation, pas comme traitement medical. Chaque routine s'ouvre en session guidee.",
    duration: "Duree",
    start: "Demarrer la routine",
    steps: "etapes",
  },
  ja: {
    title: "フェイスケア",
    subtitle:
      "やさしいマッサージ、顎のリリース、フェイスヨガは、心地よさとリラックスのためのケアです。医療行為ではなく、各ルーティンはステップ形式で進みます。",
    duration: "所要時間",
    start: "ルーティン開始",
    steps: "ステップ",
  },
};

function resolveLang(locale: string): FaceCareLang {
  if (locale === "ko" || locale === "fr" || locale === "ja") return locale;
  return "en";
}

export default async function FaceCarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = resolveLang(locale);
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
                <h2 className="font-serif text-2xl">{routine.name[lang]}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{routine.goal[lang]}</p>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Clock className="size-3.5" />
              {t.duration}: {routine.duration[lang]} · {routine.steps.length} {t.steps}
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
