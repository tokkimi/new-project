"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  SKIN_TYPES,
  CONCERNS,
  AGE_RANGES,
  SENSITIVITIES,
  CLIMATES,
  BUDGETS,
} from "@/lib/validation";

type FormState = {
  skinType: string | null;
  concerns: string[];
  ageRange: string | null;
  sensitivities: string[];
  climate: string | null;
  budget: string | null;
};

const INITIAL: FormState = {
  skinType: null,
  concerns: [],
  ageRange: null,
  sensitivities: [],
  climate: null,
  budget: null,
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {active && <Check className="mr-1.5 inline size-3.5" />}
      {children}
    </button>
  );
}

export default function QuizPage() {
  const t = useTranslations("quiz");
  const tSkinTypes = useTranslations("skinTypes");
  const tConcerns = useTranslations("concerns");
  const tAgeRanges = useTranslations("ageRanges");
  const tSensitivities = useTranslations("sensitivities");
  const tClimates = useTranslations("climates");
  const tBudgets = useTranslations("budgets");
  const router = useRouter();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<FormState>(INITIAL);
  const [saving, setSaving] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const steps = [
    {
      question: t("skinTypeQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {SKIN_TYPES.map((v) => (
            <Chip
              key={v}
              active={form.skinType === v}
              onClick={() => setForm((f) => ({ ...f, skinType: v }))}
            >
              {tSkinTypes(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: !!form.skinType,
    },
    {
      question: t("concernsQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {CONCERNS.map((v) => (
            <Chip
              key={v}
              active={form.concerns.includes(v)}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  concerns: f.concerns.includes(v)
                    ? f.concerns.filter((c) => c !== v)
                    : [...f.concerns, v],
                }))
              }
            >
              {tConcerns(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: true,
    },
    {
      question: t("ageRangeQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {AGE_RANGES.map((v) => (
            <Chip
              key={v}
              active={form.ageRange === v}
              onClick={() => setForm((f) => ({ ...f, ageRange: v }))}
            >
              {tAgeRanges(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: true,
    },
    {
      question: t("sensitivitiesQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {SENSITIVITIES.map((v) => (
            <Chip
              key={v}
              active={form.sensitivities.includes(v)}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  sensitivities: f.sensitivities.includes(v)
                    ? f.sensitivities.filter((s) => s !== v)
                    : [...f.sensitivities, v],
                }))
              }
            >
              {tSensitivities(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: true,
    },
    {
      question: t("climateQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {CLIMATES.map((v) => (
            <Chip
              key={v}
              active={form.climate === v}
              onClick={() => setForm((f) => ({ ...f, climate: v }))}
            >
              {tClimates(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: true,
    },
    {
      question: t("budgetQuestion"),
      render: () => (
        <div className="flex flex-wrap justify-center gap-2">
          {BUDGETS.map((v) => (
            <Chip
              key={v}
              active={form.budget === v}
              onClick={() => setForm((f) => ({ ...f, budget: v }))}
            >
              {tBudgets(v)}
            </Chip>
          ))}
        </div>
      ),
      canProceed: true,
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const submit = async () => {
    setSaving(true);
    await fetch("/api/skin-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skinType: form.skinType,
        concerns: form.concerns,
        ageRange: form.ageRange ?? undefined,
        sensitivities: form.sensitivities,
        climate: form.climate ?? undefined,
        goals: [],
        budget: form.budget ?? undefined,
      }),
    });
    setSaving(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="size-6" />
        </span>
        <h1 className="font-serif text-2xl">{t("savedTitle")}</h1>
        <p className="text-muted-foreground">{t("savedText")}</p>
        <Button size="lg" className="mt-2" onClick={() => router.push("/app/audit")}>
          {t("viewAudit")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <div className="text-center">
        <h1 className="font-serif text-3xl">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Progress value={((step + 1) / steps.length) * 100} />
        <p className="text-center text-xs text-muted-foreground">
          {t("stepOf", { current: step + 1, total: steps.length })}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="items-center gap-6 py-10 text-center">
            <h2 className="font-serif text-xl">{current.question}</h2>
            {current.render()}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ArrowLeft className="size-4" />
          {t("back")}
        </Button>
        {isLast ? (
          <Button onClick={submit} disabled={saving}>
            {t("finish")}
            <Check className="size-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={!current.canProceed}
          >
            {t("next")}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
