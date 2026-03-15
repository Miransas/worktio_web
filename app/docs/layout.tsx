import DocsHeader from "../../components/docs/docs-header";
import DocsSidebar from "../../components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col">
      {/* Header'ın h-14 (3.5rem) olduğuna emin olalım. 
        Sticky sidebar'ın top-14 değerinin çalışması için bu şart.
      */}
      <div className="sticky top-0 z-50 h-14 bg-[#030303]/90 backdrop-blur border-b border-white/[0.05]">
        <DocsHeader />
      </div>

      {/* items-start kritik: Elemanların birbirinin boyunu uzatmasını engeller */}
      <div className="flex flex-1 items-start max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Sol Navigasyon */}
        <DocsSidebar />

        {/* Orta Ana İçerik */}
        <main className="flex-1 min-w-0 py-10 px-8 xl:px-12">
          {children}
        </main>

        {/* Sağ Collapse / Table of Contents Rafı */}
        <aside className="hidden xl:block w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pl-6 border-l border-white/[0.05] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-4">
            <h5 className="text-sm font-semibold text-zinc-100">Bu Sayfada</h5>
            <ul className="text-sm text-zinc-400 space-y-2.5">
              <li className="hover:text-zinc-100 cursor-pointer transition-colors">Özet</li>
              <li className="hover:text-zinc-100 cursor-pointer transition-colors">Parametreler</li>
              <li className="hover:text-zinc-100 cursor-pointer transition-colors">Örnek Kullanım</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}