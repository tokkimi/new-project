import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Math.min(Number(searchParams.get("limit")) || 24, 50);

  const items = await db.newsItem.findMany({
    where: category ? { category } : undefined,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return NextResponse.json({ items });
}
