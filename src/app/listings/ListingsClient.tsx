"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Listing = {
  title: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  gallery: string[];
  description: string;
};

const FILTERS = ["All", "For Sale", "For Lease", "For Rent"] as const;
type Filter = (typeof FILTERS)[number];

export default function ListingsClient({ listings }: { listings: Listing[] }) {
  const [active, setActive] = useState<Listing | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("All");

  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((l) => l.status.trim().toLowerCase() === filter.trim().toLowerCase());

  const openListing = (l: Listing) => {
    setActive(l);
    setImgIndex(0);
  };

  const galleryLen = active?.gallery.length ?? 0;
  const next = () => setImgIndex((i) => (galleryLen ? (i + 1) % galleryLen : 0));
  const prev = () => setImgIndex((i) => (galleryLen ? (i - 1 + galleryLen) % galleryLen : 0));

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-24 lg:px-12 lg:pb-20 lg:pt-32">
          <span className="eyebrow">The Collection</span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Residences, <em className="italic text-gold">considered</em>.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70">
            A small, edited selection of homes from our active portfolio. New listings are added
            quietly each month — request the private catalogue for the full register.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  filter === f
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground/70 hover:border-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {filteredListings.length === 0 ? (
            <p>No listings currently available{filter !== "All" ? ` for "${filter}"` : ""}.</p>
          ) : (
            filteredListings.map((property, index) => (
              <article
                key={property.title + index}
                className={`group cursor-pointer ${index % 2 === 1 ? "md:mt-24" : ""}`}
                onClick={() => openListing(property)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={property.img}
                    alt={property.title}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground">
                    {property.status}
                  </span>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl">{property.title}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    {property.price}
                  </span>
                </div>
                <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                  <MapPin className="h-3.5 w-3.5" /> {property.location}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                  <p className="text-sm text-foreground/70">
                    {property.beds} bed · {property.baths} bath · {property.sqft} sq ft
                  </p>
                  <Link
                    href="/contact"
                    onClick={(e) => e.stopPropagation()}
                    className="group/btn inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground hover:text-gold"
                  >
                    Enquire
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl border-border bg-background p-0">
          {active && (
            <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary md:aspect-auto">
                <img
                  src={active.gallery[imgIndex]}
                  alt={`${active.title} — image ${imgIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 hover:bg-gold hover:text-foreground"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 hover:bg-gold hover:text-foreground"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                  {imgIndex + 1} / {active.gallery.length}
                </span>
              </div>
              <div className="flex flex-col p-8 lg:p-10">
                <DialogHeader>
                  <span className="eyebrow text-gold">{active.status}</span>
                  <DialogTitle className="mt-4 font-display text-3xl leading-tight">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                    <MapPin className="h-3.5 w-3.5" /> {active.location}
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-6 text-sm leading-relaxed text-foreground/75">
                  {active.description}
                </p>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Beds
                    </dt>
                    <dd className="mt-1 font-display text-xl">{active.beds}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Baths
                    </dt>
                    <dd className="mt-1 font-display text-xl">{active.baths}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                      Sq Ft
                    </dt>
                    <dd className="mt-1 font-display text-xl">{active.sqft}</dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold">{active.price}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.gallery.map((g, gi) => (
                    <button
                      key={gi}
                      type="button"
                      onClick={() => setImgIndex(gi)}
                      className={`h-16 w-20 overflow-hidden border ${
                        gi === imgIndex ? "border-gold" : "border-border"
                      }`}
                      aria-label={`Image ${gi + 1}`}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-3 self-start bg-foreground px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold hover:text-foreground"
                >
                  Enquire about this residence <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
