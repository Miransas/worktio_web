/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/static-components */
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
    SiYoutube, SiTiktok, SiInstagram, SiDiscord, SiOpenai, 
    SiSlack, SiShopify, SiMailchimp, SiX 
} from "react-icons/si"
import { BsStars } from "react-icons/bs"
import { useRouter } from "next/navigation"

// 7 Düğümlü (3 Trigger, 1 Process, 3 Action) devasa senaryolar
const workflows = [
    {
        id: 'social-flow',
        t1: { icon: SiInstagram, name: "New Reel", type: "Trigger", color: "text-[#E1306C]", bg: "bg-[#E1306C]/10" },
        t2: { icon: SiYoutube, name: "New Video", type: "Trigger", color: "text-[#FF0000]", bg: "bg-[#FF0000]/10" },
        t3: { icon: SiTiktok, name: "New Trend", type: "Trigger", color: "text-[#00F2FE]", bg: "bg-[#00F2FE]/10" },
        
        p:  { icon: SiOpenai, name: "Analyze Tone", type: "AI Logic", color: "text-[#10A37F]", bg: "bg-[#10A37F]/10" },
        
        a1: { icon: SiInstagram, name: "Auto Reply", type: "Action", color: "text-[#E1306C]", bg: "bg-[#E1306C]/10" },
        a2: { icon: SiX, name: "Post Thread", type: "Action", color: "text-white", bg: "bg-white/10" },
        a3: { icon: SiDiscord, name: "Send Alert", type: "Action", color: "text-[#5865F2]", bg: "bg-[#5865F2]/10" }
    },
    {
        id: 'ecommerce-flow',
        t1: { icon: SiShopify, name: "New Order", type: "Trigger", color: "text-[#95BF47]", bg: "bg-[#95BF47]/10" },
        t2: { icon: SiShopify, name: "Cart Abandon", type: "Trigger", color: "text-[#95BF47]", bg: "bg-[#95BF47]/10" },
        t3: { icon: SiMailchimp, name: "Email Open", type: "Trigger", color: "text-[#FFE01B]", bg: "bg-[#FFE01B]/10" },
        
        p:  { icon: BsStars, name: "Format Data", type: "Processing", color: "text-amber-400", bg: "bg-amber-400/10" },
        
        a1: { icon: SiMailchimp, name: "Send Promo", type: "Action", color: "text-[#FFE01B]", bg: "bg-[#FFE01B]/10" },
        a2: { icon: SiSlack, name: "Sales Team", type: "Action", color: "text-[#E01E5A]", bg: "bg-[#E01E5A]/10" },
        a3: { icon: SiShopify, name: "Update Tag", type: "Action", color: "text-[#95BF47]", bg: "bg-[#95BF47]/10" }
    }
]

export default function WorktioHero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % workflows.length)
        }, 5000) // Okumak için süreyi 5 saniyeye çıkardık
        return () => clearInterval(interval)
    }, [])

    const activeFlow = workflows[currentIndex]

    // Düğüm Kartı (z-20 ile lazerleri gizler)
    const NodeCard = ({ data, left, top }: { data: any, left: number, top: number }) => (
        <div 
            className="absolute w-[200px] z-20 rounded-xl border border-white/10 bg-neutral-950 shadow-2xl overflow-hidden"
            style={{ left, top }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFlow.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 ${data.bg}`}>
                        <data.icon className={`text-xl ${data.color}`} />
                        <span className="text-sm font-semibold text-white/90">{data.name}</span>
                    </div>
                    <div className="flex items-center justify-between bg-neutral-900/80 px-4 py-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">{data.type}</span>
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 pt-24 font-sans text-neutral-50">
            
            <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-rose-600/10 blur-[120px]" />

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
                
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start text-left"
                >
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-md">
                        <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
                        Worktio 1.0 is Live
                    </div>
                    
                    <h1 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Visual Automation. <br />
                        <span className="bg-gradient-to-r from-indigo-400 to-rose-400 bg-clip-text text-transparent">
                            Reimagined.
                        </span>
                    </h1>
                    
                    <p className="mb-10 max-w-lg text-lg leading-relaxed text-neutral-400">
                        Connect your favorite apps in seconds. Drag, drop, and automate your entire workflow with n8n-level precision and AI-powered logic.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <button
                         onClick={()=> router.push("/dashboard/flow")}
                         className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-105 active:scale-95">
                            Start Building
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative flex w-full justify-center overflow-visible"
                >
                    {/* MAC PENCERESİ BÜYÜTÜLDÜ (Yükseklik 600px'e çıkarıldı ki 3 modül sığsın) */}
                    <div className="relative w-[800px] origin-center scale-[0.40] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl sm:scale-[0.55] md:scale-75 lg:scale-100">
                        
                        <div className="flex h-12 w-full items-center gap-2 border-b border-white/5 bg-neutral-900/50 px-4">
                            <div className="h-3 w-3 rounded-full bg-rose-500" />
                            <div className="h-3 w-3 rounded-full bg-amber-500" />
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            <div className="ml-4 flex h-6 w-full max-w-sm items-center rounded-md bg-black/50 px-3 text-xs text-neutral-500">
                                worktio.com/flow/multi-node
                            </div>
                        </div>

                        {/* Yeni Yükseklik: 600px */}
                        <div className="relative h-[600px] w-full bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px]">
                            
                            <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" viewBox="0 0 800 600">
                                <defs>
                                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                                        <stop offset="20%" stopColor="#ef4444" /> {/* Trigger */}
                                        <stop offset="50%" stopColor="#8b5cf6" /> {/* Logic */}
                                        <stop offset="80%" stopColor="#10b981" /> {/* Action */}
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient id="vertGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* --- 1. STATİK ARKAPLAN ÇİZGİLERİ (Soluk) --- */}
                                {/* Dikey Tetikleyici Çizgileri (Senin Çizdiğin T1 -> T2 ve T3 -> T2) */}
                                <path d="M 140 135 L 140 255" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                <path d="M 140 465 L 140 335" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                
                                {/* Sol -> Orta (3 Koldan Giriş) */}
                                <path d="M 240 95 C 270 95, 270 295, 300 295" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                <path d="M 240 295 L 300 295" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                <path d="M 240 495 C 270 495, 270 295, 300 295" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />

                                {/* Orta -> Sağ (3 Koldan Çıkış) */}
                                <path d="M 500 295 C 530 295, 530 95, 560 95" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                <path d="M 500 295 L 560 295" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                                <path d="M 500 295 C 530 295, 530 495, 560 495" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />

                                {/* --- 2. HAREKETLİ LAZERLER --- */}
                                
                                {/* Dikey Lazerler (Tetikleyicilerin birbirini beslemesi) */}
                                <motion.path d="M 140 135 L 140 255" stroke="url(#vertGradient)" strokeWidth="3" fill="none" strokeDasharray="50 300" initial={{ strokeDashoffset: 50 }} animate={{ strokeDashoffset: -200 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                                <motion.path d="M 140 465 L 140 335" stroke="url(#vertGradient)" strokeWidth="3" fill="none" strokeDasharray="50 300" initial={{ strokeDashoffset: 50 }} animate={{ strokeDashoffset: -200 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />

                                {/* T1 -> Process -> A1 */}
                                <motion.path 
                                    d="M 240 95 C 270 95, 270 295, 300 295 L 500 295 C 530 295, 530 95, 560 95" 
                                    stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="150 1200" initial={{ strokeDashoffset: 150 }} animate={{ strokeDashoffset: -800 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                                />
                                {/* T2 -> Process -> A2 */}
                                <motion.path 
                                    d="M 240 295 L 300 295 L 500 295 L 560 295" 
                                    stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="150 1200" initial={{ strokeDashoffset: 150 }} animate={{ strokeDashoffset: -800 }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.8 }} 
                                />
                                {/* T3 -> Process -> A3 */}
                                <motion.path 
                                    d="M 240 495 C 270 495, 270 295, 300 295 L 500 295 C 530 295, 530 495, 560 495" 
                                    stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="150 1200" initial={{ strokeDashoffset: 150 }} animate={{ strokeDashoffset: -800 }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.6 }} 
                                />
                            </svg>

                            {/* --- 3. DÜĞÜMLER (NODES) --- */}
                            {/* Sol Kolon (Triggers) */}
                            <NodeCard data={activeFlow.t1} left={40} top={60} />
                            <NodeCard data={activeFlow.t2} left={40} top={260} />
                            <NodeCard data={activeFlow.t3} left={40} top={460} />

                            {/* Orta Kolon (Process) */}
                            <NodeCard data={activeFlow.p} left={300} top={260} />

                            {/* Sağ Kolon (Actions) */}
                            <NodeCard data={activeFlow.a1} left={560} top={60} />
                            <NodeCard data={activeFlow.a2} left={560} top={260} />
                            <NodeCard data={activeFlow.a3} left={560} top={460} />

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}