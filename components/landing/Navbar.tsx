/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useLocale } from "next-intl"
import { StarButton } from "../ui/star-button"
import LanguageSwitcher from "../shared/language-switcher"
import { getDictionary } from "@/lib/lang"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const copy = getDictionary(locale)
  const { theme } = useTheme()
  const [lightColor, setLightColor] = useState("#ff7300")

  useEffect(() => {
    setLightColor(theme === "dark" ? "#ff7300" : "#ff7300")
  }, [theme])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <img src="/logo.png" alt="Worktio Logo" className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold text-foreground">Worktio</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {copy.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <StarButton lightColor={lightColor} className="rounded-3xl px-10 py-4 border border-primary text-primary hover:bg-primary/10">
              <Link href="/login">{copy.nav.login}</Link>
            </StarButton>
            <LanguageSwitcher />
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              {copy.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="ghost"
                  className="w-full text-foreground"
                >
                  {copy.nav.login}
                </Button>
                <Button className="w-full bg-primary text-primary-foreground">
                  {copy.nav.startFree}
                </Button>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
