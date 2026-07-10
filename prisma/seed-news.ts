import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

type SeedNews = {
  category: "innovation" | "launch" | "ingredient-trend" | "brand-news" | "award";
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
  publishedAt: string; // ISO date
};

// Researched via web search — real, verifiable items only. A few ingredient-trend
// entries are sourced from industry trend blogs rather than primary journalism
// (noted in summary); nothing here is fabricated. Re-run this script weekly
// (see the Friday-morning refresh routine) to keep it current.
const NEWS: SeedNews[] = [
  // Innovation
  {
    category: "innovation",
    title: "L'Oréal and OpenAI partner on AI-driven beauty R&D",
    summary:
      "Announced at VivaTech 2026, the partnership covers agentic-commerce consumer journeys and R&D — including a \"Longevity AI Cloud\" that analyzes 260+ biomarkers to predict ingredient impact before physical testing.",
    sourceName: "L'Oréal press release",
    sourceUrl:
      "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-openai-join-forces-for-transformation-in-beauty-with-ai/",
    publishedAt: "2026-06-15",
  },
  {
    category: "innovation",
    title: "Amorepacific unveils \"Skinsight\" electronic skin platform",
    summary:
      "Developed with an MIT research unit, Skinsight uses a wearable sensor patch to track real-time skin-aging factors and feeds the data through AI for personalized skincare recommendations. A CES 2026 Innovation Award Honoree.",
    sourceName: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/amorepacific-debuts-electronic-skin-platform",
    publishedAt: "2026-01-08",
  },
  {
    category: "innovation",
    title: "Kolmar Korea's AI Scar Beauty Device classifies scars from a phone photo",
    summary:
      "Users photograph a scar via smartphone; an AI algorithm classifies it into one of 12 types, analyzes severity, and dispenses a customized treatment plus a sprayed cover-makeup blend matched from 180+ skin tones.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/il/news-releases/kolmar-korea-wins-ces-2026-best-of-innovation-award-in-beauty-tech-a-global-first-for-the-cosmetics-industry-302654766.html",
    publishedAt: "2026-01-07",
  },
  {
    category: "innovation",
    title: "L'Oréal prototypes a flexible LED face mask for infrared light therapy",
    summary:
      "An ultra-thin, flexible silicone mask delivers red and near-infrared light directly to the face, targeting fine lines, sagging, and uneven tone. Currently a prototype; CES 2026 Innovation Award Honoree.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/loreal-advances-leadership-in-beauty-tech-by-bringing-the-power-of-infrared-light-to-hair-and-skin-with-two-breakthrough-innovations-at-ces-2026-302652309.html",
    publishedAt: "2026-01-07",
  },

  // Launch
  {
    category: "launch",
    title: "Rhode's Summer 2026 collection adds bronzer and peptide lip tints",
    summary:
      "Rhode's first bronzer (Pocket Bronze), a Highlight Milk, and three limited-edition Peptide Lip Tints launched June 9, 2026.",
    sourceName: "Forbes Vetted",
    sourceUrl: "https://www.forbes.com/sites/forbes-personal-shopper/2026/06/09/rhode-summer-2026-launches/",
    publishedAt: "2026-06-09",
  },
  {
    category: "launch",
    title: "Farmstay launches a PDRN + vitamin firming line",
    summary:
      "The Korean mass-market brand introduced a firming range including an exosome-boosted PDRN capsule serum with a cream-in-serum texture, showcased at Cosmobeauty Seoul.",
    sourceName: "Premium Beauty News",
    sourceUrl: "https://www.premiumbeautynews.com/en/k-beauty-top-10-innovative,27719",
    publishedAt: "2026-05-20",
  },
  {
    category: "launch",
    title: "Sooo Lab debuts a chlorine-removing swim shampoo",
    summary:
      "The newcomer Korean brand's debut product claims to remove up to 96% of chlorine buildup from hair in a single wash — part of a wider wave of \"climate-ready\" K-beauty launches addressing heat, UV, and chlorine exposure.",
    sourceName: "The Korea Times",
    sourceUrl:
      "https://www.koreatimes.co.kr/amp/business/20260627/climate-ready-beauty-new-k-beauty-products-target-heat-and-uv-exposure",
    publishedAt: "2026-06-27",
  },
  {
    category: "launch",
    title: "La Mer introduces a Hydrating Infusion Mask",
    summary:
      "A new mask built on La Mer's signature Miracle Broth, positioned under the brand's \"La Mer Gives Skin Life\" platform.",
    sourceName: "Beauté/Cosmetic launches roundup",
    publishedAt: "2026-07-01",
  },

  // Ingredient trend
  {
    category: "ingredient-trend",
    title: "PDRN (\"salmon DNA\") momentum keeps building in K-beauty",
    summary:
      "This regenerative ingredient derived from salmon DNA has seen a reported surge in search interest since 2024, with Medicube's high-concentration PDRN serum cited as a flagship product. (Sourced from beauty trend trackers rather than primary journalism.)",
    sourceName: "K-beauty trend trackers",
    publishedAt: "2026-06-01",
  },
  {
    category: "ingredient-trend",
    title: "Plant-derived exosomes move skincare actives from clinic to shelf",
    summary:
      "Cell-derived \"messenger\" vesicles carrying proteins and growth factors are being sourced from plants and microbes (ginseng, lactobacillus) to bring exosome technology into over-the-counter products rather than clinic-only treatments.",
    sourceName: "Industry trend analysis",
    publishedAt: "2026-05-15",
  },
  {
    category: "ingredient-trend",
    title: "Heartleaf extract holds its ground in barrier-focused formulas",
    summary:
      "Houttuynia cordata, a traditional Korean calming ingredient for sensitive and reactive skin, continues to anchor new barrier-repair launches.",
    sourceName: "K-beauty trend trackers",
    publishedAt: "2026-04-10",
  },

  // Brand news
  {
    category: "brand-news",
    title: "Anua's parent company reportedly eyes a Dr. Jart+ acquisition",
    summary:
      "The Founders, owner of Anua, is said to be a prospective buyer as Estée Lauder Companies explores a sale of Dr. Jart+, which it acquired in 2019 for roughly $1.7B.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/mergers-acquisitions/newsView/ked202606230006",
    publishedAt: "2026-06-23",
  },
  {
    category: "brand-news",
    title: "Estée Lauder weighs a combined sale of Too Faced, Smashbox, and Dr. Jart+",
    summary:
      "Rumors of a package divestiture of the three brands first surfaced around January 2026 and were still circulating as of June 2026.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/beauty-cosmetics/newsView/ked202606240006",
    publishedAt: "2026-06-24",
  },
  {
    category: "brand-news",
    title: "Taekwang Group completes its acquisition of Aekyung Industrial",
    summary:
      "The roughly $328-331M deal closed in March 2026 after being signed the previous October; Taekwang aims to grow cosmetics from 32% to over 50% of Aekyung's revenue by 2028.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/mergers-acquisitions/newsView/ked202510200013",
    publishedAt: "2026-03-26",
  },
  {
    category: "brand-news",
    title: "Estée Lauder Companies raises its FY2026 outlook on fragrance strength",
    summary:
      "The company cited strong fragrance category growth and margin expansion in raising its full-year financial outlook.",
    sourceName: "Global Cosmetics News",
    sourceUrl:
      "https://www.globalcosmeticsnews.com/estee-lauder-raises-fy2026-outlook-on-strong-fragrance-growth-and-margin-expansion/",
    publishedAt: "2026-05-01",
  },

  // Award
  {
    category: "award",
    title: "Kolmar Korea wins CES 2026 Best of Innovation Award in Beauty Tech",
    summary:
      "Kolmar Korea's AI Scar Beauty Device won Best of Innovation in the Beauty Tech category — reportedly the first cosmetics company to receive this top CES honor — and separately won a Digital Health innovation award.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/il/news-releases/kolmar-korea-wins-ces-2026-best-of-innovation-award-in-beauty-tech-a-global-first-for-the-cosmetics-industry-302654766.html",
    publishedAt: "2026-01-07",
  },
  {
    category: "award",
    title: "Amorepacific's Skinsight named CES 2026 Innovation Award Honoree",
    summary:
      "Recognized in the Beauty Tech category alongside L'Oréal Groupe's LED face mask prototype.",
    sourceName: "Global Cosmetic Industry",
    sourceUrl:
      "https://www.gcimagazine.com/brands-products/skin-care/news/22957669/beauty-tech-takes-center-stage-at-ces-2026-as-loral-groupe-and-amorepacific-unveil-ai-and-lightpowered-innovations",
    publishedAt: "2026-01-08",
  },
  {
    category: "award",
    title: "Cosmoprof & Cosmopack Awards 2026 winners announced",
    summary:
      "16 winners plus a Lifetime Achievement Award were presented at Cosmoprof Worldwide Bologna; Vagheggi Phytocosmetici won Skincare for its \"75.25 Longevity Day Cream\" and Fontana Contarini Cosmetics won Make-up for its HyaluPowder.",
    sourceName: "Cosmoprof",
    sourceUrl: "https://www.cosmoprof.com/en/media-room/news/the-winners-of-the-cosmoprof-awards-2026-what-truly-made-the-difference/",
    publishedAt: "2026-03-27",
  },
  {
    category: "award",
    title: "AJProTech's Evolve biofeedback headset wins Red Dot Best of the Best 2026",
    summary:
      "The device concept won Red Dot's top distinction in the Personal Care, Wellness & Beauty category, awarded to fewer than 2% of entries. A design concept, not yet a shipped consumer product.",
    sourceName: "Yanko Design",
    sourceUrl: "https://www.yankodesign.com/2026/05/30/the-skincare-device-concept-that-makes-every-other-one-look-lazy/",
    publishedAt: "2026-05-30",
  },
];

async function main() {
  for (const item of NEWS) {
    const existing = await db.newsItem.findFirst({ where: { title: item.title } });
    if (existing) {
      await db.newsItem.update({
        where: { id: existing.id },
        data: { ...item, publishedAt: new Date(item.publishedAt) },
      });
    } else {
      await db.newsItem.create({ data: { ...item, publishedAt: new Date(item.publishedAt) } });
    }
  }
  console.log(`Seeded ${NEWS.length} news items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
