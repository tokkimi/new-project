import type { DiagramVariant } from "@/components/face-diagram";

export type FaceCareLang = "en" | "ko" | "fr" | "ja";

type LocalizedText = Record<FaceCareLang, string>;

export interface FaceCareStep {
  diagram: DiagramVariant;
  seconds: number;
  title: LocalizedText;
  instruction: LocalizedText;
}

export interface FaceCareRoutine {
  slug: string;
  name: LocalizedText;
  goal: LocalizedText;
  duration: LocalizedText;
  difficulty: LocalizedText;
  zones: LocalizedText;
  frequency: LocalizedText;
  precautions: LocalizedText;
  evidence: LocalizedText;
  steps: FaceCareStep[];
}

const duration = (minutes: number): LocalizedText => ({
  en: `${minutes} min`,
  ko: `${minutes}분`,
  fr: `${minutes} min`,
  ja: `${minutes}分`,
});

export const FACE_CARE_ROUTINES: FaceCareRoutine[] = [
  {
    slug: "lymphatic-drainage",
    name: {
      en: "Lymphatic drainage",
      ko: "림프 드레나주",
      fr: "Drainage lymphatique",
      ja: "リンパドレナージュ",
    },
    goal: {
      en: "Reduce the feeling of puffiness with feather-light pressure.",
      ko: "아주 약한 압으로 붓는 느낌을 완화합니다.",
      fr: "Aider a reduire la sensation de gonflement avec une pression tres legere.",
      ja: "ごく軽い圧でむくみ感をやわらげます。",
    },
    duration: duration(5),
    difficulty: { en: "Easy", ko: "쉬움", fr: "Facile", ja: "簡単" },
    zones: { en: "Neck, jaw, cheeks", ko: "목, 턱선, 볼", fr: "Cou, machoire, joues", ja: "首、フェイスライン、頬" },
    frequency: { en: "2-4 times per week", ko: "주 2-4회", fr: "2 a 4 fois par semaine", ja: "週2-4回" },
    precautions: {
      en: "Use very light pressure. Avoid painful, inflamed, bruised or recently treated areas.",
      ko: "매우 가볍게 진행하고 통증, 염증, 멍, 최근 시술 부위는 피하세요.",
      fr: "Gardez une pression tres douce. Evitez les zones douloureuses, irritees, bleues ou recemment traitees.",
      ja: "とても軽い圧で行い、痛み、炎症、あざ、施術直後の部位は避けてください。",
    },
    evidence: {
      en: "Comfort-focused self-care",
      ko: "편안함 중심 셀프 케어",
      fr: "Auto-soin de confort",
      ja: "心地よさを重視したセルフケア",
    },
    steps: [
      {
        diagram: "neck-sweep-up",
        seconds: 30,
        title: { en: "Neck sweep", ko: "목 쓸어 올리기", fr: "Remontee du cou", ja: "首の引き上げ" },
        instruction: {
          en: "Place flat fingers on the side of the neck and glide upward toward the jaw without dragging the skin.",
          ko: "손가락을 목 옆에 평평하게 두고 피부가 당기지 않게 턱 방향으로 부드럽게 올리세요.",
          fr: "Posez les doigts a plat sur le cote du cou et remontez vers la machoire sans tirer la peau.",
          ja: "指を首の横に平らに置き、肌を引っ張らずに顎へ向かってすべらせます。",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 30,
        title: { en: "Jawline glide", ko: "턱선 글라이드", fr: "Glisse de la machoire", ja: "フェイスライン流し" },
        instruction: {
          en: "From the chin, glide two fingers along the jawline toward each ear. Repeat slowly on both sides.",
          ko: "턱 중앙에서 시작해 두 손가락을 턱선 따라 귀 쪽으로 천천히 움직이세요.",
          fr: "Depuis le menton, faites glisser deux doigts le long de la machoire vers chaque oreille.",
          ja: "顎先から耳へ向かって、フェイスラインに沿って二本指をゆっくり流します。",
        },
      },
      {
        diagram: "cheek-sweep-up",
        seconds: 30,
        title: { en: "Cheek sweep", ko: "볼 쓸어 올리기", fr: "Remontee des joues", ja: "頬の引き上げ" },
        instruction: {
          en: "Sweep from the side of the nose outward and slightly upward toward the top of the ear.",
          ko: "코 옆에서 바깥쪽, 그리고 귀 위쪽을 향해 볼을 부드럽게 올리세요.",
          fr: "Depuis le cote du nez, glissez vers l'exterieur puis legerement vers le haut de l'oreille.",
          ja: "鼻の横から外側へ、少し上向きに耳の上へ向かって流します。",
        },
      },
      {
        diagram: "general-relax-hold",
        seconds: 20,
        title: { en: "Settle", ko: "진정 마무리", fr: "Apaiser", ja: "落ち着かせる" },
        instruction: {
          en: "Rest both palms softly on the cheeks for a few breaths, then release slowly.",
          ko: "양손바닥을 볼에 가볍게 올리고 몇 번 호흡한 뒤 천천히 떼세요.",
          fr: "Posez les paumes sur les joues pendant quelques respirations, puis relachez lentement.",
          ja: "両手のひらを頬に軽く置き、数呼吸してからゆっくり離します。",
        },
      },
    ],
  },
  {
    slug: "gua-sha-basics",
    name: { en: "Gua Sha basics", ko: "괄사 기본", fr: "Bases du gua sha", ja: "グアシャ基本" },
    goal: {
      en: "Slow massage with enough slip so the tool glides without pulling.",
      ko: "도구가 피부를 당기지 않도록 충분히 미끄러운 상태에서 천천히 마사지합니다.",
      fr: "Massage lent avec assez de glisse pour que l'outil ne tire jamais la peau.",
      ja: "肌を引っ張らないよう、十分なすべりを作ってゆっくり行います。",
    },
    duration: duration(6),
    difficulty: { en: "Easy", ko: "쉬움", fr: "Facile", ja: "簡単" },
    zones: { en: "Jaw, cheeks, brow", ko: "턱선, 볼, 눈썹 주변", fr: "Machoire, joues, sourcils", ja: "顎、頬、眉まわり" },
    frequency: { en: "1-3 times per week", ko: "주 1-3회", fr: "1 a 3 fois par semaine", ja: "週1-3回" },
    precautions: {
      en: "Never scrape dry skin. Pause if acne is inflamed, skin is broken, or pressure creates pain.",
      ko: "마른 피부에는 사용하지 마세요. 염증성 여드름, 상처, 통증이 있으면 중단하세요.",
      fr: "Ne passez jamais l'outil sur peau seche. Stoppez en cas d'acne enflammee, plaie ou douleur.",
      ja: "乾いた肌には使わないでください。炎症、傷、痛みがある場合は中止します。",
    },
    evidence: { en: "Relaxation practice", ko: "이완 보조", fr: "Pratique de relaxation", ja: "リラックスケア" },
    steps: [
      {
        diagram: "general-relax-hold",
        seconds: 15,
        title: { en: "Prepare slip", ko: "윤활 준비", fr: "Preparer la glisse", ja: "すべりを作る" },
        instruction: {
          en: "Apply facial oil or balm first. The tool should glide smoothly, not catch.",
          ko: "페이스 오일이나 밤을 먼저 바르세요. 도구가 걸리지 않고 부드럽게 움직여야 합니다.",
          fr: "Appliquez une huile ou un baume. L'outil doit glisser sans accrocher.",
          ja: "オイルやバームを先に使い、道具がひっかからずなめらかに動く状態にします。",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 45,
        title: { en: "Jaw strokes", ko: "턱선 스트로크", fr: "Passages sur la machoire", ja: "顎のストローク" },
        instruction: {
          en: "Hold the tool almost flat and glide from chin to ear along the jaw, 5-6 times per side.",
          ko: "도구를 거의 평평하게 대고 턱에서 귀까지 턱선을 따라 한쪽당 5-6회 움직이세요.",
          fr: "Tenez l'outil presque a plat et glissez du menton vers l'oreille, 5 a 6 fois par cote.",
          ja: "道具をほぼ寝かせて、顎から耳へ左右それぞれ5-6回流します。",
        },
      },
      {
        diagram: "cheek-sweep-up",
        seconds: 45,
        title: { en: "Cheek strokes", ko: "볼 스트로크", fr: "Passages sur les joues", ja: "頬のストローク" },
        instruction: {
          en: "Glide from the nose outward and slightly upward across the cheek, 5-6 times per side.",
          ko: "코 옆에서 볼을 지나 바깥쪽 위 방향으로 한쪽당 5-6회 움직이세요.",
          fr: "Glissez du nez vers l'exterieur et legerement vers le haut, 5 a 6 fois par cote.",
          ja: "鼻の横から頬を通り、外側の少し上へ左右5-6回流します。",
        },
      },
      {
        diagram: "brow-glide",
        seconds: 30,
        title: { en: "Brow line", ko: "눈썹 라인", fr: "Ligne des sourcils", ja: "眉ライン" },
        instruction: {
          en: "From inner brow to temple, glide gently along the bone, 3-4 times per side.",
          ko: "눈썹 안쪽에서 관자놀이까지 뼈를 따라 한쪽당 3-4회 부드럽게 움직이세요.",
          fr: "De l'interieur du sourcil vers la tempe, glissez doucement 3 a 4 fois par cote.",
          ja: "眉頭からこめかみへ、骨に沿って左右3-4回やさしく流します。",
        },
      },
    ],
  },
  {
    slug: "kobido-lift",
    name: { en: "Kobido-inspired lift", ko: "고바이도식 리프트", fr: "Lift inspire du Kobido", ja: "小顔ケア風リフト" },
    goal: {
      en: "Wake up the face with fast, light tapping and upward strokes.",
      ko: "빠르고 가벼운 터치와 위쪽 스트로크로 얼굴을 깨워줍니다.",
      fr: "Reveiller le visage avec des tapotements rapides et des gestes ascendants.",
      ja: "軽いタッピングと上向きの動きで顔をすっきり見せます。",
    },
    duration: duration(6),
    difficulty: { en: "Medium", ko: "보통", fr: "Intermediaire", ja: "中級" },
    zones: { en: "Cheeks, temples, forehead", ko: "볼, 관자놀이, 이마", fr: "Joues, tempes, front", ja: "頬、こめかみ、額" },
    frequency: { en: "1-2 times per week", ko: "주 1-2회", fr: "1 a 2 fois par semaine", ja: "週1-2回" },
    precautions: {
      en: "Keep every movement light. Skip this routine when skin is irritated or very sensitive.",
      ko: "모든 동작은 가볍게 하세요. 피부가 예민하거나 자극받은 날은 쉬세요.",
      fr: "Gardez tous les gestes legers. Evitez si la peau est irritee ou tres sensible.",
      ja: "すべて軽く行います。刺激や強い敏感さがある日は避けてください。",
    },
    evidence: { en: "Massage-inspired mobility", ko: "마사지 기반 움직임", fr: "Mobilite inspiree du massage", ja: "マッサージ発想のケア" },
    steps: [
      {
        diagram: "cheek-lift-diagonal",
        seconds: 35,
        title: { en: "Diagonal lift", ko: "대각선 리프트", fr: "Lift diagonal", ja: "斜めリフト" },
        instruction: {
          en: "Use fingertips to move from the mouth corner toward the upper cheek, always upward.",
          ko: "손끝으로 입가에서 볼 위쪽으로, 항상 위 방향으로 움직이세요.",
          fr: "Avec le bout des doigts, partez du coin de la bouche vers le haut de la joue.",
          ja: "指先で口角から頬上部へ、常に上向きに動かします。",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple reset", ko: "관자놀이 이완", fr: "Relacher les tempes", ja: "こめかみを整える" },
        instruction: {
          en: "Make small circles at the temples to release tension after the lifting strokes.",
          ko: "리프트 동작 후 관자놀이에 작은 원을 그려 긴장을 풀어주세요.",
          fr: "Tracez de petits cercles aux tempes pour relacher apres les gestes de lift.",
          ja: "リフト後にこめかみで小さな円を描き、緊張をゆるめます。",
        },
      },
      {
        diagram: "forehead-glide",
        seconds: 30,
        title: { en: "Forehead smooth", ko: "이마 정리", fr: "Lisser le front", ja: "額をなめらかに" },
        instruction: {
          en: "Glide from the center of the forehead outward with flat fingers.",
          ko: "손가락을 평평하게 두고 이마 중앙에서 바깥쪽으로 쓸어주세요.",
          fr: "Glissez du centre du front vers l'exterieur avec les doigts a plat.",
          ja: "指を平らにして、額の中央から外側へ流します。",
        },
      },
    ],
  },
  {
    slug: "jaw-release",
    name: { en: "Jaw release", ko: "턱 이완", fr: "Relachement de la machoire", ja: "顎のリリース" },
    goal: {
      en: "Ease clenching tension without forcing the joint.",
      ko: "관절을 무리하지 않고 이를 악무는 긴장을 완화합니다.",
      fr: "Aider a relacher les tensions de serrage sans forcer l'articulation.",
      ja: "関節に無理をかけず、食いしばりの緊張をやわらげます。",
    },
    duration: duration(4),
    difficulty: { en: "Easy", ko: "쉬움", fr: "Facile", ja: "簡単" },
    zones: { en: "Masseter, temples", ko: "저작근, 관자놀이", fr: "Masseter, tempes", ja: "咬筋、こめかみ" },
    frequency: { en: "Daily if comfortable", ko: "편안하면 매일", fr: "Chaque jour si confortable", ja: "心地よければ毎日" },
    precautions: {
      en: "Stop if pain increases. Dental pain, painful clicking or jaw locking needs professional advice.",
      ko: "통증이 커지면 중단하세요. 치아 통증, 아픈 소리, 턱 잠김은 전문가 상담이 필요합니다.",
      fr: "Arretez si la douleur augmente. Douleur dentaire, claquement douloureux ou blocage demandent un avis professionnel.",
      ja: "痛みが増す場合は中止してください。歯の痛み、痛いクリック音、顎のロックは専門家へ相談してください。",
    },
    evidence: { en: "Tension support", ko: "긴장 완화 보조", fr: "Soutien des tensions", ja: "緊張ケア" },
    steps: [
      {
        diagram: "jaw-press-hold",
        seconds: 30,
        title: { en: "Masseter hold", ko: "저작근 지그시 누르기", fr: "Pression masseter", ja: "咬筋ホールド" },
        instruction: {
          en: "Find the jaw muscle by gently clenching once, then relax and hold light steady pressure.",
          ko: "가볍게 한번 물어 근육 위치를 찾은 뒤 힘을 빼고 약한 압을 유지하세요.",
          fr: "Serrez legerement une fois pour trouver le muscle, relachez, puis maintenez une pression douce.",
          ja: "一度軽く噛んで筋肉の位置を確認し、力を抜いて軽い圧を保ちます。",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple circles", ko: "관자놀이 원 그리기", fr: "Cercles aux tempes", ja: "こめかみの円" },
        instruction: {
          en: "Make slow small circles at the temples to soften tension linked to the jaw.",
          ko: "턱 긴장과 연결된 관자놀이 부위에 작고 느린 원을 그리세요.",
          fr: "Tracez de petits cercles lents sur les tempes pour adoucir la tension liee a la machoire.",
          ja: "こめかみに小さな円をゆっくり描き、顎まわりの緊張をゆるめます。",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 30,
        title: { en: "Jaw glide", ko: "턱선 글라이드", fr: "Glisse finale", ja: "顎を流す" },
        instruction: {
          en: "Glide from chin to ear and let the muscle soften rather than pushing harder.",
          ko: "턱에서 귀 쪽으로 움직이며 세게 누르기보다 근육이 풀리게 하세요.",
          fr: "Glissez du menton vers l'oreille en laissant le muscle se relacher, sans appuyer plus fort.",
          ja: "強く押さず、顎先から耳へ流して筋肉がゆるむのを待ちます。",
        },
      },
    ],
  },
  {
    slug: "scalp-massage",
    name: { en: "Scalp massage", ko: "두피 마사지", fr: "Massage du cuir chevelu", ja: "頭皮マッサージ" },
    goal: {
      en: "Release scalp and forehead tension that can affect facial comfort.",
      ko: "얼굴의 편안함에 영향을 줄 수 있는 두피와 이마 긴장을 풀어줍니다.",
      fr: "Relacher les tensions du cuir chevelu et du front qui peuvent peser sur le visage.",
      ja: "顔のこわばりにつながる頭皮と額の緊張をゆるめます。",
    },
    duration: duration(5),
    difficulty: { en: "Easy", ko: "쉬움", fr: "Facile", ja: "簡単" },
    zones: { en: "Scalp, hairline, forehead", ko: "두피, 헤어라인, 이마", fr: "Cuir chevelu, ligne des cheveux, front", ja: "頭皮、生え際、額" },
    frequency: { en: "Daily or as needed", ko: "매일 또는 필요 시", fr: "Chaque jour ou selon besoin", ja: "毎日または必要に応じて" },
    precautions: {
      en: "Avoid scratching with nails. Use fingertips and reduce pressure if the scalp is sensitive.",
      ko: "손톱으로 긁지 마세요. 손끝을 사용하고 두피가 예민하면 압을 줄이세요.",
      fr: "Ne grattez pas avec les ongles. Utilisez la pulpe des doigts et reduisez la pression si le cuir chevelu est sensible.",
      ja: "爪でこすらず指の腹を使います。頭皮が敏感な場合は圧を弱めてください。",
    },
    evidence: { en: "Relaxation support", ko: "이완 보조", fr: "Soutien de relaxation", ja: "リラックスサポート" },
    steps: [
      {
        diagram: "scalp-circular",
        seconds: 45,
        title: { en: "Scalp circles", ko: "두피 원 마사지", fr: "Cercles du cuir chevelu", ja: "頭皮の円運動" },
        instruction: {
          en: "Make small circles with fingertips, moving the scalp rather than rubbing the hair.",
          ko: "머리카락을 문지르기보다 두피가 움직이도록 손끝으로 작은 원을 그리세요.",
          fr: "Faites de petits cercles avec les doigts en mobilisant le cuir chevelu, pas les cheveux.",
          ja: "髪をこするのではなく、頭皮を動かすように指先で小さな円を描きます。",
        },
      },
      {
        diagram: "forehead-glide",
        seconds: 30,
        title: { en: "Hairline glide", ko: "헤어라인 쓸기", fr: "Glisse de la ligne des cheveux", ja: "生え際流し" },
        instruction: {
          en: "Glide from the center of the hairline toward the temples with light pressure.",
          ko: "헤어라인 중앙에서 관자놀이 방향으로 가볍게 쓸어주세요.",
          fr: "Glissez du centre de la ligne des cheveux vers les tempes avec une pression legere.",
          ja: "生え際の中央からこめかみへ軽い圧で流します。",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple finish", ko: "관자놀이 마무리", fr: "Finir aux tempes", ja: "こめかみ仕上げ" },
        instruction: {
          en: "Finish with slow circles at both temples and breathe out fully.",
          ko: "양쪽 관자놀이에 느린 원을 그리며 길게 숨을 내쉬세요.",
          fr: "Terminez par de lents cercles sur les deux tempes en expirant profondement.",
          ja: "両こめかみにゆっくり円を描き、深く息を吐いて終えます。",
        },
      },
    ],
  },
  {
    slug: "soft-face-yoga",
    name: { en: "Soft face yoga", ko: "소프트 페이스 요가", fr: "Face yoga doux", ja: "やさしいフェイスヨガ" },
    goal: {
      en: "Gentle mobility without pulling the skin.",
      ko: "피부를 당기지 않는 부드러운 움직임입니다.",
      fr: "Mobilite douce sans tirer la peau.",
      ja: "肌を引っ張らない、やさしい表情筋ケアです。",
    },
    duration: duration(7),
    difficulty: { en: "Easy", ko: "쉬움", fr: "Facile", ja: "簡単" },
    zones: { en: "Eyes, cheeks, lips", ko: "눈가, 볼, 입가", fr: "Yeux, joues, levres", ja: "目元、頬、口元" },
    frequency: { en: "3 times per week", ko: "주 3회", fr: "3 fois par semaine", ja: "週3回" },
    precautions: {
      en: "Do not pull hard or repeat any movement that creates discomfort, headache or jaw pain.",
      ko: "세게 당기지 마세요. 불편감, 두통, 턱 통증을 만드는 동작은 반복하지 마세요.",
      fr: "Ne tirez pas fort. Ne repetez pas un mouvement qui cree inconfort, mal de tete ou douleur de machoire.",
      ja: "強く引っ張らず、不快感、頭痛、顎の痛みが出る動きは繰り返さないでください。",
    },
    evidence: { en: "Low-risk mobility practice", ko: "저위험 움직임 연습", fr: "Pratique de mobilite douce", ja: "低負担の表情ケア" },
    steps: [
      {
        diagram: "eye-corner-press",
        seconds: 20,
        title: { en: "Eye corner hold", ko: "눈가 지그시 누르기", fr: "Maintien du coin des yeux", ja: "目元ホールド" },
        instruction: {
          en: "Rest fingertips at the outer eye corners. Squint softly for three seconds, then release.",
          ko: "손끝을 눈꼬리 바깥쪽에 가볍게 대고 3초간 부드럽게 찡그린 뒤 풀어주세요.",
          fr: "Posez les doigts au coin externe des yeux. Plissez doucement trois secondes, puis relachez.",
          ja: "目尻に指先を軽く置き、3秒だけやさしく細めてから力を抜きます。",
        },
      },
      {
        diagram: "cheek-lift-diagonal",
        seconds: 30,
        title: { en: "Cheek lift", ko: "볼 리프트", fr: "Levee des joues", ja: "頬リフト" },
        instruction: {
          en: "Smile softly, place fingers on upper cheeks and support the movement without dragging.",
          ko: "부드럽게 미소 짓고 손끝을 볼 위쪽에 대어 끌지 않게 움직임을 받쳐주세요.",
          fr: "Souriez doucement, placez les doigts sur le haut des joues et accompagnez sans tirer.",
          ja: "軽く微笑み、頬上部に指を添えて肌を引っ張らずに支えます。",
        },
      },
      {
        diagram: "lip-corner-lift",
        seconds: 20,
        title: { en: "Lip corner lift", ko: "입꼬리 리프트", fr: "Coins des levres", ja: "口角リフト" },
        instruction: {
          en: "Make a soft O shape and gently lift the lip corners with fingertips. Hold, then release.",
          ko: "입을 부드러운 O 모양으로 만들고 손끝으로 입꼬리를 살짝 올렸다가 풀어주세요.",
          fr: "Formez un O doux et soulevez legerement les coins des levres avec les doigts, puis relachez.",
          ja: "口を軽いOの形にし、指先で口角を少し上げてから力を抜きます。",
        },
      },
    ],
  },
];

export function getFaceCareRoutine(slug: string) {
  return FACE_CARE_ROUTINES.find((routine) => routine.slug === slug);
}
