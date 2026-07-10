import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { seoMetaAdminSchema } from "@/lib/validation-admin";

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const entries = await db.seoMeta.findMany({ orderBy: [{ path: "asc" }, { locale: "asc" }] });
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = seoMetaAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { path, locale, title, description, ogImage } = parsed.data;
  const entry = await db.seoMeta.upsert({
    where: { path_locale: { path, locale } },
    create: { path, locale, title: title || null, description: description || null, ogImage: ogImage || null },
    update: { title: title || null, description: description || null, ogImage: ogImage || null },
  });

  return NextResponse.json({ entry }, { status: 201 });
}
