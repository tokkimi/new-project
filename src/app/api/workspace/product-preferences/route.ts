import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  productId: z.string().min(1),
  favorite: z.boolean().optional(),
  routineSlot: z.enum(["morning", "evening", "both", "pause"]).optional(),
  customCategory: z.string().trim().max(60).nullable().optional(),
  note: z.string().trim().max(500).nullable().optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const { productId, ...data } = parsed.data;
  const pref = await db.userProductPreference.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    create: { userId: session.user.id, productId, ...data },
    update: data,
  });
  return NextResponse.json({ preference: pref });
}
