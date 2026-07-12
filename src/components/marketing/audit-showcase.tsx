"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Layers3, Moon, ShieldAlert, Sparkles, Sun } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ICONS = [ClipboardCheck, Layers3, Sun, Moon];

export function AuditShowcase() {
  const t = useTranslations("auditShowcase");
  const checks = t.raw("checks") as { title: string; text: string }[];
  const priorities = t.raw("priorities") as string[];

  return (
    <section id="audit" className="border-y border-border bg-background py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-xl"
        >
          <Badge variant="secondary" className="mb-4">
            {t("eyebrow")}
          </Badge>
          <h2 className="text-balance font-serif text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/app/audit">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app/scan">{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-2xl border border-border bg-card p-4 shadow-[0_18px_60px_-36px_rgba(0,0,0,0.35)]"
        >
          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t("panelEyebrow")}
                </p>
                <h3 className="mt-1 font-serif text-2xl">{t("panelTitle")}</h3>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {checks.map((check, index) => {
                const Icon = ICONS[index] ?? ClipboardCheck;
                return (
                  <div key={check.title} className="rounded-xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <p className="text-sm font-medium">{check.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{check.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldAlert className="size-4 text-primary" />
                <p className="text-sm font-medium">{t("priorityTitle")}</p>
              </div>
              <div className="grid gap-2">
                {priorities.map((priority) => (
                  <div key={priority} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
