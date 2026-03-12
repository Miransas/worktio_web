"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Bot, MessageSquare, Database, Send, Zap } from "lucide-react";

export default function WorktioAutomationVideo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Otomasyon adımları verisi
  const steps = [
    { icon: <MessageSquare />, title: "Müşteri Mesajı", desc: "WhatsApp'tan gelen soru" },
    { icon: <Zap />, title: "Yapay Zeka Analizi", desc: "Gemini ile duygu analizi" },
    { icon: <Database />, title: "Veritabanı Kaydı", desc: "Müşteri profili güncellendi" },
    { icon: <Send />, title: "Otomatik Yanıt", desc: "Destek bileti oluşturuldu" },
  ];

  // Otomatik döngü
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 font-sans selection:bg-fuchsia-500/30">
      
      {/* "Video" Çerçevesi (Koyu Tema) */}
      <div className="relative aspect-video bg-[#0a0a0f] rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_0_60px_rgba(0,0,0,0.7)] group">
        
        {/* --- Arka Plan Dinamik Işımalar (Glow Effect) --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 opacity-10 blur-[100px] ${
              activeStep === 1 ? "bg-fuchsia-600" : activeStep === 2 ? "bg-blue-600" : "bg-neutral-800"
            }`}
          />
        </AnimatePresence>

        {/* --- Video Üst Katman (Header & Logo) --- */}
        <div className="absolute top-0 left-0 w-full p-5 flex items-center justify-between z-30 bg-gradient-to-b from-black/50 to-transparent">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-fuchsia-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.5)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter text-white">Worktio <span className="text-fuchsia-400">Flow</span></h1>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">DEMO VİDEO</span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((step) => (
                <div key={step} className={`w-1.5 h-1.5 rounded-full ${activeStep === step ? "bg-fuchsia-500 animate-pulse" : "bg-neutral-700"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* --- ANA VİDEO İÇERİĞİ (Pipeline) --- */}
        <div className="absolute inset-0 flex items-center justify-center p-10 pt-20">
          <div className="flex items-center justify-center gap-1">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Düğüm (Node) */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: activeStep === index ? 1.05 : 1,
                    opacity: 1,
                    borderColor: activeStep === index ? "rgb(217, 70, 239, 0.6)" : "rgb(38, 38, 38)"
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-52 h-36 rounded-2xl border bg-[#111118]/80 backdrop-blur-lg p-5 flex flex-col items-center justify-center text-center shadow-lg relative ${activeStep === index ? "shadow-[0_0_30px_rgba(217,70,239,0.2)]" : ""}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${activeStep === index ? "bg-fuchsia-500/10 text-fuchsia-400" : "bg-neutral-800 text-neutral-500"}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100 mb-1">{step.title}</h3>
                  <p className="text-[11px] text-neutral-400 h-6 leading-tight">{step.desc}</p>

                  {activeStep === index && (
                    <motion.div layoutId="activeGlow" className="absolute inset-0 rounded-2xl border border-fuchsia-500/30 animate-pulse pointer-events-none" />
                  )}
                </motion.div>

                {/* Bağlantı (Connector) */}
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-neutral-800 relative flex items-center">
                    {activeStep === index && (
                      <motion.div
                        initial={{ left: "0%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- Video Kontrolleri (Hover ile görünür) --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-fuchsia-600/90 text-white flex items-center justify-center hover:bg-fuchsia-500 transition-colors shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
          </button>
          
          <div className="flex-1 px-6">
            <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-fuchsia-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </div>
          </div>
          
          <div className="text-sm text-neutral-400 font-mono">
            00:0{activeStep + 1} / 00:0{steps.length}
          </div>
        </div>
        
      </div>

      {/* --- Alt Metin Alanı (Worktio Tanıtımı) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-5">
          Worktio ile İş Akışlarınızı <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-fuchsia-200">Işık Hızında Otokontrol</span> Altına Alın
        </h2>
        <p className="text-lg text-neutral-400 leading-relaxed mb-8">
          Müşteri mesajlarından yapay zeka analizine, veritabanı kayıtlarından otomatik yanıtlamaya kadar tüm süreçlerinizi tek bir platformdan yönetin. Worktio Flow, işletmenizin operasyonel verimliliğini artırmak için tasarlandı.
        </p>
        <button className="px-8 py-3.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center gap-2.5 mx-auto">
          HEMEN ÜCRETSİZ DENE
          <Send className="w-4 h-4" />
        </button>
      </motion.div>

    </div>
  );
}