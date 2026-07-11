"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Flame, Waves, Sparkles as SparklesIcon, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SkinScoreRing, ModuleScoreBar } from "@/components/skin-score";

const SAMPLE_ROWS: { moduleId: "pores" | "redness" | "wrinkles" | "radiance"; score: number; icon: typeof Target }[] = [
  { moduleId: "pores", score: 6, icon: Target },
  { moduleId: "redness", score: 3, icon: Flame },
  { moduleId: "wrinkles", score: 2, icon: Waves },
  { moduleId: "radiance", score: 7, icon: SparklesIcon },
];

export function FaceScanPreview() {
  const t = useTranslations("faceScanPage");

  return (
    <Card className="items-center gap-6 py-8">
      <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative flex size-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-am/15 to-transparent text-primary">
          <Camera className="size-9" strokeWidth={1.5} />
        </div>
        <SkinScoreRing score={78} />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-2">
        {SAMPLE_ROWS.map((row, i) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.moduleId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm font-medium">
                {t(`modules.${row.moduleId}.name`)}
              </p>
              <ModuleScoreBar score={row.score} />
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
