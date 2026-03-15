"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  const switchLocale = (code: string) => {
    // Mevcut path'den locale prefix'i kaldır, yeni ekle
    const segments = pathname.split("/");
    const hasLocale = LANGUAGES.some(l => l.code === segments[1]);
    const cleanPath = hasLocale ? "/" + segments.slice(2).join("/") : pathname;
    const newPath = code === "tr" ? cleanPath || "/" : `/${code}${cleanPath}`;
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300 hover:bg-white/10 transition-all"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <ChevronDown size={12} className={`text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl min-w-[140px]">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left ${
                  locale === lang.code
                    ? "bg-purple-500/10 text-purple-300"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}