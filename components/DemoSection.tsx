"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useBusiness } from "./BusinessContext";

type Msg = { from: "a" | "u"; text: string };
type DemoMode = "customer" | "owner";
type OwnerView = "alerts" | "gaps";

type OwnerAlert = {
  type: "gap" | "review" | "booking" | "report";
  title: string;
  message: string;
  actions?: string[];
  response?: string;
};

const OWNER_SCENARIOS: OwnerAlert[] = [
  {
    type: "gap",
    title: "Schedule Gap",
    message: "Tomorrow has a 2-hour gap at 1:00 PM.\n\nBest fit: Full Interior Detail.\n\nWarm leads available: 3.\n\nReply SEND 1 to reach out.",
    actions: ["SEND 1", "Skip"],
    response: "✅ Message sent to 3 warm leads. I'll notify you when they respond.",
  },
  {
    type: "review",
    title: "Review Approval",
    message: "New review from Sarah M.:\n\n⭐⭐⭐⭐⭐\n\"Amazing job on my Tesla! Looks brand new.\"\n\nReply APPROVE to publish.",
    actions: ["APPROVE", "REJECT"],
    response: "✅ Review approved and published to your website.",
  },
  {
    type: "booking",
    title: "New Booking",
    message: "📅 Saturday, May 3 at 9:00 AM\n\n👤 Mike Johnson\n🚗 2023 Honda Accord\n✨ Full Exterior Detail\n💰 $150 · 2 hours\n\nCalendar updated. Customer notified.",
    actions: ["View Calendar", "Send Reminder"],
    response: "📅 Added to your calendar. Reminder set for Friday evening.",
  },
  {
    type: "report",
    title: "Weekly Report",
    message: "Week of Apr 21-27:\n\n✅ 12 bookings ($1,840)\n⭐ 8 reviews (4.9 avg)\n📈 +3 from last week\n\nTop service: Ceramic Coating",
    actions: ["View Details", "Export"],
    response: "📊 Full report sent to your email.",
  },
];

type GapData = {
  day: string;
  date: string;
  gaps: Array<{
    time: string;
    duration: string;
    bestFit: string;
    warmLeads: number;
    revenue: string;
  }>;
  stats: {
    totalGaps: number;
    potentialRevenue: string;
    fillRate: string;
  };
};

const GAP_DATA: { today: GapData; tomorrow: GapData } = {
  today: {
    day: "Today",
    date: "Wed, Apr 29",
    gaps: [
      {
        time: "2:00 PM - 4:00 PM",
        duration: "2 hours",
        bestFit: "Full Interior Detail",
        warmLeads: 5,
        revenue: "$180",
      },
    ],
    stats: {
      totalGaps: 1,
      potentialRevenue: "$180",
      fillRate: "67%",
    },
  },
  tomorrow: {
    day: "Tomorrow",
    date: "Thu, Apr 30",
    gaps: [
      {
        time: "10:00 AM - 11:30 AM",
        duration: "1.5 hours",
        bestFit: "Express Wash & Wax",
        warmLeads: 3,
        revenue: "$90",
      },
      {
        time: "1:00 PM - 3:00 PM",
        duration: "2 hours",
        bestFit: "Full Interior Detail",
        warmLeads: 7,
        revenue: "$180",
      },
      {
        time: "4:30 PM - 6:00 PM",
        duration: "1.5 hours",
        bestFit: "Exterior Polish",
        warmLeads: 4,
        revenue: "$120",
      },
    ],
    stats: {
      totalGaps: 3,
      potentialRevenue: "$390",
      fillRate: "45%",
    },
  },
};

export default function DemoSection() {
  const { biz, bizKey } = useBusiness();
  const [mode, setMode] = useState<DemoMode>("customer");
  const [ownerView, setOwnerView] = useState<OwnerView>("alerts");
  const [gapDay, setGapDay] = useState<"today" | "tomorrow">("today");
  
  // Customer demo state
  const [messages, setMessages] = useState<Msg[]>([{ from: "a", text: biz.welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Owner demo state
  const [activeScenario, setActiveScenario] = useState(0);
  const [ownerMessages, setOwnerMessages] = useState<Msg[]>([]);
  const [showOwnerResponse, setShowOwnerResponse] = useState(false);

  useEffect(() => { 
    setMessages([{ from: "a", text: biz.welcome }]); 
  }, [biz]);

  useEffect(() => {
    if (mode === "owner" && ownerView === "alerts") {
      const scenario = OWNER_SCENARIOS[activeScenario];
      setOwnerMessages([{ from: "a", text: scenario.message }]);
      setShowOwnerResponse(false);
    }
  }, [activeScenario, mode, ownerView]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, ownerMessages, showOwnerResponse]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "u", text: text.trim() }]);
    setInput("");
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), business: bizKey }),
      });
      const data = await res.json();
      setTyping(false);
      setMessages(m => [...m, { from: "a", text: data.reply }]);
    } catch {
      setTyping(false);
      setMessages(m => [...m, { from: "a", text: "Sorry, I'm having trouble connecting. Try again?" }]);
    }
  };

  const handleOwnerAction = (action: string) => {
    const scenario = OWNER_SCENARIOS[activeScenario];
    setOwnerMessages(m => [...m, { from: "u", text: action }]);
    setShowOwnerResponse(true);
    
    setTimeout(() => {
      if (scenario.response) {
        setOwnerMessages(m => [...m, { from: "a", text: scenario.response! }]);
      }
    }, 500);
  };

  const suggestions = mode === "customer" ? biz.suggestions : [];
  const scenario = OWNER_SCENARIOS[activeScenario];
  const currentGapData = GAP_DATA[gapDay];

  return (
    <section id="demo" className="section demo-section">
      <div className="demo-glow" />
      <div className="section-inner demo-inner">
        <div className="section-head center">
          <div className="pill-badge"><span className="pill-dot" /> Interactive Playground</div>
          <h2>Try SlotCatch from both sides.</h2>
          <p className="section-sub">
            See how it works for customers booking appointments and owners managing their business.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="demo-mode-toggle">
          <button
            className={`demo-mode-btn ${mode === "customer" ? "active" : ""}`}
            onClick={() => setMode("customer")}
          >
            <Icon name="user" size={16} />
            Customer View
          </button>
          <button
            className={`demo-mode-btn ${mode === "owner" ? "active" : ""}`}
            onClick={() => setMode("owner")}
          >
            <Icon name="bell" size={16} />
            Owner View
          </button>
        </div>

        {/* Owner Sub-Toggle */}
        {mode === "owner" && (
          <div className="owner-view-toggle">
            <button
              className={`owner-view-btn ${ownerView === "alerts" ? "active" : ""}`}
              onClick={() => setOwnerView("alerts")}
            >
              <Icon name="bell" size={14} />
              Alerts
            </button>
            <button
              className={`owner-view-btn ${ownerView === "gaps" ? "active" : ""}`}
              onClick={() => setOwnerView("gaps")}
            >
              <Icon name="calendar" size={14} />
              Schedule Gaps
            </button>
          </div>
        )}

        {/* Owner Scenario Selector (for alerts view) */}
        {mode === "owner" && ownerView === "alerts" && (
          <div className="owner-scenario-tabs">
            {OWNER_SCENARIOS.map((s, i) => (
              <button
                key={i}
                className={`owner-scenario-tab ${i === activeScenario ? "active" : ""}`}
                onClick={() => setActiveScenario(i)}
              >
                <Icon 
                  name={s.type === "gap" ? "clock" : s.type === "review" ? "star" : s.type === "booking" ? "calendar" : "zap"} 
                  size={14} 
                />
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Gap Day Selector (for gaps view) */}
        {mode === "owner" && ownerView === "gaps" && (
          <div className="gap-day-toggle">
            <button
              className={`gap-day-btn ${gapDay === "today" ? "active" : ""}`}
              onClick={() => setGapDay("today")}
            >
              Today
            </button>
            <button
              className={`gap-day-btn ${gapDay === "tomorrow" ? "active" : ""}`}
              onClick={() => setGapDay("tomorrow")}
            >
              Tomorrow
            </button>
          </div>
        )}

        {mode === "customer" || ownerView === "alerts" ? (
          <div className="chat-widget glass">
            <div className="chat-widget-header">
              <div className="chat-avatar lg">
                <Icon name={mode === "customer" ? "spark" : "bell"} size={20} />
              </div>
              <div>
                <div className="chat-name">
                  {mode === "customer" 
                    ? `SlotCatch Agent · ${biz.name}` 
                    : "SlotCatch · Owner Alert"}
                </div>
                <div className="chat-status">
                  <span className="online-dot" /> 
                  {mode === "customer" ? "Online · responds in seconds" : "Active"}
                </div>
              </div>
            </div>

            <div className="chat-widget-body" ref={scrollRef}>
              {mode === "customer" ? (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`bubble bubble-${m.from}`}>
                      {m.text.split("\n").map((line, j) => <div key={j}>{line || "\u00A0"}</div>)}
                    </div>
                  ))}
                  {typing && (
                    <div className="bubble bubble-a msg-typing">
                      <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {ownerMessages.map((m, i) => (
                    <div key={i} className={`bubble bubble-${m.from}`}>
                      {m.text.split("\n").map((line, j) => <div key={j}>{line || "\u00A0"}</div>)}
                    </div>
                  ))}
                </>
              )}
            </div>

            {mode === "customer" ? (
              <>
                <div className="suggestions">
                  {suggestions.map(s => (
                    <button key={s} className="chip" onClick={() => setInput(s)}>{s}</button>
                  ))}
                </div>
                <form className="chat-widget-input" onSubmit={e => { e.preventDefault(); send(input); }}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message…"
                  />
                  <button type="submit" className="btn-send">
                    <Icon name="send" size={18} />
                  </button>
                </form>
              </>
            ) : (
              <>
                {scenario.actions && !showOwnerResponse && (
                  <div className="owner-demo-actions">
                    {scenario.actions.map((action) => (
                      <button
                        key={action}
                        className="owner-action-btn"
                        onClick={() => handleOwnerAction(action)}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
                {showOwnerResponse && (
                  <div className="owner-next-scenario">
                    <button
                      className="owner-next-btn"
                      onClick={() => {
                        setActiveScenario((prev) => (prev + 1) % OWNER_SCENARIOS.length);
                      }}
                    >
                      Try Next Scenario <Icon name="arrow" size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
       ) : (
          // Gaps View
          <div className="gaps-dashboard glass">
            

            <div className="gaps-dashboard-header">
              <div className="gaps-stats-grid">
                <div className="gap-stat-card">
                  <div className="gap-stat-icon">
                    <Icon name="calendar" size={20} />
                  </div>
                  <div className="gap-stat-content">
                    <div className="gap-stat-value">{currentGapData.stats.totalGaps}</div>
                    <div className="gap-stat-label">Open Gaps</div>
                  </div>
                </div>
                <div className="gap-stat-card">
                  <div className="gap-stat-icon">
                    <Icon name="dollar" size={20} />
                  </div>
                  <div className="gap-stat-content">
                    <div className="gap-stat-value">{currentGapData.stats.potentialRevenue}</div>
                    <div className="gap-stat-label">Potential Revenue</div>
                  </div>
                </div>
                <div className="gap-stat-card">
                  <div className="gap-stat-icon">
                    <Icon name="zap" size={20} />
                  </div>
                  <div className="gap-stat-content">
                    <div className="gap-stat-value">{currentGapData.stats.fillRate}</div>
                    <div className="gap-stat-label">Fill Rate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gaps-list">
              {currentGapData.gaps.map((gap, i) => (
                <div key={i} className="gap-card">
                  <div className="gap-card-header">
                    <div className="gap-card-time">
                      <Icon name="clock" size={18} />
                      <span>{gap.time}</span>
                    </div>
                    <div className="gap-card-badge">{gap.duration}</div>
                  </div>
                  
                  <div className="gap-card-details">
                    <div className="gap-card-row">
                      <Icon name="check" size={16} />
                      <span className="gap-label">Best Fit</span>
                      <span className="gap-value">{gap.bestFit}</span>
                    </div>
                    <div className="gap-card-row">
                      <Icon name="user" size={16} />
                      <span className="gap-label">Warm Leads</span>
                      <span className="gap-value">{gap.warmLeads} customers</span>
                    </div>
                    <div className="gap-card-row">
                      <Icon name="dollar" size={16} />
                      <span className="gap-label">Revenue</span>
                      <span className="gap-value">{gap.revenue}</span>
                    </div>
                  </div>

                  <button className="gap-fill-btn">
                    <Icon name="send" size={16} />
                    Send to {gap.warmLeads} leads
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}