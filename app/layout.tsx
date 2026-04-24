import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slotcatch.ai"),
  title: "SlotCatch.ai — AI WhatsApp Booking Agent for Service Businesses",
  description:
    "SlotCatch.ai is an AI receptionist that replies on WhatsApp, quotes pricing, and books appointments 24/7 for car detailers, cleaners, HVAC, lawn care, and dental practices.",
  keywords: [
    "SlotCatch",
    "SlotCatch.ai",
    "AI receptionist",
    "WhatsApp booking agent",
    "AI booking",
    "service business automation",
    "car detailing AI",
    "cleaning booking",
    "HVAC booking",
    "dental booking",
  ],
  authors: [{ name: "SlotCatch.ai" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://slotcatch.ai/" },
  openGraph: {
    type: "website",
    url: "https://slotcatch.ai/",
    siteName: "SlotCatch.ai",
    title: "SlotCatch.ai — AI WhatsApp Booking Agent",
    description:
      "Your AI receptionist on WhatsApp. Replies instantly. Quotes accurately. Books automatically.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SlotCatch.ai — AI WhatsApp Booking Agent",
    description:
      "Your AI receptionist on WhatsApp. 24/7 bookings for service businesses.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SlotCatch.ai",
  applicationCategory: "BusinessApplication",
  description: "AI WhatsApp booking agent for service businesses",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "99", priceCurrency: "USD" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
