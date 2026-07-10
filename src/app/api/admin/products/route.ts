import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { productAdminSchema } from "@/lib/validation-admin";

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const products = await db.product.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = productAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { price, ...rest } = parsed.data;
  const product = await db.product.create({
    data: {
      ...rest,
      fullIngredients: rest.fullIngredients || null,
      origin: rest.origin || null,
      description: rest.description || null,
      imageUrl: rest.imageUrl || null,
      officialUrl: rest.officialUrl || null,
      currency: rest.currency || "USD",
      price: price ?? null,
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}
