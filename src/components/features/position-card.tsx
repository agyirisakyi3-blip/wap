"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

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
        "group relative w-full cursor-pointer overflow-hidden rounded-sm border text-left transition-all duration-300",
        isSelected
          ? "border-gold/70 bg-gold/[0.04]"
          : "border-border bg-card hover:border-gold/50 hover:bg-gold/[0.02]",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 h-[3px] w-0 bg-gold transition-all duration-500",
          isSelected ? "w-full" : "group-hover:w-full"
        )}
      />

      <div className="relative flex items-start gap-4 p-5 sm:p-6">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border transition-colors duration-300",
            isSelected
              ? "border-gold/40 bg-gold/15 text-gold"
              : "border-gold/20 bg-gold/5 text-gold"
          )}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-medium tracking-tight text-primary">
              {title}
            </h3>
            <ArrowUpRight
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0 transition-all duration-300",
                isSelected
                  ? "text-gold"
                  : "-translate-x-1 translate-y-1 text-gold opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              )}
            />
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          {badge && (
            <div className="mt-3 inline-block rounded-sm border border-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
              {badge}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
