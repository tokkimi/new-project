export type CategoryDef = {
  slug: string;
  /** null = top-level category. Children inherit the parent's routine order. */
  parentSlug: string | null;
  nameEn: string;
  nameKo: string;
  /** Lower = earlier step in an AM/PM routine. */
  order: number;
};

// The 9 original top-level slugs keep their original order values untouched
// (165 seeded products already use them) — everything else is additive.
export const CATEGORY_TREE: CategoryDef[] = [
  // Cleanser
  { slug: "cleanser", parentSlug: null, nameEn: "Cleanser", nameKo: "클렌저", order: 0 },
  { slug: "cleansing-oil", parentSlug: "cleanser", nameEn: "Cleansing Oil", nameKo: "클렌징 오일", order: 0 },
  { slug: "cleansing-balm", parentSlug: "cleanser", nameEn: "Cleansing Balm", nameKo: "클렌징 밤", order: 0 },
  { slug: "cleansing-water", parentSlug: "cleanser", nameEn: "Cleansing Water", nameKo: "클렌징 워터", order: 0 },
  { slug: "cleansing-foam", parentSlug: "cleanser", nameEn: "Cleansing Foam", nameKo: "클렌징 폼", order: 0 },
  { slug: "cleansing-gel", parentSlug: "cleanser", nameEn: "Cleansing Gel", nameKo: "클렌징 젤", order: 0 },
  { slug: "cleansing-cream", parentSlug: "cleanser", nameEn: "Cleansing Cream", nameKo: "클렌징 크림", order: 0 },
  { slug: "cleansing-powder", parentSlug: "cleanser", nameEn: "Cleansing Powder", nameKo: "클렌징 파우더", order: 0 },
  { slug: "enzyme-cleanser", parentSlug: "cleanser", nameEn: "Enzyme Cleanser", nameKo: "효소 클렌저", order: 0 },
  { slug: "clay-cleanser", parentSlug: "cleanser", nameEn: "Clay Cleanser", nameKo: "클레이 클렌저", order: 0 },
  { slug: "makeup-remover", parentSlug: "cleanser", nameEn: "Makeup Remover", nameKo: "메이크업 리무버", order: 0 },

  // Toner
  { slug: "toner", parentSlug: null, nameEn: "Toner", nameKo: "토너", order: 10 },
  { slug: "toner-hydrating", parentSlug: "toner", nameEn: "Hydrating Toner", nameKo: "수분 토너", order: 10 },
  { slug: "toner-barrier", parentSlug: "toner", nameEn: "Barrier Toner", nameKo: "배리어 토너", order: 10 },
  { slug: "toner-brightening", parentSlug: "toner", nameEn: "Brightening Toner", nameKo: "브라이트닝 토너", order: 10 },
  { slug: "toner-soothing", parentSlug: "toner", nameEn: "Soothing Toner", nameKo: "진정 토너", order: 10 },
  { slug: "toner-acne", parentSlug: "toner", nameEn: "Acne Toner", nameKo: "트러블 토너", order: 10 },
  { slug: "toner-exfoliating", parentSlug: "toner", nameEn: "Exfoliating Toner", nameKo: "각질 토너", order: 10 },
  { slug: "toner-pore", parentSlug: "toner", nameEn: "Pore Toner", nameKo: "모공 토너", order: 10 },

  // Pad
  { slug: "pad", parentSlug: null, nameEn: "Pad", nameKo: "패드", order: 11 },
  { slug: "toner-pad", parentSlug: "pad", nameEn: "Toner Pad", nameKo: "토너 패드", order: 11 },
  { slug: "cica-pad", parentSlug: "pad", nameEn: "Cica Pad", nameKo: "시카 패드", order: 11 },
  { slug: "vitamin-pad", parentSlug: "pad", nameEn: "Vitamin Pad", nameKo: "비타민 패드", order: 11 },
  { slug: "exfoliating-pad", parentSlug: "pad", nameEn: "Exfoliating Pad", nameKo: "각질 패드", order: 11 },
  { slug: "cooling-pad", parentSlug: "pad", nameEn: "Cooling Pad", nameKo: "쿨링 패드", order: 11 },
  { slug: "moisturizing-pad", parentSlug: "pad", nameEn: "Moisturizing Pad", nameKo: "수분 패드", order: 11 },

  // Peeling (exfoliation, right after toner/pads, before essence)
  { slug: "peeling", parentSlug: null, nameEn: "Peeling", nameKo: "필링", order: 13 },
  { slug: "peeling-aha", parentSlug: "peeling", nameEn: "AHA Peeling", nameKo: "AHA 필링", order: 13 },
  { slug: "peeling-bha", parentSlug: "peeling", nameEn: "BHA Peeling", nameKo: "BHA 필링", order: 13 },
  { slug: "peeling-pha", parentSlug: "peeling", nameEn: "PHA Peeling", nameKo: "PHA 필링", order: 13 },
  { slug: "peeling-lha", parentSlug: "peeling", nameEn: "LHA Peeling", nameKo: "LHA 필링", order: 13 },
  { slug: "peeling-enzyme", parentSlug: "peeling", nameEn: "Enzyme Peeling", nameKo: "효소 필링", order: 13 },

  // Essence / Serum / Ampoule
  { slug: "essence", parentSlug: null, nameEn: "Essence", nameKo: "에센스", order: 15 },
  { slug: "ampoule", parentSlug: null, nameEn: "Ampoule", nameKo: "앰플", order: 17 },
  { slug: "serum", parentSlug: null, nameEn: "Serum", nameKo: "세럼", order: 20 },

  // Lotion / Emulsion
  { slug: "lotion", parentSlug: null, nameEn: "Lotion", nameKo: "로션", order: 30 },
  { slug: "emulsion", parentSlug: null, nameEn: "Emulsion", nameKo: "에멀전", order: 32 },

  // Mask
  { slug: "mask", parentSlug: null, nameEn: "Mask", nameKo: "마스크", order: 45 },
  { slug: "sleeping-mask", parentSlug: "mask", nameEn: "Sleeping Mask", nameKo: "슬리핑 마스크", order: 45 },
  { slug: "sheet-mask", parentSlug: "mask", nameEn: "Sheet Mask", nameKo: "시트 마스크", order: 45 },
  { slug: "wash-off-mask", parentSlug: "mask", nameEn: "Wash-off Mask", nameKo: "워시오프 마스크", order: 45 },
  { slug: "modeling-mask", parentSlug: "mask", nameEn: "Modeling Mask", nameKo: "모델링 마스크", order: 45 },
  { slug: "clay-mask", parentSlug: "mask", nameEn: "Clay Mask", nameKo: "클레이 마스크", order: 45 },

  // Spot treatment
  { slug: "spot", parentSlug: null, nameEn: "Spot treatment", nameKo: "부분 케어", order: 50 },

  // Eye
  { slug: "eye", parentSlug: null, nameEn: "Eye cream", nameKo: "아이크림", order: 60 },
  { slug: "eye-cream", parentSlug: "eye", nameEn: "Eye Cream", nameKo: "아이크림", order: 60 },
  { slug: "eye-patch", parentSlug: "eye", nameEn: "Eye Patch", nameKo: "아이패치", order: 60 },

  // Moisturizer / Cream
  { slug: "moisturizer", parentSlug: null, nameEn: "Moisturizer", nameKo: "크림", order: 70 },
  { slug: "gel-cream", parentSlug: "moisturizer", nameEn: "Gel Cream", nameKo: "젤 크림", order: 70 },
  { slug: "barrier-cream", parentSlug: "moisturizer", nameEn: "Barrier Cream", nameKo: "배리어 크림", order: 70 },
  { slug: "rich-cream", parentSlug: "moisturizer", nameEn: "Rich Cream", nameKo: "리치 크림", order: 70 },
  { slug: "sleeping-cream", parentSlug: "moisturizer", nameEn: "Sleeping Cream", nameKo: "슬리핑 크림", order: 70 },
  { slug: "acne-cream", parentSlug: "moisturizer", nameEn: "Acne Cream", nameKo: "트러블 크림", order: 70 },
  { slug: "cica-cream", parentSlug: "moisturizer", nameEn: "Cica Cream", nameKo: "시카 크림", order: 70 },

  // Lip care
  { slug: "lip-care", parentSlug: null, nameEn: "Lip Care", nameKo: "립 케어", order: 72 },

  // Oil
  { slug: "oil", parentSlug: null, nameEn: "Facial Oil", nameKo: "오일", order: 80 },

  // Sunscreen
  { slug: "sunscreen", parentSlug: null, nameEn: "SPF", nameKo: "선크림", order: 90 },
  { slug: "sunscreen-chemical", parentSlug: "sunscreen", nameEn: "Chemical Sunscreen", nameKo: "유기자차 선크림", order: 90 },
  { slug: "sunscreen-mineral", parentSlug: "sunscreen", nameEn: "Mineral Sunscreen", nameKo: "무기자차 선크림", order: 90 },
  { slug: "sunscreen-hybrid", parentSlug: "sunscreen", nameEn: "Hybrid Sunscreen", nameKo: "혼합 선크림", order: 90 },
  { slug: "sun-stick", parentSlug: "sunscreen", nameEn: "Sun Stick", nameKo: "선스틱", order: 90 },
  { slug: "sun-cushion", parentSlug: "sunscreen", nameEn: "Sun Cushion", nameKo: "선쿠션", order: 90 },
  { slug: "sun-serum", parentSlug: "sunscreen", nameEn: "Sun Serum", nameKo: "선세럼", order: 90 },
  { slug: "sun-gel", parentSlug: "sunscreen", nameEn: "Sun Gel", nameKo: "선젤", order: 90 },

  // Mist
  { slug: "mist", parentSlug: null, nameEn: "Mist", nameKo: "미스트", order: 95 },

  // Body / scalp / hand / foot / neck / hair
  { slug: "body", parentSlug: null, nameEn: "Body", nameKo: "바디", order: 100 },
  { slug: "scalp", parentSlug: null, nameEn: "Scalp", nameKo: "두피", order: 101 },
  { slug: "hand", parentSlug: null, nameEn: "Hand", nameKo: "핸드", order: 102 },
  { slug: "foot", parentSlug: null, nameEn: "Foot", nameKo: "풋", order: 103 },
  { slug: "neck", parentSlug: null, nameEn: "Neck", nameKo: "넥", order: 104 },
  { slug: "hair", parentSlug: null, nameEn: "Hair", nameKo: "헤어", order: 105 },
];
