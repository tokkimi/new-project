import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  title: z.string().trim().min(1).max(120),
  url: z.string().trim().url().max(800),
  platform: z.string().trim().max(40).optional(),
  note: z.string().trim().max(800).optional(),
});

function platformFromUrl(url: string) {
  const host = new URL(url).hostname.toLowerCase();
  if (host.includes("youtube") || host.includes("youtu.be")) return "YouTube";
  if (host.includes("instagram")) return "Instagram";
  if (host.includes("tiktok")) return "TikTok";
  return "Web";
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const link = await db.savedRoutineLink.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title,
      url: parsed.data.url,
      platform: parsed.data.platform || platformFromUrl(parsed.data.url),
      note: parsed.data.note,
    },
  });
  return NextResponse.json({ link });
}
