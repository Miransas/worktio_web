"use client";
import { Workflow, Brain, Zap } from "lucide-react";
import { useLocale } from "next-intl";
import FeatureCard from "./feature-card";
import { getDictionary } from "@/lib/lang";

const CARD_META = [
  {
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    ctaHref: "/dashboard/flow",
    gradient: "linear-gradient(135deg, #1a0533 0%, #0d0d1a 50%, #030303 100%)",
    reverse: false,
  },
  {
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    ctaHref: "/dashboard/agent",
    gradient: "linear-gradient(135deg, #001533 0%, #0a0d1a 50%, #030303 100%)",
    reverse: true,
  },
];

export default function FeatureCardsSection() {
  const locale = useLocale();
  const cards = getDictionary(locale).landing.featureCards.cards;
  const flowCard = cards[0];
  const agentCard = cards[1];
  const flowNodes = flowCard.visual.nodes ?? ["", "", ""];

  return (
    <section className="py-24 px-6 bg-[#000000]">
      <div className="max-full mx-auto space-y-6">
        {CARD_META.map((card, i) => {
          const copy = i === 0 ? flowCard : agentCard;
          const visual = i === 0 ? (
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <span className="text-xs text-zinc-600 ml-2">{flowCard.visual.windowTitle}</span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Workflow size={16} />, label: flowNodes[0], color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                  { icon: <Brain size={16} />, label: flowNodes[1], color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
                  { icon: <Zap size={16} />, label: flowNodes[2], color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                ].map((node, index) => (
                  <div key={index} className="flex-1">
                    <div className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${node.bg}`}>
                      <div className={node.color}>{node.icon}</div>
                      <span className="text-xs text-zinc-400">{node.label}</span>
                    </div>
                    {index < 2 && (
                      <div className="flex items-center justify-end mt-2">
                        <div className="h-px flex-1 bg-purple-500/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-zinc-900/50 rounded-xl p-3 border border-white/5">
                <div className="text-xs text-zinc-600 mb-1">{flowCard.visual.lastExecution}</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">{flowCard.visual.successStatus}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Brain size={14} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{agentCard.tag}</div>
                  <div className="text-[10px] text-zinc-600">{agentCard.visual.model}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-purple-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                    {agentCard.visual.request}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Brain size={10} className="text-purple-400" />
                  </div>
                  <div className="bg-zinc-800 text-zinc-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                    {agentCard.visual.connecting}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Brain size={10} className="text-purple-400" />
                  </div>
                  <div className="bg-zinc-800 text-zinc-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm">
                    ✓ {agentCard.visual.completed}
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <FeatureCard
              key={i}
              {...card}
              tag={copy.tag}
              title={copy.title}
              desc={copy.desc}
              bullets={copy.bullets}
              ctaLabel={copy.ctaLabel}
              visual={visual}
            />
          );
        })}
      </div>
    </section>
  );
}
