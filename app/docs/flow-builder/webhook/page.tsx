/* eslint-disable react/no-unescaped-entities */
import { Webhook, Copy, Check } from "lucide-react";

export default function WebhookDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Webhook size={10} /> Webhook
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Webhook Trigger</h1>
        <p className="text-zinc-400 text-lg">Dış servislerden flowlarınızı tetikleyin.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Webhook Nedir?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Webhook, dış bir servisin HTTP POST isteği göndererek flowunuzu tetiklemesini sağlar. Her flow'un benzersiz bir webhook URL'si vardır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Webhook URL</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Flow Builder'da sol panelin altında webhook URL'nizi bulabilirsiniz:
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center gap-2 bg-black/40 rounded-lg px-3 py-2 font-mono text-xs text-zinc-400">
              <code>https://worktio.com/api/webhooks/{"<flow-id>"}</code>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Webhook Tetikleme</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Webhook URL'nize POST isteği gönderin:
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <pre className="text-xs text-zinc-400 overflow-auto">{`curl -X POST https://worktio.com/api/webhooks/<flow-id> \\
  -H "Content-Type: application/json" \\
  -d '{"event": "new_order", "data": {"id": 123}}'`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Webhook Payload</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Gönderilen payload, flow içinde <code className="bg-white/5 px-1.5 py-0.5 rounded text-purple-300">input</code> değişkeni olarak erişilebilir:
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <pre className="text-xs text-zinc-400 overflow-auto">{`// Kod node'unda:
console.log(input.event);  // "new_order"
console.log(input.data.id); // 123

return {
  processed: true,
  orderId: input.data.id
};`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Trigger Node Ayarları</h2>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { field: "Tetikleyici Tipi", value: "Webhook olarak seçin" },
              { field: "Method", value: "POST (varsayılan)" },
              { field: "Response", value: "Flow tamamlanınca döner" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-3 ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                <span className="text-sm text-zinc-400">{item.field}</span>
                <span className="text-sm text-zinc-300">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}