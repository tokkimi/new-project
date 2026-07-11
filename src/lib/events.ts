import { db } from "@/lib/db";

export type EventType =
  | "page_view"
  | "signup"
  | "scan_completed"
  | "routine_built"
  | "audit_run"
  | "shelf_item_added"
  | "checkout_started"
  | "subscription_active"
  | "scan_checkout_started"
  | "face_scan_credit_purchased";

/**
 * Fire-and-forget analytics event. Never throws — a broken analytics
 * write must not break the feature that triggered it.
 */
export async function logEvent(
  type: EventType,
  data: { userId?: string; path?: string; locale?: string } = {}
) {
  try {
    await db.event.create({
      data: {
        type,
        userId: data.userId,
        path: data.path,
        locale: data.locale,
      },
    });
  } catch {
    // best-effort only
  }
}
