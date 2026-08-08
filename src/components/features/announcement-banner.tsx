"use client"

import { useSyncExternalStore, useCallback } from "react"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

const STORAGE_KEY = "wpa-announcement-dismissed"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "true"
}

function getServerSnapshot() {
  return false
}

export function AnnouncementBanner() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true")
    window.dispatchEvent(new Event("storage"))
  }, [])

  if (dismissed) return null

  return (
    <div className="relative z-[60] animate-slide-down bg-primary text-primary-foreground">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 text-xs sm:text-sm">
          <span className="hidden h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/80 sm:block" />
          <span className="flex min-w-0 items-baseline gap-2.5">
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
              Announcement
            </span>
            <span className="truncate text-primary-foreground/80">
              Applications are open for various positions
            </span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/apply"
            onClick={dismiss}
            className="inline-flex items-center gap-1.5 rounded-sm border border-gold/50 px-3 py-1 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-primary sm:text-sm"
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={dismiss}
            className="rounded-sm p-1 text-primary-foreground/40 transition-colors hover:text-primary-foreground"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
