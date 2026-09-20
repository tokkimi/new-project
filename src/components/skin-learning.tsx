"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { SkinLesson } from "@/lib/skin-lessons";

const STORAGE = "haru-learning-v1";
export function SkinLearning({ lessons }: { lessons: SkinLesson[] }) {
  const t = useTranslations("learn");
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
        if (Array.isArray(stored)) setCompleted(lessons.filter(l => stored.includes(l.id)).map(l => l.id));
      } catch { setStorageUnavailable(true); }
    });
    return () => cancelAnimationFrame(frame);
  }, [lessons]);
  const lesson = lessons[active];
  const choose = (index: number) => {
    setAnswer(index);
    if (index !== lesson.correct) return;
    const next = [...new Set([...completed, lesson.id])];
    setCompleted(next);
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); } catch { setStorageUnavailable(true); }
  };
  const switchLesson = (index: number) => { setActive(index); setAnswer(null); };
  return <div className="grid items-start gap-7 lg:grid-cols-[280px_1fr]">
    <aside className="haru-glass rounded-3xl p-5">
      <p className="font-medium" aria-live="polite">{t("progress", { count: completed.length, total: lessons.length })}</p>
      <progress className="my-4 h-2 w-full accent-primary" max={lessons.length} value={completed.length} aria-label={t("progressLabel")} />
      <nav className="flex flex-col gap-2" aria-label={t("modules")}>
        {lessons.map((item, index) => <button key={item.id} type="button" aria-current={index === active ? "step" : undefined} onClick={() => switchLesson(index)} className={`flex min-h-14 items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm ${index === active ? "bg-secondary font-semibold" : "hover:bg-secondary/60"}`}><span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs">{completed.includes(item.id) ? <Check className="size-4" aria-label={t("completed")} /> : index+1}</span>{item.title}</button>)}
      </nav>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">{t(storageUnavailable ? "notSaved" : "saved")}</p>
    </aside>
    <article className="haru-glass overflow-hidden rounded-3xl" aria-labelledby="lesson-title">
      <div className="grid sm:grid-cols-[1fr_200px]">
        <div className="p-6 sm:p-8"><BookOpen className="mb-5 size-6" aria-hidden="true" /><h2 id="lesson-title" className="text-2xl leading-tight sm:text-3xl">{lesson.title}</h2></div>
        <div className="relative hidden min-h-52 sm:block"><Image src={lesson.image} alt="" fill sizes="200px" className="object-cover" /></div>
      </div>
      <div className="space-y-5 px-6 pb-8 sm:px-8">
        {lesson.paragraphs.map(text => <p key={text} className="max-w-2xl text-sm leading-7 sm:text-base">{text}</p>)}
        <a href={lesson.source} target="_blank" rel="noreferrer" className="inline-block text-xs text-muted-foreground underline underline-offset-4">{t("source")}: American Academy of Dermatology ↗</a>
        <fieldset className="rounded-2xl border border-border bg-secondary/35 p-5">
          <legend className="px-2 text-base font-semibold">{lesson.question}</legend>
          <div className="flex flex-col gap-2">{lesson.answers.map((text, index) => <button key={text} type="button" aria-pressed={answer === index} onClick={() => choose(index)} className={`min-h-12 rounded-xl border p-3 text-left text-sm transition-colors ${answer === index ? "border-primary bg-card font-semibold" : "border-border bg-card/60 hover:bg-card"}`}>{text}</button>)}</div>
          {answer !== null && <div role="status" className="mt-4 text-sm leading-6"><p className="font-semibold">{t(answer === lesson.correct ? "correct" : "retry")}</p><p>{lesson.explanation}</p></div>}
        </fieldset>
        <div className="flex flex-wrap gap-3">
          {active < lessons.length-1 && <Button onClick={() => switchLesson(active+1)}>{t("next")}<ArrowRight className="size-4" /></Button>}
          <Button asChild variant="outline"><Link href="/app/shelf">{t("openRoutine")}</Link></Button>
        </div>
      </div>
    </article>
  </div>;
}
