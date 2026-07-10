"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles, CalendarClock } from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "Ajoute ton étagère",
    text: "Photographie la liste INCI d'un produit ou choisis-le dans notre base — 30 secondes par produit.",
  },
  {
    icon: Sparkles,
    title: "On détecte les conflits",
    text: "Haru croise les actifs de tes produits avec notre moteur de règles : sur-exfoliation, désactivation d'actif, doublons inutiles.",
  },
  {
    icon: CalendarClock,
    title: "Ta routine AM/PM, ordonnée",
    text: "Chaque produit à la bonne étape, dans le bon ordre, avec des alternatives claires quand deux actifs ne font pas bon ménage.",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="text-sm font-medium text-primary">Comment ça marche</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">
          Trois étapes, zéro friction
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-7"
          >
            <span className="absolute right-6 top-6 font-serif text-3xl text-muted-foreground/30">
              0{i + 1}
            </span>
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </span>
            <h3 className="font-serif text-xl">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
