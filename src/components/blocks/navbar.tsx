"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LiveClock } from "@/components/features/live-clock"
import { SearchBar } from "@/components/features/search-bar"
import { ThemeToggle } from "@/components/features/theme-toggle"

const navItems = [
  { href: "#vision-mission", label: "About", id: "about" },
  { href: "#objectives", label: "Objectives", id: "objectives" },
  { href: "#goals", label: "Goals", id: "goals" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#registration", label: "Join", id: "registration" },
  { href: "/apply", label: "Apply", id: "apply" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const ids = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const onScroll = () => {
      const scrollPos = window.scrollY + 140
      let current = ""
      for (const el of sections) {
        if (el.offsetTop <= scrollPos) current = el.id
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-primary-foreground/10 bg-primary/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-b border-primary-foreground/10 bg-primary"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-1.5 sm:px-6 lg:px-8">
        <span className="mr-auto hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground/50 sm:flex">
          <span className="inline-block h-1 w-1 rounded-full bg-gold" />
          World Professors Association
        </span>
        <LiveClock />
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-all duration-500",
          isScrolled
            ? "bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            : "bg-transparent"
        )}
      />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-sm ring-1 ring-gold/30 transition-all duration-300 group-hover:ring-gold/60">
            <Image
              src="/logo.jpeg"
              alt="World Professors Association logo"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block font-display text-base font-semibold leading-tight tracking-tight text-primary-foreground">
              WPA
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
              Global Academia
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "group relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all duration-200",
                item.href === `#${activeId}`
                  ? "text-primary-foreground"
                  : "text-primary-foreground/75 hover:text-primary-foreground"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300",
                  item.href === `#${activeId}` ? "w-3/5" : "w-0 group-hover:w-3/5"
                )}
              />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <SearchBar />
          <a
            href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="sm">
              Join Us
            </Button>
          </a>
        </div>

        <button
          className={cn(
            "inline-flex items-center justify-center rounded-sm p-2.5 text-primary-foreground transition-all duration-200 lg:hidden",
            "hover:bg-primary-foreground/10 active:scale-95"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-primary-foreground/10 bg-primary/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium text-primary-foreground/75 transition-all duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-px w-4 bg-gold/60" />
              {item.label}
            </a>
          ))}
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="gold" className="w-full">
                Join Us
              </Button>
            </a>
            <a href="/apply" className="flex-1" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Apply
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
