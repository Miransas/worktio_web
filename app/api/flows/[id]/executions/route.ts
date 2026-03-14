
import { eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { executions } from "../../../../../lib/db/schema";
import { db } from "../../../../../lib/db";
import { auth } from "../../../../../auth";


type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(executions)
    .where(and(eq(executions.flowId, id), eq(executions.userId, session.user.id)))
    .orderBy(desc(executions.createdAt))
    .limit(20);
  return NextResponse.json(list);
}