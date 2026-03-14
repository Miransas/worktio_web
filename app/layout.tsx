/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
// Geist yerine modern SaaS fontlarını çekiyoruz
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Footer from "../components/shared/footer";
import ComingSoonModal from "../components/shared/ComingSoonModal";
import { ThemeProvider } from "../components/provider/theme-provider";
import SmoothScroll from "../components/shared/smooth-scroll";
import { TooltipProvider } from "../components/ui/tooltip";

// Ana metinler, başlıklar ve butonlar için harika bir font
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  // Fontun kalınlıklarını projeye göre optimize ediyoruz
  weight: ["400", "500", "600", "700", "800"],
});

// Kod blokları, loglar ve teknik detaylar için
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worktio | Yeni Nesil Otomasyon Akışı",
  description: "Yapay zeka destekli, ultra hızlı ve modern iş akışı otomasyon platformu.",
  icons: {
    icon: "/logo.png"
  },
  openGraph: {
    title: "Worktio | Yeni Nesil Otomasyon Akışı",
    description: "Yapay zeka destekli, ultra hızlı ve modern iş akışı otomasyon platformu.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worktio | Yeni Nesil Otomasyon Akışı",
    description: "Yapay zeka destekli, ultra hızlı ve modern iş akışı otomasyon platformu.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSiteLocked = true;
  return (
    <html lang="Uzb,Tr,Us" suppressHydrationWarning>
      <head />
      <body
        className={`
          ${plusJakarta.variable} ${jetBrainsMono.variable} 
          font-sans antialiased 
          selection:bg-orange-500 selection:text-white
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {/* {isSiteLocked && <ComingSoonModal />} */}
           {children}
            {/* <Footer /> */}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}