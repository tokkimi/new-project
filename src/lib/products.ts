import { db } from "@/lib/db";
import type { Product } from "@/generated/prisma/client";

export type { Product };

export function listProducts() {
  return db.product.findMany({ orderBy: { name: "asc" } });
}

export function findProductById(id: string) {
  return db.product.findUnique({ where: { id } });
}

export function findProductBySlug(slug: string) {
  return db.product.findUnique({ where: { slug } });
}

export function findProductsByIds(ids: string[]) {
  return db.product.findMany({ where: { id: { in: ids } } });
}
