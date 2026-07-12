import bcrypt from "bcryptjs";
import type { PrismaClient } from "@/generated/prisma/client";
import { PRODUCTS } from "@/lib/seed-data/products";
import { NEWS } from "@/lib/seed-data/news";
import { CATEGORY_TREE } from "@/lib/seed-data/categories";
import { SEED_COMPATIBILITY_RULES, SEED_INGREDIENTS } from "@/lib/seed-data/ingredients";

export async function seedProducts(db: PrismaClient): Promise<number> {
  for (const p of PRODUCTS) {
    await db.product.upsert({
      where: { slug: p.slug },
      create: { ...p },
      update: { ...p },
    });
  }
  return PRODUCTS.length;
}

// Entries that were in the generated catalog with a non-brand "brand" field
// (order-receipt artifacts like "GWP" / "Free Gift Ghost", not real
// products) — removed from the seed data on 2026-07-12. Upsert-by-slug never
// deletes rows on its own, so these stay orphaned in already-seeded
// databases (and in anyone's shelf) until explicitly removed here.
const REMOVED_JUNK_SLUGS = [
  "free-gift-ghost-free-gift-revive-eye-serum-mini",
  "free-gift-ghost-free-gift-light-on-serum-mini",
  "free-gift-ghost-revive-eye-serum-mini-free-gift",
  "free-gift-ghost-light-on-serum-mini-free-gift",
  "gwp-100-free-pdrn-serum-minis",
  "free-gift-ghost-free-gift-revive-eye-serum-mini-haru-expanded-641",
  "free-gift-ghost-free-gift-light-on-serum-mini-haru-expanded-642",
  "free-gift-ghost-revive-eye-serum-mini-free-gift-haru-expanded-643",
  "free-gift-ghost-light-on-serum-mini-free-gift-haru-expanded-644",
  "gwp-100-free-pdrn-serum-minis-haru-expanded-918",
  // Second pass (2026-07-12): broader promo-prefix patterns (*CLEARANCE*,
  // *$1 Deal*, [BRAND] tags, "+ Free Gift", "N% OFF") caught a further batch,
  // including several with brand literally set to "free".
  "neogen-dermalogy-buy-2-locking-fixer-get-free-gifts",
  "free-jumiso-niacinamide-20-serum-sample-1ml",
  "free-free-gift-jumiso-niacinamide-20-serum-sample-1ml-2ea",
  "free-free-gift-skin1004-madagascar-centella-light-cleansing-oil-30ml",
  "free-free-gift-etude-0-2mm-therapy-air-sheet-mask-green-tea",
  "free-free-gift-heimish-all-clean-balm-blister-5ml",
  "free-free-gift-tocobo-renew-bio-watery-sun-cream-spf50-40ml",
  "free-moev-annurcatin-treatment-sachet-8g",
  "free-isntree-hyaluronic-acid-daily-sun-gel-10ml",
  "free-nesh-sachet-soy-biome-protein-repair-treatment-8ml",
  "free-nesh-sachet-pomegranate-biome-scalp-boosting-shampoo-10ml",
  "free-medicube-pdrn-pink-peptide-serum-sample-5ml",
  "free-jumiso-niacinamide-20-serum-sample-1ml-bloomingkoco-com",
  "free-free-gift-jumiso-niacinamide-20-serum-sample-1ml-2ea-bloomingkoco-com",
  "free-free-gift-skin1004-madagascar-centella-light-cleansing-oil-30ml-bloomingkoco-com",
  "free-free-gift-etude-0-2mm-therapy-air-sheet-mask-green-tea-bloomingkoco-com",
  "free-free-gift-heimish-all-clean-balm-blister-5ml-bloomingkoco-com",
  "free-free-gift-tocobo-renew-bio-watery-sun-cream-spf50-40ml-bloomingkoco-com",
  "free-moev-annurcatin-treatment-sachet-8g-bloomingkoco-com",
  "free-isntree-hyaluronic-acid-daily-sun-gel-10ml-bloomingkoco-com",
  "free-nesh-sachet-soy-biome-protein-repair-treatment-8ml-bloomingkoco-com",
  "free-nesh-sachet-pomegranate-biome-scalp-boosting-shampoo-10ml-bloomingkoco-com",
  "free-medicube-pdrn-pink-peptide-serum-sample-5ml-bloomingkoco-com",
  "free-dr-althea-345-relief-cream-15ml-bloomingkoco-com",
  "free-arencia-serum-sample-set-2g-2ea-holy-hyssop-serum-30-red-smoothie-sreum-30-bloomingkoco-com",
  "free-vt-cosmetics-pdrn-hydrogel-mask-1ea-bloomingkoco-com",
  "free-jumiso-waterfull-hyaluronic-toner-deluxe-7ml-bloomingkoco-com",
  "free-mixsoon-bean-cleansing-oil-20ml-bloomingkoco-com",
  "free-heveblue-salmon-caring-centella-skincare-line-sachet-leaflet-bloomingkoco-com",
  "free-jumiso-niacinamide-20-serum-sample-1ml-2ea-bloomingkoco-com",
  "free-banila-co-clean-it-zero-original-cleansing-balm-7ml-bloomingkoco-com",
  "free-heimish-all-clean-balm-mandarin-blister-5ml-bloomingkoco-com",
  "free-skin1004-madagascar-centella-light-cleansing-oil-30ml-bloomingkoco-com",
  "free-heimish-mini-all-clean-gentle-gel-cleanser-20ml-bloomingkoco-com",
  "free-skin1004-madagascar-centella-ampoule-foam-20ml-bloomingkoco-com",
  "free-free-biodance-collagen-gel-toner-pads-60pcs-140g-pureseoul-co-uk",
  "free-free-heveblue-pdrn-salmon-caring-centella-toner-mini-25ml-pureseoul-co-uk",
  "free-free-milktouch-glow-up-collagen-lip-balm-vanilla-cake-15g-pureseoul-co-uk",
  "free-free-luvum-glacial-marine-algae-pdrn-gel-mask-1pc-pureseoul-co-uk",
  "free-free-torriden-cellmazing-lip-essence-11ml-pureseoul-co-uk",
  "free-free-not4u-clear-body-wash-mini-30ml-pureseoul-co-uk",
  "free-free-caffeine-shot-collagen-eye-cream-30g-pureseoul-co-uk",
  "free-free-brightening-mask-1pc-pureseoul-co-uk",
  "free-free-chipe-volume-winkle-glitter-lip-oil-3-5g-pureseoul-co-uk",
  "neogen-dermalogy-buy-2-locking-fixer-get-free-gifts-haru-expanded-1665",
  "free-jumiso-niacinamide-20-serum-sample-1ml-haru-expanded-2195",
  "free-free-gift-jumiso-niacinamide-20-serum-sample-1ml-2ea-haru-expanded-2204",
  "free-free-gift-skin1004-madagascar-centella-light-cleansing-oil-30ml-haru-expanded-2211",
  "free-free-gift-etude-0-2mm-therapy-air-sheet-mask-green-tea-haru-expanded-2212",
  "free-free-gift-heimish-all-clean-balm-blister-5ml-haru-expanded-2215",
  "free-free-gift-tocobo-renew-bio-watery-sun-cream-spf50-40ml-haru-expanded-2302",
  "free-moev-annurcatin-treatment-sachet-8g-haru-expanded-2319",
  "free-isntree-hyaluronic-acid-daily-sun-gel-10ml-haru-expanded-2331",
  "free-nesh-sachet-soy-biome-protein-repair-treatment-8ml-haru-expanded-2332",
  "free-nesh-sachet-pomegranate-biome-scalp-boosting-shampoo-10ml-haru-expanded-2333",
  "free-medicube-pdrn-pink-peptide-serum-sample-5ml-haru-expanded-2417",
  "free-jumiso-niacinamide-20-serum-sample-1ml-bloomingkoco-com-haru-expanded-2547",
  "free-free-gift-jumiso-niacinamide-20-serum-sample-1ml-2ea-bloomingkoco-com-haru-expanded-2556",
  "free-free-gift-skin1004-madagascar-centella-light-cleansing-oil-30ml-bloomingkoco-com-haru-expanded-2562",
  "free-free-gift-etude-0-2mm-therapy-air-sheet-mask-green-tea-bloomingkoco-com-haru-expanded-2563",
  "free-free-gift-heimish-all-clean-balm-blister-5ml-bloomingkoco-com-haru-expanded-2566",
  "free-free-gift-tocobo-renew-bio-watery-sun-cream-spf50-40ml-bloomingkoco-com-haru-expanded-2652",
  "free-moev-annurcatin-treatment-sachet-8g-bloomingkoco-com-haru-expanded-2669",
  "free-isntree-hyaluronic-acid-daily-sun-gel-10ml-bloomingkoco-com-haru-expanded-2681",
  "free-nesh-sachet-soy-biome-protein-repair-treatment-8ml-bloomingkoco-com-haru-expanded-2682",
  "free-nesh-sachet-pomegranate-biome-scalp-boosting-shampoo-10ml-bloomingkoco-com-haru-expanded-2683",
  "free-medicube-pdrn-pink-peptide-serum-sample-5ml-bloomingkoco-com-haru-expanded-2766",
  "free-dr-althea-345-relief-cream-15ml-bloomingkoco-com-haru-expanded-3038",
  "free-arencia-serum-sample-set-2g-2ea-holy-hyssop-serum-30-red-smoothie-sreum-30-bloomingkoco-com-haru-expanded-3068",
  "free-vt-cosmetics-pdrn-hydrogel-mask-1ea-bloomingkoco-com-haru-expanded-3083",
  "free-jumiso-waterfull-hyaluronic-toner-deluxe-7ml-bloomingkoco-com-haru-expanded-3084",
  "free-mixsoon-bean-cleansing-oil-20ml-bloomingkoco-com-haru-expanded-3092",
  "free-heveblue-salmon-caring-centella-skincare-line-sachet-leaflet-bloomingkoco-com-haru-expanded-3102",
  "free-jumiso-niacinamide-20-serum-sample-1ml-2ea-bloomingkoco-com-haru-expanded-3465",
  "free-banila-co-clean-it-zero-original-cleansing-balm-7ml-bloomingkoco-com-haru-expanded-3513",
  "free-heimish-all-clean-balm-mandarin-blister-5ml-bloomingkoco-com-haru-expanded-3622",
  "free-skin1004-madagascar-centella-light-cleansing-oil-30ml-bloomingkoco-com-haru-expanded-3628",
  "free-heimish-mini-all-clean-gentle-gel-cleanser-20ml-bloomingkoco-com-haru-expanded-3646",
  "free-skin1004-madagascar-centella-ampoule-foam-20ml-bloomingkoco-com-haru-expanded-3655",
];

export async function deleteOrphanedJunkProducts(db: PrismaClient): Promise<number> {
  const result = await db.product.deleteMany({ where: { slug: { in: REMOVED_JUNK_SLUGS } } });
  return result.count;
}

export async function seedCategories(db: PrismaClient): Promise<number> {
  for (const c of CATEGORY_TREE) {
    await db.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: c,
    });
  }
  return CATEGORY_TREE.length;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalizes the free-text Product.brand strings already in the catalog into
 * real Brand rows, and links each product's brandId — additive, never
 * touches the existing `brand` text field products still read directly.
 */
export async function seedBrands(db: PrismaClient): Promise<number> {
  const products = await db.product.findMany({ select: { id: true, brand: true, origin: true } });

  const byBrand = new Map<string, { name: string; origin: string | null; productIds: string[] }>();
  for (const p of products) {
    const key = p.brand.trim().toLowerCase();
    const existing = byBrand.get(key);
    if (existing) {
      existing.productIds.push(p.id);
      if (!existing.origin && p.origin) existing.origin = p.origin;
    } else {
      byBrand.set(key, { name: p.brand.trim(), origin: p.origin, productIds: [p.id] });
    }
  }

  let count = 0;
  for (const { name, origin, productIds } of byBrand.values()) {
    const slug = slugify(name);
    if (!slug) continue;
    const brand = await db.brand.upsert({
      where: { slug },
      create: { slug, name, country: origin },
      update: { name, country: origin ?? undefined },
    });
    await db.product.updateMany({ where: { id: { in: productIds } }, data: { brandId: brand.id } });
    count++;
  }
  return count;
}

/** Backfills a first ProductSource row from each product's existing officialUrl, when present. */
export async function seedProductSources(db: PrismaClient): Promise<number> {
  const products = await db.product.findMany({
    where: { officialUrl: { not: null } },
    select: { id: true, brand: true, officialUrl: true },
  });

  let count = 0;
  for (const p of products) {
    if (!p.officialUrl) continue;
    const existing = await db.productSource.findFirst({
      where: { productId: p.id, sourceUrl: p.officialUrl },
    });
    if (existing) continue;
    await db.productSource.create({
      data: { productId: p.id, sourceName: `${p.brand} (official site)`, sourceUrl: p.officialUrl },
    });
    count++;
  }
  return count;
}

export async function seedIngredients(db: PrismaClient): Promise<number> {
  for (const ingredient of SEED_INGREDIENTS) {
    await db.ingredient.upsert({
      where: { id: ingredient.id },
      create: ingredient,
      update: ingredient,
    });
  }
  return SEED_INGREDIENTS.length;
}

export async function seedCompatibilityRules(db: PrismaClient): Promise<number> {
  let count = 0;
  for (const rule of SEED_COMPATIBILITY_RULES) {
    await db.compatibilityRule.upsert({
      where: { id: rule.id },
      create: rule,
      update: rule,
    });
    count++;
  }
  return count;
}

export async function seedProductIngredients(db: PrismaClient): Promise<number> {
  const products = await db.product.findMany({ select: { id: true, ingredientIds: true } });
  const validIngredients = new Set(
    (await db.ingredient.findMany({ select: { id: true } })).map((ingredient) => ingredient.id)
  );

  let count = 0;
  for (const product of products) {
    for (const ingredientId of product.ingredientIds) {
      if (!validIngredients.has(ingredientId)) continue;
      await db.productIngredient.upsert({
        where: { productId_ingredientId: { productId: product.id, ingredientId } },
        create: { productId: product.id, ingredientId },
        update: {},
      });
      count++;
    }
  }
  return count;
}

export async function seedNews(db: PrismaClient): Promise<number> {
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
  return NEWS.length;
}

const ADMIN_EMAIL = "admin@haru.app";
const ADMIN_PASSWORD = "HaruAdmin!2026";
const PREMIUM_EMAIL = "premium-tester@haru.app";
const PREMIUM_PASSWORD = "HaruPremium!2026";

export async function seedTestAccounts(db: PrismaClient) {
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.user.upsert({
    where: { email: ADMIN_EMAIL },
    create: {
      email: ADMIN_EMAIL,
      name: "Haru Admin",
      passwordHash: adminHash,
      role: "ADMIN",
    },
    update: { passwordHash: adminHash, role: "ADMIN" },
  });

  const premiumHash = await bcrypt.hash(PREMIUM_PASSWORD, 12);
  const premiumUser = await db.user.upsert({
    where: { email: PREMIUM_EMAIL },
    create: {
      email: PREMIUM_EMAIL,
      name: "Premium Tester",
      passwordHash: premiumHash,
      role: "USER",
      subscriptionStatus: "ACTIVE",
    },
    update: { passwordHash: premiumHash, subscriptionStatus: "ACTIVE" },
  });

  await db.skinProfile.upsert({
    where: { userId: premiumUser.id },
    create: {
      userId: premiumUser.id,
      skinType: "combination",
      concerns: ["acne", "dullness", "pores"],
      ageRange: "20s",
      sensitivities: ["fragrance"],
      climate: "humid",
      goals: [],
      budget: "mid",
    },
    update: {},
  });

  // Give the premium tester a starter shelf pulled from featured products,
  // so the routine/audit/scan flows all have something to show immediately.
  const featured = await db.product.findMany({ where: { featured: true }, take: 6 });
  for (const product of featured) {
    await db.shelfItem.upsert({
      where: { userId_productId: { userId: premiumUser.id, productId: product.id } },
      create: { userId: premiumUser.id, productId: product.id },
      update: {},
    });
  }

  return {
    adminEmail: ADMIN_EMAIL,
    premiumEmail: PREMIUM_EMAIL,
    premiumShelfItems: featured.length,
  };
}
