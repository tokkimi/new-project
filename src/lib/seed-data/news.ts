export type SeedNews = {
  category: "innovation" | "launch" | "ingredient-trend" | "brand-news" | "award";
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl?: string;
  /** Real article/press image URL. Left unset until one is verified — never fabricated. */
  imageUrl?: string;
  publishedAt: string; // ISO date
};

// Researched via web search — real, verifiable items only. A few ingredient-trend
// entries are sourced from industry trend blogs rather than primary journalism
// (noted in summary); nothing here is fabricated. Re-run this script weekly
// (see the Friday-morning refresh routine) to keep it current.
export const NEWS: SeedNews[] = [
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

  // --- Added in a later research pass (see below for the same real/verifiable sourcing standard) ---

  // Innovation
  {
    category: "innovation",
    title: "Amorepacific lance l'application « AMORE MALL » sur ChatGPT",
    summary:
      "Amorepacific devient la première entreprise de beauté coréenne à déployer une application sur ChatGPT, avec des recommandations de produits personnalisées et une comparaison des ingrédients directement dans la conversation.",
    sourceName: "Amorepacific (communiqué officiel)",
    sourceUrl: "https://www.apgroup.com/int/en/news/2026-03-13-1.html",
    publishedAt: "2026-03-13",
  },
  {
    category: "innovation",
    title: "Amorepacific intègre son diagnostic cutané par IA au miroir connecté de Samsung au CES 2026",
    summary:
      "Entraînée sur plus de 450 000 cas, la technologie d'analyse optique d'Amorepacific évalue pores, rougeurs, pigmentation et rides pour recommander des soins personnalisés via le « AI Beauty Mirror » de Samsung.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/apac/news-releases/amorepacific-showcases-innovative-technologies-at-ces-2026-302652331.html",
    publishedAt: "2026-01-05",
  },
  {
    category: "innovation",
    title: "SmartSKN lance K-OWN, une plateforme de cosmétique coréenne sur mesure pilotée par des robots et l'IA",
    summary:
      "La plateforme permet de composer sa propre formule de soin coréen, fabriquée à la demande par des mini-laboratoires robotisés à partir d'une analyse de peau réalisée par IA.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/smartskn-launches-k-own-the-worlds-first-ai-custom-korean-skincare-platform-powered-by-robots-302402049.html",
    publishedAt: "2025-03-14",
  },
  {
    category: "innovation",
    title: "APR lance en Corée le « Booster Pro X2 », un dispositif de soin piloté par IA",
    summary:
      "Successeur du Booster Pro de Medicube, l'appareil ajoute un mode « AI » qui recommande un protocole selon l'usage, portant à sept le nombre total de modes disponibles.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026032315063955549",
    publishedAt: "2026-03-23",
  },

  // Launch
  {
    category: "launch",
    title: "Beauty of Joseon lance une crème raffermissante au rétinol fermenté",
    summary:
      "La Revive Firming Moisturizer associe rétinol fermenté encapsulé et céramides au ginseng pour un effet raffermissant quotidien tout en restant douce pour les peaux sensibles.",
    sourceName: "Beauty Packaging",
    sourceUrl: "https://www.beautypackaging.com/breaking-news/beauty-of-joseon-debuts-moisturizer-with-fermented-retinol/",
    publishedAt: "2026-01-23",
  },
  {
    category: "launch",
    title: "Anua présente son sérum brumisable PDRN Collagen Glow lors d'un lancement à New York",
    summary:
      "Le nouveau spray de la gamme PDRN d'Anua utilise des micro-capsules bleues qui éclatent à l'application pour une hydratation instantanée, utilisable avant, pendant et après le maquillage.",
    sourceName: "PRNewswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/anua-spotlights-its-newest-pdrn-product-innovation-with-launch-event-in-new-york-city-302682103.html",
    publishedAt: "2026-02-08",
  },
  {
    category: "launch",
    title: "APR déploie le Booster Pro X2 de Medicube aux États-Unis et au Royaume-Uni",
    summary:
      "Après son lancement en Corée, l'appareil de soin nouvelle génération arrive sur TikTok Shop puis Amazon aux États-Unis avant le Royaume-Uni ; la gamme Booster Pro dépasse déjà six millions d'unités vendues dans le monde.",
    sourceName: "Seoul Economic Daily",
    sourceUrl: "https://en.sedaily.com/news/2026/06/11/apr-launches-next-generation-beauty-device-booster-pro-x2",
    publishedAt: "2026-06-11",
  },
  {
    category: "launch",
    title: "Kiss New York lance sa première ligne de soins coréens sur Amazon",
    summary:
      "La marque américaine dévoile une collection de 25 produits inspirés des formats et ingrédients K-beauty, pensée pour un public qui découvre tout juste ces routines.",
    sourceName: "Mass Market Retailers",
    sourceUrl: "https://massmarketretailers.com/kiss-new-york-launches-1st-korean-skincare-line/",
    publishedAt: "2026-06-27",
  },

  // Ingredient trend
  {
    category: "ingredient-trend",
    title: "Les spicules, présentées comme un « microneedling en flacon », s'imposent comme tendance K-beauty",
    summary:
      "Ces microstructures issues d'éponges d'eau douce créent des microcanaux temporaires dans l'épiderme pour stimuler le renouvellement cellulaire et améliorer la pénétration des actifs ; la Corée mène cette vague d'ingrédients.",
    sourceName: "CNN Underscored",
    sourceUrl: "https://us.cnn.com/cnn-underscored/beauty/spicule-skin-care",
    publishedAt: "2026-07-04",
  },
  {
    category: "ingredient-trend",
    title: "Le bêta-glucane s'impose comme l'actif barrière incontournable de 2026",
    summary:
      "Ce polysaccharide dérivé de l'avoine, des champignons ou des algues apaise, retient l'eau et renforce la barrière cutanée ; les recherches en ligne pour cet ingrédient ont bondi de 51 % en un an.",
    sourceName: "Vogue Adria",
    sourceUrl: "https://vogueadria.com/beta-glucan-skincare-routine-dehydrated-skin/",
    publishedAt: "2026-05-21",
  },
  {
    category: "ingredient-trend",
    title: "Le champignon des neiges (tremella), présenté comme un substitut végétal à l'acide hyaluronique, gagne du terrain",
    summary:
      "Capable de retenir jusqu'à 500 fois son poids en eau, cette tremelle séduit pour son profil végan et son effet repulpant, selon les dermatologues cités par Skincare.com.",
    sourceName: "Skincare.com (L'Oréal)",
    sourceUrl: "https://www.skincare.com/expert-advice/skin-care-advice/what-is-snow-mushroom-in-skincare",
    publishedAt: "2026-05-05",
  },
  {
    category: "ingredient-trend",
    title: "NMN et postbiotiques, deux ingrédients à surveiller parmi les tendances soin de 2026",
    summary:
      "Refinery29 identifie le NMN, précurseur du NAD+, et les postbiotiques issus de la fermentation comme des actifs montants pour soutenir le microbiome et la barrière cutanée.",
    sourceName: "Refinery29",
    sourceUrl: "https://www.refinery29.com/en-us/skincare-trends-2026",
    publishedAt: "2025-12-24",
  },

  // Brand news
  {
    category: "brand-news",
    title: "Goodai Global désigné acquéreur préférentiel de la marque coréenne Skinfood",
    summary:
      "Le consortium formé par Goodai Global et The Hahm Partners est choisi pour racheter Skinfood, marque historique de cosmétique coréenne, pour environ 150 milliards de wons (108 millions de dollars).",
    sourceName: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/goodai-global-acquires-k-beauty-brand-skinfood",
    publishedAt: "2025-12-01",
  },
  {
    category: "brand-news",
    title: "Goodai Global rachète le distributeur américain Hansung USA avant son introduction en Bourse",
    summary:
      "Surnommé le « L'Oréal coréen », Goodai Global sécurise le contrôle direct de réseaux de distribution K-beauty aux États-Unis, dont Ulta Beauty, Costco et Target, pour environ 100 milliards de wons.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/mergers-acquisitions/newsView/ked202602020005",
    publishedAt: "2026-02-02",
  },
  {
    category: "brand-news",
    title: "Goodai Global lève 600 millions de dollars auprès de fonds de capital-investissement coréens",
    summary:
      "IMM Private Equity et cinq autres fonds coréens investissent 800 milliards de wons dans cette maison de marques K-beauty, la valorisant à 3,1 milliards de dollars en vue d'une introduction en Bourse.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/private-equity/newsView/ked202507270002",
    publishedAt: "2025-07-27",
  },
  {
    category: "brand-news",
    title: "Bain Capital cède une partie de sa participation dans le fabricant d'appareils Classys",
    summary:
      "Le fonds américain vend 8,25 % du capital du fabricant coréen d'appareils esthétiques Classys pour environ 324 milliards de wons (226 millions de dollars) via un placement accéléré.",
    sourceName: "KED Global",
    sourceUrl: "https://www.kedglobal.com/private-equity/newsView/ked202602250008",
    publishedAt: "2026-02-25",
  },

  // Award
  {
    category: "award",
    title: "KCC Silicon remporte un prix du meilleur ingrédient à in-cosmetics Korea 2026",
    summary:
      "Le matériau siliconé SeraSense RBS 12 de KCC Silicon décroche l'argent dans la catégorie « Best Functional Ingredients » de l'Innovation Zone, lors du salon tenu au COEX de Séoul.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026070309195049279",
    publishedAt: "2026-07-03",
  },
  {
    category: "award",
    title: "Labio remporte le tout premier « K-Innovative Ingredient Award » à in-cosmetics Korea 2026",
    summary:
      "L'ingrédient BIO-Placenta de Labio, combinant facteurs de croissance et actifs sénolytiques (NMN, carnosine), reçoit ce nouveau prix récompensant le meilleur actif développé par un fabricant coréen.",
    sourceName: "CosinKorea",
    sourceUrl: "https://www.cosinkorea.com/news/article.html?no=57789",
    publishedAt: "2026-07-01",
  },
  {
    category: "award",
    title: "Le fond de teint cushion de TIRTIR élu « produit K-beauty préféré » aux Allure Readers' Choice Awards 2026",
    summary:
      "Le Mask Fit Red Cushion, dont l'ambassadeur mondial est V du groupe BTS, figure parmi les lauréats votés par les lectrices et lecteurs du magazine Allure.",
    sourceName: "StarNews Korea",
    sourceUrl: "https://www.starnewskorea.com/en/star/2026/05/21/2026052106485149065",
    publishedAt: "2026-05-21",
  },
  {
    category: "award",
    title: "Hwahae dévoile les lauréats de ses Beauty Awards 2026 (édition de mi-année)",
    summary:
      "Ces prix, décernés deux fois par an, récompensent les produits les mieux notés par les utilisateurs de la plateforme coréenne d'avis beauté Hwahae, forte de plus de 10 millions d'avis vérifiés.",
    sourceName: "The Monodist",
    sourceUrl: "https://themonodist.com/hwahae-beauty-awards-2026-mid-year/",
    publishedAt: "2026-05-21",
  },

  // Last-15-days pass (home carousel) — imageUrl intentionally left unset,
  // outbound image fetching was down when these were added; fill in once
  // network access is restored, never with a guessed URL.
  {
    category: "brand-news",
    title: "Olive Young lance son premier festival K-beauty aux États-Unis, à Los Angeles",
    summary:
      "OLIVE YOUNG FESTA LA 2026 réunira 55 marques coréennes de beauté et lifestyle du 14 au 16 août, sur environ 4 600 m² inspirés des quartiers de Séoul (Seongsu, Gangnam, Hongdae, Myeongdong).",
    sourceName: "PR Newswire",
    sourceUrl:
      "https://www.prnewswire.com/news-releases/olive-young-brings-signature-k-beauty-festival-to-the-us-with-olive-young-festa-la-2026-302816371.html",
    publishedAt: "2026-07-01",
  },
  {
    category: "launch",
    title: "LANEIGE et HEAL Wellness lancent une collaboration açaï-mangue au Canada",
    summary:
      "Pour accompagner le lancement de son Açaí Mango Lip Sleeping Mask, LANEIGE s'associe aux 44 bars à smoothies HEAL Wellness du Canada avec un bol édition limitée, du 11 juillet au 6 août.",
    sourceName: "The Globe and Mail",
    sourceUrl:
      "https://www.theglobeandmail.com/investing/markets/markets-news/Newsfile/3221803/heal-wellness-collaborates-with-global-skincare-brand-laneige-to-launch-limited-time-acai-mango-bowl-across-canada/",
    publishedAt: "2026-07-11",
  },
  {
    category: "innovation",
    title: "Séoul relance son pop-up K-beauty pour touristes avec diagnostic de peau par IA",
    summary:
      "La deuxième édition du pop-up « KBF Beauty House » de l'Office du tourisme coréen, ouverte jusqu'au 19 juillet, propose diagnostics de peau par IA, analyse de couleurs personnelle et recommandations skincare sur mesure.",
    sourceName: "The Asia Business Daily",
    sourceUrl: "https://www.asiae.co.kr/en/article/2026070214540190624",
    publishedAt: "2026-07-02",
  },
];
