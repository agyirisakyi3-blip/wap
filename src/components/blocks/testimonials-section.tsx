"use client"

import { useState, useEffect, useCallback } from "react"
import { SectionHeading } from "@/components/features/section-heading"
import { TestimonialCard } from "@/components/features/testimonial-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

  const visible = (() => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length])
    }
    return items
  })()

  return (
    <section
      id="testimonials"
      className="relative bg-background py-16 sm:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Members Say"
          description="Hear from professors around the world about their experience with WPA."
        />

        <div className="relative mt-10 sm:mt-16">
          <div className="hidden gap-6 sm:grid sm:grid-cols-3">
            {visible.map((item, index) => (
              <TestimonialCard
                key={`${item.name}-${index}`}
                {...item}
                className="animate-fade-in"
              />
            ))}
          </div>

          <div className="sm:hidden">
            <TestimonialCard
              {...testimonials[current]}
              className="animate-fade-in mx-auto max-w-md"
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card text-muted-foreground transition-all duration-200 hover:bg-gold/10 hover:text-gold hover:border-gold/30"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-gold"
                      : "w-2 bg-primary/10 hover:bg-primary/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-card text-muted-foreground transition-all duration-200 hover:bg-gold/10 hover:text-gold hover:border-gold/30"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
