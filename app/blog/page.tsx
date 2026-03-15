import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const POSTS = [
  {
    slug: "n8n-vs-worktio",
    title: "n8n vs Worktio: Hangisi Daha İyi?",
    desc: "İki otomasyon platformunu karşılaştırdık. Fiyat, özellik ve kullanım kolaylığı açısından.",
    date: "15 Mart 2026",
    readTime: "5 dk",
    tag: "Karşılaştırma",
    tagColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  {
    slug: "ai-agent-kullanimi",
    title: "GPT-4o ile AI Agent Nasıl Kurulur?",
    desc: "Worktio'nun AI Agent özelliğini kullanarak akıllı otomasyon ajanları oluşturun.",
    date: "12 Mart 2026",
    readTime: "8 dk",
    tag: "Rehber",
    tagColor: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  {
    slug: "gmail-otomasyonu",
    title: "Gmail Otomasyonu ile Saatlerinizi Kurtarın",
    desc: "Gelen mailleri AI ile kategorize edin, otomatik yanıtlar gönderin.",
    date: "10 Mart 2026",
    readTime: "6 dk",
    tag: "İpuçları",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
];

export default function BlogPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-white mb-3">Blog</h1>
        <p className="text-zinc-500">Otomasyon, AI ve Worktio hakkında yazılar.</p>
      </div>

      <div className="space-y-4">
        {POSTS.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="group flex gap-6 p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${post.tagColor}`}>
                  {post.tag}
                </span>
                <div className="flex items-center gap-1 text-xs text-zinc-600">
                  <Clock size={10} />
                  {post.readTime} okuma
                </div>
                <span className="text-xs text-zinc-700">{post.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">{post.desc}</p>
            </div>
            <ArrowRight size={18} className="text-zinc-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}