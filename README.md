# DLT Cafe - The Cooperative Venture Studio

> Domain of Limitless Talent - A Venture Capital x Venture Studio reimagined with a fresh dose of creative and collective intelligence.

![DLT Cafe Website](https://dltcafe.com/og-image.jpg)

## Overview

DLT Cafe is built with modern web technologies to deliver a seamless and performant experience. Our tech stack includes:

- [Next.js 15](https://nextjs.org/docs)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [WordPress (Headless CMS)](https://wordpress.org)

### Features

✅ Headless WordPress integration with Next.js<br>
✅ Type-safe data layer with WordPress REST API<br>
✅ Dynamic blog with featured posts slider<br>
✅ Advanced content filtering and search<br>
✅ Modern, responsive design system<br>
✅ Dynamic metadata and SEO optimization<br>
✅ Light/Dark mode support<br>
✅ Performance optimized with proper caching<br>

## Technical Documentation

### WordPress Integration

The site uses WordPress as a headless CMS, with all content being served through the WordPress REST API. Key features include:

- Type-safe data fetching
- Efficient caching and revalidation
- Support for posts, pages, authors, categories, and tags
- Custom post types and ACF integration
- Dynamic routing for all content types

### Core Components

1. **Blog System**
   - Featured posts slider
   - Category and tag filtering
   - Author pages
   - Table of contents
   - Reading progress indicator
   - Drop cap styling for articles

2. **Design System**
   - Consistent typography with Hanken Grotesk
   - Custom color scheme featuring lime accents
   - Responsive layout components
   - Dark mode support

3. **Performance**
   - Image optimization
   - Intelligent caching
   - Dynamic imports
   - SEO optimization

### Environment Setup

Required environment variables:

```bash
WORDPRESS_URL="https://wp.dltcafe.com"
WORDPRESS_HOSTNAME="wp.dltcafe.com"
WORDPRESS_WEBHOOK_SECRET="your-secret-key"
```

### API Functions

The `lib/wordpress.ts` file contains all necessary functions for interacting with the WordPress REST API:

```typescript
// Example usage
const posts = await getAllPosts({
  category: "featured",
  tag: "trending",
});
```

### Content Types

All WordPress content types are properly typed:

```typescript
interface Post extends WPEntity {
  title: RenderedContent;
  content: RenderedContent;
  excerpt: RenderedContent;
  // ... other properties
}
```

### Search Implementation

The blog includes a powerful search system:

- Real-time search with debouncing
- Filter combinations
- URL-based state management
- Server-side rendering support

### Revalidation

Content updates are handled through:

1. Webhook-based revalidation
2. Cache tag system
3. On-demand revalidation API

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy

## Credits

Built for DLT Cafe - The Cooperative Venture Studio. Original template by [9d8](https://9d8.dev), customized and enhanced for DLT Cafe's specific needs.
