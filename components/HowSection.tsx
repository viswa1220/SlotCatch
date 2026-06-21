"use client";
import Icon, { IconName } from "./Icon";
import { useInView } from "@/lib/hooks";
import { useBusiness } from "./BusinessContext";

export default function HowSection() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const { biz } = useBusiness();

  const steps: { icon: IconName; num: string; title: string; sub: string }[] = [
    { 
      icon: "message-circle", 
      num: "01", 
      title: "Customer calls or texts",
sub: "Customers reach out via WhatsApp, SMS, or phone call — missed calls automatically get a text response within seconds."
    },
    { 
      icon: "repeat", 
      num: "02", 
      title: "SlotCatch quotes & schedules",
      sub: biz.how.quote
    },
    { 
      icon: "bell", 
      num: "03", 
      title: "Owner gets notified",
      sub: biz.how.booking
    },
    { 
      icon: "loader", 
      num: "04", 
      title: "Reviews get collected", 
      sub: "After completed services, SlotCatch asks customers for a review directly in chat." 
    },
    { 
      icon: "check", 
      num: "05", 
      title: "Owner approves before publishing", 
      sub: "Approve or reject reviews from WhatsApp or SMS before they appear on your website." 
    },
    { 
      icon: "calendar", 
      num: "06", 
      title: "Retention brings them back", 
      sub: "Follows up with past customers after 30 days and helps them rebook automatically." 
    },
  ];

  return (
    <section id="how" className="section how-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head center ${inView ? "in" : ""}`}>
          <div className="eyebrow">How it works</div>
          <h2>From first message to repeat customer.</h2>
        </div>
        <div className={`steps-grid ${inView ? "in" : ""}`}>
          {steps.map((s, i) => (
            <div key={i} className="step-card" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="step-icon-wrap">
                <Icon name={s.icon} size={28} />
              </div>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}