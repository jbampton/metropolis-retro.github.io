import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const events = [
  {
    name: "Thursday CBD Meetup",
    format: "Casual + Rated Practice",
    time: "Every Thursday, 6:30 PM",
    location: "Brisbane CBD",
    note: "Bring your set if you can. Clocks available for timed games.",
  },
  {
    name: "Saturday Rapid Arena",
    format: "Swiss Rapid",
    time: "Every Saturday, 2:00 PM",
    location: "Inner Brisbane",
    note: "Fast rounds with standings and short review sessions after play.",
  },
  {
    name: "Beginner Training Night",
    format: "Workshop + Games",
    time: "Wednesday, 6:00 PM",
    location: "South Brisbane",
    note: "Tactics, opening principles, and guided practical games.",
  },
  {
    name: "Metropolis Retro Open",
    format: "Classical Tournament",
    time: "Seasonal Event",
    location: "Brisbane",
    note: "Multiple divisions and club prizes for standout results.",
  },
]

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Events</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Weekly meetups and official chess events in Brisbane.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Our event calendar combines social chess nights, structured training, and competitive tournament formats.
              Join the session that matches your level and goals.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {events.map((event) => (
              <article key={event.name} className="rounded-3xl border border-border bg-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{event.format}</p>
                <h2 className="mt-3 text-2xl md:text-3xl tracking-tight">{event.name}</h2>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Time:</span> {event.time}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location:</span> {event.location}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{event.note}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}