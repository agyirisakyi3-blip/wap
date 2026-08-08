import type { Metadata } from "next"
import { Navbar } from "@/components/blocks/navbar"
import { FooterSection } from "@/components/blocks/footer-section"
import { ShieldCheck, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | World Professors Association",
  description: "Privacy Policy of the World Professors Association (WPA).",
}

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us when you register for membership, subscribe to our newsletter, attend our events, or communicate with us. This may include your name, email address, institutional affiliation, academic credentials, and professional background.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to process membership applications, communicate with you about WPA events and initiatives, facilitate academic collaboration opportunities, improve our services, and comply with legal obligations.",
  },
  {
    title: "Data Sharing and Disclosure",
    content:
      "We do not sell your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting our activities, subject to strict confidentiality agreements.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, update, or request deletion of your personal information. You may also object to processing of your personal information and request that we restrict the processing of your data where applicable. To exercise any of these rights, please contact us using the details below.",
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "International Data Transfers",
    content:
      "As an international association, your information may be transferred to and processed in countries outside your country of residence. We take reasonable steps to ensure that any such transfers are conducted with appropriate safeguards.",
  },
  {
    title: "Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify members of material changes by posting the updated policy on this page.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at worldprofessorswpa@gmail.com or write to us at Kwame Nkrumah Avenue, Accra – Ghana, West Africa.",
  },
]

export default function PrivacyPolicyPage() {
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
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
                Legal
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-primary sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Last updated: July 2026
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              The World Professors Association (&ldquo;WPA&rdquo;) is committed to
              protecting the privacy and security of the personal information of our
              members, applicants, and website visitors.
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
