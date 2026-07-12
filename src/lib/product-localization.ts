import type { Product } from "@/generated/prisma/client";

type ProductCopyLike = Pick<
  Product,
  "brand" | "name" | "category" | "ingredientIds" | "skinTypes" | "concerns" | "description" | "fullIngredients" | "usageSteps"
>;

const KO_CATEGORY: Record<string, string> = {
  cleanser: "클렌저",
  toner: "토너",
  essence: "에센스",
  serum: "세럼",
  moisturizer: "보습제",
  sunscreen: "자외선 차단제",
  mask: "마스크",
  eye: "아이 케어 제품",
  oil: "오일",
  exfoliant: "각질 케어 제품",
  treatment: "트리트먼트",
};

const KO_CONCERN: Record<string, string> = {
  acne: "트러블",
  aging: "탄력과 노화 징후",
  hydration: "수분 부족",
  redness: "붉어짐",
  pigmentation: "색소침착과 잡티",
  pores: "모공",
  dullness: "칙칙함",
  barrier: "피부 장벽",
};

const KO_SKIN: Record<string, string> = {
  oily: "지성",
  dry: "건성",
  combination: "복합성",
  normal: "중성",
  sensitive: "민감성",
};

const KO_INGREDIENT: Record<string, string> = {
  retinol: "레티노이드",
  vitamin_c: "비타민 C",
  niacinamide: "나이아신아마이드",
  aha: "AHA",
  bha: "BHA",
  benzoyl_peroxide: "벤조일 퍼옥사이드",
  vitamin_e: "비타민 E",
  peptides: "펩타이드",
  hyaluronic_acid: "히알루론산",
  centella: "센텔라",
  spf: "SPF",
  ceramides: "세라마이드",
};

function isKorean(locale: string) {
  return locale.toLowerCase().startsWith("ko");
}

function joinKo(values: string[]) {
  if (values.length <= 1) return values[0] ?? "";
  return `${values.slice(0, -1).join(", ")} 및 ${values[values.length - 1]}`;
}

export function localizedProductDescription(product: ProductCopyLike, locale: string): string | null {
  if (!isKorean(locale)) return product.description;

  const category = KO_CATEGORY[product.category] ?? "스킨케어 제품";
  const skinTypes = product.skinTypes.map((skin) => KO_SKIN[skin]).filter(Boolean).slice(0, 3);
  const concerns = product.concerns.map((concern) => KO_CONCERN[concern]).filter(Boolean).slice(0, 3);
  const ingredients = product.ingredientIds.map((ingredient) => KO_INGREDIENT[ingredient]).filter(Boolean).slice(0, 3);

  const parts = [`${product.brand} ${product.name}은(는) ${category}입니다.`];
  if (ingredients.length) parts.push(`주요 체크 성분은 ${joinKo(ingredients)}입니다.`);
  if (skinTypes.length) parts.push(`${joinKo(skinTypes)} 피부에 맞춰 참고할 수 있어요.`);
  if (concerns.length) parts.push(`${joinKo(concerns)} 관리 루틴에서 확인해 볼 수 있습니다.`);
  parts.push("사용 전 전성분과 피부 반응을 확인하고, 새 제품은 천천히 루틴에 추가하세요.");

  return parts.join(" ");
}

export function localizedUsageSteps(product: ProductCopyLike, locale: string): string[] {
  if (!isKorean(locale)) return product.usageSteps;

  if (product.category === "sunscreen") {
    return ["아침 루틴의 마지막 단계에서 사용하세요.", "얼굴과 목에 충분한 양을 고르게 바르세요.", "야외 활동 중에는 약 2시간마다 덧바르세요."];
  }
  if (product.category === "cleanser") {
    return ["젖은 피부에 부드럽게 마사지하세요.", "미온수로 충분히 헹구세요.", "아침 또는 저녁, 피부 상태에 맞춰 사용하세요."];
  }
  if (product.category === "exfoliant" || product.ingredientIds.includes("retinol")) {
    return ["저녁 세안 후 사용하세요.", "처음에는 주 2-3회부터 시작해 피부 반응에 따라 조절하세요.", "다음 날 아침에는 자외선 차단제를 꼭 사용하세요."];
  }
  if (product.category === "toner" || product.category === "essence") {
    return ["세안 후 첫 단계에서 사용하세요.", "손이나 화장솜으로 부드럽게 흡수시키세요.", "이후 세럼이나 보습제를 바르세요."];
  }
  if (product.category === "serum") {
    return ["토너 또는 에센스 다음 단계에서 사용하세요.", "소량을 덜어 얼굴 전체에 눌러 흡수시키세요.", "보습제로 마무리하세요."];
  }
  if (product.category === "moisturizer") {
    return ["세럼이나 트리트먼트 다음 단계에서 사용하세요.", "얼굴과 목에 고르게 펴 바르세요.", "아침과 저녁 모두 사용할 수 있어요."];
  }

  return ["깨끗한 피부에 사용하세요.", "브랜드 권장 사용법과 피부 반응을 함께 확인하세요.", "아침에 사용한다면 마지막 단계에는 SPF를 바르세요."];
}

export function localizedFullIngredients(product: ProductCopyLike, locale: string): string | null {
  if (!product.fullIngredients) return null;
  if (!isKorean(locale)) return product.fullIngredients;

  if (/official product (?:feed|page|site) did not expose/i.test(product.fullIngredients)) {
    const ingredients = product.ingredientIds.map((ingredient) => KO_INGREDIENT[ingredient]).filter(Boolean).slice(0, 4);
    return ingredients.length
      ? `공식 제품 데이터에서 전체 INCI가 구조화되어 제공되지 않았습니다. 확인된 핵심 성분 계열: ${joinKo(ingredients)}. 민감성 피부이거나 알레르기가 있다면 제품 패키지의 전성분을 다시 확인하세요.`
      : "공식 제품 데이터에서 전체 INCI가 구조화되어 제공되지 않았습니다. 민감성 피부이거나 알레르기가 있다면 제품 패키지의 전성분을 다시 확인하세요.";
  }

  return product.fullIngredients;
}
