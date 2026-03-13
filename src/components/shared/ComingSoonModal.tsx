"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ComingSoonModal() {
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Yüzdelik dilimi 99'a kadar dolduran animasyon
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 99) {
          clearInterval(timer);
          return 99;
        }
        const diff = Math.random() * 8;
        return Math.min(oldProgress + diff, 99);
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  // Form Gönderme Simülasyonu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Yazdığımız API'ye POST isteği atıyoruz
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true); // Başarılıysa tik işaretli onay ekranını göster
      } else {
        console.error("Hata:", data.error);
        alert("Bir hata oluştu, lütfen tekrar dene.");
      }
    } catch (error) {
      console.error("İstek başarısız:", error);
    }
  };

  return (
    // Z-index 9999 ile tüm sitenin üzerine binen, arkası bulanık kilit katmanı
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07070a]/80 backdrop-blur-xl p-4 selection:bg-fuchsia-500/30">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-[#0a0a0f]/95 border border-neutral-800/80 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden p-8 text-center"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-fuchsia-500/20 blur-[50px] rounded-full pointer-events-none"></div>

        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-16 h-16 bg-neutral-900 border border-neutral-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative"
        >
          <div className="absolute inset-0 bg-fuchsia-500/10 rounded-2xl animate-pulse"></div>
          <Rocket className="w-8 h-8 text-fuchsia-400" />
        </motion.div>

        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">
          Worktio <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400">Coming Soon</span>
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
         We&apos;re putting the finishing touches on the system to make it perfect. We&rsquo;ll be here very soon! Be the first to know when it launches.
        </p>

        {/* Email Toplama Formu */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="relative flex items-center w-full"
              >
                <Mail className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" />
                <input 
                  type="email" 
                  required
                  placeholder="E-posta adresin..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-700 text-neutral-200 text-sm rounded-xl pl-11 pr-32 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Let me know <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium"
              >
                <CheckCircle2 className="w-5 h-5" /> We&#39;ve registered you! We&lsquo;ll send you an email when the system is up and running.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Yükleme Çubuğu */}
        <div className="text-left">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Sistem almost ready
            </div>
            <div className="text-fuchsia-400 font-mono text-sm font-bold">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-fuchsia-500 relative"
              initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-[2px]"></div>
            </motion.div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-400 mt-6">
          <Lock className="w-3.5 h-3.5" />
          <span>The system is currently closed to external access..</span>
        </div>
      </motion.div>
    </div>
  );
}