"use client"

import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  institution: string
  gradient: string
  initials: string
  className?: string
}

export function TestimonialCard({
  quote,
  name,
  title,
  institution,
  gradient,
  initials,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:p-8",
        className
      )}
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gold/5 blur-xl transition-all duration-500 group-hover:scale-150" />
      <Quote className="relative mb-3 h-8 w-8 text-gold/30 sm:mb-4 sm:h-10 sm:w-10" />
      <p className="relative mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="relative flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base",
            gradient
          )}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary sm:text-base">{name}</p>
          <p className="text-xs text-muted-foreground">{title}, {institution}</p>
        </div>
      </div>
    </div>
  )
}
