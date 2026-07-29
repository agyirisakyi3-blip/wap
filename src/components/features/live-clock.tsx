"use client"

import * as React from "react"
import { Clock } from "lucide-react"

export function LiveClock() {
  const [time, setTime] = React.useState<{
    date: string
    time: string
  } | null>(null)

  React.useEffect(() => {
    function update() {
      const now = new Date()
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTime({
        date: now.toLocaleDateString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: tz,
        }),
        time: now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: tz,
        }),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
      <Clock className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{time.date}</span>
      <span className="tabular-nums">{time.time}</span>
    </div>
  )
}
