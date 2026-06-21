"use client";
import { useState, useEffect } from "react";
import Icon from "./Icon";
import { useInView } from "@/lib/hooks";
import { useBusiness } from "./BusinessContext";

type Stage = {
  day: string;
  label: string;
  messages: Array<{
    type: "u" | "a" | "sys";
    text: string;
  }>;
  tag?: string;
  tagColor?: "teal" | "blue" | "mute";
};

const STAGES: Stage[] = [
  {
    day: "DAY 0",
    label: "Customer books",
    tag: "BOOKING CONFIRMED",
    tagColor: "teal",
    messages: [
      { type: "sys", text: "Booking confirmed for Saturday 9:00 AM" },
    ],
  },
  {
    day: "DAY 1",
    label: "Owner notified, service done",
    tag: "SERVICE COMPLETED",
    tagColor: "teal",
    messages: [
      { type: "sys", text: "Service completed. Owner notified." },
    ],
  },
  {
    day: "AFTER SERVICE",
    label: "Review request sent",
    tag: "REVIEW REQUESTED",
    tagColor: "blue",
    messages: [
      { type: "a", text: "Thanks for choosing us! Mind sharing a quick review of your visit? Reply with a 1-5 rating and a few words." },
      { type: "u", text: "5 — looked brand new!" },
    ],
  },
  {
    day: "OWNER APPROVAL",
    label: "Owner approves the review",
    tag: "REVIEW LIVE ON WEBSITE",
    tagColor: "teal",
    messages: [
      { type: "sys", text: "Owner approved. Review is now live on your website." },
    ],
  },
  {
    day: "DAY 30",
    label: "Retention follow-up",
    tag: "RETENTION",
    tagColor: "mute",
    messages: [
      { type: "a", text: "It's been about a month — want to keep that finish sharp? I have Sat or Sun open." },
    ],
  },
  {
    day: "CUSTOMER REPLIES",
    label: "BOOK — rebooking starts",
    messages: [
      { type: "u", text: "Done ✅ Saturday 9:00 AM. See you then!" },
      { type: "sys", text: "Booking confirmed. Cycle repeats." },
    ],
  },
];

export default function RoadmapSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const { biz } = useBusiness();
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stages = STAGES.map((s) =>
    s.day === "DAY 30" ? { ...s, messages: [{ type: "a" as const, text: biz.retention }] } : s
  );

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= STAGES.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (inView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [inView]);

  const handleReplay = () => {
    setCurrentStage(0);
    setIsPlaying(true);
  };

  const stage = stages[currentStage];

  return (
    <section id="roadmap" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.03), transparent)' }}>
      <div className="section-inner">
        <div className={`retention-flow ${inView ? "in" : ""}`} ref={ref as any}>
          <div className="retention-head">
            <div className="retention-eyebrow">
              <span className="retention-dot"></span>
              Lifecycle
            </div>
            <h3>A month later, SlotCatch brings them back.</h3>
            <p>
              Most booking tools stop after the appointment. SlotCatch keeps the customer relationship alive — collecting reviews, publishing approved feedback, and sending retention follow-ups that bring past customers back.
            </p>
          </div>

          <div className="retention-stage">
            <div className="retention-timeline">
              {stages.map((s, i) => (
                <div
                  key={i}
                  className={`retention-tick ${i <= currentStage ? "active" : ""} ${i === currentStage ? "current" : ""}`}
                >
                  <div className="retention-tick-dot"></div>
                  <div className="retention-tick-day">{s.day}</div>
                  <div className="retention-tick-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="retention-screen glass">
              <div className="retention-screen-top">
                <div className="retention-screen-avatar">
                  <Icon name="whatsapp" size={18} />
                </div>
                <div className="retention-screen-meta">
                  <div className="retention-screen-name">{biz.name} · SlotCatch</div>
                  {stage.tag && (
                    <div className="retention-screen-sub">
                      <span className={`retention-tag retention-tag-${stage.tagColor || "mute"}`}>
                        {stage.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="retention-screen-day">{stage.day}</div>
              </div>

              <div className="retention-screen-body">
                {stage.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`retention-msg retention-msg-${msg.type}`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="retention-controls">
              <button className="retention-replay" onClick={handleReplay}>
                <Icon name="repeat" size={14} />
                Replay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}