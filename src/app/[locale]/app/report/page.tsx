import { getTranslations, getLocale } from "next-intl/server";
import { Activity, Droplets, Dumbbell, Moon, ShieldCheck, Stethoscope, Sun } from "lucide-react";
import type { ReactNode } from "react";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PrintReportButton } from "@/components/print-report-button";
import { analyzeExposure } from "@/lib/ingredient-exposure";
import { findRecurrences } from "@/lib/reactions";
import type { FaceScanAnalysis } from "@/lib/face-scan-engine";
import { auditRoutine, type AuditResult } from "@/lib/audit-engine";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function Meter({ label, value, detail }: { label: string; value: number; detail?: string }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{safeValue}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/12">
        <div className="h-full rounded-full bg-white/78" style={{ width: `${safeValue}%` }} />
      </div>
      {detail && <p className="text-xs leading-5 text-muted-foreground">{detail}</p>}
    </div>
  );
}

function SmallTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-white/[0.035] px-2.5 py-1 text-xs text-muted-foreground backdrop-blur-xl">
      {children}
    </span>
  );
}

export default async function ReportPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user?.id) {
    redirect({ href: "/sign-in", locale });
    return;
  }
  const userId = session.user.id;

  const t = await getTranslations("report");
  const tSkin = await getTranslations("skinTypes");
  const tConcern = await getTranslations("concerns");
  const tSens = await getTranslations("sensitivities");
  const tClimate = await getTranslations("climates");
  const tAge = await getTranslations("ageRanges");
  const tFace = await getTranslations("faceScanPage");
  const tIng = await getTranslations("ingredients");
  const tReact = await getTranslations("reactions");
  const tProto = await getTranslations("protocol");
  const tReliability = await getTranslations("routineWorkspace.reliability");

  const [profile, scan, auditRun, bilan, reactions, protocol, shelf, preferences, catalog] = await Promise.all([
    db.skinProfile.findUnique({ where: { userId } }),
    db.faceScanResult.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    db.auditRun.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    db.bilan.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    db.productReaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { type: true, note: true, createdAt: true, productId: true, product: { select: { name: true } } },
    }),
    db.routineProtocol.findFirst({
      where: { userId, status: "active" },
      include: { product: { select: { name: true } } },
    }),
    db.shelfItem.findMany({
      where: { userId },
      include: { product: true },
    }),
    db.userProductPreference.findMany({ where: { userId }, include: { product: true } }),
    db.product.findMany({
      take: 300,
      select: { id: true, slug: true, name: true, brand: true, category: true, skinTypes: true, concerns: true },
    }),
  ]);

  const analysis = scan ? (scan.analysis as unknown as FaceScanAnalysis) : null;
  const shelfProducts = shelf.map((s) => s.product);
  const prefByProduct = new Map(preferences.map((p) => [p.productId, p] as const));
  const computedAudit = auditRoutine(
    shelfProducts,
    catalog,
    profile
      ? {
          skinType: profile.skinType,
          concerns: profile.concerns,
          sensitivities: profile.sensitivities,
        }
      : null
  );
  const savedAudit = auditRun?.result as unknown as Partial<AuditResult> | undefined;
  const latestAudit =
    savedAudit?.scores && savedAudit.productDecisions && savedAudit.recommendedRoutine
      ? (savedAudit as AuditResult)
      : computedAudit;
  const flagged = analysis?.modules.filter((m) => m.flagged) ?? [];
  const exposure = analyzeExposure(
    shelfProducts.map((product) => ({
      ingredientIds: product.ingredientIds,
      slot: (prefByProduct.get(product.id)?.routineSlot ?? "both") as "morning" | "evening" | "both" | "pause",
    }))
  );
  const recurrences = findRecurrences(reactions.map((r) => ({ type: r.type, productId: r.productId })));
  const nameById = new Map(shelf.map((s) => [s.product.id, s.product.name] as const));
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

  const safe = (fn: () => string, fallback: string) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  };

  return (
    <div data-report-content className="mx-auto flex max-w-2xl flex-col gap-6 bg-transparent p-1 text-foreground">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("generatedOn", { date: dateFmt.format(new Date()) })}
          </p>
        </div>
        <PrintReportButton label={t("print")} />
      </div>

      <Card className="print-avoid-break gap-2 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Stethoscope className="mt-0.5 size-5 shrink-0 text-foreground" />
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>
      </Card>

      <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-foreground" />
          <div>
            <h2 className="font-serif text-xl">{tReliability("title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{tReliability("subtitle")}</p>
          </div>
        </div>
        <div className="grid gap-2 text-sm">
          <Row label={tReliability("scan")} value={scan ? t("included") : t("missing")} />
          <Row label={tReliability("exposure")} value={exposure.actives.length > 0 ? t("included") : t("missing")} />
          <Row label={tReliability("protocol")} value={protocol ? t("included") : t("missing")} />
          <Row label={tReliability("reactions")} value={reactions.length > 0 ? t("included") : t("missing")} />
        </div>
      </Card>

      <Card className="print-avoid-break gap-4 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 size-5 shrink-0 text-foreground" />
          <div>
            <h2 className="font-serif text-xl">{t("auditChartTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {auditRun ? t("auditDate", { date: dateFmt.format(auditRun.createdAt) }) : t("auditLive")}
            </p>
          </div>
        </div>
        <Meter label={t("auditOverall")} value={latestAudit.score} detail={latestAudit.profile.summary} />
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(latestAudit.scores).map(([key, value]) => (
            <Meter key={key} label={t(`auditScores.${key}`)} value={value} />
          ))}
        </div>
      </Card>

      <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <h2 className="font-serif text-xl">{t("profileTitle")}</h2>
        {profile ? (
          <div>
            <Row label={t("skinType")} value={safe(() => tSkin(profile.skinType), profile.skinType)} />
            {profile.ageRange && (
              <Row label={t("age")} value={safe(() => tAge(profile.ageRange!), profile.ageRange)} />
            )}
            {profile.concerns.length > 0 && (
              <Row
                label={t("concerns")}
                value={profile.concerns.map((c) => safe(() => tConcern(c), c)).join(", ")}
              />
            )}
            {profile.sensitivities.length > 0 && (
              <Row
                label={t("sensitivities")}
                value={profile.sensitivities.map((s) => safe(() => tSens(s), s)).join(", ")}
              />
            )}
            {profile.climate && (
              <Row label={t("climate")} value={safe(() => tClimate(profile.climate!), profile.climate)} />
            )}
            {profile.waterIntake && <Row label={t("waterIntake")} value={safe(() => t(`lifestyle.water.${profile.waterIntake}`), profile.waterIntake)} />}
            {profile.sleepHours && <Row label={t("sleep")} value={safe(() => t(`lifestyle.sleep.${profile.sleepHours}`), profile.sleepHours)} />}
            {profile.stressLevel && <Row label={t("stress")} value={safe(() => t(`lifestyle.stress.${profile.stressLevel}`), profile.stressLevel)} />}
            {profile.exerciseFrequency && <Row label={t("sport")} value={safe(() => t(`lifestyle.exercise.${profile.exerciseFrequency}`), profile.exerciseFrequency)} />}
            {profile.sunExposure && <Row label={t("sunExposure")} value={safe(() => t(`lifestyle.sun.${profile.sunExposure}`), profile.sunExposure)} />}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noProfile")}</p>
        )}
      </Card>

      <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <h2 className="font-serif text-xl">{t("scanTitle")}</h2>
        {analysis && scan ? (
          <div>
            <Row label={t("scanDate")} value={dateFmt.format(scan.createdAt)} />
            <Row label={t("overall")} value={`${analysis.overallScore} / 100`} />
            {typeof analysis.confidence === "number" && (
              <Row label={t("confidence")} value={`${Math.round(analysis.confidence * 100)}%`} />
            )}
            {analysis.skinType && (
              <Row label={t("skinType")} value={safe(() => tSkin(analysis.skinType!), analysis.skinType)} />
            )}
            <div className="mt-3">
              <p className="mb-2 text-sm font-medium">{t("scanChartTitle")}</p>
              <div className="grid gap-3">
                {analysis.modules.map((m) => (
                  <Meter
                    key={m.id}
                    label={safe(() => tFace(`modules.${m.id}.name`), m.id)}
                    value={Math.round(((9 - m.score) / 9) * 100)}
                    detail={m.note}
                  />
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-1.5 text-sm font-medium">{t("flaggedTitle")}</p>
              {flagged.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("flaggedNone")}</p>
              ) : (
                <ul className="grid gap-1.5">
                  {flagged.map((m) => (
                    <li key={m.id} className="flex justify-between text-sm">
                      <span>{safe(() => tFace(`modules.${m.id}.name`), m.id)}</span>
                      <span className="text-muted-foreground">
                        {safe(() => tFace(`severity.${m.severity}`), m.severity)} - {9 - m.score}/9
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noScan")}</p>
        )}
      </Card>

      {(exposure.actives.length > 0 || protocol) && (
        <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
          <h2 className="font-serif text-xl">{t("routineTitle")}</h2>
          <div className="grid gap-2 text-sm">
            <Row label={t("routineProducts")} value={`${shelfProducts.length}`} />
            <Row label={t("routineConflicts")} value={`${latestAudit.routine.warnings.length}`} />
            <Row label={t("routineDuplicates")} value={`${latestAudit.routine.duplicateActives.length}`} />
          </div>
          {exposure.actives.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exposure.actives.map((a) => (
                <span
                  key={a.ingredientId}
                  className="rounded-full border border-border bg-white/[0.035] px-3 py-1 text-sm text-muted-foreground backdrop-blur-xl"
                >
                  {safe(() => tIng(`${a.ingredientId}.name`), a.ingredientId)} x{a.productCount}
                </span>
              ))}
            </div>
          )}
          {exposure.findings.length > 0 && (
            <div className="grid gap-2">
              <p className="text-sm font-medium">{t("exposureFindings")}</p>
              {exposure.findings.map((finding, index) => (
                <p key={index} className="rounded-2xl border border-border bg-white/[0.035] px-3 py-2 text-sm text-muted-foreground backdrop-blur-xl">
                  {finding.kind === "redundant"
                    ? t("redundantFinding", {
                        ingredient: safe(() => tIng(`${finding.ingredientId}.name`), finding.ingredientId),
                        count: finding.count,
                      })
                    : t("stackFinding", {
                        slot: t(`slots.${finding.slot}`),
                        ingredients: finding.ingredientIds.map((id) => safe(() => tIng(`${id}.name`), id)).join(", "),
                      })}
                </p>
              ))}
            </div>
          )}
          {protocol && (
            <p className="rounded-2xl border border-border bg-white/[0.035] px-4 py-3 text-sm text-muted-foreground backdrop-blur-xl">
              <span className="font-medium">{safe(() => tProto(`goals.${protocol.goal}`), protocol.goal)}</span>
              {" — "}
              {safe(() => tProto(`changeKinds.${protocol.changeKind}`), protocol.changeKind)}
              {protocol.product ? ` (${protocol.product.name})` : ""}
            </p>
          )}
        </Card>
      )}

      <Card className="print-avoid-break gap-4 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <h2 className="font-serif text-xl">{t("routineChangesTitle")}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {latestAudit.priorities.map((priority) => (
            <div key={priority.id} className="rounded-2xl border border-border bg-white/[0.025] p-3">
              <SmallTag>{t(`priorityLevels.${priority.level}`)}</SmallTag>
              <p className="mt-2 text-sm font-medium">{priority.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{priority.text}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Sun className="size-4" /> {t("morningPlan")}
            </div>
            <ul className="grid gap-1.5 text-sm text-muted-foreground">
              {latestAudit.recommendedRoutine.morning.map((item) => <li key={item}>- {item}</li>)}
            </ul>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Moon className="size-4" /> {t("eveningPlan")}
            </div>
            <ul className="grid gap-1.5 text-sm text-muted-foreground">
              {latestAudit.recommendedRoutine.evening.map((item) => <li key={item}>- {item}</li>)}
            </ul>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Droplets className="size-4" /> {t("hydrationLifestyleTitle")}
            </div>
            <ul className="grid gap-1.5 text-sm text-muted-foreground">
              <li>- {t("hydrationAdvice")}</li>
              <li>- {t("sleepAdvice")}</li>
              <li>- {t("stressAdvice")}</li>
              <li>- {t("sunAdvice")}</li>
            </ul>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Dumbbell className="size-4" /> {t("movementLifestyleTitle")}
            </div>
            <ul className="grid gap-1.5 text-sm text-muted-foreground">
              <li>- {t("sportAdvice")}</li>
              <li>- {t("sweatAdvice")}</li>
              <li>- {t("recoveryAdvice")}</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="print-avoid-break gap-4 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
        <h2 className="font-serif text-xl">{t("productDecisionsTitle")}</h2>
        <div className="grid gap-3">
          {latestAudit.productDecisions.map((decision) => {
            const pref = prefByProduct.get(decision.product.id);
            const ingredients = decision.product.ingredientIds.slice(0, 8);
            return (
              <div key={decision.product.id} className="rounded-2xl border border-border bg-white/[0.025] p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{decision.product.name}</p>
                    <p className="text-xs text-muted-foreground">{decision.product.brand} - {decision.product.category}</p>
                  </div>
                  <SmallTag>{t(`productDecisions.${decision.decision}`)}</SmallTag>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{decision.reason}</p>
                <div className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                  <span>{t("timing")}: {t(`slots.${decision.timing === "pause" ? "pause" : decision.timing}`)}</span>
                  <span>{t("frequency")}: {decision.frequency}</span>
                  {pref?.openedAt && <span>{t("openedOn")}: {dateFmt.format(pref.openedAt)}</span>}
                  {pref?.expiresAt && <span>{t("expiryDate")}: {dateFmt.format(pref.expiresAt)}</span>}
                </div>
                {ingredients.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ingredients.map((id) => (
                      <SmallTag key={id}>{safe(() => tIng(`${id}.name`), id)}</SmallTag>
                    ))}
                  </div>
                )}
                {pref?.note && <p className="mt-2 text-xs text-muted-foreground">{t("userNote")}: {pref.note}</p>}
              </div>
            );
          })}
        </div>
      </Card>

      {recurrences.length > 0 && (
        <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
          <h2 className="font-serif text-xl">{t("reactionsTitle")}</h2>
          <ul className="grid gap-1.5 text-sm">
            {recurrences.map((r) => (
              <li key={`${r.productId}-${r.type}`}>
                {t("reactionLine", {
                  type: safe(() => tReact(`types.${r.type}`), r.type),
                  product: nameById.get(r.productId) ?? tReact("aProduct"),
                  count: r.count,
                })}
              </li>
            ))}
          </ul>
          {reactions.some((reaction) => reaction.note) && (
            <div className="mt-3 grid gap-2">
              <p className="text-sm font-medium">{t("reactionNotesTitle")}</p>
              {reactions.filter((reaction) => reaction.note).slice(0, 8).map((reaction) => (
                <p key={`${reaction.createdAt.toISOString()}-${reaction.productId ?? "none"}`} className="text-sm text-muted-foreground">
                  {dateFmt.format(reaction.createdAt)} - {reaction.product?.name ?? tReact("aProduct")} - {reaction.note}
                </p>
              ))}
            </div>
          )}
        </Card>
      )}

      {bilan && (
        <Card className="print-avoid-break gap-3 border-border bg-white/[0.03] text-foreground backdrop-blur-xl">
          <h2 className="font-serif text-xl">{t("bilanTitle")}</h2>
          <Row label={t("bilanDate")} value={dateFmt.format(bilan.createdAt)} />
          <Row label={t("overall")} value={`${bilan.overallScore} / 100`} />
        </Card>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
