"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("wpa-announcement-dismissed")
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem("wpa-announcement-dismissed", "true")
  }

  if (!visible) return null

  return (
    <div className="relative z-[60] animate-slide-down">
      <div className="bg-gradient-to-r from-gold/90 via-gold to-gold/90 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-xs font-medium sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
            <span className="truncate">
              Applications are open for various positions
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/apply"
              onClick={dismiss}
              className="inline-flex items-center gap-1 rounded-md bg-primary-foreground/15 px-3 py-1 text-xs font-semibold transition-colors hover:bg-primary-foreground/25 sm:text-sm"
            >
              Apply Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={dismiss}
              className="rounded-md p-1 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
