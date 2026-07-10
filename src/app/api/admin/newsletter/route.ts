import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";

const createSchema = z.object({
  subject: z.string().trim().min(1).max(200),
  bodyHtml: z.string().trim().min(1).max(50000),
});

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const [campaigns, subscriberCount] = await Promise.all([
    db.newsletter.findMany({ orderBy: { createdAt: "desc" } }),
    db.newsletterSubscriber.count(),
  ]);

  return NextResponse.json({ campaigns, subscriberCount });
}

export async function POST(request: Request) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const campaign = await db.newsletter.create({ data: parsed.data });
  return NextResponse.json({ campaign }, { status: 201 });
}
