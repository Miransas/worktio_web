import { Code2, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

const ENDPOINTS = [
  {
    method: "GET", path: "/api/flows",
    desc: "Tüm flowları listeler",
    response: `[{ "id": "uuid", "name": "string", "nodes": [], "edges": [] }]`
  },
  {
    method: "POST", path: "/api/flows",
    desc: "Yeni flow oluşturur",
    body: `{ "name": "string", "nodes": [], "edges": [] }`
  },
  {
    method: "PATCH", path: "/api/flows/:id",
    desc: "Flow günceller",
    body: `{ "name": "string", "nodes": [], "edges": [] }`
  },
  {
    method: "DELETE", path: "/api/flows/:id",
    desc: "Flow siler",
    response: `{ "success": true }`
  },
  {
    method: "POST", path: "/api/flows/:id/run",
    desc: "Flow'u çalıştırır",
    response: `{ "success": true, "results": {}, "duration": 234 }`
  },
  {
    method: "GET", path: "/api/agents",
    desc: "Tüm agentları listeler",
    response: `[{ "id": "uuid", "name": "string", "model": "gpt-4o" }]`
  },
  {
    method: "POST", path: "/api/agents/:id/chat",
    desc: "Agent'a mesaj gönderir",
    body: `{ "content": "string" }`
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PATCH: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function APIDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Code2 size={10} /> API
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">API Referansı</h1>
        <p className="text-zinc-400 text-lg">Worktio REST API dokümantasyonu.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Authentication</h2>
          <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-4">
            <Lock size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-300">
              Tüm API endpoint&rsquo;leri session authentication gerektirir. NextAuth.js cookie ile otomatik yönetilir.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Endpoints</h2>
          <div className="space-y-3">
            {ENDPOINTS.map((ep, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04]">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${METHOD_COLORS[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-zinc-300 font-mono">{ep.path}</code>
                  <span className="text-xs text-zinc-600 ml-auto">{ep.desc}</span>
                </div>
                {(ep.body || ep.response) && (
                  <div className="px-5 py-3">
                    {ep.body && (
                      <div className="mb-2">
                        <div className="text-xs text-zinc-600 mb-1">Request Body:</div>
                        <pre className="text-xs text-zinc-400 overflow-auto">{ep.body}</pre>
                      </div>
                    )}
                    {ep.response && (
                      <div>
                        <div className="text-xs text-zinc-600 mb-1">Response:</div>
                        <pre className="text-xs text-zinc-400 overflow-auto">{ep.response}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Webhook Endpoint</h2>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold px-2 py-1 rounded border bg-blue-500/10 text-blue-400 border-blue-500/20">POST</span>
              <code className="text-sm text-zinc-300 font-mono">/api/webhooks/:flowId</code>
            </div>
            <p className="text-xs text-zinc-500 mb-3">Dış servislerden flow tetiklemek için kullanılır. Authentication gerektirmez.</p>
            <pre className="text-xs text-zinc-400">{`// Örnek istek:
curl -X POST https://worktio.com/api/webhooks/<flowId> \\
  -H "Content-Type: application/json" \\
  -d '{"event": "new_user", "userId": 123}'`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}