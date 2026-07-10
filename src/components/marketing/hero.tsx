"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grain">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-am/20 blur-3xl" />
        <div className="absolute left-0 top-96 h-72 w-72 rounded-full bg-pm/15 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6">
            <Sparkles className="size-3" />
            Inspiré des routines K-beauty
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl"
        >
          Ta routine skincare,
          <br />
          <span className="text-primary">enfin décodée.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-xl text-balance text-lg text-muted-foreground"
        >
          Haru scanne les produits que tu possèdes déjà, repère les conflits
          d&apos;ingrédients et construit ta routine matin/soir idéale —
          sans jargon, sans y passer trois heures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/app/shelf">
              Construire ma routine
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#comment-ca-marche">Voir comment ça marche</a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-xs text-muted-foreground"
        >
          Gratuit pour ton étagère jusqu&apos;à 12 produits · sans carte bancaire
        </motion.p>
      </div>
    </section>
  );
}
