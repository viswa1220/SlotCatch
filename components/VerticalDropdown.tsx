"use client";
import { useState, useRef, useEffect } from "react";
import { useBusiness } from "./BusinessContext";
import { BUSINESS_PRESETS } from "@/lib/business";

const OPTIONS: { key: string; label: string }[] = [
  { key: "car detailing", label: "Auto Detailing" },
  { key: "hvac", label: "HVAC" },
];

export default function VerticalDropdown() {
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
    <div className="vert-dd" ref={wrapRef}>
      <button type="button" className="tag vert-dd-btn" onClick={() => setOpen(o => !o)}>
        <span className="tag-dot" />
        BUILT FOR: <strong>{biz.vertical}</strong>
        <svg
          width="9" height="6" viewBox="0 0 10 6" fill="none"
          style={{ marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="vert-dd-menu">
          {OPTIONS.map(o => (
            <button
              key={o.key}
              type="button"
              className={BUSINESS_PRESETS[o.key].vertical === biz.vertical ? "active" : ""}
              onClick={() => pick(o.key)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
