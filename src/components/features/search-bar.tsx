"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, FileText, Users, Target, BookOpen, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

const searchData: SearchResult[] = [
  { title: "Vision & Mission", description: "Our foundation and guiding principles", href: "#vision-mission", icon: <Target className="h-4 w-4" /> },
  { title: "Global Reach", description: "10,000+ professors across 120+ countries", href: "#stats", icon: <Globe className="h-4 w-4" /> },
  { title: "Key Objectives", description: "Academic excellence, global collaboration, research & innovation", href: "#objectives", icon: <BookOpen className="h-4 w-4" /> },
  { title: "Strategic Goals", description: "Global network, international events, research publications", href: "#goals", icon: <Target className="h-4 w-4" /> },
  { title: "Gallery", description: "Photo gallery of events and conferences", href: "#gallery", icon: <FileText className="h-4 w-4" /> },
  { title: "Join the Network", description: "Register as a member of WPA", href: "#registration", icon: <Users className="h-4 w-4" /> },
  { title: "Testimonials", description: "What our members say about WPA", href: "#testimonials", icon: <FileText className="h-4 w-4" /> },
  { title: "About WPA", description: "World Professors Association overview", href: "#vision-mission", icon: <Users className="h-4 w-4" /> },
  { title: "Membership Registration", description: "Become a part of our global network", href: "#registration", icon: <Users className="h-4 w-4" /> },
  { title: "Academic Excellence", description: "Promoting excellence in teaching and research", href: "#objectives", icon: <BookOpen className="h-4 w-4" /> },
  { title: "Global Collaboration", description: "International academic partnerships", href: "#objectives", icon: <Globe className="h-4 w-4" /> },
  { title: "Privacy Policy", description: "How we handle your data", href: "/privacy-policy", icon: <FileText className="h-4 w-4" /> },
  { title: "Terms of Service", description: "Terms governing your use of WPA", href: "/terms-of-service", icon: <FileText className="h-4 w-4" /> },
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((o) => !o)
      }
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [isOpen])

  const results = query.trim()
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchData

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 text-sm text-primary-foreground/60 transition-colors duration-200 hover:text-primary-foreground"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded-sm border border-primary-foreground/20 px-1.5 py-0.5 text-[10px] text-primary-foreground/40 md:inline-block">
          Ctrl+K
        </kbd>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 animate-scale-in">
          <div className="overflow-hidden rounded-sm border border-border bg-card shadow-xl shadow-black/10">
            <div className="flex items-center border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, content..."
                className="w-full bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((result, index) => (
                  <a
                    key={index}
                    href={result.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/60",
                      "border-b border-border/40 last:border-b-0"
                    )}
                  >
                    <div className="mt-0.5 rounded-sm border border-gold/20 bg-gold/5 p-1.5 text-gold">
                      {result.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{result.title}</div>
                      <div className="text-xs text-muted-foreground">{result.description}</div>
                    </div>
                  </a>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {results.length} {results.length === 1 ? "result" : "results"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Esc to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
