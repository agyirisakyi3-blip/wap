import { SectionHeading } from "@/components/features/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Target, Lightbulb, Sparkles } from "lucide-react"

export function VisionMissionSection() {
  return (
    <section id="vision-mission" className="relative bg-background py-16 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Foundation"
          title="Vision & Mission"
          description="Guided by a clear purpose and a bold vision for the future of global academia."
        />

        <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          <Card className="group relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <CardContent className="relative p-6 sm:p-10">
              <div className="mb-4 inline-flex rounded-xl bg-gold/10 p-2.5 text-gold sm:mb-6 sm:rounded-2xl sm:p-3">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary sm:mb-4 sm:text-2xl">Our Vision</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-lg">
                To become the world&apos;s leading global network of professors,
                advancing excellence in education, research, innovation, and
                academic leadership for sustainable global development.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gold sm:mt-6 sm:text-sm">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="font-medium">Leading global academic excellence</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <CardContent className="relative p-6 sm:p-10">
              <div className="mb-4 inline-flex rounded-xl bg-gold/10 p-2.5 text-gold sm:mb-6 sm:rounded-2xl sm:p-3">
                <Target className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary sm:mb-4 sm:text-2xl">Our Mission</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-lg">
                To unite professors worldwide by promoting academic excellence,
                fostering international collaboration, supporting research and
                innovation, advocating for quality education, and empowering
                educators to make a lasting impact on society.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gold sm:mt-6 sm:text-sm">
                <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="font-medium">Empowering educators worldwide</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
