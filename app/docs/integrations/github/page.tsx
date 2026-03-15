/* eslint-disable react/no-unescaped-entities */
import { Github, Key, ArrowRight } from "lucide-react";

export default function GitHubDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Github size={10} /> Entegrasyon
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">GitHub Entegrasyonu</h1>
        <p className="text-zinc-400 text-lg">GitHub repository'lerinizi flowlarınıza bağlayın.</p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Personal Access Token</h2>
          <p className="text-zinc-400 text-sm mb-4">GitHub entegrasyonu için Personal Access Token gerekir.</p>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { step: "1", text: "GitHub → Settings → Developer Settings gidin" },
              { step: "2", text: "Personal Access Tokens → Generate new token" },
              { step: "3", text: "repo, issues izinlerini seçin" },
              { step: "4", text: "Token'ı kopyalayın" },
              { step: "5", text: "Worktio → Ayarlar → Credentials → GitHub ekleyin" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-3 ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                <span className="w-6 h-6 rounded-full bg-zinc-500/20 text-zinc-300 text-xs flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </span>
                <span className="text-sm text-zinc-400">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Kullanım Örnekleri</h2>
          <div className="space-y-3">
            {[
              { title: "Issue Oluştur", code: `// HTTP node ile\nPOST https://api.github.com/repos/{owner}/{repo}/issues\n{\n  "title": input.title,\n  "body": input.description\n}` },
              { title: "PR Listele", code: `// HTTP node ile\nGET https://api.github.com/repos/{owner}/{repo}/pulls` },
            ].map((ex, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                <div className="font-semibold text-white text-sm mb-3">{ex.title}</div>
                <pre className="text-xs text-zinc-400 overflow-auto">{ex.code}</pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}