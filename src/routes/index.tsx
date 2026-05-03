import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-headphones.jpg";
import comfortImg from "@/assets/feature-comfort.jpg";
import soundImg from "@/assets/feature-sound.jpg";
import batteryImg from "@/assets/feature-battery.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aura Pro — Wireless Headphones Built for Your Ears" },
      {
        name: "description",
        content:
          "Discover Aura Pro: studio-grade sound, all-day comfort, and 40-hour battery life. Premium wireless headphones for music lovers.",
      },
    ],
  }),
});

const benefits = [
  {
    title: "Studio-Grade Sound",
    description:
      "Tuned by Grammy-winning engineers, Aura Pro delivers crisp highs, warm mids, and deep bass that bring every note to life.",
    image: soundImg,
  },
  {
    title: "All-Day Comfort",
    description:
      "Memory foam cushions wrapped in soft protein leather feel weightless — even after eight hours of listening.",
    image: comfortImg,
  },
  {
    title: "40-Hour Battery",
    description:
      "Charge once, listen all week. A quick 10-minute top-up gives you another 5 hours of uninterrupted music.",
    image: batteryImg,
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-foreground/15 bg-background/40 px-4 py-1 text-xs font-medium tracking-wide uppercase backdrop-blur">
              New · Aura Pro
            </span>
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Sound that moves you. Comfort that stays.
            </h1>
            <p className="text-lg text-foreground/75 md:text-xl">
              Premium wireless headphones designed for music lovers who refuse
              to compromise — on sound, comfort, or style.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="rounded-full px-8">
                Shop Now — $299
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-background/40 px-8 backdrop-blur"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Aura Pro wireless headphones floating on pastel background"
              width={1280}
              height={1024}
              className="w-full rounded-3xl"
              style={{ boxShadow: "var(--shadow-glow)" }}
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Engineered for the way you listen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three things we obsessed over so you can simply press play.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {benefits.map((b) => (
            <article
              key={b.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-transform hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  width={896}
                  height={896}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-6">
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-6 pb-24">
        <div
          className="rounded-3xl px-8 py-16 text-center text-primary-foreground md:px-16"
          style={{
            background: "var(--gradient-accent)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to hear the difference?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base opacity-90">
            Free shipping, 30-day returns, and a 2-year warranty on every pair.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 rounded-full px-8"
          >
            Order Aura Pro
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Aura Audio · Class Assignment Demo
      </footer>
    </main>
  );
}
