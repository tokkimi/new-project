"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="border-y border-border">
        {steps.map((step, i) => {
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="grid gap-4 border-b border-border py-8 last:border-b-0 md:grid-cols-[0.2fr_0.8fr_1.3fr] md:items-start md:py-10"
            >
              <span className="font-serif text-2xl text-muted-foreground/45 md:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl md:text-2xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
