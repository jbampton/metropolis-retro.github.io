import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { blogCategories, blogTags, slugifyBlogTaxonomy, type BlogPost } from "@/lib/content/blog-posts"

type BlogArchiveProps = {
  eyebrow: string
  title: string
  description: string
  posts: BlogPost[]
  activeCategory?: string
  activeTag?: string
}

export function BlogArchive({
  eyebrow,
  title,
  description,
  posts,
  activeCategory,
  activeTag,
}: BlogArchiveProps) {
  return (
    <main className="pt-24 md:pt-32">
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(32,62,236,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="mb-6 text-sm uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl tracking-tight md:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="border-b border-border py-10 md:py-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12">
          <div>
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Categories</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  !activeCategory ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-secondary"
                }`}
              >
                All categories
              </Link>
              {blogCategories.map((category) => {
                const href = `/blog/category/${slugifyBlogTaxonomy(category)}`
                const isActive = activeCategory === category

                return (
                  <Link
                    key={category}
                    href={href}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Tags</p>
            <div className="flex flex-wrap gap-2">
              {blogTags.map((tag) => {
                const href = `/blog/tag/${slugifyBlogTaxonomy(tag)}`
                const isActive = activeTag === tag

                return (
                  <Link
                    key={tag}
                    href={href}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-[#203eec] bg-[#203eec]/10 text-[#203eec]"
                        : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    #{tag}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-secondary/25 px-6 py-12 text-center">
              <p className="text-lg font-medium">No posts found in this archive.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try another category or tag to discover more articles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg md:p-8"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/blog/category/${slugifyBlogTaxonomy(post.category)}`}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-colors hover:bg-secondary/70"
                    >
                      {post.category}
                    </Link>
                    {post.tags.slice(0, 2).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${slugifyBlogTaxonomy(tag)}`}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <h2 className="mt-5 text-2xl tracking-tight md:text-3xl">{post.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm"
                    style={{ color: "#203eec" }}
                  >
                    Read article
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
