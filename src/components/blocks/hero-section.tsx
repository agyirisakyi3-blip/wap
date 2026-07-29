import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowRight, ChevronLeft, ChevronRight, Quote, Globe, BookOpen, Trophy } from "lucide-react"

const slides = [
  {
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    title: "Global Academic Network",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    quote: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
    title: "Excellence in Research",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    quote: "The function of education is to teach one to think intensively and to think critically.",
    author: "Martin Luther King Jr.",
    title: "Academic Leadership",
    icon: <Trophy className="h-5 w-5" />,
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Animated blob background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] animate-blob bg-gradient-to-br from-gold/15 via-gold/5 to-transparent opacity-70 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 h-[600px] w-[600px] animate-blob bg-gradient-to-tr from-blue-500/10 via-gold/5 to-transparent opacity-60 blur-3xl" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] animate-blob bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-40 blur-3xl" style={{ animationDelay: "6s" }} />
      </div>

      {/* Animated dots */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[15%] left-[10%] h-2 w-2 rounded-full bg-gold/60 animate-pulse" />
        <div className="absolute top-[25%] right-[15%] h-1.5 w-1.5 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[50%] left-[5%] h-2.5 w-2.5 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[30%] right-[10%] h-2 w-2 rounded-full bg-gold/60 animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[70%] left-[20%] h-1.5 w-1.5 rounded-full bg-gold/30 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[35%] left-[50%] h-2 w-2 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: "2.5s" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            {/* Rotating quote */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold sm:px-4 sm:py-1.5 sm:text-sm">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Global Academic Network
              </div>
            </div>

            <RotatingQuote />

            <p className="max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:text-lg sm:text-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Uniting professors worldwide to advance excellence in education,
              research, innovation, and academic leadership for sustainable
              global development.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <a
                href="https://chat.whatsapp.com/IrDYcp6tA1e0Xf5ww7NHqg?s=sw&p=a&mlu=0&ilr=0&amv=0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="gold" size="xl" className="w-full gap-2 sm:w-auto shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300">
                  Join the Network
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="/apply">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                >
                  View Positions
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 sm:gap-6 sm:pt-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
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

          <div className="relative flex items-center justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -top-8 -right-8 h-48 w-48 rounded-full bg-gold/10 blur-3xl animate-blob" />
              <div className="absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

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
                        className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
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

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

function RotatingQuote() {
  return (
    <div className="relative animate-fade-in">
      <Quote className="absolute -top-3 -left-3 h-6 w-6 text-gold/20 sm:-top-4 sm:-left-4 sm:h-8 sm:w-8" />
      <div className="space-y-3 pl-4 sm:pl-6">
        <div className="overflow-hidden rounded-xl border-l-4 border-gold/40 bg-gold/5 px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-sm italic leading-relaxed text-primary-foreground/80 sm:text-base sm:text-lg">
            &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
          </p>
          <p className="mt-2 text-xs font-medium text-gold/80 sm:text-sm">
            — Nelson Mandela
          </p>
        </div>
      </div>
    </div>
  )
}
