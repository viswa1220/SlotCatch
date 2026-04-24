"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links: [string, string][] = [
    ["Problem", "problem"],
    ["How It Works", "how"],
    ["Demo", "demo"],
    ["Roadmap", "roadmap"],
    ["Features", "features"],
    ["Pricing", "pricing"],
    ["Apply", "apply"],
  ];
  return (
    <>
      <nav className={`navbar ${scrolled ? "visible" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("hero")}>
            <div className="logo-mark"><Logo size={20} /></div>
            <span>SlotCatch<span className="accent-dot">.ai</span></span>
          </div>
          <div className="nav-links">
            {links.map(([l, id]) => (<a key={id} onClick={() => scrollTo(id)}>{l}</a>))}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => scrollTo("demo")}>Try Demo</button>
          <button className="nav-hamburger" onClick={() => setMenuOpen(true)}><Icon name="menu" size={22} /></button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-head">
          <div className="nav-logo">
            <div className="logo-mark"><Logo size={20} /></div>
            <span>SlotCatch<span className="accent-dot">.ai</span></span>
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(false)}><Icon name="x" size={22} /></button>
        </div>
        <div className="mobile-links">
          {links.map(([l, id]) => (
            <a key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }}>{l}</a>
          ))}
          <button className="btn btn-primary" onClick={() => { scrollTo("demo"); setMenuOpen(false); }}>Try Demo</button>
        </div>
      </div>
    </>
  );
}
