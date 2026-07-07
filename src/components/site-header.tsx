"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/property-management", label: "Property Management" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-tight">Marcin</span>
          <span className="font-display text-2xl italic text-gold">Homes</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${
                isActive(item.href) ? "text-gold" : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-none border border-foreground px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background lg:inline-block"
        >
          Book a Viewing
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-border/40 py-3 text-sm tracking-wide ${
                  isActive(item.href) ? "text-gold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block border border-foreground px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.2em]"
            >
              Book a Viewing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
