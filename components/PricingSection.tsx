"use client";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";

export default function PricingSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const tiers = [
    { 
      name: "Starter", 
      price: 99, 
      perBooking: 15,
      cap: 300,
      features: ["AI booking agent", "Calendar integration", "Owner notifications", "Weekly report"] 
    },
    { 
      name: "Growth", 
      price: 299, 
      perBooking: 10,
      cap: 500,
      featured: true, 
      badge: "Most Popular",
      features: ["Everything in Starter", "Review collection & approval", "30-day retention follow-ups", "Schedule gap detection", "Website review widget"] 
    },
    { 
      name: "Premium", 
      price: 499, 
      perBooking: 5,
      cap: 999,
      features: ["Everything in Growth", "Multi-business support", "Priority support", "Custom integrations", "Dedicated account manager"] 
    },
  ];
  
  return (
    <section id="pricing" className="section pricing-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head center ${inView ? "in" : ""}`}>
          <div className="eyebrow">Pricing</div>
          <h2>Simple pricing that scales with you.</h2>
          <p className="section-sub">
            Choose the plan that fits your business. Lower per-booking fees as you grow.
          </p>
        </div>
        <div className={`pricing-grid ${inView ? "in" : ""}`}>
          {tiers.map((t, i) => (
            <div key={i} className={`price-card glass ${t.featured ? "featured" : ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {t.featured && <div className="price-badge">{t.badge}</div>}
              <div className="price-name">{t.name}</div>
              <div className="price-amt">
                <span className="price-dollar">$</span>
                <span className="price-num">{t.price}</span>
                <span className="price-per">/month</span>
              </div>
              <div className="price-plus">+ ${t.perBooking} per booking (max ${t.cap}/mo)</div>
              <ul className="price-feats">
                {t.features.map(f => (
                  <li key={f}><Icon name="check" size={14} /> {f}</li>
                ))}
              </ul>
              <button
                className={`btn ${t.featured ? "btn-primary" : "btn-ghost"} btn-full`}
                onClick={() => scrollTo("apply")}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}