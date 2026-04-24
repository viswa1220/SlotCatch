import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: Persist to your DB, email team, push to CRM, etc.
  console.log("New early access application:", body);
  return NextResponse.json({ ok: true });
}
