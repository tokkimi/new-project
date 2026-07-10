import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { shelfItemSchema } from "@/lib/validation";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { findProductById } from "@/lib/products";
import { logEvent } from "@/lib/events";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const items = await db.shelfItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "asc" },
    include: { product: true },
  });

  return NextResponse.json({ products: items.map((i) => i.product) });
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

  const product = await findProductById(parsed.data.productId);
  if (!product) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }

  await db.shelfItem.upsert({
    where: {
      userId_productId: { userId: session.user.id, productId: product.id },
    },
    create: { userId: session.user.id, productId: product.id },
    update: {},
  });

  await logEvent("shelf_item_added", { userId: session.user.id });

  return NextResponse.json({ ok: true }, { status: 201 });
}
