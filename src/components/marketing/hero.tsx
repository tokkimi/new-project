"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-20 md:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mx-[calc(50%-50vw)] bg-transparent"
      >
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-haru-editorial-cutout.png"
            alt=""
            aria-hidden="true"
            className="block h-auto w-full"
          />
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 pb-4 pt-8 sm:px-6 lg:pb-6 lg:pt-10">
        <div className="relative px-2 py-4 sm:px-0 lg:py-6">
          <div className="relative flex w-full max-w-4xl flex-col items-start text-left drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-balance text-3xl font-semibold leading-[1.08] text-foreground md:text-5xl"
            >
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 max-w-xl text-balance text-base leading-7 text-muted-foreground"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
            >
              <Link
                href="/app/shelf"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent px-7 text-base font-medium text-white shadow-none backdrop-blur-2xl transition hover:bg-white/8"
              >
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-xs text-muted-foreground"
            >
              {t("disclaimer")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
