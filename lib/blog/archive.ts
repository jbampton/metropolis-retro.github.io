import type { Metadata } from "next"

import {
  blogCategories,
  blogPosts,
  blogTags,
  getBlogCategoryBySlug,
  getBlogPostsByCategory,
  getBlogPostsByTag,
  getBlogTagBySlug,
  slugifyBlogTaxonomy,
  type BlogPost,
} from "@/lib/content/blog-posts"
import { SITE_URL, pageKeywords } from "@/lib/seo"

export type BlogArchiveViewModel = {
  eyebrow: string
  title: string
  description: string
  posts: BlogPost[]
  activeCategory?: string
  activeTag?: string
}

export const blogIndexViewModel: BlogArchiveViewModel = {
  eyebrow: "Metropolis Retro Blog",
  title: "Strategy, training, and practical lessons from Brisbane club chess.",
  description: "Explore every article, then jump into dedicated category and tag archives for more focused reading paths.",
  posts: blogPosts,
}

export const blogIndexMetadata: Metadata = {
  title: "Blog",
  description:
    "Read Metropolis Retro blog posts on chess training, tournament preparation, openings, and practical improvement for club players.",
  keywords: pageKeywords(["chess blog", "Brisbane chess articles", "club training posts"]),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Metropolis Retro",
    description:
      "Read Metropolis Retro blog posts on chess training, tournament preparation, openings, and practical improvement for club players.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Metropolis Retro",
    description:
      "Read Metropolis Retro blog posts on chess training, tournament preparation, openings, and practical improvement for club players.",
  },
}

export function getBlogCategoryStaticParams() {
  return blogCategories.map((category) => ({
    slug: slugifyBlogTaxonomy(category),
  }))
}

export function getBlogTagStaticParams() {
  return blogTags.map((tag) => ({
    slug: slugifyBlogTaxonomy(tag),
  }))
}

export function getBlogCategoryArchiveBySlug(slug: string): BlogArchiveViewModel | null {
  const category = getBlogCategoryBySlug(slug)

  if (!category) {
    return null
  }

  return {
    eyebrow: "Blog Category",
    title: `${category} articles for club players`,
    description: `Browse every Metropolis Retro article filed under ${category}. These posts focus on practical lessons, sharper preparation, and stronger decision-making for Brisbane chess players.`,
    posts: getBlogPostsByCategory(category),
    activeCategory: category,
  }
}

export function getBlogTagArchiveBySlug(slug: string): BlogArchiveViewModel | null {
  const tag = getBlogTagBySlug(slug)

  if (!tag) {
    return null
  }

  return {
    eyebrow: "Blog Tag",
    title: `Posts tagged #${tag}`,
    description: `Browse every Metropolis Retro post tagged #${tag}. This archive groups focused ideas, lessons, and practical references around one recurring chess theme.`,
    posts: getBlogPostsByTag(tag),
    activeTag: tag,
  }
}

export function getBlogCategoryMetadata(slug: string): Metadata {
  const category = getBlogCategoryBySlug(slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested blog category could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = `Explore Metropolis Retro blog posts in the ${category} category for Brisbane club players and improving chess competitors.`

  return {
    title: `${category} Category | Blog`,
    description,
    keywords: pageKeywords([`${category} chess articles`, `${category} category`, category]),
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
    openGraph: {
      title: `${category} Articles | Metropolis Retro Blog`,
      description,
      url: `${SITE_URL}/blog/category/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Articles | Metropolis Retro Blog`,
      description,
    },
  }
}

export function getBlogTagMetadata(slug: string): Metadata {
  const tag = getBlogTagBySlug(slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested blog tag could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = `Read Metropolis Retro articles tagged ${tag}, covering practical chess improvement, preparation, and club event insights.`

  return {
    title: `#${tag} Tag | Blog`,
    description,
    keywords: pageKeywords([`${tag} chess tag`, `${tag} blog posts`, tag]),
    alternates: {
      canonical: `/blog/tag/${slug}`,
    },
    openGraph: {
      title: `#${tag} Articles | Metropolis Retro Blog`,
      description,
      url: `${SITE_URL}/blog/tag/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag} Articles | Metropolis Retro Blog`,
      description,
    },
  }
}
