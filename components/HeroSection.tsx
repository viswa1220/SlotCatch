"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Particles from "./Particles";
import PhoneMock from "./PhoneMock";
import BusinessInput from "./BusinessInput";

const HERO_HEADLINE = "Your AI Receptionist on WhatsApp";

function TypingText({ text, speed = 55, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return (
    <>
      {text.slice(0, i)}
      <span className="caret">|</span>
    </>
  );
}

export default function HeroSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [subVisible, setSubVisible] = useState(false);
  return (
    <section id="hero" className="section hero-section">
      <Particles />
      <div className="mesh-bg" />
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="hero-headline">
            <TypingText text={HERO_HEADLINE} onDone={() => setSubVisible(true)} />
          </h1>
          <p className={`hero-sub ${subVisible ? "in" : ""}`}>
            Replies instantly. Quotes accurately. Books automatically.<br />
            <span className="muted">While you sleep.</span>
          </p>
          <div className={`hero-biz-slot ${subVisible ? "in" : ""}`}>
            <BusinessInput />
          </div>
          <div className={`hero-cta ${subVisible ? "in" : ""}`}>
            <button className="btn btn-primary btn-pulse" onClick={() => scrollTo("demo")}>
              Try Live Demo <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo("pricing")}>
              See Pricing
            </button>
          </div>
          <div className={`hero-trust ${subVisible ? "in" : ""}`}>
            <span>Works with your existing WhatsApp Business number</span>
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
