/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { flows } from "../../../../lib/db/schema";
import { db } from "../../../../lib/db";

type Params = Promise<{ flowId: string }>;

export async function POST(req: Request, { params }: { params: Params }) {
  const { flowId } = await params;

  const [flow] = await db.select().from(flows).where(eq(flows.id, flowId));
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const nodes = flow.nodes as any[];

  const triggerNode = nodes.find(n => n.type === "trigger" && n.data?.triggerType === "webhook");
  if (!triggerNode) return NextResponse.json({ error: "No webhook trigger" }, { status: 400 });

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/flows/${flow.id}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-payload": JSON.stringify(body),
    },
  });

  const result = await res.json();
  return NextResponse.json({ received: true, executionId: result.executionId });
}

export async function GET(_: Request, { params }: { params: Params }) {
  const { flowId } = await params;
  return NextResponse.json({
    webhook: `${process.env.NEXTAUTH_URL}/api/webhooks/${flowId}`,
    method: "POST",
  });
}