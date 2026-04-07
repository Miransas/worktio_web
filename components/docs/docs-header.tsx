"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import LanguageSwitcher from "../shared/language-switcher";
import { getDictionary } from "@/lib/lang";

export default function DocsHeader() {
  const locale = useLocale();
  const copy = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md h-14">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-white">
            <img src="./logo.svg" alt="" className="w-18 h-18" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-400 hover:bg-white/10 transition-colors">
            <Search className="w-4 h-4" />
            <span>{copy.docs.search}</span>
            <kbd className="ml-2 px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Ctrl K</kbd>
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
