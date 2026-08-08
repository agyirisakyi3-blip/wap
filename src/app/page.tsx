import { Navbar } from "@/components/blocks/navbar"
import { HeroSection } from "@/components/blocks/hero-section"
import { VisionMissionSection } from "@/components/blocks/vision-mission-section"
import { StatsSection } from "@/components/blocks/stats-section"
import { ObjectivesSection } from "@/components/blocks/objectives-section"
import { GoalsSection } from "@/components/blocks/goals-section"
import { GallerySection } from "@/components/blocks/gallery-section"
import { TestimonialsSection } from "@/components/blocks/testimonials-section"
import { RegistrationSection } from "@/components/blocks/registration-section"
import { FooterSection } from "@/components/blocks/footer-section"
import { AnimateOnScroll } from "@/components/features/animate-on-scroll"

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-primary focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />

        <AnimateOnScroll>
          <VisionMissionSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <StatsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ObjectivesSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <GoalsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <GallerySection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <TestimonialsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <RegistrationSection />
        </AnimateOnScroll>
      </main>
      <FooterSection />
    </>
  )
}
