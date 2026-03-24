import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getUpdateBySlug } from "@/lib/content/updates"

type UpdateDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

  if (!update) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Update</p>
            <h1 className="text-4xl md:text-6xl tracking-tight max-w-4xl">{update.title}</h1>
            <p className="mt-5 text-sm text-muted-foreground">
              {update.date} • {update.readTime}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-secondary">
              <Image src={update.image} alt={update.title} fill className="object-cover" />
            </div>
            <article className="rounded-3xl border border-border bg-card p-6 md:p-10">
              <p className="text-lg leading-relaxed text-muted-foreground">{update.content}</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}