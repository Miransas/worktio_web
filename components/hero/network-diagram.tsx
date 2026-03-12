"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Loader2,
  Database,
  Play,
  Pause,
  RotateCcw,
  X,
  Terminal
} from "lucide-react";

// --- SAHTE DETAY VERİLERİ (Modal içinde gösterilecek) ---
const nodeDetails = {
  1: {
    title: "Telegram Webhook",
    status: "Dinleniyor...",
    code: `{\n  "update_id": 87654321,\n  "message": {\n    "message_id": 102,\n    "from": {\n      "id": 12345678,\n      "is_bot": false,\n      "first_name": "Usta"\n    },\n    "text": "/start otomasyon"\n  }\n}`,
    language: "json"
  },
  2: {
    title: "Gemini Engine",
    status: "İşleniyor...",
    code: `import { GoogleGenerativeAI } from "@google/generative-ai";\n\nconst genAI = new GoogleGenerativeAI(API_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n\nconst prompt = "Kullanıcı '/start otomasyon' dedi. Yanıtla.";\nconst result = await model.generateContent(prompt);\nconsole.log(result.response.text());`,
    language: "javascript"
  },
  3: {
    title: "Neon DB & Drizzle",
    status: "Veritabanına Yazılıyor...",
    code: `INSERT INTO "logs" ("id", "user_id", "action", "timestamp") \nVALUES (DEFAULT, 12345678, '/start otomasyon', now())\nRETURNING "id";\n\n-- [Neon Serverless Driver] Query executed in 12ms`,
    language: "sql"
  },
  4: {
    title: "API Response",
    status: "Başarılı",
    code: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "ok": true,\n  "result": {\n    "message_id": 103,\n    "text": "Merhaba Usta! Sistem aktif, veriler işleniyor 🚀"\n  }\n}`,
    language: "json"
  }
};

export default function AutomationFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<number | null>(null); // Hangi düğümün tıklandığını tutar

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setActiveStep(1);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#07070a] text-white p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Üst Başlık ve Kontrol Paneli */}
     

      {/* Akış Konteyneri */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-2 lg:gap-0 relative z-0">
        <AutomationNode id={1} title="Telegram Webhook" icon={<MessageCircle className="w-6 h-6" />} isActive={activeStep === 1} isCompleted={activeStep > 1} theme="blue" onClick={() => setSelectedNode(1)} />
        <FlowConnector isActive={activeStep === 1} />
        <AutomationNode id={2} title="Gemini Engine" icon={<Sparkles className="w-6 h-6" />} isActive={activeStep === 2} isCompleted={activeStep > 2} theme="fuchsia" onClick={() => setSelectedNode(2)} />
        <FlowConnector isActive={activeStep === 2} />
        <AutomationNode id={3} title="Neon DB" icon={<Database className="w-6 h-6" />} isActive={activeStep === 3} isCompleted={activeStep > 3} theme="emerald" onClick={() => setSelectedNode(3)} />
        <FlowConnector isActive={activeStep === 3} />
        <AutomationNode id={4} title="API Response" icon={<Send className="w-6 h-6" />} isActive={activeStep === 4} isCompleted={activeStep > 4} theme="amber" onClick={() => setSelectedNode(4)} />
      </div>

      {/* Detay Modalı (Tıklanan Düğümü Gösterir) */}
      <AnimatePresence>
        {selectedNode !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Arka plan bulanıklığı (Tıklayınca kapanır) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedNode(null)}
            />
            
            {/* Modal Kutusu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#0d0d12] border border-neutral-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Modal Başlık */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-neutral-400" />
                  <h3 className="text-lg font-semibold text-neutral-200">
                    {nodeDetails[selectedNode as keyof typeof nodeDetails].title} Logs
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal İçerik (Kod Alanı) */}
              <div className="p-6 bg-[#0a0a0f]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                    Durum: {nodeDetails[selectedNode as keyof typeof nodeDetails].status}
                  </span>
                </div>
                
                <div className="relative group rounded-xl overflow-hidden border border-neutral-800 bg-[#050508]">
                  <div className="absolute top-0 left-0 w-full h-8 bg-neutral-900/40 border-b border-neutral-800 flex items-center px-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="ml-4 text-[10px] text-neutral-500 font-mono">
                      {nodeDetails[selectedNode as keyof typeof nodeDetails].language}
                    </span>
                  </div>
                  <pre className="p-4 pt-10 text-sm font-mono text-neutral-300 overflow-x-auto">
                    <code>{nodeDetails[selectedNode as keyof typeof nodeDetails].code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- ALT BİLEŞENLER ---

function AutomationNode({ 
  id, title, icon, isActive, isCompleted, theme, onClick 
}: { 
  id: number; title: string; icon: React.ReactNode; isActive: boolean; isCompleted: boolean;
  theme: "blue" | "fuchsia" | "emerald" | "amber"; onClick: () => void;
}) {
  
  const themes = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]", hover: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" },
    fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-400", glow: "shadow-[0_0_30px_rgba(217,70,239,0.15)]", hover: "hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]", hover: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]", hover: "hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]" },
  };

  const currentTheme = themes[theme];

  return (
    <div 
      onClick={onClick}
      className={`relative flex flex-col items-center w-64 p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${currentTheme.hover} ${
      isActive ? `bg-neutral-800/80 border-neutral-500 scale-105 ${currentTheme.glow} z-10` : 
      isCompleted ? "bg-neutral-900/40 border-neutral-700 scale-100 opacity-80" : "bg-neutral-900/20 border-neutral-800/50 scale-95 opacity-60"
    }`}>
      <div className="absolute top-3 right-3 text-[10px] font-bold text-neutral-600 bg-neutral-800/50 px-2 py-1 rounded-md">STEP 0{id}</div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mt-2 mb-4 border transition-colors duration-500 ${
        isActive || isCompleted ? `${currentTheme.bg} ${currentTheme.border} ${currentTheme.text}` : "bg-neutral-800 border-neutral-700 text-neutral-500"
      }`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-100 mb-4">{title}</h3>
      <div className="h-8 flex items-center justify-center w-full rounded-lg bg-black/30">
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div key="completed" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center text-xs font-semibold gap-1.5 ${currentTheme.text}`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> BAŞARILI
            </motion.div>
          ) : isActive ? (
            <motion.div key="active" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center text-xs font-semibold gap-2 ${currentTheme.text}`}>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> İŞLENİYOR
            </motion.div>
          ) : (
            <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neutral-500 text-xs font-semibold">BEKLİYOR</motion.div>
          )}
        </AnimatePresence>
      </div>
      {isActive && <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none animate-pulse"></div>}
    </div>
  );
}

function FlowConnector({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-8 h-12 lg:w-16 lg:h-8 shrink-0">
      <div className="absolute w-0.5 h-full lg:w-full lg:h-0.5 bg-neutral-800/80 rounded-full" />
      {isActive && (
        <>
          <motion.div
            className="lg:hidden absolute bg-white rounded-full shadow-[0_0_10px_#fff] z-10"
            style={{ width: '4px', height: '4px' }}
            initial={{ x: 0, y: -20, opacity: 0 }}
            animate={{ x: 0, y: [-20, 20], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <div className="hidden lg:block absolute w-2 h-1 bg-white rounded-full shadow-[0_0_12px_#fff] z-10 animate-[horizontalFlow_1.2s_linear_infinite]" />
        </>
      )}
      <style>{`
        @keyframes horizontalFlow {
          0% { transform: translateX(-24px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(24px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}