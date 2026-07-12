import { ArrowRight, Camera, HeartPulse, LineChart, Moon, Sparkles, SunMedium } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const copy = {
  en: {
    title: "Today",
    subtitle: "Your daily skin space: routine, scan, audit and recovery in one calm view.",
    morning: "Morning base",
    morningText: "Gentle cleanse if needed, hydration, moisturizer, then SPF as the final step.",
    evening: "Evening reset",
    eveningText: "Remove SPF and makeup fully, keep actives planned, and leave recovery nights for your barrier.",
    scan: "Face Scan",
    scanText: "Take a new photo and get a zone-by-zone result with product suggestions.",
    audit: "Routine audit",
    auditText: "Check conflicts, missing steps and products that do not fit your profile.",
    progress: "Progress",
    progressText: "Follow changes over time without confusing lighting changes with real improvement.",
    wellness: "Wellness",
    wellnessText: "Breathing, stress support, sleep cues, calming sounds and face-care practices.",
    startScan: "Start scan",
    openAudit: "Open audit",
    openProgress: "See progress",
    openWellness: "Open wellness",
    shelfCount: "{count} products in your shelf",
  },
  ko: {
    title: "오늘",
    subtitle: "오늘의 피부 루틴, 스캔, 점검, 회복을 한 화면에서 차분하게 확인하세요.",
    morning: "아침 기본 루틴",
    morningText: "필요하면 부드럽게 세안하고, 수분, 보습제, 마지막 단계로 SPF를 사용하세요.",
    evening: "저녁 리셋",
    eveningText: "선크림과 메이크업을 충분히 지우고, 활성 성분은 계획적으로 사용하며 장벽 회복 밤을 남겨두세요.",
    scan: "페이스 스캔",
    scanText: "새 사진을 촬영하고 부위별 결과와 제품 제안을 받아보세요.",
    audit: "루틴 점검",
    auditText: "충돌, 빠진 단계, 프로필과 맞지 않는 제품을 확인하세요.",
    progress: "진행 기록",
    progressText: "조명 변화와 실제 개선을 혼동하지 않도록 시간에 따른 변화를 확인하세요.",
    wellness: "웰니스",
    wellnessText: "호흡, 스트레스 관리, 수면 힌트, 편안한 사운드와 페이스 케어를 이용하세요.",
    startScan: "스캔 시작",
    openAudit: "점검 열기",
    openProgress: "진행 보기",
    openWellness: "웰니스 열기",
    shelfCount: "내 화장대 제품 {count}개",
  },
};

export default async function TodayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[locale === "ko" ? "ko" : "en"];
  const session = await auth();
  const shelfCount = session?.user?.id
    ? await db.shelfItem.count({ where: { userId: session.user.id } })
    : 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section className="rounded-[2rem] bg-card p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.4)] sm:p-8">
        <p className="text-sm text-muted-foreground">{t.shelfCount.replace("{count}", String(shelfCount))}</p>
        <h1 className="mt-2 font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t.subtitle}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <DailyCard icon={SunMedium} title={t.morning} text={t.morningText} />
        <DailyCard icon={Moon} title={t.evening} text={t.eveningText} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ActionCard icon={Camera} title={t.scan} text={t.scanText} href="/app/face-scan" cta={t.startScan} />
        <ActionCard icon={Sparkles} title={t.audit} text={t.auditText} href="/app/audit" cta={t.openAudit} />
        <ActionCard icon={LineChart} title={t.progress} text={t.progressText} href="/app/progress" cta={t.openProgress} />
        <ActionCard icon={HeartPulse} title={t.wellness} text={t.wellnessText} href="/app/wellness" cta={t.openWellness} />
      </div>
    </div>
  );
}

function DailyCard({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <Card className="rounded-[1.5rem] bg-card/80">
      <Icon className="size-5 text-primary" />
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </Card>
  );
}

function ActionCard({ icon: Icon, title, text, href, cta }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; href: string; cta: string }) {
  return (
    <Card className="rounded-[1.5rem] bg-card/80">
      <Icon className="size-5 text-primary" />
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="flex-1 text-sm leading-6 text-muted-foreground">{text}</p>
      <Button asChild variant="outline" className="self-start">
        <Link href={href}>
          {cta}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </Card>
  );
}
