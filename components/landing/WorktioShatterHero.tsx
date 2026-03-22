"use client"

import { useRef, useEffect, useState } from "react"
import { Phone, Mic, Cpu, MessageSquare } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"

const steps = [
  {
    number: 1,
    title: "User speaks to agent via app, browser, or phone call",
    description: null,
    icon: Phone,
  },
  {
    number: 2,
    title: "User speech is streamed from device to agent",
    description: null,
    icon: Mic,
  },
  {
    number: 3,
    title: "Agent receives user speech and runs your custom business logic",
    description:
      "Built using LiveKit's open source framework and deployed on your infrastructure or LiveKit Cloud.",
    icon: Cpu,
  },
  {
    number: 4,
    title: "Agent responds back to the user",
    description: null,
    icon: MessageSquare,
  },
]

const cardContents = [
  {
    title: "User Input",
    labels: ["APP", "BROWSER", "PHONE"],
    activeLabel: "APP",
  },
  {
    title: "Speech Stream",
    labels: ["AUDIO", "VIDEO", "TEXT"],
    activeLabel: "AUDIO",
  },
  {
    title: "Agent Processing",
    labels: ["STT", "LLM", "TTS"],
    activeLabel: "LLM",
  },
  {
    title: "Response",
    labels: ["VOICE", "TEXT", "ACTION"],
    activeLabel: "VOICE",
  },
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate scroll progress within the container
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (containerHeight - windowHeight))
      )

      // Determine active step based on scroll progress
      const stepIndex = Math.min(
        steps.length - 1,
        Math.floor(scrollProgress * steps.length)
      )
      setActiveStep(stepIndex)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* How it works section */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 overflow-visible">
            <div className="relative rounded-2xl  bg-[#000000] backdrop-blur-sm p-8 lg:p-16 border border-white/[0.06]">
              {/* Border Beam Effect */}
             
            
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left side - Steps */}
                <div className="space-y-8">
                  <h2 className="text-4xl lg:text-5xl font-light mb-12">
                    <span className="text-cyan-400">How</span>{" "}
                    <span className="text-white">it works</span>
                  </h2>

                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div
                        key={step.number}
                        className={`flex gap-4 transition-all duration-500 ${
                          activeStep === index
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                            activeStep === index
                              ? "border-cyan-400 text-cyan-400"
                              : "border-zinc-600 text-zinc-600"
                          }`}
                        >
                          {step.number}
                        </div>
                        <div className="space-y-2">
                          <h3
                            className={`font-medium transition-colors duration-500 ${
                              activeStep === index
                                ? "text-white"
                                : "text-zinc-500"
                            }`}
                          >
                            {step.title}
                          </h3>
                          {step.description && activeStep === index && (
                            <p className="text-zinc-400 text-sm leading-relaxed animate-in fade-in duration-500">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-8">
                    <button className="bg-white text-black hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 hover:bg-[#000000] transition-colors text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      View documentation
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      miransas/worktio
                      <span className="text-zinc-500 text-xs">9.8K</span>
                    </button>
                  </div>
                </div>

                {/* Right side - Visual Cards */}
                <div className="relative flex items-center justify-center min-h-[400px]">
                  {/* Background grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                  </div>

                  {/* 3D Card Stack */}
                  <div className="relative w-full h-[400px]" style={{ perspective: "1000px" }}>
                    {cardContents.map((card, index) => {
                      const isActive = activeStep === index
                      const offset = index - activeStep

                      return (
                        <div
                          key={index}
                          className="absolute inset-0 transition-all duration-700 ease-out"
                          style={{
                            transform: `
                              translateZ(${isActive ? 0 : -100 - Math.abs(offset) * 50}px)
                              translateY(${offset * 30}px)
                              translateX(${offset * 20}px)
                              rotateX(${offset * 5}deg)
                              rotateY(${offset * -10}deg)
                            `,
                            opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.4,
                            zIndex: steps.length - Math.abs(offset),
                          }}
                        >
                          <div
                            className={`relative w-full h-full rounded-xl border backdrop-blur-sm p-6 transition-all duration-500 ${
                              isActive
                                ? "bg-zinc-orange-500/80 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                : "bg-zinc-900/60 border-zinc-700/50"
                            }`}
                          >
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg transition-colors duration-500 ${
                                    isActive
                                      ? "bg-white/10 text-white"
                                      : "bg-zinc-700/50 text-zinc-500"
                                  }`}
                                >
                                  {(() => {
                                    const Icon = steps[index].icon
                                    return <Icon className="w-5 h-5" />
                                  })()}
                                </div>
                                <span
                                  className={`text-lg font-medium transition-colors duration-500 ${
                                    isActive ? "text-white" : "text-zinc-400"
                                  }`}
                                >
                                  {card.title}
                                </span>
                              </div>
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                <div
                                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                                    isActive ? "bg-green-400" : "bg-zinc-600"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="space-y-4">
                              {/* Labels */}
                              <div className="flex flex-wrap gap-2">
                                {card.labels.map((label) => (
                                  <span
                                    key={label}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wider transition-all duration-500 ${
                                      label === card.activeLabel && isActive
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                        : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                                    }`}
                                  >
                                    {label}
                                  </span>
                                ))}
                              </div>

                              {/* Visual representation */}
                              <div className="mt-8 space-y-3">
                                {[1, 2, 3].map((line) => (
                                  <div
                                    key={line}
                                    className={`h-2 rounded-full transition-all duration-700 ${
                                      isActive ? "bg-zinc-700" : "bg-zinc-800"
                                    }`}
                                    style={{
                                      width: `${100 - line * 20}%`,
                                      opacity: isActive ? 1 : 0.5,
                                    }}
                                  >
                                    {isActive && (
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                                        style={{
                                          width: `${70 + line * 10}%`,
                                          animationDelay: `${line * 100}ms`,
                                        }}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Connection lines */}
                              <div className="absolute bottom-6 right-6 flex items-end gap-1">
                                {[1, 2, 3, 4, 5].map((bar) => (
                                  <div
                                    key={bar}
                                    className={`w-1.5 rounded-t transition-all duration-500 ${
                                      isActive
                                        ? "bg-orange-500"
                                        : "bg-zinc-700"
                                    }`}
                                    style={{
                                      height: `${bar * 8 + 4}px`,
                                      opacity: isActive ? 0.5 + bar * 0.1 : 0.3,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Floating labels */}
                  <div
                    className={`absolute -right-4 top-1/4 text-xs text-zinc-600 tracking-widest transform rotate-12 transition-opacity duration-500 ${
                      activeStep >= 2 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    PLUGINS
                  </div>
                  <div
                    className={`absolute -right-4 bottom-1/4 text-xs text-zinc-600 tracking-widest transform -rotate-12 transition-opacity duration-500 ${
                      activeStep >= 3 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    AGENT BACKEND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  )
}
