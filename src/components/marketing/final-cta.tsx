"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="relative overflow-hidden py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">{t("title")}</h2>
        <p className="text-white/72">{t("subtitle")}</p>
        <Link
          href="/app/shelf"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent px-7 text-base font-medium text-white shadow-none backdrop-blur-2xl transition hover:bg-white/8"
        >
          {t("cta")}
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}
