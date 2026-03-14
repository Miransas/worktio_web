"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "../../components/dashboard/dashboard-header";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}