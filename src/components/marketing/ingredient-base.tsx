"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { INGREDIENTS } from "@/data/ingredients";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function IngredientBase() {
  const t = useTranslations("ingredientBase");
  const tIngredients = useTranslations("ingredients");

  return (
    <section id="ingredients" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="text-sm font-medium text-primary">{t("eyebrow")}</p>
        <h2 className="mt-2 text-balance font-serif text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INGREDIENTS.map((ing, i) => (
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
          >
            <Card className="h-full gap-2 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium leading-snug">
                  {tIngredients(`${ing.id}.name`)}
                </h3>
                <Badge variant={ing.timePref === "am" ? "am" : ing.timePref === "pm" ? "pm" : "secondary"}>
                  {t(`timeLabel.${ing.timePref}`)}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {tIngredients(`${ing.id}.summary`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
