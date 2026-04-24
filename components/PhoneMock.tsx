"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useBusiness } from "./BusinessContext";

type Msg = { from: string; text: string; delay: number };

export default function PhoneMock() {
  const { biz } = useBusiness();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timers: any[] = [];
    const sleep = (ms: number) => new Promise(r => timers.push(setTimeout(r, ms)));
    const run = async () => {
      while (!cancelled) {
        setMsgs([]);
        await sleep(800);
        for (const m of biz.chatScript) {
          if (cancelled) return;
          if (m.from === "a") {
            setTyping(true);
            await sleep(900);
            setTyping(false);
          }
          setMsgs(prev => [...prev, m as Msg]);
          await sleep(m.delay);
        }
        await sleep(3000);
      }
    };
    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [biz]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  return (
    <div className="phone-wrap">
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="chat-header">
            <div className="chat-avatar"><Icon name="spark" size={18} /></div>
            <div>
              <div className="chat-name">{biz.name}</div>
              <div className="chat-status">● online · AI agent</div>
            </div>
          </div>
          <div className="chat-body" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`msg msg-${m.from}`}>
                {m.text}
                <span className="msg-time">{m.from === "a" ? "10:42" : "10:41"}</span>
              </div>
            ))}
            {typing && (
              <div className="msg msg-a msg-typing">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            )}
          </div>
          <div className="chat-input-mock">
            <div className="chat-input-fake">Message…</div>
          </div>
        </div>
      </div>
    </div>
  );
}
