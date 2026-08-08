"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/features/section-heading"
import { GalleryCard } from "@/components/features/gallery-card"
import { LightboxModal } from "@/components/features/lightbox-modal"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  Globe,
  Users,
  Trophy,
  Microscope,
  Landmark,
  HeartHandshake,
  Music,
} from "lucide-react"

const categories = ["All", "Conferences", "Events", "Research", "Community"]

const galleryItems = [
  { title: "Annual Global Conference 2024", category: "Conferences", gradient: "from-blue-600 to-purple-700", icon: <GraduationCap className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Over 2,000 professors gathered for our flagship annual conference." },
  { title: "International Research Symposium", category: "Research", gradient: "from-emerald-500 to-teal-700", icon: <Microscope className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Cutting-edge research presentations from across the globe." },
  { title: "Regional Meetup — Europe", category: "Events", gradient: "from-orange-500 to-red-600", icon: <Globe className="h-8 w-8 sm:h-12 sm:w-12" />, description: "European chapter members networking in Paris." },
  { title: "Community Outreach Program", category: "Community", gradient: "from-pink-500 to-rose-600", icon: <HeartHandshake className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Giving back through educational initiatives in underserved communities." },
  { title: "Leadership Summit", category: "Conferences", gradient: "from-violet-600 to-indigo-700", icon: <Trophy className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Academic leaders shaping the future of higher education." },
  { title: "Cultural Exchange Gala", category: "Events", gradient: "from-amber-500 to-yellow-600", icon: <Music className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Celebrating diversity in academia through cultural exchange." },
  { title: "Research Collaboration Workshop", category: "Research", gradient: "from-cyan-500 to-blue-600", icon: <Landmark className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Building cross-border research partnerships." },
  { title: "Membership Drive — Asia Pacific", category: "Community", gradient: "from-rose-500 to-pink-600", icon: <Users className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Expanding our network across the Asia Pacific region." },
  { title: "Awards Ceremony 2024", category: "Conferences", gradient: "from-gold/80 to-yellow-700", icon: <Trophy className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Recognizing outstanding contributions to academia." },
  { title: "Faculty Development Program", category: "Community", gradient: "from-green-500 to-emerald-700", icon: <GraduationCap className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Empowering educators with cutting-edge pedagogical skills." },
  { title: "Global Education Forum", category: "Conferences", gradient: "from-blue-500 to-indigo-600", icon: <Globe className="h-8 w-8 sm:h-12 sm:w-12" />, description: "Shaping the future of global education policy." },
  { title: "Annual Research Retreat", category: "Research", gradient: "from-purple-500 to-violet-700", icon: <Microscope className="h-8 w-8 sm:h-12 sm:w-12" />, description: "A retreat dedicated to advancing academic research." },
]

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section id="gallery" className="relative border-y border-border bg-card py-24 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Moments"
          index="04"
          title="Photo Gallery"
          description="A glimpse into the events, conferences, and community activities that define WPA."
        />

        <div
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 sm:mt-16"
          role="tablist"
          aria-label="Gallery categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative pb-2 text-sm font-medium tracking-wide transition-colors duration-200 sm:text-base",
                activeCategory === cat
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {cat}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px bg-gold transition-all duration-300",
                  activeCategory === cat ? "w-full" : "w-0"
                )}
              />
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, index) => (
            <GalleryCard
              key={index}
              title={item.title}
              category={item.category}
              gradient={item.gradient}
              icon={item.icon}
              onClick={() => setLightboxIndex(galleryItems.indexOf(item))}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! > 0 ? i! - 1 : galleryItems.length - 1))}
          onNext={() => setLightboxIndex((i) => (i! < galleryItems.length - 1 ? i! + 1 : 0))}
        />
      )}
    </section>
  )
}
