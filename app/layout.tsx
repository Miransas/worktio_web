/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
// Geist yerine modern SaaS fontlarını çekiyoruz
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";


import ComingSoonModal from "../components/shared/ComingSoonModal";
import { ThemeProvider } from "../components/provider/theme-provider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


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
  metadataBase: new URL("https://worktio.com"),
  title: {
    default: "Worktio — n8n'den Güçlü Otomasyon Platformu",
    template: "%s | Worktio",
  },
  description: "Flow Builder + AI Agent ile tüm iş süreçlerinizi otomatize edin. GPT-4o destekli ajanlar, görsel flow builder ve gerçek zamanlı execution.",
  keywords: ["otomasyon", "flow builder", "AI agent", "n8n alternatifi", "GPT-4o", "gmail otomasyon", "webhook", "worktio"],
  authors: [{ name: "Worktio" }],
  creator: "Worktio",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://worktio.com",
    siteName: "Worktio",
    title: "Worktio — n8n'den Güçlü Otomasyon Platformu",
    description: "Flow Builder + AI Agent ile tüm iş süreçlerinizi otomatize edin.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Worktio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worktio — n8n'den Güçlü Otomasyon Platformu",
    description: "Flow Builder + AI Agent ile tüm iş süreçlerinizi otomatize edin.",
    images: ["/og-image.png"],
    creator: "@worktio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSiteLocked = true;
  const locale = await getLocale();
  const messages = await getMessages();
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

          {/* {isSiteLocked && <ComingSoonModal />} */}
          <>
            {children}
          </>
          {/* <Footer /> */}

        </ThemeProvider>
      </body>
    </html>
  );
}