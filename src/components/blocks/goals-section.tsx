import { SectionHeading } from "@/components/features/section-heading"
import {
  Network,
  Globe,
  FileText,
  Award,
  Cpu,
  BookOpen,
  Heart,
  ArrowUpRight,
} from "lucide-react"

const goals = [
  {
    icon: Network,
    title: "Global Network",
    description:
      "Establish a strong global network of professors across all continents.",
  },
  {
    icon: Globe,
    title: "International Events",
    description:
      "Organize international conferences, seminars, and academic forums annually.",
  },
  {
    icon: FileText,
    title: "Research Publications",
    description:
      "Increase collaborative research and publication opportunities for members.",
  },
  {
    icon: Award,
    title: "Scholarships & Grants",
    description:
      "Provide scholarships, grants, and mentorship programs for educators and researchers.",
  },
  {
    icon: Cpu,
    title: "Technology in Education",
    description:
      "Promote the use of technology and innovation in teaching and learning.",
  },
  {
    icon: BookOpen,
    title: "Policy Influence",
    description:
      "Influence educational policies that improve the quality of higher education worldwide.",
  },
  {
    icon: Heart,
    title: "Lifelong Learning",
    description:
      "Foster lifelong learning, inclusiveness, and sustainable development through education.",
  },
]

export function GoalsSection() {
  return (
    <section id="goals" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Ambition"
          index="03"
          title="Strategic Goals"
          description="Ambitious targets that drive our mission forward and create lasting impact."
        />

        <div className="mx-auto mt-14 max-w-5xl sm:mt-20">
          <div className="border-t border-border">
            {goals.map((goal, index) => {
              const Icon = goal.icon
              const num = String(index + 1).padStart(2, "0")
              return (
                <div
                  key={num}
                  className="group grid grid-cols-12 items-baseline gap-3 border-b border-border py-6 transition-colors duration-300 hover:bg-gold/[0.03] sm:gap-6 sm:py-8"
                >
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-display text-lg font-normal italic text-gold/50 sm:text-xl">
                      {num}
                    </span>
                  </div>
                  <div className="col-span-10 flex items-baseline gap-3 sm:col-span-4 sm:gap-4">
                    <Icon className="h-4 w-4 shrink-0 self-center text-gold/70" />
                    <h3 className="font-display text-lg font-medium tracking-tight text-primary sm:text-xl">
                      {goal.title}
                    </h3>
                  </div>
                  <p className="col-span-11 col-start-2 text-sm leading-relaxed text-muted-foreground sm:col-span-6 sm:col-start-6 sm:text-base">
                    {goal.description}
                  </p>
                  <div className="hidden justify-end sm:col-span-1 sm:flex">
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
