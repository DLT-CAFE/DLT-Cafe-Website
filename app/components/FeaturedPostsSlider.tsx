'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/lib/wordpress.d';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedPostsSliderProps {
  posts: Post[];
  mediaMap: Record<number, any>;
  categoryMap: Record<number, any>;
}

export function FeaturedPostsSlider({ posts, mediaMap, categoryMap }: FeaturedPostsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Auto-advance slider every 8 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (posts.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get 3 thumbnails cycling through all available posts
  const getThreeThumbnails = () => {
    // Create an array of all post indices except the current one
    const availableIndices = Array.from({ length: posts.length }, (_, i) => i)
      .filter(i => i !== currentIndex);
    
    // If we don't have any other posts, return empty array
    if (availableIndices.length === 0) return [];
    
    // Sort indices so they start after current index and wrap around
    availableIndices.sort((a, b) => {
      // Calculate distance from current index (considering the circular nature)
      const distA = a > currentIndex ? a - currentIndex : a + posts.length - currentIndex;
      const distB = b > currentIndex ? b - currentIndex : b + posts.length - currentIndex;
      return distA - distB;
    });
    
    // Get up to 3 indices, cycling through all available posts if needed
    const result: {index: number; post: Post}[] = [];
    
    // Fill the thumbnails array until we have 3
    for (let i = 0; i < 3; i++) {
      // Use modulo to cycle through available indices if we need more than we have
      const indexPos = i % availableIndices.length;
      const postIndex = availableIndices[indexPos];
      
      result.push({
        index: postIndex,
        post: posts[postIndex]
      });
    }
    
    return result;
  };

  const thumbSlides = getThreeThumbnails();
  
  // Debug log to check thumbnails in console
  console.log("Thumbnails:", thumbSlides.length, thumbSlides.map(t => t.post.title?.rendered));

  return (
    <div className="relative w-full h-[90svh] overflow-hidden mb-8">
      <AnimatePresence initial={false} mode="wait">
        {posts.map((post, index) => (
          index === currentIndex && (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Background image with Ken Burns effect */}
                <div className="absolute inset-0 bg-black/20 z-10" />
                {mediaMap[post.id]?.source_url ? (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                  >
                    <Image
                      src={mediaMap[post.id].source_url}
                      alt={post.title?.rendered || 'Featured post'}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                    <span className="text-lg font-medium">No image available</span>
                  </div>
                )}
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-20" />
                
                {/* Post content - centered */}
                <div className="relative z-30 text-white text-center max-w-4xl mx-auto px-8">
                  <div className="flex items-center justify-center mb-4">
                    {categoryMap[post.id]?.name && (
                      <span className="text-sm font-semibold bg-[#d2f381] text-black px-3 py-1 rounded-full">
                        {categoryMap[post.id].name}
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/posts/${post.slug}`}>
                    <h3 
                      className="text-3xl md:text-5xl lg:text-6xl font-bold hover:underline decoration-[#d2f381] underline-offset-4"
                      dangerouslySetInnerHTML={{
                        __html: post.title?.rendered || "Untitled Post"
                      }}
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation controls */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Thumbnails container - always shows exactly 3 thumbnails */}
      <div className="absolute bottom-14 left-0 right-0 z-40 flex justify-center px-4">
        {thumbSlides.length > 0 && (
          <div className="bg-black/30 backdrop-blur-md p-3 rounded-lg flex gap-4 md:gap-8">
            {thumbSlides.map(({index, post}, i) => (
              <Link 
                key={`${post.id}-${i}`} 
                href={`/posts/${post.slug}`}
                className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors"
              >
                {/* Thumbnail image - increased width */}
                <div className="w-24 h-16 md:w-32 md:h-20 flex-shrink-0 overflow-hidden rounded">
                  {mediaMap[post.id]?.source_url ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={mediaMap[post.id].source_url}
                        alt={post.title?.rendered || 'Next post'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                      <span className="text-xs text-white/70">No image</span>
                    </div>
                  )}
                </div>
                
                {/* Title next to thumbnail */}
                <div className="text-white text-sm md:text-base font-medium line-clamp-2 max-w-[150px] md:max-w-[180px] text-left group-hover:text-[#d2f381]">
                  <span dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Dots indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all",
                index === currentIndex 
                  ? "w-8 h-2 bg-[#d2f381]" 
                  : "w-2 h-2 bg-white/40 hover:bg-white/70",
                "rounded-full"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 