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

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

import "@/styles/post-content.css";

import type { Metadata } from "next";

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
              { name: post.title.rendered.replace(/<[^>]*>/g, ""), href: `/posts/${slug}` }
            ]}
          />
          
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
                >
                  {category.name}
                </Link>
              </div>
              
              <Article 
                className="post-content text-[20px] font-extralight" 
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
              />
            </div>
            
            {/* Sidebar - 25% width */}
            <div className="md:col-span-1">
              <div className="sticky top-8">
                <h4 className="text-lg font-semibold mb-4">Table of Contents</h4>
                <TableOfContents contentSelector=".post-content" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
