import type { Metadata } from "next"
import { Navbar } from "@/components/blocks/navbar"
import { FooterSection } from "@/components/blocks/footer-section"
import { Shield } from "lucide-react"

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
      "You have the right to access, correct, update, or request deletion of your personal information. You may also object to processing of your personal data and request data portability.",
  },
  {
    title: "Cookies",
    content:
      "Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at privacy@wpa.global.",
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
      <main id="main-content" className="pt-28 sm:pt-36">
        <section className="relative bg-background py-16 sm:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex rounded-2xl bg-gold/10 p-3 text-gold">
                <Shield className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                Privacy Policy
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
