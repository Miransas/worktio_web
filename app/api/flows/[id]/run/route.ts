/* eslint-disable @typescript-eslint/no-explicit-any */

import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { executions, flows } from "../../../../../lib/db/schema";
import { db } from "../../../../../lib/db";

type Params = Promise<{ id: string }>;

type NodeData = Record<string, string>;

async function executeNode(type: string, data: NodeData, input: unknown): Promise<unknown> {
  switch (type) {
    case "trigger":
      return { triggered: true, timestamp: new Date().toISOString() };
    case "ai": {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${data.prompt}\n\nInput: ${JSON.stringify(input)}` }] }],
          }),
        }
      );
      const json = await res.json();
      return { output: json.candidates?.[0]?.content?.parts?.[0]?.text ?? "" };
    }
    case "http": {
      const res = await fetch(data.url, {
        method: data.method ?? "GET",
        headers: data.headers ? JSON.parse(data.headers) : {},
        ...(data.method !== "GET" && { body: JSON.stringify(input) }),
      });
      return res.json();
    }
    case "condition":
      return { passed: JSON.stringify(input).includes(data.contains ?? ""), input };
    case "code": {
      try {
        const fn = new Function("input", data.code ?? "return input;");
        return fn(input);
      } catch (e) {
        return { error: String(e) };
      }
    }
    case "gmail":
      return { sent: false, note: "Gmail OAuth henüz bağlanmadı" };
    default:
      return input;
  }
}

function topoSort(nodes: any[], edges: any[]): any[] {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => { inDegree[n.id] = 0; adj[n.id] = []; });
  edges.forEach((e: any) => {
    adj[e.source]?.push(e.target);
    inDegree[e.target] = (inDegree[e.target] ?? 0) + 1;
  });
  const queue = nodes.filter(n => inDegree[n.id] === 0);
  const result: any[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    adj[node.id]?.forEach(targetId => {
      inDegree[targetId]--;
      if (inDegree[targetId] === 0) {
        const target = nodes.find(n => n.id === targetId);
        if (target) queue.push(target);
      }
    });
  }
  return result;
}

export async function POST(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [flow] = await db.select().from(flows).where(and(eq(flows.id, id), eq(flows.userId, session.user.id)));
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const startTime = Date.now();
  const nodes = flow.nodes as any[];
  const edges = flow.edges as any[];
  const ordered = topoSort(nodes, edges);
  const results: Record<string, unknown> = {};
  const outputs: Record<string, unknown> = {};
  let status = "success";

  try {
    for (const node of ordered) {
      const incomingEdges = edges.filter((e: any) => e.target === node.id);
      const input = incomingEdges.length > 0 ? outputs[incomingEdges[0].source] : {};
      const output = await executeNode(node.type, node.data ?? {}, input);
      outputs[node.id] = output;
      results[node.id] = { type: node.type, label: node.data?.label, output };
    }
  } catch (e) {
    status = "error";
    results["error"] = String(e);
  }

  const duration = Date.now() - startTime;
  const [execution] = await db.insert(executions).values({
    flowId: id,
    userId: session.user.id,
    status,
    results,
    duration,
  }).returning();

  return NextResponse.json({ success: status === "success", executionId: execution.id, results, duration });
}