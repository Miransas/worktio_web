"use client"

import { motion, useScroll, useTransform, useSpring } from "motion/react"
import { useRef } from "react"
import NetworkDiagram from "./network-diagram"

const items = [
    { id: 1, color: "#ff0088", label: "Night One", image: "./work.png" },
    { id: 2, color: "#dd00ee", label: "Night Two", image: "./work.png" },
    { id: 3, color: "#9911ff", label: "Night Three", image: "./work.png" },
    { id: 4, color: "#0d63f8", label: "Night Four", image: "./work.png" },
    { id: 5, color: "#0cdcf7", label: "Night Five", image: "./work.png" },
]

export default function ScrollHorizontal() {
    // Scroll miktarını ölçeceğimiz devasa kapsayıcı
    const targetRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // O modern, yağ gibi akan hissiyat için yay animasyonu
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Kartların sağa doğru kayma oranı. Kart sayısına göre bu "-50%" değerini
    // "-75%" veya "-100%" yaparak son kartın nerede duracağını ince ayarlayabilirsin.
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-60%"])

    return (
        <div className="bg-neutral-950 text-neutral-50 font-sans">

            {/* 1. KISIM: Scroll Öncesi Normal Sayfa İçeriği */}
            <div className=" ">
                <div className="flex p-28 ">
                    <video src="./video/worktio_video.mov" autoPlay loop muted className="rounded-3xl"></video>
                </div>

            </div>

            {/* 2. KISIM: YATAY KAYDIRMA ALANI (Sihir Burada) */}
            {/* h-[300vh] sayesinde kullanıcı 3 ekran boyu aşağı scroll yaparken içerideki kartlar yatay kayar */}
            <section ref={targetRef} className="relative h-[300vh]">

                {/* Ekrana yapışan (sticky) asıl pencere */}
                <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-black">

                    {/* Sağa doğru kayan hareketli şerit */}
                    <motion.div style={{ x }} className="flex gap-8 px-10">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-[500px] w-[400px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Kart içi karanlık/renkli geçiş */}
                                <div
                                    className="absolute inset-0 mix-blend-multiply opacity-80"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent 30%, ${item.color} 100%)`
                                    }}
                                />

                                {/* Kart İçi Yazılar */}
                                <div className="absolute bottom-8 left-8 z-10">
                                    <p className="mb-2 font-mono text-sm text-neutral-300">0{item.id}</p>
                                    <h2 className="text-3xl font-bold text-white">{item.label}</h2>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. KISIM: Scroll Sonrası Normal Sayfa İçeriği */}
            <div className="p-6 ">
            <NetworkDiagram />
            </div>

        </div>
    )
}