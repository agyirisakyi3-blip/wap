import { SectionHeading } from "@/components/features/section-heading"
import {
  BookOpen,
  Users,
  Briefcase,
  Lightbulb,
  Shield,
  Handshake,
} from "lucide-react"

const objectives = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description:
      "Promote excellence in teaching, research, and academic leadership across all disciplines.",
  },
  {
    icon: Users,
    title: "Global Collaboration",
    description:
      "Encourage international collaboration among professors and academic institutions worldwide.",
  },
  {
    icon: Briefcase,
    title: "Professional Development",
    description:
      "Support professional development through training, conferences, and certification programs.",
  },
  {
    icon: Lightbulb,
    title: "Research & Innovation",
    description:
      "Advance research, innovation, and knowledge sharing across all academic disciplines.",
  },
  {
    icon: Shield,
    title: "Academic Ethics",
    description:
      "Advocate for high standards in higher education and academic ethics globally.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Build partnerships with universities, governments, and international organizations.",
  },
]

export function ObjectivesSection() {
  return (
    <section
      id="objectives"
      className="border-y border-border bg-card py-24 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Focus"
          index="02"
          title="Key Objectives"
          description="Six core pillars that guide our efforts to transform global higher education."
        />

        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 sm:mt-20 lg:grid-cols-3">
          {objectives.map((obj, index) => {
            const Icon = obj.icon
            const num = String(index + 1).padStart(2, "0")
            return (
              <div
                key={num}
                className="group relative bg-background p-7 transition-colors duration-300 hover:bg-gold/[0.04] sm:p-9"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/25 text-gold transition-colors duration-300 group-hover:bg-gold/10">
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <span className="font-display text-2xl font-normal italic text-gold/30">
                    {num}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-primary">
                  {obj.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {obj.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
