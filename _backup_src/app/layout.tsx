import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollProvider } from "@/components/ScrollProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://gearifypro.com"),
  title: {
    default: "Gearify Pro — Custom Sportswear Built to Perform",
    template: "%s — Gearify Pro",
  },
  description:
    "Gearify Pro is a performance sportswear studio building custom team uniforms, jerseys, and athletic apparel for teams that play to win. Built to perform. Designed for your team.",
  keywords: [
    "custom team uniforms",
    "custom jerseys",
    "sportswear",
    "soccer",
    "cricket",
    "basketball",
    "baseball",
    "ice hockey",
    "team apparel",
  ],
  openGraph: {
    title: "Gearify Pro — Custom Sportswear Built to Perform",
    description:
      "Built to perform. Designed for your team. Premium custom teamwear with real performance DNA.",
    type: "website",
    siteName: "Gearify Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gearify Pro",
    description: "Built to perform. Designed for your team.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body
        cz-shortcut-listen="true"
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-clip bg-ink-950 font-sans text-ink-100"
      >
        <ScrollProvider>
          <AnnouncementBar />
          <div className="h-px bg-white/10" />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
