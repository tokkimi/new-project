"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Check,
  ArrowRight,
  ClipboardCheck,
  AlertTriangle,
  WandSparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { FaceMap, severityBadgeClass } from "@/components/face-map";
import { useCatalog, useShelf } from "@/lib/shelf-store";
import { buildRoutine } from "@/lib/routine-engine";
import {
  buildSuggestedRoutine,
  type FaceScanAnalysis,
  type FaceZoneId,
} from "@/lib/face-scan-engine";

const ZONE_ORDER: FaceZoneId[] = ["forehead", "nose", "cheeks", "underEye", "chin"];

type Phase = "idle" | "analyzing" | "result" | "unavailable" | "error";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function FaceScanPage() {
  const t = useTranslations("faceScanPage");
  const tCategories = useTranslations("categories");
  const analysisSteps = t.raw("steps") as string[];

  const { catalog } = useCatalog();
  const { addProduct } = useShelf();

  const [phase, setPhase] = React.useState<Phase>("idle");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<FaceScanAnalysis | null>(null);
  const [added, setAdded] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const startScan = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("analyzing");
    setStepIndex(0);
    setAdded(false);

    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, analysisSteps.length - 1));
    }, 700);

    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/face-scan/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });

      if (res.status === 501) {
        setPhase("unavailable");
        return;
      }
      if (!res.ok) {
        setPhase("error");
        return;
      }
      const data = await res.json();
      setAnalysis(data.analysis);
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

  const flaggedCount = analysis?.zones.filter((z) => z.flagged).length ?? 0;

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

            <Card className="items-center gap-4 py-8 text-center">
              <FaceMap zones={analysis.zones} />
              <p className="max-w-sm text-sm font-medium">
                {t("summary", { count: flaggedCount })}
              </p>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              {ZONE_ORDER.map((zoneId) => {
                const zone = analysis.zones.find((z) => z.id === zoneId);
                if (!zone) return null;
                return (
                  <Card key={zoneId} className="gap-2 p-4 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium">{t(`zones.${zoneId}.name`)}</p>
                      <span className={severityBadgeClass(zone.severity)}>
                        {t(`severity.${zone.severity}`)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {zone.flagged && zone.concern
                        ? t(`concernDescriptions.${zone.concern}`)
                        : t(`zones.${zoneId}.clearText`)}
                    </p>
                  </Card>
                );
              })}
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

            <Card className="gap-3 text-left">
              <h2 className="font-serif text-lg">{t("careSectionTitle")}</h2>
              <ul className="flex flex-col gap-2.5">
                {analysis.careTipIds.map((tipId) => (
                  <li key={tipId} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    {t(`careTips.${tipId}`)}
                  </li>
                ))}
              </ul>
            </Card>

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
