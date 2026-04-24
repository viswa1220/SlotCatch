"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useBusiness } from "./BusinessContext";
import RetentionFlow from "./RetentionFlow";

type Msg = { from: "a" | "u"; text: string };

export default function DemoSection() {
  const { biz, bizKey } = useBusiness();
  const [messages, setMessages] = useState<Msg[]>([{ from: "a", text: biz.welcome }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { setMessages([{ from: "a", text: biz.welcome }]); }, [biz]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

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

  const suggestions = biz.suggestions;

  return (
    <section id="demo" className="section demo-section">
      <div className="demo-glow" />
      <div className="section-inner demo-inner">
        <div className="section-head center">
          <div className="pill-badge"><span className="pill-dot" /> Try it yourself</div>
          <h2>Talk to SlotCatch right now.</h2>
          <p className="section-sub">
            A real AI agent. Ask about pricing, pick a service, book an appointment — see it work in real time.
          </p>
        </div>
        <div className="chat-widget glass">
          <div className="chat-widget-header">
            <div className="chat-avatar lg"><Icon name="spark" size={20} /></div>
            <div>
              <div className="chat-name">SlotCatch Agent · {biz.name}</div>
              <div className="chat-status"><span className="online-dot" /> Online · responds in seconds</div>
            </div>
          </div>
          <div className="chat-widget-body" ref={scrollRef}>
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
          </div>
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
        </div>

        <RetentionFlow />
      </div>
    </section>
  );
}
