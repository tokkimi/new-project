"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AuditShowcase() {
  const t = useTranslations("auditShowcase");
  const checks = t.raw("checks") as { title: string; text: string }[];
  const priorities = t.raw("priorities") as string[];

  return (
    <section id="audit" className="border-y border-border bg-secondary/25 py-24">
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
          className="border-y border-border bg-background/70"
        >
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("panelEyebrow")}
              </p>
              <h3 className="mt-1 font-serif text-2xl">{t("panelTitle")}</h3>
            </div>

            <div className="grid border-t border-border sm:grid-cols-2">
              {checks.map((check, index) => (
                <div
                  key={check.title}
                  className="border-b border-border py-5 sm:px-5 sm:odd:border-r"
                >
                  <p className="mb-2 flex items-baseline gap-3 text-sm font-medium">
                    <span className="font-serif text-lg text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {check.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{check.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="mb-3 text-sm font-medium">{t("priorityTitle")}</p>
              <div className="grid gap-2 border-l border-primary/40 pl-4">
                {priorities.map((priority) => (
                  <p key={priority} className="text-sm leading-relaxed text-muted-foreground">
                    {priority}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
