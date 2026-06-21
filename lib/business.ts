export type BusinessPreset = {
  name: string;
  vertical: string;
  audience: string;
  missedLabel: string;
  chatScript: { from: "a" | "c"; text: string; delay: number }[];
  welcome: string;
  suggestions: string[];
  replies: { primary: string; secondary: string; services: string };
  // section-specific dynamic copy
  gap: { bestFit: string };
  retention: string;
  featuresHeadline: string;
  featuresMultiBiz: string;
  featuresInventory: { title: string; desc: string };
  how: { quote: string; booking: string };
};

export const BUSINESS_PRESETS: Record<string, BusinessPreset> = {
  "car detailing": {
    name: "Prime Auto Detailing",
    vertical: "Auto Detailing",
    audience: "auto detailers",
    missedLabel: "of calls missed while you're working on a car",
    chatScript: [
      { from: "c", text: "Hey, do you guys do ceramic coating?", delay: 600 },
      { from: "a", text: "Hi! Yes, we do. What kind of vehicle?", delay: 1400 },
      { from: "c", text: "I have a 2022 SUV.", delay: 1200 },
      { from: "a", text: "Ceramic coating for an SUV is $500. Includes 2-yr protection + paint decontamination. Want to book?", delay: 1800 },
      { from: "c", text: "Yes — Saturday morning?", delay: 1200 },
      { from: "a", text: "Saturday 9:00 AM works. Confirmed ✓ You'll get a reminder the day before.", delay: 1600 },
    ],
    welcome: "Hi! Welcome to Prime Auto Detailing. I can help you with pricing, services, or booking an appointment. How can I help you today?",
    suggestions: ["How much for ceramic coating?", "Interior detail for my SUV", "What services do you offer?"],
    replies: {
      primary: "Ceramic coating pricing:\n\n• Sedan — $399\n• SUV / Truck — $500\n• Oversized — $600\n\nIncludes 2-yr protection. Want to book?",
      secondary: "Interior detail for an SUV is $180 and takes ~3 hours. Includes deep vacuum, shampoo, leather conditioning. Any stains I should know about?",
      services: "We offer:\n\n• Exterior Wash & Wax\n• Interior Detail\n• Ceramic Coating\n• Paint Correction\n\nWhich one sounds right?",
    },
    gap: { bestFit: "Full Interior Detail" },
    retention: "It's been about a month — want to keep that finish sharp? I have Sat or Sun open.",
    featuresHeadline: "Built for detailers. Growing every month.",
    featuresMultiBiz: "Live: run multiple detailing shops from one system, each routed to its own number and owner.",
    featuresInventory: { title: "Inventory-aware alerts", desc: "Example: Ceramic coating is low — suggest a ceramic appointment tomorrow." },
    how: {
      quote: "Instantly provides accurate pricing based on vehicle and service, then checks real availability before confirming.",
      booking: "Booking details land instantly: customer, service, vehicle, date, time, price, duration.",
    },
  },
  cleaning: {
    name: "Spotless Home Cleaning",
    vertical: "Home Cleaning",
    audience: "home cleaners",
    missedLabel: "of calls missed while you're on a cleaning job",
    chatScript: [
      { from: "c", text: "Hi, how much for a deep clean?", delay: 600 },
      { from: "a", text: "Hi! Happy to help. How many bedrooms and bathrooms?", delay: 1400 },
      { from: "c", text: "3 bed, 2 bath.", delay: 1200 },
      { from: "a", text: "A 3BR / 2BA deep clean is $280 and takes about 4 hours. Want to book?", delay: 1800 },
      { from: "c", text: "Yes — Saturday morning?", delay: 1200 },
      { from: "a", text: "Saturday 9:00 AM works. Confirmed ✓ See you then.", delay: 1600 },
    ],
    welcome: "Hi! Welcome to Spotless Home Cleaning. I can help with pricing, scheduling, or booking. How can I help today?",
    suggestions: ["How much for a deep clean?", "Do you do move-out cleans?", "What services do you offer?"],
    replies: {
      primary: "Deep clean pricing:\n\n• 1-2 BR — $180\n• 3 BR — $280\n• 4+ BR — $380\n\nIncludes all rooms, kitchen, bathrooms. Want to book?",
      secondary: "Move-out cleans start at $320 for a 2BR. Includes inside cabinets, oven, fridge, baseboards. Any special requests?",
      services: "We offer:\n\n• Standard recurring clean\n• Deep clean\n• Move-in / move-out\n• Post-construction\n\nWhich fits your needs?",
    },
    gap: { bestFit: "Deep Clean" },
    retention: "It's been about a month — want to keep the place spotless? I have Sat or Sun open.",
    featuresHeadline: "Built for cleaners. Growing every month.",
    featuresMultiBiz: "Live: run multiple cleaning crews from one system, each routed to its own number and owner.",
    featuresInventory: { title: "Inventory-aware alerts", desc: "Example: Supplies are running low — suggest restocking before the next job." },
    how: {
      quote: "Instantly provides accurate pricing based on home size and service, then checks real availability before confirming.",
      booking: "Booking details land instantly: customer, service, address, date, time, price, duration.",
    },
  },
  hvac: {
    name: "Reliable HVAC Co.",
    vertical: "HVAC",
    audience: "HVAC pros",
    missedLabel: "of calls missed while you're on a service call",
    chatScript: [
      { from: "c", text: "Hey, my AC isn't cooling well.", delay: 600 },
      { from: "a", text: "Sorry to hear that! Want a diagnostic visit or a full tune-up?", delay: 1400 },
      { from: "c", text: "What's a tune-up cost?", delay: 1200 },
      { from: "a", text: "AC tune-up is $129 — cleaning, refrigerant check, and full inspection. Want to book?", delay: 1800 },
      { from: "c", text: "Yes, tomorrow if possible?", delay: 1200 },
      { from: "a", text: "Tomorrow 10–12 window is open. Confirmed ✓ Tech will call 30 min ahead.", delay: 1600 },
    ],
    welcome: "Hi! Welcome to Reliable HVAC. I can help with pricing, diagnostics, or booking a visit. What's going on?",
    suggestions: ["How much for an AC tune-up?", "My furnace isn't heating", "What services do you offer?"],
    replies: {
      primary: "Tune-up pricing:\n\n• AC tune-up — $129\n• Furnace tune-up — $149\n• Combo — $229\n\nIncludes full inspection. Want to book?",
      secondary: "Diagnostic visit is $99 (waived if you book the repair). We can usually come same-day. When works?",
      services: "We offer:\n\n• Diagnostics & repair\n• Tune-ups\n• Install / replacement\n• Duct cleaning\n\nWhat do you need?",
    },
    gap: { bestFit: "AC Tune-Up" },
    retention: "It's been about a month — want to keep your system running cool? I have Sat or Sun open.",
    featuresHeadline: "Built for HVAC pros. Growing every month.",
    featuresMultiBiz: "Live: run multiple HVAC operations from one system, each routed to its own number and owner.",
    featuresInventory: { title: "Inventory-aware alerts", desc: "Example: Air filters are low — suggest a maintenance visit tomorrow." },
    how: {
      quote: "Instantly provides accurate pricing based on system and service, then checks real availability before confirming.",
      booking: "Booking details land instantly: customer, service, equipment, date, time, price, duration.",
    },
  },
  "lawn care": {
    name: "GreenLine Lawn Care",
    vertical: "Lawn Care",
    audience: "lawn care pros",
    missedLabel: "of calls missed while you're out mowing",
    chatScript: [
      { from: "c", text: "Hey, how much to mow my lawn?", delay: 600 },
      { from: "a", text: "Hi! What's the lot size roughly?", delay: 1400 },
      { from: "c", text: "Quarter acre.", delay: 1200 },
      { from: "a", text: "A quarter-acre mow is $55, weekly. Includes edging + blow-off. Want to start this week?", delay: 1800 },
      { from: "c", text: "Yes, Saturday?", delay: 1200 },
      { from: "a", text: "Saturday works ✓ We'll be there between 9–11.", delay: 1600 },
    ],
    welcome: "Hi! Welcome to GreenLine Lawn Care. I can quote pricing, schedule service, or book you in. How can I help?",
    suggestions: ["How much to mow my lawn?", "Do you do landscaping?", "What services do you offer?"],
    replies: {
      primary: "Mowing pricing:\n\n• Under 1/4 acre — $45\n• 1/4 to 1/2 acre — $65\n• 1/2+ acre — $85+\n\nWeekly or bi-weekly. Want to book?",
      secondary: "Landscaping starts at $250 for a design consult. Includes site walk and plan. Want to schedule?",
      services: "We offer:\n\n• Weekly mowing\n• Fertilization\n• Landscaping\n• Leaf cleanup\n\nWhat are you looking for?",
    },
    gap: { bestFit: "Full Yard Service" },
    retention: "It's been about a month — want to keep the lawn sharp? I have Sat or Sun open.",
    featuresHeadline: "Built for lawn pros. Growing every month.",
    featuresMultiBiz: "Live: run multiple crews from one system, each routed to its own number and owner.",
    featuresInventory: { title: "Inventory-aware alerts", desc: "Example: Fertilizer is low — suggest a treatment visit this week." },
    how: {
      quote: "Instantly provides accurate pricing based on lot size and service, then checks real availability before confirming.",
      booking: "Booking details land instantly: customer, service, address, date, time, price, duration.",
    },
  },
  dental: {
    name: "Bright Smiles Dental",
    vertical: "Dental",
    audience: "dental practices",
    missedLabel: "of calls missed while you're with a patient",
    chatScript: [
      { from: "c", text: "Hi, I'd like to book a cleaning.", delay: 600 },
      { from: "a", text: "Of course! New patient or returning?", delay: 1400 },
      { from: "c", text: "New patient.", delay: 1200 },
      { from: "a", text: "New-patient cleaning + exam + X-rays is $149. Want to book?", delay: 1800 },
      { from: "c", text: "Yes — Saturday morning?", delay: 1200 },
      { from: "a", text: "Saturday 9:00 AM works ✓ We'll send intake forms tonight.", delay: 1600 },
    ],
    welcome: "Hi! Welcome to Bright Smiles Dental. I can help with pricing, appointments, or insurance questions. How can I help?",
    suggestions: ["How much for a cleaning?", "Do you take my insurance?", "What services do you offer?"],
    replies: {
      primary: "Cleaning pricing:\n\n• New patient + X-rays — $149\n• Returning cleaning — $95\n• Deep cleaning — $225/quadrant\n\nWant to book?",
      secondary: "We accept most PPO plans — Delta Dental, Cigna, Aetna, MetLife, United. Send your card and we'll verify. Ready to book?",
      services: "We offer:\n\n• Cleanings & exams\n• Fillings & crowns\n• Whitening\n• Invisalign\n• Emergency care\n\nWhat do you need?",
    },
    gap: { bestFit: "Cleaning + Exam" },
    retention: "It's been about six months — time for your next cleaning? I have a few openings this week.",
    featuresHeadline: "Built for dental practices. Growing every month.",
    featuresMultiBiz: "Live: run multiple locations from one system, each routed to its own number and front desk.",
    featuresInventory: { title: "Recall-aware alerts", desc: "Example: Your recall list is growing — suggest booking overdue patients this week." },
    how: {
      quote: "Instantly provides accurate pricing based on treatment and plan, then checks real availability before confirming.",
      booking: "Booking details land instantly: patient, treatment, provider, date, time, price, duration.",
    },
  },
};

export function normalizeBusiness(input: string): keyof typeof BUSINESS_PRESETS {
  const s = (input || "").toLowerCase().trim();
  if (!s) return "car detailing";
  if (s.includes("car") || s.includes("auto") || s.includes("detail")) return "car detailing";
  if (s.includes("clean") || s.includes("maid")) return "cleaning";
  if (s.includes("hvac") || s.includes("heating") || s.includes("ac") || s.includes("air")) return "hvac";
  if (s.includes("lawn") || s.includes("garden") || s.includes("landscap") || s.includes("mow")) return "lawn care";
  if (s.includes("dent") || s.includes("ortho")) return "dental";
  return "car detailing";
}
