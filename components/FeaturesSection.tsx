"use client";
import Icon, { IconName } from "./Icon";
import { useInView } from "@/lib/hooks";

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const features: { icon: IconName; title: string; sub: string }[] = [
    { icon: "clock", title: "24/7 Instant Replies", sub: "Never miss a lead again — even at 3 AM on a holiday weekend." },
    { icon: "dollar", title: "Accurate Pricing Engine", sub: "Quotes exact prices based on vehicle type and service complexity." },
    { icon: "calendar", title: "Calendar Integration", sub: "Checks real availability and creates calendar events automatically." },
    { icon: "bell", title: "Owner Notifications", sub: "Get a push alert for every new booking, right on your phone." },
    { icon: "phone", title: "Your Existing Number", sub: "Works with your current WhatsApp Business number. No migration." },
    { icon: "globe", title: "Multi-Language", sub: "Serve customers in any language. Coming soon — EN / ES / FR ready." },
  ];
  return (
    <section id="features" className="section features-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head ${inView ? "in" : ""}`}>
          <div className="eyebrow">Built for service businesses</div>
          <h2>Everything your business needs.</h2>
        </div>
        <div className={`features-grid ${inView ? "in" : ""}`}>
          {features.map((f, i) => (
            <div key={i} className="feature-card glass" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="feature-icon"><Icon name={f.icon} size={22} /></div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-sub">{f.sub}</div>
              <div className="card-shine" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
