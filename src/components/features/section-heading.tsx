import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3 sm:space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold sm:px-4 sm:py-1.5 sm:text-xs">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
