"use client"

import { useState } from "react"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "subscribed">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setStatus("subscribed")
  }

  return (
    <div className="mt-12 border border-primary-foreground/15 p-6 sm:mt-16 sm:p-9">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-gold/40 text-gold">
              <Mail className="h-3 w-3" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              Newsletter
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-primary-foreground sm:text-2xl">
            The Professors&apos; Brief
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">
            Research opportunities, conferences, and WPA announcements — delivered
            to your inbox.
          </p>
        </div>

        {status === "subscribed" ? (
          <div className="flex items-center gap-3 rounded-sm border border-gold/40 bg-gold/10 px-5 py-4 sm:min-w-[20rem]">
            <CheckCircle className="h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm font-medium text-primary-foreground">
              You&apos;re on the list. Welcome aboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="w-full sm:max-w-sm">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError("")
                  }}
                  placeholder="you@university.edu"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  className="w-full rounded-sm border border-primary-foreground/20 bg-transparent px-3.5 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 transition-colors focus:border-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-sm bg-gold px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-gold/90"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-gold">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}
