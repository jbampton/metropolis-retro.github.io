import type { MetadataRoute } from "next"
import { blogCategories, blogPosts, blogTags, slugifyBlogTaxonomy } from "@/lib/content/blog-posts"
import { events } from "@/lib/content/events"
import { updates } from "@/lib/content/updates"
import { SITE_URL } from "@/lib/seo"

const siteUrl = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/events",
    "/updates",
    "/contact",
    "/membership",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }))

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const updateRoutes = updates.map((update) => ({
    url: `${siteUrl}/updates/${update.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }))

  const blogCategoryRoutes = blogCategories.map((category) => ({
    url: `${siteUrl}/blog/category/${slugifyBlogTaxonomy(category)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.66,
  }))

  const blogTagRoutes = blogTags.map((tag) => ({
    url: `${siteUrl}/blog/tag/${slugifyBlogTaxonomy(tag)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.62,
  }))

  return [...staticRoutes, ...eventRoutes, ...updateRoutes, ...blogRoutes, ...blogCategoryRoutes, ...blogTagRoutes]
}
