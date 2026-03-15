import { CheckCircle, Zap, Bug, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Worktio güncellemeleri ve yeni özellikler.",
};

const CHANGES = [
  {
    version: "v1.2.0",
    date: "15 Mart 2026",
    type: "feature",
    items: [
      { type: "new", text: "AI Agent — GPT-4o ve GPT-4o-mini desteği eklendi" },
      { type: "new", text: "Execution geçmişi sayfası eklendi" },
      { type: "new", text: "Variables ve Credentials yönetimi eklendi" },
      { type: "improved", text: "Flow Builder node tasarımı yenilendi" },
    ],
  },
  {
    version: "v1.1.0",
    date: "10 Mart 2026",
    type: "feature",
    items: [
      { type: "new", text: "Webhook trigger desteği eklendi" },
      { type: "new", text: "Flow kopyalama özelliği eklendi" },
      { type: "new", text: "Klavye kısayolları eklendi (Ctrl+S, Ctrl+Enter)" },
      { type: "fix", text: "Flow canvas overflow sorunu giderildi" },
    ],
  },
  {
    version: "v1.0.0",
    date: "1 Mart 2026",
    type: "launch",
    items: [
      { type: "new", text: "Flow Builder ilk sürüm yayınlandı" },
      { type: "new", text: "Google OAuth ile giriş" },
      { type: "new", text: "Neon PostgreSQL entegrasyonu" },
      { type: "new", text: "Dashboard ana sayfa" },
    ],
  },
];

const TYPE_ICONS = {
  new: <Sparkles size={12} className="text-purple-400" />,
  improved: <Zap size={12} className="text-amber-400" />,
  fix: <Bug size={12} className="text-red-400" />,
};

const TYPE_COLORS = {
  new: "text-purple-300",
  improved: "text-amber-300",
  fix: "text-red-300",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-white mb-3">Changelog</h1>
          <p className="text-zinc-500">Worktio&rsquo;daki tüm güncellemeler ve yeni özellikler.</p>
        </div>

        <div className="relative">
          {/* Timeline çizgisi */}
          <div className="absolute left-3 top-2 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-10">
            {CHANGES.map((change, i) => (
              <div key={i} className="relative pl-10">
                {/* Timeline nokta */}
                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center">
                  <CheckCircle size={12} className="text-purple-400" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-black text-white">{change.version}</span>
                  <span className="text-xs text-zinc-600">{change.date}</span>
                  {change.type === "launch" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      🚀 İlk Sürüm
                    </span>
                  )}
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  {change.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className="shrink-0 mt-0.5">
                        {TYPE_ICONS[item.type as keyof typeof TYPE_ICONS]}
                      </div>
                      <span className={`text-sm ${TYPE_COLORS[item.type as keyof typeof TYPE_COLORS]}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}