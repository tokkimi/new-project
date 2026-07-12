import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { seedNews } from "@/lib/seed-runner";

export async function GET(request: Request) {
  const { ok } = rateLimit(clientKey(request, "setup-seed-news"), { limit: 10, windowMs: 60 * 1000 });
  if (!ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "SEED_SECRET is not configured" }, { status: 500 });
  }

  const token = new URL(request.url).searchParams.get("token");
  if (!token || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const news = await seedNews(db);
  return NextResponse.json({ ok: true, news });
}
