import { cn } from "@/lib/utils"

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle"
  className?: string
}

export function SectionDivider({ variant = "wave", className }: SectionDividerProps) {
  if (variant === "wave") {
    return (
      <div className={cn("relative h-16 sm:h-24 overflow-hidden -mt-1", className)}>
        <div className="absolute inset-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,50 Q180,0 360,50 Q540,100 720,50 Q900,0 1080,50 Q1260,100 1440,50 L1440,100 L0,100 Z"
              fill="currentColor"
              className="text-background"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (variant === "curve") {
    return (
      <div className={cn("relative h-16 sm:h-24 overflow-hidden -mt-1", className)}>
        <div className="absolute inset-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,80 C360,0 1080,0 1440,80 L1440,100 L0,100 Z"
              fill="currentColor"
              className="text-secondary/50"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative h-16 sm:h-20 overflow-hidden -mt-1", className)}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full">
          <polygon
            points="0,80 1440,0 1440,80 0,80"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </div>
  )
}
