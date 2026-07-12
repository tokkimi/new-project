import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { soundAdminSchema } from "@/lib/validation-admin";

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const sounds = await db.sound.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ sounds });
}

export async function POST(request: Request) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = soundAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }

  const { audioUrl, synthesisMode, order, active, ...rest } = parsed.data;
  const sound = await db.sound.create({
    data: {
      ...rest,
      synthesisMode: synthesisMode || null,
      audioUrl: audioUrl || null,
      order: order ?? 0,
      active: active ?? true,
    },
  });

  return NextResponse.json({ sound }, { status: 201 });
}
