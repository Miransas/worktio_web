import { Zap } from "lucide-react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";


export default async function DashboardHeader() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <header className="h-16 border-b border-zinc-800 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="hidden md:flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-full text-[12px]">
          <span className="text-zinc-500 font-medium italic">Deneme: 14 gün kaldı</span>
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-emerald-500" />
          </div>
          <span className="text-emerald-500 font-bold">0/1000 Yürütme</span>
          <button className="flex items-center gap-1 text-zinc-300 hover:text-white ml-2 transition-colors">
            <Zap size={14} className="fill-current text-amber-400" /> ŞİMDİ YÜKSELTİN
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400 hidden sm:block">{session.user?.email}</span>
        <div className="w-9 h-9 rounded-full border border-zinc-700 overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session.user?.image || ""} alt="User" />
        </div>
      </div>
    </header>
  );
}