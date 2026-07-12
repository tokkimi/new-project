import { Camera, LineChart, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const copy = {
  en: {
    title: "Progress",
    subtitle: "Track scans, routine changes and personal notes without turning lighting differences into false results.",
    history: "Scan history",
    empty: "No scans saved yet. Run a face scan and it will show up here.",
    compare: "Reading your history",
    compareText: "Comparisons should be read carefully: Haru flags photo quality and never treats lighting as guaranteed improvement.",
    routine: "Routine changes",
    routineText: "Products added after a scan or audit will be grouped here so you can understand what changed and why.",
    cta: "Start a new scan",
    scoreLabel: "Skin score",
  },
  ko: {
    title: "진행 기록",
    subtitle: "조명 차이를 실제 결과처럼 보지 않도록 스캔, 루틴 변경, 개인 메모를 함께 추적하세요.",
    history: "스캔 기록",
    empty: "아직 저장된 스캔이 없어요. 얼굴 스캔을 하면 여기에 표시됩니다.",
    compare: "기록 읽는 법",
    compareText: "비교는 조심스럽게 읽어야 합니다. Haru는 사진 품질을 표시하고 조명 변화를 확실한 개선으로 말하지 않습니다.",
    routine: "루틴 변경",
    routineText: "스캔이나 점검 뒤 추가한 제품은 무엇이 왜 바뀌었는지 이해할 수 있도록 여기에 묶입니다.",
    cta: "새 스캔 시작",
    scoreLabel: "피부 점수",
  },
};

function scoreTone(score: number) {
  if (score >= 70) return "success" as const;
  if (score >= 40) return "warning" as const;
  return "destructive" as const;
}

export default async function ProgressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[locale === "ko" ? "ko" : "en"];
  const session = await auth();

  const scans = session?.user?.id
    ? await db.faceScanResult.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <section>
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t.subtitle}</p>
      </section>

      <Card className="rounded-[1.5rem]">
        <div className="flex items-center gap-2">
          <Camera className="size-5 text-primary" />
          <h2 className="font-serif text-xl">{t.history}</h2>
        </div>
        {scans.length === 0 ? (
          <p className="text-sm leading-6 text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {scan.createdAt.toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {scan.summary && (
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{scan.summary}</p>
                  )}
                </div>
                <Badge variant={scoreTone(scan.overallScore)} className="shrink-0">
                  {t.scoreLabel} {scan.overallScore}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
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
