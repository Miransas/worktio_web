"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

type FeatureCardProps = {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  gradient: string;
  visual: React.ReactNode;
  reverse?: boolean;
};

export default function FeatureCard({
  tag, tagColor, title, desc, bullets,
  ctaLabel, ctaHref, gradient, visual, reverse = false
}: FeatureCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden border border-white/[0.06]"
      style={{ background: gradient }}
    >
      <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} min-h-[420px]`}>
        {/* Sol/Sağ — Yazılar */}
        <div className="flex flex-col justify-center p-10 md:p-14 md:w-1/2">
          <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full border w-fit mb-6 ${tagColor}`}>
            {tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{desc}</p>
          <ul className="space-y-2.5 mb-8">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: b }} />
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
          >
            {ctaLabel} →
          </Link>
        </div>

        {/* Sağ/Sol — Görsel */}
        <div className="md:w-1/2 flex items-center justify-center p-6 md:p-8 relative">
          <div className="w-full max-w-md">
            {visual}
          </div>
        </div>
      </div>
    </motion.div>
  );
}