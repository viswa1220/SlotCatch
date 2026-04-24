"use client";
import { useInView, useCounter } from "@/lib/hooks";
import { useBusiness } from "./BusinessContext";

function StatCard({ target, suffix, prefix, label, delay, inView }: {
  target: number; suffix?: string; prefix?: string; label: string; delay: number; inView: boolean;
}) {
  const val = useCounter(target, inView, 1800);
  return (
    <div className="stat-card glass" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-num">{prefix}{val.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function ProblemSection() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { biz } = useBusiness();
  return (
    <section id="problem" className="section problem-section" ref={ref as any}>
      <div className="section-inner">
        <div className={`section-head ${inView ? "in" : ""}`}>
          <div className="eyebrow">The cost of silence</div>
          <h2>Your customers aren&apos;t waiting.</h2>
        </div>
        <div className={`stats-row ${inView ? "in" : ""}`}>
          <StatCard target={78} suffix="%" label="of customers buy from whoever responds first" delay={0} inView={inView} />
          <StatCard target={38} suffix="%" label={biz.missedLabel} delay={150} inView={inView} />
          <StatCard target={126} prefix="$" suffix="K" label="lost annually to missed leads" delay={300} inView={inView} />
        </div>
        <p className={`problem-footer ${inView ? "in" : ""}`}>
          Every missed message is revenue walking to your competitor.
        </p>
      </div>
    </section>
  );
}
