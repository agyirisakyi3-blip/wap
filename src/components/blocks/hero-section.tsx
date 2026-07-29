import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold sm:px-4 sm:py-1.5 sm:text-sm">
              <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Global Academic Network
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              World Professors{" "}
              <span className="text-gold">Association</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg sm:text-xl">
              Uniting professors worldwide to advance excellence in education,
              research, innovation, and academic leadership for sustainable
              global development.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <a
                href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="gold" size="xl" className="w-full gap-2 sm:w-auto">
                  Join the Network
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <Button
                variant="outline"
                size="xl"
                className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              >
                Explore More
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 sm:gap-6 sm:pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-muted text-[10px] font-bold text-muted-foreground sm:h-10 sm:w-10 sm:text-xs"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-xs text-primary-foreground/60 sm:text-sm">
                <span className="font-semibold text-gold">10,000+</span>{" "}
                professors worldwide
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative">
              <div className="absolute -top-8 -right-8 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative rotate-2 transform transition-transform duration-500 hover:rotate-0">
                <div className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-gold/30 via-gold/10 to-gold/5 blur-sm" />
                <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-br from-gold/20 to-transparent" />

                <div className="relative w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-2xl shadow-gold/15 sm:max-w-sm md:w-80">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold/80 to-gold/60" />

                  <div className="p-2">
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        src="/OFFICIAL MEETING NOTIC.jpeg"
                        alt="Official Meeting Notice"
                        width={400}
                        height={550}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 px-5 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          World Professors Association
                      </p>
                        <p className="text-[10px] text-gray-300">Official Notice</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10">
                        <span className="text-xs font-bold text-gold">WPA</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 h-16 w-16">
                    <div className="absolute right-2 bottom-2 h-8 w-8 border-r-2 border-b-2 border-gold/20 rounded-br-md" />
                  </div>
                  <div className="absolute top-0 left-0 h-16 w-16">
                    <div className="absolute top-2 left-2 h-8 w-8 border-l-2 border-t-2 border-gold/20 rounded-tl-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
