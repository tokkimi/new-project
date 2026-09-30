"use client";

import { Link2, Play, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const COPY = {
  fr: { eyebrow: "Galerie vidéo", title: "Gardez les gestes que vous voulez refaire.", text: "Enregistrez une vidéo YouTube, Instagram ou TikTok avec une note. Elle reste liée à votre routine, pour retrouver facilement une technique, un massage ou un conseil.", cta: "Ouvrir ma galerie", card: "Routine du soir · massage doux", note: "Pourquoi la garder ? Un geste simple à refaire quand la peau est tendue." },
  en: { eyebrow: "Video gallery", title: "Keep the rituals you want to repeat.", text: "Save a YouTube, Instagram or TikTok video with a note. It stays with your routine, so you can find a technique, massage or tip again.", cta: "Open my gallery", card: "Evening routine · gentle massage", note: "Why save it? A simple gesture to repeat when skin feels tense." },
  ko: { eyebrow: "비디오 갤러리", title: "다시 보고 싶은 루틴을 저장하세요.", text: "YouTube, Instagram, TikTok 영상을 메모와 함께 저장하세요. 루틴과 연결해 마사지나 팁을 쉽게 다시 찾을 수 있어요.", cta: "내 갤러리 열기", card: "저녁 루틴 · 부드러운 마사지", note: "저장 이유: 피부가 긴장될 때 다시 보기 좋은 간단한 동작." },
  ja: { eyebrow: "動画ギャラリー", title: "繰り返したいケアを保存できます。", text: "YouTube、Instagram、TikTok の動画をメモ付きで保存。ルーティンと結び付けて、テクニックやマッサージをすぐに見つけられます。", cta: "ギャラリーを開く", card: "夜のルーティン · やさしいマッサージ", note: "保存する理由：肌がこわばる日に繰り返したい簡単な動き。" },
} as const;

export function VideoGalleryPreview() {
  const locale = useLocale() as keyof typeof COPY;
  const t = COPY[locale] ?? COPY.fr;
  const { status } = useSession();
  const href = status === "authenticated" ? "/app/routine" : "/sign-in?callbackUrl=%2Fapp%2Froutine";
  return <section className="haru-video-gallery mx-auto max-w-6xl px-6 py-14 sm:py-18">
    <div className="grid items-center gap-8 lg:grid-cols-[.86fr_1.14fr]">
      <div><p className="text-[10px] font-medium uppercase tracking-[.2em] text-primary">{t.eyebrow}</p><h2 className="mt-3 text-balance font-serif text-2xl font-medium sm:text-3xl">{t.title}</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{t.text}</p><Link href={href} className="haru-cta mt-6">{t.cta} <Plus className="size-3.5" /></Link></div>
      <div className="haru-video-gallery-visual"><div className="haru-video-gallery-frame"><div className="flex items-center justify-between text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><Link2 className="size-4" /> Vidéo enregistrée</span><span>00:48</span></div><div className="haru-video-thumbnail mt-4"><Play className="size-5 fill-current" /></div><p className="mt-4 text-sm font-medium">{t.card}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{t.note}</p></div><span className="haru-video-orb haru-video-orb-a" /><span className="haru-video-orb haru-video-orb-b" /></div>
    </div>
  </section>;
}
