import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  FileText,
  Key,
  Sparkles,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { getPropertyManagementPage } from "@/sanity/lib/queries";

const propertyManagement = "/assets/property-management.jpg";

const fallbackPillars = [
  {
    icon: Key,
    title: "Tenant Placement",
    description:
      "Marketing, viewings, background and credit checks, lease preparation, and key handover.",
  },
  {
    icon: Sparkles,
    title: "Maintenance & Inspections",
    description:
      "Quarterly inspections, preventive care, and coordination with our 24-hour service bench.",
  },
  {
    icon: Wallet,
    title: "Rent & Reconciliation",
    description: "Rent collection, deposits, statements, and timely owner disbursements.",
  },
  {
    icon: FileText,
    title: "Reporting",
    description: "Monthly performance reports with images, vendor receipts, and full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    description:
      "Local regulations, safety certifications, insurance liaison, and dispute resolution.",
  },
  {
    icon: ClipboardList,
    title: "Owner Concierge",
    description: "One named point of contact, fluent in your asset and its quirks.",
  },
];

const fallbackSteps = [
  {
    n: "01",
    title: "Walkthrough",
    description: "A private visit and conversation about your goals for the property.",
  },
  {
    n: "02",
    title: "Proposal",
    description: "A tailored scope, transparent fees, and a service-level agreement.",
  },
  {
    n: "03",
    title: "Onboarding",
    description: "Inventory, photography, marketing, and tenant placement if required.",
  },
  {
    n: "04",
    title: "Stewardship",
    description: "Ongoing care, reporting, and a single concierge contact for life.",
  },
];

export default async function PropertyManagementPage() {
  const pageData = (await getPropertyManagementPage()) ?? null;
  const pillars = pageData?.pillars?.length
    ? pageData.pillars.map((pillar, index) => ({
        icon: fallbackPillars[index % fallbackPillars.length].icon,
        title: pillar.title ?? fallbackPillars[index % fallbackPillars.length].title,
        description:
          pillar.description ?? fallbackPillars[index % fallbackPillars.length].description,
      }))
    : fallbackPillars;
  const steps = pageData?.steps?.length
    ? pageData.steps.map((step, index) => ({
        n: String(index + 1).padStart(2, "0"),
        title: step.title ?? fallbackSteps[index % fallbackSteps.length].title,
        description: step.description ?? fallbackSteps[index % fallbackSteps.length].description,
      }))
    : fallbackSteps;

  return (
    <>
      <section className="relative isolate">
        <div className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
          <img
            src={propertyManagement}
            alt="Handover of brass keys on marble"
            width={1600}
            height={1100}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/75" />
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-24 text-background lg:px-12 lg:pb-20">
            <span className="eyebrow text-gold">Property Management</span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              {pageData?.headline ?? "Your home, in good hands."}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <span className="eyebrow">Our Promise</span>
            <div className="mt-6 h-px w-12 bg-gold" />
          </div>
          <div>
            <p className="font-display text-3xl leading-[1.2] sm:text-4xl">
              {pageData?.intro ??
                "Owning a fine property should feel quiet. We absorb the operational weight — tenants, trades, paperwork — and return your time, with the asset in better condition than when we received it."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl sm:text-5xl">Scope of care</h2>
            <span className="hidden text-[11px] uppercase tracking-[0.25em] text-foreground/50 sm:block">
              Six pillars
            </span>
          </div>
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-5 bg-background p-10">
                <Icon className="h-6 w-6 text-gold" />
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <h2 className="font-display text-4xl sm:text-5xl">How we work</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="border-t border-foreground pt-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{step.n}</span>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-12">
          <h2 className="max-w-2xl font-display text-3xl leading-[1.15] sm:text-4xl">
            Considering a change in management? We'd be pleased to walk your property.
          </h2>
          <Link
            href={pageData?.ctaHref ?? "/contact"}
            className="inline-flex items-center gap-3 bg-gold px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-gold-soft"
          >
            {pageData?.ctaLabel ?? "Request a walkthrough"} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
