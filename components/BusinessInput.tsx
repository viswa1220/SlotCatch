"use client";
import { useState, useRef, useEffect } from "react";
import { useBusiness } from "./BusinessContext";
import { BUSINESS_PRESETS } from "@/lib/business";

const OPTIONS: { key: string; label: string }[] = [
  { key: "car detailing", label: "Car Detailing" },
  { key: "hvac", label: "HVAC" },
];

export default function BusinessInput() {
  const [open, setOpen] = useState(false);
  const { biz, setBusiness } = useBusiness();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (key: string) => { setBusiness(key); setOpen(false); };

  return (
    <div className="biz-inline">
      <div className="biz-select-wrap" ref={wrapRef}>
        <span className="biz-inline-label"><span className="biz-dot" /> Showing for:</span>
        <button type="button" className="biz-select-btn" onClick={() => setOpen(o => !o)}>
          <strong>{biz.name}</strong>
          <svg
            width="10" height="6" viewBox="0 0 10 6" fill="none"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <div className="biz-select-menu">
            {OPTIONS.map(o => (
              <button
                key={o.key}
                type="button"
                className={BUSINESS_PRESETS[o.key].name === biz.name ? "active" : ""}
                onClick={() => pick(o.key)}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
