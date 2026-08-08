import { SectionHeading } from "@/components/features/section-heading"
import { Eye, Target } from "lucide-react"

export function VisionMissionSection() {
  return (
    <section
      id="vision-mission"
      className="relative bg-background py-24 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              label="Our Foundation"
              index="01"
              title="Vision & Mission"
              description="Guided by a clear purpose and a bold vision for the future of global academia."
            />
            <div className="mt-8 hidden lg:block">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-px w-12 bg-gold/60" />
                World Professors Association
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              <div className="group flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-gold/[0.03] sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/15">
                    <Eye className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-normal italic text-gold/40">
                    01
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                  Our Vision
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To become the world&apos;s leading global network of professors,
                  advancing excellence in education, research, innovation, and
                  academic leadership for sustainable global development.
                </p>
                <div className="mt-8 border-t border-border pt-5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  Leading academic excellence
                </div>
              </div>

              <div className="group flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-gold/[0.03] sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/15">
                    <Target className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-normal italic text-gold/40">
                    02
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                  Our Mission
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To unite professors worldwide by promoting academic excellence,
                  fostering international collaboration, supporting research and
                  innovation, advocating for quality education, and empowering
                  educators to make a lasting impact on society.
                </p>
                <div className="mt-8 border-t border-border pt-5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  Empowering educators worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
