import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { logEvent } from "@/lib/events";
import type { SubscriptionStatus } from "@/generated/prisma/client";

function mapStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
    case "unpaid":
    case "incomplete_expired":
      return "CANCELED";
    default:
      return "NONE";
  }
}

async function syncSubscription(subscription: Stripe.Subscription, eventId: string) {
  const userId = subscription.metadata?.userId;
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;

  const item = subscription.items.data[0];
  return db.$transaction(async (tx) => {
    const seen = await tx.stripeWebhookEvent.findUnique({ where: { id: eventId } });
    if (seen) return false;

    const user = userId
      ? await tx.user.findUnique({ where: { id: userId } })
      : await tx.user.findUnique({ where: { stripeCustomerId: customerId } });
    await tx.stripeWebhookEvent.create({ data: { id: eventId } });
    if (!user) return false;

    await tx.user.update({
      where: { id: user.id },
      data: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: mapStatus(subscription.status),
        subscriptionPriceId: item?.price.id ?? null,
        currentPeriodEnd: item ? new Date(item.current_period_end * 1000) : null,
      },
    });
    return subscription.status === "active";
  });
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      if (checkoutSession.subscription) {
        const subscriptionId =
          typeof checkoutSession.subscription === "string"
            ? checkoutSession.subscription
            : checkoutSession.subscription.id;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        // Checkout Sessions carry metadata, subscriptions created via Checkout don't
        // automatically inherit it — set it once here so future webhook events can match.
        if (checkoutSession.metadata?.userId && !subscription.metadata?.userId) {
          await stripe.subscriptions.update(subscription.id, {
            metadata: { userId: checkoutSession.metadata.userId },
          });
          subscription.metadata.userId = checkoutSession.metadata.userId;
        }
        const becameActive = await syncSubscription(subscription, event.id);
        if (becameActive) await logEvent("subscription_active", { userId: checkoutSession.metadata?.userId });
      } else if (
        checkoutSession.mode === "payment" &&
        checkoutSession.metadata?.purpose === "face_scan_credit" &&
        checkoutSession.metadata?.userId
      ) {
        const userId = checkoutSession.metadata.userId;
        const credited = await db.$transaction(async (tx) => {
          const seen = await tx.stripeWebhookEvent.findUnique({ where: { id: event.id } });
          if (seen) return false;
          await tx.stripeWebhookEvent.create({ data: { id: event.id } });
          await tx.user.update({
            where: { id: userId },
            data: { faceScanCredits: { increment: 1 } },
          });
          return true;
        });
        if (credited) await logEvent("face_scan_credit_purchased", { userId });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.created":
    case "customer.subscription.deleted": {
      const becameActive = await syncSubscription(event.data.object as Stripe.Subscription, event.id);
      if (becameActive) await logEvent("subscription_active");
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
