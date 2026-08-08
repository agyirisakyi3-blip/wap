"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { CheckCircle, Loader2, ArrowLeft, Send, MapPin, Phone, Mail, Globe, FileText, ShieldCheck, Users } from "lucide-react"

interface MembershipFormProps {
  onBack: () => void
}

const initialFormData: Record<string, string> = {
  fullName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  contactMethod: "",
  country: "",
  nationalChapter: "",
  address: "",
  highestQualification: "",
  yearGraduated: "",
  faculty: "",
  yearsExperience: "",
  specialization: "",
  orcid: "",
  membershipCategory: "",
  fee: "",
  paymentDate: "",
  paymentMethod: "",
  declaration: "",
  signature: "",
  privacyConsent: "",
  howHeard: "",
  referee1Name: "",
  referee1Position: "",
  referee1Phone: "",
  referee1Email: "",
  referee1Institution: "",
  referee2Name: "",
  referee2Phone: "",
  referee2Email: "",
  degreeCertificate: "",
}

const requiredFields: Record<string, string> = {
  fullName: "Full Name is required",
  gender: "Please select your gender",
  dateOfBirth: "Date of Birth is required",
  email: "Email Address is required",
  phone: "Phone Number is required",
  country: "Country is required",
  highestQualification: "Highest Qualification is required",
  membershipCategory: "Please select a membership category",
  declaration: "You must accept the applicant's declaration",
  signature: "Signature is required",
  privacyConsent: "You must consent to the privacy policy",
  referee1Name: "Referee 1 Name is required",
  referee1Email: "Referee 1 Email is required",
  referee1Phone: "Referee 1 Phone Number is required",
  degreeCertificate: "Please attach a copy of your highest degree certificate",
}

export function MembershipForm({ onBack }: MembershipFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    for (const [name, message] of Object.entries(requiredFields)) {
      const value = formData[name]?.trim()
      if (!value) {
        newErrors[name] = message
      } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[name] = "Invalid email address"
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submit-membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Submission failed")

      setIsSubmitted(true)
    } catch {
      setErrors({ _form: "Failed to submit. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="animate-slide-up py-12 text-center sm:py-20">
        <div className="mx-auto mb-6 flex h-20 w-20 animate-success-bounce items-center justify-center rounded-full border border-gold/40 bg-gold/10 sm:h-24 sm:w-24">
          <CheckCircle className="h-10 w-10 text-gold sm:h-12 sm:w-12" />
        </div>
        <div className="mx-auto max-w-md space-y-2">
          <h2 className="font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            Membership Application Submitted
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Application received
            </span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thank you, <strong className="text-primary">{formData.fullName}</strong>.
          Your membership application has been submitted successfully. Our team will
          review your application and respond within 5-7 business days.
        </p>
        <Button
          variant="gold"
          size="lg"
          className="mt-8"
          onClick={onBack}
        >
          Back to Categories
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-slide-left">
      <button
        onClick={onBack}
        className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold sm:mb-8"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to categories
      </button>

      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-gold/30 text-gold">
            <FileText className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Membership Application Form
          </span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-primary sm:text-3xl">
          WPA Membership Application — 2026
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete all sections of the official application form. Fields marked with{" "}
          <span className="text-gold">*</span> are required
        </p>

        <div className="mt-6 space-y-2.5 rounded-sm border border-border bg-card p-5 text-xs text-muted-foreground sm:p-6 sm:text-sm">
          <p className="flex items-center gap-2 font-medium text-primary">
            <Globe className="h-4 w-4 text-gold" /> World Professors&apos; Association (WPA)
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" /> Kwame Nkrumah Avenue, Accra - Ghana, West Africa
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0 text-gold" /> +233 241 044 556
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 shrink-0 text-gold" /> worldprofessorswpa@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70" />
            <em>&ldquo;Uniting Educators, Upholding Quality&rdquo;</em>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Section A: Personal Details */}
        <FormSection
          title="Section A"
          subtitle="Personal Details"
          icon={<Users className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              error={errors.fullName}
              onChange={(v) => handleChange("fullName", v)}
              placeholder="Prof. John Doe"
              required
            />
            <FieldInput
              name="gender"
              label="Gender"
              type="select"
              options={["Male", "Female", "Prefer not to say"]}
              value={formData.gender}
              error={errors.gender}
              onChange={(v) => handleChange("gender", v)}
              required
            />
            <FieldInput
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              error={errors.dateOfBirth}
              onChange={(v) => handleChange("dateOfBirth", v)}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>
        </FormSection>

        {/* Section B: Contact Information */}
        <FormSection
          title="Section B"
          subtitle="Contact Information"
          icon={<Globe className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={(v) => handleChange("email", v)}
              placeholder="john@university.edu"
              required
            />
            <FieldInput
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              error={errors.phone}
              onChange={(v) => handleChange("phone", v)}
              placeholder="+233 24 000 0000"
              required
            />
            <FieldInput
              name="contactMethod"
              label="Preferred Method of Contact"
              type="select"
              options={["Email", "WhatsApp", "Call"]}
              value={formData.contactMethod}
              onChange={(v) => handleChange("contactMethod", v)}
            />
            <FieldInput
              name="country"
              label="Country"
              value={formData.country}
              error={errors.country}
              onChange={(v) => handleChange("country", v)}
              placeholder="Ghana"
              required
            />
            <FieldInput
              name="nationalChapter"
              label="National Chapter"
              value={formData.nationalChapter}
              onChange={(v) => handleChange("nationalChapter", v)}
              placeholder="e.g. Ghana Chapter"
            />
            <FieldInput
              name="address"
              label="Postal / Residential Address"
              value={formData.address}
              onChange={(v) => handleChange("address", v)}
              placeholder="Street, City"
            />
          </div>
        </FormSection>

        {/* Section C: Academic & Professional Background */}
        <FormSection
          title="Section C"
          subtitle="Academic & Professional Background"
          icon={<GraduationCapIcon />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="highestQualification"
              label="Highest Qualification"
              value={formData.highestQualification}
              error={errors.highestQualification}
              onChange={(v) => handleChange("highestQualification", v)}
              placeholder="PhD, DSc, MD..."
              required
            />
            <FieldInput
              name="yearGraduated"
              label="Year of Graduation"
              value={formData.yearGraduated}
              onChange={(v) => handleChange("yearGraduated", v)}
              placeholder="e.g. 2008"
            />
            <FieldInput
              name="faculty"
              label="Faculty"
              value={formData.faculty}
              onChange={(v) => handleChange("faculty", v)}
              placeholder="e.g. Faculty of Science"
            />
            <FieldInput
              name="yearsExperience"
              label="Years of Experience"
              value={formData.yearsExperience}
              onChange={(v) => handleChange("yearsExperience", v)}
              placeholder="e.g. 15"
            />
            <FieldInput
              name="specialization"
              label="Area of Specialization"
              value={formData.specialization}
              onChange={(v) => handleChange("specialization", v)}
              placeholder="e.g. Economics"
            />
            <FieldInput
              name="orcid"
              label="ORCID / Google Scholar"
              value={formData.orcid}
              onChange={(v) => handleChange("orcid", v)}
              placeholder="https://orcid.org/0000-0000-0000-0000"
            />
          </div>
        </FormSection>

        {/* Section D: Membership Category */}
        <FormSection
          title="Section D"
          subtitle="Membership Category"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="membershipCategory"
              label="Membership Category"
              type="select"
              options={["Full / Fellow", "Retired", "Associate", "Honorary", "Student"]}
              value={formData.membershipCategory}
              error={errors.membershipCategory}
              onChange={(v) => handleChange("membershipCategory", v)}
              required
            />
            <FieldInput
              name="howHeard"
              label="How did you hear about WPA?"
              value={formData.howHeard}
              onChange={(v) => handleChange("howHeard", v)}
              placeholder="Website, colleague, conference..."
            />
          </div>
        </FormSection>

        {/* Section F: Membership Fee / Payment Details */}
        <FormSection
          title="Section F"
          subtitle="Membership Fee & Payment Details"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldInput
              name="fee"
              label="Membership Fee (if known)"
              value={formData.fee}
              onChange={(v) => handleChange("fee", v)}
              placeholder="e.g. $100 / GH¢..."
            />
            <FieldInput
              name="paymentDate"
              label="Payment Date"
              value={formData.paymentDate}
              onChange={(v) => handleChange("paymentDate", v)}
              placeholder="DD/MM/YYYY"
            />
            <FieldInput
              name="paymentMethod"
              label="Method of Payment"
              type="select"
              options={["Bank Transfer", "Mobile Money", "Cash"]}
              value={formData.paymentMethod}
              onChange={(v) => handleChange("paymentMethod", v)}
            />
          </div>
        </FormSection>

        {/* Section G: Applicant's Declaration */}
        <FormSection
          title="Section G"
          subtitle="Applicant's Declaration"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <ConsentCheckbox
            name="declaration"
            checked={!!formData.declaration}
            error={errors.declaration}
            onChange={(v) => handleChange("declaration", v)}
            label="I hereby declare that the information provided in this application is true and accurate to the best of my knowledge. I agree to abide by the Constitution, Bylaws, and Code of Conduct of the World Professors' Association (WPA)."
            required
          />
          <FieldInput
            name="signature"
            label="Signature"
            value={formData.signature}
            error={errors.signature}
            onChange={(v) => handleChange("signature", v)}
            placeholder="Type your full name as signature"
            required
          />
        </FormSection>

        {/* Section H: Privacy & Data Protection Consent */}
        <FormSection
          title="Section H"
          subtitle="Privacy & Data Protection Consent"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <ConsentCheckbox
            name="privacyConsent"
            checked={!!formData.privacyConsent}
            error={errors.privacyConsent}
            onChange={(v) => handleChange("privacyConsent", v)}
            label="I have read and understood the WPA Privacy Statement and consent to the collection, storage, processing, and use of my information for WPA membership and official activities. My data will be handled confidentially and not shared with third parties without my consent, except where required by law."
            required
          />
        </FormSection>

        {/* Section I: Referee / Professional Endorsement */}
        <FormSection
          title="Section I"
          subtitle="Referee / Professional Endorsement"
          icon={<Users className="h-4 w-4" />}
        >
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Referee 1
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldInput
                  name="referee1Name"
                  label="Referee Name"
                  value={formData.referee1Name}
                  error={errors.referee1Name}
                  onChange={(v) => handleChange("referee1Name", v)}
                  placeholder="Prof. Jane Doe"
                  required
                />
                <FieldInput
                  name="referee1Position"
                  label="Position / Title"
                  value={formData.referee1Position}
                  onChange={(v) => handleChange("referee1Position", v)}
                  placeholder="Dean of Faculty"
                />
                <FieldInput
                  name="referee1Email"
                  label="Email Address"
                  type="email"
                  value={formData.referee1Email}
                  error={errors.referee1Email}
                  onChange={(v) => handleChange("referee1Email", v)}
                  placeholder="jane@university.edu"
                  required
                />
                <FieldInput
                  name="referee1Phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.referee1Phone}
                  error={errors.referee1Phone}
                  onChange={(v) => handleChange("referee1Phone", v)}
                  placeholder="+233 24 000 0000"
                  required
                />
                <FieldInput
                  name="referee1Institution"
                  label="Institution"
                  value={formData.referee1Institution}
                  onChange={(v) => handleChange("referee1Institution", v)}
                  placeholder="University of Accra"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Referee 2 <span className="font-normal normal-case">(Optional)</span>
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldInput
                  name="referee2Name"
                  label="Referee Name"
                  value={formData.referee2Name}
                  onChange={(v) => handleChange("referee2Name", v)}
                  placeholder="Prof. Robert Chen"
                />
                <FieldInput
                  name="referee2Email"
                  label="Email Address"
                  type="email"
                  value={formData.referee2Email}
                  onChange={(v) => handleChange("referee2Email", v)}
                  placeholder="robert@university.edu"
                />
                <FieldInput
                  name="referee2Phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.referee2Phone}
                  onChange={(v) => handleChange("referee2Phone", v)}
                  placeholder="+233 24 000 0000"
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* Section J: Required Attachments */}
        <FormSection
          title="Section J"
          subtitle="Required Attachments"
          icon={<FileText className="h-4 w-4" />}
        >
          <FileUpload
            id="degreeCertificate"
            label="Copy of Highest Degree Certificate"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            value={formData.degreeCertificate}
            error={errors.degreeCertificate}
            onChange={(v) => handleChange("degreeCertificate", v)}
            required
          />
        </FormSection>

        {errors._form && (
          <p className="rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold" role="alert">
            {errors._form}
          </p>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 rounded-sm border border-border bg-card p-6 sm:flex-row sm:justify-between sm:p-8">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-primary">Ready to submit?</p>
            <p className="text-xs text-muted-foreground">
              Review your application before submitting
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

interface FormSectionProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  children: React.ReactNode
}

function FormSection({ title, subtitle, icon, children }: FormSectionProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-gold/25 bg-gold/5 text-gold">
          {icon}
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
            {title}: {subtitle}
          </h3>
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </div>
  )
}

interface FieldInputProps {
  name: string
  label: string
  type?: "text" | "email" | "tel" | "select"
  options?: string[]
  value: string
  error?: string
  placeholder?: string
  required?: boolean
  onChange: (value: string) => void
}

function FieldInput({ name, label, type = "text", options, value, error, placeholder, required, onChange }: FieldInputProps) {
  const inputBase = cn(
    "w-full rounded-xl border bg-background py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/40",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
    error ? "border-gold/60" : "border-border hover:border-border/80",
    type === "select" && "appearance-none"
  )

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-primary sm:text-sm">
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>
      {type === "select" ? (
        <select
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputBase}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 animate-slide-up text-xs text-gold" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface ConsentCheckboxProps {
  name: string
  checked: boolean
  error?: string
  label: string
  required?: boolean
  onChange: (value: string) => void
}

function ConsentCheckbox({ name, checked, error, label, required, onChange }: ConsentCheckboxProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200",
          error ? "border-gold/60 bg-gold/[0.02]" : checked ? "border-gold/40 bg-gold/[0.03]" : "border-border hover:border-border/80"
        )}
      >
        <input
          id={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked ? "yes" : "")}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--gold)]"
        />
        <span className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {label}
          {required && <span className="ml-0.5 text-gold">*</span>}
        </span>
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1 animate-slide-up text-xs text-gold" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function GraduationCapIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}
