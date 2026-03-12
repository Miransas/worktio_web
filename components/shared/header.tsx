"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            {/* --- SABİT HEADER --- */}
            {/* Sayfanın üstünde kalması için fixed ve z-40 kullanıyoruz. Cam efekti için backdrop-blur ekledik. */}
            <header className="fixed top-0 left-0 w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    {/* Logo Alanı */}
                    <div className="text-2xl font-black tracking-tighter text-neutral-100">
                       <Link href="/">
                       <img src="/logo.png" alt=""  className="w-20"/>
                       </Link>
                    </div>

                    {/* Masaüstü Menüsü (Mobilde gizli) */}
                    <nav className="hidden gap-8 font-medium text-neutral-400 md:flex">
                        <Link href="/contnet/blog" className="hover:text-neutral-100 transition-colors">Blog</Link>
                        <Link href="/Dowland" className="hover:text-neutral-100 transition-colors">Dowland</Link>
                        <Link href="/changelog" className="hover:text-neutral-100 transition-colors">Chanelog</Link>
                        <Link href="support" className="hover:text-neutral-100 transition-colors">Support</Link>
                    </nav>

                    {/* Mobil Menü Açma Butonu (Hamburger İkonu) */}
                    <button 
                        className="text-neutral-100 md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* --- SAĞDAN KAYAN MOBİL MENÜ --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* 1. Arka Plan Karartması (Backdrop) */}
                        {/* Menü açıkken arka planı hafifçe karartır ve tıklanınca menüyü kapatır */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* 2. Asıl Sağ Menü (Drawer) */}
                        <motion.div 
                            initial={{ x: "100%" }} // Ekranın sağ dışında başlar
                            animate={{ x: 0 }}      // Ekranın içine girer
                            exit={{ x: "100%" }}    // Kapanırken tekrar sağa çıkar
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }} // Yaylanmayan tok bir geçiş
                            className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-white/10 bg-neutral-950 p-6 shadow-2xl md:hidden"
                        >
                            {/* Kapatma Butonu */}
                            <div className="flex justify-end mb-8">
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="text-neutral-400 hover:text-neutral-100 transition-colors"
                                >
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobil Linkler */}
                            <nav className="flex flex-col gap-6 text-xl font-medium text-neutral-400">
                                <a href="#" className="hover:text-neutral-100 transition-colors">Ana Sayfa</a>
                                <a href="#" className="hover:text-neutral-100 transition-colors">Projeler</a>
                                <a href="#" className="hover:text-neutral-100 transition-colors">Hakkımızda</a>
                                <a href="#" className="hover:text-neutral-100 transition-colors">İletişim</a>
                            </nav>

                            {/* En alt kısma eklenebilecek ekstra detay (Örn: Sosyal medya) */}
                            <div className="mt-auto pt-8 text-sm text-neutral-600 border-t border-white/5">
                                © 2026 Tokyo Nights
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}