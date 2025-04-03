'use client';

import { useState } from 'react';
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div 
        onClick={() => setShowPlayer(!showPlayer)}
        className="audio-toggle flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
      >
        <Volume2 className={cn("h-4 w-4", showPlayer && "text-[#d2f381]")} />
        <span className={cn(showPlayer && "text-[#d2f381]")}>Listen</span>
      </div>
      
      {showPlayer && (
        <div className="audio-player inline-flex items-center">
          <audio 
            controls 
            className="!h-[40px] ml-2 [&::-webkit-media-controls-panel]:!h-[40px] [&::-webkit-media-controls-panel]:!bg-zinc-900/90 [&::-webkit-media-controls-current-time-display]:!text-[#d2f381] [&::-webkit-media-controls-time-remaining-display]:!text-[#d2f381] [&::-webkit-media-controls-play-button]:!text-[#d2f381] [&::-webkit-media-controls-timeline]:!bg-zinc-800 [&::-webkit-media-controls-timeline]:!ml-2 [&::-webkit-media-controls-timeline-container]:!text-[#d2f381] [&::-webkit-media-controls-mute-button]:!text-[#d2f381] [&::-webkit-media-controls-volume-slider]:!bg-zinc-800 [&::-webkit-media-controls-volume-slider-container]:!text-[#d2f381] [&::-webkit-media-controls-seek-back-button]:!text-[#d2f381] [&::-webkit-media-controls-seek-forward-button]:!text-[#d2f381] [&::-webkit-media-controls-fullscreen-button]:!text-[#d2f381] [&::-webkit-media-controls-toggle-closed-captions-button]:!text-[#d2f381] [&::-webkit-media-controls-enclosure]:!bg-zinc-900/90"
          >
            <source src="#" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
} 