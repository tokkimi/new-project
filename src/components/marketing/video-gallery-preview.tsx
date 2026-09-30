"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const COPY = {
  fr: { eyebrow: "Galerie vidéo", title: "Gardez les gestes que vous voulez refaire.", text: "Enregistrez une vidéo YouTube, Instagram ou TikTok avec une note. Elle reste liée à votre routine, pour retrouver facilement une technique, un massage ou un conseil.", cta: "Ouvrir ma galerie", imageAlt: "Aperçu de la galerie vidéo Haru" },
  en: { eyebrow: "Video gallery", title: "Keep the rituals you want to repeat.", text: "Save a YouTube, Instagram or TikTok video with a note. It stays with your routine, so you can find a technique, massage or tip again.", cta: "Open my gallery", imageAlt: "Haru video gallery preview" },
  ko: { eyebrow: "비디오 갤러리", title: "다시 보고 싶은 루틴을 저장하세요.", text: "YouTube, Instagram, TikTok 영상을 메모와 함께 저장하세요. 루틴과 연결해 마사지나 팁을 쉽게 다시 찾을 수 있어요.", cta: "내 갤러리 열기", imageAlt: "하루 비디오 갤러리 미리 보기" },
  ja: { eyebrow: "動画ギャラリー", title: "繰り返したいケアを保存できます。", text: "YouTube、Instagram、TikTok の動画をメモ付きで保存。ルーティンと結び付けて、テクニックやマッサージをすぐに見つけられます。", cta: "ギャラリーを開く", imageAlt: "Haru 動画ギャラリーのプレビュー" },
} as const;

export function VideoGalleryPreview() {
  const locale = useLocale() as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  const { status } = useSession();
  const href = status === "authenticated" ? "/app/routine" : "/sign-in?callbackUrl=%2Fapp%2Froutine";
  return <section className="haru-video-gallery mx-auto max-w-6xl px-6 py-14 sm:py-18">
    <div className="grid items-center gap-8 lg:grid-cols-[.86fr_1.14fr]">
      <div><p className="text-[10px] font-medium uppercase tracking-[.2em] text-primary">{t.eyebrow}</p><h2 className="mt-3 text-balance font-serif text-2xl font-medium sm:text-3xl">{t.title}</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{t.text}</p><Link href={href} className="haru-cta mt-6">{t.cta} <Plus className="size-3.5" /></Link></div>
      <div className="haru-video-gallery-visual"><Image src="/video-gallery-editorial.png" alt={t.imageAlt} width={1536} height={1024} sizes="(min-width: 1024px) 55vw, 100vw" className="h-auto w-full" priority /></div>
    </div>
  </section>;
}
