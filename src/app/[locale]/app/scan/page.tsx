"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  Loader2,
  RotateCcw,
  ArrowRight,
  FileText,
  AlertTriangle,
  SearchX,
  WandSparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShelf } from "@/lib/shelf-store";
import { findIngredient } from "@/data/ingredients";
import { ProductVisual } from "@/components/product-visual";
import type { Product } from "@/generated/prisma/client";

type Phase = "idle" | "analyzing" | "result" | "unavailable" | "error";

type ScanResult =
  | { kind: "matched"; product: Product }
  | { kind: "unmatched"; brand: string | null; productName: string | null; detectedIngredientIds: string[] }
  | { kind: "illegible" };

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ScanPage() {
  const t = useTranslations("scanPage");
  const tCategories = useTranslations("categories");
  const tIngredients = useTranslations("ingredients");
  const analysisSteps = t.raw("steps") as string[];

  const { addProduct } = useShelf();
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [result, setResult] = React.useState<ScanResult | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const startScan = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPhase("analyzing");
    setStepIndex(0);

    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, analysisSteps.length - 1));
    }, 750);

    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/scan/analyze", {
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
      if (data.matched) {
        setResult({ kind: "matched", product: data.matched });
      } else if (!data.read?.legible && data.detectedIngredientIds.length === 0) {
        setResult({ kind: "illegible" });
      } else {
        setResult({
          kind: "unmatched",
          brand: data.read?.brand ?? null,
          productName: data.read?.productName ?? null,
          detectedIngredientIds: data.detectedIngredientIds,
        });
      }
      setPhase("result");
    } catch {
      setPhase("error");
    } finally {
      clearInterval(stepTimer);
    }
  };

  const reset = () => {
    setPhase("idle");
    setResult(null);
    setPreview(null);
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-8 text-center">
      <div>
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
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
                <p className="font-medium">{t("dropTitle")}</p>
                <p className="text-sm text-muted-foreground">{t("dropSubtitle")}</p>
              </div>
            </Card>
            <Button variant="link" asChild>
              <Link href="/app/face-scan">{t("faceScanCta")}</Link>
            </Button>
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
                  className="h-28 w-28 rounded-xl object-cover"
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
            <Card className="w-full items-center gap-4 py-12">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <WandSparkles className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("unavailableTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("unavailableText")}</p>
              <Button variant="outline" onClick={reset} className="mt-1">
                <RotateCcw className="size-4" />
                {t("scanAnother")}
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
            <Card className="w-full items-center gap-4 py-12">
              <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-6" />
              </span>
              <h2 className="font-serif text-xl">{t("errorTitle")}</h2>
              <p className="max-w-sm text-sm text-muted-foreground">{t("errorText")}</p>
              <Button variant="outline" onClick={reset} className="mt-1">
                <RotateCcw className="size-4" />
                {t("scanAnother")}
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === "result" && result?.kind === "matched" && (
          <motion.div
            key="result-matched"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-10">
              <div className="relative">
                {result.product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={result.product.imageUrl}
                    alt=""
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                ) : (
                  <ProductVisual category={result.product.category} size="md" />
                )}
                <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-2 border-card bg-success text-success-foreground">
                  <Check className="size-3.5" />
                </span>
              </div>
              <div>
                <p className="font-serif text-xl">{result.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {result.product.brand} · {tCategories(result.product.category)}
                  {result.product.origin ? ` · ${result.product.origin}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {result.product.ingredientIds.map((id) =>
                  findIngredient(id) ? (
                    <Badge key={id}>{tIngredients(`${id}.name`)}</Badge>
                  ) : null
                )}
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" />
                  {t("scanAnother")}
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/app/product/${result.product.slug}`}>
                    <FileText className="size-4" />
                    {t("viewSheet")}
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/app/shelf" onClick={() => addProduct(result.product)}>
                    {t("addToShelf")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {phase === "result" && result?.kind === "unmatched" && (
          <motion.div
            key="result-unmatched"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-10">
              <span className="flex size-14 items-center justify-center rounded-full bg-am/20 text-am-foreground">
                <SearchX className="size-6" />
              </span>
              <div>
                <p className="font-serif text-xl">
                  {result.productName || result.brand
                    ? [result.brand, result.productName].filter(Boolean).join(" · ")
                    : t("unmatchedTitle")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{t("unmatchedText")}</p>
              </div>
              {result.detectedIngredientIds.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {result.detectedIngredientIds.map((id) =>
                    findIngredient(id) ? (
                      <Badge key={id}>{tIngredients(`${id}.name`)}</Badge>
                    ) : null
                  )}
                </div>
              )}
              <Button variant="outline" onClick={reset} className="mt-1">
                <RotateCcw className="size-4" />
                {t("scanAnother")}
              </Button>
            </Card>
          </motion.div>
        )}

        {phase === "result" && result?.kind === "illegible" && (
          <motion.div
            key="result-illegible"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-10">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <SearchX className="size-6" />
              </span>
              <div>
                <p className="font-serif text-xl">{t("illegibleTitle")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("illegibleText")}</p>
              </div>
              <Button variant="outline" onClick={reset} className="mt-1">
                <RotateCcw className="size-4" />
                {t("scanAnother")}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
