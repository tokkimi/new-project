import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(80),
  body: z.string().trim().max(5000),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const note = parsed.data.id
    ? await db.userNote.update({
        where: { id: parsed.data.id, userId: session.user.id },
        data: { title: parsed.data.title, body: parsed.data.body },
      })
    : await db.userNote.create({
        data: { userId: session.user.id, title: parsed.data.title, body: parsed.data.body },
      });
  return NextResponse.json({ note });
}
