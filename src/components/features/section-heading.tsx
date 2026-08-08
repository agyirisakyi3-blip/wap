import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  index?: string
  align?: "center" | "left"
  tone?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  index,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark"

  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 sm:space-y-5",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          {align === "center" && <span className="h-px w-8 bg-gold/60 sm:w-12" />}
          <span
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.28em] sm:text-xs",
              isDark ? "text-gold" : "text-gold"
            )}
          >
            {label}
          </span>
          <span className="h-px w-8 bg-gold/60 sm:w-12" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.25rem]",
          isDark ? "text-primary-foreground" : "text-primary"
        )}
      >
        {index && (
          <span
            className={cn(
              "mr-3 align-middle font-display text-2xl font-normal italic text-gold sm:text-3xl",
              align === "center" && "inline-block"
            )}
          >
            {index}
          </span>
        )}
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mx-auto max-w-2xl text-sm leading-relaxed sm:text-base sm:leading-relaxed",
            isDark ? "text-primary-foreground/65" : "text-muted-foreground",
            align === "left" && "mx-0"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
