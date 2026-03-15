/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Brain, Bot, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Küçük Badge Bileşenleri ---
const AiBadge = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 mx-1 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 align-middle">
    GEN-AI
  </span>
);

const Beam = ({ d, color, delay }: { d: string; color: string; delay: number }) => (
  <g>
    <path d={d} className="stroke-white/5" strokeWidth="1" fill="none" strokeLinecap="round" />
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 0.5, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
    <motion.circle
      r="2.5"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      style={{
        offsetPath: `path("${d}")`,
        animation: `travel-${delay.toString().replace(".", "")} 2s ${delay}s ease-in-out infinite`,
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    />
    <style>{`
      @keyframes travel-${delay.toString().replace(".", "")} {
        0%   { offset-distance: 0%; opacity: 0; }
        10%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }
    `}</style>
  </g>
);

const BEAM_PATHS = [
  { d: "M 450 50 C 450 110, 155 110, 155 165", color: "#A855F7", delay: 0 }, 
  { d: "M 450 50 L 450 165",                   color: "#3B82F6", delay: 0.75 }, 
  { d: "M 450 50 C 450 110, 745 110, 745 165", color: "#10B981", delay: 1.5 }, 
];

const CircuitBeams = () => (
  <svg
    viewBox="0 0 900 220"
    className="absolute top-0 left-0 w-full h-[220px] pointer-events-none overflow-visible z-[6]"
    preserveAspectRatio="xMidYMid meet"
  >
    {BEAM_PATHS.map((b, i) => (
      <Beam key={i} d={b.d} color={b.color} delay={b.delay} />
    ))}
  </svg>
);

const BorderBeam = ({ color, active, duration = 1.8 }: { color: string; active: boolean; duration?: number }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none z-[2]">
      <style>{` @keyframes beam-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } `}</style>
      <div 
        className="absolute inset-[-4px] rounded-[18px]"
        style={{
          background: `conic-gradient(from 0deg, transparent 300deg, ${color} 340deg, white 350deg, ${color} 360deg)`,
          animation: `beam-spin ${duration}s linear infinite`,
        }} 
      />
      <div className="absolute inset-[1.5px] rounded-[15px] bg-neutral-950" />
    </div>
  );
};

// --- OTOMASYON AJANLARI İÇİN YENİ KARTLAR ---
const CARDS = [
  {
    icon: <Brain className="text-purple-500" size={30} />,
    title: "Agentic Reasoning",
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.18)",
    desc: <>LLM tabanlı karar mekanizmaları. Karmaşık görevleri alt parçalara bölen ve <AiBadge /> destekli mantıksal akışlar kuran ajan mimarisi.</>,
    link: "/automation/reasoning",
  },
  {
    icon: <Bot className="text-blue-500" size={30} />,
    title: "Autonomous Execution",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.22)",
    desc: <>API ve araçlar üzerinden kendi kendine işlem yapan operasyonel ajanlar. Gerçek zamanlı hata düzeltme ve otonom iş yürütme kapasitesi.</>,
    link: "/automation/execution",
  },
  {
    icon: <Cpu className="text-emerald-500" size={30} />,
    title: "RAG & Data Pipeline",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.18)",
    desc: <>Vektör veritabanları ile entegre, bağlam farkındalığı yüksek bilgi akışları. Ajanların doğru veriyle, doğru zamanda buluştuğu otomasyon köprüsü.</>,
    link: "/automation/data",
  },
];

const Card = ({ card, index, hovered, setHovered, beamActive }: any) => {
  const active = hovered === index;
  const router = useRouter();

  const handleCardClick = () => {
    if (card.link) router.push(card.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered(1)}
      onClick={handleCardClick}
      className={cn(
        "flex-1 min-w-[320px] max-w-[400px] p-8 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group",
        "bg-gradient-to-br from-neutral-900 to-black border",
        active || beamActive ? "border-transparent" : "border-neutral-800",
        active && "shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      )}
      style={{ borderColor: active || beamActive ? card.accent : undefined }}
    >
      <BorderBeam color={card.accent} active={beamActive || active} duration={beamActive ? 1.5 : 2.5} />

      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-[4]">
        <div className="mb-6 drop-shadow-[0_0_8px_currentColor] transition-transform duration-300 group-hover:scale-110">{card.icon}</div>
        <div className="flex items-center mb-2">
          <span className="text-white text-md font-bold tracking-wider uppercase font-mono">{card.title}</span>
          <motion.span 
            animate={{ x: active ? 4 : 0, y: active ? -4 : 0 }}
            className="text-neutral-600 ml-2 group-hover:text-white"
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </div>
        <div className="text-neutral-500 text-sm leading-relaxed font-light">{card.desc}</div>
      </div>
    </motion.div>
  );
};

function useBeamCycle() {
  const [active, setActive] = useState([false, false, false]);
  useEffect(() => {
    const CYCLE = 3400;
    const OFFSETS = [0, 750, 1500];
    const timers: any[] = [];
    const schedule = () => {
      OFFSETS.forEach((offset, i) => {
        const arrival = offset + 1400; 
        timers.push(setTimeout(() => setActive(p => { const n=[...p]; n[i]=true; return n; }), arrival % CYCLE));
        timers.push(setTimeout(() => setActive(p => { const n=[...p]; n[i]=false; return n; }), (arrival + 1600) % CYCLE));
      });
    };
    schedule();
    const interval = setInterval(schedule, CYCLE);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, []);
  return active;
}

export default function TechStackSections() {
  const [hovered, setHovered] = useState(1);
  const beamActive = useBeamCycle();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-[500px] bg-[#050505] py-20 flex flex-col items-center justify-center relative overflow-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Grid Arka Plan */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)`, backgroundSize: "40px 40px" }} 
      />

      <div className="relative w-full max-w-7xl px-6 flex flex-col items-center">
        
        {/* Üst Kısım: Merkezi İşlemci Görünümü */}
        <div className="mb-12 text-center z-10">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
                <Sparkles className="text-white" size={24} />
            </motion.div>
            <h2 className="text-white font-mono text-xs tracking-[0.3em] uppercase opacity-50">Workflow Automation</h2>
        </div>
        
        {/* Işınlar (Beams) - Aktif Edildi */}
        <div className="relative w-full h-[200px] mt-[-80px] z-[5]">
          <CircuitBeams />
        </div>
        
        {/* Kartlar */}
        <div className="flex flex-wrap justify-center gap-8 w-full relative z-20">
          {CARDS.map((card, i) => (
            <Card key={i} card={card} index={i} hovered={hovered} setHovered={setHovered} beamActive={beamActive[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}