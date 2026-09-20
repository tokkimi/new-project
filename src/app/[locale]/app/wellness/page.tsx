import type { ComponentType } from "react";
import { ArrowRight, Brain, CloudRain, Moon, ShieldCheck, Sparkles, Waves, Wind } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WellnessPlayer, type SoundMode } from "@/components/wellness-player";
import { BreathingGuide } from "@/components/breathing-guide";
import { SleepChecklist } from "@/components/sleep-checklist";
import { db } from "@/lib/db";

type Lang = "en" | "ko" | "ja" | "fr";
type WellnessSound = {
  slug: string;
  label: string;
  description: string;
  mode?: SoundMode;
  audioUrl?: string;
  order: number;
};

const copy: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    science: string;
    scienceText: string;
    breathing: string;
    breathingText: string;
    inhale: string;
    hold: string;
    exhale: string;
    start: string;
    pause: string;
    sleep: string;
    sleepText: string;
    sleepItems: string[];
    sounds: string;
    soundsText: string;
    fallbackNote: string;
    audioError: string;
    faceCare: string;
    faceCareText: string;
    openFaceCare: string;
    guides: string;
    guidesText: string;
    openGuides: string;
    encyclo: string;
    encycloText: string;
    openEncyclo: string;
  }
> = {
  en: {
    title: "Wellness",
    subtitle:
      "Stress, sleep and facial tension can change how skin looks and feels. This space keeps the support practical, calm and non-medical.",
    science: "Stress and skin",
    scienceText:
      "Stress can influence sleep, picking, itching, oiliness and inflammation signals. Haru treats this as lifestyle support, not diagnosis or treatment.",
    breathing: "Two-minute breathing",
    breathingText:
      "Inhale for 4, hold for 2, exhale for 6. Repeat five times before a night routine or when the jaw feels tense.",
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
    start: "Start",
    pause: "Pause",
    sleep: "Sleep cue",
    sleepText: "A simple nightly checklist. It resets automatically every day.",
    sleepItems: [
      "Cleanse fully, including SPF and makeup",
      "Moisturize",
      "Dim phone and screen brightness",
      "Skip strong actives tonight if skin feels hot or tight",
    ],
    sounds: "Integrated calming sounds",
    soundsText:
      "Tap any sound to listen directly in Haru. These are relaxation supports only, not skin treatments or medical therapy.",
    fallbackNote: "Built-in sounds are available even when the library is being updated.",
    audioError: "Tap again or check browser audio permissions.",
    faceCare: "Face care library",
    faceCareText: "Gentle massage, face yoga, jaw release and scalp tension routines.",
    openFaceCare: "Open face care",
    guides: "Routine guides",
    guidesText: "Starting points by goal: glass skin, acne-prone, brightening, sensitive skin and more.",
    openGuides: "Browse guides",
    encyclo: "Ingredient guide",
    encycloText: "What each tracked active does, how to use it, and what to know before you start.",
    openEncyclo: "Browse ingredients",
  },
  ko: {
    title: "웰니스",
    subtitle:
      "스트레스, 수면, 얼굴 긴장은 피부가 보이고 느껴지는 방식에 영향을 줄 수 있어요. 이 공간은 차분하고 실용적인 비의료 웰니스 지원을 제공합니다.",
    science: "스트레스와 피부",
    scienceText:
      "스트레스는 수면, 피부를 만지는 습관, 가려움, 유분감, 염증 신호에 영향을 줄 수 있어요. Haru는 이를 진단이나 치료가 아닌 생활 지원으로 다룹니다.",
    breathing: "2분 호흡",
    breathingText: "4초 들이마시고, 2초 멈춘 뒤, 6초 내쉬세요. 저녁 루틴 전이나 턱이 긴장될 때 다섯 번 반복하세요.",
    inhale: "들이마시기",
    hold: "멈추기",
    exhale: "내쉬기",
    start: "시작",
    pause: "일시정지",
    sleep: "수면 체크",
    sleepText: "매일 자동으로 초기화되는 간단한 저녁 체크리스트입니다.",
    sleepItems: ["SPF와 메이크업까지 충분히 세안", "보습하기", "휴대폰과 화면 밝기 낮추기", "피부가 뜨겁거나 당기면 강한 활성 성분은 쉬기"],
    sounds: "내장 릴랙싱 사운드",
    soundsText: "Haru 안에서 바로 재생할 수 있어요. 이 사운드는 휴식을 돕는 용도이며 피부 치료나 의료 행위가 아닙니다.",
    fallbackNote: "라이브러리가 업데이트 중이어도 기본 사운드는 사용할 수 있어요.",
    audioError: "다시 탭하거나 브라우저 오디오 권한을 확인해주세요.",
    faceCare: "페이스 케어 라이브러리",
    faceCareText: "부드러운 마사지, 페이스 요가, 턱 이완, 두피 긴장 완화 루틴.",
    openFaceCare: "페이스 케어 열기",
    guides: "루틴 가이드",
    guidesText: "목표별 시작점: 글래스 스킨, 트러블 피부, 브라이트닝, 민감 피부 등.",
    openGuides: "가이드 보기",
    encyclo: "성분 가이드",
    encycloText: "Haru가 추적하는 활성 성분의 역할, 사용법, 시작 전 확인할 점.",
    openEncyclo: "성분 보기",
  },
  ja: {
    title: "ウェルネス",
    subtitle:
      "ストレス、睡眠、顔の緊張は肌の見え方や感じ方に影響します。ここでは落ち着いて実践できる非医療のサポートをまとめています。",
    science: "ストレスと肌",
    scienceText:
      "ストレスは睡眠、肌を触る癖、かゆみ、皮脂感、炎症サインに影響することがあります。Haruでは診断や治療ではなく生活面のサポートとして扱います。",
    breathing: "2分ブリージング",
    breathingText: "4秒吸って、2秒止めて、6秒吐きます。夜のルーティン前や顎がこわばる時に5回くり返します。",
    inhale: "吸う",
    hold: "止める",
    exhale: "吐く",
    start: "開始",
    pause: "一時停止",
    sleep: "睡眠チェック",
    sleepText: "毎日自動でリセットされるシンプルな夜のチェックリストです。",
    sleepItems: ["SPFとメイクをきちんと落とす", "保湿する", "スマホと画面の明るさを下げる", "肌が熱い・つっぱる夜は強い成分を休む"],
    sounds: "内蔵リラックスサウンド",
    soundsText: "Haru内で直接再生できます。これはリラックスのためのサポートで、治療ではありません。",
    fallbackNote: "ライブラリ更新中でも基本サウンドは利用できます。",
    audioError: "もう一度タップするか、ブラウザの音声許可を確認してください。",
    faceCare: "フェイスケアライブラリ",
    faceCareText: "やさしいマッサージ、フェイスヨガ、顎のリリース、頭皮の緊張ケア。",
    openFaceCare: "フェイスケアを開く",
    guides: "ルーティンガイド",
    guidesText: "目標別の始め方: グラススキン、ニキビ肌、ブライトニング、敏感肌など。",
    openGuides: "ガイドを見る",
    encyclo: "成分ガイド",
    encycloText: "Haruが追跡する成分の役割、使い方、始める前の注意点。",
    openEncyclo: "成分を見る",
  },
  fr: {
    title: "Wellness",
    subtitle:
      "Stress, sommeil et tensions du visage peuvent influencer l'apparence et le confort de la peau. Haru garde cet espace calme, pratique et non medical.",
    science: "Stress et peau",
    scienceText:
      "Le stress peut influencer le sommeil, les gestes repetitifs, les demangeaisons, la sensation de sebum et les rougeurs visibles. Haru reste sur du soutien bien-etre.",
    breathing: "Respiration deux minutes",
    breathingText:
      "Inspirez 4 secondes, bloquez 2 secondes, expirez 6 secondes. A faire avant la routine du soir ou quand la machoire est tendue.",
    inhale: "Inspirez",
    hold: "Pause",
    exhale: "Expirez",
    start: "Demarrer",
    pause: "Pause",
    sleep: "Sommeil",
    sleepText: "Une checklist simple du soir, remise a zero chaque jour.",
    sleepItems: ["Nettoyer SPF et maquillage", "Hydrater", "Baisser la luminosite des ecrans", "Mettre les actifs forts en pause si la peau tire"],
    sounds: "Sons relaxants integres",
    soundsText: "Touchez un son pour l'ecouter directement dans Haru. Ces sons aident a se detendre, ce ne sont pas des traitements.",
    fallbackNote: "Les sons integres restent disponibles meme si la bibliotheque est en mise a jour.",
    audioError: "Touchez encore une fois ou verifiez les autorisations audio du navigateur.",
    faceCare: "Bibliotheque face care",
    faceCareText: "Massage doux, face yoga, relachement de la machoire et routines de tension du cuir chevelu.",
    openFaceCare: "Ouvrir face care",
    guides: "Guides de routine",
    guidesText: "Des points de depart par objectif: glass skin, imperfections, eclat, peaux sensibles et plus.",
    openGuides: "Voir les guides",
    encyclo: "Guide des ingredients",
    encycloText: "Ce que fait chaque actif suivi, comment l'utiliser et ce qu'il faut savoir avant.",
    openEncyclo: "Voir les ingredients",
  },
};

const FALLBACK_SOUNDS: Record<Lang, WellnessSound[]> = {
  en: [
    { slug: "white-noise", label: "White noise", description: "Even sound for focus or winding down", mode: "white", order: 0 },
    { slug: "pink-noise", label: "Pink noise", description: "Softer low-frequency sound", mode: "pink", order: 1 },
    { slug: "rain-texture", label: "Rain texture", description: "Short reset before an evening routine", mode: "rain", order: 2 },
    { slug: "ocean-texture", label: "Ocean texture", description: "Use with slow breathing", mode: "ocean", order: 3 },
    { slug: "tone-432", label: "432 Hz tone", description: "A simple relaxation tone", mode: "calm432", order: 4 },
    { slug: "tone-528", label: "528 Hz tone", description: "For calm listening, not medical effect", mode: "soft528", order: 5 },
  ],
  ko: [
    { slug: "white-noise", label: "화이트 노이즈", description: "집중하거나 긴장을 풀 때 쓰기 좋은 균일한 소리", mode: "white", order: 0 },
    { slug: "pink-noise", label: "핑크 노이즈", description: "더 부드러운 저주파 중심의 소리", mode: "pink", order: 1 },
    { slug: "rain-texture", label: "빗소리", description: "저녁 루틴 전 짧은 리셋", mode: "rain", order: 2 },
    { slug: "ocean-texture", label: "바다 소리", description: "느린 호흡과 함께 듣기", mode: "ocean", order: 3 },
    { slug: "tone-432", label: "432 Hz 톤", description: "단순한 릴랙싱 톤", mode: "calm432", order: 4 },
    { slug: "tone-528", label: "528 Hz 톤", description: "차분한 감상을 위한 소리, 의료 효과는 아님", mode: "soft528", order: 5 },
  ],
  ja: [
    { slug: "white-noise", label: "ホワイトノイズ", description: "集中やクールダウンに使いやすい均一な音", mode: "white", order: 0 },
    { slug: "pink-noise", label: "ピンクノイズ", description: "低音がやわらかい音", mode: "pink", order: 1 },
    { slug: "rain-texture", label: "雨音", description: "夜のルーティン前の短いリセット", mode: "rain", order: 2 },
    { slug: "ocean-texture", label: "海の音", description: "ゆっくりした呼吸と一緒に", mode: "ocean", order: 3 },
    { slug: "tone-432", label: "432 Hz トーン", description: "シンプルなリラックストーン", mode: "calm432", order: 4 },
    { slug: "tone-528", label: "528 Hz トーン", description: "落ち着いて聴くための音。医療効果ではありません", mode: "soft528", order: 5 },
  ],
  fr: [
    { slug: "white-noise", label: "Bruit blanc", description: "Son stable pour se concentrer ou redescendre", mode: "white", order: 0 },
    { slug: "pink-noise", label: "Bruit rose", description: "Son plus doux, avec basses frequences", mode: "pink", order: 1 },
    { slug: "rain-texture", label: "Pluie douce", description: "Petit reset avant la routine du soir", mode: "rain", order: 2 },
    { slug: "ocean-texture", label: "Ocean", description: "A utiliser avec une respiration lente", mode: "ocean", order: 3 },
    { slug: "tone-432", label: "Tonalite 432 Hz", description: "Tonalite simple de relaxation", mode: "calm432", order: 4 },
    { slug: "tone-528", label: "Tonalite 528 Hz", description: "Ecoute calme, pas un effet medical", mode: "soft528", order: 5 },
  ],
};

function resolveLang(locale: string): Lang {
  if (locale === "ko" || locale === "ja" || locale === "fr") return locale;
  return "en";
}

function localizeDbSound(sound: {
  slug: string;
  labelEn: string;
  labelKo: string;
  descriptionEn: string;
  descriptionKo: string;
  synthesisMode: string | null;
  audioUrl: string | null;
  order: number;
}, lang: Lang): WellnessSound {
  const fallback = FALLBACK_SOUNDS[lang].find((item) => item.slug === sound.slug);
  const englishFallback = FALLBACK_SOUNDS.en.find((item) => item.slug === sound.slug);

  if (lang === "ko") {
    return {
      slug: sound.slug,
      label: sound.labelKo || fallback?.label || sound.labelEn,
      description: sound.descriptionKo || fallback?.description || sound.descriptionEn,
      mode: (sound.synthesisMode as SoundMode | null) ?? fallback?.mode,
      audioUrl: sound.audioUrl ?? undefined,
      order: sound.order,
    };
  }

  if (lang === "fr" || lang === "ja") {
    return {
      slug: sound.slug,
      label: fallback?.label || sound.labelEn,
      description: fallback?.description || sound.descriptionEn,
      mode: (sound.synthesisMode as SoundMode | null) ?? fallback?.mode,
      audioUrl: sound.audioUrl ?? undefined,
      order: sound.order,
    };
  }

  return {
    slug: sound.slug,
    label: sound.labelEn || englishFallback?.label || sound.slug,
    description: sound.descriptionEn || englishFallback?.description || "",
    mode: (sound.synthesisMode as SoundMode | null) ?? englishFallback?.mode,
    audioUrl: sound.audioUrl ?? undefined,
    order: sound.order,
  };
}

export default async function WellnessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = resolveLang(locale);
  const t = copy[lang];

  const dbSounds = await db.sound.findMany({ where: { active: true }, orderBy: { order: "asc" } }).catch(() => []);
  const sounds: WellnessSound[] =
    dbSounds.length > 0 ? dbSounds.map((sound) => localizeDbSound(sound, lang)) : FALLBACK_SOUNDS[lang];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 text-foreground">
      <section className="rounded-[2rem] border border-border bg-white/[0.025] p-6 shadow-[0_20px_70px_-50px_rgba(255,255,255,0.24)] backdrop-blur-xl sm:p-8">
        <h1 className="font-serif text-4xl">{t.title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t.subtitle}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <WellnessCard icon={Brain} title={t.science} text={t.scienceText} />
        <Card className="rounded-[1.5rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
          <Wind className="size-5 text-foreground" />
          <h2 className="font-serif text-xl">{t.breathing}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t.breathingText}</p>
          <BreathingGuide
            labels={{ inhale: t.inhale, hold: t.hold, exhale: t.exhale, start: t.start, pause: t.pause }}
          />
        </Card>
        <Card className="rounded-[1.5rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
          <Moon className="size-5 text-foreground" />
          <h2 className="font-serif text-xl">{t.sleep}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t.sleepText}</p>
          <SleepChecklist items={t.sleepItems} />
        </Card>
      </div>

      <section className="rounded-[2rem] border border-border bg-white/[0.025] p-5 text-foreground backdrop-blur-xl sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <CloudRain className="mt-1 size-5 shrink-0 text-foreground" />
          <div>
            <h2 className="font-serif text-2xl">{t.sounds}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.soundsText}</p>
            {dbSounds.length === 0 && <p className="mt-2 text-xs text-muted-foreground">{t.fallbackNote}</p>}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {sounds.map((sound) => (
            <WellnessPlayer
              key={sound.slug}
              mode={sound.mode}
              audioUrl={sound.audioUrl}
              label={sound.label}
              description={sound.description}
              errorText={t.audioError}
            />
          ))}
        </div>
      </section>

      <Card className="rounded-[2rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Waves className="mt-1 size-5 shrink-0 text-foreground" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl">{t.faceCare}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.faceCareText}</p>
          </div>
        </div>
        <Button asChild className="self-start">
          <Link href="/app/wellness/face-care">
            {t.openFaceCare}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <Card className="rounded-[2rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 size-5 shrink-0 text-foreground" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl">{t.guides}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.guidesText}</p>
          </div>
        </div>
        <Button asChild className="self-start">
          <Link href="/app/routines">
            {t.openGuides}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <Card className="rounded-[2rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Brain className="mt-1 size-5 shrink-0 text-foreground" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl">{t.encyclo}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.encycloText}</p>
          </div>
        </div>
        <Button asChild className="self-start">
          <Link href="/app/ingredients">
            {t.openEncyclo}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Card>

      <p className="flex items-start gap-2 rounded-2xl border border-border bg-white/[0.025] p-3 text-xs text-muted-foreground backdrop-blur-xl">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        {t.soundsText}
      </p>
    </div>
  );
}

function WellnessCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <Card className="rounded-[1.5rem] border-border bg-white/[0.025] text-foreground backdrop-blur-xl">
      <Icon className="size-5 text-foreground" />
      <h2 className="font-serif text-xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </Card>
  );
}
