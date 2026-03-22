"use client";
import { motion } from "framer-motion";
import { Workflow, Brain, Zap, Globe, Code2, Mail } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";

const FEATURES = [
  {
    icon: Workflow,
    title: "Flow Builder",
    desc: "Build powerful workflows visually. Drag, drop, and automate anything.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: Brain,
    title: "AI Agents",
    desc: "Autonomous GPT-4o agents that search, execute code, and take actions.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.35)",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    desc: "Run workflows instantly with real-time results and zero latency feel.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
  },
  {
    icon: Globe,
    title: "Event Triggers",
    desc: "Trigger workflows via webhooks and external events. Fully extensible.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.35)",
  },
  {
    icon: Code2,
    title: "Code Execution",
    desc: "Run JavaScript inside workflows for maximum flexibility and control.",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.35)",
  },
  {
    icon: Mail,
    title: "Email Automation",
    desc: "Send, read, and organize emails automatically within your flows.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.35)",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6  bg-[#000000] relative overflow-hidden">
      <div className="max-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Her şey{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              dahili
            </span>
          </h2>
          <p className="text-zinc-500 text-lg">Dışarıdan eklenti almanıza gerek yok.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 hover:border-white/10 transition-all overflow-hidden z-10"
            >
              {/* Border beam burada olmalı */}
              {/* <BorderBeam
                duration={1}
                size={700}
                className="from-transparent via-red-500 to-transparent z-0"
              />
              <BorderBeam
                duration={1}
                delay={3}
                size={700}
                className="from-transparent via-blue-500 to-transparent"
              /> */}

              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${f.glow} 0%, transparent 60%)` }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.color + "20", boxShadow: `0 0 20px ${f.glow}` }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>

              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}