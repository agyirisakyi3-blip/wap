"use client"

import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryItem {
  title: string
  category: string
  gradient: string
  icon: React.ReactNode
  description?: string
}

interface LightboxModalProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function LightboxModal({ items, currentIndex, onClose, onPrev, onNext }: LightboxModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  if (!items[currentIndex]) return null

  const item = items[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        className="mx-4 max-w-4xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className={cn("flex aspect-[4/3] items-center justify-center bg-gradient-to-br sm:aspect-[16/10]", item.gradient)}>
            <div className="text-white/30">{item.icon}</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white sm:text-xl">{item.title}</h3>
          <p className="mt-1 text-sm text-white/60">{item.category}</p>
          {item.description && (
            <p className="mt-2 text-sm text-white/40">{item.description}</p>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-white/30">
          {currentIndex + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
