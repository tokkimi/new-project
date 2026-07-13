"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CircleDashed,
  CircleDot,
  ClipboardCheck,
  Droplet,
  Flame,
  Grid3x3,
  Loader2,
  Lock,
  MapPin,
  Moon,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
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
import { SkinScoreRing, ModuleScoreBar } from "@/components/skin-score";
import { severityBadgeClass } from "@/lib/severity";
import { useCatalog, useShelf } from "@/lib/shelf-store";
import { MODULES, type FaceScanAnalysis, type ModuleFinding, type ModuleId } from "@/lib/face-scan-engine";

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

/**
 * General anatomical zone for each module, as a % position on a front-facing
 * portrait — illustrative (where this kind of concern is typically assessed),
 * not a per-photo AI detection, since the analysis only returns a severity
 * score per module, not pixel coordinates.
 */
const MODULE_ZONE: Record<ModuleId, { x: number; y: number }> = {
  oiliness: { x: 50, y: 25 },
  wrinkles: { x: 78, y: 49 },
  darkCircles: { x: 36, y: 53 },
  pores: { x: 50, y: 61 },
  blackheads: { x: 50, y: 65 },
  redness: { x: 24, y: 61 },
  sensitivity: { x: 76, y: 64 },
  spots: { x: 32, y: 57 },
  radiance: { x: 50, y: 50 },
  texture: { x: 27, y: 66 },
  dryness: { x: 73, y: 66 },
  acneScars: { x: 68, y: 72 },
  acne: { x: 50, y: 85 },
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

function productScore(product: Product, module: ModuleFinding, skinType?: string) {
  let score = 0;
  if (product.category === module.category) score += 8;
  if (product.ingredientIds.includes(module.ingredientId)) score += 6;
  if (product.concerns.includes(module.concern)) score += 5;
  if (skinType && product.skinTypes.includes(skinType)) score += 2;
  if (product.imageUrl) score += 1;
  return score;
}

function pickModuleProducts(catalog: Product[], module: ModuleFinding, skinType?: string) {
  return catalog
    .map((product) => ({ product, score: productScore(product, module, skinType) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .slice(0, 3)
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
  const [preview, setPreview] = React.useState<string | null>(null);
  const [analysis, setAnalysis] = React.useState<FaceScanAnalysis | null>(null);
  const [addedProducts, setAddedProducts] = React.useState<Set<string>>(new Set());
  const [activeModule, setActiveModule] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const pagerRef = React.useRef<HTMLDivElement>(null);
  const pagerScrollFrame = React.useRef<number | null>(null);

  const startScan = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("analyzing");
    setStepIndex(0);
    setAddedProducts(new Set());

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
    setAddedProducts(new Set());
    setActiveModule(0);
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
          ? "mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-6"
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
                <img src={preview} alt="" className="h-32 w-32 rounded-2xl object-cover" />
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
                    <span className="mr-2 inline-block w-4 text-center">
                      {i < stepIndex ? "✓" : i === stepIndex ? "…" : "•"}
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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt=""
                  className="mx-auto aspect-square w-full max-w-[220px] rounded-[1.5rem] object-cover sm:mx-0"
                />
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
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {t(`skinTypes.${analysis.skinType}`)}
                    </span>
                  )}
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                    {t("modulesCount", {
                      count: analysis.modules.filter((module) => module.flagged).length,
                    })}
                  </span>
                </div>
              </div>
              <div className="mx-auto sm:mx-0">
                <SkinScoreRing score={analysis.overallScore} />
              </div>
            </section>

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
                  const Icon = MODULE_ICON[module.id];
                  const zone = MODULE_ZONE[module.id];
                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => goToModule(index)}
                      className={cn(
                        "relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] text-left transition-all sm:w-[280px]",
                        activeModule === index
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      {preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preview} alt="" className="absolute inset-0 size-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 bg-secondary" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                      <span
                        className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                      >
                        <span
                          className={cn(
                            "absolute inset-0 animate-ping rounded-full",
                            module.severity === "attention" && "bg-destructive/60",
                            module.severity === "medium" && "bg-am/60",
                            module.severity === "low" && "bg-success/60"
                          )}
                        />
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full border border-white/90",
                            module.severity === "attention" && "bg-destructive",
                            module.severity === "medium" && "bg-am",
                            module.severity === "low" && "bg-success"
                          )}
                        />
                      </span>

                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
                          <Icon className="size-4" />
                        </span>
                        <span className="rounded-full bg-black/35 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}/{orderedModules.length}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <span className={cn(severityBadgeClass(module.severity), "mb-1.5 inline-flex")}>
                          {t(`severity.${module.severity}`)}
                        </span>
                        <p className="font-serif text-xl text-white">{t(`modules.${module.id}.name`)}</p>
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
                  catalog={catalog}
                  skinType={analysis.skinType}
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
  catalog,
  skinType,
  addedProducts,
  onAddProduct,
}: {
  module: ModuleFinding;
  t: ReturnType<typeof useTranslations>;
  tCategories: ReturnType<typeof useTranslations>;
  catalog: Product[];
  skinType?: string;
  addedProducts: Set<string>;
  onAddProduct: (product: Product) => void;
}) {
  const products = pickModuleProducts(catalog, module, skinType);
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
          <span className={cn(severityBadgeClass(module.severity), "mb-2 inline-flex")}>
            {t(`severity.${module.severity}`)}
          </span>
          <h3 className="font-serif text-2xl">{t(`modules.${module.id}.name`)}</h3>
          <p className="mt-2 text-muted-foreground">
            {module.note || (module.flagged ? t("moduleDefaultNote") : t("noConcern"))}
          </p>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-3xl bg-secondary/60 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{t("moduleScoreLabel")}</span>
            <span className="text-muted-foreground">{9 - module.score}/9</span>
          </div>
          <ModuleScoreBar score={module.score} />

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
                        className="relative w-[132px] shrink-0 snap-start rounded-2xl border border-white/40 bg-white/50 p-2.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
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
                            isAdded ? "bg-success text-white" : "bg-primary text-primary-foreground hover:brightness-105"
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

        {!module.flagged && (
          <div className="flex items-start gap-3 rounded-3xl bg-success/10 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
            <div>
              <p className="font-medium text-success">{t("moduleClearTitle")}</p>
              <p className="text-sm text-muted-foreground">{t("moduleClearText")}</p>
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
