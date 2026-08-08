"use client"

import { cn } from "@/lib/utils"
import { Maximize2 } from "lucide-react"

interface GalleryCardProps {
  title: string
  category: string
  gradient: string
  icon: React.ReactNode
  onClick?: () => void
}

export function GalleryCard({ title, category, gradient, icon, onClick }: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full cursor-pointer overflow-hidden rounded-sm text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br", gradient)}>
        <div className="absolute inset-0 bg-primary/30 transition-colors duration-500 group-hover:bg-primary/10" />

        <div className="absolute inset-0 flex items-center justify-center opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
          {icon}
        </div>

        <div className="absolute top-0 right-0 left-0 flex items-center justify-between px-4 pt-4">
          <span className="rounded-sm bg-black/25 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            {category}
          </span>
          <div className="flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-14 sm:p-5">
          <h3 className="font-display text-base font-medium leading-snug tracking-tight text-white sm:text-lg">
            {title}
          </h3>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      </div>
    </button>
  )
}
