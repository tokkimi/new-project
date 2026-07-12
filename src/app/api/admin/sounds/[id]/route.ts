import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { soundAdminSchema } from "@/lib/validation-admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = soundAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { audioUrl, synthesisMode, order, active, ...rest } = parsed.data;
  const sound = await db.sound.update({
    where: { id },
    data: {
      ...rest,
      synthesisMode: synthesisMode || null,
      audioUrl: audioUrl || null,
      order: order ?? 0,
      active: active ?? true,
    },
  });

  return NextResponse.json({ sound });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  await db.sound.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
