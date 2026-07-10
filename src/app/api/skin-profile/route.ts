import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { skinProfileSchema } from "@/lib/validation";
import { rateLimit, clientKey } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const profile = await db.skinProfile.findUnique({ where: { userId: session.user.id } });
  return NextResponse.json({ profile });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { ok } = rateLimit(clientKey(request, "skin-profile-write"), {
    limit: 20,
    windowMs: 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = skinProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const profile = await db.skinProfile.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, ...parsed.data },
    update: { ...parsed.data },
  });

  return NextResponse.json({ profile });
}
