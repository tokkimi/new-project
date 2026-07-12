import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [preferences, notes, links] = await Promise.all([
    db.userProductPreference.findMany({ where: { userId: session.user.id } }),
    db.userNote.findMany({ where: { userId: session.user.id }, orderBy: { updatedAt: "desc" } }),
    db.savedRoutineLink.findMany({ where: { userId: session.user.id }, orderBy: { updatedAt: "desc" } }),
  ]);

  return NextResponse.json({ preferences, notes, links });
}
