"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/features/section-heading"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, User, Mail, Building2, Globe, GraduationCap, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  fullName: string
  email: string
  institution: string
  academicTitle: string
  country: string
  phone: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  institution: "",
  academicTitle: "",
  country: "",
  phone: "",
  message: "",
}

export function RegistrationSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address"
    if (!formData.institution.trim()) newErrors.institution = "Institution is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  if (isSubmitted) {
    return (
      <section id="registration" className="relative bg-primary py-16 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-scale-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 sm:h-24 sm:w-24">
              <CheckCircle className="h-10 w-10 text-gold sm:h-12 sm:w-12" />
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-4xl">Registration Received!</h2>
            <p className="mt-4 text-sm text-primary-foreground/70 sm:text-base">
              Thank you, {formData.fullName}. Your membership application has been submitted successfully.
              Our team will review your application and get back to you within 2-3 business days.
            </p>
            <Button
              variant="gold"
              size="lg"
              className="mt-8"
              onClick={() => { setIsSubmitted(false); setFormData(initialFormData) }}
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registration" className="relative bg-primary py-16 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Join Us"
          title="Membership Registration"
          description="Become part of the World Professors Association. Fill out the form below to begin your membership journey."
          className="text-primary-foreground"
        />
        <style>{`.section-heading-muted p { color: var(--primary-foreground); opacity: 0.7; }`}</style>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-16">
          <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Full Name <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={cn(
                      "w-full rounded-lg border bg-primary-foreground/5 py-2.5 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base",
                      errors.fullName ? "border-gold/60" : "border-primary-foreground/10"
                    )}
                    placeholder="Prof. John Doe"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-gold">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Email Address <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={cn(
                      "w-full rounded-lg border bg-primary-foreground/5 py-2.5 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base",
                      errors.email ? "border-gold/60" : "border-primary-foreground/10"
                    )}
                    placeholder="john@university.edu"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-gold">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="institution" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Institution / University <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <input
                    id="institution"
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    className={cn(
                      "w-full rounded-lg border bg-primary-foreground/5 py-2.5 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base",
                      errors.institution ? "border-gold/60" : "border-primary-foreground/10"
                    )}
                    placeholder="University of Oxford"
                  />
                </div>
                {errors.institution && <p className="mt-1 text-xs text-gold">{errors.institution}</p>}
              </div>

              <div>
                <label htmlFor="academicTitle" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Academic Title
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <select
                    id="academicTitle"
                    value={formData.academicTitle}
                    onChange={(e) => handleChange("academicTitle", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 py-2.5 pl-10 pr-8 text-sm text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base"
                  >
                    <option value="">Select title</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Dean">Dean</option>
                    <option value="Emeritus Professor">Emeritus Professor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="country" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Country <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={cn(
                      "w-full rounded-lg border bg-primary-foreground/5 py-2.5 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base",
                      errors.country ? "border-gold/60" : "border-primary-foreground/10"
                    )}
                    placeholder="United States"
                  />
                </div>
                {errors.country && <p className="mt-1 text-xs text-gold">{errors.country}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 py-2.5 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-primary-foreground/80 sm:text-sm">
                Why do you want to join WPA?
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 py-2.5 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:py-3 sm:text-base"
                placeholder="Share your motivation, research interests, or how you hope to contribute..."
              />
            </div>

            <div className="flex flex-col items-center gap-4 pt-2 sm:pt-4">
              <Button
                type="submit"
                variant="gold"
                size="xl"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
              <p className="text-xs text-primary-foreground/40">
                By submitting, you agree to our{" "}
                <a href="/privacy-policy" className="text-gold underline underline-offset-2 hover:text-gold/80">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms-of-service" className="text-gold underline underline-offset-2 hover:text-gold/80">
                  Terms of Service
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
