import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailSchema } from "@/lib/validation";
import { rateLimit, clientKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const { ok } = rateLimit(clientKey(request, "newsletter-subscribe"), {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = emailSchema.safeParse(body?.email);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  await db.newsletterSubscriber.upsert({
    where: { email: parsed.data },
    create: { email: parsed.data },
    update: {},
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
