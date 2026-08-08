import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  institution: string
  gradient: string
  initials: string
  className?: string
}

export function TestimonialCard({
  quote,
  name,
  title,
  institution,
  gradient,
  initials,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "group flex h-full flex-col justify-between gap-8 border border-border bg-card p-8 transition-colors duration-300 hover:border-gold/40 sm:p-10",
        className
      )}
    >
      <blockquote className="font-display text-xl font-normal leading-snug tracking-tight text-primary sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center justify-between gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-medium text-white",
              gradient
            )}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">{name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {title}, {institution}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </figcaption>
    </figure>
  )
}
