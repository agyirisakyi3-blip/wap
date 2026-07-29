import type { Metadata } from "next"
import { Navbar } from "@/components/blocks/navbar"
import { FooterSection } from "@/components/blocks/footer-section"
import { FileText } from "lucide-react"

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
      "For questions about these Terms of Service, please contact us at legal@wpa.global.",
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
      <main id="main-content" className="pt-28 sm:pt-36">
        <section className="relative bg-background py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <FileText className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated: July 2026
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="mb-3 text-xl font-bold text-primary">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}
