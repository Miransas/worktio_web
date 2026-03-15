/* eslint-disable react/no-unescaped-entities */
import { Zap, Check, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Zap size={10} /> Başlangıç
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Kurulum</h1>
        <p className="text-zinc-400 text-lg">Worktio'yu 5 dakikada kurun ve ilk flowunuzu oluşturun.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">1</span>
            Google ile Giriş Yapın
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Worktio, Google OAuth ile çalışır. Herhangi bir şifre oluşturmanıza gerek yok.
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <ol className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> <Link href="/dashboard" className="text-purple-400 hover:text-purple-300">worktio.com/dashboard</Link> adresine gidin</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> "Google ile Giriş Yap" butonuna tıklayın</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Google hesabınızı seçin</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Dashboard'a yönlendirilirsiniz</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">2</span>
            İlk Flowunuzu Oluşturun
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Sol menüden <strong className="text-zinc-200">Flow Builder</strong>'a gidin ve <strong className="text-zinc-200">Yeni Flow</strong> butonuna tıklayın.
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <ol className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Sol panelden <strong className="text-zinc-200">Trigger</strong> node'u ekleyin</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> <strong className="text-zinc-200">AI / Gemini</strong> node'u ekleyin ve bağlayın</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> AI node'una prompt yazın</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> <strong className="text-zinc-200">Çalıştır</strong> butonuna tıklayın</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold">3</span>
            İlk AI Agent'ınızı Kurun
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Sol menüden <strong className="text-zinc-200">Sohbet</strong>'e gidin ve <strong className="text-zinc-200">+</strong> butonuna tıklayın.
          </p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
            <ol className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Agent adı girin</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Model seçin (GPT-4o önerilir)</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Sistem prompt yazın</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> İstediğiniz tool'ları aktif edin</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400 shrink-0" /> Sohbet başlatın</li>
            </ol>
          </div>
        </section>

        <div className="flex gap-4 pt-4">
          <Link href="/docs/flow-builder"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Flow Builder Rehberi <ArrowRight size={14} />
          </Link>
          <Link href="/docs/ai-agent"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            AI Agent Rehberi <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}