import Link from "next/link";
import type { ReactNode } from "react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl">Marcin</span>
              <span className="font-display text-3xl italic text-gold">Homes</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
              A modern real estate house — curated homes, attentive property care, and on-demand
              services that arrive within twenty-four hours.
            </p>
          </div>

          <FooterCol
            title="Explore"
            links={[
              { href: "/listings", label: "Listings" },
              { href: "/property-management", label: "Property Management" },
              { href: "/services", label: "Home Services" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              { href: "/services", label: "Plumbing" },
              { href: "/services", label: "Electrical" },
              { href: "/services", label: "Cleaning" },
              { href: "/services", label: "Nanny" },
              { href: "/services", label: "Gardening" },
              { href: "/services", label: "Painting" },
            ]}
          />
          <FooterCol
            title="Office"
            links={[
              { href: "/contact", label: "Contact" },
              { href: "/contact", label: "Book a Viewing" },
            ]}
            extra={
              <p className="mt-4 text-xs leading-relaxed text-background/60">
                Mon — Sat · 09:00 – 19:00
                <br />
                concierge@marcinhomes.co
              </p>
            }
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Marcin Homes. All rights reserved.</span>
          <span className="tracking-[0.3em] uppercase">Black · Gold · Bone</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  extra,
}: {
  title: string;
  links: { href: string; label: string }[];
  extra?: ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-background/80">
        {links.map((link, index) => (
          <li key={`${link.href}-${index}`}>
            <Link href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  );
}
