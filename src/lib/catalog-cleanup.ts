type CatalogLike = {
  slug: string;
  name: string;
  brand: string;
  officialUrl?: string | null;
  description?: string | null;
};

const HOST_BRANDS: Record<string, string> = {
  "anua.us": "Anua",
  "anua.com": "Anua",
  "cosrx.com": "COSRX",
  "beautyofjoseon.com": "Beauty of Joseon",
  "skin1004.com": "SKIN1004",
  "medicube.us": "Medicube",
  "roundlab.com": "Round Lab",
  "purito.com": "PURITO SEOUL",
  "aprilskin.us": "APRILSKIN",
  "mixsoon.us": "mixsoon",
  "d-alba.us": "d'Alba",
};

const OFFICIAL_HOSTS_BY_BRAND: Record<string, string[]> = {
  "111skin": ["111skin.com"],
  "abib": ["en.abib.com", "abib.com"],
  "acure": ["acure.com"],
  "allies of skin": ["us.allies.shop", "allies.shop"],
  "alpha-h": ["us.alpha-h.com", "alpha-h.com"],
  "anua": ["anua.us", "anua.com"],
  "aprilskin": ["aprilskin.us"],
  "axis-y": ["axis-y.com", "www.axis-y.com"],
  "banila co": ["banilausa.com"],
  "banila co.": ["banilausa.com"],
  "beauty of joseon": ["beautyofjoseon.com", "ie.beautyofjoseon.com"],
  "biossance": ["biossance.com", "www.biossance.com"],
  "bubble": ["hellobubble.com"],
  "byoma": ["byoma.com"],
  "cerave": ["cerave.com", "www.cerave.com"],
  "cocokind": ["cocokind.com", "www.cocokind.com"],
  "colorescience": ["colorescience.com", "www.colorescience.com"],
  "coola": ["coola.com"],
  "cosrx": ["cosrx.com", "www.cosrx.com"],
  "dear, klairs": ["klairs.com"],
  "derma e": ["dermae.com"],
  "dermalogica": ["dermalogica.com", "www.dermalogica.com"],
  "dieux": ["dieuxskin.com", "www.dieuxskin.com"],
  "dr. jart+": ["drjart.com"],
  "eadem": ["eadem.co"],
  "eltamd": ["eltamd.com"],
  "emma lewisham": ["emmalewisham.com"],
  "etude": ["etudehouse.com", "www.etudehouse.com"],
  "experiment": ["experimentbeauty.com"],
  "farmacy": ["farmacybeauty.com", "www.farmacybeauty.com"],
  "fenty skin": ["fentybeauty.com"],
  "first aid beauty": ["firstaidbeauty.com", "www.firstaidbeauty.com"],
  "furtuna skin": ["furtunaskin.com", "www.furtunaskin.com"],
  "glossier": ["glossier.com", "www.glossier.com"],
  "glow recipe": ["glowrecipe.com", "www.glowrecipe.com"],
  "good molecules": ["goodmolecules.com", "www.goodmolecules.com"],
  "haruharu wonder": ["haruharuusa.com"],
  "herbivore": ["herbivorebotanicals.com", "www.herbivorebotanicals.com"],
  "hydrinity": ["hydrinity.com"],
  "image skincare": ["imageskincare.com"],
  "indie lee": ["indielee.com"],
  "innbeauty project": ["innbeautyproject.com", "www.innbeautyproject.com"],
  "innisfree": ["us.innisfree.com"],
  "jan marini": ["janmarini.com", "www.janmarini.com"],
  "kahi": ["kahi.co.kr"],
  "kate somerville": ["katesomerville.com", "www.katesomerville.com"],
  "kinship": ["lovekinship.com"],
  "kopari": ["koparibeauty.com"],
  "kravebeauty": ["kravebeauty.com"],
  "la roche-posay": ["laroche-posay.us", "www.laroche-posay.us"],
  "mad hippie": ["madhippie.com"],
  "manucurist": ["us.manucurist.com", "manucurist.com"],
  "mara": ["themarabeauty.com"],
  "mario badescu": ["mariobadescu.com", "www.mariobadescu.com"],
  "medicube": ["medicube.us"],
  "missha": ["misshaus.com"],
  "mixsoon": ["mixsoon.us"],
  "naturium": ["naturium.com"],
  "neogen": ["neogenlab.us"],
  "numbuzin": ["numbuzinus.com", "us.numbuzin.com"],
  "osea": ["oseamalibu.com"],
  "pacifica": ["pacificabeauty.com", "www.pacificabeauty.com"],
  "pai skincare": ["paiskincare.us", "www.paiskincare.us"],
  "pca skin": ["pcaskin.com", "www.pcaskin.com"],
  "peace out": ["peaceoutskincare.com"],
  "peach & lily": ["peachandlily.com", "www.peachandlily.com"],
  "prequel": ["prequelskin.com"],
  "purito seoul": ["purito.com"],
  "pyunkang yul": ["pyunkangyul.us"],
  "ranavat": ["ranavat.com", "www.ranavat.com"],
  "ren clean skincare": ["usa.renskincare.com", "renskincare.com"],
  "revision skincare": ["revisionskincare.com"],
  "rhode": ["rhodeskin.com", "www.rhodeskin.com"],
  "round lab": ["roundlab.com"],
  "saie": ["saiehello.com"],
  "senté": ["sentelabs.com"],
  "sk-ii": ["sk-ii.com", "www.sk-ii.com"],
  "skin1004": ["skin1004.com", "www.skin1004.com"],
  "some by mi": ["somebymi.com", "somebymi.us"],
  "stratia": ["stratiaskin.com", "www.stratiaskin.com"],
  "summer fridays": ["summerfridays.com"],
  "sulwhasoo": ["us.sulwhasoo.com", "sulwhasoo.com"],
  "supergoop!": ["supergoop.com"],
  "tatcha": ["tatcha.com", "www.tatcha.com"],
  "the inkey list": ["theinkeylist.com", "www.theinkeylist.com"],
  "the ordinary": ["theordinary.com"],
  "then i met you": ["thenimetyou.com"],
  "three ships": ["threeshipsbeauty.com", "www.threeshipsbeauty.com"],
  "tocobo": ["tocobo.us"],
  "topicals": ["mytopicals.com"],
  "tower 28": ["tower28beauty.com", "www.tower28beauty.com"],
  "tula": ["tula.com", "www.tula.com"],
  "typology": ["us.typology.com", "typology.com"],
  "versed": ["versedskin.com"],
  "wishful": ["wishfulskin.com"],
  "youth to the people": ["youthtothepeople.com", "www.youthtothepeople.com"],
};

const SLUG_BRANDS: Record<string, string> = {
  "dr-althea": "Dr. Althea",
  "dr-ceuracle": "Dr. Ceuracle",
  "vt-cosmetics": "VT Cosmetics",
  "beauty-of-joseon": "Beauty of Joseon",
  "round-lab": "Round Lab",
  "skin1004": "SKIN1004",
  "somebymi": "Some By Mi",
  "some-by-mi": "Some By Mi",
  "cos-de-baha": "Cos De BAHA",
  "cos-da-baha": "Cos De BAHA",
  "la-roche-posay": "La Roche-Posay",
  "i-m-from": "I'm From",
  "im-from": "I'm From",
  "rom-nd": "rom&nd",
  "purito-seoul": "PURITO SEOUL",
  coreelle: "Coreelle",
};

const BAD_BRANDS = new Set(["gwp", "free gift ghost", "free", "clearance", "shopify_me"]);
const GENERATED_SUFFIX = /\s*(?:routine edit|travel size|refill pack|duo set|glow edition|barrier edit|sensitive edit|hydration edit)$/i;

const SET_OR_BUNDLE_PATTERN =
  /\b(?:\d+\s*[- ]?\s*step|full|complete|daily|starter|trial|travel|mini|sample|value|gift|holiday|limited|special|exclusive|moida|routine|skin\s*care|skincare|brightening|hydration|barrier|sensitive|acne|glow)?\s*(?:routine\s*)?(?:set|kit|bundle|box|collection|duo|trio)\b/i;

const MULTI_PRODUCT_PATTERN =
  /\b(?:cleanser|toner|essence|serum|ampoule|cream|moisturizer|sunscreen|sun\s*cream|mask|pad|oil|balm|shampoo|treatment)\b\s*(?:\+|&|and)\s*\b(?:cleanser|toner|essence|serum|ampoule|cream|moisturizer|sunscreen|sun\s*cream|mask|pad|oil|balm|shampoo|treatment)\b/i;

const NON_FACE_CARE_PATTERN =
  /\b(?:nail|nails|cuticle|polish|lacquer|manicure|pedicure|hair|scalp|shampoo|conditioner|mascara|lipstick|eyeliner|brow|fragrance|candle|apparel)\b/i;

const MULTI_UNIT_PATTERN =
  /\b\d+\s*(?:ea|set|sets|sheet|sheets|patch|patches|pc|pcs|piece|pieces|pack|packs|count|ct)\b|\b\d+(?:ea|set|sets|pcs|ct)\b/i;

function brandFromUrl(officialUrl?: string | null): string | null {
  if (!officialUrl) return null;
  try {
    const host = new URL(officialUrl).hostname.replace(/^www\./, "");
    return HOST_BRANDS[host] ?? null;
  } catch {
    return null;
  }
}

function normalizeBrandName(brand: string): string {
  return brand
    .trim()
    .replace(/\s+official$/i, "")
    .replace(/\s+us$/i, "")
    .replace(/^cosrx$/i, "COSRX")
    .toLowerCase();
}

export function isOfficialBrandUrl(brand: string, officialUrl?: string | null): boolean {
  if (!officialUrl) return false;
  try {
    const host = new URL(officialUrl).hostname.replace(/^www\./, "").toLowerCase();
    const allowedHosts = OFFICIAL_HOSTS_BY_BRAND[normalizeBrandName(brand)] ?? [];
    return allowedHosts.some((allowedHost) => {
      const cleanAllowed = allowedHost.replace(/^www\./, "").toLowerCase();
      return host === cleanAllowed || host.endsWith(`.${cleanAllowed}`);
    });
  } catch {
    return false;
  }
}

export function cleanOfficialUrl(brand: string, officialUrl?: string | null): string | null {
  return isOfficialBrandUrl(brand, officialUrl) ? officialUrl ?? null : null;
}

function brandFromSlug(slug: string): string | null {
  for (const [needle, brand] of Object.entries(SLUG_BRANDS)) {
    if (slug.includes(needle)) return brand;
  }

  const bracketMatch = slug.match(/(?:^|-)(anua|medicube|cosrx|skin1004|celimax|arencia|goodal|heimish|etude|kahi|axis-y|aplb|numbuzin|biodance|torriden|isntree)(?:-|$)/i);
  if (!bracketMatch) return null;
  const raw = bracketMatch[1].toLowerCase();
  const map: Record<string, string> = {
    anua: "Anua",
    medicube: "Medicube",
    cosrx: "COSRX",
    skin1004: "SKIN1004",
    celimax: "celimax",
    arencia: "Arencia",
    goodal: "Goodal",
    heimish: "heimish",
    etude: "ETUDE",
    kahi: "KAHI",
    "axis-y": "AXIS-Y",
    aplb: "APLB",
    numbuzin: "numbuzin",
    biodance: "Biodance",
    torriden: "Torriden",
    isntree: "ISNTREE",
  };
  return map[raw] ?? null;
}

export function shouldExcludeProduct(product: CatalogLike): boolean {
  const name = product.name.trim();
  const text = `${product.slug} ${name} ${product.brand} ${product.description ?? ""}`.toLowerCase();
  return (
    product.slug.includes("haru-expanded") ||
    product.slug.includes("moida-set") ||
    product.slug.includes("special-price-moida") ||
    product.slug.includes("special-price") ||
    product.slug.includes("free-gift") ||
    product.slug.includes("gift-") ||
    product.slug.includes("-gift") ||
    product.slug.includes("shopify-me") ||
    product.slug.includes("clearance") ||
    product.slug.includes("1-deal") ||
    text.includes("sca_clone_freegift") ||
    text.includes("bogos.io free gift") ||
    text.includes("used for the app bogos") ||
    text.includes("discount codes") ||
    text.includes("expiration date") ||
    text.includes("first purchase") ||
    text.includes("first order") ||
    text.includes("free gift") ||
    text.includes("free gifts") ||
    text.includes("get free") ||
    text.includes("special price exclusive set") ||
    text.includes("routine set") ||
    text.includes("skin care routine") ||
    text.includes("skincare routine") ||
    /\broutine\b/i.test(text) ||
    text.includes("10-step") ||
    text.includes("10 step") ||
    text.includes("moida set") ||
    text.includes("best of k-beauty") ||
    name.includes("+") ||
    MULTI_UNIT_PATTERN.test(name) ||
    SET_OR_BUNDLE_PATTERN.test(name) ||
    MULTI_PRODUCT_PATTERN.test(name) ||
    NON_FACE_CARE_PATTERN.test(text) ||
    product.brand.toLowerCase() === "moida" ||
    product.brand.toLowerCase() === "free gift ghost" ||
    product.brand.toLowerCase() === "gwp" ||
    product.brand.toLowerCase() === "shopify_me" ||
    /^\(?free gift\)?/i.test(name)
  );
}

export function cleanProductName(name: string): string {
  return name
    .replace(/^\s*\*?\s*\$?\d+(?:\.\d+)?\s*(?:deal|first purchase|first order)\*?\s*/i, "")
    .replace(/^\s*\*?\s*(?:flash|daily|hot)?\s*deal\s*\*?\s*/i, "")
    .replace(/\s*\(\s*first\s*purchase\s*only\s*\)\s*/gi, " ")
    .replace(/\s*\(\s*first\s*order\s*only\s*\)\s*/gi, " ")
    .replace(/\s*\bfirst\s*purchase\s*only\b\s*/gi, " ")
    .replace(/\s*\bfirst\s*order\s*only\b\s*/gi, " ")
    .replace(/\s*\b(?:only\s*)?\$?\d+(?:\.\d+)?\s*(?:deal|off|discount|coupon)\b\s*/gi, " ")
    .replace(/\s*\b\d+\s*%\s*off\b\s*/gi, " ")
    .replace(/\s*\b(?:sale|clearance|special price|limited deal)\b[:\s-]*/gi, " ")
    .replace(/^\s*\*?\s*special price\s*\*?\s*/i, "")
    .replace(/^\s*moida set\s*/i, "")
    .replace(/^\s*clearance\s*/i, "")
    .replace(/^\s*\$?\d+\s*free\s*/i, "")
    .replace(/^\s*\(?free\)?\s*/i, "")
    .replace(/^\s*\(?free gift\)?\s*/i, "")
    .replace(/^\s*gift\s*/i, "")
    .replace(/^\s*\d+\s*ea\s*/i, "")
    .replace(/\[[^\]]+\]\s*/g, "")
    .replace(/\bdouble pack\b\s*(?:\(\s*\d+\s*ea\s*\))?/gi, "")
    .replace(/\bduo set\b/gi, "Duo")
    .replace(/\bcopy\b/gi, "")
    .replace(GENERATED_SUFFIX, "")
    .replace(/\s*\(\s*\d+\s*ea\s*\)\s*/gi, " ")
    .replace(/\s*\+\s*free gifts?.*$/i, "")
    .replace(/\s*\(?\s*free gifts?.*$/i, "")
    .replace(/\s*\[\s*(?:deal|sale|clearance|coupon)[^\]]*\]\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/^[*()[\]\s-]+|[*()[\]\s-]+$/g, "")
    .trim();
}

export function inferBrand(product: CatalogLike): string {
  const current = product.brand
    .trim()
    .replace(/\s+official$/i, "")
    .replace(/\s+us$/i, "")
    .replace(/^cosrx$/i, "COSRX");
  if (product.slug.includes("coreelle") || current.toLowerCase().includes("corã") || current.toLowerCase().includes("coré")) {
    return "Coreelle";
  }
  if (current && !BAD_BRANDS.has(current.toLowerCase()) && !current.toLowerCase().includes("free gift")) {
    return current;
  }
  return brandFromUrl(product.officialUrl) ?? brandFromSlug(product.slug) ?? current;
}

export function cleanCatalogProduct<T extends CatalogLike>(product: T): T {
  const cleanedName = cleanProductName(product.name).replace(
    product.slug.includes("haru-expanded") ? /\s+Duo$/i : /$a/,
    ""
  );
  return {
    ...product,
    name: cleanedName || product.name,
    brand: inferBrand(product),
    officialUrl: cleanOfficialUrl(inferBrand(product), product.officialUrl),
  };
}
