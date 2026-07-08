"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

function Field({
  label,
  name,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-base focus:border-gold focus:outline-none focus:ring-0"
      />
    </div>
  );
}

const INTEREST_OPTIONS: Record<"landlord" | "tenant", string[]> = {
  landlord: ["Property management", "24-hour home services"],
  tenant: ["Renting a home", "Leasing a home"],
};

export default function ContactPage() {
  const [role, setRole] = useState<"landlord" | "tenant" | "">("");

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-24 lg:px-12 lg:pb-36 lg:pt-32">
      <div className="grid gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
        <div>
          <span className="eyebrow">INFO</span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            Tell us what you need.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75">
            A viewing, a management proposal, or a plumber tonight — we'll answer in person within
            twenty-four hours.
          </p>

          <ul className="mt-12 space-y-6">
            <li className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                  Marcin Homes Phone number
                </p>
                <p className="font-display text-2xl">+254 768 742 756</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">Email</p>
                <p className="font-display text-2xl">info@marcinhomes.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">Office</p>
                <p className="font-display text-2xl">Garden Estate Off Thika Road, Nyati Drive</p>
                <p className="text-sm text-foreground/70">Nairobi</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          className="border border-border bg-card p-8 lg:p-12"
          onSubmit={async (event) => {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (res.ok) {
              alert("Message sent. Check your phone.");
              form.reset();
              setRole("");
            } else {
              alert("Something broke. Try again.");
            }
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First name" name="first" />
            <Field label="Last name" name="last" />
            <Field label="Email" name="email" type="email" className="sm:col-span-2" />
            <Field label="Phone" name="phone" type="tel" className="sm:col-span-2" />

            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                I am a
              </label>
              <select
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value as "landlord" | "tenant")}
                className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-base focus:border-gold focus:outline-none focus:ring-0"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                Interest
              </label>
              <select
                key={role}
                name="interest"
                required
                disabled={!role}
                defaultValue=""
                className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-base focus:border-gold focus:outline-none focus:ring-0 disabled:opacity-40"
              >
                <option value="" disabled>
                  {role ? "Select an interest" : "Select 'I am a' first"}
                </option>
                {role &&
                  INTEREST_OPTIONS[role].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent py-3 text-base focus:border-gold focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-gold hover:text-foreground"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}
