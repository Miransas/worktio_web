/* eslint-disable react/no-unescaped-entities */
import { Brain, Globe, Code2, Mail, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  { icon: <Globe size={14} className="text-blue-400" />, name: "web_search", desc: "İnternette arama yapar. Tavily API kullanır.", param: "query: string" },
  { icon: <Code2 size={14} className="text-rose-400" />, name: "code", desc: "JavaScript kodu çalıştırır.", param: "code: string" },
  { icon: <Mail size={14} className="text-red-400" />, name: "gmail", desc: "Gmail okur ve gönderir. OAuth gerektirir.", param: "to, subject, body" },
  { icon: <Zap size={14} className="text-amber-400" />, name: "flow", desc: "Bir flow'u tetikler.", param: "flowId: string" },
  { icon: <Globe size={14} className="text-emerald-400" />, name: "http", desc: "HTTP isteği gönderir.", param: "url, method" },
];

export default function AIAgentDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Brain size={10} /> AI Agent
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">AI Agent</h1>
        <p className="text-zinc-400 text-lg">GPT-4o destekli akıllı ajanlar oluşturun.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Agent Nedir?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Agent, belirli bir sistem prompt ve tool seti ile yapılandırılmış bir AI asistanıdır. Kullanıcı mesajlarına yanıt verir, gerektiğinde tool'ları kullanır ve sonuçları raporlar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Sistem Prompt</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Sistem prompt, agent'ın nasıl davranacağını belirler. İyi bir sistem prompt şunları içermelidir:
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <pre className="text-xs text-zinc-400 whitespace-pre-wrap">{`Sen Worktio'nun müşteri destek asistanısın.
Görevin: Kullanıcıların otomasyon sorunlarını çözmek.
Ton: Yardımsever, net ve kısa.
Kurallar:
- Teknik detayları sadece sorulduğunda ver
- Her zaman Türkçe yanıt ver
- Flow Builder sorunlarında /docs/flow-builder linkini öner`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Tool'lar</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Agent'lar çeşitli tool'lar kullanabilir. Her tool, agent'ın gerçek dünya işlemleri yapmasını sağlar.
          </p>
          <div className="space-y-2">
            {TOOLS.map(tool => (
              <div key={tool.name} className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="shrink-0 mt-0.5">{tool.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="text-sm text-purple-300 font-mono">{tool.name}</code>
                    <code className="text-xs text-zinc-600 font-mono">{tool.param}</code>
                  </div>
                  <div className="text-xs text-zinc-500">{tool.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Desteklenen Modeller</h2>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { model: "gpt-4o", desc: "En güçlü model. Karmaşık görevler için.", recommended: true },
              { model: "gpt-4o-mini", desc: "Daha hızlı ve ucuz. Basit görevler için.", recommended: false },
            ].map((m, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-3 ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                <div>
                  <code className="text-sm text-purple-300 font-mono">{m.model}</code>
                  <div className="text-xs text-zinc-600 mt-0.5">{m.desc}</div>
                </div>
                {m.recommended && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Önerilen
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <Link href="/docs/ai-agent/tools"
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Tool&rsquo;lar hakkında daha fazla <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}