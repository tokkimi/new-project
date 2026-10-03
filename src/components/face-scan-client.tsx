"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Check,
  CircleDashed,
  CircleDot,
  ClipboardCheck,
  Droplet,
  Flame,
  Grid3x3,
  ImageOff,
  Loader2,
  Lock,
  Stethoscope,
  MapPin,
  Moon,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  UserX,
  WandSparkles,
  Waves,
  Wind,
} from "lucide-react";
import type { Product } from "@/generated/prisma/client";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { FaceGuideOverlay } from "@/components/face-guide-overlay";
import { FaceMeshOverlay } from "@/components/face-mesh-overlay";
import { FaceScanMarkerOverlay } from "@/components/face-scan-marker-overlay";
import { FaceScanCapture } from "@/components/face-scan-capture";
import { Logo } from "@/components/logo";
import { SkinScoreRing, ModuleScoreBar } from "@/components/skin-score";
import { severityBadgeClass } from "@/lib/severity";
import { useCatalog, useShelf } from "@/lib/shelf-store";
import type { FaceLandmarkPoint } from "@/lib/face-mesh/faceMesh.types";
import { moduleToZoneResults, zonesForModules } from "@/lib/face-mesh/faceMesh.utils";
import { detectFaceScanMarkers, type FaceScanMarker } from "@/lib/face-mesh/faceScanMarkers";
import {
  compareScans,
  MODULES,
  type FaceScanAnalysis,
  type ModuleFinding,
  type ModuleId,
  type PreviousScan,
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

type Phase = "idle" | "analyzing" | "result" | "unavailable" | "error" | "noFace" | "noCredits" | "lowQuality" | "localizationRequired";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type ImageFaceLandmarker = {
  detect: (image: HTMLImageElement) => { faceLandmarks?: FaceLandmarkPoint[][] };
  close?: () => void;
};

async function detectLandmarksInImage(imageSrc: string) {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = reject;
    element.src = imageSrc;
  });
  const [{ FaceLandmarker, FilesetResolver }] = await Promise.all([import("@mediapipe/tasks-vision")]);
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const options = (delegate: "GPU" | "CPU") => ({
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      delegate,
    },
    runningMode: "IMAGE" as const,
    numFaces: 1,
    minFaceDetectionConfidence: 0.55,
    minFacePresenceConfidence: 0.55,
  });
  let landmarker: ImageFaceLandmarker;
  try {
    landmarker = (await FaceLandmarker.createFromOptions(vision, options("GPU"))) as unknown as ImageFaceLandmarker;
  } catch {
    // Safari and some mobile devices cannot initialise a GPU model for uploads.
    landmarker = (await FaceLandmarker.createFromOptions(vision, options("CPU"))) as unknown as ImageFaceLandmarker;
  }
  try {
    return {
      landmarks: landmarker.detect(image).faceLandmarks?.[0] ?? [],
      size: { width: image.naturalWidth || image.width, height: image.naturalHeight || image.height },
    };
  } finally {
    landmarker.close?.();
  }
}

function productScore(product: Product, module: ModuleFinding, skinType?: string) {
  let score = 0;
  if (product.category === module.category) score += 8;
  if (product.ingredientIds.includes(module.ingredientId)) score += 6;
  if (product.concerns.includes(module.concern)) score += 5;
  if (skinType && product.skinTypes.includes(skinType)) score += 2;
  if (product.imageUrl) score += 1;
  return score;
}

function pickModuleProducts(
  catalog: Product[],
  module: ModuleFinding,
  skinType?: string,
  excludedProductIds: Set<string> = new Set(),
  limit = 6
) {
  return catalog
    .map((product) => ({ product, score: productScore(product, module, skinType) }))
    .filter(({ product, score }) => score > 0 && !excludedProductIds.has(product.id))
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .slice(0, limit)
    .map(({ product }) => product);
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
  const [analysisProgress, setAnalysisProgress] = React.useState(0);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<FaceScanAnalysis | null>(null);
  const [previous, setPrevious] = React.useState<PreviousScan | null>(null);
  const [addedProducts, setAddedProducts] = React.useState<Set<string>>(new Set());
  const [activeModule, setActiveModule] = React.useState(0);
  const [qualityIssues, setQualityIssues] = React.useState<string[]>([]);
  const [captureLandmarks, setCaptureLandmarks] = React.useState<FaceLandmarkPoint[] | null>(null);
  const [captureSize, setCaptureSize] = React.useState({ width: 720, height: 960 });
  const [captureMirrored, setCaptureMirrored] = React.useState(false);
  const [scanMarkers, setScanMarkers] = React.useState<FaceScanMarker[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const pagerRef = React.useRef<HTMLDivElement>(null);
  const pagerScrollFrame = React.useRef<number | null>(null);

  const startScan = async (
    file: File,
    landmarks?: FaceLandmarkPoint[],
    imageSize?: { width: number; height: number },
    mirrored = false
  ) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("analyzing");
    setStepIndex(0);
    setAnalysisProgress(8);
    setAddedProducts(new Set());
    setScanMarkers([]);
    let progressTimer: number | undefined;

    try {
      let resolvedLandmarks = landmarks ?? [];
      let resolvedSize = imageSize;
      if (!resolvedLandmarks.length || !resolvedSize) {
        setStepIndex(0);
        setAnalysisProgress(24);
        try {
          const detected = await detectLandmarksInImage(url);
          resolvedLandmarks = detected.landmarks;
          resolvedSize = detected.size;
        } catch {
          // The visual analysis can still reject a non-face photo. We never draw guessed points.
        }
      }
      setCaptureLandmarks(resolvedLandmarks.length ? resolvedLandmarks : null);
      if (resolvedSize) setCaptureSize(resolvedSize);
      setCaptureMirrored(mirrored);
      setStepIndex(1);
      setAnalysisProgress(46);
      const dataUrl = await fileToDataUrl(file);
      setStepIndex(2);
      setAnalysisProgress(64);
      progressTimer = window.setInterval(() => {
        setAnalysisProgress((value) => (value < 94 ? Math.min(94, value + 2) : value));
      }, 260);
      const res = await fetch("/api/face-scan/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, locale }),
        signal: AbortSignal.timeout(100_000),
      });

      if (res.status === 501) {
        setPhase("unavailable");
        return;
      }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        if (data?.error === "low_quality") {
          setQualityIssues(Array.isArray(data.issues) ? data.issues : []);
          setPhase("lowQuality");
          return;
        }
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
      setAnalysisProgress(96);
      if (!resolvedLandmarks.length || !resolvedSize) {
        setPhase("localizationRequired");
        return;
      }
      setAnalysis(data.analysis);
      setPrevious((data.previous as PreviousScan) ?? null);
      const markers = await detectFaceScanMarkers({
        imageSrc: url,
        landmarks: resolvedLandmarks,
        imageSize: resolvedSize,
        modules: data.analysis.modules,
        mirrored,
      }).catch(() => []);
      setScanMarkers(markers);
      setAnalysisProgress(100);
      setPhase("result");
    } catch {
      setPhase("error");
    } finally {
      if (progressTimer) window.clearInterval(progressTimer);
    }
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setAnalysis(null);
    setPrevious(null);
    setAddedProducts(new Set());
    setActiveModule(0);
    setCaptureLandmarks(null);
    setCaptureMirrored(false);
    setScanMarkers([]);
    setAnalysisProgress(0);
    setPhase("idle");
  };

  const goToModule = (index: number) => {
    setActiveModule(index);
    const container = pagerRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const handlePagerScroll = () => {
    if (pagerScrollFrame.current) cancelAnimationFrame(pagerScrollFrame.current);
    pagerScrollFrame.current = requestAnimationFrame(() => {
      const container = pagerRef.current;
      if (!container) return;
      const cardWidth = container.children[0]?.clientWidth || container.clientWidth;
      const gap = 16;
      const index = Math.round(container.scrollLeft / (cardWidth + gap));
      setActiveModule((prev) => (prev === index ? prev : Math.max(0, index)));
    });
  };

  const orderedModules = React.useMemo(() => {
    if (!analysis) return [];
    const byId = new Map(analysis.modules.map((module) => [module.id, module]));
    return MODULES.map((id) => byId.get(id))
      .filter(Boolean)
      .sort((a, b) => {
        if (!a || !b) return 0;
        return Number(b.flagged) - Number(a.flagged) || b.score - a.score;
      }) as ModuleFinding[];
  }, [analysis]);

  const activeMeshModules = React.useMemo(
    () => (analysis?.modules ?? []).filter((module) => module.flagged && module.observable),
    [analysis]
  );
  const activeMeshZones = React.useMemo(
    () => zonesForModules(activeMeshModules.map((module) => module.id)),
    [activeMeshModules]
  );
  const meshZoneResults = React.useMemo(
    () => moduleToZoneResults(activeMeshModules),
    [activeMeshModules]
  );

  const comparison = React.useMemo(
    () => (analysis && previous ? compareScans(analysis, previous) : null),
    [analysis, previous]
  );

  React.useEffect(() => {
    let cancelled = false;
    if (!preview || !analysis || !captureLandmarks?.length) {
      setScanMarkers([]);
      return;
    }

    void detectFaceScanMarkers({
      imageSrc: preview,
      landmarks: captureLandmarks,
      imageSize: captureSize,
      modules: analysis.modules,
      mirrored: captureMirrored,
    })
      .then((markers) => {
        if (!cancelled) setScanMarkers(markers);
      })
      .catch((error) => {
        console.error("face scan marker detection error", error);
        if (!cancelled) setScanMarkers([]);
      });

    return () => {
      cancelled = true;
    };
  }, [analysis, captureLandmarks, captureMirrored, captureSize, preview]);

  const moduleProducts = React.useMemo(() => {
    const used = new Set<string>();
    const byModule = new Map<ModuleId, Product[]>();
    for (const module of orderedModules) {
      const firstPass = pickModuleProducts(catalog, module, analysis?.skinType, used, 6);
      firstPass.forEach((product) => used.add(product.id));
      const fallback =
        firstPass.length >= 4
          ? []
          : pickModuleProducts(catalog, module, analysis?.skinType, new Set(), 6).filter(
              (product) => !firstPass.some((picked) => picked.id === product.id)
            );
      byModule.set(module.id, [...firstPass, ...fallback].slice(0, 6));
    }
    return byModule;
  }, [analysis?.skinType, catalog, orderedModules]);

  const summaryKey = !analysis
    ? "summaryGood"
    : analysis.overallScore >= 75
      ? "summaryGood"
      : analysis.overallScore >= 50
        ? "summaryOk"
        : "summaryAttention";

  const moduleObservation = (module: ModuleFinding) => {
    if (!module.observable) return t("moduleNotAssessable");
    const note = module.note?.trim();
    const contradictoryPositive = /\b(clear|healthy|good|balanced|glow(?:ing)?|great|super|bon(?:ne)?|sain(?:e)?|équilibré(?:e)?|éclatant(?:e)?|rien à signaler|aucun(?:e)? (?:problème|signal)|양호|건강|좋(?:아|은)|문제 없|良好|健康|問題ない)\b/i.test(note ?? "");
    if (module.flagged && (!note || contradictoryPositive)) return t("modulePriorityFallback");
    return note || (module.flagged ? t("modulePriorityFallback") : t("noConcern"));
  };

  return (
    <div
      className={
        phase === "result"
          ? "mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-6"
          : phase === "idle"
            ? "mx-auto flex w-full max-w-[min(94vw,560px)] flex-col items-center gap-3 text-center"
          : "mx-auto flex max-w-lg flex-col items-center gap-6 text-center"
      }
    >
      {phase !== "result" && phase !== "idle" && (
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
            <FaceScanCapture
              labels={{
                start: t("captureTitle"),
                retake: t("retake"),
                fallback: t("meshFallback"),
                centerFace: t("position.centerFace"),
                moveCloser: t("position.moveCloser"),
                moveFarther: t("position.moveFarther"),
                lookStraight: t("position.lookStraight"),
                holdStill: t("position.holdStill"),
                improveLighting: t("position.improveLighting"),
                faceDetected: t("position.faceDetected"),
                noFace: t("position.noFace"),
                multipleFaces: t("position.multipleFaces"),
              }}
              onCapture={(file, landmarks, imageSize) => void startScan(file, landmarks, imageSize, true)}
              onFallbackUpload={() => fileInputRef.current?.click()}
            />
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
              <div className="relative flex size-40 items-center justify-center rounded-full border border-[#f5dfce]/40 bg-[#151211] shadow-[0_0_42px_rgba(245,223,206,.18)]">
                <span className="absolute inset-2 rounded-full border border-[#f5dfce]/15" />
                <span className="absolute inset-0 animate-[spin_2.8s_linear_infinite] rounded-full border-2 border-transparent border-t-[#f5dfce] border-r-[#f5dfce]/30" />
                <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-full border border-[#f5dfce]/30 bg-black">
                  <Logo className="w-20 object-contain" />
                </div>
              </div>
              <div className="-mt-3 text-2xl font-medium tabular-nums text-foreground">{analysisProgress}%</div>
              <div className="flex flex-col gap-2">
                {analysisSteps.map((step, i) => (
                  <p
                    key={step}
                    className={`text-sm transition-colors ${
                      i <= stepIndex ? "text-foreground" : "text-muted-foreground/40"
                    }`}
                  >
                    <span className="mr-2 inline-block w-4 text-center">
                      {i < stepIndex ? (
                        <Check className="inline size-3.5 text-success" />
                      ) : i === stepIndex ? (
                        <Loader2 className="inline size-3.5 animate-spin text-primary" />
                      ) : (
                        <span className="inline-block size-1.5 rounded-full bg-muted-foreground/25" />
                      )}
                    </span>
                    {step}
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {phase === "unavailable" && (
          <StatusCard
            icon={WandSparkles}
            title={t("unavailableTitle")}
            text={t("unavailableText")}
            action={
              <>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" />
                  {t("retake")}
                </Button>
                <Button asChild>
                  <Link href="/app/quiz">{t("goToQuiz")}</Link>
                </Button>
              </>
            }
          />
        )}

        {phase === "noFace" && (
          <StatusCard
            icon={UserX}
            title={t("noFaceTitle")}
            text={t("noFaceText")}
            tone="warning"
            action={
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
            }
          />
        )}

        {phase === "localizationRequired" && (
          <StatusCard
            icon={MapPin}
            title={t("localizationTitle")}
            text={t("localizationText")}
            tone="warning"
            action={<Button variant="outline" onClick={reset}><RotateCcw className="size-4" />{t("retake")}</Button>}
          />
        )}

        {phase === "lowQuality" && (
          <StatusCard
            icon={ImageOff}
            title={t("lowQualityTitle")}
            tone="warning"
            text={
              qualityIssues.length > 0
                ? `${t("lowQualityText")} ${qualityIssues
                    .map((issue) => t(`captureIssues.${issue}`))
                    .join(" · ")}`
                : t("lowQualityText")
            }
            action={
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
            }
          />
        )}

        {phase === "noCredits" && (
          <StatusCard
            icon={Lock}
            title={t("noCreditsTitle")}
            text={t("noCreditsText")}
            action={
              <Button asChild>
                <Link href="/app/upgrade">{t("noCreditsCta")}</Link>
              </Button>
            }
          />
        )}

        {phase === "error" && (
          <StatusCard
            icon={AlertTriangle}
            title={t("errorTitle")}
            text={t("errorText")}
            tone="danger"
            action={
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="size-4" />
                {t("retake")}
              </Button>
            }
          />
        )}

        {phase === "result" && analysis && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full min-w-0 flex-col gap-8"
          >
            <section className="grid min-h-[calc(100svh-10rem)] items-center gap-6 rounded-[2rem] bg-card p-5 shadow-[0_20px_70px_-48px_rgba(0,0,0,0.35)] sm:grid-cols-[auto_1fr_auto] sm:p-8">
              {preview && (
                <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-[1.5rem] bg-black sm:mx-0 sm:max-w-[400px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="" className="absolute inset-0 size-full object-cover" />
                  {captureLandmarks?.length ? (
                    <FaceMeshOverlay
                      landmarks={captureLandmarks}
                      sourceWidth={captureSize.width}
                      sourceHeight={captureSize.height}
                      mirrored={captureMirrored}
                      activeZones={activeMeshZones}
                      zoneResults={meshZoneResults}
                      pulse
                      showGuideMesh={false}
                      showZoneLines
                      className="opacity-100"
                    />
                  ) : null}
                  {captureLandmarks?.length ? (
                            <FaceScanMarkerOverlay
                      markers={scanMarkers}
                      sourceWidth={captureSize.width}
                      sourceHeight={captureSize.height}
                      className="opacity-90"
                    />
                  ) : null}
                </div>
              )}
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("resultEyebrow")}
                  </p>
                  <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
                    {t("resultTitle")}
                  </h1>
                </div>
                <p className="max-w-2xl text-muted-foreground">
                  {analysis.summary || t(summaryKey)}
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {analysis.skinType && (
                    <span className="rounded-full border border-white/18 bg-[#171413] px-3 py-1 text-sm font-medium text-[#f7eadf]">
                      {t(`skinTypes.${analysis.skinType}`)}
                    </span>
                  )}
                  <span className="rounded-full border border-white/18 bg-[#171413] px-3 py-1 text-sm text-[#f7eadf]">
                    {t("modulesCount", {
                      count: analysis.modules.filter((module) => module.flagged).length,
                    })}
                  </span>
                  {typeof analysis.confidence === "number" && (
                    <span className="rounded-full border border-white/18 bg-[#171413] px-3 py-1 text-sm text-[#f7eadf]">
                      {t("confidenceLabel")} {Math.round(analysis.confidence * 100)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="mx-auto sm:mx-0">
                <SkinScoreRing score={analysis.overallScore} />
              </div>
            </section>

            {analysis.medicalReferral?.advised && (
              <div className="flex items-start gap-3 rounded-2xl border border-am/30 bg-am/10 p-4 text-left">
                <Stethoscope className="mt-0.5 size-5 shrink-0 text-am-foreground" />
                <div>
                  <p className="font-medium text-am-foreground">{t("medicalReferralTitle")}</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.medicalReferral.reason || t("medicalReferralText")}
                  </p>
                </div>
              </div>
            )}

            {comparison && comparison.comparableCount > 0 && (
              <div className="rounded-[2rem] bg-card p-5 shadow-[0_20px_70px_-48px_rgba(0,0,0,0.35)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl">{t("compareTitle")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("compareSince", { days: comparison.daysBetween })}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
                      comparison.overallDelta > 0
                        ? "border border-white/18 bg-[#171413] text-[#f7eadf]"
                        : comparison.overallDelta < 0
                          ? "border border-[#9ba8b5]/55 bg-[#171413] text-[#f7eadf]"
                          : "border border-white/18 bg-[#171413] text-[#f7eadf]"
                    )}
                  >
                    {comparison.overallDelta > 0 ? (
                      <TrendingUp className="size-4" />
                    ) : comparison.overallDelta < 0 ? (
                      <TrendingDown className="size-4" />
                    ) : null}
                    {t("compareOverall")} {comparison.overallDelta > 0 ? "+" : ""}
                    {comparison.overallDelta}
                  </span>
                </div>

                {(() => {
                  const improved = comparison.modules.filter((m) => m.direction === "improved");
                  const watch = comparison.modules.filter((m) => m.direction === "watch");
                  if (improved.length === 0 && watch.length === 0) {
                    return (
                      <p className="mt-3 text-sm text-muted-foreground">{t("compareStable")}</p>
                    );
                  }
                  return (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {improved.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-[#171413] px-3 py-1 text-sm text-[#f7eadf]"
                        >
                          <TrendingUp className="size-3.5" />
                          {t(`modules.${m.id}.name`)}
                        </span>
                      ))}
                      {watch.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#9ba8b5]/55 bg-[#171413] px-3 py-1 text-sm text-[#f7eadf]"
                        >
                          <TrendingDown className="size-3.5" />
                          {t(`modules.${m.id}.name`)}
                        </span>
                      ))}
                    </div>
                  );
                })()}

                <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  {t("compareDisclaimer")}
                </p>
              </div>
            )}

            <div className="min-w-0 space-y-5">
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl">{t("modulesSectionTitle")}</h2>
                <p className="mt-1 text-muted-foreground">{t("modulesSectionText")}</p>
              </div>

              <div
                ref={pagerRef}
                onScroll={handlePagerScroll}
                className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
              >
                {orderedModules.map((module, index) => {
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => goToModule(index)}
                      className={cn(
                        "relative flex aspect-[4/5] w-[78%] shrink-0 snap-center flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-3 text-left shadow-[0_18px_50px_-36px_rgba(0,0,0,0.45)] transition-all sm:w-[280px]",
                        activeModule === index
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn(severityBadgeClass(module.severity), "inline-flex")}>
                          {t(`severity.${module.severity}`)}
                        </span>
                        <span className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}/{orderedModules.length}
                        </span>
                      </div>

                      <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[1.35rem] bg-secondary/45">
                        {preview ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={preview}
                              alt=""
                              className="absolute inset-0 size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                            {captureLandmarks?.length && module.flagged ? (
                              <FaceMeshOverlay
                                landmarks={captureLandmarks}
                                sourceWidth={captureSize.width}
                                sourceHeight={captureSize.height}
                                mirrored={captureMirrored}
                                activeZones={zonesForModules([module.id])}
                                zoneResults={moduleToZoneResults([module])}
                                showGuideMesh={false}
                                showZoneLines
                                pulse={activeModule === index}
                                className="opacity-100"
                              />
                            ) : null}
                            {captureLandmarks?.length ? (
                              <FaceScanMarkerOverlay
                                markers={scanMarkers}
                                sourceWidth={captureSize.width}
                                sourceHeight={captureSize.height}
                                moduleId={module.id}
                                pulse={activeModule === index}
                              className="opacity-95"
                              />
                            ) : null}
                          </>
                        ) : (
                          <div className="flex size-full items-center justify-center">
                            {(() => {
                              const Icon = MODULE_ICON[module.id];
                              return (
                                <span className="flex size-12 items-center justify-center rounded-full bg-background/70 text-primary shadow-sm">
                                  <Icon className="size-5" />
                                </span>
                              );
                            })()}
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <p className="font-serif text-xl">{t(`modules.${module.id}.name`)}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {module.observable
                            ? moduleObservation(module)
                            : t("moduleNotAssessable")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {orderedModules[activeModule] && (
                <ModuleDetail
                  module={orderedModules[activeModule]}
                  t={t}
                  tCategories={tCategories}
                  products={moduleProducts.get(orderedModules[activeModule].id) ?? []}
                  observation={moduleObservation}
                  addedProducts={addedProducts}
                  onAddProduct={(product) => {
                    addProduct(product);
                    setAddedProducts((prev) => new Set(prev).add(product.id));
                  }}
                />
              )}
            </div>

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
                <Link href="/app/progress">
                  {t("progressCta")}
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

function ModuleDetail({
  module,
  t,
  tCategories,
  products,
  observation,
  addedProducts,
  onAddProduct,
}: {
  module: ModuleFinding;
  t: ReturnType<typeof useTranslations>;
  tCategories: ReturnType<typeof useTranslations>;
  products: Product[];
  observation: (module: ModuleFinding) => string;
  addedProducts: Set<string>;
  onAddProduct: (product: Product) => void;
}) {
  const habits = t.raw(`dailyActions.${module.id}`) as string[];

  return (
    <motion.div
      key={module.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="grid min-w-0 gap-5 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <span
            className={cn(
              module.observable ? severityBadgeClass(module.severity) : severityBadgeClass("low"),
              "mb-2 inline-flex"
            )}
          >
            {module.observable ? t(`severity.${module.severity}`) : t("notAssessableBadge")}
          </span>
          <h3 className="font-serif text-2xl">{t(`modules.${module.id}.name`)}</h3>
          <p className="mt-2 text-muted-foreground">
            {module.observable
              ? observation(module)
              : t("moduleNotAssessable")}
          </p>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-3xl bg-secondary/60 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{t("moduleScoreLabel")}</span>
            <span className="text-muted-foreground">{module.observable ? `${module.score}/9` : "-"}</span>
          </div>
          <ModuleScoreBar score={module.observable ? module.score : 0} />
          {module.observable && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t("confidenceLabel")} {Math.round(module.confidence * 100)}%
            </p>
          )}

          {module.flagged && (
            <div className="mt-4 -mb-1 -mx-1">
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("productsForThisArea")}
              </p>
              {products.length === 0 ? (
                <p className="px-1 text-sm text-muted-foreground">{t("noProductsForModule")}</p>
              ) : (
                <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
                  {products.map((product) => {
                    const isAdded = addedProducts.has(product.id);
                    return (
                      <div
                        key={product.id}
                        className="relative w-[132px] shrink-0 snap-start rounded-2xl border border-border bg-white/50 p-2.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl dark:border-border dark:bg-white/10"
                      >
                        <div className="aspect-square w-full overflow-hidden rounded-xl">
                          <ProductImage
                            imageUrl={product.imageUrl}
                            category={product.category}
                            name={product.name}
                            size="sm"
                            className="size-full rounded-xl"
                          />
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug">{product.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{tCategories(product.category)}</p>
                        <button
                          type="button"
                          onClick={() => onAddProduct(product)}
                          aria-label={isAdded ? t("addedProduct") : t("addProduct")}
                          className={cn(
                            "absolute -right-1.5 -top-1.5 flex size-7 items-center justify-center rounded-full shadow-sm transition-colors",
                            isAdded ? "bg-success text-foreground" : "bg-primary text-primary-foreground hover:brightness-105"
                          )}
                        >
                          {isAdded ? <Check className="size-3.5" /> : <ClipboardCheck className="size-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t("dailyActionsLabel")}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {habits.map((habit) => (
              <li key={habit} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{habit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          {t("moduleDisclaimer")}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoList title={t("causesLabel")} items={t.raw(`modules.${module.id}.causes`) as string[]} />
          <InfoList title={t("tipsLabel")} items={t.raw(`modules.${module.id}.tips`) as string[]} />
        </div>

        {module.observable && !module.flagged && (
          <div className="flex items-start gap-3 rounded-3xl bg-success/10 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
            <div>
              <p className="font-medium text-success">{t("moduleClearTitle")}</p>
              <p className="text-sm text-muted-foreground">{t("moduleClearText")}</p>
            </div>
          </div>
        )}

        {!module.observable && (
          <div className="flex items-start gap-3 rounded-3xl bg-muted/60 p-4">
            <ImageOff className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">{t("notAssessableBadge")}</p>
              <p className="text-sm text-muted-foreground">{t("moduleNotAssessableHint")}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-secondary/55 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusCard({
  icon: Icon,
  title,
  text,
  action,
  tone = "neutral",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  action: React.ReactNode;
  tone?: "neutral" | "warning" | "danger";
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="w-full items-center gap-4 py-12 text-center">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground",
            tone === "warning" && "bg-am/20 text-am-foreground",
            tone === "danger" && "bg-destructive/10 text-destructive"
          )}
        >
          <Icon className="size-6" />
        </span>
        <h2 className="font-serif text-xl">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{text}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">{action}</div>
      </Card>
    </motion.div>
  );
}
