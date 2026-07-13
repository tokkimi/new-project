import { getTranslations } from "next-intl/server";
import { Wand2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { runUserAudit } from "@/lib/run-audit";
import { BilanWizard } from "@/components/bilan-wizard";

export default async function AuditPage() {
  const t = await getTranslations("auditPage");
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("signInPrompt")}</p>
        <Button asChild>
          <Link href="/sign-in">{t("signInPrompt")}</Link>
        </Button>
      </Card>
    );
  }

  const userId = session.user.id;
  const [profile, result, latestScan] = await Promise.all([
    db.skinProfile.findUnique({ where: { userId } }),
    runUserAudit(userId),
    db.faceScanResult.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, overallScore: true, skinType: true, summary: true, analysis: true, createdAt: true },
    }),
  ]);

  const initialAnswers: Record<string, string> = {};
  if (profile?.ageRange) initialAnswers.ageRange = profile.ageRange;
  if (profile?.waterIntake) initialAnswers.waterIntake = profile.waterIntake;
  if (profile?.smokes) initialAnswers.smokes = profile.smokes;
  if (profile?.sleepHours) initialAnswers.sleepHours = profile.sleepHours;
  if (profile?.stressLevel) initialAnswers.stressLevel = profile.stressLevel;
  if (profile?.sunExposure) initialAnswers.sunExposure = profile.sunExposure;
  if (profile?.exerciseFrequency) initialAnswers.exerciseFrequency = profile.exerciseFrequency;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      {!profile && (
        <Card className="gap-3 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Wand2 className="size-5" />
            </span>
            <div className="space-y-2">
              <p className="font-medium">{t("needsProfileTitle")}</p>
              <p className="text-sm text-muted-foreground">{t("needsProfileText")}</p>
              <Button asChild size="sm" variant="outline">
                <Link href="/app/quiz">{t("needsProfileCta")}</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}

      <BilanWizard
        auditResult={result}
        latestScan={latestScan ? { ...latestScan, createdAt: latestScan.createdAt.toISOString() } : null}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}
