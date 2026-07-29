import { Navbar } from "@/components/blocks/navbar"
import { HeroSection } from "@/components/blocks/hero-section"
import { VisionMissionSection } from "@/components/blocks/vision-mission-section"
import { StatsSection } from "@/components/blocks/stats-section"
import { ObjectivesSection } from "@/components/blocks/objectives-section"
import { GoalsSection } from "@/components/blocks/goals-section"
import { FooterSection } from "@/components/blocks/footer-section"

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-primary focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <VisionMissionSection />
        <StatsSection />
        <ObjectivesSection />
        <GoalsSection />
      </main>
      <FooterSection />
    </>
  )
}
