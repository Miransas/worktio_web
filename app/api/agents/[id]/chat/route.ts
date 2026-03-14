/* eslint-disable @typescript-eslint/no-explicit-any */

import { eq, and, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { agents, messages } from "../../../../../lib/db/schema";
import { db } from "../../../../../lib/db";
import { tavily } from "@tavily/core";

type Params = Promise<{ id: string }>;

async function executeTool(tool: string, args: Record<string, string>): Promise<string> {
  switch (tool) {
    case "web_search": {
      const { tavily } = await import("@tavily/core");
      const client = tavily({ apiKey: process.env.TAVILY_API_KEY! });
      const res = await client.search(args.query, { maxResults: 5 });
      return res.results.map(r => `${r.title}: ${r.content}`).join("\n\n");
    }
    case "http": {
      const res = await fetch(args.url, { method: args.method ?? "GET" });
      return (await res.text()).slice(0, 1000);
    }
    case "code": {
      try {
        const fn = new Function(args.code ?? "return 'ok'");
        return String(fn());
      } catch (e) {
        return `Hata: ${String(e)}`;
      }
    }
    case "flow": {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/flows/${args.flowId}/run`, { method: "POST" });
      const data = await res.json();
      return JSON.stringify(data.results);
    }
    case "gmail":
      return "Gmail henüz bağlanmadı.";
    default:
      return "Bilinmeyen tool";
  }
}

async function callOpenAI(
  history: { role: string; content: string }[],
  systemPrompt: string,
  model: string,
  tools: string[]
) {
  const toolDefs = tools.map(t => ({
    type: "function",
    function: {
      name: t,
      description: {
        web_search: "İnternette arama yapar",
        http: "HTTP isteği gönderir",
        code: "JavaScript kodu çalıştırır",
        flow: "Bir flow'u tetikler",
        gmail: "Gmail okur veya gönderir",
      }[t] ?? t,
      parameters: {
        type: "object",
        properties: {
          ...(t === "web_search" ? { query: { type: "string" } } : {}),
          ...(t === "http" ? { url: { type: "string" }, method: { type: "string" } } : {}),
          ...(t === "code" ? { code: { type: "string" } } : {}),
          ...(t === "flow" ? { flowId: { type: "string" } } : {}),
        },
      },
    },
  }));

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...history],
      ...(toolDefs.length > 0 ? { tools: toolDefs } : {}),
    }),
  });
  return res.json();
}

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const history = await db.select().from(messages)
    .where(and(eq(messages.agentId, id), eq(messages.userId, session.user.id)))
    .orderBy(asc(messages.createdAt));
  return NextResponse.json(history);
}

export async function POST(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();

  const [agent] = await db.select().from(agents)
    .where(and(eq(agents.id, id), eq(agents.userId, session.user.id)));
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.insert(messages).values({
    agentId: id,
    userId: session.user.id,
    role: "user",
    content,
  });

  const history = await db.select().from(messages)
    .where(eq(messages.agentId, id))
    .orderBy(asc(messages.createdAt));

  const formattedHistory = history.map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  }));

  const agentTools = agent.tools as string[];
  const toolCalls: { tool: string; args: any; result: string }[] = [];
  let responseText = "";

  // ... history çekme işlemleri ...

  const data = await callOpenAI(formattedHistory, agent.systemPrompt, agent.model, agentTools);
  const choice = data.choices?.[0];


  if (choice?.message?.tool_calls) {
    const toolCallsList = choice.message.tool_calls;
    const toolMsgs: any[] = [];
    
    // Her bir tool için işlem yap
    for (const tc of toolCallsList) {
      const args = JSON.parse(tc.function.arguments || "{}");
      const result = await executeTool(tc.function.name, args);
      
      toolCalls.push({ tool: tc.function.name, args, result }); // Veritabanına kaydetmek için

      // OpenAI'ın tam olarak beklediği "Tool Yanıtı" formatı
      toolMsgs.push({
        role: "tool",
        tool_call_id: tc.id, // DİKKAT: Tool ismi değil, benzersiz ID!
        name: tc.function.name,
        content: String(result), // İçerik her zaman string olmalı
      });
    }

    // İkinci çağrıyı yap (Asistanın tool çağrısı mesajını da araya eklemek ZORUNLUDUR)
    const data2 = await callOpenAI(
      [
        ...formattedHistory, 
        choice.message, // Modelin "ben tool çağırıyorum" dediği mesaj
        ...toolMsgs    // Bizim "al bu da sonuçları" dediğimiz mesajlar
      ],
      agent.systemPrompt, 
      agent.model, 
      [] // İkinci turda tool göndermiyoruz ki sonsuz döngüye girmesin
    );
    
    responseText = data2.choices?.[0]?.message?.content || "Tool işlemi tamamlandı ancak bir yanıt oluşturulamadı.";
  } else {
    // Tool kullanılmadıysa direkt cevabı al
    responseText = choice?.message?.content || "";
  }

  const [saved] = await db.insert(messages).values({
    agentId: id,
    userId: session.user.id,
    role: "assistant",
    content: responseText,
    toolCall: toolCalls.length > 0 ? toolCalls : null,
  }).returning();

  return NextResponse.json({ message: saved, toolCalls });
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db.delete(messages).where(eq(messages.agentId, id));
  return NextResponse.json({ success: true });
}