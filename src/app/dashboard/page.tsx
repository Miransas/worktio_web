
import { redirect } from "next/navigation";
import { auth, signOut } from "../../../auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Worktio Dashboard</h1>
            <p className="text-zinc-400 mt-1">Hoş geldin, {session.user?.name}</p>
          </div>
          
          <form action={async () => { "use server"; await signOut(); }}>
            <button className="text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors">
              Çıkış Yap
            </button>
          </form>
        </header>

        {/* Burası ileride Canvas'a giden yol olacak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-all cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Yeni Akış Oluştur</h3>
            <p className="text-sm text-zinc-400">Gemini ve Google servislerini birbirine bağla.</p>
          </div>
        </div>
      </div>
    </main>
  );
}