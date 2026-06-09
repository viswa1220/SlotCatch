"use client";
import Icon from "./Icon";
import Particles from "./Particles";
import PhoneMock from "./PhoneMock";

const HERO_HEADLINE = "Never miss a booking. Ever.";

export default function HeroSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section id="hero" className="section hero-section">
      <Particles />
      <div className="mesh-bg" />
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="hero-headline" style={{
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 50%, #a5b4c7 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 80px rgba(255,255,255,0.1)',
          }}>
            {HERO_HEADLINE}
          </h1>
          <p className="hero-sub in" style={{
            fontSize: '20px',
            lineHeight: 1.6,
            maxWidth: '540px',
          }}>
            SlotCatch helps <strong>auto detailers</strong> capture every lead — even missed calls and after-hours messages — with instant WhatsApp and SMS replies, automatic booking, review collection, and retention follow-ups.
          </p>
          
          <div className="hero-tags in">
            <span className="tag">
              <span className="tag-dot"></span>
              BUILT FOR: <strong>Auto Detailing</strong>
            </span>
            <span className="tag-muted">MORE VERTICALS SOON</span>
          </div>

          <div className="hero-cta in" style={{ gap: '16px', marginTop: '32px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo("apply")}>
              Get Started <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => scrollTo("pricing")}>
              See Pricing
            </button>
          </div>
          <div className="hero-trust in" style={{
            marginTop: '40px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <Icon name="check" size={16} />
            <span>Never miss a call — responds 24/7 on WhatsApp and SMS</span>
          </div>
        </div>
        <div className="hero-right"><PhoneMock /></div>
      </div>
      <div className="scroll-cue">
        <span>scroll</span>
        <div className="cue-line" />
      </div>
    </section>
  );
}