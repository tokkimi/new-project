"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2 className="text-balance font-serif text-3xl md:text-4xl">
          Arrête de deviner ce qui va avec quoi.
        </h2>
        <p className="text-muted-foreground">
          Ajoute ton étagère, on s&apos;occupe du reste. Gratuit pour commencer.
        </p>
        <Button asChild size="lg">
          <Link href="/app/shelf">
            Construire ma routine
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
