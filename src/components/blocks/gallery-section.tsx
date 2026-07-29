"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/features/section-heading"
import { GalleryCard } from "@/components/features/gallery-card"
import { LightboxModal } from "@/components/features/lightbox-modal"
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
    <section id="gallery" className="relative bg-secondary/50 py-16 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Moments"
          title="Photo Gallery"
          description="A glimpse into the events, conferences, and community activities that define WPA."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 sm:px-6 sm:py-2 sm:text-sm ${
                activeCategory === cat
                  ? "bg-gold text-primary-foreground shadow-lg shadow-gold/20"
                  : "bg-primary-foreground/5 text-muted-foreground hover:bg-primary-foreground/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
