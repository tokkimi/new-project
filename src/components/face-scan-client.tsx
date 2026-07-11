"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Check,
  ArrowRight,
  ClipboardCheck,
  AlertTriangle,
  WandSparkles,
  ChevronDown,
  Target,
  CircleDot,
  Grid3x3,
  Droplet,
  Wind,
  Flame,
  ShieldAlert,
  MapPin,
  AlertCircle,
  CircleDashed,
  Waves,
  Moon,
  Sparkles,
  UserX,
  Lock,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductVisual } from "@/components/product-visual";
import { SkinScoreRing, ModuleScoreBar, severityBadgeClass } from "@/components/skin-score";
import { useCatalog, useShelf } from "@/lib/shelf-store";
import { buildRoutine } from "@/lib/routine-engine";
import {
  buildSuggestedRoutine,
  MODULES,
  type FaceScanAnalysis,
  type ModuleId,
} from "@/lib/face-scan-engine";

const MODULE_ICON: Record<ModuleId, React.ComponentType<{ className?: string }>> = {
  pores: Target,
  blackheads: CircleDot,
  texture: Grid3x3,
  oiliness: Droplet,
  dryness: Wind,
  redness: Flame,
  sensitivity: ShieldAlert,
  spots: MapPin,
  acne: AlertCircle,
  acneScars: CircleDashed,
  wrinkles: Waves,
  darkCircles: Moon,
  radiance: Sparkles,
};

type Phase = "idle" | "analyzing" | "result" | "unavailable" | "error" | "noFace" | "noCredits";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function FaceScanClient() {
  const t = useTranslations("faceScanPage");
  const tCategories = useTranslations("categories");
  const locale = useLocale();
  const analysisSteps = t.raw("steps") as string[];

  const { catalog } = useCatalog();
  const { addProduct } = useShelf();

  const [phase, setPhase] = React.useState<Phase>("idle");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<FaceScanAnalysis | null>(null);
  const [added, setAdded] = React.useState(false);
  const [expanded, setExpanded] = React.useState<ModuleId | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const startScan = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("analyzing");
    setStepIndex(0);
    setAdded(false);
    setExpanded(null);

    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, analysisSteps.length - 1));
    }, 700);

    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/face-scan/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, locale }),
      });

      if (res.status === 501) {
        setPhase("unavailable");
        return;
      }
      if (res.status === 422) {
        setPhase("noFace");
        return;
      }
      if (res.status === 402 || res.status === 401) {
        setPhase("noCredits");
        return;
      }
      if (!res.ok) {
        setPhase("error");
        return;
      }
      const data = await res.json();
      setAnalysis(data.analysis);
      setExpanded(
        (data.analysis as FaceScanAnalysis).modules.find((m) => m.flagged)?.id ?? null
      );
      setPhase("result");
    } catch {
      setPhase("error");
    } finally {
      clearInterval(stepTimer);
    }
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setAnalysis(null);
    setPhase("idle");
  };

  const suggestedProducts = React.useMemo(
    () => (analysis ? buildSuggestedRoutine(catalog, analysis) : []),
    [catalog, analysis]
  );
  const suggestedRoutine = React.useMemo(
    () => buildRoutine(suggestedProducts),
    [suggestedProducts]
  );

  const summaryKey = !analysis
    ? "summaryGood"
    : analysis.overallScore >= 75
      ? "summaryGood"
      : analysis.overallScore >= 50
        ? "summaryOk"
        : "summaryAttention";

  return (
    <div
      className={
        phase === "result"
          ? "mx-auto flex max-w-2xl flex-col gap-6"
          : "mx-auto flex max-w-lg flex-col items-center gap-6 text-center"
      }
    >
      {phase !== "result" && (
        <>
          <div>
            <h1 className="font-serif text-3xl">{t("title")}</h1>
            <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
          </div>

          <p className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-left text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" />
            {t("disclaimer")}
          </p>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) startScan(file);
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card
              onClick={() => fileInputRef.current?.click()}
              className="w-full cursor-pointer items-center gap-4 border-dashed py-16 transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Camera className="size-7" />
              </span>
              <div>
                <p className="font-medium">{t("captureTitle")}</p>
                <p className="text-sm text-muted-foreground">{t("captureHint")}</p>
              </div>
            </Card>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-6 py-14">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt=""
                  className="h-32 w-32 rounded-2xl object-cover"
                />
              ) : (
                <Loader2 className="size-10 animate-spin text-primary" />
              )}
              <div className="flex flex-col gap-2">
                {analysisSteps.map((step, i) => (
                  <p
                    key={step}
                    className={`text-sm transition-colors ${
                      i <= stepIndex ? "text-foreground" : "text-muted-foreground/40"
                    }`}
                  >
                    {i < stepIndex ? "✓ " : i === stepIndex ? "… " : "· "}
                    {step}
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {phase === "unavailable" && (
          <motion.div
            key="unavailable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <WandSparkles className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("unavailableTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("unavailableText")}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" />
                  {t("retake")}
                </Button>
                <Button asChild>
                  <Link href="/app/quiz">{t("goToQuiz")}</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {phase === "noFace" && (
          <motion.div
            key="noFace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-am/20 text-am-foreground">
                <UserX className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("noFaceTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("noFaceText")}</p>
              <Button variant="outline" onClick={reset} className="mt-2">
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === "noCredits" && (
          <motion.div
            key="noCredits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Lock className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("noCreditsTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("noCreditsText")}</p>
              <Button asChild className="mt-2">
                <Link href="/app/face-scan">{t("noCreditsCta")}</Link>
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-12 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("errorTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("errorText")}</p>
              <Button variant="outline" onClick={reset} className="mt-2">
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === "result" && analysis && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col gap-6"
          >
            <div className="text-center">
              <h1 className="font-serif text-3xl">{t("resultTitle")}</h1>
              <p className="mt-1 text-muted-foreground">{t("resultSubtitle")}</p>
            </div>

            <Card className="flex-row flex-wrap items-center gap-6 py-8 sm:flex-nowrap">
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt=""
                  className="mx-auto h-32 w-32 shrink-0 rounded-2xl object-cover sm:mx-0"
                />
              )}
              <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("overallScoreLabel")}
                  </p>
                  {analysis.skinType && (
                    <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {t(`skinTypes.${analysis.skinType}`)}
                    </span>
                  )}
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    {analysis.summary || t(summaryKey)}
                  </p>
                </div>
                <SkinScoreRing score={analysis.overallScore} />
              </div>
            </Card>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-lg">{t("modulesSectionTitle")}</h2>
              <div className="flex flex-col divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_30px_-16px_rgba(0,0,0,0.12)]">
                {MODULES.map((moduleId) => {
                  const finding = analysis.modules.find((m) => m.id === moduleId);
                  if (!finding) return null;
                  const Icon = MODULE_ICON[moduleId];
                  const isOpen = expanded === moduleId;
                  return (
                    <div key={moduleId}>
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : moduleId)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full",
                            finding.severity === "attention" && "bg-destructive/10 text-destructive",
                            finding.severity === "medium" && "bg-am/25 text-am-foreground",
                            finding.severity === "low" && "bg-success/15 text-success"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {t(`modules.${moduleId}.name`)}
                          </p>
                        </div>
                        <ModuleScoreBar score={finding.score} />
                        <span className={severityBadgeClass(finding.severity)}>
                          {t(`severity.${finding.severity}`)}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 bg-secondary/30 px-4 py-4">
                              {finding.note && (
                                <p className="text-sm italic leading-relaxed text-foreground/80">
                                  “{finding.note}”
                                </p>
                              )}
                              <div className="grid gap-4 sm:grid-cols-2">
                              {finding.flagged ? (
                                <>
                                  <div>
                                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                      {t("causesLabel")}
                                    </p>
                                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                                      {(t.raw(`modules.${moduleId}.causes`) as string[]).map(
                                        (c) => (
                                          <li key={c}>• {c}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                      {t("tipsLabel")}
                                    </p>
                                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                                      {(t.raw(`modules.${moduleId}.tips`) as string[]).map((tip) => (
                                        <li key={tip}>• {tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              ) : (
                                <p className="text-sm text-muted-foreground sm:col-span-2">
                                  {t("noConcern")}
                                </p>
                              )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {suggestedProducts.length > 0 && (
              <Card className="gap-4 text-left">
                <div>
                  <h2 className="font-serif text-lg">{t("routineSectionTitle")}</h2>
                  <p className="text-sm text-muted-foreground">{t("routineSectionText")}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[...suggestedRoutine.am, ...suggestedRoutine.pm]
                    .filter(
                      (step, i, arr) =>
                        arr.findIndex((s) => s.product.id === step.product.id) === i
                    )
                    .map((step) => (
                      <div
                        key={step.product.id}
                        className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2"
                      >
                        <ProductVisual
                          category={step.product.category}
                          size="sm"
                          className="size-10 rounded-lg"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{step.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {tCategories(step.product.category)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  onClick={() => {
                    suggestedProducts.forEach((p) => addProduct(p));
                    setAdded(true);
                  }}
                  disabled={added}
                  className="mt-1 self-start"
                >
                  {added ? (
                    <>
                      <Check className="size-4" />
                      {t("addedToShelf")}
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="size-4" />
                      {t("addToShelf")}
                    </>
                  )}
                </Button>
              </Card>
            )}

            <p className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-left text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" />
              {t("resultDisclaimer")}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
              <Button asChild variant="outline">
                <Link href="/app/quiz">
                  {t("goToQuiz")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
