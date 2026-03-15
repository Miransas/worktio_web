import DocsHeader from "@/components/docs/docs-header";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100">
      <DocsHeader />
      <main className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </main>
    </div>
  );
}