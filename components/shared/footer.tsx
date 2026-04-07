/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Github, Twitter, Youtube, MessageCircle } from "lucide-react";
import { getLocale } from "next-intl/server";
import { getDictionary } from "@/lib/lang";

export default async function Footer() {
  const locale = await getLocale();
  const copy = getDictionary(locale).footer;

  return (
    <footer className=" bg-gradient-to-b from-[#030303] via-orange-950  to-[#1a1a1a] border-t border-white/[0.06]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="./logo.png" alt="Miransaas" className="text-white" />
              </div>
              <span className="font-black text-lg tracking-tighter uppercase italic text-white">
                Worktio
              </span>
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed mb-5">{copy.tagline}</p>
            <div className="flex items-center gap-2">
              {[
                { icon: <Twitter size={14} />, href: "https://twitter.com/miransaas" },
                { icon: <Github size={14} />, href: "https://github.com/miransas" },
                { icon: <MessageCircle size={14} />, href: "/community" },
                { icon: <Youtube size={14} />, href: "https://youtube.com/miransas" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {copy.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
                {copy.integrationsTitle}
              </h3>
              <ul className="space-y-2">
                {copy.integrations.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/docs/integrations/${item.toLowerCase()}`}
                      className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                {copy.combinationsTitle}
              </h3>
              <ul className="space-y-2">
                {copy.combinations.map((item) => (
                  <li key={item}>
                    <Link href="/blog" className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                {copy.categoriesTitle}
              </h3>
              <ul className="space-y-2">
                {copy.categories.map((item) => (
                  <li key={item}>
                    <Link href="/docs" className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                {copy.guidesTitle}
              </h3>
              <ul className="space-y-2">
                {copy.guides.map((item) => (
                  <li key={item}>
                    <Link href="/blog" className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="https://miransas.com" className="flex items-center gap-1">
            <img src="./miransas.png" alt="" className="w-12" />
            <p className="text-xl text-zinc-100">{copy.copyright}</p>
          </Link>

          <div className="flex items-center gap-1 text-xs text-zinc-700">
            {copy.madeBy} Sardor&rsquo; <span className="text-red-500 mx-1">❤️</span> Azimov
          </div>
        </div>
      </div>
    </footer>
  );
}
