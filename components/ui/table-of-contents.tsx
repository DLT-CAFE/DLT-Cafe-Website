'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  /**
   * The CSS selector for the content
   * @default "article"
   */
  contentSelector?: string
  /**
   * The minimum heading level to include
   * @default 2
   */
  minLevel?: number
  /**
   * The maximum heading level to include
   * @default 4
   */
  maxLevel?: number
  /**
   * The class name for the list
   */
  className?: string
}

/**
 * Table of contents component that generates a list of links to headings in the content
 */
export function TableOfContents({
  contentSelector = 'article',
  minLevel = 2,
  maxLevel = 4,
  className,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const content = document.querySelector(contentSelector)
    if (!content) return

    // Find all heading elements within the specified level range
    const headingElements = Array.from(
      content.querySelectorAll(`h${minLevel}, h${minLevel + 1}, h${minLevel + 2}`)
    ).filter((el) => {
      const level = parseInt(el.tagName.slice(1))
      return level >= minLevel && level <= maxLevel
    })

    // If no headings found, try to extract main sections from paragraphs
    if (headingElements.length === 0) {
      const paragraphs = Array.from(content.querySelectorAll('p'))
      // Take first few paragraphs (or ones with strong/b tags) as potential section markers
      const potentialSections = paragraphs
        .slice(0, Math.min(10, paragraphs.length))
        .filter((p, index) => 
          // First paragraph is always important
          index === 0 || 
          // Paragraphs with bold/strong text might be section headers
          p.querySelector('strong, b') ||
          // Short paragraphs might be headers
          (p.textContent && p.textContent.length < 100 && p.textContent.trim().endsWith(':'))
        )
        .slice(0, 5) // Limit to first 5 potential sections
      
      // Create TOC items from these paragraphs
      const items = potentialSections.map((p, index) => {
        const id = `section-${index}`
        p.id = id
        return {
          id,
          text: p.textContent?.slice(0, 60) || `Section ${index + 1}`,
          level: 2
        }
      })
      
      setHeadings(items)
    } else {
      // Use actual headings (preferred method)
      // Ensure each heading has an ID
      const items = headingElements.map((el) => {
        // Use existing ID or generate one
        if (!el.id) {
          const text = el.textContent?.trim() || ''
          el.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }

        return {
          id: el.id,
          text: el.textContent || '',
          level: parseInt(el.tagName.slice(1)),
        }
      })

      setHeadings(items)
    }

    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.2
      }
    )

    // Observe all elements that might be in our TOC
    const elementsToObserve = headingElements.length > 0 
      ? headingElements 
      : Array.from(content.querySelectorAll('[id^="section-"]'))
    
    elementsToObserve.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [contentSelector, minLevel, maxLevel])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('not-prose text-sm', className)}>
      <ul className="space-y-2 text-muted-foreground">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - minLevel) * 12}px`,
            }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-1.5 border-l-2 pl-3 hover:text-foreground transition-colors',
                activeId === heading.id 
                  ? 'border-primary font-medium text-foreground' 
                  : 'border-transparent text-muted-foreground'
              )}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 100,
                    behavior: 'smooth',
                  })
                  setActiveId(heading.id)
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
} 