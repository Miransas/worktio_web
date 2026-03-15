"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DOCS_NAV = [
  {
    title: "Baslangic",
    links: [
      { label: "Giris", href: "/docs" },
      { label: "Kurulum", href: "/docs/getting-started" },
      { label: "Hizli Baslangic", href: "/docs/quickstart" },
    ],
  },
  {
    title: "Flow Builder",
    links: [
      { label: "Flow Nedir?", href: "/docs/flow-builder" },
      { label: "Node Tipleri", href: "/docs/flow-builder/nodes" },
      { label: "Baglantılar", href: "/docs/flow-builder/connections" },
      { label: "Execution", href: "/docs/flow-builder/execution" },
      { label: "Webhook Trigger", href: "/docs/flow-builder/webhook" },
    ],
  },
  {
    title: "AI Agent",
    links: [
      { label: "Agent Nedir?", href: "/docs/ai-agent" },
      { label: "Tool'lar", href: "/docs/ai-agent/tools" },
      { label: "Sistem Prompt", href: "/docs/ai-agent/system-prompt" },
      { label: "Modeller", href: "/docs/ai-agent/models" },
    ],
  },
  {
    title: "Entegrasyonlar",
    links: [
      { label: "Gmail", href: "/docs/integrations/gmail" },
      { label: "GitHub", href: "/docs/integrations/github" },
      { label: "Slack", href: "/docs/integrations/slack" },
      { label: "HTTP API", href: "/docs/integrations/http" },
    ],
  },
  {
    title: "API Referansi",
    links: [
      { label: "Authentication", href: "/docs/api/auth" },
      { label: "Flows", href: "/docs/api/flows" },
      { label: "Agents", href: "/docs/api/agents" },
      { label: "Executions", href: "/docs/api/executions" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    // [&::-webkit-scrollbar]:hidden ile çirkin scrollbar'ı gizleyip kaydırmayı koruyoruz
    <aside className="w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-6 border-r border-white/[0.05] [&::-webkit-scrollbar]:hidden">
      <nav className="space-y-6">
        {DOCS_NAV.map((section) => (
          <div key={section.title}>
            <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-purple-500/10 text-purple-300 font-medium"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}