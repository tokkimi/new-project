import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/entitlements";

/** Returns the admin's user id, or null if the caller isn't an authenticated admin. */
export async function requireAdmin(): Promise<string | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, subscriptionStatus: true },
  });
  if (!isAdmin(user)) return null;

  return session.user.id;
}
