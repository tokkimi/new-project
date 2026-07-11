import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStripe, appUrl } from "@/lib/stripe";
import { logEvent } from "@/lib/events";

function isScanCheckoutConfigured() {
  return !!process.env.STRIPE_SECRET_KEY && !!process.env.STRIPE_SCAN_PRICE_ID;
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isScanCheckoutConfigured()) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const stripe = getStripe();

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await db.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_SCAN_PRICE_ID!, quantity: 1 }],
    success_url: `${appUrl()}/app/face-scan?checkout=success`,
    cancel_url: `${appUrl()}/app/face-scan?checkout=cancelled`,
    metadata: { userId: user.id, purpose: "face_scan_credit" },
  });

  await logEvent("scan_checkout_started", { userId: user.id });

  return NextResponse.json({ url: checkoutSession.url });
}
