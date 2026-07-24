import { getTranslations, getLocale } from "next-intl/server";
import { Stethoscope } from "lucide-react";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PrintReportButton } from "@/components/print-report-button";
import { analyzeExposure } from "@/lib/ingredient-exposure";
import { findRecurrences } from "@/lib/reactions";
import type { FaceScanAnalysis } from "@/lib/face-scan-engine";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b border-border/50 py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
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

  const [profile, scan, reactions, protocol, shelf] = await Promise.all([
    db.skinProfile.findUnique({ where: { userId } }),
    db.faceScanResult.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    db.productReaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { type: true, productId: true, product: { select: { name: true } } },
    }),
    db.routineProtocol.findFirst({
      where: { userId, status: "active" },
      include: { product: { select: { name: true } } },
    }),
    db.shelfItem.findMany({
      where: { userId },
      select: { product: { select: { id: true, name: true, ingredientIds: true } } },
    }),
  ]);

  const analysis = scan ? (scan.analysis as unknown as FaceScanAnalysis) : null;
  const flagged = analysis?.modules.filter((m) => m.flagged) ?? [];
  const exposure = analyzeExposure(
    shelf.map((s) => ({ ingredientIds: s.product.ingredientIds, slot: "both" as const }))
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
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("generatedOn", { date: dateFmt.format(new Date()) })}
          </p>
        </div>
        <PrintReportButton label={t("print")} />
      </div>

      <Card className="print-avoid-break gap-2 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3">
          <Stethoscope className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>
      </Card>

      <Card className="print-avoid-break gap-3">
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
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noProfile")}</p>
        )}
      </Card>

      <Card className="print-avoid-break gap-3">
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
              <p className="mb-1.5 text-sm font-medium">{t("flaggedTitle")}</p>
              {flagged.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("flaggedNone")}</p>
              ) : (
                <ul className="grid gap-1.5">
                  {flagged.map((m) => (
                    <li key={m.id} className="flex justify-between text-sm">
                      <span>{safe(() => tFace(`modules.${m.id}.name`), m.id)}</span>
                      <span className="text-muted-foreground">
                        {safe(() => tFace(`severity.${m.severity}`), m.severity)} · {9 - m.score}/9
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
        <Card className="print-avoid-break gap-3">
          <h2 className="font-serif text-xl">{t("routineTitle")}</h2>
          {exposure.actives.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exposure.actives.map((a) => (
                <span
                  key={a.ingredientId}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground"
                >
                  {safe(() => tIng(`${a.ingredientId}.name`), a.ingredientId)} ×{a.productCount}
                </span>
              ))}
            </div>
          )}
          {protocol && (
            <p className="rounded-2xl bg-primary/8 px-4 py-3 text-sm">
              <span className="font-medium">{safe(() => tProto(`goals.${protocol.goal}`), protocol.goal)}</span>
              {" — "}
              {safe(() => tProto(`changeKinds.${protocol.changeKind}`), protocol.changeKind)}
              {protocol.product ? ` (${protocol.product.name})` : ""}
            </p>
          )}
        </Card>
      )}

      {recurrences.length > 0 && (
        <Card className="print-avoid-break gap-3">
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
        </Card>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}
