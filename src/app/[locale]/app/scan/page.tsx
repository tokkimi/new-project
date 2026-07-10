"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Check, Loader2, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShelf } from "@/lib/shelf-store";
import { PRODUCT_CATALOG } from "@/data/catalog";
import { findIngredient, type Product } from "@/data/ingredients";

type Phase = "idle" | "analyzing" | "result";

export default function ScanPage() {
  const t = useTranslations("scanPage");
  const tCategories = useTranslations("categories");
  const tIngredients = useTranslations("ingredients");
  const analysisSteps = t.raw("steps") as string[];

  const { shelf, addProduct } = useShelf();
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [matched, setMatched] = React.useState<Product | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const startScan = (file?: File) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
    setPhase("analyzing");
    setStepIndex(0);

    const candidates = PRODUCT_CATALOG.filter(
      (p) => !shelf.some((s) => s.id === p.id) && p.ingredientIds.length > 0
    );
    const pick =
      candidates[Math.floor(Math.random() * candidates.length)] ?? PRODUCT_CATALOG[0];

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setStepIndex(i);
      if (i >= analysisSteps.length) {
        clearInterval(interval);
        setMatched(pick);
        setPhase("result");
      }
    }, 650);
  };

  const reset = () => {
    setPhase("idle");
    setMatched(null);
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
          startScan(file);
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
            <Button
              variant="link"
              className="mt-2"
              onClick={() => startScan()}
            >
              {t("demoWithoutPhoto")}
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

        {phase === "result" && matched && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Card className="w-full items-center gap-4 py-10">
              <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
                <Check className="size-6" />
              </span>
              <div>
                <p className="font-serif text-xl">{matched.name}</p>
                <p className="text-sm text-muted-foreground">
                  {matched.brand} · {tCategories(matched.category)}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {matched.ingredientIds.map((id) =>
                  findIngredient(id) ? (
                    <Badge key={id}>{tIngredients(`${id}.name`)}</Badge>
                  ) : null
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="size-4" />
                  {t("scanAnother")}
                </Button>
                <Button asChild>
                  <Link href="/app/shelf" onClick={() => addProduct(matched)}>
                    {t("addToShelf")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
