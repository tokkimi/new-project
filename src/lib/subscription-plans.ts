import { z } from "zod";

export const subscriptionPlans = {
  monthly: { amount: 199, interval: "month" },
  annual: { amount: 990, interval: "year" },
} as const;
export type SubscriptionPlan = keyof typeof subscriptionPlans;
export const checkoutInput = z.object({
  plan: z.enum(["monthly", "annual"]),
  locale: z.enum(["fr", "en", "ko", "ja"]),
}).strict();

export function subscriptionLineItem(plan: SubscriptionPlan, product: string) {
  const selected = subscriptionPlans[plan];
  return {
    quantity: 1,
    price_data: {
      currency: "eur",
      product,
      unit_amount: selected.amount,
      recurring: { interval: selected.interval },
      tax_behavior: "inclusive" as const,
    },
  };
}

export function subscriptionPrice(plan: SubscriptionPlan, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(subscriptionPlans[plan].amount / 100);
}
