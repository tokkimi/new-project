import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { skinLessons } from "@/lib/skin-lessons";

export async function LearnShowcase() {
  const t = await getTranslations("learn");
  const lessons = skinLessons(await getLocale());
  return <section className="haru-learning mx-auto w-full max-w-7xl px-5 py-12 sm:px-8" aria-labelledby="learn-title"><div className="haru-glass rounded-3xl p-5 sm:p-10"><div className="flex flex-wrap items-center justify-between gap-5"><h2 id="learn-title" className="min-w-0 max-w-xl">{t("title")}</h2><Link href="/learn" className="haru-cta">{t("start")}<ArrowUpRight className="size-4" /></Link></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{lessons.map((lesson,index)=><Link href={`/learn#${lesson.id}`} key={lesson.id} className="min-w-0 rounded-2xl border border-border p-5 hover:bg-secondary/60"><BookOpen className="mb-4 size-5" aria-hidden="true" /><p className="text-xs text-muted-foreground">0{index+1}</p><h3 className="mt-2">{lesson.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{lesson.paragraphs[0]}</p></Link>)}</div></div></section>;
}
