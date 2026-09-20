"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Droplets, ListChecks, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

const CHECK_ICONS = [Camera, ListChecks, Droplets, Sparkles];

export function ScanShowcase() {
  const t = useTranslations("scanShowcase");
  const checks = t.raw("checks") as { title: string; text: string }[];

  return (
    <section className="pb-20 pt-4">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" 
            src="/scan-product-editorial.png"
            alt=""
            className="mb-10 block w-full max-w-[520px] object-contain"
          />

          <h2 className="text-balance text-3xl font-semibold md:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/app/scan"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-border bg-transparent px-7 text-base font-medium text-foreground shadow-none backdrop-blur-2xl transition hover:bg-white/8"
            >
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/app/products"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-border bg-transparent px-7 text-base font-medium text-foreground shadow-none backdrop-blur-2xl transition hover:bg-white/8"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-12"
        >
          <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {checks.map((check, index) => {
              const Icon = CHECK_ICONS[index] ?? Sparkles;
              return (
                <div
                  key={check.title}
                  className="haru-glow-card w-[calc((100vw-4rem)/2)] min-w-[calc((100vw-4rem)/2)] rounded-[1.15rem] p-4 lg:w-auto lg:min-w-0"
                >
                  <span className="haru-icon-halo mb-4 flex size-10 shrink-0 items-center justify-center rounded-full text-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{check.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{check.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
