"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Workflow,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Genel Bakış", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Flow Builder", icon: Workflow, href: "/dashboard/flow" },
  { name: "AI Agent", icon: Bot, href: "/dashboard/agent" },
];

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false); // Daralma durumu
  const pathname = usePathname();

  return (
    <motion.aside
      data-collapsed={isCollapsed} // 1. SİHİR: Ana içeriğe haber verecek etiket
      initial={false}
      animate={{ width: isCollapsed ? 70 : 260 }}
      // 2. SİHİR: "peer" sınıfını ekledik
      className="peer fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-zinc-800 flex flex-col z-50 overflow-hidden shadow-2xl"
    >
      {/* Logo Alanı */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800 shrink-0">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
          <Database size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-bold text-lg uppercase italic text-white"
            >
              Worktio
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigasyon */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center p-3 rounded-xl transition-all ${isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }`}
              >
                <item.icon size={22} className="shrink-0" />

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 text-sm font-semibold whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Alt Bölüm & Daraltma Butonu */}
      <div className="p-3 border-t border-zinc-800 space-y-1">
        <Link href="/dashboard/settings">
          <div className="flex items-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all">
            <Settings size={22} className="shrink-0" />
            {!isCollapsed && <span className="ml-3 text-sm font-medium">Ayarlar</span>}
          </div>
        </Link>

        {/* Buton: isCollapsed durumunu değiştirir */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all"
        >
          {isCollapsed ? <ChevronRight size={22} /> : (
            <div className="flex items-center gap-3">
              <ChevronLeft size={22} />
              <span className="text-sm font-semibold">Daralt</span>
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}