"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Upload, X, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react"

interface FileUploadProps {
  id: string
  accept?: string
  maxSizeKB?: number
  label: string
  value?: string
  error?: string
  onChange: (fileName: string, file?: File) => void
  onClear?: () => void
  isImage?: boolean
  required?: boolean
}

export function FileUpload({
  id,
  accept = ".pdf,.doc,.docx",
  maxSizeKB,
  label,
  value,
  error,
  onChange,
  isImage = false,
  required = false,
}: FileUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [sizeError, setSizeError] = React.useState<string | null>(null)
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const errorId = `${id}-error`
  const sizeErrorId = `${id}-size-error`

  const handleFile = (file: File) => {
    setSizeError(null)

    if (maxSizeKB && file.size > maxSizeKB * 1024) {
      setSizeError(`File exceeds ${maxSizeKB}KB limit (${(file.size / 1024).toFixed(1)}KB)`)
      return
    }

    if (isImage && !file.type.startsWith("image/")) {
      setSizeError("Please select a valid image file")
      return
    }

    onChange(file.name, file)

    if (isImage) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    setPreview(null)
    setSizeError(null)
    onChange("")
    if (inputRef.current) inputRef.current.value = ""
  }

  const displayError = error || sizeError

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-primary sm:text-sm">
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>

      {preview ? (
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={preview}
            alt="Uploaded preview"
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-600 backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3" /> Uploaded
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click() }}
          aria-label={`Upload ${label}`}
          aria-describedby={displayError ? (sizeError ? sizeErrorId : errorId) : undefined}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200",
            "hover:border-gold/50 hover:bg-gold/[0.02]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
            isDragOver && "border-gold bg-gold/5 scale-[1.02]",
            displayError ? "border-gold/60 bg-gold/[0.02]" : "border-border",
            isImage ? "py-8 sm:py-12" : "py-6"
          )}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={isImage ? "image/*" : accept}
            onChange={handleChange}
            className="sr-only"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center gap-2">
            {isImage ? (
              <div className={cn(
                "rounded-full p-3 transition-all duration-300",
                isDragOver ? "bg-gold/20 scale-110" : "bg-muted"
              )}>
                <ImageIcon className={cn(
                  "h-6 w-6 transition-colors sm:h-8 sm:w-8",
                  isDragOver ? "text-gold" : "text-muted-foreground"
                )} />
              </div>
            ) : (
              <div className="rounded-full bg-muted p-3 transition-all duration-300 group-hover:bg-gold/10">
                <Upload className="h-5 w-5 text-muted-foreground sm:h-6 sm:w-6" />
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {isImage ? "Upload photo" : "Upload file"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isImage ? (
                  <>PNG, JPG up to {maxSizeKB || 100}KB</>
                ) : (
                  <>PDF, DOC up to {maxSizeKB ? `${maxSizeKB}KB` : "10MB"}</>
                )}
              </p>
            </div>
          </div>

          {value && !displayError && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <CheckCircle2 className="h-3 w-3" />
              {value}
            </div>
          )}
        </div>
      )}

      {sizeError && (
        <p id={sizeErrorId} className="flex items-center gap-1 text-xs text-gold" role="alert">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {sizeError}
        </p>
      )}

      {error && !sizeError && (
        <p id={errorId} className="flex items-center gap-1 text-xs text-gold" role="alert">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
