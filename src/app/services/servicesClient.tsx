"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Baby,
  Brush,
  Clock,
  Droplet,
  Leaf,
  LucideIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const servicesHero = "/assets/services-hero.jpg";

const iconMap: Record<string, LucideIcon> = {
  droplet: Droplet,
  zap: Zap,
  sparkles: Sparkles,
  baby: Baby,
  leaf: Leaf,
  brush: Brush,
};

type Service = {
  title?: string;
  blurb?: string;
  icon?: string;
  items?: string[];
};

export default function ServicesClient({ services }: { services: Service[] }) {
  const [openService, setOpenService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire this up to your actual submission endpoint (API route, Sanity mutation, etc.)
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative isolate">
        <div className="relative h-[64vh] min-h-[500px] w-full overflow-hidden">
          <img
            src={servicesHero}
            alt="Modern kitchen with brass fixtures"
            width={1920}
            height={1100}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-24 text-background lg:px-12 lg:pb-20">
            <span className="eyebrow text-gold">Estate Services</span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Confirmed in <em className="italic text-gold">24 hours</em>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/80">
              Six in-house service lines, run by people we know. Place a request and a member of our
              concierge will confirm a vetted professional within a day.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl sm:text-5xl">The bench</h2>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/60">
            <Clock className="h-4 w-4 text-gold" /> 24-hour confirmation, every service
          </span>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon ?? ""] ?? Sparkles; // fallback icon if unset
            const title = service.title ?? "";
            const blurb = service.blurb ?? "";
            const items = service.items ?? [];

            return (
              <article
                key={title || index}
                className="flex flex-col gap-6 bg-background p-10 lg:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <Icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-5 font-display text-3xl">{title}</h3>
                  </div>
                  <span className="rounded-full border border-gold px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                    24 hr
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/75">{blurb}</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-foreground/70">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-gold" /> {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setOpenService(title);
                    setSubmitted(false);
                  }}
                  className="mt-2 inline-flex items-center gap-3 self-start border border-foreground px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background"
                >
                  Request {title.split(" ")[0]} <ArrowUpRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2 className="font-display text-4xl sm:text-5xl">How a request works</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Request",
                d: "Tell us what you need — by form, phone, or a note to your concierge.",
              },
              {
                n: "02",
                t: "Match",
                d: "We pair you with a vetted professional from our standing bench.",
              },
              {
                n: "03",
                t: "Confirm",
                d: "Day, time, and quote confirmed in writing within 24 hours.",
              },
              {
                n: "04",
                t: "Arrive",
                d: "Our partner arrives on schedule. We follow up afterwards.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-foreground pt-6">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{step.n}</span>
                <h3 className="mt-3 font-display text-2xl">{step.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Dialog open={!!openService} onOpenChange={(o) => !o && setOpenService(null)}>
        <DialogContent className="max-w-lg border-border bg-background">
          <DialogHeader>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold">
              24-hour request
            </span>
            <DialogTitle className="font-display text-3xl">Request a professional</DialogTitle>
            <DialogDescription className="text-sm text-foreground/70">
              Share a few details and our team will confirm within an hour.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center">
              <p className="font-display text-2xl">Request received.</p>
              <p className="mt-2 text-sm text-foreground/70">
                You will receive a callback in an hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <ServiceField label="Full Name" name="name" type="text" required />
              <ServiceField label="Address" name="address" type="text" required />
              <div>
                <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                  Service
                </label>
                <input
                  type="text"
                  name="service"
                  value={openService ?? ""}
                  readOnly
                  className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-base text-gold focus:outline-none"
                />
              </div>
              <ServiceField label="Phone No." name="phone" type="tel" required />
              <DialogFooter>
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-foreground px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold hover:text-foreground"
                >
                  Submit Request
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ServiceField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={200}
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-base focus:border-gold focus:outline-none focus:ring-0"
      />
    </div>
  );
}
