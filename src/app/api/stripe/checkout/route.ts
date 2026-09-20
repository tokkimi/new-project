import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStripe, isStripeConfigured, appUrl } from "@/lib/stripe";
import { logEvent } from "@/lib/events";
import { hasPremiumAccess } from "@/lib/entitlements";
import { checkoutInput, subscriptionLineItem } from "@/lib/subscription-plans";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const input = checkoutInput.safeParse(await request.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "invalid_plan" }, { status: 400 });

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (hasPremiumAccess(user)) return NextResponse.json({ error: "already_premium" }, { status: 409 });

  try {
  const stripe = getStripe();
  // Reuse the existing Premium product; the old price never determines the charge.
  const existingPrice = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!);
  const productId = typeof existingPrice.product === "string" ? existingPrice.product : existingPrice.product.id;

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
    mode: "subscription",
    line_items: [subscriptionLineItem(input.data.plan, productId)],
    success_url: `${appUrl()}/${input.data.locale}/app/upgrade?checkout=success`,
    cancel_url: `${appUrl()}/${input.data.locale}/app/upgrade?checkout=cancelled`,
    locale: input.data.locale,
    metadata: { userId: user.id, plan: input.data.plan },
    subscription_data: { metadata: { userId: user.id, plan: input.data.plan } },
  });

  await logEvent("checkout_started", { userId: user.id }).catch(() => undefined);

  return NextResponse.json({ url: checkoutSession.url });
  } catch {
    return NextResponse.json({ error: "checkout_unavailable" }, { status: 503 });
  }
}
