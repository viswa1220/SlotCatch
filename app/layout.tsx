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
  metadataBase: new URL("https://www.slotcatch.com"),

  title: {
    default: "SlotCatch | WhatsApp + SMS Automation for Auto Detailers",
    template: "%s | SlotCatch",
  },

  description:
    "SlotCatch helps auto detailers turn WhatsApp and SMS conversations into bookings, calendar appointments, reviews, repeat customers, and recovered schedule gaps.",

  keywords: [
    "SlotCatch",
    "auto detailing software",
    "auto detailer booking software",
    "detailing business automation",
    "WhatsApp booking automation",
    "SMS booking automation",
    "AI receptionist for auto detailers",
    "car detailing booking system",
    "detailing appointment scheduling",
    "review automation for detailers",
    "customer retention for detailers",
    "missed call recovery for detailers",
    "schedule gap recovery for detailers",
  ],

  authors: [{ name: "SlotCatch" }],
  creator: "SlotCatch",
  publisher: "SlotCatch",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.slotcatch.com/",
  },

  openGraph: {
    type: "website",
    url: "https://www.slotcatch.com/",
    siteName: "SlotCatch",
    title: "SlotCatch | Turn Chats Into Bookings, Reviews, and Repeat Customers",
    description:
      "WhatsApp + SMS automation for auto detailers. Automate booking, calendar scheduling, rescheduling, review collection, owner approvals, retention follow-ups, and schedule gap recovery.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SlotCatch WhatsApp and SMS automation for auto detailers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SlotCatch | WhatsApp + SMS Automation for Auto Detailers",
    description:
      "Turn WhatsApp and SMS conversations into bookings, reviews, repeat customers, and recovered calendar gaps.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SlotCatch",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Appointment Scheduling Software",
  operatingSystem: "Web",
  url: "https://www.slotcatch.com/",
  description:
    "WhatsApp and SMS automation software for auto detailers that helps with booking, calendar scheduling, rescheduling, review collection, retention follow-ups, and schedule gap recovery.",
  audience: {
    "@type": "Audience",
    audienceType: "Auto detailers and mobile detailing businesses",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
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