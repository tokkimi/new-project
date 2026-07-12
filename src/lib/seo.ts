import type { Metadata } from "next";
import { db } from "@/lib/db";

/** Merges an admin-managed SEO override (if any) over the default title/description. */
export async function getSeoMetadata(
  path: string,
  locale: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  const override = await db.seoMeta
    .findUnique({ where: { path_locale: { path, locale } } })
    .catch(() => null);

  return {
    title: override?.title || fallback.title,
    description: override?.description || fallback.description,
    ...(override?.ogImage ? { openGraph: { images: [override.ogImage] } } : {}),
  };
}
