/**
 * In-memory sliding-window rate limiter. Fine for a single serverless
 * instance / demo deployment — it resets per cold start and doesn't
 * coordinate across instances. For real multi-instance production
 * traffic, swap this for a shared store (e.g. Upstash Redis) behind
 * the same `check()` signature.
 */
const buckets = new Map<string, number[]>();

const MAX_TRACKED_KEYS = 5000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (buckets.size > MAX_TRACKED_KEYS) {
    // Cheap unbounded-growth guard: drop the oldest-looking entries.
    const keys = buckets.keys();
    for (let i = 0; i < 500; i++) {
      const next = keys.next();
      if (next.done) break;
      buckets.delete(next.value);
    }
  }

  const timestamps = (buckets.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    const retryAfterMs = timestamps[0] + windowMs - now;
    buckets.set(key, timestamps);
    return { ok: false, retryAfterMs: Math.max(retryAfterMs, 0) };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return { ok: true, retryAfterMs: 0 };
}

export function clientKey(request: Request, scope: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  return `${scope}:${ip}`;
}
