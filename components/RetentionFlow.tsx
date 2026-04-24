"use client";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";
import { useBusiness } from "./BusinessContext";

type Scene = {
  day: string;
  label: string;
  tag: string;
  color: "teal" | "blue" | "mute";
  msgs: { from: "u" | "a" | "sys"; text: string }[];
};

export default function RetentionFlow() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [step, setStep] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const { biz } = useBusiness();

  const scenes: Scene[] = [
    {
      day: "Day 0",
      label: "Booking day",
      tag: "Customer books",
      color: "teal",
      msgs: [
        { from: "u", text: "Hey — can you fit me in Saturday?" },
        { from: "a", text: "Booked ✅ Saturday at 2pm. See you then!" },
      ],
    },
    {
      day: "Day 30",
      label: "30 days later",
      tag: "Customer goes quiet",
      color: "mute",
      msgs: [
        { from: "sys", text: "No contact for 30 days. Most businesses would lose this customer." },
      ],
    },
    {
      day: "Day 30",
      label: "SlotCatch reaches out",
      tag: "Automatic follow-up",
      color: "blue",
      msgs: [
        {
          from: "a",
          text:
            "Hey! It's been a month since your last visit — hope everything's still looking good. Want to book your next appointment? I have openings this Saturday or next.",
        },
      ],
    },
    {
      day: "Day 30",
      label: "Customer replies",
      tag: "Rebooks on the spot",
      color: "teal",
      msgs: [
        { from: "u", text: "Oh wow, yes please — Saturday works!" },
        { from: "a", text: "Done ✅ Booked for Saturday at 2pm. See you then!" },
      ],
    },
  ];

  useEffect(() => {
    if (!inView) return;
    setStep(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= scenes.length) { clearInterval(iv); return; }
      setStep(i);
    }, 2800);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, replayKey]);

  return (
    <div className={`retention-flow ${inView ? "in" : ""}`} ref={ref as any}>
      <div className="retention-head">
        <div className="retention-eyebrow"><span className="retention-dot" /> What happens next</div>
        <h3>A month later, SlotCatch brings them back.</h3>
        <p>
          Most booking tools stop at the first sale. SlotCatch keeps the relationship alive — automatically re-engaging
          past customers before they drift away.
        </p>
      </div>
      <div className="retention-stage">
        <div className="retention-timeline">
          {scenes.map((s, i) => (
            <div
              key={i}
              className={`retention-tick ${step >= i ? "active" : ""} ${step === i ? "current" : ""}`}
            >
              <div className="retention-tick-dot" />
              <div className="retention-tick-day">{s.day}</div>
              <div className="retention-tick-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="retention-screen glass">
          <div className="retention-screen-top">
            <div className="retention-screen-avatar"><Icon name="whatsapp" size={14} /></div>
            <div className="retention-screen-meta">
              <div className="retention-screen-name">{biz.name} · SlotCatch</div>
              <div className="retention-screen-sub">
                <span className={`retention-tag retention-tag-${scenes[step].color}`}>{scenes[step].tag}</span>
              </div>
            </div>
            <div className="retention-screen-day">{scenes[step].day}</div>
          </div>
          <div className="retention-screen-body" key={`${replayKey}-${step}`}>
            {scenes[step].msgs.map((m, i) => (
              <div
                key={i}
                className={`retention-msg retention-msg-${m.from}`}
                style={{ animationDelay: `${i * 250}ms` }}
              >
                {m.text}
              </div>
            ))}
          </div>
        </div>

        <div className="retention-controls">
          <button className="retention-replay" onClick={() => setReplayKey(k => k + 1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
