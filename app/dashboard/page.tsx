import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Workflow, Code2, Megaphone, Box, Headset, Zap } from "lucide-react";
import { getLocale } from "next-intl/server";
import CategoryCard from "@/components/dashboard/categoty-card";
import DashboardRecommendations from "@/components/dashboard/dashboard-recommendations";
import QuickStats from "@/components/dashboard/quick-stats";
import { getDictionary } from "@/lib/lang";

const MODULE_META = [
  { icon: Workflow, href: "/dashboard/flow", color: "text-purple-500" },
  { icon: Code2, href: "/dashboard/agent", color: "text-blue-500" },
  { icon: Megaphone, href: "/dashboard/marketing", color: "text-orange-500" },
  { icon: Box, href: "/dashboard/product", color: "text-emerald-500" },
  { icon: Headset, href: "/dashboard/support", color: "text-rose-500" },
  { icon: Zap, href: "/dashboard/sales", color: "text-amber-500" },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/");

  const locale = await getLocale();
  const copy = getDictionary(locale).dashboard.home;

  return (
    <div className="p-8 max-w-[1400px] mx-auto text-zinc-100">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {copy.systemOnline}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          {copy.welcome},{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            {session.user?.name?.split(" ")[0]}
          </span>
        </h1>
        <p className="text-zinc-500">{copy.subtitle}</p>
      </header>

      <QuickStats />
      <DashboardRecommendations />

      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">{copy.modulesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {MODULE_META.map((meta, index) => {
            const moduleCopy = copy.modules[index];
            return (
              <CategoryCard
                key={moduleCopy.title}
                title={moduleCopy.title}
                description={moduleCopy.description}
                tag={moduleCopy.tag}
                actionLabel={copy.launchAction}
                {...meta}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
