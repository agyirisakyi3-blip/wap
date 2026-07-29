"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { CheckCircle, Loader2, ArrowLeft, Send, Sparkles } from "lucide-react"

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
  fields: FormField[]
}

interface ApplyFormProps {
  position: Position
  onBack: () => void
}

export function ApplyForm({ position, onBack }: ApplyFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
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
    for (const field of position.fields) {
      if (field.required) {
        const value = formData[field.name]?.trim()
        if (!value) {
          newErrors[field.name] = `${field.label} is required`
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field.name] = "Invalid email address"
        }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [position.fields, formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId: position.id,
          fullName: formData.fullName || "",
          email: formData.email || "",
          phone: formData.phone || "",
          institution: formData.institution || "",
          country: formData.country || "",
          message: formData.statement || formData.whyJoin || "",
          photoUrl: formData.photo || "",
        }),
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
        <div className="mx-auto mb-6 flex h-20 w-20 animate-success-bounce items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/10 shadow-lg shadow-gold/20 sm:h-24 sm:w-24">
          <CheckCircle className="h-10 w-10 text-gold sm:h-12 sm:w-12" />
        </div>
        <div className="mx-auto max-w-md space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Application Submitted!
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-sm text-gold">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Application received</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Thank you for applying for{" "}
          <strong className="text-primary">{position.title}</strong>.
          Our review committee will evaluate your application and respond within
          5-7 business days.
        </p>
        <Button
          variant="gold"
          size="lg"
          className="mt-8 shadow-lg shadow-gold/20"
          onClick={onBack}
        >
          Browse More Positions
        </Button>
      </div>
    )
  }

  const personalFields = position.fields.filter((f) =>
    ["fullName", "email", "phone", "country"].includes(f.name)
  )
  const professionalFields = position.fields.filter((f) =>
    !["fullName", "email", "phone", "country", "photo", "cv", "supportingDocs"].includes(f.name) &&
    f.type !== "file" && f.type !== "image"
  )
  const fileFields = position.fields.filter((f) =>
    (f.type === "file" || f.type === "image" || ["cv", "supportingDocs"].includes(f.name)) &&
    f.name !== "photo"
  )
  const hasPhoto = position.fields.some((f) => f.name === "photo")
  const photoField = position.fields.find((f) => f.name === "photo")

  return (
    <div className="animate-slide-left">
      <button
        onClick={onBack}
        className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold sm:mb-8"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to positions
      </button>

      <div className="mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4 sm:py-1.5 sm:text-xs">
          <Send className="h-3 w-3" />
          Application Form
        </span>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-primary sm:text-2xl">
          {position.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fields marked with <span className="text-gold">*</span> are required
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Personal Information */}
        {personalFields.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Personal Information
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {personalFields.map((field) => (
                <FormFieldInput
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ""}
                  error={errors[field.name]}
                  isFocused={focusedField === field.name}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  onChange={(v) => handleChange(field.name, v)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Photo Upload */}
        {photoField && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Photo
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
            </div>
            <FileUpload
              id="photo"
              label="Profile Photo"
              accept="image/*"
              maxSizeKB={100}
              value={formData.photo}
              error={errors.photo}
              onChange={(v) => handleChange("photo", v)}
              isImage
              required={photoField.required}
            />
          </div>
        )}

        {/* Professional Details */}
        {professionalFields.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Professional Details
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {professionalFields.map((field) => (
                <FormFieldInput
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ""}
                  error={errors[field.name]}
                  isFocused={focusedField === field.name}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  onChange={(v) => handleChange(field.name, v)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Document Uploads */}
        {fileFields.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Documents
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
            </div>
            <div className="space-y-4">
              {fileFields.map((field) => (
                <FileUpload
                  key={field.name}
                  id={field.name}
                  label={field.label}
                  value={formData[field.name] || ""}
                  error={errors[field.name]}
                  onChange={(v) => handleChange(field.name, v)}
                  isImage={field.type === "image"}
                  required={field.required}
                  maxSizeKB={field.type === "image" ? 100 : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-gold/10 bg-gradient-to-b from-gold/[0.02] to-transparent p-6 pt-8 sm:flex-row sm:justify-between sm:p-8">
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
              className="w-full shadow-lg shadow-gold/20 sm:w-auto"
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

interface FormFieldInputProps {
  field: FormField
  value: string
  error?: string
  isFocused: boolean
  onFocus: () => void
  onBlur: () => void
  onChange: (value: string) => void
}

function FormFieldInput({ field, value, error, isFocused, onFocus, onBlur, onChange }: FormFieldInputProps) {
  const inputBase = cn(
    "w-full rounded-xl border bg-background py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/40",
    "transition-all duration-200",
    "focus:outline-none",
    error
      ? "border-gold/60 focus:ring-2 focus:ring-gold/30 focus:border-gold"
      : isFocused
        ? "border-gold/50 ring-1 ring-gold/20 shadow-sm"
        : "border-border hover:border-border/80",
    field.type === "select" && "appearance-none"
  )

  if (field.type === "textarea") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-primary sm:text-sm">
          {field.label}
          {field.required && <span className="ml-0.5 text-gold">*</span>}
        </label>
        <textarea
          id={field.name}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
          className={cn(inputBase, "resize-y min-h-[100px]")}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        />
        {error && (
          <p id={`${field.name}-error`} className="mt-1 animate-slide-up text-xs text-gold" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (field.type === "select") {
    return (
      <div>
        <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-primary sm:text-sm">
          {field.label}
          {field.required && <span className="ml-0.5 text-gold">*</span>}
        </label>
        <div className="relative">
          <select
            id={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputBase}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {error && (
          <p id={`${field.name}-error`} className="mt-1 animate-slide-up text-xs text-gold" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-primary sm:text-sm">
        {field.label}
        {field.required && <span className="ml-0.5 text-gold">*</span>}
      </label>
      <input
        id={field.name}
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={field.placeholder}
        className={inputBase}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />
      {error && (
        <p id={`${field.name}-error`} className="mt-1 animate-slide-up text-xs text-gold" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
