"use client"

import { useEffect, useState, useRef } from "react"
import { StatCard } from "@/components/features/stat-card"
import { Users, Globe, Award, Building2, Sparkles } from "lucide-react"

const stats = [
  { value: 10000, suffix: "+", label: "Professors Worldwide", icon: <Users className="h-6 w-6" /> },
  { value: 120, suffix: "+", label: "Countries Represented", icon: <Globe className="h-6 w-6" /> },
  { value: 500, suffix: "+", label: "Partner Institutions", icon: <Building2 className="h-6 w-6" /> },
  { value: 50, suffix: "+", label: "Annual Events", icon: <Award className="h-6 w-6" /> },
]

function AnimatedStat({ value, suffix, label, icon, delay }: { value: number; suffix: string; label: string; icon: React.ReactNode; delay: number }) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div
      ref={ref}
      className="animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <StatCard
        value={`${count.toLocaleString()}${suffix}`}
        label={label}
        icon={icon}
        className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/60 [&_.text-primary]:text-primary-foreground [&_.text-gold]:text-gold [&_.bg-gold\/10]:bg-gold/10"
      />
    </div>
  )
}

export function StatsSection() {
  return (
    <section id="stats" className="relative bg-primary py-16 sm:py-28 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-gold/10 animate-blob" />
      <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full border border-gold/10 animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4 sm:py-1.5 sm:text-xs">
            <Sparkles className="h-3 w-3" />
            Our Impact
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            Our Global Reach
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/70 sm:mt-4 sm:text-base">
            Growing stronger every day, connecting academics across borders and disciplines.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
