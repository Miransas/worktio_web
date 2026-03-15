/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Check, X, Zap, Crown, Building2, Rocket, Loader2 } from "lucide-react";

type Sub = { plan: string; status: string; currentPeriodEnd?: string };

const PLANS = {
  monthly: [
    {
      key: "free",
      name: "Free",
      price: 0,
      desc: "Başlamak için ideal",
      icon: <Zap size={20} className="text-zinc-400" />,
      iconBg: "bg-zinc-800 border-zinc-700",
      badge: null,
      features: [
        "1.000 execution/ay",
        "5 flow",
        "AI Agent",
        "Temel node'lar",
        "Email destek",
      ],
      missing: ["Webhook trigger", "Öncelikli destek", "Özel entegrasyonlar"],
      cta: "Mevcut Plan",
      highlight: false,
    },
    {
      key: "starter",
      name: "Starter",
      price: 20,
      desc: "Bireysel kullanıcılar için",
      icon: <Rocket size={20} className="text-blue-400" />,
      iconBg: "bg-blue-500/10 border-blue-500/20",
      badge: null,
      features: [
        "10.000 execution/ay",
        "20 flow",
        "AI Agent",
        "Webhook trigger",
        "Tüm node'lar",
        "Email destek",
      ],
      missing: ["Öncelikli destek", "Özel entegrasyonlar"],
      cta: "Starter'a Geç",
      highlight: false,
    },
    {
      key: "pro",
      name: "Pro",
      price: 49,
      desc: "Profesyoneller için",
      icon: <Crown size={20} className="text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
      badge: "Popüler",
      features: [
        "50.000 execution/ay",
        "50 flow",
        "AI Agent",
        "Webhook trigger",
        "Tüm node'lar",
        "Flow şablonları",
        "Öncelikli destek",
      ],
      missing: ["Özel entegrasyonlar"],
      cta: "Pro'ya Geç",
      highlight: true,
    },
    {
      key: "enterprise",
      name: "Enterprise",
      price: 80,
      desc: "Büyük ekipler için",
      icon: <Building2 size={20} className="text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
      badge: null,
      features: [
        "Sınırsız execution",
        "Sınırsız flow",
        "AI Agent",
        "Webhook trigger",
        "Tüm node'lar",
        "Öncelikli destek",
        "Özel entegrasyonlar",
        "SLA garantisi",
      ],
      missing: [],
      cta: "Enterprise'a Geç",
      highlight: false,
    },
  ],
  yearly: [
    {
      key: "free",
      name: "Free",
      price: 0,
      yearlyPrice: 0,
      desc: "Başlamak için ideal",
      icon: <Zap size={20} className="text-zinc-400" />,
      iconBg: "bg-zinc-800 border-zinc-700",
      badge: null,
      features: ["1.000 execution/ay", "5 flow", "AI Agent", "Temel node'lar", "Email destek"],
      missing: ["Webhook trigger", "Öncelikli destek", "Özel entegrasyonlar"],
      cta: "Mevcut Plan",
      highlight: false,
    },
    {
      key: "starter",
      name: "Starter",
      price: 16,
      yearlyPrice: 192,
      desc: "Bireysel kullanıcılar için",
      icon: <Rocket size={20} className="text-blue-400" />,
      iconBg: "bg-blue-500/10 border-blue-500/20",
      badge: "2 ay ücretsiz",
      features: ["10.000 execution/ay", "20 flow", "AI Agent", "Webhook trigger", "Tüm node'lar", "Email destek"],
      missing: ["Öncelikli destek", "Özel entegrasyonlar"],
      cta: "Starter'a Geç",
      highlight: false,
    },
    {
      key: "pro",
      name: "Pro",
      price: 39,
      yearlyPrice: 468,
      desc: "Profesyoneller için",
      icon: <Crown size={20} className="text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
      badge: "Popüler",
      features: ["50.000 execution/ay", "50 flow", "AI Agent", "Webhook trigger", "Tüm node'lar", "Flow şablonları", "Öncelikli destek"],
      missing: ["Özel entegrasyonlar"],
      cta: "Pro'ya Geç",
      highlight: true,
    },
    {
      key: "enterprise",
      name: "Enterprise",
      price: 64,
      yearlyPrice: 768,
      desc: "Büyük ekipler için",
      icon: <Building2 size={20} className="text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
      badge: "2 ay ücretsiz",
      features: ["Sınırsız execution", "Sınırsız flow", "AI Agent", "Webhook trigger", "Tüm node'lar", "Öncelikli destek", "Özel entegrasyonlar", "SLA garantisi"],
      missing: [],
      cta: "Enterprise'a Geç",
      highlight: false,
    },
  ],
};

export default function BillingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [sub, setSub] = useState<Sub | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/subscription").then(r => r.json()).then(setSub);
  }, []);

  const currentPlan = sub?.plan ?? "free";
  const plans = PLANS[billing];

  return (
    <div className="p-8 max-w-6xl mx-auto text-zinc-100">
      {/* Başlık */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Plan & Faturalama</h1>
        <p className="text-zinc-400 text-sm">Planını yönet ve ihtiyacına göre yükselt.</p>
      </div>

      {/* Mevcut plan banner */}
      {sub && currentPlan !== "free" && (
        <div className="mb-8 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-zinc-300">
              Aktif plan: <span className="font-semibold text-white capitalize">{currentPlan}</span>
            </span>
            {sub.currentPeriodEnd && (
              <span className="text-xs text-zinc-500">
                · {new Date(sub.currentPeriodEnd).toLocaleDateString("tr-TR")} tarihine kadar
              </span>
            )}
          </div>
          <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
            İptal et
          </button>
        </div>
      )}

      {/* Aylık / Yıllık toggle */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              billing === "monthly" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Aylık
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billing === "yearly" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Yıllık
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
              %20 indirim
            </span>
          </button>
        </div>
      </div>

      {/* Plan kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map(plan => {
          const isCurrent = currentPlan === plan.key;

          return (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                plan.highlight
                  ? "border-purple-500/40 bg-purple-500/5"
                  : isCurrent
                  ? "border-zinc-600 bg-zinc-900/50"
                  : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
              }`}
              style={plan.highlight ? { boxShadow: "0 0 40px rgba(124,58,237,0.1)" } : {}}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                  plan.highlight
                    ? "bg-purple-600 text-white"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}>
                  {plan.badge}
                </div>
              )}

              {/* İkon + isim */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${plan.iconBg}`}>
                  {plan.icon}
                </div>
                <div>
                  <div className="font-bold text-white">{plan.name}</div>
                  <div className="text-xs text-zinc-500">{plan.desc}</div>
                </div>
              </div>

              {/* Fiyat */}
              <div className="mb-5">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-zinc-500 text-sm mb-1">/ay</span>
                  )}
                </div>
                {billing === "yearly" && plan.price > 0 && (
                  <div className="text-xs text-zinc-600 mt-0.5">
                    Yıllık ${(plan as any).yearlyPrice} faturalandırılır
                  </div>
                )}
                {plan.price === 0 && (
                  <div className="text-xs text-zinc-600 mt-0.5">Sonsuza kadar ücretsiz</div>
                )}
              </div>

              {/* Özellikler */}
              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check size={12} className="text-emerald-400 shrink-0" /> {f}
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-zinc-700">
                    <X size={12} className="shrink-0" /> {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              {isCurrent ? (
                <div className="w-full py-2.5 rounded-xl border border-zinc-700 text-center text-sm text-zinc-500 font-medium">
                  Mevcut Plan
                </div>
              ) : (
                <button
                  disabled={loading}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : plan.key === "free"
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                  }`}
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : plan.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Kullanım istatistikleri */}
      <div className="mt-12">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Bu Ay Kullanım</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Execution", used: 0, limit: 1000 },
            { label: "Flow", used: 0, limit: 5 },
            { label: "Agent Mesajı", used: 0, limit: 100 },
          ].map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">{stat.label}</span>
                <span className="text-xs text-zinc-500">{stat.used} / {stat.limit}</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(stat.used / stat.limit) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}