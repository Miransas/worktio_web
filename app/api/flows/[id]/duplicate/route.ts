/* eslint-disable @typescript-eslint/no-explicit-any */

import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { db } from "../../../../../lib/db";
import { flows } from "../../../../../lib/db/schema";


type Params = Promise<{ id: string }>;

export async function POST(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [original] = await db.select().from(flows).where(and(eq(flows.id, id), eq(flows.userId, session.user.id)));
  if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [copy] = await db.insert(flows).values({
    userId: session.user.id,
    name: `${original.name} (Kopya)`,
    nodes: original.nodes as any,
    edges: original.edges as any,
  }).returning();
  return NextResponse.json(copy);
}