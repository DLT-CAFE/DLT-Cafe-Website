import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
  getPostsByTagSlug,
  getTagBySlug,
  getFeaturedMediaById,
  getCategoryById,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";
import { FeaturedPostsSlider } from "@/app/components/FeaturedPostsSlider";
import { NewsletterForm } from '@/app/components/NewsletterForm';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
const outfit = Outfit({ subsets: ['latin'] });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Browse all our blog posts",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search } = params;
  
  // Fetch featured posts by tag slug instead of using the string directly
  let sliderPosts: Awaited<ReturnType<typeof getAllPosts>> = [];
  let mediaMap: Record<number, any> = {};
  let categoryMap: Record<number, any> = {};
  
  try {
    // Get posts tagged as "featured" - handle errors gracefully if tag doesn't exist
    const featuredPosts = await getPostsByTagSlug("featured");
    // Limit to 3-5 posts for slider
    sliderPosts = featuredPosts.slice(0, 5);
    
    // Pre-fetch media and categories for the featured posts
    if (sliderPosts.length > 0) {
      // Get media for each post
      const mediaPromises = sliderPosts.map(async (post) => {
        if (post.featured_media) {
          return {
            id: post.id,
            media: await getFeaturedMediaById(post.featured_media)
          };
        }
        return { id: post.id, media: null };
      });

      // Get primary category for each post
      const categoryPromises = sliderPosts.map(async (post) => {
        if (post.categories && post.categories.length > 0) {
          return {
            id: post.id,
            category: await getCategoryById(post.categories[0])
          };
        }
        return { id: post.id, category: null };
      });

      const mediaResults = await Promise.all(mediaPromises);
      const categoryResults = await Promise.all(categoryPromises);

      mediaResults.forEach(result => {
        if (result.media) {
          mediaMap[result.id] = result.media;
        }
      });

      categoryResults.forEach(result => {
        if (result.category) {
          categoryMap[result.id] = result.category;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    // Continue with empty featured posts if there's an error
  }

  // Fetch data based on search parameters
  const [posts, authors, tags, categories] = await Promise.all([
    getAllPosts({ author, tag, category, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <>
      {/* Featured Posts Slider - only show if we have featured posts and no search/filters applied */}
      {sliderPosts.length > 0 && !search && !author && !tag && !category && (
        <FeaturedPostsSlider 
          posts={sliderPosts} 
          mediaMap={mediaMap} 
          categoryMap={categoryMap}
        />
      )}
      
      <Section>
        <Container>
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className={`${outfit.className} text-4xl md:text-5xl font-medium mb-4`}>
                Latest Articles & Insights
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Explore our collection of articles, news, and insights about innovation, technology, and entrepreneurship.
              </p>
            </div>

            <div className="space-y-4">
              <SearchInput defaultValue={search} />

              <FilterPosts
                authors={authors}
                tags={tags}
                categories={categories}
                selectedAuthor={author}
                selectedTag={tag}
                selectedCategory={category}
              />
            </div>

            {paginatedPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No posts found</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                      href={createPaginationUrl(page - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={createPaginationUrl(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className={
                        page >= totalPages ? "pointer-events-none opacity-50" : ""
                      }
                      href={createPaginationUrl(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </Container>
        
      </Section>
            {/* Spacer Div */}
      <div className="h-[200px] w-full" id="section-spacer-4"></div>

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
    <div className="max-w-[600px] mx-auto text-center">
      <NewsletterForm />
    </div>
  </div>
</section>

{/* Spacer Div */}
<div className="h-[100px] w-full" id="section-spacer-4"></div> 

    </>
    
  );
}
