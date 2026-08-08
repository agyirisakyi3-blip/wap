import Image from "next/image"
import { ListChecks, Quote } from "lucide-react"

const agendaItems = [
  "Uniting Educators and Upholding the Integrity of Education.",
  "Academic Excellence and Standards of Professorship.",
  "Technology and the Future of Education: Online Certification.",
  "Governance and Growth of the World Professors Association (Membership Registration).",
  "Excellence in Ethics, Security, and Geopolitics.",
]

export function MeetingNoticeSection() {
  return (
    <section className="relative bg-secondary/50 py-16 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-border bg-card shadow-sm">
          <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-gold via-gold/70 to-gold/30" />

          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-gold/30 text-gold">
                <Quote className="h-3 w-3" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                Official Meeting Notice
              </span>
            </div>
            <div className="overflow-hidden rounded-sm border border-border/60 bg-white p-2 sm:p-4">
              <Image
                src="/OFFICIAL MEETING NOTIC.jpeg"
                alt="Official Meeting Notice - World Professors Association"
                width={1200}
                height={800}
                className="h-auto w-full rounded-sm object-contain"
                priority
              />
            </div>
          </div>

          <div className="border-t border-border px-6 pb-6 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
            <div className="mx-auto max-w-4xl space-y-10 sm:space-y-14">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gold/25 bg-gold/5 text-gold">
                    <ListChecks className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                      Agenda
                    </h3>
                    <span className="h-px w-10 bg-gold/40" />
                  </div>
                </div>
                <ol className="space-y-0">
                  {agendaItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-4 border-b border-border/60 py-3.5 last:border-b-0"
                    >
                      <span className="w-8 shrink-0 font-display text-sm italic text-gold/60 sm:text-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gold/25 bg-gold/5 text-gold">
                    <Quote className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                      Theme
                    </h3>
                    <span className="h-px w-10 bg-gold/40" />
                  </div>
                </div>
                <blockquote className="relative py-8 text-center">
                  <span className="absolute top-0 left-1/2 h-px w-16 -translate-x-1/2 bg-gold/60" />
                  <p className="font-display text-xl font-medium italic tracking-tight text-primary sm:text-3xl">
                    &ldquo;Uniting Educators, Upholding Quality.&rdquo;
                  </p>
                  <span className="absolute bottom-0 left-1/2 h-px w-16 -translate-x-1/2 bg-gold/60" />
                </blockquote>
              </div>

              <div className="rounded-sm border border-border bg-card px-6 py-6 text-center text-sm leading-relaxed text-muted-foreground sm:px-10 sm:text-base">
                All members are encouraged to attend promptly and participate
                actively as we deliberate on issues that will shape the future
                of education and advance the mission of the World Professors&apos;
                Association.
                <br />
                <br />
                We look forward to your valuable participation.
              </div>

              <div className="border-t border-border pt-8 text-center sm:pt-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
                  Signed
                </p>
                <p className="mt-3 font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                  Prof. Paul Allieu Kamara
                </p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="h-px w-6 bg-gold/50" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                    President
                  </span>
                  <span className="h-px w-6 bg-gold/50" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  World Professors&apos; Association (WPA)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
