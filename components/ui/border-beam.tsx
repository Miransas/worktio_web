"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {

  className?: string
  lightWidth: number;
  duration: number;
  lightColor: string;
  borderWidth: number;
}

export function BorderBeam({
  duration = 6,
  lightColor = "#22d3ee",
  borderWidth = 3,
  className,
  lightWidth = 300

}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
    >
      {/* Animated beam */}
      <div
        className="absolute animate-border-beam"
        style={{
          background: `linear-gradient(90deg, transparent, ${lightColor}, ${lightColor}, transparent)`,
          width: "200px",
          height: `${borderWidth}px`,
          animationDuration: `${duration}s`,
          filter: `drop-shadow(0 0 100px ${lightColor}) drop-shadow(0 0 100px ${lightColor})`,
        }}
      />

      {/* Static border glow */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: `${borderWidth}px solid transparent`,
          background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(90deg, ${lightColor}20, ${lightColor}40, ${lightColor}20) border-box`,
        }}
      />
    </div>
  )
}
