"use client";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, Zap, Bot, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { getDictionary } from "@/lib/lang";

type Recommendation = {
  title: string;
  description: string;
  category: "flow" | "agent";
  icon: string;
  why: string;
};

export default function DashboardRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiGenerated, setAiGenerated] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const copy = getDictionary(locale).dashboard.recommendations;
  const staticTemplates = useMemo<Recommendation[]>(
    () => [
      { ...copy.templates[0], category: "flow", icon: "📧" },
      { ...copy.templates[1], category: "flow", icon: "📊" },
      { ...copy.templates[2], category: "agent", icon: "🤖" },
    ],
    [copy]
  );

  useEffect(() => {
    fetch("/api/dashboard/recommendations")
      .then((r) => r.json())
      .then((data) => {
        setRecommendations(data.recommendations?.length > 0 ? data.recommendations : staticTemplates);
        setAiGenerated(data.aiGenerated);
      })
      .finally(() => setLoading(false));
  }, [locale, staticTemplates]);

  const handleCreate = async (rec: Recommendation) => {
    if (rec.category === "flow") {
      const res = await fetch("/api/flows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rec.title, nodes: [], edges: [] }),
      });
      const data = await res.json();
      router.push(`/dashboard/flow/${data.id}`);
    } else {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rec.title,
          systemPrompt: `${copy.agentPromptPrefix} ${rec.title}. ${rec.description}`,
          model: "gpt-4o",
          tools: [],
        }),
      });
      const data = await res.json();
      router.push(`/dashboard/agent/${data.id}`);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-purple-400" />
        <h2 className="text-sm font-semibold text-zinc-300">
          {aiGenerated ? copy.aiTitle : copy.fallbackTitle}
        </h2>
        {loading && <Loader2 size={12} className="animate-spin text-zinc-500" />}
        {aiGenerated && (
          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
            GPT-4o
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
          ))
        ) : (
          recommendations.map((rec, i) => (
            <div
              key={i}
              onClick={() => handleCreate(rec)}
              className="group bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:bg-purple-500/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{rec.icon}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    rec.category === "flow"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {rec.category === "flow" ? <Zap size={10} className="inline mr-1" /> : <Bot size={10} className="inline mr-1" />}
                    {rec.category === "flow" ? copy.flowLabel : copy.agentLabel}
                  </span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="font-semibold text-zinc-200 text-sm mb-1">{rec.title}</div>
              <div className="text-xs text-zinc-500">{rec.description}</div>
              {rec.why && (
                <div className="text-[10px] text-zinc-600 mt-2 italic">{rec.why}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
