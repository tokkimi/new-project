import Image from "next/image";
import { ArrowRight, Droplets, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const FEATURED_GUIDES = [
  { slug: "glass-skin", icon: Sparkles },
  { slug: "sensitive-barrier", icon: ShieldCheck },
  { slug: "minimalist", icon: Droplets },
] as const;

export function SkinGoalsShowcase() {
  const t = useTranslations("skinGoals");
  const tGuides = useTranslations("routineGuides");

  return (
    <section className="border-y border-border/60 bg-[#efe6dc] py-16 text-[#2a201a] sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="overflow-hidden rounded-[36px] border border-white/60 bg-[#f8f3ed] shadow-[0_35px_100px_-70px_rgba(50,35,25,0.75)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#79573f]">
                {t("eyebrow")}
              </p>
              <h2 className="mt-4 text-balance font-serif text-4xl leading-tight md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-[#75675d]">{t("subtitle")}</p>
              <Button asChild className="mt-7 w-fit bg-[#5b402f] text-white hover:bg-[#493326]">
                <Link href="/guides">
                  {t("cta")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="relative min-h-[320px] lg:min-h-[500px]">
              <Image
                src="/today-skincare-ritual.png"
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {FEATURED_GUIDES.map(({ slug, icon: Icon }) => (
            <Link
              key={slug}
              href={`/guides/${slug}`}
              className="group rounded-[26px] border border-white/60 bg-white/55 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-white text-[#6a4a35] shadow-sm">
                  <Icon className="size-5" />
                </span>
                <ArrowRight className="size-4 text-[#8a7868] transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="mt-5 font-serif text-2xl">
                {tGuides(`guides.${slug}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#75675d]">
                {tGuides(`guides.${slug}.goal`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
