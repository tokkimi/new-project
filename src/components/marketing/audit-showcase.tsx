"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function AuditShowcase() {
  const t = useTranslations("auditShowcase");
  const comparison = t.raw("comparison") as {
    scanTitle: string;
    scanText: string;
    scanItems: string[];
    auditTitle: string;
    auditText: string;
    auditItems: string[];
  };

  return (
    <section id="audit" className="py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/audit-scan-editorial.png"
            alt=""
            aria-hidden="true"
            className="mx-auto block h-auto w-full max-w-5xl object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
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
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-10 grid w-full gap-4 md:grid-cols-2"
        >
          {[
            {
              title: comparison.scanTitle,
              text: comparison.scanText,
              items: comparison.scanItems,
            },
            {
              title: comparison.auditTitle,
              text: comparison.auditText,
              items: comparison.auditItems,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-[1.25rem] border border-white/40 bg-white/10 p-6 text-left text-white backdrop-blur-2xl dark:border-white/20 dark:bg-white/[0.04]"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78">{card.text}</p>
              <div className="mt-5 grid gap-3">
                {card.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-relaxed text-white/82">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
