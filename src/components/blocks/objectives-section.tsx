import { SectionHeading } from "@/components/features/section-heading"
import { Card, CardContent } from "@/components/ui/card"
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
    <section id="objectives" className="relative bg-secondary/50 py-16 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Focus"
          title="Key Objectives"
          description="Seven core pillars that guide our efforts to transform global higher education."
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((obj, index) => {
            const Icon = obj.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gold/5 blur-xl transition-all duration-500 group-hover:scale-150" />
                <CardContent className="relative p-5 sm:p-8">
                  <div className="mb-3 inline-flex rounded-lg bg-gold/10 p-2 text-gold transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:rounded-xl sm:p-2.5">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-primary sm:mb-3 sm:text-lg">
                    {obj.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {obj.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
