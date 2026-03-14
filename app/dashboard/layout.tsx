import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-purple-500/30">
      {/* Sabit Sidebar (Artık "peer" olarak davranıyor) */}
      <DashboardSidebar />

      {/* Ana İçerik Taşıyıcı */}
      {/* İŞTE O SİHİRLİ SATIR: peer-data-[collapsed=true] ise margin 70px, değilse 260px */}
      <div className="flex-1 flex flex-col transition-all duration-300 ml-[260px] peer-data-[collapsed=true]:ml-[70px]">
        <DashboardHeader />
        
        {/* İçerik */}
        <main className="flex-1 h-[calc(100vh-64px)] overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}