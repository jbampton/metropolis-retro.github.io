import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const updates = [
  {
    title: "March meetup schedule confirmed",
    date: "Mar 20, 2026",
    excerpt: "All weekly meetup slots are confirmed, including beginner sessions and rapid arena nights.",
  },
  {
    title: "Pairing format improvements",
    date: "Mar 12, 2026",
    excerpt: "We refined pairing flow to reduce downtime and improve round transitions during busy nights.",
  },
  {
    title: "Beginner resources now available",
    date: "Mar 4, 2026",
    excerpt: "New members can access opening basics, tactical themes, and endgame starter guides.",
  },
  {
    title: "Seasonal open registration window",
    date: "Feb 24, 2026",
    excerpt: "Registration is now open for the upcoming Metropolis Retro Open in Brisbane.",
  },
]

export default function UpdatesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Latest Updates</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Club news, announcements, and event changes.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Follow this page for schedule updates, tournament announcements, and club operations changes.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {updates.map((update) => (
              <article key={update.title} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{update.date}</p>
                <h2 className="mt-3 text-2xl md:text-3xl tracking-tight">{update.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{update.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}