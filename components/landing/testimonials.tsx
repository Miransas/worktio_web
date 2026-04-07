"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLocale } from "next-intl";
import { getDictionary } from "@/lib/lang";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const locale = useLocale();
  const copy = getDictionary(locale).landing.testimonials;

  return (
    <section className="py-32 px-6  bg-gradient-to-b from-[#030303] via-orange-800  to-[#1a1a1a]relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
              {copy.highlight}
            </span>
          </h2>
          <p className="text-zinc-500">{copy.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {copy.items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all relative overflow-hidden"
            >
              <Quote size={20} className="text-white/5 absolute top-4 right-4" />

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">&rdquo;{t.text}&#34;</p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-200">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
