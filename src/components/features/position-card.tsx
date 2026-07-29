"use client"

import { cn } from "@/lib/utils"
import { ChevronRight, Sparkles } from "lucide-react"

interface PositionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function PositionCard({
  icon,
  title,
  description,
  badge,
  isSelected,
  onClick,
  className,
}: PositionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer text-left transition-all duration-500",
        "rounded-2xl border-2 p-5 sm:p-6",
        isSelected
          ? "border-gold/50 bg-gradient-to-br from-gold/[0.04] to-gold/[0.01] shadow-lg shadow-gold/10"
          : "border-border/60 bg-card shadow-sm hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-opacity duration-500",
        isSelected
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100"
      )}>
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gold/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-gold/5 blur-xl" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className={cn(
          "shrink-0 rounded-2xl p-3 transition-all duration-500 sm:p-3.5",
          isSelected
            ? "bg-gradient-to-br from-gold/20 to-gold/5 text-gold shadow-inner"
            : "bg-gold/10 text-gold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/10"
        )}>
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-primary sm:text-lg">{title}</h3>
            <ChevronRight className={cn(
              "mt-0.5 h-5 w-5 shrink-0 transition-all duration-300",
              isSelected ? "translate-x-0.5 text-gold" : "text-muted-foreground/30 group-hover:translate-x-0.5 group-hover:text-gold/60"
            )} />
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
          {badge && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold sm:text-xs">
              <Sparkles className="h-3 w-3" />
              {badge}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
