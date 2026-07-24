import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { REACTION_TYPES } from "@/lib/reactions";

const schema = z.object({
  type: z.enum(REACTION_TYPES),
  productId: z.string().min(1).max(60).nullish(),
  note: z.string().trim().max(300).optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const reactions = await db.productReaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      type: true,
      productId: true,
      note: true,
      createdAt: true,
      product: { select: { name: true } },
    },
  });
  return NextResponse.json({ reactions });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  // If a product is referenced, it must actually be on the user's shelf.
  let productId: string | null = parsed.data.productId ?? null;
  if (productId) {
    const owns = await db.shelfItem.findUnique({
      where: { userId_productId: { userId: session.user.id, productId } },
      select: { id: true },
    });
    if (!owns) productId = null;
  }

  const reaction = await db.productReaction.create({
    data: {
      userId: session.user.id,
      type: parsed.data.type,
      productId,
      note: parsed.data.note?.trim() ? parsed.data.note.trim() : null,
    },
    select: {
      id: true,
      type: true,
      productId: true,
      note: true,
      createdAt: true,
      product: { select: { name: true } },
    },
  });
  return NextResponse.json({ reaction });
}
