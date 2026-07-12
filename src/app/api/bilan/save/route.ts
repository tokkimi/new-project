import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { runUserAudit } from "@/lib/run-audit";
import { evaluateLifestyle, combinedScore, type LifestyleAnswers } from "@/lib/bilan-engine";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = (await request.json()) as {
    answers?: Record<string, string>;
    faceScanResultId?: string | null;
    locale?: string;
  };
  const answers = body.answers ?? {};
  const lang = body.locale === "ko" ? "ko" : "en";

  const [auditResult, scan] = await Promise.all([
    runUserAudit(userId),
    body.faceScanResultId
      ? db.faceScanResult.findUnique({ where: { id: body.faceScanResultId } })
      : Promise.resolve(null),
  ]);
  const ownedScan = scan && scan.userId === userId ? scan : null;

  const { score: lifestyleScore, flags } = evaluateLifestyle(answers as LifestyleAnswers);

  const parts = [
    { value: auditResult.score, weight: 40 },
    { value: lifestyleScore, weight: 30 },
  ];
  if (ownedScan) parts.push({ value: ownedScan.overallScore, weight: 30 });
  const overallScore = combinedScore(parts);

  const bilan = await db.bilan.create({
    data: {
      userId,
      faceScanResultId: ownedScan?.id ?? null,
      lifestyle: answers,
      auditSnapshot: JSON.parse(JSON.stringify(auditResult)),
      scanSnapshot: ownedScan
        ? { overallScore: ownedScan.overallScore, skinType: ownedScan.skinType }
        : undefined,
      overallScore,
    },
  });

  await db.skinProfile.updateMany({
    where: { userId },
    data: {
      ageRange: answers.ageRange || undefined,
      waterIntake: answers.waterIntake || undefined,
      smokes: answers.smokes || undefined,
      sleepHours: answers.sleepHours || undefined,
      stressLevel: answers.stressLevel || undefined,
      sunExposure: answers.sunExposure || undefined,
      exerciseFrequency: answers.exerciseFrequency || undefined,
    },
  });

  return NextResponse.json({
    id: bilan.id,
    overallScore,
    routineScore: auditResult.score,
    lifestyleScore,
    scanScore: ownedScan?.overallScore ?? null,
    flags: flags.map((f) => ({ id: f.id, severity: f.severity, text: lang === "ko" ? f.ko : f.en })),
  });
}
