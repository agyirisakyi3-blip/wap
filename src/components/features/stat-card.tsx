import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-card p-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:rounded-xl sm:p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {icon && (
        <div className="relative mb-2 inline-flex items-center justify-center rounded-full bg-gold/10 p-2 text-gold sm:mb-4 sm:p-3">
          {icon}
        </div>
      )}
      <div className="relative">
        <div className="text-xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {value}
        </div>
        <div className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:mt-1 sm:text-sm sm:text-base">
          {label}
        </div>
      </div>
    </div>
  )
}
