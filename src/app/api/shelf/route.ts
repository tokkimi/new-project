import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { shelfItemSchema } from "@/lib/validation";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { PRODUCT_CATALOG } from "@/data/catalog";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const items = await db.shelfItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "asc" },
  });

  return NextResponse.json({ productIds: items.map((i) => i.productId) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { ok } = rateLimit(clientKey(request, "shelf-write"), {
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = shelfItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (!PRODUCT_CATALOG.some((p) => p.id === parsed.data.productId)) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }

  await db.shelfItem.upsert({
    where: {
      userId_productId: { userId: session.user.id, productId: parsed.data.productId },
    },
    create: { userId: session.user.id, productId: parsed.data.productId },
    update: {},
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
