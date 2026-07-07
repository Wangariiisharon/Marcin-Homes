import type { Metadata } from "next";
import "../styles.css";
import { AppLayout } from "./appLayout";

export const metadata: Metadata = {
  title: "Marcin Homes — Real Estate & Estate Services",
  description:
    "A modern real estate house pairing curated listings, property management, and on-demand 24-hour home services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
