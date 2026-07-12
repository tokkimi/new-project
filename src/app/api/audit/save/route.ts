import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { runUserAudit } from "@/lib/run-audit";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await runUserAudit(session.user.id);

  const auditRun = await db.auditRun.create({
    data: {
      userId: session.user.id,
      result: JSON.parse(JSON.stringify(result)),
    },
  });

  return NextResponse.json({ id: auditRun.id, score: result.score });
}
