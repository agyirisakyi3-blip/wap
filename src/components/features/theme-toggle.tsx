"use client"

import { useSyncExternalStore, useCallback } from "react"
import { Sun, Moon } from "lucide-react"

const STORAGE_KEY = "wpa-theme"

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot(): "dark" | "light" {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "dark" || stored === "light" ? stored : getSystemTheme()
}

function getServerSnapshot(): "dark" | "light" {
  return "light"
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark"
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
    window.dispatchEvent(new Event("storage"))
  }, [theme])

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/15 p-2 text-primary-foreground/70 transition-all duration-200 hover:border-primary-foreground/30 hover:text-primary-foreground active:scale-95"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
