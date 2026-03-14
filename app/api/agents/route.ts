
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import { db } from "../../../lib/db";
import { agents } from "../../../lib/db/schema";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(agents).where(eq(agents.userId, session.user.id));
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [agent] = await db.insert(agents).values({
    userId: session.user.id,
    name: body.name ?? "Yeni Agent",
    systemPrompt: body.systemPrompt ?? "Sen yardımcı bir asistansın.",
    model: body.model ?? "gemini-pro",
    tools: body.tools ?? [],
  }).returning();
  return NextResponse.json(agent);
}