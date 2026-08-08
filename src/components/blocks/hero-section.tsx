import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BadgeCheck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
      <h1 className="sr-only">
        World Professors Association — Uniting professors worldwide
      </h1>

      {/* Editorial backdrop */}
      <div className="paper-grid mask-fade-b absolute inset-0" />
      <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-7 lg:space-y-9">
            <div className="animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold sm:text-xs">
                  A Global Academic Network
                </span>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <p className="font-display text-4xl leading-[1.05] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
                Uniting professors
                <br />
                <em className="font-display font-medium italic text-gold">
                  worldwide.
                </em>
              </p>
            </div>

            <p
              className="max-w-xl text-base leading-relaxed text-primary-foreground/70 animate-slide-up sm:text-lg"
              style={{ animationDelay: "0.2s" }}
            >
              Advancing excellence in education, research, innovation, and
              academic leadership for sustainable global development.
            </p>

            <div
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="gold" size="xl" className="w-full gap-2 sm:w-auto">
                  Join the Network
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/apply" className="w-full sm:w-auto">
                <Button
                  variant="outlineGold"
                  size="xl"
                  className="w-full border-primary-foreground/25 text-primary-foreground hover:border-gold/60 hover:bg-primary-foreground/5 hover:text-gold sm:w-auto"
                >
                  View Positions
                </Button>
              </a>
            </div>

            <div
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "10,000+", label: "Professors" },
                { value: "120+", label: "Countries" },
                { value: "500+", label: "Institutions" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-semibold tracking-tight text-gold sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="relative mx-auto max-w-sm animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="absolute -top-6 -right-6 hidden h-40 w-40 rounded-full border border-gold/15 sm:block" />
              <div className="absolute -bottom-8 -left-8 hidden h-24 w-24 rounded-full border border-gold/10 sm:block" />

              <div className="relative overflow-hidden rounded-lg border border-primary-foreground/12 bg-primary-foreground/[0.04]">
                <div className="absolute top-0 left-0 h-[3px] w-28 bg-gradient-to-r from-gold to-gold/40" />
                <div className="p-2 sm:p-3">
                  <div className="overflow-hidden">
                    <Image
                      src="/OFFICIAL MEETING NOTIC.jpeg"
                      alt="Official Meeting Notice of the World Professors Association"
                      width={400}
                      height={550}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-primary-foreground/10 px-5 py-3.5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                      Official Meeting Notice
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-wide text-primary-foreground/45">
                      All members are invited to attend
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                    <BadgeCheck className="h-4 w-4 text-gold" />
                  </div>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.28em] text-primary-foreground/40">
                <span className="h-px w-8 bg-gold/50" />
                Est. Global Academic Network
                <span className="h-px w-8 bg-gold/50" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent" />

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-primary-foreground/25 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-gold" />
        </div>
      </div>
    </section>
  )
}
