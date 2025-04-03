import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/lib/wordpress.d';
import { getFeaturedMediaById, getCategoryById } from '@/lib/wordpress';

interface NextPostProps {
  post: Post;
  isFromSameCategory?: boolean;
}

export async function NextPost({ post, isFromSameCategory = true }: NextPostProps) {
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
    
  const category = post.categories?.[0] 
    ? await getCategoryById(post.categories[0])
    : null;

  return (
    <div className="next-post-container my-12 border-t border-muted pt-8">
      <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
        {isFromSameCategory ? 'More From This Category' : 'Next Article'} <ArrowRight className="h-4 w-4 ml-1" />
      </h2>
      
      <Link href={`/posts/${post.slug}`} className="next-post-card group">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Image Column */}
          <div className="md:col-span-4 h-48 overflow-hidden rounded-lg border relative">
            {featuredMedia?.source_url ? (
              <Image 
                src={featuredMedia.source_url}
                alt={post.title.rendered}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={300}
                height={200}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                No image available
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content Column */}
          <div className="md:col-span-8">
            {category && (
              <div className="text-sm mb-2 text-[#d2f381]" dangerouslySetInnerHTML={{ __html: category.name }}></div>
            )}
            <h3 
              className="text-xl md:text-2xl font-medium group-hover:text-[#d2f381] transition-colors duration-200 mb-3"
              dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled Post" }}
            />
            <div 
              className="text-muted-foreground line-clamp-2 md:line-clamp-3"
              dangerouslySetInnerHTML={{ 
                __html: post.excerpt?.rendered || "No excerpt available" 
              }}
            />
            <div className="mt-4 flex items-center text-sm text-[#d2f381] font-medium">
              <span>Read article</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 