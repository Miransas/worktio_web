import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Workflow, Code2, Megaphone, Box, Headset, Zap } from 'lucide-react';
import CategoryCard from "../../components/dashboard/categoty-card";


const WORKTIO_MODULES = [
  {
    title: "Flow Engine",
    description: "Gemini, YouTube ve Gmail'i birbirine bağlayan görsel otomasyon akışları oluştur.",
    icon: Workflow,
    href: "/dashboard/flow",
    color: "text-purple-500",
    tag: "Core"
  },
  {
    title: "Code Agent",
    description: "Senin yerine kod yazan, hata ayıklayan ve GitHub'a pushlayan yapay zeka ajanı.",
    icon: Code2,
    href: "/dashboard/agent",
    color: "text-blue-500",
    tag: "Beta"
  },
  {
    title: "AI Marketing",
    description: "Sosyal medya içeriklerini analiz et, Gemini ile kampanya metinleri oluştur.",
    icon: Megaphone,
    href: "/dashboard/marketing",
    color: "text-orange-500"
  },
  {
    title: "Product Lab",
    description: "Yeni ürün fikirlerini doğrula, rakip analizi yap ve roadmap oluştur.",
    icon: Box,
    href: "/dashboard/product",
    color: "text-emerald-500"
  },
  {
    title: "Smart Support",
    description: "Gelen destek taleplerini kategorize et ve otomatik yanıtlar hazırla.",
    icon: Headset,
    href: "/dashboard/support",
    color: "text-rose-500"
  },
  {
    title: "Sales Hunter",
    description: "Potansiyel müşterileri bul ve kişiselleştirilmiş soğuk mailler gönder.",
    icon: Zap,
    href: "/dashboard/sales",
    color: "text-amber-500"
  }
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="max-w-[1400px] mx-auto">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Hoş geldin, <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">{session.user?.name?.split(' ')[0]}</span>
        </h1>
        <p className="text-zinc-500 mt-4 text-lg font-medium">
          Worktio mimarisi aktif. Hangi departmanı devreye almak istersin?
        </p>
      </header>

      {/* Grid: 1 kolon mobilde, 3 kolon büyük ekranda */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {WORKTIO_MODULES.map((module) => (
          <CategoryCard key={module.title} {...module} />
        ))}
      </div>
    </div>
  );
}