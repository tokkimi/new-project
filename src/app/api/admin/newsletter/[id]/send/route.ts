import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { isMailConfigured, sendNewsletter } from "@/lib/mail";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  if (!isMailConfigured()) {
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }

  const { id } = await params;
  const campaign = await db.newsletter.findUnique({ where: { id } });
  if (!campaign) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (campaign.status === "sent") {
    return NextResponse.json({ error: "already_sent" }, { status: 400 });
  }

  const subscribers = await db.newsletterSubscriber.findMany({
    where: { confirmed: true },
    select: { email: true },
  });

  await sendNewsletter({
    to: subscribers.map((s) => s.email),
    subject: campaign.subject,
    html: campaign.bodyHtml,
  });

  const updated = await db.newsletter.update({
    where: { id },
    data: { status: "sent", sentAt: new Date() },
  });

  return NextResponse.json({ campaign: updated, sentTo: subscribers.length });
}
