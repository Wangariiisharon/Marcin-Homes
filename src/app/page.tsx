import Link from "next/link";
import { ArrowUpRight, Clock, Key, Sparkles } from "lucide-react";

const heroHome = "/assets/northands.jpg";
const listing1 = "/assets/listing-1.jpg";
const listing2 = "/assets/listing-2.jpg";
const listing3 = "/assets/listing-3.jpg";
const propertyManagement = "/assets/property-management.jpg";

const featured = [
  {
    img: listing1,
    title: "Villa Aurelia",
    location: "Hillside · Los Angeles",
    price: "$12,400,000",
    beds: 6,
    baths: 7,
    sqft: "9,200",
  },
  {
    img: listing2,
    title: "Skyline Penthouse 47B",
    location: "Tribeca · New York",
    price: "$8,950,000",
    beds: 4,
    baths: 5,
    sqft: "5,800",
  },
  {
    img: listing3,
    title: "Casa del Mar",
    location: "Coast · Mallorca",
    price: "€6,200,000",
    beds: 5,
    baths: 6,
    sqft: "7,400",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-gold">{value}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-foreground/60">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate">
        <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
          <img
            src={heroHome}
            alt="Modern oceanside villa at sunset"
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/85" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 text-background lg:px-12 lg:pb-28">
            <span className="eyebrow text-gold">Est. 2014 · Property & Estate Services</span>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-[5.5rem]">
              Homes worth <em className="italic text-gold">returning</em> to.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-background/80">
              A modern real estate house pairing carefully curated listings with full-service
              property care and on-demand home services — every request answered within twenty-four
              hours.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/listings"
                className="group inline-flex items-center gap-3 bg-gold px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-gold-soft"
              >
                View Listings
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border border-background/40 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-background hover:text-foreground"
              >
                24-Hour Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <span className="eyebrow">A Quiet Standard</span>
            <div className="mt-6 h-px w-12 bg-gold" />
          </div>
          <div>
            <h2 className="font-display text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
              We believe a home is more than an address — it is a daily ritual. Marcin Homes was
              founded to honour that ritual, from the first viewing to the late-night call for a
              plumber.
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <Stat value="240+" label="Homes placed" />
              <Stat value="24 hrs" label="Service response" />
              <Stat value="11" label="Years in practice" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-28 text-background lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Selected · 2026</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Featured residences</h2>
            </div>
            <Link
              href="/listings"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-gold"
            >
              All Listings
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article key={p.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">{p.price}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-background/60">
                  {p.location}
                </p>
                <p className="mt-4 text-sm text-background/70">
                  {p.beds} bed · {p.baths} bath · {p.sqft} sq ft
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[5/6] overflow-hidden">
            <img
              src={propertyManagement}
              alt="A pair of brass keys being handed over a marble counter"
              width={1600}
              height={1100}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">Property Management</span>
            <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
              Quiet stewardship of every detail.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/75">
              From tenant placement and rent collection to inspections, vendor coordination, and
              quarterly reporting — we manage the unseen work that keeps a property in its finest
              condition.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                {
                  icon: Key,
                  t: "Tenant placement",
                  d: "Vetted residents, leases prepared, keys handed over.",
                },
                {
                  icon: Sparkles,
                  t: "Routine care",
                  d: "Inspections, maintenance, gardens and pools — quietly handled.",
                },
                {
                  icon: Clock,
                  t: "Owner reporting",
                  d: "Transparent monthly statements and a single concierge contact.",
                },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-5 border-t border-border pt-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-display text-xl">{t}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/property-management"
              className="mt-10 inline-flex items-center gap-3 border border-foreground px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background"
            >
              Explore Management
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <div>
              <span className="eyebrow">24-Hour Services</span>
              <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
                A single call, answered within a day.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/75">
                Marcin Homes keeps a vetted bench of tradespeople and household staff. Request a
                plumber tonight, a nanny for Saturday, a painter next week — confirmed within
                twenty-four hours.
              </p>
              <Link
                href="/services"
                className="mt-10 inline-flex items-center gap-3 bg-foreground px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold hover:text-foreground"
              >
                See All Services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {["Plumbers", "Electricians", "Home Cleaners", "Nanny Services"].map((item) => (
                <li
                  key={item}
                  className="bg-background px-8 py-10 text-center text-sm uppercase tracking-[0.2em] text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
