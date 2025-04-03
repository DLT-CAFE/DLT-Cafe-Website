"use client"

import { TextCloud } from "./interactive-icon-cloud"

const textIcons = [
  { id: 'ai', text: 'Artificial Intelligence' },
  { id: 'automation', text: 'Automation' },
  { id: 'agentic', text: 'Agentic' },
  { id: 'creators', text: 'Creators' },
  { id: 'data', text: 'Liquid Data' },
  { id: 'attention', text: 'Attention' },
  { id: 'venture', text: 'Brand' },
  { id: 'collective', text: 'Community' },
  { id: 'innovation', text: 'Social' },
  { id: 'future', text: 'Distribution' }
]

export function IconCloudDemo() {
  return (
    <div className="w-full h-full">
      <TextCloud icons={textIcons} />
    </div>
  )
} 