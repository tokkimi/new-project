import { getTranslations, getLocale } from "next-intl/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, Link } from "@/i18n/navigation";
import { FileText, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileTabs } from "@/components/profile-tabs";

export default async function ProfilePage() {
  const session = await auth();
  const locale = await getLocale();

  const userId = session?.user?.id;
  if (!userId) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const [user, shelfCount, scans, bilans] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, createdAt: true },
    }),
    db.shelfItem.count({ where: { userId } }),
    db.faceScanResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, createdAt: true, overallScore: true, summary: true },
    }),
    db.bilan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, createdAt: true, overallScore: true },
    }),
  ]);

  if (!user) {
    redirect({ href: "/sign-in", locale });
    return;
  }

  const t = await getTranslations("profile");
  const tReport = await getTranslations("report");
  const memberSince = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(user.createdAt);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">{t("settingsTitle")}</h1>
        <p className="mt-1 text-muted-foreground">{t("settingsSubtitle")}</p>
      </div>

      <Card className="gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-medium text-primary-foreground">
            {(user.name ?? user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name ?? user.email}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <p>{t("memberSince", { date: memberSince })}</p>
          <p>{t("shelfCount", { count: shelfCount })}</p>
        </div>
      </Card>

      <Link href="/app/report" className="block">
        <Card className="flex-row items-center gap-4 transition-colors hover:border-primary/40">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{tReport("entryTitle")}</p>
            <p className="text-sm text-muted-foreground">{tReport("entryText")}</p>
          </div>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </Card>
      </Link>

      <ProfileTabs
        name={user.name}
        email={user.email}
        scans={scans.map((s) => ({
          id: s.id,
          createdAt: s.createdAt.toISOString(),
          overallScore: s.overallScore,
          summary: s.summary,
        }))}
        bilans={bilans.map((b) => ({
          id: b.id,
          createdAt: b.createdAt.toISOString(),
          overallScore: b.overallScore,
        }))}
      />
    </div>
  );
}
