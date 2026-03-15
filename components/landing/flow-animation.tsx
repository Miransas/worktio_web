/* eslint-disable react-hooks/purity */

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Mail, Globe, Code2, GitBranch, Database, Workflow } from 'lucide-react';

// Worktio node tipleri
const MODULES = [
    { id: 'trigger', label: 'Trigger', color: '#f59e0b', angle: 45 },
    { id: 'ai', label: 'AI Agent', color: '#a855f7', angle: 135 },
    { id: 'gmail', label: 'Gmail', color: '#f43f5e', angle: 225 },
    { id: 'http', label: 'HTTP', color: '#3b82f6', angle: 315 },
    { id: 'code', label: 'Kod', color: '#ec4899', angle: 90 },
    { id: 'db', label: 'Database', color: '#14b8a6', angle: 180 },
    { id: 'condition', label: 'Koşul', color: '#10b981', angle: 270 },
];

const ICONS: Record<string, React.ReactNode> = {
    trigger: <Zap size={22} />,
    ai: <Brain size={22} />,
    gmail: <Mail size={22} />,
    http: <Globe size={22} />,
    code: <Code2 size={22} />,
    db: <Database size={22} />,
    condition: <GitBranch size={22} />,
};

const SLOTS = [
    { id: 'top', y: 80, portY: 125 },
    { id: 'mid', y: 205, portY: 250 },
    { id: 'bot', y: 330, portY: 375 },
];

const LAYOUTS = [[1], [0, 2], [0, 1, 2], [0], [2]];

const generateScenario = (prevId: string | null = null) => {
    const available = MODULES.filter(m => m.id !== prevId);
    const mod = available[Math.floor(Math.random() * available.length)];
    const layoutIdxs = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];

    const nodes: any[] = [];
    const paths: any[] = [];

    layoutIdxs.forEach((slotIdx, i) => {
        const slot = SLOTS[slotIdx];
        nodes.push({
            id: `node-${slot.id}-${Date.now()}`,
            label: mod.label,
            sub: `Task ${Math.floor(Math.random() * 900) + 100} executing...`,
            x: 400,
            y: slot.y,
            delay: i * 0.1,
            color: mod.color,
        });
        paths.push({
            id: `in-${slot.id}-${Date.now()}`,
            d: `M 230 225 C 310 225, 310 ${slot.portY}, 400 ${slot.portY}`,
            delay: Math.random() * 0.4,
        });
        paths.push({
            id: `out-${slot.id}-${Date.now()}`,
            d: slot.portY === 250
                ? `M 620 250 L 680 250`
                : `M 620 ${slot.portY} C 655 ${slot.portY}, 650 250, 680 250`,
            delay: Math.random() * 0.4 + 0.3,
        });
    });

    const logs = [
        `[${mod.label}] protokol başlatılıyor...`,
        `> ${layoutIdxs.length} thread için bellek ayrıldı`,
        `> Değişkenler derleniyor...`,
        `✓ ${Math.floor(Math.random() * 200) + 10} execution başarılı! 🚀`,
    ];

    return { key: Date.now().toString(), module: mod, nodes, paths, logs };
};

function GlowingWire({ path, color, delay }: { path: string; color: string; delay: number }) {
    return (
        <g>
            <path d={path} stroke="#1a1a1c" strokeWidth={12} fill="none" strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))' }} />
            <path d={path} stroke="#2c2c30" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
            <motion.path
                d={path} stroke={color} strokeWidth={4} fill="none" strokeLinecap="round"
                strokeDasharray="60 400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1], strokeDashoffset: [0, -800] }}
                exit={{ opacity: 0 }}
                transition={{
                    opacity: { delay, duration: 0.3 },
                    // eslint-disable-next-line react-hooks/purity
                    strokeDashoffset: { duration: 2 + Math.random(), repeat: Infinity, ease: 'linear' }
                }}
                style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})` }}
            />
        </g>
    );
}

function ModuleBox({ id, label, angle, isActive, color }: any) {
    return (
        <div
            className="absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out"
            style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) scale(0.85)`,
                zIndex: isActive ? 30 : 10,
                opacity: isActive ? 1 : 0.15,
                filter: isActive ? 'none' : 'grayscale(100%) brightness(20%)',
            }}
        >
            <div style={{ transform: `translateX(${isActive ? '140px' : '125px'})` }} className="relative">
                {/* Kablo */}
                <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 flex flex-col gap-[3px]">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-4 h-[2px] bg-gradient-to-r from-gray-700 to-gray-400 rounded-sm" />
                    ))}
                </div>
                <div style={{ transform: `rotate(${-angle}deg)` }} className="flex flex-col items-center">
                    <div
                        className="relative w-12 h-12 bg-[#121214] border border-[#2c2c30] rounded-xl flex items-center justify-center z-10"
                        style={{ boxShadow: isActive ? `0 0 20px ${color}50, inset 0 1px 2px rgba(255,255,255,0.15)` : '' }}
                    >
                        <div style={{ color: isActive ? color : '#444', filter: isActive ? `drop-shadow(0 0 8px ${color})` : 'none' }}>
                            {ICONS[id]}
                        </div>
                    </div>
                    <div className="mt-2 bg-[#08080a] border border-[#222] px-2 py-1 rounded-md">
                        <span className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase">{label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProcessNode({ node }: { node: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 15 }}
            transition={{ duration: 0.4, delay: node.delay, type: 'spring' }}
            className="absolute w-[200px] h-[70px] bg-[#161618] border border-[#2c2c30] rounded-xl flex flex-col justify-center px-4 z-10 overflow-hidden"
            style={{
                left: node.x,
                top: node.y,
                boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 20px ${node.color}15`,
            }}
        >
            <div className="absolute top-0 left-0 w-full h-[12px] opacity-10"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
            <div className="absolute bottom-0 left-0 w-full h-[12px] opacity-10"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

            {/* Port sol */}
            <div className="absolute left-[-7px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[#0a0a0c] border-2 border-gray-600 rounded-full z-20" />
            {/* Port sağ */}
            <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[#0a0a0c] border-2 border-gray-600 rounded-full z-20" />

            <h4 className="text-sm font-semibold text-gray-100 z-10 relative" style={{ color: node.color }}>
                {node.label}
            </h4>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 truncate z-10 relative">{node.sub}</p>
        </motion.div>
    );
}

export default function FlowAnimation() {
    const [scenario, setScenario] = useState(generateScenario());

    useEffect(() => {
        const timer = setInterval(() => {
            setScenario(prev => generateScenario(prev.module.id));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            width: '100%', height: '100%',
            background: '#050505',
            borderRadius: '19px',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Glow */}
            <div
                className="absolute top-1/2 left-[15%] -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-30 transition-colors duration-1000 pointer-events-none"
                style={{ backgroundColor: scenario.module.color }}
            />

            {/* Scale wrapper */}

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.85)',
                width: '960px',
                height: '500px',
                overflow: 'visible', // ← ekle
            }}>
                {/* SVG kablolar */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 960 500">
                    <AnimatePresence mode="wait">
                        <motion.g key={scenario.key}>
                            {scenario.paths.map((p: any) => (
                                <GlowingWire key={p.id} path={p.d} color={scenario.module.color} delay={p.delay} />
                            ))}
                        </motion.g>
                    </AnimatePresence>
                </svg>

                {/* SOL MOTOR */}
                <div className="absolute left-[20px] top-[120px] w-[220px] h-[220px] flex items-center justify-center">
                    {/* Orbit rings */}
                    <div className="absolute w-[350px] h-[350px] border border-white/[0.04] rounded-full pointer-events-none" />
                    <div className="absolute w-[480px] h-[480px] border border-white/[0.02] rounded-full pointer-events-none" />

                    {MODULES.map(m => (
                        <ModuleBox key={m.id} id={m.id} label={m.label} angle={m.angle}
                            isActive={scenario.module.id === m.id} color={m.color} />
                    ))}

                    {/* Motor merkezi */}
                    <div
                        className="relative w-[180px] h-[180px] rounded-[40px] flex items-center justify-center bg-[#121214] border border-[#2a2a2e] overflow-hidden z-20"
                        style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.08), inset -4px -4px 10px rgba(0,0,0,0.9), 0 20px 40px rgba(0,0,0,0.95)' }}
                    >
                        {/* Dönen çarklar */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                            className="absolute w-[130px] h-[130px]"
                        >
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                <div key={i} className="absolute top-1/2 left-1/2 flex flex-col items-center"
                                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-44px)` }}>
                                    <div className="w-4 h-2.5 rounded-sm z-20"
                                        style={{ background: `linear-gradient(to bottom, ${scenario.module.color}, ${scenario.module.color}88)`, boxShadow: `0 0 12px ${scenario.module.color}` }} />
                                    <div className="w-5 h-4 bg-gradient-to-b from-[#2a2a2e] to-[#0a0a0c] rounded-b-lg border border-[#3f3f46] border-t-0 mt-[-1px]">
                                        <div className="w-full h-[1px] bg-black/80 mt-1" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Worktio logosu */}
                        <div className="absolute z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            <Workflow size={36} className="text-white opacity-90" />
                        </div>
                    </div>

                    {/* Çıkış portu */}
                    <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 flex items-center z-0">
                        <div className="w-5 h-4 bg-[#1a1a1c] border border-[#444] rounded-r-sm" />
                        <div className="absolute right-[-4px] w-[6px] h-[20px] bg-gradient-to-b from-gray-200 to-gray-600 rounded-[2px] z-10" />
                    </div>
                </div>

                {/* PROCESS NODES */}
                <AnimatePresence mode="wait">
                    <motion.div key={scenario.key}>
                        {scenario.nodes.map((node: any) => (
                            <ProcessNode key={node.id} node={node} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* SAĞ TERMİNAL */}
                <div className="absolute left-[680px] top-[100px] w-[260px] h-[300px] bg-[#0c0c0e] border border-[#222] rounded-2xl p-5 flex flex-col z-10 overflow-hidden"
                    style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.9), inset 0 2px 8px rgba(0,0,0,0.8)' }}>

                    {/* Terminal port */}
                    <div className="absolute left-[-8px] top-[150px] w-[16px] h-[16px] bg-[#050505] border-2 border-gray-600 rounded-full z-20" />

                    {/* Mac dots */}
                    <div className="flex gap-2 mb-4 border-b border-[#222]/50 pb-3">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"
                            style={{ boxShadow: '0 0 8px #27c93f' }} />
                        <span className="text-[9px] text-gray-600 font-mono ml-auto">worktio — terminal</span>
                    </div>

                    <div className="flex-1 overflow-hidden font-mono text-xs leading-relaxed">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={scenario.key}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0 }}
                                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                                className="flex flex-col gap-2"
                            >
                                {scenario.logs.map((log: string, i: number) => (
                                    <motion.p
                                        key={i}
                                        variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                                        style={{
                                            color: i === 0 ? '#e4e4e7' :
                                                i === scenario.logs.length - 1 ? '#10b981' :
                                                    '#52525b',
                                            fontWeight: i === 0 || i === scenario.logs.length - 1 ? 700 : 400,
                                        }}
                                    >
                                        {log}
                                    </motion.p>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Stats */}
                    <div className="mt-3 pt-3 border-t border-[#222] grid grid-cols-3 gap-2">
                        {[
                            { label: 'Execution', value: `${Math.floor(Math.random() * 900) + 100}`, color: '#a78bfa' },
                            { label: 'Başarı', value: '99.8%', color: '#10b981' },
                            { label: 'Süre', value: '234ms', color: '#3b82f6' },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-xs font-black" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-[8px] text-gray-700 mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}