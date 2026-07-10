import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { findProductsByIds } from "@/lib/products";

const importSchema = z.object({
  productIds: z.array(z.string().trim().min(1).max(100)).max(200),
});

/** One-shot import of a guest's localStorage shelf into their new account. */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { ok } = rateLimit(clientKey(request, "shelf-import"), {
    limit: 5,
    windowMs: 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = importSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const validProducts = await findProductsByIds(parsed.data.productIds);

  await db.shelfItem.createMany({
    data: validProducts.map((p) => ({ userId: session.user.id, productId: p.id })),
    skipDuplicates: true,
  });

  return NextResponse.json({ ok: true, imported: validProducts.length });
}
