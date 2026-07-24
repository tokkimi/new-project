import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CHANGE_KINDS, PROTOCOL_GOALS, PROTOCOL_OUTCOMES, PROTOCOL_DURATIONS } from "@/lib/protocol";

const startSchema = z.object({
  goal: z.enum(PROTOCOL_GOALS),
  changeKind: z.enum(CHANGE_KINDS),
  productId: z.string().min(1).max(60).nullish(),
  note: z.string().trim().max(300).optional(),
  durationDays: z.union([z.literal(7), z.literal(14), z.literal(28)]).default(14),
});

const completeSchema = z.object({
  id: z.string().min(1),
  outcome: z.enum(PROTOCOL_OUTCOMES),
});

const SELECT = {
  id: true,
  goal: true,
  changeKind: true,
  productId: true,
  note: true,
  durationDays: true,
  status: true,
  outcome: true,
  startedAt: true,
  completedAt: true,
  product: { select: { name: true } },
} as const;

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const active = await db.routineProtocol.findFirst({
    where: { userId: session.user.id, status: "active" },
    orderBy: { startedAt: "desc" },
    select: SELECT,
  });
  return NextResponse.json({ protocol: active });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = startSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  // One change at a time — refuse a second active protocol.
  const existing = await db.routineProtocol.findFirst({
    where: { userId: session.user.id, status: "active" },
    select: { id: true },
  });
  if (existing) return NextResponse.json({ error: "protocol_active" }, { status: 409 });

  let productId: string | null = parsed.data.productId ?? null;
  if (productId) {
    const owns = await db.shelfItem.findUnique({
      where: { userId_productId: { userId: session.user.id, productId } },
      select: { id: true },
    });
    if (!owns) productId = null;
  }

  const protocol = await db.routineProtocol.create({
    data: {
      userId: session.user.id,
      goal: parsed.data.goal,
      changeKind: parsed.data.changeKind,
      productId,
      note: parsed.data.note?.trim() ? parsed.data.note.trim() : null,
      durationDays: PROTOCOL_DURATIONS.includes(parsed.data.durationDays)
        ? parsed.data.durationDays
        : 14,
    },
    select: SELECT,
  });
  return NextResponse.json({ protocol });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = completeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const result = await db.routineProtocol.updateMany({
    where: { id: parsed.data.id, userId: session.user.id, status: "active" },
    data: { status: "completed", outcome: parsed.data.outcome, completedAt: new Date() },
  });
  if (result.count === 0) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const result = await db.routineProtocol.updateMany({
    where: { id, userId: session.user.id, status: "active" },
    data: { status: "abandoned", completedAt: new Date() },
  });
  if (result.count === 0) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
