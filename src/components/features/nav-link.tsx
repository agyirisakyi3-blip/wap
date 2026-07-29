"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
}

export function NavLink({
  href,
  children,
  className,
  active,
  ...props
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative px-1 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "text-gold"
          : "text-primary-foreground/80 hover:text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-gold transition-all duration-300",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </a>
  )
}
