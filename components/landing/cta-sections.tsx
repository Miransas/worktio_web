"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 px-6 bg-[#000000]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <Zap size={11} />
            Hemen başla
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Otomasyona{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              bugün başla
            </span>
          </h2>
          <p className="text-zinc-500 mb-10 text-lg">
            Kredi kartı gerekmez. 2 dakikada kurulum. 1000 execution ücretsiz.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl text-sm font-bold hover:bg-zinc-100 transition-all"
              style={{ boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
            >
              <Zap size={16} className="text-purple-600" />
              Ücretsiz Başla
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all"
            >
              Demo İzle
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}