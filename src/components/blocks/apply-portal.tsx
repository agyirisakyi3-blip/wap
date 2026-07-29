"use client"

import { useState, useMemo } from "react"
import { PositionCard } from "@/components/features/position-card"
import { ApplyForm } from "@/components/features/apply-form"
import { ChevronLeft, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Crown,
  Users,
  Building2,
  GraduationCap,
  Award,
  Globe,
  BookOpen,
  Shield,
  Handshake,
  Scale,
  Star,
  Lightbulb,
  UserPlus,
  School,
  Microscope,
} from "lucide-react"

type Step = "categories" | "positions" | "form"

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

const categoryDefs: Omit<Category, "positions">[] = [
  { id: "governing-board", title: "Executive Council", summary: "Leadership", description: "Top decision-making body of WPA. Lead the global academic network.", icon: <Crown className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-violet-600 to-purple-800", gradientLight: "from-violet-500/20 to-purple-500/10", accentColor: "violet" as const },
  { id: "advisory-council", title: "Advisory Council", summary: "Guidance", description: "Senior professors and education leaders who guide WPA policy.", icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-blue-600 to-indigo-800", gradientLight: "from-blue-500/20 to-indigo-500/10", accentColor: "blue" as const },
  { id: "committees", title: "Committees", summary: "Programs", description: "Work groups that run WPA programs and initiatives.", icon: <Users className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-emerald-600 to-teal-800", gradientLight: "from-emerald-500/20 to-teal-500/10", accentColor: "emerald" as const },
  { id: "general-membership", title: "Membership", summary: "Join", description: "Join WPA as a member and access our global academic network.", icon: <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-amber-600 to-orange-800", gradientLight: "from-amber-500/20 to-orange-500/10", accentColor: "amber" as const },
  { id: "honorary-titles", title: "Honorary Titles", summary: "Recognition", description: "Prestigious recognitions awarded to distinguished education leaders.", icon: <Award className="h-6 w-6 sm:h-7 sm:w-7" />, gradient: "from-gold to-yellow-800", gradientLight: "from-gold/20 to-yellow-500/10", accentColor: "gold" as const },
]

interface PositionFieldDef {
  name: string
  label: string
  required: boolean
  placeholder?: string
  type?: "text" | "select" | "textarea"
  options?: string[]
}

const positionDefs: Record<string, Omit<Position, "fields"> & { fields: PositionFieldDef[] }> = {
  president: { id: "president", title: "President", description: "Overall head of WPA. Represents the association globally.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. John Smith" }, { name: "email", label: "Email Address", required: true, placeholder: "john@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 123-4567" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Oxford" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Economics" }, { name: "yearsExperience", label: "Years of Academic Experience", required: true, placeholder: "15+" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "statement", label: "Statement of Intent", required: true, placeholder: "Explain why you are applying and your vision for WPA..." }] },
  "vice-president": { id: "vice-president", title: "Vice President", description: "Supports the President. Chairs meetings in their absence.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Jane Doe" }, { name: "email", label: "Email Address", required: true, placeholder: "jane@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 234-5678" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Harvard University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Dean of Faculty" }, { name: "yearsExperience", label: "Years of Academic Experience", required: true, placeholder: "12+" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "statement", label: "Statement of Intent", required: true, placeholder: "Explain your leadership philosophy and vision..." }] },
  "secretary-general": { id: "secretary-general", title: "Secretary General", description: "Manages operations, correspondence, and records of WPA.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Robert Chen" }, { name: "email", label: "Email Address", required: true, placeholder: "robert@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 345-6789" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Toronto" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor & Department Head" }, { name: "yearsExperience", label: "Years of Experience", required: true, placeholder: "10+" }, { name: "adminExperience", label: "Administrative Experience", required: false, placeholder: "Describe your administrative and operational experience...", type: "textarea" }] },
  treasurer: { id: "treasurer", title: "Treasurer", description: "Manages finances, membership fees, and budgets of WPA.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Maria Garcia" }, { name: "email", label: "Email Address", required: true, placeholder: "maria@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 456-7890" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Barcelona" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Finance" }, { name: "country", label: "Country", required: true, placeholder: "Spain" }, { name: "financialExperience", label: "Financial Management Experience", required: true, placeholder: "Describe your experience managing budgets and financial operations...", type: "textarea" }] },
  "director-qa": { id: "director-qa", title: "Director of Quality Assurance", description: "Leads QA training, certification programs, and academic standards.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Ahmed Hassan" }, { name: "email", label: "Email Address", required: true, placeholder: "ahmed@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 567-8901" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Cairo University" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "QA Director / Dean" }, { name: "country", label: "Country", required: true, placeholder: "Egypt" }, { name: "qaExperience", label: "Quality Assurance Experience", required: true, placeholder: "Describe your QA experience, certifications, and initiatives...", type: "textarea" }] },
  "director-research": { id: "director-research", title: "Director of Research & Publications", description: "Oversees journals, papers, and the WPA research hub.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Sarah Mitchell" }, { name: "email", label: "Email Address", required: true, placeholder: "sarah@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 678-9012" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Cambridge" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Research Director" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "publications", label: "Notable Publications", required: false, placeholder: "List your key publications, journals, and research impact...", type: "textarea" }] },
  "director-membership": { id: "director-membership", title: "Director of Membership & Outreach", description: "Manages recruitment, member relations, and global outreach.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Yuki Tanaka" }, { name: "email", label: "Email Address", required: true, placeholder: "yuki@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 789-0123" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Tokyo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor & Outreach Coordinator" }, { name: "country", label: "Country", required: true, placeholder: "Japan" }, { name: "outreachExperience", label: "Outreach & Recruitment Experience", required: true, placeholder: "Describe your experience in membership drives, outreach programs...", type: "textarea" }] },
  "director-events": { id: "director-events", title: "Director of Events & Summit", description: "Plans the Annual Congress, conferences, and webinars.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Maria Santos" }, { name: "email", label: "Email Address", required: true, placeholder: "maria.s@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 890-1234" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of São Paulo" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Events Director / Professor" }, { name: "country", label: "Country", required: true, placeholder: "Brazil" }, { name: "eventExperience", label: "Event Planning Experience", required: true, placeholder: "Describe your experience organizing academic conferences and events...", type: "textarea" }] },
  "regional-director": { id: "regional-director", title: "Regional Director", description: "Representative for Africa, Asia, Europe, Americas, or Middle East.", badge: "5 Regions", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. James Osei" }, { name: "email", label: "Email Address", required: true, placeholder: "james@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 901-2345" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Ghana" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor & Dean" }, { name: "country", label: "Country", required: true, placeholder: "Ghana" }, { name: "region", label: "Region You Are Applying For", required: true, type: "select", options: ["Africa", "Asia", "Europe", "Americas", "Middle East"] }, { name: "regionalExperience", label: "Regional Experience & Network", required: true, placeholder: "Describe your knowledge and connections within the region...", type: "textarea" }] },
  patron: { id: "patron", title: "Patron", description: "Distinguished global education leaders who champion WPA's mission.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Emeritus David Wilson" }, { name: "email", label: "Email Address", required: true, placeholder: "david@institution.edu" }, { name: "institution", label: "Institution / Organization", required: true, placeholder: "UNESCO / MIT" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "distinctions", label: "Key Distinctions & Honors", required: true, placeholder: "List your major honors, awards, and leadership roles...", type: "textarea" }, { name: "statement", label: "Personal Statement", required: true, placeholder: "Why do you want to serve as a Patron of WPA?", type: "textarea" }] },
  advisor: { id: "advisor", title: "Advisor", description: "Former Deans, QA Directors, and Ministers of Education providing guidance.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Elizabeth Brown" }, { name: "email", label: "Email Address", required: true, placeholder: "elizabeth@institution.edu" }, { name: "institution", label: "Institution", required: true, placeholder: "Former Minister of Education" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "expertise", label: "Area of Expertise", required: true, placeholder: "Education Policy / Quality Assurance" }, { name: "previousRoles", label: "Previous Leadership Roles", required: true, placeholder: "List your previous senior roles in academia or government...", type: "textarea" }] },
  "academic-standards": { id: "academic-standards", title: "Academic Standards Committee", description: "Sets and maintains academic standards across WPA programs.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Alan Turing" }, { name: "email", label: "Email Address", required: true, placeholder: "alan@university.edu" }, { name: "institution", label: "Institution", required: true, placeholder: "University of Manchester" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Computer Science" }, { name: "relevantExperience", label: "Relevant Experience", required: true, placeholder: "Describe your experience with academic standards and curriculum development...", type: "textarea" }] },
  "ethics-qa": { id: "ethics-qa", title: "Ethics & Quality Assurance Committee", description: "Ensures ethical practices and quality standards in academia.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Ruth Bader" }, { name: "email", label: "Email Address", required: true, placeholder: "ruth@university.edu" }, { name: "institution", label: "Institution", required: true, placeholder: "Columbia University" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Ethics" }, { name: "ethicsExperience", label: "Ethics & QA Experience", required: true, placeholder: "Describe your background in academic ethics or quality assurance...", type: "textarea" }] },
  "international-collab": { id: "international-collab", title: "International Collaboration Committee", description: "Fosters global academic partnerships and collaborative research.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Amartya Sen" }, { name: "email", label: "Email Address", required: true, placeholder: "amartya@university.edu" }, { name: "institution", label: "Institution", required: true, placeholder: "Harvard University" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Professor of Economics" }, { name: "collabExperience", label: "International Collaboration Experience", required: true, placeholder: "Describe your international research collaborations and partnerships...", type: "textarea" }] },
  "awards-recognition": { id: "awards-recognition", title: "Awards & Recognition Committee", description: "Identifies and celebrates outstanding contributions to academia.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. Marie Curie" }, { name: "email", label: "Email Address", required: true, placeholder: "marie@institution.edu" }, { name: "institution", label: "Institution", required: true, placeholder: "Institut Pasteur" }, { name: "country", label: "Country", required: true, placeholder: "France" }, { name: "currentPosition", label: "Current Position", required: true, placeholder: "Research Director" }, { name: "awardsExperience", label: "Experience with Awards & Recognition", required: true, placeholder: "Describe your experience serving on award committees or nomination panels...", type: "textarea" }] },
  fellow: { id: "fellow", title: "Fellow Member (FWPA)", description: "For Senior Professors, Deans, and academics with 10+ years experience.", badge: "10+ yrs exp", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Prof. Stephen Hawking" }, { name: "email", label: "Email Address", required: true, placeholder: "stephen@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+44 (0) 1234 567890" }, { name: "institution", label: "Institution / University", required: true, placeholder: "University of Cambridge" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "academicTitle", label: "Academic Title", required: true, options: ["Professor", "Associate Professor", "Dean", "Emeritus Professor", "Distinguished Professor", "Other"], type: "select" }, { name: "yearsExperience", label: "Years of Academic Experience", required: true, options: ["10-15 years", "15-20 years", "20+ years"], type: "select" }, { name: "researchArea", label: "Research / Teaching Area", required: true, placeholder: "Theoretical Physics" }, { name: "whyJoin", label: "Why do you want to join WPA?", required: true, placeholder: "Share your motivation and how you hope to contribute...", type: "textarea" }] },
  "full-member": { id: "full-member", title: "Full Member (MWPA)", description: "For Professors, Lecturers, and Researchers at accredited institutions.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Dr. John Doe" }, { name: "email", label: "Email Address", required: true, placeholder: "john@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+1 (555) 123-4567" }, { name: "institution", label: "Institution / University", required: true, placeholder: "Stanford University" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "academicTitle", label: "Academic Title", required: true, options: ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Senior Lecturer", "Researcher", "Other"], type: "select" }, { name: "researchArea", label: "Research / Teaching Area", required: true, placeholder: "Computer Science" }, { name: "whyJoin", label: "Why do you want to join WPA?", required: false, placeholder: "Share your motivation...", type: "textarea" }] },
  "associate-member": { id: "associate-member", title: "Associate Member", description: "For QA Officers, Education Administrators, and academic support professionals.", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Jane Smith" }, { name: "email", label: "Email Address", required: true, placeholder: "jane@institution.edu" }, { name: "institution", label: "Institution / Organization", required: true, placeholder: "Ministry of Education" }, { name: "country", label: "Country", required: true, placeholder: "Canada" }, { name: "role", label: "Current Role", required: true, placeholder: "QA Officer / Administrator" }, { name: "whyJoin", label: "Why do you want to join WPA?", required: false, placeholder: "Share your motivation...", type: "textarea" }] },
  "institutional-member": { id: "institutional-member", title: "Institutional Member", description: "For Universities, Colleges, and academic organizations.", badge: "Organization", fields: [{ name: "institutionName", label: "Institution Name", required: true, placeholder: "University of Oxford" }, { name: "representativeName", label: "Representative Full Name", required: true, placeholder: "Prof. Richard Dawkins" }, { name: "representativeTitle", label: "Representative Title", required: true, placeholder: "Vice Chancellor" }, { name: "email", label: "Official Email", required: true, placeholder: "vc@university.edu" }, { name: "phone", label: "Phone Number", required: true, placeholder: "+44 1865 270000" }, { name: "country", label: "Country", required: true, placeholder: "United Kingdom" }, { name: "institutionType", label: "Institution Type", required: true, options: ["University", "College", "Research Institute", "Academic Organization", "Other"], type: "select" }, { name: "whyJoin", label: "Why does your institution want to join WPA?", required: false, placeholder: "Describe the benefits you seek...", type: "textarea" }] },
  "student-member": { id: "student-member", title: "Student Researcher Member", description: "For PhD and research students pursuing academic careers.", badge: "Students", fields: [{ name: "fullName", label: "Full Name", required: true, placeholder: "Alice Johnson" }, { name: "email", label: "Email Address", required: true, placeholder: "alice@university.edu" }, { name: "institution", label: "University", required: true, placeholder: "MIT" }, { name: "country", label: "Country", required: true, placeholder: "United States" }, { name: "program", label: "Program / Degree", required: true, options: ["PhD", "Doctorate", "MPhil", "Masters by Research", "Postdoctoral", "Other"], type: "select" }, { name: "researchArea", label: "Research Area", required: true, placeholder: "Artificial Intelligence" }, { name: "supervisor", label: "Supervisor Name", required: false, placeholder: "Prof. Geoffrey Hinton" }, { name: "whyJoin", label: "Why do you want to join WPA?", required: false, placeholder: "Share your academic interests and goals...", type: "textarea" }] },
  "honorary-fellow": { id: "honorary-fellow", title: "Honorary Fellow", description: "Awarded to global leaders who have made exceptional contributions to education.", fields: [{ name: "nomineeName", label: "Nominee Full Name", required: true, placeholder: "Prof. Nelson Mandela" }, { name: "nomineeEmail", label: "Nominee Email", required: true, placeholder: "nominee@institution.edu" }, { name: "nomineeInstitution", label: "Nominee Institution", required: true, placeholder: "Nelson Mandela Foundation" }, { name: "nominatorName", label: "Your Full Name (Nominator)", required: true, placeholder: "Dr. John Smith" }, { name: "nominatorEmail", label: "Your Email", required: true, placeholder: "john@university.edu" }, { name: "justification", label: "Justification for Nomination", required: true, placeholder: "Explain why this individual deserves the Honorary Fellow title...", type: "textarea" }] },
  "distinguished-professor": { id: "distinguished-professor", title: "Distinguished Professor of WPA", description: "For outstanding contributions to quality assurance in education.", fields: [{ name: "nomineeName", label: "Nominee Full Name", required: true, placeholder: "Prof. John Dewey" }, { name: "nomineeEmail", label: "Nominee Email", required: true, placeholder: "nominee@university.edu" }, { name: "nomineeInstitution", label: "Nominee Institution", required: true, placeholder: "University of Chicago" }, { name: "nominatorName", label: "Your Full Name (Nominator)", required: true, placeholder: "Dr. Jane Doe" }, { name: "nominatorEmail", label: "Your Email", required: true, placeholder: "jane@university.edu" }, { name: "qaContributions", label: "Contributions to Quality Assurance in Education", required: true, placeholder: "Describe the nominee's contributions to QA in education...", type: "textarea" }] },
}

const categoryPositionIds: Record<string, string[]> = {
  "governing-board": ["president", "vice-president", "secretary-general", "treasurer", "director-qa", "director-research", "director-membership", "director-events", "regional-director"],
  "advisory-council": ["patron", "advisor"],
  "committees": ["academic-standards", "ethics-qa", "international-collab", "awards-recognition"],
  "general-membership": ["fellow", "full-member", "associate-member", "institutional-member", "student-member"],
  "honorary-titles": ["honorary-fellow", "distinguished-professor"],
}

const posIconMap: Record<string, React.ReactNode> = {
  president: <Crown className="h-5 w-5" />, "vice-president": <Crown className="h-5 w-5" />,
  "secretary-general": <BookOpen className="h-5 w-5" />, treasurer: <Scale className="h-5 w-5" />,
  "director-qa": <Shield className="h-5 w-5" />, "director-research": <Microscope className="h-5 w-5" />,
  "director-membership": <UserPlus className="h-5 w-5" />, "director-events": <Star className="h-5 w-5" />,
  "regional-director": <Globe className="h-5 w-5" />, patron: <Award className="h-5 w-5" />,
  advisor: <Lightbulb className="h-5 w-5" />, "academic-standards": <BookOpen className="h-5 w-5" />,
  "ethics-qa": <Shield className="h-5 w-5" />, "international-collab": <Handshake className="h-5 w-5" />,
  "awards-recognition": <Award className="h-5 w-5" />, fellow: <GraduationCap className="h-5 w-5" />,
  "full-member": <UserPlus className="h-5 w-5" />, "associate-member": <Building2 className="h-5 w-5" />,
  "institutional-member": <School className="h-5 w-5" />, "student-member": <GraduationCap className="h-5 w-5" />,
  "honorary-fellow": <Award className="h-5 w-5" />, "distinguished-professor": <Star className="h-5 w-5" />,
}

const categoryIcons: Record<string, React.ReactNode> = {
  "governing-board": <Crown className="h-12 w-12 sm:h-16 sm:w-16" />,
  "advisory-council": <Shield className="h-12 w-12 sm:h-16 sm:w-16" />,
  "committees": <Users className="h-12 w-12 sm:h-16 sm:w-16" />,
  "general-membership": <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16" />,
  "honorary-titles": <Award className="h-12 w-12 sm:h-16 sm:w-16" />,
}

const photoField: FormField = { name: "photo", label: "Profile Photo", type: "image", required: false }
const cvField: FormField = { name: "cv", label: "Upload CV", type: "file", required: false }
const supportingDocsField: FormField = { name: "supportingDocs", label: "Supporting Documents", type: "file", required: false }

function buildPositions(catId: string): Position[] {
  const ids = categoryPositionIds[catId]
  if (!ids) return []
  return ids.map((id) => {
    const def = positionDefs[id]
    if (!def) return { id, title: id, description: "", fields: [] }
    const fields: FormField[] = [photoField]
    for (const f of def.fields) {
      fields.push({ ...f, type: f.type || "text" } as FormField)
    }
    if (id === "honorary-fellow" || id === "distinguished-professor") {
      fields.push(supportingDocsField)
    } else {
      fields.push(cvField)
    }
    return { id: def.id, title: def.title, description: def.description, badge: def.badge, fields }
  })
}

function buildCategories(): Category[] {
  return categoryDefs.map((catDef) => ({
    ...catDef,
    positions: buildPositions(catDef.id),
  }))
}

const categories = buildCategories()

export function ApplyPortal() {
  const [step, setStep] = useState<Step>("categories")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [animDir, setAnimDir] = useState<"left" | "right">("left")

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

  const handleBack = () => {
    setAnimDir("right")
    if (step === "positions") {
      setStep("categories")
      setSelectedCategory(null)
    } else if (step === "form") {
      setStep("positions")
      setSelectedPosition(null)
    }
  }

  const stepVal = step === "categories" ? 0 : step === "positions" ? 1 : 2
  const stepNames = ["Category", "Position", "Apply"]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        </div>
        <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-gold/40 animate-float" />
        <div className="absolute bottom-20 right-20 h-3 w-3 rounded-full bg-gold/30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 h-1.5 w-1.5 rounded-full bg-gold/20 animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold shadow-sm sm:px-4 sm:py-1.5 sm:text-sm">
            <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            World Professors Association
          </div>
          <h1 className="mt-6 animate-slide-up text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Application Portal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl animate-slide-up text-sm text-primary-foreground/70 sm:text-base sm:text-lg" style={{ animationDelay: "0.1s" }}>
            Apply for leadership positions, join committees, become a member, or nominate distinguished educators for honorary titles.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative bg-background py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-64 w-64 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Elegant Step Progress */}
          <div className="mb-12 flex items-center justify-center sm:mb-16">
            <div className="flex items-center gap-0 rounded-2xl border border-border/50 bg-card p-1.5 shadow-sm">
              {stepNames.map((name, i) => (
                <div key={name} className="flex items-center">
                  {i > 0 && (
                    <div className={cn(
                      "mx-2 h-px w-6 transition-colors duration-500 sm:w-10",
                      i <= stepVal ? "bg-gold/40" : "bg-border"
                    )} />
                  )}
                  <div className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-500 sm:px-4 sm:py-2.5 sm:text-sm",
                    stepVal === i
                      ? "bg-gold text-primary-foreground shadow-lg shadow-gold/20"
                      : stepVal > i
                        ? "text-gold"
                        : "text-muted-foreground/50"
                  )}>
                    <span className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold sm:h-6 sm:w-6 sm:text-xs",
                      stepVal === i
                        ? "bg-white/20 text-primary-foreground"
                        : stepVal > i
                          ? "bg-gold/20 text-gold"
                          : "bg-muted text-muted-foreground/50"
                    )}>
                      {stepVal > i ? "✓" : i + 1}
                    </span>
                    <span className="hidden sm:inline">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Category Selection */}
          {step === "categories" && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <div className="mb-10 text-center sm:mb-14">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4 sm:py-1.5 sm:text-xs">
                  <Sparkles className="h-3 w-3" />
                  Step 1 of 3
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  Choose a Category
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select the category that best matches your interest
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 sm:p-8"
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      `bg-gradient-to-br ${cat.gradientLight}`
                    )} />
                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

                    <div className="relative">
                      <div className={cn(
                        "mb-5 inline-flex rounded-2xl p-3.5 text-white shadow-lg transition-all duration-500 sm:p-4",
                        `bg-gradient-to-br ${cat.gradient}`,
                        "group-hover:scale-105 group-hover:shadow-xl"
                      )}>
                        {cat.icon}
                      </div>

                      <span className="mb-2 inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold sm:text-xs">
                        {cat.summary}
                      </span>

                      <h3 className="text-lg font-bold text-primary sm:text-xl">{cat.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {cat.description}
                      </p>

                      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-gold transition-all duration-300 group-hover:gap-2.5">
                        {categoryPositionIds[cat.id]?.length || 0} position{(categoryPositionIds[cat.id]?.length || 0) > 1 ? "s" : ""}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Position Selection */}
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
                  "shrink-0 rounded-2xl p-3 text-white shadow-lg sm:p-4",
                  `bg-gradient-to-br ${selectedCategory.gradient}`
                )}>
                  {categoryIcons[selectedCategory.id]}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4 sm:py-1.5 sm:text-xs">
                    <Sparkles className="h-3 w-3" />
                    Step 2 of 3
                  </span>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-primary sm:text-2xl">
                    {selectedCategory.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
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

          {/* Step 3: Application Form */}
          {step === "form" && selectedPosition && (
            <div className={animDir === "left" ? "animate-slide-left" : "animate-slide-right"}>
              <div className="mx-auto max-w-2xl">
                <ApplyForm position={selectedPosition} onBack={handleBack} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
