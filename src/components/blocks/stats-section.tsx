import { StatCard } from "@/components/features/stat-card"
import { Users, Globe, Award, Building2 } from "lucide-react"

const stats = [
  {
    value: "10,000+",
    label: "Professors Worldwide",
    icon: <Users className="h-6 w-6" />,
  },
  {
    value: "120+",
    label: "Countries Represented",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    value: "500+",
    label: "Partner Institutions",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    value: "50+",
    label: "Annual Events",
    icon: <Award className="h-6 w-6" />,
  },
]

export function StatsSection() {
  return (
    <section className="relative bg-primary py-16 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
            Our Global Reach
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground/70 sm:mt-4 sm:text-base">
            Growing stronger every day, connecting academics across borders and
            disciplines.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              className="border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/60 [&_.text-primary]:text-primary-foreground [&_.text-gold]:text-gold [&_.bg-gold\/10]:bg-gold/10"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
