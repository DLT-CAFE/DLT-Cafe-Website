'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ReadingProgressProps {
  /**
   * The color of the progress bar
   * @default "#000"
   */
  color?: string
  /**
   * The height of the progress bar in pixels
   * @default 2
   */
  height?: number
  /**
   * The z-index of the progress bar
   * @default 50
   */
  zIndex?: number
  className?: string
}

/**
 * Reading progress bar that shows how far a user has scrolled on a page
 */
export function ReadingProgress({
  color = '#000',
  height = 2,
  zIndex = 50,
  className
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      const percent = scrollPercent * 100
      setProgress(percent)
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateProgress)
    
    // Initial calculation
    updateProgress()

    // Clean up
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        backgroundColor: 'transparent',
        zIndex: zIndex,
      }}
    >
      <div 
        style={{
          height: '100%',
          backgroundColor: color,
          width: `${progress}%`,
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  )
} 