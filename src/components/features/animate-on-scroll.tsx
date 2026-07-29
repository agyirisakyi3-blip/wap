"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/lib/use-in-view"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "scale-in" | "slide-left" | "slide-right"
  delay?: number
  duration?: number
}

export function AnimateOnScroll({
  children,
  className,
  animation = "slide-up",
  delay = 0,
  duration = 0.6,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        inView
          ? `animate-${animation}`
          : "opacity-0 translate-y-8",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
