'use client'

import { useEffect } from 'react'

export function DropCapFixer() {
  useEffect(() => {
    // Function to find and mark the first real paragraph
    const applyDropCap = () => {
      const article = document.querySelector('.post-content')
      if (article) {
        // Find all paragraphs
        const paragraphs = article.querySelectorAll('p')
        
        // Find the first substantial paragraph (not empty, not just an image)
        for (let i = 0; i < paragraphs.length; i++) {
          const p = paragraphs[i]
          // Skip paragraphs that only contain images or are empty
          if (
            p.textContent?.trim() && 
            p.textContent?.length > 10 &&
            !p.querySelector('img')
          ) {
            p.classList.add('first-paragraph')
            break // Only add to the first substantial paragraph
          }
        }
      }
    }

    // Apply on load
    applyDropCap()
    
    // Also apply after a short delay to ensure WordPress content is fully loaded
    const timer = setTimeout(applyDropCap, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  // This component doesn't render anything
  return null
} 