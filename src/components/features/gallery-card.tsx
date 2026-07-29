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
      className="group relative overflow-hidden rounded-xl aspect-[4/3] w-full cursor-pointer text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110", gradient)} />
      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
      <div className="absolute top-3 right-3 z-10 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:top-4 sm:right-4 sm:text-xs">
        {category}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
          <Maximize2 className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-5">
        <div className="mb-1 text-white/80">{icon}</div>
        <h3 className="text-sm font-bold text-white sm:text-base">{title}</h3>
      </div>
    </button>
  )
}
