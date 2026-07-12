import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  email: z.string().trim().toLowerCase().email().max(254).optional(),
  currentPassword: z.string().max(200).optional(),
  newPassword: z.string().min(8).max(200).optional(),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const data: { name?: string; email?: string; passwordHash?: string } = {};
  if (parsed.data.name) data.name = parsed.data.name;
  if (parsed.data.email) data.email = parsed.data.email;
  if (parsed.data.newPassword) {
    if (!parsed.data.currentPassword) return NextResponse.json({ error: "current_password_required" }, { status: 400 });
    const ok = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "wrong_password" }, { status: 403 });
    data.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  }

  const updated = await db.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, name: true, email: true },
  });
  return NextResponse.json({ user: updated });
}
