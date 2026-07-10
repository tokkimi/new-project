import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { productAdminSchema } from "@/lib/validation-admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { price, ...rest } = parsed.data;
  const product = await db.product.update({
    where: { id },
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

  return NextResponse.json({ product });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  await db.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
