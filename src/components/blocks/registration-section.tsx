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
      <section id="registration" className="relative overflow-hidden bg-primary py-24 sm:py-36">
        <div className="paper-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-scale-in">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10 sm:h-24 sm:w-24">
              <CheckCircle className="h-10 w-10 text-gold sm:h-12 sm:w-12" />
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl">
              Registration Received
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              Thank you, {formData.fullName}. Your membership application has been
              submitted successfully. Our team will review your application and get
              back to you within 2-3 business days.
            </p>
            <Button
              variant="gold"
              size="lg"
              className="mt-9"
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
    <section id="registration" className="relative overflow-hidden bg-primary py-24 sm:py-36">
      <div className="paper-grid absolute inset-0 opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Join Us"
          index="06"
          title="Membership Registration"
          description="Become part of the World Professors Association. Fill out the form below to begin your membership journey."
          tone="dark"
        />

        <div className="mx-auto mt-14 max-w-4xl sm:mt-20">
          <div className="relative overflow-hidden rounded-sm border border-primary-foreground/15 bg-card shadow-2xl shadow-black/20">
            <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-gold via-gold/70 to-gold/30" />
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-12">
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  required
                  error={errors.fullName}
                  icon={<User className="h-4 w-4" />}
                >
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={fieldClasses(errors.fullName)}
                    placeholder="Prof. John Doe"
                  />
                </Field>

                <Field
                  label="Email Address"
                  required
                  error={errors.email}
                  icon={<Mail className="h-4 w-4" />}
                >
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={fieldClasses(errors.email)}
                    placeholder="john@university.edu"
                  />
                </Field>

                <Field
                  label="Institution / University"
                  required
                  error={errors.institution}
                  icon={<Building2 className="h-4 w-4" />}
                >
                  <input
                    id="institution"
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    className={fieldClasses(errors.institution)}
                    placeholder="University of Oxford"
                  />
                </Field>

                <Field
                  label="Academic Title"
                  icon={<GraduationCap className="h-4 w-4" />}
                >
                  <select
                    id="academicTitle"
                    value={formData.academicTitle}
                    onChange={(e) => handleChange("academicTitle", e.target.value)}
                    className={cn(fieldClasses(), "appearance-none")}
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
                </Field>

                <Field
                  label="Country"
                  required
                  error={errors.country}
                  icon={<Globe className="h-4 w-4" />}
                >
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={fieldClasses(errors.country)}
                    placeholder="United States"
                  />
                </Field>

                <Field label="Phone Number" icon={<Phone className="h-4 w-4" />}>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={fieldClasses()}
                    placeholder="+1 (555) 123-4567"
                  />
                </Field>
              </div>

              <div className="mt-9">
                <label htmlFor="message" className="label">
                  Why do you want to join WPA?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={cn(fieldClasses(), "mt-2 resize-y")}
                  placeholder="Share your motivation, research interests, or how you hope to contribute..."
                />
              </div>

              <div className="mt-10 flex flex-col items-center gap-5 border-t border-border pt-8 sm:flex-row sm:justify-between">
                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
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
      </div>
    </section>
  )
}

function fieldClasses(hasError?: string) {
  return cn(
    "w-full border-b bg-transparent py-3 pl-7 text-sm text-foreground placeholder:text-muted-foreground/40",
    "transition-colors duration-200 focus:outline-none",
    hasError ? "border-gold/70" : "border-border focus:border-gold"
  )
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

function Field({ label, required, error, icon, children }: FieldProps) {
  return (
    <div>
      <label className="label">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <div className="relative mt-1">
        {icon && (
          <span className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground/40">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs text-gold">{error}</p>}
    </div>
  )
}
