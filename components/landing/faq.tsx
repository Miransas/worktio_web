"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "n8n'den farkı ne?",
    a: "Worktio'nun yerleşik AI Agent sistemi var. GPT-4o ile doğrudan konuşabilir, flowlarınızı tetikleyebilirsiniz. n8n'de bu özellik yok. Ayrıca Worktio daha modern bir UI ve daha hızlı execution engine sunuyor.",
  },
  {
    q: "Ücretsiz plan ne kadar sürer?",
    a: "Süresiz ücretsiz. 1000 execution/ay ve 5 flow ile başlayın, büyüdükçe Pro veya Enterprise'a geçin. Kredi kartı gerekmez.",
  },
  {
    q: "Hangi entegrasyonlar var?",
    a: "Gmail, GitHub, Slack, Webhook, HTTP API ve daha fazlası. Her ay yeni entegrasyon ekliyoruz. Eksik entegrasyon için destek ekibimize yazabilirsiniz.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Tüm veriler Neon PostgreSQL'de şifreli saklanır. GDPR uyumlu altyapı kullanıyoruz. Credentials ve API key'ler ayrıca encrypt edilir.",
  },
  {
    q: "Flow çalıştırma limiti aşılırsa ne olur?",
    a: "Free planda 1000 execution/ay hakkınız var. Limit dolunca flowlar duraklatılır, siz de Pro'ya geçene kadar beklenir. Otomatik ücretlendirme yapılmaz.",
  },
  {
    q: "Teknik destek var mı?",
    a: "Free planda topluluk desteği, Pro'da email desteği, Enterprise'da öncelikli destek ve SLA garantisi sunuyoruz.",
  },
];

function FaqItem({ item, i }: { item: typeof FAQ[0]; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06 }}
      className="border border-white/[0.06] rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-zinc-200 text-sm pr-4">{item.q}</span>
        <ChevronDown
          size={16}
          className={`text-zinc-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="faq" className="py-32 px-6 bg-[#030303]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Sık sorulan{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              sorular
            </span>
          </h2>
          <p className="text-zinc-500">Aklınızdaki soruların cevapları burada.</p>
        </motion.div>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}