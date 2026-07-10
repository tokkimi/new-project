import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { newsItemAdminSchema } from "@/lib/validation-admin";

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const items = await db.newsItem.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = newsItemAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { publishedAt, sourceName, sourceUrl, imageUrl, ...rest } = parsed.data;
  const item = await db.newsItem.create({
    data: {
      ...rest,
      sourceName: sourceName || null,
      sourceUrl: sourceUrl || null,
      imageUrl: imageUrl || null,
      publishedAt: new Date(publishedAt),
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
