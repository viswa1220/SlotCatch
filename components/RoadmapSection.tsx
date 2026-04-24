"use client";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";

type Item = {
  when: "Now" | "Next" | "Soon" | "Later";
  title: string;
  sub: string;
  icon: Parameters<typeof Icon>[0]["name"];
};

const ITEMS: Item[] = [
  {
    when: "Now",
    title: "WhatsApp Booking",
    sub: "The core: instant replies, accurate quotes, automatic bookings.",
    icon: "whatsapp",
  },
  {
    when: "Next",
    title: "Review Booster",
    sub: "After every booking, customers get a gentle nudge to leave a Google review.",
    icon: "spark",
  },
  {
    when: "Soon",
    title: "Ads & Lead Gen",
    sub: "Manage Google and Instagram campaigns — bring warm leads straight into WhatsApp.",
    icon: "zap",
  },
  {
    when: "Later",
    title: "Follow-up & Referrals",
    sub: "Win back quiet customers and turn happy ones into your best marketing channel.",
    icon: "bell",
  },
  {
    when: "Later",
    title: "Invoicing & Payments",
    sub: "Send a WhatsApp invoice with a pay link after every job. Stripe & PayPal built in.",
    icon: "dollar",
  },
  {
    when: "Later",
    title: "Inventory Tracking",
    sub: "Track product usage per job. Low-stock alerts. Smart reorder suggestions.",
    icon: "calendar",
  },
];

export default function RoadmapSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section id="roadmap" className="section roadmap-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head ${inView ? "in" : ""}`}>
          <div className="eyebrow">Where we&apos;re going</div>
          <h2>More than bookings. A full back office.</h2>
          <p className="section-sub">
            One platform, added piece by piece — each one earns its place before the next ships.
          </p>
        </div>
        <div className={`roadmap-grid ${inView ? "in" : ""}`}>
          {ITEMS.map((it, i) => (
            <div key={i} className="roadmap-item glass" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="roadmap-node"><Icon name={it.icon} size={18} /></div>
              <div className="roadmap-meta">
                <span className={`roadmap-when roadmap-when-${it.when.toLowerCase()}`}>{it.when}</span>
              </div>
              <div className="roadmap-title">{it.title}</div>
              <div className="roadmap-sub">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
