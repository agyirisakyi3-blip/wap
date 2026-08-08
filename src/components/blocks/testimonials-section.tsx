"use client"

import { useState, useEffect, useCallback } from "react"
import { SectionHeading } from "@/components/features/section-heading"
import { TestimonialCard } from "@/components/features/testimonial-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "WPA has transformed the way I collaborate with fellow academics globally. The conferences are world-class and the network is invaluable for cross-disciplinary research.",
    name: "Dr. Sarah Mitchell",
    title: "Professor of Physics",
    institution: "University of Cambridge",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    initials: "SM",
  },
  {
    quote: "Being part of WPA opened doors to international research partnerships I could only dream of before. The membership has been instrumental in advancing my work in sustainable development.",
    name: "Prof. James Osei",
    title: "Dean of Research",
    institution: "University of Ghana",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    initials: "JO",
  },
  {
    quote: "The professional development programs offered by WPA are exceptional. I have grown immensely as an educator through their workshops and mentorship initiatives.",
    name: "Dr. Yuki Tanaka",
    title: "Associate Professor",
    institution: "University of Tokyo",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    initials: "YT",
  },
  {
    quote: "WPA provides a unique platform for professors from developing nations to connect with global leaders in academia. The impact on my institution has been remarkable.",
    name: "Prof. Maria Santos",
    title: "Chair, Department of Education",
    institution: "University of São Paulo",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    initials: "MS",
  },
  {
    quote: "I joined WPA for the networking but stayed for the community. The collaborative spirit and shared commitment to academic excellence is truly inspiring.",
    name: "Dr. Ahmed Al-Rashid",
    title: "Professor of Engineering",
    institution: "King Saud University",
    gradient: "bg-gradient-to-br from-amber-500 to-yellow-600",
    initials: "AA",
  },
  {
    quote: "The grants and scholarship programs through WPA have enabled my research team to make breakthroughs we couldn't have achieved otherwise. A truly impactful organization.",
    name: "Prof. Elena Voronova",
    title: "Director of Research",
    institution: "Moscow State University",
    gradient: "bg-gradient-to-br from-rose-500 to-pink-600",
    initials: "EV",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const getVisible = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length])
    }
    return items
  }

  const visible = getVisible()

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background py-24 sm:py-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-[220px] leading-none text-primary/[0.04] select-none sm:text-[320px]">
        &ldquo;
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          index="05"
          title="What Our Members Say"
          description="Hear from professors around the world about their experience with WPA."
        />

        <div className="mt-14 sm:mt-20">
          <div className="hidden gap-6 sm:grid sm:grid-cols-3">
            {visible.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>

          <div className="sm:hidden">
            <div className="animate-fade-in">
              <TestimonialCard {...testimonials[current]} />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 sm:mt-12">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-gold/50 hover:text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === current}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "font-display px-1.5 text-sm italic transition-colors duration-300",
                    index === current
                      ? "text-gold"
                      : "text-muted-foreground/40 hover:text-muted-foreground"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-gold/50 hover:text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-muted-foreground sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1 w-1 rounded-full bg-gold" />
              {testimonials.length} verified reviews
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="flex items-center gap-2">
              <span className="text-gold">★★★★★</span>
              4.9 average rating
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
