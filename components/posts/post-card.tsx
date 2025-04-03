import Image from "next/image";
import Link from "next/link";

import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = post.author ? await getAuthorById(post.author) : null;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  // Prepare title and excerpt for display
  const titleHtml = post.title?.rendered || "Untitled Post";
  const excerptHtml = post.excerpt?.rendered
    ? post.excerpt.rendered.split(" ").slice(0, 12).join(" ").trim() + "..."
    : "No excerpt available";
  const categoryName = category?.name || "Uncategorized";

  return (
    <div className="relative group">
      <Spotlight
        className="from-[#d2f381]/20 via-[#d2f381]/10 to-transparent blur-3xl"
        size={124}
      />
      <Link
        href={`/posts/${post.slug}`}
        className={cn(
          "border p-4 bg-card rounded-lg flex justify-between flex-col not-prose gap-8",
          "transition-all duration-200 hover:shadow-md hover:border-primary/20 w-full h-full"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center bg-muted group-hover:border-primary/20 transition-all duration-200">
            {media?.source_url ? (
              <Image
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={media.source_url}
                alt={titleHtml.replace(/<[^>]*>/g, '')}
                width={400}
                height={200}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                No image available
              </div>
            )}
          </div>
          <h3 
            className="text-xl font-medium transition-colors duration-200 group-hover:text-[#d2f381]"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          <div 
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: excerptHtml }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <hr className="border-muted group-hover:border-primary/20 transition-colors duration-200" />
          <div className="flex justify-between items-center text-xs">
            <span 
              className="px-2 py-1 bg-muted/50 rounded-full text-muted-foreground group-hover:bg-[#d2f381]/20 group-hover:text-[#d2f381] transition-colors duration-200"
              dangerouslySetInnerHTML={{ __html: categoryName }}
            />
            <p>{date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
