import { NextResponse } from "next/server";
import { BUSINESS_PRESETS } from "@/lib/business";

export async function POST(req: Request) {
  const { message, business } = await req.json();
  const bizKey = (business && BUSINESS_PRESETS[business]) ? business : "car detailing";
  const biz = BUSINESS_PRESETS[bizKey];
  const text = (message || "").toLowerCase();

  const kws = biz.suggestions.map(s => s.toLowerCase());
  let key: "primary" | "secondary" | "services" = "services";
  if (text.includes("price") || text.includes("how much") || text.includes("cost")
      || kws[0].split(" ").some(w => w.length > 3 && text.includes(w))) {
    key = "primary";
  } else if (kws[1].split(" ").some(w => w.length > 3 && text.includes(w))) {
    key = "secondary";
  } else if (text.includes("service") || text.includes("offer") || text.includes("what do")) {
    key = "services";
  } else {
    key = "primary";
  }

  // Simulate network latency so the chat feels "live"
  await new Promise(r => setTimeout(r, 900 + Math.random() * 500));

  return NextResponse.json({ reply: biz.replies[key] });
}

// To connect to your FastAPI backend instead:
// const upstream = process.env.SLOTCATCH_API_URL;
// const res = await fetch(`${upstream}/chat`, { method: "POST", body: JSON.stringify({ message, business }) });
// return NextResponse.json(await res.json());
