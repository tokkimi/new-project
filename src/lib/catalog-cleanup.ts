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
};

const BAD_BRANDS = new Set(["gwp", "free gift ghost", "free", "clearance"]);
const GENERATED_SUFFIX = /\s*(?:routine edit|travel size|refill pack|duo set|glow edition|barrier edit|sensitive edit|hydration edit)$/i;

function brandFromUrl(officialUrl?: string | null): string | null {
  if (!officialUrl) return null;
  try {
    const host = new URL(officialUrl).hostname.replace(/^www\./, "");
    return HOST_BRANDS[host] ?? null;
  } catch {
    return null;
  }
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
  const text = `${product.slug} ${product.name} ${product.brand} ${product.description ?? ""}`.toLowerCase();
  return (
    text.includes("sca_clone_freegift") ||
    text.includes("bogos.io free gift") ||
    text.includes("used for the app bogos") ||
    text.includes("free gift") ||
    text.includes("free gifts") ||
    text.includes("get free") ||
    text.includes("% off") ||
    text.includes("special price exclusive set") ||
    product.brand.toLowerCase() === "free gift ghost" ||
    product.brand.toLowerCase() === "gwp" ||
    /^\(?free gift\)?/i.test(product.name.trim())
  );
}

export function cleanProductName(name: string): string {
  return name
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
    .replace(/\s{2,}/g, " ")
    .replace(/^[*()[\]\s-]+|[*()[\]\s-]+$/g, "")
    .trim();
}

export function inferBrand(product: CatalogLike): string {
  const current = product.brand
    .trim()
    .replace(/\s+official$/i, "")
    .replace(/\s+us$/i, "")
    .replace(/^corã©elle$/i, "Coreelle")
    .replace(/^cosrx$/i, "COSRX");
  if (current && !BAD_BRANDS.has(current.toLowerCase()) && !current.toLowerCase().includes("free gift")) {
    return current;
  }
  return brandFromUrl(product.officialUrl) ?? brandFromSlug(product.slug) ?? current;
}

export function cleanCatalogProduct<T extends CatalogLike>(product: T): T {
  return {
    ...product,
    name: cleanProductName(product.name) || product.name,
    brand: inferBrand(product),
  };
}
