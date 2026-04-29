"use client";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";

type Feature = {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: "bell",
    title: "Instant booking alerts",
    description: "Every booking lands on your phone the second it confirms.",
  },
  {
    icon: "zap",
    title: "Today, tomorrow & weekly reports",
    description: "A clear view of what's booked, what's open, and what's coming.",
  },
  {
    icon: "clock",
    title: "Schedule gap detection",
    description: "Spots open windows on your calendar before they go to waste.",
  },
  {
    icon: "spark",
    title: "Warm lead outreach",
    description: "Suggests recent inquiries that didn't book — ready to send with one reply.",
  },
  {
    icon: "check",
    title: "Pending action inbox",
    description: "A short list of things only you can decide — reviews, outreach, exceptions.",
  },
  {
    icon: "star",
    title: "Review approval by chat",
    description: "Approve or reject reviews from WhatsApp or SMS — no dashboard required.",
  },
];

export default function GapsSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="gaps" className="section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head ${inView ? "in" : ""}`}>
          <div className="eyebrow">SCHEDULE GAP RECOVERY</div>
          <h2>Empty calendar gaps become revenue opportunities.</h2>
          <p className="section-sub">
            SlotCatch helps owners spot open schedule gaps, identify which service fits the available time, and re-engage warm leads before the slot is wasted.
          </p>
        </div>

        <div className={`gaps-grid ${inView ? "in" : ""}`}>
          {/* Main alert card */}
          <div className="gap-alert-card glass">
            <div className="gap-alert-header">
              <div className="gap-alert-icon">
                <Icon name="bell" size={18} />
              </div>
              <div className="gap-alert-meta">
                <div className="gap-alert-title">SlotCatch · Owner alert</div>
                <div className="gap-alert-time">9:14 AM</div>
              </div>
            </div>
            <div className="gap-alert-body">
              <div className="gap-alert-item">
                <span className="gap-emoji">📅</span>
                <span>Tomorrow has a <strong>2-hour gap</strong> at <strong>1:00 PM</strong>.</span>
              </div>
              <div className="gap-alert-item">
                <span className="gap-emoji">✨</span>
                <span>Best fit: <strong>Full Interior Detail</strong>.</span>
              </div>
              <div className="gap-alert-item">
                <span className="gap-emoji">🔥</span>
                <span>Warm leads available: <strong>3</strong>.</span>
              </div>
              <div className="gap-alert-action">
                <button className="gap-reply-btn">
                  Reply <span className="gap-reply-badge">SEND 1</span> to reach out.
                </button>
              </div>
            </div>
          </div>

          {/* Feature cards grid */}
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="gap-feature-card glass"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="gap-feature-icon">
                <Icon name={feature.icon} size={20} />
              </div>
              <div className="gap-feature-title">{feature.title}</div>
              <div className="gap-feature-desc">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}