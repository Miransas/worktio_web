import { Mail, Shield, ArrowRight } from "lucide-react";

export default function GmailDocsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
          <Mail size={10} /> Entegrasyon
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Gmail Entegrasyonu</h1>
        <p className="text-zinc-400 text-lg">Gmail&#39;i okuyun, gönderin ve otomatize edin.</p>
      </div>

      <div className="space-y-10">
        <section>
          <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-6">
            <Shield size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-300">
              Gmail entegrasyonu OAuth2 gerektirir. Credentials sayfasından Gmail bağlantısı kurmanız gerekir.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Bağlantı Kurma</h2>
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { step: "1", text: "Dashboard → Ayarlar → Credentials sayfasına gidin" },
              { step: "2", text: "\"Yeni Credential\" → Gmail seçin" },
              { step: "3", text: "Google hesabınızla OAuth onayı verin" },
              { step: "4", text: "Flow Builder'da Gmail node'unu ekleyin" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-3 ${i !== 0 ? "border-t border-white/[0.04]" : ""}`}>
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </span>
                <span className="text-sm text-zinc-400">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Gmail Node Ayarları</h2>
          <div className="space-y-3">
            {[
              { field: "Alıcı (to)", desc: "Mail gönderilecek adres. Dinamik: input.email", example: "ornek@gmail.com" },
              { field: "Konu (subject)", desc: "Mail konusu. Dinamik değer kullanabilirsiniz.", example: "Otomatik Bildirim" },
              { field: "İçerik (body)", desc: "Mail içeriği. HTML desteklenir.", example: "Merhaba {{input.name}}" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="font-semibold text-white text-sm mb-1">{item.field}</div>
                <div className="text-xs text-zinc-500 mb-2">{item.desc}</div>
                <code className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded">{item.example}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}