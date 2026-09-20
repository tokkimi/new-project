"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function WellnessShowcase() {
  const t = useTranslations("wellnessShowcase");
  const checks = t.raw("checks") as { title: string; text: string }[];

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="order-2 max-w-xl lg:order-1"
        >
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-6 grid gap-3 text-sm leading-relaxed text-white/86">
            {checks.map((check) => (
              <p key={check.title}>
                <span className="font-medium text-white">{check.title}</span>
                <span className="text-white/55"> — </span>
                <span className="text-muted-foreground">{check.text}</span>
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/app/wellness">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="order-1 lg:order-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wellness-editorial-face.png"
            alt=""
            className="mx-auto block w-full max-w-[520px] object-contain lg:max-w-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
