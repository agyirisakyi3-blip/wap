import type { Metadata } from "next"
import { Navbar } from "@/components/blocks/navbar"
import { FooterSection } from "@/components/blocks/footer-section"
import { ScrollText, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | World Professors Association",
  description: "Terms of Service of the World Professors Association (WPA).",
}

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using the World Professors Association (WPA) website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "Membership Eligibility",
    content:
      "Membership in WPA is open to professors, researchers, and academic professionals who meet the criteria established by the association. WPA reserves the right to approve or deny membership applications at its discretion.",
  },
  {
    title: "Member Obligations",
    content:
      "Members agree to uphold the values and objectives of WPA, maintain professional ethics, provide accurate information, and comply with all applicable laws and regulations.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content published on the WPA website, including text, graphics, logos, and materials, is the property of WPA or its content providers and is protected by applicable intellectual property laws.",
  },
  {
    title: "Code of Conduct",
    content:
      "Members and users agree to engage respectfully, refrain from harassment or discrimination, and contribute positively to the academic community. WPA reserves the right to suspend or terminate membership for violations.",
  },
  {
    title: "Limitation of Liability",
    content:
      "WPA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.",
  },
  {
    title: "Termination",
    content:
      "WPA reserves the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the association.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the new terms.",
  },
  {
    title: "Contact",
    content:
      "For questions about these Terms of Service, please contact us at worldprofessorswpa@gmail.com.",
  },
]

export default function TermsOfServicePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-primary focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background pt-24 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          <header className="border-b border-border pb-10 pt-6 sm:pb-12 sm:pt-10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/25 bg-gold/10 text-gold">
                <ScrollText className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
                Legal
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-primary sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Last updated: July 2026
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              These terms govern your use of the website and services of the World
              Professors Association (&ldquo;WPA&rdquo;). Please read them carefully
              before accessing or using our services.
            </p>
          </header>

          <div className="mt-2">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="border-b border-border py-8 sm:py-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-lg italic text-gold/50 sm:text-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-3 pl-0 text-sm leading-relaxed text-muted-foreground sm:pl-9 sm:text-base">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-sm border border-gold/25 bg-gold/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gold" />
              <div>
                <p className="text-sm font-semibold text-primary">Questions?</p>
                <p className="text-xs text-muted-foreground">
                  worldprofessorswpa@gmail.com
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              WPA • Accra • Global
            </span>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}
