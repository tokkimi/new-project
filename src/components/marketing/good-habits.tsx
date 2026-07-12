"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Droplets,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import { INGREDIENTS } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DAILY = [
  {
    icon: Sun,
    title: "Morning is protection",
    text: "Cleanse only if you wake up oily or sweaty, hydrate, then finish with broad-spectrum SPF 30 or higher every day.",
  },
  {
    icon: Moon,
    title: "Evening is removal and repair",
    text: "Remove sunscreen and makeup, cleanse gently, then use treatment only if your skin tolerates it. Finish with moisturizer.",
  },
  {
    icon: ShieldCheck,
    title: "SPF is the non-negotiable step",
    text: "Reapply about every 2 hours when outdoors, and after sweating or swimming. Actives work better when UV is controlled.",
  },
  {
    icon: AlertTriangle,
    title: "Do less when skin is irritated",
    text: "Pause retinoids, acids, scrubs and fragrance-heavy extras when skin stings, flakes, burns, or stays red.",
  },
];

const ROUTINES = [
  {
    type: "Dry or tight skin",
    am: "Gentle rinse or creamy cleanser -> hydrating toner/serum -> ceramide moisturizer -> SPF.",
    pm: "Cleanser -> hydrating serum on damp skin -> richer moisturizer or sleeping mask.",
    avoid: "Avoid foaming cleansers that leave skin squeaky, daily acids, and layering too many actives.",
  },
  {
    type: "Oily or breakout-prone skin",
    am: "Light cleanser -> niacinamide or calming serum -> gel moisturizer -> lightweight SPF.",
    pm: "Cleanser -> BHA 2-4 nights/week or acne treatment -> non-comedogenic moisturizer.",
    avoid: "Do not skip moisturizer; over-stripping often makes oiliness worse.",
  },
  {
    type: "Sensitive or redness-prone skin",
    am: "Minimal cleanse -> centella/panthenol serum -> barrier cream -> mineral or gentle SPF.",
    pm: "Cleanser -> soothing serum -> ceramide moisturizer. Add actives one at a time only.",
    avoid: "Avoid starting retinol, vitamin C and exfoliating acids in the same week.",
  },
  {
    type: "Combination skin",
    am: "Gentle cleanser where needed -> light hydration -> moisturizer only where dry -> SPF.",
    pm: "Cleanser -> treatment by zone: BHA on oily areas, barrier care on dry areas -> moisturizer.",
    avoid: "Do not force one heavy routine on the whole face if your T-zone and cheeks behave differently.",
  },
  {
    type: "Dullness or uneven tone",
    am: "Cleanser -> vitamin C or niacinamide -> moisturizer -> SPF.",
    pm: "Cleanser -> gentle AHA 1-3 nights/week or retinoid on alternate nights -> moisturizer.",
    avoid: "Do not exfoliate daily for glow. Irritation creates more uneven tone.",
  },
  {
    type: "First simple routine",
    am: "Cleanser if needed -> moisturizer -> SPF.",
    pm: "Cleanser -> moisturizer.",
    avoid: "Add only one new product at a time, then wait 1-2 weeks before adding another active.",
  },
];

const RULES = [
  "Apply thinnest textures before thicker creams.",
  "Keep retinoids mostly at night and pair them with morning SPF.",
  "Use exfoliating acids gradually; more tingle is not more result.",
  "Patch test new actives, especially if your skin is reactive.",
  "A routine that you can repeat beats a 12-step routine you abandon.",
];

const INGREDIENT_COPY: Record<string, { name: string; summary: string }> = {
  retinol: { name: "Retinoids", summary: "Texture, visible aging, breakouts; mostly night use." },
  vitamin_c: { name: "Vitamin C", summary: "Morning antioxidant and tone support." },
  niacinamide: { name: "Niacinamide", summary: "Barrier, oil balance, redness and tone support." },
  aha: { name: "AHA", summary: "Surface exfoliation for texture and glow." },
  bha: { name: "BHA", summary: "Oil-soluble pore and blackhead support." },
  benzoyl_peroxide: { name: "Benzoyl peroxide", summary: "Acne active; can be drying and bleaching." },
  vitamin_e: { name: "Vitamin E", summary: "Antioxidant often paired with vitamin C." },
  peptides: { name: "Peptides", summary: "Firmness and barrier-supporting signal ingredients." },
  hyaluronic_acid: { name: "Hyaluronic acid", summary: "Hydration support, best sealed with moisturizer." },
  centella: { name: "Centella / cica", summary: "Soothing support for visible redness." },
  spf: { name: "SPF", summary: "Daily UV protection; the final morning step." },
  ceramides: { name: "Ceramides", summary: "Barrier lipids for dryness and sensitivity." },
};

export function GoodHabits() {
  return (
    <section id="good-habits" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Les bons gestes</p>
          <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">
            Start with skin logic, then personalize.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Haru does not pretend everyone needs the same routine. The base is simple:
            cleanse, treat carefully, moisturize, protect. Then the details change by skin type.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {DAILY.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card className="h-full gap-3 p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </span>
                <h3 className="font-serif text-lg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ROUTINES.map((routine, i) => (
            <motion.div
              key={routine.type}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
            >
              <Card className="h-full gap-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg">{routine.type}</h3>
                  <Badge variant="secondary">Guide</Badge>
                </div>
                <div className="grid gap-3 text-sm">
                  <p>
                    <span className="font-medium text-foreground">AM: </span>
                    <span className="text-muted-foreground">{routine.am}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">PM: </span>
                    <span className="text-muted-foreground">{routine.pm}</span>
                  </p>
                  <p className="rounded-lg bg-warning/10 p-3 text-muted-foreground">
                    <span className="font-medium text-foreground">Watch out: </span>
                    {routine.avoid}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="gap-4 p-6">
            <div className="flex items-center gap-2">
              <Waves className="size-5 text-primary" />
              <h3 className="font-serif text-xl">Rules Haru uses when checking a routine</h3>
            </div>
            <ul className="grid gap-2.5">
              {RULES.map((rule) => (
                <li key={rule} className="flex gap-2 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="gap-4 p-6">
            <div className="flex items-center gap-2">
              <Droplets className="size-5 text-primary" />
              <h3 className="font-serif text-xl">Ingredient base Haru watches</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {INGREDIENTS.map((ing) => (
                <div key={ing.id} className="rounded-lg border border-border bg-background p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{INGREDIENT_COPY[ing.id]?.name ?? ing.id}</p>
                    <Badge
                      variant={
                        ing.timePref === "am" ? "am" : ing.timePref === "pm" ? "pm" : "secondary"
                      }
                    >
                      {ing.timePref === "am" ? "AM" : ing.timePref === "pm" ? "PM" : "Both"}
                    </Badge>
                  </div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {INGREDIENT_COPY[ing.id]?.summary ?? "Tracked by Haru's compatibility rules."}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Based on dermatologist-style routine basics: gentle cleansing, moisturizing,
          broad-spectrum SPF 30+, cautious active use, and sunscreen reapplication outdoors.
          Haru is guidance, not a medical diagnosis.
        </p>
      </div>
    </section>
  );
}
