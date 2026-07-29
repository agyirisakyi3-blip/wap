"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LiveClock } from "@/components/features/live-clock"

const navItems = [
  { href: "#", label: "Home", id: "home" },
  { href: "#vision-mission", label: "About", id: "about" },
  { href: "#position", label: "Position", id: "position" },
  { href: "#objectives", label: "Objectives", id: "objectives" },
  { href: "#goals", label: "Goals", id: "goals" },
  { href: "#", label: "Publications", id: "publications" },
  { href: "#", label: "Books", id: "books" },
  { href: "#", label: "Blog", id: "blog" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-primary/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "border-b border-primary-foreground/10 transition-all duration-500",
          isScrolled ? "bg-primary/60" : "bg-primary/40"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-1 sm:px-6 lg:px-8">
          <LiveClock />
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-all duration-500",
          isScrolled
            ? "bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            : "bg-transparent"
        )}
      />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-lg ring-2 ring-gold/20 transition-all duration-300 group-hover:ring-gold/40">
            <Image
              src="/logo.jpeg"
              alt="World Professors Association logo"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block text-base font-bold leading-tight text-primary-foreground">
              WPA
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-gold/80">
              World Professors
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center rounded-full bg-primary-foreground/5 px-1 py-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group relative px-4 py-1.5 text-sm font-medium text-primary-foreground/70 transition-all duration-200 hover:text-primary-foreground"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-4/5" />
              </a>
            ))}
          </div>
          <a
            href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="gold" size="sm" className="shadow-lg shadow-gold/20">
              Join Us
            </Button>
          </a>
        </div>

        <button
          className={cn(
            "inline-flex items-center justify-center rounded-lg p-2.5 text-primary-foreground transition-all duration-200 md:hidden",
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
          "overflow-hidden border-t border-primary-foreground/10 bg-primary/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-primary-foreground/70 transition-all duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold/40" />
              {item.label}
            </a>
          ))}
          <a
            href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4"
          >
            <Button variant="gold" className="w-full shadow-lg shadow-gold/20">
              Join Us
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}
