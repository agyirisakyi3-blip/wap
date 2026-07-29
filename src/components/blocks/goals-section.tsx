import { SectionHeading } from "@/components/features/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import {
  Network,
  Globe,
  FileText,
  Award,
  Cpu,
  BookOpen,
  Heart,
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
    fullWidth: true,
  },
]

export function GoalsSection() {
  return (
    <section id="goals" className="relative bg-background py-16 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Ambition"
          title="Strategic Goals"
          description="Ambitious targets that drive our mission forward and create lasting impact."
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  goal.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gold/5 blur-xl transition-all duration-500 group-hover:scale-150" />
                <CardContent className="relative flex items-start gap-3 p-5 sm:gap-5 sm:p-8">
                  <div className="shrink-0 rounded-lg bg-gold/10 p-2 text-gold transition-transform duration-300 group-hover:scale-110 sm:rounded-xl sm:p-2.5">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-primary sm:mb-2 sm:text-lg">
                      {goal.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {goal.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
