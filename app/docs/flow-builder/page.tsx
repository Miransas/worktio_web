/* eslint-disable react/no-unescaped-entities */
import { Workflow, Zap, GitBranch, Globe, Code2, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const NODES = [
  { icon: <Zap size={16} className="text-amber-400" />, name: "Trigger", desc: "Flow'u başlatan node. Manuel, webhook veya zamanlayıcı ile tetiklenir.", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: <Workflow size={16} className="text-purple-400" />, name: "AI / Gemini", desc: "GPT-4o veya Gemini ile AI işlemleri yapar. Prompt ve çıktı yapılandırılabilir.", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: <Globe size={16} className="text-blue-400" />, name: "HTTP İstek", desc: "Herhangi bir API'ye GET/POST/PUT/DELETE isteği gönderir.", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: <GitBranch size={16} className="text-emerald-400" />, name: "Koşul", desc: "If/else mantığı ile flow'u farklı yönlere ayırır.", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: <Code2 size={16} className="text-rose-400" />, name: "Kod Çalıştır", desc: "JavaScript kodu çalıştırır. input değişkeni ile önceki node çıktısına erişin.", bg: "bg-rose-500/10 border-rose-500/20" },
  { icon: <Mail size={16} className="text-red-400" />, name: "Gmail", desc: "Mail okur, gönderir ve kategorize eder. OAuth bağlantısı gerektirir.", bg: "bg-red-500/10 border-red-500/20" },
];

export default function FlowBuilderDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Workflow size={10} /> Flow Builder
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Flow Builder</h1>
        <p className="text-zinc-400 text-lg">Görsel otomasyon akışları oluşturun ve yönetin.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Flow Nedir?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Flow, birbirine bağlı node'lardan oluşan bir otomasyon akışıdır. Her node belirli bir işlem yapar ve çıktısını bir sonraki node'a aktarır. Flow'lar tetiklendiğinde soldan sağa doğru çalışır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Node Tipleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NODES.map(node => (
              <div key={node.name} className={`flex items-start gap-3 p-4 rounded-xl border ${node.bg}`}>
                <div className="shrink-0 mt-0.5">{node.icon}</div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{node.name}</div>
                  <div className="text-xs text-zinc-500">{node.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Execution Mantığı</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Flow çalıştığında node'lar sırayla execute edilir. Her node önceki node'un çıktısını <code className="bg-white/5 px-1.5 py-0.5 rounded text-purple-300">input</code> olarak alır.
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <pre className="text-xs text-zinc-400 overflow-auto">{`// Kod node örneği
const result = {
  message: "Merhaba " + input.name,
  timestamp: new Date().toISOString()
};
return result;`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Klavye Kısayolları</h2>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { key: "Ctrl + S", desc: "Flow'u kaydet" },
              { key: "Ctrl + Enter", desc: "Flow'u çalıştır" },
              { key: "Esc", desc: "Config panelini kapat" },
              { key: "Delete", desc: "Seçili node'u sil" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-3 ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                <span className="text-sm text-zinc-400">{item.desc}</span>
                <kbd className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-zinc-300 font-mono">{item.key}</kbd>
              </div>
            ))}
          </div>
        </section>

        <Link href="/docs/flow-builder/webhook"
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Webhook Trigger <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}