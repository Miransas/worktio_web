"use client";
import { useSidebar } from "../context/sidebar-context";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <main
      className="flex flex-col overflow-hidden"
      style={{
        marginLeft: isCollapsed ? "70px" : "256px",
        transition: "margin 0.3s",
        height: "100vh",
      }}
    >
      {children}
    </main>
  );
}