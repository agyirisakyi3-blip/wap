import { Navbar } from "@/components/blocks/navbar"
import { ApplyPortal } from "@/components/blocks/apply-portal"
import { FooterSection } from "@/components/blocks/footer-section"

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main>
        <ApplyPortal />
      </main>
      <FooterSection />
    </>
  )
}
