"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LayoutDashboard, Workflow, MessageSquare, Database, CreditCard, BarChart2, Settings2, Activity } from "lucide-react";
import { getDictionary } from "@/lib/lang";

const MENU = [
  { icon: LayoutDashboard, href: "/dashboard" },
  { icon: Workflow, href: "/dashboard/flow" },
  { icon: MessageSquare, href: "/dashboard/agent" },
  { icon: BarChart2, href: "/dashboard/analytics" },
  { icon: CreditCard, href: "/dashboard/billing" },
  { icon: Settings2, href: "/dashboard/settings" },
  { icon: Activity, href: "/dashboard/executions" },
];

const MINI_PATHS = ["/dashboard/agent/", "/dashboard/flow/"];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const copy = getDictionary(locale).dashboard.sidebar.menu;
  const isMini = MINI_PATHS.some((p) => pathname.startsWith(p));

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-zinc-800 z-50 flex flex-col transition-all duration-300"
      style={{ width: isMini ? "70px" : "240px" }}
    >
      <div className="h-16 shrink-0 flex items-center justify-center px-4 border-b border-zinc-800">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
          <Database size={16} className="text-white" />
        </div>
        {!isMini && (
          <span className="ml-3 font-bold text-white tracking-tighter uppercase italic text-lg">
            Worktio
          </span>
        )}
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {MENU.map((item, index) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const name = copy[index];

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isMini ? name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isMini ? "justify-center" : ""
              } ${
                active ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {!isMini && <span className="text-sm font-medium">{name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
