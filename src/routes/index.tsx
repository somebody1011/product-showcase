import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-sweater.jpg";
import softImg from "@/assets/sweater-soft.jpg";
import warmImg from "@/assets/sweater-warm.jpg";
import timelessImg from "@/assets/sweater-timeless.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "My Old Sweater — The Comfort You've Been Missing" },
      {
        name: "description",
        content:
          "A heirloom-quality knit sweater that feels like a hug. Soft merino wool, timeless cut, and built to outlast trends.",
      },
    ],
  }),
});

const benefits = [
  {
    title: "Impossibly Soft",
    description:
      "Spun from fine merino wool, every stitch feels gentle on your skin — no itch, no fuss, just comfort.",
    image: softImg,
  },
  {
    title: "Cozy In Every Season",
    description:
      "Breathable yet warm. Throw it on with coffee in the morning or layered under a coat at night.",
    image: warmImg,
  },
  {
    title: "Timeless, Not Trendy",
    description:
      "A classic ribbed silhouette that ages beautifully — the kind of piece you'll keep reaching for in ten years.",
    image: timelessImg,
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
            <span className="inline-block rounded-full border border-foreground/15 bg-background/50 px-4 py-1 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur">
              The Heirloom Knit
            </span>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              My Old Sweater.
              <br />
              <span className="italic text-foreground/70">Brand new.</span>
            </h1>
            <p className="text-lg text-foreground/75 md:text-xl">
              The kind of sweater that feels like it's already yours — soft,
              warm, and made to last a lifetime of Sundays.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="rounded-full px-8">
                Shop the Sweater — $89
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-background/40 px-8 backdrop-blur"
              >
                Our Story
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Cream cable knit sweater folded on linen"
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
          <h2 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            Why you'll never take it off
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three things we obsessed over so it feels like a favorite from day one.
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
                <h3 className="font-serif text-xl font-semibold">{b.title}</h3>
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
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Wrap up in something timeless.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base opacity-90">
            Free shipping, easy returns, and a lifetime mending guarantee on every knit.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 rounded-full px-8"
          >
            Make It Yours
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 My Old Sweater · Class Assignment Demo
      </footer>
    </main>
  );
}
