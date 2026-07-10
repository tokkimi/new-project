import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { id } = await params;
  const campaign = await db.newsletter.findUnique({ where: { id } });
  if (campaign?.status === "sent") {
    return NextResponse.json({ error: "cannot_delete_sent" }, { status: 400 });
  }

  await db.newsletter.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
