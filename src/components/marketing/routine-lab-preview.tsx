"use client";

import { ArrowUpRight, FlaskConical } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const COPY = {
  fr: { title: "Tester un changement, sans bouleverser toute sa routine.", text: "Choisissez un seul objectif, un seul ajustement et une durée. Haru vous aide à garder le reste stable pour mieux observer ce qui fonctionne.", cta: "Créer mon essai" },
  en: { title: "Test one change without changing your whole routine.", text: "Choose one goal, one adjustment and a duration. Haru helps you keep everything else stable, so you can see what works.", cta: "Create my trial" },
  ko: { title: "전체 루틴을 바꾸지 않고 한 가지만 테스트하세요.", text: "목표 하나, 조정 하나, 기간 하나를 선택하세요. Haru가 나머지를 안정적으로 유지해 변화를 관찰하도록 도와드려요.", cta: "테스트 만들기" },
  ja: { title: "ルーティン全体を変えずに、一つだけ試す。", text: "目標、調整、期間を一つずつ選びます。Haru がそれ以外を安定させ、変化を観察しやすくします。", cta: "トライアルを作成" },
} as const;

export function RoutineLabPreview() {
  const locale = useLocale() as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  const { status } = useSession();
  const href = status === "authenticated" ? "/app/routine" : "/sign-in?callbackUrl=%2Fapp%2Froutine";
  return <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16"><div className="haru-routine-lab-preview"><FlaskConical className="size-5 text-primary" aria-hidden="true" /><div className="min-w-0"><p className="text-[10px] font-medium uppercase tracking-[.2em] text-primary">Routine Lab</p><h2 className="mt-2 font-serif text-2xl font-medium">{t.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{t.text}</p></div><Link href={href} className="haru-cta shrink-0">{t.cta} <ArrowUpRight className="size-3.5" /></Link></div></section>;
}
