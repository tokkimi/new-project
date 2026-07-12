import type { DiagramVariant } from "@/components/face-diagram";

export interface FaceCareStep {
  diagram: DiagramVariant;
  seconds: number;
  title: { en: string; ko: string };
  instruction: { en: string; ko: string };
}

export interface FaceCareRoutine {
  slug: string;
  name: { en: string; ko: string };
  goal: { en: string; ko: string };
  duration: { en: string; ko: string };
  difficulty: { en: string; ko: string };
  zones: { en: string; ko: string };
  frequency: { en: string; ko: string };
  precautions: { en: string; ko: string };
  evidence: { en: string; ko: string };
  steps: FaceCareStep[];
}

export const FACE_CARE_ROUTINES: FaceCareRoutine[] = [
  {
    slug: "lymphatic-drainage",
    name: { en: "Lymphatic drainage", ko: "림프 드레나주" },
    goal: { en: "Reduce the feeling of puffiness", ko: "붓는 느낌 완화" },
    duration: { en: "5 min", ko: "5분" },
    difficulty: { en: "Easy", ko: "쉬움" },
    zones: { en: "Cheeks, jaw, neck", ko: "볼, 턱, 목" },
    frequency: { en: "2-4x/week", ko: "주 2-4회" },
    precautions: {
      en: "Use very light pressure; avoid inflamed or painful areas.",
      ko: "아주 약한 압력으로 진행하고 염증이나 통증 부위는 피하세요.",
    },
    evidence: { en: "Supportive self-care", ko: "셀프 케어 보조" },
    steps: [
      {
        diagram: "neck-sweep-up",
        seconds: 30,
        title: { en: "Neck sweep", ko: "목 쓸어 올리기" },
        instruction: {
          en: "With flat fingers, sweep gently up the sides of your neck toward the jaw. Very light pressure, like smoothing a wrinkle out of fabric.",
          ko: "손가락을 평평하게 펴고 목 옆선을 따라 턱 쪽으로 가볍게 쓸어 올리세요. 천을 매만지듯 아주 가벼운 압력으로 진행하세요.",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 30,
        title: { en: "Jawline glide", ko: "턱선 밀어내기" },
        instruction: {
          en: "Starting at the chin, glide two fingers along the jawline out toward the ear on each side.",
          ko: "턱 중앙에서 시작해 손가락 두 개로 턱선을 따라 양쪽 귀 방향으로 밀어내듯 이동하세요.",
        },
      },
      {
        diagram: "cheek-sweep-up",
        seconds: 30,
        title: { en: "Cheek sweep", ko: "볼 쓸어 올리기" },
        instruction: {
          en: "Sweep from the side of the nose up and out toward the top of the ear, following the natural angle of the cheekbone.",
          ko: "코 옆에서 시작해 광대뼈 라인을 따라 귀 위쪽으로 쓸어 올리세요.",
        },
      },
      {
        diagram: "general-relax-hold",
        seconds: 20,
        title: { en: "Finish and settle", ko: "마무리 홀드" },
        instruction: {
          en: "Rest your palms flat against your cheeks for a few seconds, then release slowly.",
          ko: "손바닥을 볼에 가볍게 대고 몇 초간 유지한 뒤 천천히 떼세요.",
        },
      },
    ],
  },
  {
    slug: "gua-sha-basics",
    name: { en: "Gua Sha basics", ko: "괄사 기본" },
    goal: { en: "Slow facial massage with slip", ko: "오일감 있는 상태에서 느린 얼굴 마사지" },
    duration: { en: "6 min", ko: "6분" },
    difficulty: { en: "Easy", ko: "쉬움" },
    zones: { en: "Jaw, cheeks, brow", ko: "턱, 볼, 눈썹 주변" },
    frequency: { en: "1-3x/week", ko: "주 1-3회" },
    precautions: {
      en: "Never scrape dry skin; pause with active acne, irritation or broken skin.",
      ko: "마른 피부에 문지르지 말고, 활성 트러블이나 자극, 상처가 있으면 쉬세요.",
    },
    evidence: { en: "Limited but commonly used relaxation practice", ko: "제한적 근거의 릴랙싱 관행" },
    steps: [
      {
        diagram: "general-relax-hold",
        seconds: 15,
        title: { en: "Prep with oil", ko: "오일 준비" },
        instruction: {
          en: "Apply a facial oil or balm first. The tool should always glide, never drag or catch on dry skin.",
          ko: "먼저 페이셜 오일이나 밤을 발라주세요. 도구는 항상 미끄러지듯 움직여야 하며 마른 피부 위에서 끌리면 안 됩니다.",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 45,
        title: { en: "Jawline strokes", ko: "턱선 스트로크" },
        instruction: {
          en: "Hold the tool at a low angle, almost flat against the skin, and glide from chin to ear along the jaw, 5-6 times per side.",
          ko: "도구를 피부에 거의 눕혀 낮은 각도로 잡고, 턱 중앙에서 귀 방향으로 좌우 각 5-6회 밀어주세요.",
        },
      },
      {
        diagram: "cheek-sweep-up",
        seconds: 45,
        title: { en: "Cheek strokes", ko: "볼 스트로크" },
        instruction: {
          en: "Glide from the nose outward and slightly upward across the cheek toward the ear, 5-6 times per side.",
          ko: "코 옆에서 시작해 볼을 가로질러 살짝 위쪽으로, 귀 방향으로 좌우 각 5-6회 밀어주세요.",
        },
      },
      {
        diagram: "brow-glide",
        seconds: 30,
        title: { en: "Brow line", ko: "눈썹 라인" },
        instruction: {
          en: "Glide gently from the inner brow outward along the bone toward the temple, 3-4 times per side.",
          ko: "눈썹 안쪽에서 뼈를 따라 관자놀이 방향으로 좌우 각 3-4회 부드럽게 밀어주세요.",
        },
      },
    ],
  },
  {
    slug: "kobido-lift",
    name: { en: "Kobido-inspired lift", ko: "고바도식 이완" },
    goal: { en: "Relax facial tension", ko: "얼굴 긴장 완화" },
    duration: { en: "8 min", ko: "8분" },
    difficulty: { en: "Medium", ko: "중간" },
    zones: { en: "Cheeks, temples, forehead", ko: "볼, 관자놀이, 이마" },
    frequency: { en: "1-2x/week", ko: "주 1-2회" },
    precautions: {
      en: "Keep movements gentle; no promise of permanent structural change.",
      ko: "동작은 부드럽게 하고 얼굴 구조가 영구적으로 바뀐다고 말하지 않습니다.",
    },
    evidence: { en: "Wellness and tension support", ko: "웰니스와 긴장 완화 보조" },
    steps: [
      {
        diagram: "cheek-lift-diagonal",
        seconds: 45,
        title: { en: "Diagonal cheek lift", ko: "대각선 볼 리프트" },
        instruction: {
          en: "With knuckles or flat fingers, press-glide diagonally from the corner of the mouth up toward the top of the ear.",
          ko: "손가락 마디나 평평한 손가락으로 입가에서 귀 위쪽까지 대각선으로 눌러 밀어 올리세요.",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple circles", ko: "관자놀이 원 그리기" },
        instruction: {
          en: "Small, slow circular motions at the temples with two fingers, gradually easing pressure.",
          ko: "두 손가락으로 관자놀이에 작고 느린 원을 그리며 점차 압력을 줄이세요.",
        },
      },
      {
        diagram: "forehead-glide",
        seconds: 30,
        title: { en: "Forehead smoothing", ko: "이마 스무딩" },
        instruction: {
          en: "From the center of the forehead, glide both hands outward toward the hairline on each side.",
          ko: "이마 중앙에서 양손을 헤어라인 쪽으로 바깥으로 밀어주세요.",
        },
      },
      {
        diagram: "general-relax-hold",
        seconds: 15,
        title: { en: "Settle", ko: "마무리" },
        instruction: {
          en: "Hold your palms softly over your face for a few breaths to finish.",
          ko: "손바닥을 얼굴에 부드럽게 대고 몇 번 숨을 쉬며 마무리하세요.",
        },
      },
    ],
  },
  {
    slug: "jaw-release",
    name: { en: "Jaw release", ko: "턱 이완" },
    goal: { en: "Ease clenching tension", ko: "이 악물기 긴장 완화" },
    duration: { en: "4 min", ko: "4분" },
    difficulty: { en: "Easy", ko: "쉬움" },
    zones: { en: "Masseter, temples", ko: "저작근, 관자놀이" },
    frequency: { en: "Daily if comfortable", ko: "편안하면 매일" },
    precautions: {
      en: "Stop if pain increases; dental or jaw pain needs a clinician.",
      ko: "통증이 심해지면 중단하세요. 치아나 턱 통증은 전문가 상담이 필요합니다.",
    },
    evidence: { en: "Tension support", ko: "긴장 완화 보조" },
    steps: [
      {
        diagram: "jaw-press-hold",
        seconds: 30,
        title: { en: "Masseter hold", ko: "저작근 눌러 유지" },
        instruction: {
          en: "Place two fingers on the jaw muscle (clench gently to find it), apply light steady pressure and hold.",
          ko: "손가락 두 개를 턱 근육(살짝 힘을 줘서 위치를 찾으세요)에 대고 가볍고 일정한 압력으로 유지하세요.",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple release", ko: "관자놀이 이완" },
        instruction: {
          en: "Slow circular motions at the temples to ease tension that radiates from the jaw.",
          ko: "턱에서 퍼지는 긴장을 풀어주기 위해 관자놀이에 느린 원을 그려주세요.",
        },
      },
      {
        diagram: "jaw-glide-out",
        seconds: 30,
        title: { en: "Jaw glide", ko: "턱 밀어내기" },
        instruction: {
          en: "Glide fingers from the chin along the jaw toward the ear, softening the muscle as you go.",
          ko: "턱에서 귀 방향으로 근육을 풀어주듯 손가락을 밀어주세요.",
        },
      },
    ],
  },
  {
    slug: "scalp-massage",
    name: { en: "Scalp massage", ko: "두피 마사지" },
    goal: { en: "Relax scalp and forehead tension", ko: "두피와 이마 긴장 완화" },
    duration: { en: "5 min", ko: "5분" },
    difficulty: { en: "Easy", ko: "쉬움" },
    zones: { en: "Scalp, temples, forehead", ko: "두피, 관자놀이, 이마" },
    frequency: { en: "Daily or as needed", ko: "매일 또는 필요할 때" },
    precautions: { en: "Avoid irritated scalp areas.", ko: "두피가 자극된 부위는 피하세요." },
    evidence: { en: "Relaxation support", ko: "휴식 보조" },
    steps: [
      {
        diagram: "scalp-circular",
        seconds: 45,
        title: { en: "Scalp circles", ko: "두피 원 그리기" },
        instruction: {
          en: "Use your fingertips (not nails) to make small circles across the whole scalp, moving from front to back.",
          ko: "손톱이 아닌 손끝으로 두피 전체에 작은 원을 그리며 앞에서 뒤로 이동하세요.",
        },
      },
      {
        diagram: "temple-circular",
        seconds: 30,
        title: { en: "Temple circles", ko: "관자놀이 원 그리기" },
        instruction: { en: "Continue the circular motion down into the temples.", ko: "관자놀이까지 원을 그리며 내려오세요." },
      },
      {
        diagram: "forehead-glide",
        seconds: 30,
        title: { en: "Forehead smoothing", ko: "이마 스무딩" },
        instruction: {
          en: "Finish by gliding from the center of the forehead outward toward the hairline.",
          ko: "이마 중앙에서 헤어라인 쪽으로 밀어주며 마무리하세요.",
        },
      },
    ],
  },
  {
    slug: "soft-face-yoga",
    name: { en: "Soft face yoga", ko: "부드러운 페이스 요가" },
    goal: { en: "Gentle mobility", ko: "가벼운 움직임" },
    duration: { en: "7 min", ko: "7분" },
    difficulty: { en: "Easy", ko: "쉬움" },
    zones: { en: "Eyes, cheeks, lips", ko: "눈가, 볼, 입 주변" },
    frequency: { en: "3x/week", ko: "주 3회" },
    precautions: {
      en: "Do not pull hard or repeat movements that create discomfort.",
      ko: "세게 당기지 말고 불편한 동작은 반복하지 마세요.",
    },
    evidence: { en: "Low-risk mobility practice", ko: "저위험 움직임 연습" },
    steps: [
      {
        diagram: "eye-corner-press",
        seconds: 20,
        title: { en: "Eye corner press", ko: "눈가 누르기" },
        instruction: {
          en: "Rest a fingertip gently at the outer corner of each eye, squint softly for 3 seconds, release. Repeat 3 times.",
          ko: "눈 바깥쪽 끝에 손끝을 가볍게 대고 3초간 부드럽게 힘을 준 뒤 풀어주세요. 3회 반복하세요.",
        },
      },
      {
        diagram: "cheek-lift-diagonal",
        seconds: 30,
        title: { en: "Cheek lift", ko: "볼 리프트" },
        instruction: {
          en: "Smile softly, place fingers on the upper cheeks, and gently press up and hold while resisting slightly with the smile.",
          ko: "부드럽게 미소 지으며 손가락을 볼 위쪽에 올리고, 살짝 저항하듯 위로 눌러 유지하세요.",
        },
      },
      {
        diagram: "lip-corner-lift",
        seconds: 20,
        title: { en: "Lip corner lift", ko: "입꼬리 올리기" },
        instruction: {
          en: "Gently lift the corners of the mouth with your fingertips while making a soft 'O' shape with your lips. Hold, then release.",
          ko: "손끝으로 입꼬리를 살짝 들어 올리며 입을 부드러운 'O' 모양으로 만드세요. 유지했다가 풀어주세요.",
        },
      },
    ],
  },
];

export function getFaceCareRoutine(slug: string) {
  return FACE_CARE_ROUTINES.find((routine) => routine.slug === slug);
}
