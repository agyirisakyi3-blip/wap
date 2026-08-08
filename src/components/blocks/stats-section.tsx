"use client"

import { useEffect, useState, useRef } from "react"
import { Users, Globe, Building2, Award } from "lucide-react"

const stats = [
  { value: 10000, suffix: "+", label: "Professors Worldwide", icon: <Users className="h-4 w-4" /> },
  { value: 120, suffix: "+", label: "Countries Represented", icon: <Globe className="h-4 w-4" /> },
  { value: 500, suffix: "+", label: "Partner Institutions", icon: <Building2 className="h-4 w-4" /> },
  { value: 50, suffix: "+", label: "Annual Events", icon: <Award className="h-4 w-4" /> },
]

function CountUp({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const steps = 50
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
    <span>
      {count.toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

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

  return (
    <section id="stats" className="relative overflow-hidden bg-primary py-20 sm:py-28">
      <div className="paper-grid absolute inset-0 opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
            <span className="h-px w-8 bg-gold/60" />
            Our Global Reach
            <span className="h-px w-8 bg-gold/60" />
          </span>
          <h2 className="font-display max-w-2xl text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl">
            A worldwide community of scholars
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-px overflow-hidden border border-primary-foreground/12 bg-primary-foreground/12 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-4 bg-primary/60 px-6 py-10 text-center transition-colors duration-300 hover:bg-primary/40 sm:py-14"
            >
              <div className="flex items-center gap-2 text-primary-foreground/40">
                {stat.icon}
                <span className="text-[10px] uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
              <div className="font-display text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-primary-foreground/40 sm:text-sm">
          Growing stronger every day — connecting academics across borders and disciplines
        </p>
      </div>
    </section>
  )
}
