import { ArrowRight, Zap, Workflow, Brain } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Docs",
  description: "Worktio dokumantasyonu. Kurulum, Flow Builder, AI Agent rehberleri.",
};

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Zap size={10} /> Dokumantasyon
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">
          Worktio&apos;ya Hos Geldiniz
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Worktio, n8n&apos;den daha guclu bir otomasyon platformudur. Flow Builder ve AI Agent ile tum is sureclerinizi otomatize edin.
        </p>
      </div>

      {/* Hizli baslangic kartlari */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <Zap size={18} className="text-amber-400" />, title: "Hizli Baslangic", desc: "5 dakikada ilk flowunu olustur", href: "/docs/quickstart", bg: "bg-amber-500/10 border-amber-500/20" },
          { icon: <Workflow size={18} className="text-purple-400" />, title: "Flow Builder", desc: "Gorsel otomasyon nasil kurulur", href: "/docs/flow-builder", bg: "bg-purple-500/10 border-purple-500/20" },
          { icon: <Brain size={18} className="text-blue-400" />, title: "AI Agent", desc: "GPT-4o ile akilli ajanlar", href: "/docs/ai-agent", bg: "bg-blue-500/10 border-blue-500/20" },
        ].map(card => (
          <Link key={card.title} href={card.href}
            className={`group flex items-start gap-3 p-4 rounded-xl border ${card.bg} hover:opacity-80 transition-all no-underline`}
          >
            <div className="shrink-0 mt-0.5">{card.icon}</div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">{card.title}</div>
              <div className="text-xs text-zinc-500">{card.desc}</div>
            </div>
            <ArrowRight size={14} className="ml-auto text-zinc-600 group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Worktio Nedir?</h2>
        <p className="text-zinc-400">
          Worktio, gorsel flow builder ve yapay zeka ajanlarini bir araya getiren modern bir otomasyon platformudur.
          n8n&apos;e benzer bir yapiya sahip olmakla birlikte, yerlesik AI Agent sistemi ve daha modern bir arayuz sunar.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Temel Ozellikler</h2>
        <ul className="text-zinc-400 space-y-2 list-disc list-inside">
          <li><strong className="text-zinc-200">Flow Builder:</strong> Surukle birak ile otomasyon akislari olusturun</li>
          <li><strong className="text-zinc-200">AI Agent:</strong> GPT-4o destekli akilli ajanlar ile sohbet edin</li>
          <li><strong className="text-zinc-200">Webhook Trigger:</strong> Dis servislerden flowlarinizi tetikleyin</li>
          <li><strong className="text-zinc-200">Gmail Entegrasyon:</strong> Mail okuyun, gonderin, kategorize edin</li>
          <li><strong className="text-zinc-200">Analytics:</strong> Execution gecmisi ve performans takibi</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Mimari</h2>
        <p className="text-zinc-400">
          Worktio, mikroservis mimarisi uzerine insa edilmistir. Her bir servis bagimsiz olarak olceklenebilir ve yonetilebilir.
        </p>
        <ul className="text-zinc-400 space-y-2 list-disc list-inside">
          <li><strong className="text-zinc-200">API Gateway:</strong> Tum isteklerin giris noktasi</li>
          <li><strong className="text-zinc-200">Flow Engine:</strong> Flow&apos;larin calistirilmasindan sorumlu</li>
          <li><strong className="text-zinc-200">Agent Runtime:</strong> AI ajanlarinin calisma ortami</li>
          <li><strong className="text-zinc-200">Event Bus:</strong> Servisler arasi iletisim</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Guvenlik</h2>
        <p className="text-zinc-400">
          Worktio, guvenlik oncelikli bir yaklasimla gelistirilmistir. Tum veriler sifreli olarak saklanir ve iletilir.
        </p>
        <ul className="text-zinc-400 space-y-2 list-disc list-inside">
          <li><strong className="text-zinc-200">End-to-end Encryption:</strong> Tum veriler AES-256 ile sifrelenir</li>
          <li><strong className="text-zinc-200">OAuth 2.0:</strong> Guvenli kimlik dogrulama</li>
          <li><strong className="text-zinc-200">RBAC:</strong> Rol tabanli erisim kontrolu</li>
          <li><strong className="text-zinc-200">Audit Logs:</strong> Tum islemler kayit altina alinir</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Sonraki Adimlar</h2>
        <p className="text-zinc-400">
          Baslamak icin <Link href="/docs/quickstart" className="text-purple-400 hover:text-purple-300">Hizli Baslangic</Link> rehberini takip edin.
        </p>
      </div>
    </div>
  );
}
