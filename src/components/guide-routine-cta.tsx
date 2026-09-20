"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const copy = {
  fr: { title: "Créer cette routine", signedOut: "Connectez-vous pour ajouter les produits de ce guide à votre routine personnelle.", signedIn: "Ajoutez les produits qui vous conviennent, puis ajustez les étapes à votre peau.", signIn: "Se connecter", open: "Ouvrir ma routine" },
  en: { title: "Create this routine", signedOut: "Sign in to add products from this guide to your personal routine.", signedIn: "Add the products that suit you, then adapt each step to your skin.", signIn: "Sign in", open: "Open my routine" },
  ko: { title: "이 루틴 만들기", signedOut: "로그인 후 이 가이드의 제품을 내 루틴에 추가할 수 있어요.", signedIn: "맞는 제품을 추가하고 내 피부에 맞게 단계를 조정하세요.", signIn: "로그인", open: "내 루틴 열기" },
  ja: { title: "このルーティンを作る", signedOut: "ログインすると、このガイドの製品を自分のルーティンに追加できます。", signedIn: "自分に合う製品を加え、肌に合わせてステップを調整しましょう。", signIn: "ログイン", open: "マイルーティンを開く" },
} as const;

export function GuideRoutineCta({ slug }: { slug: string }) {
  const { status } = useSession();
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const href = `/app/routines/${slug}`;
  const signedIn = status === "authenticated";
  return <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-primary/20 bg-card p-6 sm:flex-row sm:items-center sm:p-8">
    <div className="min-w-0"><p className="font-serif text-2xl leading-tight">{t.title}</p><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{signedIn ? t.signedIn : t.signedOut}</p></div>
    <Button asChild className="shrink-0"><Link href={signedIn ? href : `/sign-in?callbackUrl=${encodeURIComponent(href)}`}>{signedIn ? <Plus className="size-4" /> : null}{signedIn ? t.open : t.signIn}<ArrowRight className="size-4" /></Link></Button>
  </div>;
}
