import React from "react";

export type IconName =
  | "whatsapp" | "brain" | "calendar" | "clock" | "dollar" | "bell"
  | "phone" | "globe" | "check" | "arrow" | "send" | "user" | "spark"
  | "menu" | "x" | "zap";

const PATHS: Record<IconName, React.ReactNode> = {
  whatsapp: (<><path d="M3 21l1.65-4.5A9 9 0 1 1 8 20.5L3 21z"/><path d="M8.5 10.5c.5 2 2 3.5 4 4l1.2-1.2c.3-.3.7-.4 1-.2l2 .8c.3.1.5.4.5.7v1.7c0 .4-.3.7-.7.8-4.6.5-8.8-3.7-8.3-8.3.1-.4.4-.7.8-.7h1.7c.3 0 .6.2.7.5l.8 2c.1.4.1.7-.2 1l-1.2 1.2z"/></>),
  brain: (<><path d="M9.5 4.5a2.5 2.5 0 0 0-2.5 2.5c-1.4 0-2.5 1.1-2.5 2.5 0 .8.4 1.5 1 2-.6.5-1 1.2-1 2 0 1.4 1.1 2.5 2.5 2.5 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V7a2.5 2.5 0 0 0-2.5-2.5z"/><path d="M14.5 4.5a2.5 2.5 0 0 1 2.5 2.5c1.4 0 2.5 1.1 2.5 2.5 0 .8-.4 1.5-1 2 .6.5 1 1.2 1 2 0 1.4-1.1 2.5-2.5 2.5 0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V7a2.5 2.5 0 0 1 2.5-2.5z"/></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><path d="M8 14l2 2 4-4"/></>),
  clock: (<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  dollar: (<><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>),
  phone: (<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></>),
  globe: (<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>),
  check: (<path d="M5 13l4 4L19 7"/>),
  arrow: (<><path d="M5 12h14M13 6l6 6-6 6"/></>),
  send: (<><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></>),
  user: (<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>),
  spark: (<><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></>),
  menu: (<><path d="M3 6h18M3 12h18M3 18h18"/></>),
  x: (<><path d="M6 6l12 12M18 6L6 18"/></>),
  zap: (<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>),
};

export default function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name]}
    </svg>
  );
}
