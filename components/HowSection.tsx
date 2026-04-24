"use client";
import Icon, { IconName } from "./Icon";
import { useInView } from "@/lib/hooks";

export default function HowSection() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const steps: { icon: IconName; title: string; sub: string }[] = [
    { icon: "whatsapp", title: "Customer Messages", sub: "They ask about pricing or availability on WhatsApp — at any hour." },
    { icon: "brain", title: "SlotCatch Qualifies & Quotes", sub: "AI instantly responds with accurate pricing based on vehicle and service." },
    { icon: "calendar", title: "Appointment Booked", sub: "Calendar updated, customer confirmed, owner notified — all automatic." },
  ];
  return (
    <section id="how" className="section how-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head ${inView ? "in" : ""}`}>
          <div className="eyebrow">How it works</div>
          <h2>From message to booking in 90 seconds.</h2>
        </div>
        <div className={`steps ${inView ? "in" : ""}`}>
          <div className="steps-line">
            <div className="steps-line-fill" style={{ width: inView ? "100%" : "0%" }} />
          </div>
          {steps.map((s, i) => (
            <div key={i} className="step" style={{ transitionDelay: `${200 + i * 250}ms` }}>
              <div className={`step-icon step-icon-${i}`}>
                <Icon name={s.icon} size={30} />
                <span className="step-ring" />
              </div>
              <div className="step-num">0{i + 1}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
