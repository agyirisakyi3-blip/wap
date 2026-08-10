"use client"

import { useState, useMemo, useEffect } from "react"
import { PositionCard } from "@/components/features/position-card"
import { ApplyForm } from "@/components/features/apply-form"
import { MembershipForm } from "@/components/features/membership-form"
import { ChevronLeft, ArrowRight, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Crown, Users, Globe, BookOpen, Shield, Handshake, Scale, Star, Lightbulb, UserPlus, Microscope, FileText,
} from "lucide-react"

type Step = "categories" | "positions" | "form" | "membership"

interface FormField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "select" | "textarea" | "file" | "image"
  required: boolean
  options?: string[]
  placeholder?: string
}

interface Position {
  id: string
  title: string
  description: string
  badge?: string
  fields: FormField[]
}

interface Category {
  id: string
  title: string
  summary: string
  description: string
  icon: React.ReactNode
  gradient: string
  gradientLight: string
  accentColor: string
  positions: Position[]
}

interface SheetCategory {
  id: string
  name: string
  description: string
  icon: string
}

interface SheetPosition {
  id: string
  title: string
  category: string
  description: string
  type: string
  location: string
}

const catVisualConfig: Record<string, { title: string; summary: string; icon: React.ReactNode; gradient: string; gradientLight: string; accentColor: string }> = {
  ex: { title: "Executive Positions", summary: "Leadership", icon: <Crown className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-violet-600 to-purple-800", gradientLight: "from-violet-500/20 to-purple-500/10", accentColor: "violet" },
  mt: { title: "Management Team", summary: "Management", icon: <Users className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-emerald-600 to-teal-800", gradientLight: "from-emerald-500/20 to-teal-500/10", accentColor: "emerald" },
  ac: { title: "Academic / Research", summary: "Academic", icon: <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-blue-600 to-indigo-800", gradientLight: "from-blue-500/20 to-indigo-500/10", accentColor: "blue" },
  re: { title: "Regional / International", summary: "Regional", icon: <Globe className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-amber-600 to-orange-800", gradientLight: "from-amber-500/20 to-orange-500/10", accentColor: "amber" },
  st: { title: "Specialized / Technical", summary: "Specialized", icon: <SettingsIcon className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-gold to-yellow-800", gradientLight: "from-gold/20 to-yellow-500/10", accentColor: "gold" },
}

const catIconLarge: Record<string, React.ReactNode> = {
  ex: <Crown className="h-12 w-12 sm:h-16 sm:w-16" />,
  mt: <Users className="h-12 w-12 sm:h-16 sm:w-16" />,
  ac: <BookOpen className="h-12 w-12 sm:h-16 sm:w-16" />,
  re: <Globe className="h-12 w-12 sm:h-16 sm:w-16" />,
  st: <SettingsIcon className="h-12 w-12 sm:h-16 sm:w-16" />,
}

interface PositionFieldDef {
  name: string
  label: string
  required: boolean
  placeholder?: string
  type?: "text" | "select" | "textarea"
  options?: string[]
}

const positionDefs: Record<string, { title: string; description: string; badge?: string; fields: PositionFieldDef[] }> = {
  pres: { title: "President", description: "Overall head of WPA. Represents the association globally.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. John Smith" }, { name: "email", label: "Email Address", required: true, placeholder: "john@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 123-4567" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Oxford" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Economics" }, { name: "yearsExperience", label: "Years of Academic Experience", required: true, placeholder: "15+" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "statement", label: "Statement of Intent", required: true, placeholder: "Explain why you are applying and your vision for WPA..." }] },
  vp: { title: "Vice President", description: "Supports the President. Chairs meetings in their absence.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Jane Doe" }, { name: "email", label: "Email Address", required: true, placeholder: "jane@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 234-5678" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Harvard University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Dean of Faculty" }, { name: "yearsExperience", label: "Years of Academic Experience", required: true, placeholder: "12+" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "statement", label: "Statement of Intent", required: true, placeholder: "Explain your leadership philosophy and vision..." }] },
  sg: { title: "Secretary General", description: "Manages operations, correspondence, and records of WPA.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Robert Chen" }, { name: "email", label: "Email Address", required: true, placeholder: "robert@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 345-6789" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Toronto" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor & Department Head" }, { name: "yearsExperience", label: "Years of Experience", required: true, placeholder: "10+" }, { name: "adminExperience", label: "Administrative Experience", required: false, placeholder: "Describe your administrative and operational experience...", type: "textarea" }] },
  dsg: { title: "Deputy Secretary General", description: "Supports the Secretary General in administrative and coordination duties.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Alice Wang" }, { name: "email", label: "Email Address", required: true, placeholder: "alice@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 234-5678" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Sydney" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Associate Professor" }, { name: "yearsExperience", label: "Years of Experience", required: true, placeholder: "8+" }, { name: "adminExperience", label: "Administrative Experience", required: false, placeholder: "Describe your administrative experience...", type: "textarea" }] },
  treasurer: { title: "Treasurer", description: "Manages finances, membership fees, and budgets of WPA.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Maria Garcia" }, { name: "email", label: "Email Address", required: true, placeholder: "maria@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 456-7890" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Barcelona" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Finance" }, { name: "country", label: "Country", required: true, placeholder: "Spain" }, { name: "financialExperience", label: "Financial Management Experience", required: true, placeholder: "Describe your experience managing budgets and financial operations...", type: "textarea" }] },
  legal: { title: "Legal Advisor", description: "Provides legal guidance on policies, compliance, and governance.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. John Marshall" }, { name: "email", label: "Email Address", required: true, placeholder: "john@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 567-8901" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Yale University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Law" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "legalExperience", label: "Legal & Policy Experience", required: true, placeholder: "Describe your legal expertise and policy experience...", type: "textarea" }] },
  "dir-comms": { title: "Director of Communications", description: "Oversees PR, media relations, newsletters, and communications.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Sarah Mitchell" }, { name: "email", label: "Email Address", required: true, placeholder: "sarah@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 678-9012" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Cambridge" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Communications Director" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "commsExperience", label: "Communications Experience", required: true, placeholder: "Describe your experience in media, PR, or communications...", type: "textarea" }] },
  "dir-digital": { title: "Director of Digital Strategy", description: "Manages digital presence - website, social media, and online engagement.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Yuki Tanaka" }, { name: "email", label: "Email Address", required: true, placeholder: "yuki@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 789-0123" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Tokyo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Digital Strategy Lead" }, { name: "country", label: "Country", required: true, placeholder: "Japan" }, { name: "digitalExperience", label: "Digital Strategy Experience", required: true, placeholder: "Describe your experience in digital strategy, web, or social media...", type: "textarea" }] },
  "dir-research": { title: "Director of Research", description: "Leads research initiatives, journals, and academic publications.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Amartya Sen" }, { name: "email", label: "Email Address", required: true, placeholder: "amartya@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 890-1234" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Harvard University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Research Director" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "publications", label: "Notable Publications", required: false, placeholder: "List your key publications and research impact...", type: "textarea" }] },
  "dir-programs": { title: "Director of Academic Programs", description: "Oversees curriculum development, fellowships, and academic exchanges.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Maria Santos" }, { name: "email", label: "Email Address", required: true, placeholder: "maria@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 901-2345" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of São Paulo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Dean of Academics" }, { name: "country", label: "Country", required: true, placeholder: "Brazil" }, { name: "programExperience", label: "Academic Program Experience", required: true, placeholder: "Describe your experience in curriculum development and academic programs...", type: "textarea" }] },
  "edit-chief": { title: "Editor-in-Chief", description: "Leads the editorial board for WPA journals and academic publications.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Noam Chomsky" }, { name: "email", label: "Email Address", required: true, placeholder: "noam@university.edu" }, { name: "institution", label: "Institution / University", required: true, placeholder: "MIT" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Linguistics" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "editorialExperience", label: "Editorial Experience", required: true, placeholder: "Describe your experience as an editor or editorial board member...", type: "textarea" }] },
  "reg-africa": { title: "Regional Director - Africa", description: "Coordinates WPA activities and membership across Africa.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. James Osei" }, { name: "email", label: "Email Address", required: true, placeholder: "james@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 012-3456" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Ghana" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor & Dean" }, { name: "country", label: "Country", required: true, placeholder: "Ghana" }, { name: "regionalExperience", label: "Regional Experience", required: true, placeholder: "Describe your knowledge and network within Africa...", type: "textarea" }] },
  "reg-asia": { title: "Regional Director - Asia", description: "Coordinates WPA activities and membership across Asia.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Yuki Tanaka" }, { name: "email", label: "Email Address", required: true, placeholder: "yuki@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 123-4567" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Tokyo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor" }, { name: "country", label: "Country", required: true, placeholder: "Japan" }, { name: "regionalExperience", label: "Regional Experience", required: true, placeholder: "Describe your knowledge and network within Asia...", type: "textarea" }] },
  "reg-europe": { title: "Regional Director - Europe", description: "Coordinates WPA activities and membership across Europe.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Elena Voronova" }, { name: "email", label: "Email Address", required: true, placeholder: "elena@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 234-5678" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Oxford" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "regionalExperience", label: "Regional Experience", required: true, placeholder: "Describe your knowledge and network within Europe...", type: "textarea" }] },
  "reg-americas": { title: "Regional Director - Americas", description: "Coordinates WPA activities and membership across the Americas.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Maria Santos" }, { name: "email", label: "Email Address", required: true, placeholder: "maria@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 345-6789" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of São Paulo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor" }, { name: "country", label: "Country", required: true, placeholder: "Brazil" }, { name: "regionalExperience", label: "Regional Experience", required: true, placeholder: "Describe your knowledge and network within the Americas...", type: "textarea" }] },
  "reg-mena": { title: "Regional Director - MENA", description: "Coordinates WPA activities across the Middle East and North Africa.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Ahmed Al-Rashid" }, { name: "email", label: "Email Address", required: true, placeholder: "ahmed@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 456-7890" }, { name: "institution", label: "Institution / University", required: true, placeholder: "King Saud University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor" }, { name: "country", label: "Country", required: true, placeholder: "Saudi Arabia" }, { name: "regionalExperience", label: "Regional Experience", required: true, placeholder: "Describe your knowledge and network within MENA...", type: "textarea" }] },
  "dir-membership": { title: "Director of Membership", description: "Manages member recruitment, retention, and engagement strategies.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Robert Chen" }, { name: "email", label: "Email Address", required: true, placeholder: "robert@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 567-8901" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Toronto" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor" }, { name: "country", label: "Country", required: true, placeholder: "Canada" }, { name: "membershipExperience", label: "Membership & Outreach Experience", required: true, placeholder: "Describe your experience in membership recruitment and engagement...", type: "textarea" }] },
  "dir-events": { title: "Director of Events", description: "Plans and coordinates conferences, workshops, and WPA events.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Sarah Mitchell" }, { name: "email", label: "Email Address", required: true, placeholder: "sarah@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 678-9012" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Cambridge" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Events Director" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "eventExperience", label: "Event Planning Experience", required: true, placeholder: "Describe your experience organizing academic conferences and events...", type: "textarea" }] },
  "dir-grants": { title: "Director of Grants & Partnerships", description: "Manages grant programs, sponsorships, and institutional partnerships.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Maria Garcia" }, { name: "email", label: "Email Address", required: true, placeholder: "maria@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 789-0123" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Barcelona" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Grants Director" }, { name: "country", label: "Country", required: true, placeholder: "Spain" }, { name: "grantsExperience", label: "Grants & Partnerships Experience", required: true, placeholder: "Describe your experience in grant management and partnerships...", type: "textarea" }] },
  "dir-youth": { title: "Director of Youth & Innovation", description: "Leads initiatives for emerging scholars and innovative academic programs.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Alice Wang" }, { name: "email", label: "Email Address", required: true, placeholder: "alice@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 890-1234" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Stanford University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Innovation Lead" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "youthExperience", label: "Youth & Innovation Experience", required: true, placeholder: "Describe your experience with youth programs or innovation initiatives...", type: "textarea" }] },
  ombud: { title: "Ombudsperson", description: "Ensures ethical compliance, mediates disputes, and upholds WPA values.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. John Rawls" }, { name: "email", label: "Email Address", required: true, placeholder: "john@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 901-2345" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Princeton University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Ethics" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "mediationExperience", label: "Mediation & Ethics Experience", required: true, placeholder: "Describe your experience in dispute resolution or ethics...", type: "textarea" }] },
}

const posIconMap: Record<string, React.ReactNode> = {
  pres: <Crown className="h-5 w-5" />, vp: <Crown className="h-5 w-5" />,
  sg: <BookOpen className="h-5 w-5" />, dsg: <BookOpen className="h-5 w-5" />,
  treasurer: <Scale className="h-5 w-5" />, legal: <Shield className="h-5 w-5" />,
  "dir-comms": <Star className="h-5 w-5" />, "dir-digital": <SettingsIcon className="h-5 w-5" />,
  "dir-research": <Microscope className="h-5 w-5" />, "dir-programs": <BookOpen className="h-5 w-5" />,
  "edit-chief": <BookOpen className="h-5 w-5" />,
  "reg-africa": <Globe className="h-5 w-5" />, "reg-asia": <Globe className="h-5 w-5" />,
  "reg-europe": <Globe className="h-5 w-5" />, "reg-americas": <Globe className="h-5 w-5" />,
  "reg-mena": <Globe className="h-5 w-5" />,
  "dir-membership": <UserPlus className="h-5 w-5" />, "dir-events": <Star className="h-5 w-5" />,
  "dir-grants": <Handshake className="h-5 w-5" />, "dir-youth": <Lightbulb className="h-5 w-5" />,
  ombud: <Shield className="h-5 w-5" />,
}

const photoField: FormField = { name: "photo", label: "Profile Photo", type: "image", required: false }
const cvField: FormField = { name: "cv", label: "Upload CV", type: "file", required: false }

export function ApplyPortal() {
  const [step, setStep] = useState<Step>("categories")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [animDir, setAnimDir] = useState<"left" | "right">("left")
  const [sheetCategories, setSheetCategories] = useState<SheetCategory[]>([])
  const [sheetPositions, setSheetPositions] = useState<SheetPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchJson(url: string, attempts = 3): Promise<unknown> {
      let lastErr: unknown
      for (let i = 0; i < attempts; i++) {
        try {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), 15000)
          try {
            const res = await fetch(url, { signal: controller.signal })
            if (!res.ok) throw new Error(`${url} returned ${res.status}`)
            return await res.json()
          } finally {
            clearTimeout(timer)
          }
        } catch (err) {
          lastErr = err
          if (i < attempts - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)))
          }
        }
      }
      throw lastErr
    }

    async function loadData() {
      try {
        const [catData, posData] = await Promise.all([
          fetchJson("/api/categories"),
          fetchJson("/api/positions"),
        ])
        if (cancelled) return
        const rawCategories = (catData as { categories?: unknown } | null)?.categories
        const rawPositions = (posData as { positions?: unknown } | null)?.positions
        setSheetCategories(Array.isArray(rawCategories) ? (rawCategories as SheetCategory[]) : [])
        setSheetPositions(Array.isArray(rawPositions) ? (rawPositions as SheetPosition[]) : [])
      } catch {
        if (!cancelled) setError("Failed to load data. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadData()
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    return sheetCategories.map((cat) => {
      const vis = catVisualConfig[cat.id] || {
        title: cat.name,
        summary: "Category",
        icon: <FileText className="h-6 w-6 sm:h-7 sm:w-7" />,
        gradient: "from-gray-600 to-gray-800",
        gradientLight: "from-gray-500/20 to-gray-500/10",
        accentColor: "gray" as const,
      }

      const catPositions = sheetPositions
        .filter((p) => p.category === cat.id)
        .map((p) => {
          const def = positionDefs[p.id]
          if (!def) return null
          const fields: FormField[] = [photoField]
          for (const f of def.fields) {
            fields.push({ ...f, type: f.type || "text" } as FormField)
          }
          fields.push(cvField)
          return { id: p.id, title: def.title, description: def.description, badge: def.badge, fields }
        })
        .filter(Boolean) as Position[]

      return {
        id: cat.id,
        title: vis.title,
        summary: vis.summary,
        description: cat.description,
        icon: vis.icon,
        gradient: vis.gradient,
        gradientLight: vis.gradientLight,
        accentColor: vis.accentColor,
        positions: catPositions,
      }
    })
  }, [sheetCategories, sheetPositions])

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat)
    setAnimDir("left")
    setStep("positions")
  }

  const handlePositionSelect = (pos: Position) => {
    setSelectedPosition(pos)
    setAnimDir("left")
    setStep("form")
  }

  const handleMembershipSelect = () => {
    setAnimDir("left")
    setStep("membership")
  }

  const handleBack = () => {
    setAnimDir("right")
    if (step === "positions") {
      setStep("categories")
      setSelectedCategory(null)
    } else if (step === "form") {
      setStep("positions")
      setSelectedPosition(null)
    } else if (step === "membership") {
      setStep("categories")
    }
  }

  const stepVal = step === "categories" ? 0 : step === "positions" ? 1 : 2
  const stepNames = ["Category", "Position", "Apply"]

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <div className="mx-auto flex items-center justify-center gap-3">
              <div className="h-px w-8 animate-pulse bg-gold/40" />
              <div className="h-3 w-40 animate-pulse rounded-sm bg-muted" />
              <div className="h-px w-8 animate-pulse bg-gold/40" />
            </div>
            <div className="mx-auto mt-5 h-9 w-56 animate-pulse rounded-sm bg-muted sm:h-11" />
            <div className="mx-auto mt-3 h-4 w-72 max-w-full animate-pulse rounded-sm bg-muted" />
          </div>

          <div className="mb-10 animate-pulse rounded-sm border border-border/60 bg-card p-8 sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 rounded-sm bg-muted" />
              <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                  <div className="h-4 w-24 rounded-sm bg-muted" />
                  <div className="h-4 w-36 rounded-sm bg-muted" />
                </div>
                <div className="h-5 w-52 rounded-sm bg-muted" />
                <div className="h-3 w-full max-w-lg rounded-sm bg-muted" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-sm border border-border/60 bg-card p-8">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-sm bg-muted" />
                  <div className="h-5 w-8 rounded-sm bg-muted" />
                </div>
                <div className="mt-5 h-4 w-24 rounded-sm bg-muted" />
                <div className="mt-3 h-5 w-40 rounded-sm bg-muted" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded-sm bg-muted" />
                  <div className="h-3 w-4/5 rounded-sm bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-sm text-gold underline">Retry</button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="paper-grid mask-fade-b absolute inset-0" />
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-gold/[0.07] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-gold sm:text-xs">
              <GraduationCap className="h-3.5 w-3.5" />
              World Professors Association
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h1 className="mt-6 animate-slide-up font-display text-4xl font-medium leading-tight tracking-tight text-primary-foreground sm:text-6xl">
            Application Portal
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-slide-up text-sm text-primary-foreground/70 sm:text-lg" style={{ animationDelay: "0.1s" }}>
            Apply for leadership positions, join committees, become a member, or
            nominate distinguished educators for honorary titles.
          </p>
        </div>
      </section>

      <section className="relative overflow-x-hidden bg-background py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-64 w-64 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {step !== "membership" && (
            <div className="mb-12 flex items-center justify-center sm:mb-16">
              <div className="flex items-center gap-3 sm:gap-5">
                {stepNames.map((name, i) => (
                  <div key={name} className="flex items-center">
                    {i > 0 && (
                      <div className={cn(
                        "mx-1 h-px w-6 transition-colors duration-500 sm:mx-2 sm:w-12",
                        i <= stepVal ? "bg-gold/60" : "bg-border"
                      )} />
                    )}
                    <div className="flex items-center gap-2.5">
                      <span className={cn(
                        "font-display text-sm italic transition-colors duration-500 sm:text-base",
                        stepVal === i
                          ? "text-gold"
                          : stepVal > i
                            ? "text-gold/60"
                            : "text-muted-foreground/40"
                      )}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn(
                        "hidden text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 sm:block",
                        stepVal === i
                          ? "text-primary"
                          : stepVal > i
                            ? "text-gold/70"
                            : "text-muted-foreground/50"
                      )}>
                        {name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "categories" && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <div className="mb-10 text-center sm:mb-14">
                <span className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
                  <span className="h-px w-8 bg-gold/60" />
                  Step 1 of 3
                  <span className="h-px w-8 bg-gold/60" />
                </span>
                <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
                  Choose a Category
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Apply for a leadership position, or use the official form to become a member
                </p>
              </div>

              <button
                onClick={handleMembershipSelect}
                className="group relative mb-10 block w-full overflow-hidden rounded-sm border border-gold/40 bg-card p-6 text-left shadow-sm transition-all duration-500 hover:border-gold/70 sm:p-9"
              >
                <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-gold to-gold/40 transition-all duration-500 group-hover:w-full" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-gold/30 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/15 sm:h-20 sm:w-20">
                      <FileText className="h-7 w-7 sm:h-9 sm:w-9" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block rounded-sm bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                        Official Form
                      </span>
                      <span className="inline-block rounded-sm border border-gold/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold sm:text-xs">
                        Membership Application 2026
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">
                      Membership Application
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      Join the World Professors&apos; Association as a member. Complete the
                      official application form covering personal details, academic
                      background, membership category, referees, and required attachments.
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 group-hover:gap-3">
                      Start membership application
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </button>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className="group relative overflow-hidden rounded-sm border border-border bg-card p-6 text-left shadow-sm transition-all duration-500 hover:border-gold/50 sm:p-8"
                  >
                    <div className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    <div className="flex items-start justify-between">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-sm text-white transition-transform duration-300 group-hover:-translate-y-0.5",
                        `bg-gradient-to-br ${cat.gradient}`
                      )}>
                        {cat.icon}
                      </div>
                      <span className="font-display text-xl font-normal italic text-gold/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="mt-5 inline-block rounded-sm border border-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                      {cat.summary}
                    </span>

                    <h3 className="mt-3 font-display text-lg font-medium tracking-tight text-primary">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {cat.description}
                    </p>

                    <div className="mt-6 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium uppercase tracking-[0.15em] text-gold transition-all duration-300 group-hover:gap-3">
                      {cat.positions.length} position{cat.positions.length > 1 ? "s" : ""}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "positions" && selectedCategory && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <button
                onClick={handleBack}
                className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to categories
              </button>

              <div className="mb-8 flex items-start gap-5 sm:mb-10">
                <div className={cn(
                  "shrink-0 rounded-sm p-3 text-white sm:p-4",
                  `bg-gradient-to-br ${selectedCategory.gradient}`
                )}>
                  {catIconLarge[selectedCategory.id] || <FileText className="h-12 w-12 sm:h-16 sm:w-16" />}
                </div>
                <div>
                  <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
                    <span className="h-px w-6 bg-gold/60" />
                    Step 2 of 3
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-primary sm:text-3xl">
                    {selectedCategory.title}
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {selectedCategory.positions.map((pos) => (
                  <PositionCard
                    key={pos.id}
                    icon={posIconMap[pos.id] || <Users className="h-5 w-5" />}
                    title={pos.title}
                    description={pos.description}
                    badge={pos.badge}
                    onClick={() => handlePositionSelect(pos)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "form" && selectedPosition && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <div className="mx-auto max-w-2xl">
                <ApplyForm position={selectedPosition} onBack={handleBack} />
              </div>
            </div>
          )}

          {step === "membership" && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <div className="mx-auto max-w-3xl">
                <MembershipForm onBack={handleBack} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
}
