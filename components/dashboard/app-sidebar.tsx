"use client";
import { LayoutDashboard, Workflow, MessageSquare, Database } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";


const MENU = [
  { name: "Genel Bakış", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Flow Builder", icon: Workflow, href: "/dashboard/flow" },
  { name: "Sohbet", icon: MessageSquare, href: "/dashboard/agent" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
                  <Database size={18} className="text-white" />
                </div>
                <span className="font-bold tracking-tighter uppercase italic text-xl">Worktio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {MENU.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}