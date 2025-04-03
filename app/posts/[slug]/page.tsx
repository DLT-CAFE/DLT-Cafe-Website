import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPosts,
} from "@/lib/wordpress";

import { Section, Container, Article } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { DropCapFixer } from "@/app/components/DropCapFixer";
import { NextPost } from "@/app/components/NextPost";
import { AudioPlayer } from "@/app/components/AudioPlayer";
import { Outfit } from 'next/font/google';
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { Clock } from "lucide-react";

import "@/styles/post-content.css";

import type { Metadata } from "next";

const outfit = Outfit({ subsets: ['latin'] });

// Calculate reading time function
function calculateReadingTime(content: string): number {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  // Count words (roughly)
  const words = text.split(/\s+/).length;
  // Calculate reading time (average reading speed: 200-250 words per minute)
  const readingTime = Math.ceil(words / 225);
  return readingTime;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: post.title.rendered,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 1030,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

// Function to find the next post from the same category
async function getNextPost(currentPostId: number, categoryId: number) {
  const allPosts = await getAllPosts();
  
  // Filter posts by the same category
  const categoryPosts = categoryId 
    ? allPosts.filter(post => post.categories && post.categories.includes(categoryId))
    : allPosts;
  
  // If no posts in the same category (unlikely), fall back to all posts
  const postsToSearch = categoryPosts.length > 1 ? categoryPosts : allPosts;
  
  // Find the index of the current post
  const currentIndex = postsToSearch.findIndex(post => post.id === currentPostId);
  
  // If current post is not found or it's the last post in the category, return the first post from the category
  if (currentIndex === -1 || currentIndex === postsToSearch.length - 1) {
    // Return the first post that isn't the current post
    const firstPost = postsToSearch.find(post => post.id !== currentPostId);
    return firstPost || allPosts[0]; // Fallback to the first post of all posts if needed
  }
  
  // Return the next post in the same category
  return postsToSearch[currentIndex + 1];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);
  
  // Calculate reading time
  const readingTime = calculateReadingTime(post.content.rendered);
  
  // Get the next post
  const nextPost = await getNextPost(post.id, category.id);
  const isFromSameCategory = nextPost.categories && 
    nextPost.categories.includes(category.id);

  return (
    <>
      <DropCapFixer />
      <ReadingProgress color="#d2f381" height={4} />
      
      {/* Full width hero section */}
      <section className="post-hero">
        {featuredMedia?.source_url && (
          <>
            <Image 
              className="post-hero-image"
              src={featuredMedia.source_url}
              alt={post.title.rendered}
              width={1920}
              height={2080}
              priority
            />
            <div className="post-hero-overlay"></div>
          </>
        )}
        <div className="post-hero-content">
          <h1 className="post-hero-title">
            <Balancer>
              <span
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></span>
            </Balancer>
          </h1>
          <p className="post-hero-date">{date}</p>
        </div>
      </section>

      {/* Main content section */}
      <Section className="md:py-0 py-0">
        <Container className="max-w-6xl">
          {/* Breadcrumbs */}
          <Breadcrumb 
            className="mt-2 mb-6"
            segments={[
              { name: "Blog", href: "/posts" },
              { name: post.title.rendered.replace(/<[^>]*>/g, ""), href: `/posts/${slug}`, className: "text-[#d2f381]" }
            ]}
          />
          
          {/* Spacer Div */}
          <div className="h-[50px] w-full" id="section-spacer-2"></div>
          
          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Main content - 75% width */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center gap-4 text-sm mb-6">
                <h5>
                  By{" "}
                  {author.name && (
                    <span>
                      <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
                    </span>
                  )}
                </h5>

                <Link
                  href={`/posts/?category=${category.id}`}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "!no-underline"
                  )}
                  dangerouslySetInnerHTML={{ __html: category.name }}
                />
              </div>
              
              {/* Article metadata (reading time, audio player) */}
              <div className="article-meta flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="reading-time flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  
                  <AudioPlayer />
                </div>
              </div>
              
              <Article 
                className="post-content text-[20px] font-extralight" 
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
              />
              
              {/* Display the next post component */}
              {nextPost && <NextPost post={nextPost} isFromSameCategory={isFromSameCategory} />}
            </div>
            
            {/* Sidebar - 25% width */}
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <h4 className="text-lg font-semibold mb-4">Table of Contents</h4>
                <div className="toc-container">
                  <TableOfContents contentSelector=".post-content" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Spacer Div */}
      <div className="h-[100px] w-full" id="section-spacer-3"></div>

    {/* Bottom Section */}
    <section className="py-16 relative">
        {/* Texture Background with Elliptical Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidde nmy-80">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/texture-bg.jpg"
              alt="Background Texture"
              fill
              className="object-cover"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 70%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-[1220px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-white/60 uppercase tracking-wider mb-4">DLT CAFE VENTURE STUDIO</p>
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
              </div>
            </div>
            <h2 className={`${outfit.className} text-[52px] font-medium text-white`}>
              Community, Innovation & Growth
            </h2>
          </div>
           
          {/* Newsletter Section */}
          <div className="max-w-[600px] mx-auto text-center ">
            <h3 className={`${outfit.className} text-[28px] font-medium text-white mb-8`}>
              Subscribe to our Newsletter
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
            </div>
            <div className="flex flex-col items-center">
              <button 
                type="submit" 
                className="bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded w-full md:w-auto transition-all"
              >
                Submit
              </button>
              
              {/* Lightning Bolt Icon */}
              <div className="mt-8">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4142 0L0 20.1213H10.1213L8.48528 36L22.6274 15.8787H12.5061L13.4142 0Z" fill="#D2F381"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer Div */}
      <div className="h-[100px] w-full" id="section-spacer-4"></div>

    </>
  );
}
