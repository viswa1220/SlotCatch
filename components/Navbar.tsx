"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Icon from "./Icon";
import Logo from "./Logo";

export default function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // undefined = still checking, null = logged out, string = business name
  const [bizName, setBizName] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Same-origin (proxied) request — sends the first-party dashboard cookie.
    fetch("/dashboard/api/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setBizName(d?.business_name ?? null))
      .catch(() => setBizName(null));
  }, []);

  const loggedIn = typeof bizName === "string";

  const links: [string, string][] = [
    ["Problem", "problem"],
    ["How It Works", "how"],
    ["Gaps", "gaps"],
    ["Features", "features"],
    ["Roadmap", "roadmap"],
    ["Pricing", "pricing"],
    ["Apply", "apply"],
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "visible" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("hero")}>
            <div className="logo-mark">
              <Logo size={20} />
            </div>
            <span>
              SlotCatch<span className="accent-dot"></span>
            </span>
          </div>

          <div className="nav-links">
            {links.map(([label, id]) => (
              <a key={id} onClick={() => scrollTo(id)}>
                {label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            {loggedIn ? (
              <>
                <Link href="/dashboard" className="nav-login">
                  {bizName}
                </Link>
                <a href="/dashboard/logout" className="nav-login">
                  Sign out
                </a>
              </>
            ) : (
              <Link href="/dashboard/login" className="nav-login">
                Login
              </Link>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => scrollTo("apply")}>
              Get Started
            </button>
          </div>

          <button className="nav-hamburger" onClick={() => setMenuOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-head">
          <div className="nav-logo" onClick={() => scrollTo("hero")}>
            <div className="logo-mark">
              <Logo size={20} />
            </div>
            <span>
              SlotCatch<span className="accent-dot">.ai</span>
            </span>
          </div>

          <button className="nav-hamburger" onClick={() => setMenuOpen(false)}>
            <Icon name="x" size={22} />
          </button>
        </div>

        <div className="mobile-links">
          {links.map(([label, id]) => (
            <a
              key={id}
              onClick={() => {
                scrollTo(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}

          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="nav-login mobile-login"
                onClick={() => setMenuOpen(false)}
              >
                {bizName} — Dashboard
              </Link>
              <a href="/dashboard/logout" className="nav-login mobile-login">
                Sign out
              </a>
            </>
          ) : (
            <Link
              href="/dashboard/login"
              className="nav-login mobile-login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}

          <button
            className="btn btn-primary"
            onClick={() => {
              scrollTo("apply");
              setMenuOpen(false);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}