import type { Role, SubscriptionStatus } from "@/generated/prisma/client";

type EntitlementUser = {
  role: Role;
  subscriptionStatus: SubscriptionStatus;
} | null | undefined;

/** Admins always pass (support/testing), otherwise requires an active or trialing subscription. */
export function hasPremiumAccess(user: EntitlementUser): boolean {
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  return user.subscriptionStatus === "ACTIVE" || user.subscriptionStatus === "TRIALING";
}

export function isAdmin(user: EntitlementUser): boolean {
  return user?.role === "ADMIN";
}
