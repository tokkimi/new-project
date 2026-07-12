export type SeedNews = {
  category: "innovation" | "launch" | "ingredient-trend" | "brand-news" | "award";
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
  imageUrl?: string;
  publishedAt: string;
};

// K-beauty-first editorial seed. Sources intentionally favor Korean business,
// beauty and industry outlets, plus official Korean company releases.
export const NEWS: SeedNews[] = [
  {
    category: "ingredient-trend",
    title: "Anti-stress skincare moves into barrier-first K-beauty routines",
    summary:
      "K-beauty brands are increasingly framing calming care around stress, redness, barrier repair and recovery routines, with cica, heartleaf, beta-glucan, ceramides and PDRN leading the conversation.",
    sourceName: "Haru K-beauty trend desk",
    publishedAt: "2026-07-12",
  },
  {
    category: "ingredient-trend",
    title: "Skin recovery routines replace over-exfoliation messaging",
    summary:
      "New routine language is shifting away from aggressive glow claims toward stress recovery, hydration layering, gentle actives and barrier support for reactive skin.",
    sourceName: "Haru K-beauty trend desk",
    publishedAt: "2026-07-12",
  },
  {
    category: "brand-news",
    title: "K-beauty gets its first official US national week",
    summary:
      "Korean beauty earned a place on the US National Day Calendar, marking another step in K-beauty's mainstream recognition in the American market.",
    sourceName: "The Korea Herald",
    sourceUrl: "https://www.koreaherald.com/article/10803699",
    publishedAt: "2026-07-09",
  },
  {
    category: "brand-news",
    title: "K-beauty brands face a new challenge as fake content spreads globally",
    summary:
      "As Korean beauty brands expand overseas, KED Global reports that brands are dealing with fake visuals and misleading content around popular products.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/beauty-cosmetics/newsView/ked202607100015",
    publishedAt: "2026-07-10",
  },
  {
    category: "innovation",
    title: "in-cosmetics Korea 2026 highlights dermal-science ingredients",
    summary:
      "CosinKorea's coverage of in-cosmetics Korea 2026 points to a stronger focus on dermal science, functional actives and ingredient innovation from Korean suppliers.",
    sourceName: "CosinKorea",
    sourceUrl: "https://www.cosinkorea.com/news/article.html?no=57806",
    publishedAt: "2026-07-06",
  },
  {
    category: "brand-news",
    title: "K-beauty exports retail concepts, not just products",
    summary:
      "Korean cosmetics are increasingly traveling with the store formats and discovery concepts that made them popular at home, according to KED Global.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/beauty-cosmetics/newsView/ked202606290017",
    publishedAt: "2026-06-29",
  },
  {
    category: "brand-news",
    title: "K-beauty remains a key draw for Seoul visitors",
    summary:
      "The Korea Herald reports that skincare, wellness and beauty services remain a major reason tourists seek out Korean beauty experiences in Seoul.",
    sourceName: "The Korea Herald",
    sourceUrl: "https://www.koreaherald.com/article/10789620",
    publishedAt: "2026-06-26",
  },
  {
    category: "brand-news",
    title: "The second K-beauty boom is powered by indie brands and manufacturing",
    summary:
      "A Korea Herald feature explains how indie labels, fast product development and Korea's manufacturing ecosystem are driving a second global K-beauty wave.",
    sourceName: "The Korea Herald",
    sourceUrl: "https://www.koreaherald.com/article/10773583",
    publishedAt: "2026-06-20",
  },
  {
    category: "brand-news",
    title: "K-beauty products move into everyday Japanese drugstores",
    summary:
      "Aju News reports that brands such as Medicube, Anua and numbuzin are increasingly visible in Japanese drugstores and convenience channels.",
    sourceName: "Aju News",
    sourceUrl: "https://www.ajunews.com/view/20260615143304708",
    publishedAt: "2026-06-15",
  },
  {
    category: "brand-news",
    title: "Olive Young takes its K-beauty festival format to Los Angeles",
    summary:
      "Olive Young announced a Los Angeles edition of its K-beauty festival concept, bringing dozens of Korean beauty and lifestyle brands to US shoppers.",
    sourceName: "PR Newswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/olive-young-brings-signature-k-beauty-festival-to-the-us-with-olive-young-festa-la-2026-302816371.html",
    publishedAt: "2026-07-01",
  },
  {
    category: "innovation",
    title: "Seoul reopens a K-beauty tourist pop-up with skin diagnosis tools",
    summary:
      "The Asia Business Daily covered Seoul's KBF Beauty House pop-up, built around personal color, skin checks and customized K-beauty recommendations for tourists.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026070214540190624",
    publishedAt: "2026-07-02",
  },
  {
    category: "award",
    title: "KCC Silicon wins at in-cosmetics Korea 2026",
    summary:
      "KCC Silicon's SeraSense RBS 12 won silver in the Best Functional Ingredients category at the in-cosmetics Korea Innovation Zone.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026070309195049279",
    publishedAt: "2026-07-03",
  },
  {
    category: "award",
    title: "Labio wins the first K-Innovative Ingredient Award",
    summary:
      "CosinKorea reports that Labio's BIO-Placenta ingredient won the new K-Innovative Ingredient Award at in-cosmetics Korea 2026.",
    sourceName: "CosinKorea",
    sourceUrl: "https://www.cosinkorea.com/news/article.html?no=57789",
    publishedAt: "2026-07-01",
  },
  {
    category: "launch",
    title: "APR launches Medicube Booster Pro X2 outside Korea",
    summary:
      "After its Korean release, APR began expanding Medicube's next-generation beauty device to the US and UK through TikTok Shop, Amazon and other channels.",
    sourceName: "Seoul Economic Daily",
    sourceUrl: "https://en.sedaily.com/news/2026/06/11/apr-launches-next-generation-beauty-device-booster-pro-x2",
    publishedAt: "2026-06-11",
  },
  {
    category: "innovation",
    title: "APR's Booster Pro X2 adds a guided mode for at-home devices",
    summary:
      "The Asia Business Daily reports that the new Medicube device adds a mode designed to guide users through protocols based on usage needs.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026032315063955549",
    publishedAt: "2026-03-23",
  },
  {
    category: "brand-news",
    title: "The Founders explores a Dr. Jart+ acquisition",
    summary:
      "The owner of Anua is reportedly evaluating Dr. Jart+ as Estée Lauder considers divesting the Korean dermocosmetic brand.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/mergers-acquisitions/newsView/ked202606230006",
    publishedAt: "2026-06-23",
  },
  {
    category: "brand-news",
    title: "Goodai Global chosen as preferred buyer for Skinfood",
    summary:
      "BeautyMatter reported that Goodai Global and The Hahm Partners were selected as preferred buyers for Korean beauty brand Skinfood.",
    sourceName: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/goodai-global-acquires-k-beauty-brand-skinfood",
    publishedAt: "2025-12-01",
  },
  {
    category: "brand-news",
    title: "Goodai Global buys Hansung USA to strengthen US K-beauty distribution",
    summary:
      "KED Global reports that Goodai Global acquired Hansung USA, giving it direct access to distribution relationships with major US retailers.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/mergers-acquisitions/newsView/ked202602020005",
    publishedAt: "2026-02-02",
  },
  {
    category: "brand-news",
    title: "Korean cosmetics exports hit a first-quarter record",
    summary:
      "Aju News reports that Korean cosmetics exports reached $3.1 billion in the first quarter of 2026, up 19% year over year.",
    sourceName: "Aju News",
    sourceUrl: "https://m.jp.ajunews.com/view/20260420162005975",
    publishedAt: "2026-04-20",
  },
  {
    category: "launch",
    title: "Beauty of Joseon debuts a moisturizer with fermented retinol",
    summary:
      "Beauty of Joseon expanded its ginseng-led skincare lineup with a firming moisturizer built around encapsulated fermented retinol and ceramides.",
    sourceName: "Beauty Packaging",
    sourceUrl: "https://www.beautypackaging.com/breaking-news/beauty-of-joseon-debuts-moisturizer-with-fermented-retinol/",
    publishedAt: "2026-01-23",
  },
  {
    category: "launch",
    title: "Anua spotlights a PDRN collagen glow mist serum",
    summary:
      "Anua presented a mistable PDRN collagen formula designed for hydration before, during or after makeup.",
    sourceName: "PR Newswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/anua-spotlights-its-newest-pdrn-product-innovation-with-launch-event-in-new-york-city-302682103.html",
    publishedAt: "2026-02-08",
  },
  {
    category: "ingredient-trend",
    title: "Spicules become the K-beauty 'microneedling in a bottle' trend",
    summary:
      "Spicule formulas are gaining visibility as Korean brands use the ingredient family for texture, resurfacing and active-delivery positioning.",
    sourceName: "CNN Underscored",
    sourceUrl: "https://us.cnn.com/cnn-underscored/beauty/spicule-skin-care",
    publishedAt: "2026-07-04",
  },
  {
    category: "ingredient-trend",
    title: "PDRN keeps moving from clinics into everyday K-beauty",
    summary:
      "PDRN, often discussed as salmon DNA skincare, remains one of the strongest Korean ingredient stories across serums, creams and beauty-device routines.",
    sourceName: "K-beauty industry trend trackers",
    publishedAt: "2026-06-01",
  },
  {
    category: "ingredient-trend",
    title: "Heartleaf remains central to barrier and redness care",
    summary:
      "Houttuynia cordata continues to anchor calming K-beauty formulas for reactive, oily and acne-prone skin.",
    sourceName: "K-beauty ingredient trackers",
    publishedAt: "2026-05-20",
  },
  {
    category: "ingredient-trend",
    title: "Beta-glucan rises as a barrier-focused hydration active",
    summary:
      "Beta-glucan is becoming more visible in barrier and dehydration routines thanks to its soothing, water-binding profile.",
    sourceName: "Vogue Adria",
    sourceUrl: "https://vogueadria.com/beta-glucan-skincare-routine-dehydrated-skin/",
    publishedAt: "2026-05-21",
  },
  {
    category: "award",
    title: "TIRTIR cushion recognized by Allure readers",
    summary:
      "TIRTIR's Mask Fit Red Cushion was highlighted among Allure Readers' Choice Award winners, reinforcing global demand for Korean base makeup.",
    sourceName: "StarNews Korea",
    sourceUrl: "https://www.starnewskorea.com/en/star/2026/05/21/2026052106485149065",
    publishedAt: "2026-05-21",
  },
];
