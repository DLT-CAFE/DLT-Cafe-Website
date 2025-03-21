import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  segments: {
    name: string
    href: string
  }[]
  separator?: React.ReactNode
  home?: boolean
}

export function Breadcrumb({
  segments,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  home = true,
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center gap-1 md:gap-2">
        {home && (
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}
        {home && segments.length > 0 && (
          <li className="flex items-center gap-1">
            {separator}
          </li>
        )}
        {segments.map((segment, index) => (
          <React.Fragment key={segment.href}>
            <li>
              <Link
                href={segment.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  index === segments.length - 1
                    ? "font-medium text-foreground pointer-events-none"
                    : "text-foreground/60"
                )}
                aria-current={index === segments.length - 1 ? "page" : undefined}
              >
                {segment.name}
              </Link>
            </li>
            {index < segments.length - 1 && (
              <li className="flex items-center gap-1">
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
} 