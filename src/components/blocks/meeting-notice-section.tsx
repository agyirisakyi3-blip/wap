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
        <div className="overflow-hidden rounded-xl border border-primary/10 bg-card shadow-xl sm:rounded-2xl">
          <div className="p-3 sm:p-8 lg:p-12">
            <Image
              src="/OFFICIAL MEETING NOTIC.jpeg"
              alt="Official Meeting Notice - World Professors Association"
              width={1200}
              height={800}
              className="h-auto w-full rounded-lg object-contain sm:rounded-xl"
              priority
            />
          </div>

          <div className="border-t border-border/50 px-4 pb-4 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12">
            <div className="mx-auto max-w-4xl space-y-6 sm:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="rounded-lg bg-gold/10 p-1.5 text-gold sm:p-2">
                    <ListChecks className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary sm:text-2xl">
                    Agenda
                  </h3>
                </div>
                <ol className="space-y-3 sm:space-y-4">
                  {agendaItems.map((item, index) => (
                    <li key={index} className="flex gap-3 sm:gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="rounded-lg bg-gold/10 p-1.5 text-gold sm:p-2">
                    <Quote className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary sm:text-2xl">
                    Theme
                  </h3>
                </div>
                <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-center sm:rounded-xl sm:p-8">
                  <p className="text-base font-bold italic text-primary sm:text-2xl lg:text-3xl">
                    &ldquo;Uniting Educators, Upholding Quality.&rdquo;
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-muted/50 p-4 text-center text-xs leading-relaxed text-muted-foreground sm:rounded-xl sm:p-8 sm:text-sm sm:text-base">
                All members are encouraged to attend promptly and participate
                actively as we deliberate on issues that will shape the future
                of education and advance the mission of the World Professors&apos;
                Association.
                <br />
                <br />
                We look forward to your valuable participation.
              </div>

              <div className="border-t border-border/50 pt-4 text-center sm:pt-6">
                <p className="text-sm font-semibold text-primary sm:text-base">
                  Signed:
                </p>
                <p className="mt-1 text-base font-bold text-primary sm:mt-2 sm:text-lg">
                  Prof. Paul Allieu Kamara
                </p>
                <p className="text-xs font-medium text-gold sm:text-sm">President</p>
                <p className="text-xs text-muted-foreground sm:text-sm">
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
