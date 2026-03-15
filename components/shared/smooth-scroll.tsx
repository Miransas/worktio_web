"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis"; // Lenis'in güncel sürümünü kullanıyorsan import 'lenis' olabilir

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Canavarı uyandırıyoruz (Lenis'i başlat)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // 2. Framer Motion ve diğer animasyonlar için tarayıcıyı dinle
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // 3. İŞTE HAYAT KURTARAN KISIM (Zombi Avcısı)
    // Component ekrandan gidince (sayfa değişince) bu return bloğu çalışır.
    return () => {
      cancelAnimationFrame(rafId); // Döngüyü durdur
      lenis.destroy(); // Lenis'in window üzerindeki bütün kancalarını söküp at!
    };
  }, []);

  return <>{children}</>;
}