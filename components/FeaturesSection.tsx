"use client";
import Icon, { IconName } from "./Icon";
import { useInView } from "@/lib/hooks";

type RoadmapItem = {
  icon: IconName;
  status: "NOW" | "NEXT" | "SOON" | "LATER";
  title: string;
  description: string;
};

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    icon: "whatsapp",
    status: "NOW",
    title: "WhatsApp + SMS booking",
    description: "Live: instant replies, smart quoting, calendar scheduling, rescheduling.",
  },
  {
    icon: "spark",
    status: "NOW",
    title: "Reviews & retention",
    description: "Live: review collection, owner approval, website widget, 30-day follow-ups.",
  },
  {
    icon: "bell",
    status: "NOW",
    title: "Owner command center",
    description: "Live: instant alerts, daily/weekly reports, schedule gap detection.",
  },
  {
    icon: "globe",
    status: "NOW",
    title: "Multi-business support",
    description: "Live: run multiple detailing shops from one system, each routed to its own number and owner.",
  },
  {
    icon: "check",
    status: "NOW",
    title: "Owner web dashboard",
    description: "Live: schedule, revenue charts, schedule-gap detection, and review approvals from any browser.",
  },
  {
    icon: "zap",
    status: "LATER",
    title: "Inventory-aware alerts",
    description: "Example: Ceramic coating is low — suggest a ceramic appointment tomorrow.",
  },
  {
    icon: "check",
    status: "LATER",
    title: "Google reviews & analytics",
    description: "Direct Google review link flow plus deeper analytics on review performance.",
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  
  return (
    <section id="features" className="section features-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head center ${inView ? "in" : ""}`}>
          <div className="eyebrow">Roadmap</div>
          <h2>Built for detailers. Growing every month.</h2>
          <p className="section-sub">
            What's live today, and what's coming next — each piece earns its place before the next ships.
          </p>
        </div>
        <div className={`roadmap-features-grid ${inView ? "in" : ""}`}>
          {ROADMAP_ITEMS.map((item, i) => (
            <div 
              key={i} 
              className="roadmap-feature-card glass"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="roadmap-feature-icon">
                <Icon name={item.icon} size={20} />
              </div>
              <div className={`roadmap-feature-badge roadmap-badge-${item.status.toLowerCase()}`}>
                {item.status}
              </div>
              <div className="roadmap-feature-title">{item.title}</div>
              <div className="roadmap-feature-desc">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}