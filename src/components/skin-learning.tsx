"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { SkinLesson } from "@/lib/skin-lessons";

const STORAGE = "haru-learning-v2";
export function SkinLearning({ lessons }: { lessons: SkinLesson[] }) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const article = useRef<HTMLElement>(null);
  const labels = locale === 'fr' ? { example: 'Un exemple concret', practice: 'À faire avec ta routine', check: 'Vérifie ce que tu as compris', choose: 'Choisir un chapitre', reading: 'min de lecture' } : locale === 'ko' ? {example:'실제 예시',practice:'내 루틴에 적용하기',check:'이해도 확인',choose:'챕터 선택',reading:'분 읽기'} : locale === 'ja' ? {example:'具体例',practice:'実践する',check:'理解を確認',choose:'章を選ぶ',reading:'分で読めます'} : {example:'A practical example',practice:'Try it with your routine',check:'Check your understanding',choose:'Choose a chapter',reading:'min read'};
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const index = lessons.findIndex(l => l.id === window.location.hash.slice(1));
      if (index >= 0) setActive(index);
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
  const switchLesson = (index: number) => { setActive(index); setAnswer(null); requestAnimationFrame(() => { article.current?.scrollIntoView({block:'start',behavior:'instant'}); article.current?.focus({preventScroll:true}); }); };
  const minutes = Math.max(1, Math.ceil([ ...lesson.paragraphs, ...(lesson.sections ?? []).flatMap(s => s.paragraphs), lesson.example ?? '', ...(lesson.practice ?? []) ].join(' ').split(/\s+/).length / 160));
  return <div className="haru-learning grid min-w-0 items-start gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
    <aside className="haru-glass min-w-0 rounded-3xl p-5">
      <p className="font-medium" aria-live="polite">{t("progress", { count: completed.length, total: lessons.length })}</p>
      <progress className="my-4 h-2 w-full accent-primary" max={lessons.length} value={completed.length} aria-label={t("progressLabel")} />
      <label className="block text-sm font-medium lg:hidden" htmlFor="lesson-selector">{labels.choose}</label>
      <select id="lesson-selector" className="mt-2 min-h-12 w-full min-w-0 rounded-xl border border-border px-3 text-sm lg:hidden" value={active} onChange={e=>switchLesson(Number(e.target.value))}>{lessons.map((item,index)=><option key={item.id} value={index}>{index+1}. {item.title}</option>)}</select>
      <nav className="hidden flex-col gap-2 lg:flex" aria-label={t("modules")}>
        {lessons.map((item, index) => <button key={item.id} type="button" aria-current={index === active ? "step" : undefined} onClick={() => switchLesson(index)} className={`flex min-h-14 min-w-0 items-start gap-3 rounded-2xl px-3 py-3 text-left text-sm leading-5 [overflow-wrap:anywhere] ${index === active ? "bg-secondary font-semibold" : "hover:bg-secondary/60"}`}><span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs">{completed.includes(item.id) ? <Check className="size-4" aria-label={t("completed")} /> : index+1}</span><span className="min-w-0">{item.title}</span></button>)}
      </nav>
      <p className="mt-5 text-xs leading-5 text-muted-foreground">{t(storageUnavailable ? "notSaved" : "saved")}</p>
    </aside>
    <article ref={article} tabIndex={-1} className="haru-glass min-w-0 scroll-mt-24 overflow-hidden rounded-3xl" aria-labelledby="lesson-title">
      <div className="grid sm:grid-cols-[1fr_200px]">
        <div className="min-w-0 p-5 sm:p-8"><p className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"><BookOpen className="size-4" aria-hidden="true" />{active+1} / {lessons.length} · {minutes} {labels.reading}</p><h2 id="lesson-title">{lesson.title}</h2></div>
        <div className="relative hidden min-h-52 sm:block"><Image src={lesson.image} alt="" fill sizes="200px" className="object-cover" /></div>
      </div>
      <div className="space-y-7 px-5 pb-8 sm:px-8">
        {lesson.paragraphs.map(text => <p key={text} className="max-w-2xl text-sm leading-7 sm:text-base">{text}</p>)}
        {lesson.sections?.map((section,index)=><section key={section.title} className="border-t border-border pt-6"><p className="mb-2 text-xs font-medium text-muted-foreground">{String(index+1).padStart(2,'0')}</p><h3 className="mb-4">{section.title}</h3><div className="space-y-4">{section.paragraphs.map(text=><p key={text} className="max-w-prose text-sm leading-7 sm:text-base">{text}</p>)}</div></section>)}
        {lesson.example && <section className="rounded-2xl bg-secondary/65 p-5"><h3 className="mb-3">{labels.example}</h3><p className="text-sm leading-7">{lesson.example}</p></section>}
        {lesson.practice && <section className="rounded-2xl border border-border p-5"><h3 className="mb-3">{labels.practice}</h3><ol className="list-decimal space-y-3 pl-5 text-sm leading-6">{lesson.practice.map(text=><li key={text}>{text}</li>)}</ol></section>}
        <a href={lesson.source} target="_blank" rel="noreferrer" className="inline-block text-xs text-muted-foreground underline underline-offset-4">{t("source")}: American Academy of Dermatology ↗</a>
        <fieldset className="min-w-0 rounded-2xl border border-border bg-secondary/35 p-4 sm:p-5">
          <legend className="px-2 text-sm font-semibold leading-6">{labels.check}</legend>
          <p className="mb-4 text-base font-semibold leading-7">{lesson.question}</p>
          <div className="flex flex-col gap-2">{lesson.answers.map((text, index) => <button key={text} type="button" aria-pressed={answer === index} onClick={() => choose(index)} className={`min-h-12 rounded-xl border p-3 text-left text-sm leading-5 [overflow-wrap:anywhere] transition-colors ${answer === index ? "border-primary bg-card font-semibold" : "border-border bg-card/60 hover:bg-card"}`}>{text}</button>)}</div>
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
