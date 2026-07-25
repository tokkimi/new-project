"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const t = useTranslations("hero");
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers only honor autoplay when `muted` is set as a DOM
    // property (not just the SSR-rendered attribute) before play() runs.
    video.muted = true;
    video.play().catch(() => {
      // Autoplay can still be blocked by the platform — the poster stays visible, which is fine.
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-grain">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-96 h-72 w-72 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6">
              <Sparkles className="size-3" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl"
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-balance text-lg text-muted-foreground"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <Button asChild size="lg">
              <Link href="/app/shelf">
                {t("ctaPrimary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 lg:mt-0"
        >
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(0,0,0,0.25)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover opacity-85"
              poster="/hero-banner-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              aria-hidden="true"
            >
              <source src="/hero-banner.webm" type="video/webm" />
              <source src="/hero-banner.mp4" type="video/mp4" />
            </video>
            {/* Glass-pane sheen: diagonal highlight + edge glow, on top of the video */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-white/25" />
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
