import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  // Full Stripe Checkout Session creation is wired in once STRIPE_SECRET_KEY
  // and STRIPE_PRICE_ID are set — see src/lib/stripe.ts.
  return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
}
