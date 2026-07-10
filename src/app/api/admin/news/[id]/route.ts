import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { newsItemAdminSchema } from "@/lib/validation-admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = newsItemAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { publishedAt, sourceName, sourceUrl, imageUrl, ...rest } = parsed.data;
  const item = await db.newsItem.update({
    where: { id },
    data: {
      ...rest,
      sourceName: sourceName || null,
      sourceUrl: sourceUrl || null,
      imageUrl: imageUrl || null,
      publishedAt: new Date(publishedAt),
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  await db.newsItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
