// All copy for the Design Spin-off 2027 one-pager lives here, so details can
// be confirmed in one place. Anything marked DRAFT or TBA is a placeholder;
// anything labelled 2025 comes from the 2025 partner deck (Lagos edition).

export const event = {
  name: "Design Spin-off",
  edition: "2027",
  organiser: "Sections",
  organiserUrl: "https://hellosections.framer.website",
  theme: "The Designer’s Dilemma",
  // TBA: confirm date. Venue is the expected host, not yet confirmed.
  date: "2027 · Date TBA",
  city: "London, UK",
  venue: "Design District, Greenwich Peninsula",
  format: "One day, in person",
  // TBA: add a public inbox. The contact section hides the address while empty.
  contactEmail: "",
};

// Page links. The static preview build (NEXT_PUBLIC_STATIC_PREVIEW=1) is served
// from a sub-folder as plain files, so it needs relative .html paths.
const staticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";
export const routes = {
  home: staticPreview ? "./index.html" : "/",
  tickets: staticPreview ? "./tickets.html" : "/tickets",
  journey: staticPreview ? "./journey.html" : "/journey",
};

/** A link to a section of the home page, usable from any page. */
export const homeAnchor = (id: string) => `${routes.home}#${id}`;

export const nav = [
  { href: homeAnchor("topics"), label: "Topics" },
  { href: homeAnchor("speakers"), label: "Speakers" },
  { href: homeAnchor("agenda"), label: "Agenda" },
  { href: routes.tickets, label: "Tickets" },
  { href: homeAnchor("partners"), label: "Partners" },
  { href: homeAnchor("faqs"), label: "FAQs" },
  { href: routes.journey, label: "Journey" },
];

export const hero = {
  eyebrow: "The Designer’s Dilemma",
  title: "Exploring the design landscape in today’s industry",
  body: "AI isn’t ending design. It’s changing who designs, what design is worth and who owns it. Design Spin-off 2027 brings designers, design leaders, students and the people who hire them to London’s Design District to work out what that means.",
};

// The five topics, in the order they stack in the hero card. `bar` sets each
// block's width and offset inside the card, as percentages, to match the
// reference composition.
export const topics = [
  {
    id: "accessibility",
    name: "Accessibility",
    color: "var(--color-navy)",
    bar: { left: 7, width: 84, align: "center" },
    body: "The European Accessibility Act has applied since June 2025, and no automated tool covers every requirement. One design skill AI can’t fully take over, and the law now requires it.",
  },
  {
    id: "design",
    name: "Design",
    color: "var(--color-orange)",
    bar: { left: 0, width: 35, align: "start" },
    body: "Owning the decision, not the deliverable: pricing work when clients think AI makes it quick, the missing first rung for junior designers, and the return of human craft.",
  },
  {
    id: "design-engineering",
    name: "Design Engineering",
    color: "var(--color-cyan)",
    bar: { left: 35, width: 65, align: "end" },
    body: "The share of designers doing development work doubled to 41% in a year. Prototypes run on real code, handoff becomes a code review, and design engineers become the default hire.",
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    color: "var(--color-crimson)",
    bar: { left: 0, width: 75, align: "center" },
    body: "Designing for AI agents: show people what the system understood and let them reject a wrong suggestion. Plus copyright, consent and who gets paid for training data.",
  },
  {
    id: "vibecoding",
    name: "Vibecoding",
    color: "var(--color-salmon)",
    bar: { left: 5, width: 84, align: "center" },
    body: "Who owns the canvas when a PM or engineer shows you an AI prototype before the brief? Where prompt-built software speeds the work up, and where it quietly breaks.",
  },
] as const;

export type TopicId = (typeof topics)[number]["id"];

export const stats2025 = [
  { value: "200+", label: "Attended in person" },
  { value: "500+", label: "Registered interest" },
  { value: "5,000+", label: "Post-event views" },
  { value: "50,000+", label: "Content impressions" },
];

// Teams the 2025 (Lagos) speakers came from.
export const speakerOrgs2025 = [
  "Kimoyo Insights",
  "AI Nova",
  "Treepz",
  "Piggyvest",
  "Paystack",
  "Multigate",
  "Africhange",
];

// TBA: 2027 speakers come from a curated UK list; slots show the topic and
// format until each name is announced.
export const speakerSlots: { topic: TopicId; format: string }[] = [
  { topic: "accessibility", format: "Keynote" },
  { topic: "design", format: "Panel" },
  { topic: "design-engineering", format: "Workshop" },
  { topic: "ai", format: "Panel" },
  { topic: "vibecoding", format: "Live build" },
  { topic: "design", format: "Fireside" },
  { topic: "ai", format: "Talk" },
  { topic: "accessibility", format: "Workshop" },
];

// DRAFT: programme shape for the day; sessions confirmed with speakers.
export const agenda: { time: string; title: string; topic?: TopicId }[] = [
  { time: "09:00", title: "Doors open, registration and coffee" },
  { time: "10:00", title: "Opening: Who designs now? Two numbers that seem to disagree" },
  { time: "10:10", title: "Part 1, The squeeze: jobs, pay and the missing first rung", topic: "design" },
  { time: "10:40", title: "Part 2, The shake-up: roles, tools and who owns the canvas", topic: "design-engineering" },
  { time: "11:15", title: "Part 3, The rules: copyright and accessibility", topic: "accessibility" },
  { time: "11:45", title: "Part 4, The new craft: designing for AI agents and trust", topic: "ai" },
  { time: "12:15", title: "Q&A: Would you hire a junior designer in 2027?" },
  { time: "12:45", title: "Lunch" },
  { time: "14:00", title: "Workshop: A day in the life of an AI-native designer, live demo", topic: "vibecoding" },
  { time: "14:30", title: "Hands-on build in teams of three: designer, engineer, user", topic: "design-engineering" },
  { time: "15:30", title: "Test, critique and debrief: what did the AI miss?", topic: "accessibility" },
  { time: "16:30", title: "Close: Own the decision, not the deliverable" },
  { time: "17:00", title: "Drinks" },
];

// DRAFT: ticket tiers and prices.
export const tickets = [
  {
    id: "student",
    name: "Student",
    price: "£45",
    note: "Valid student ID required at the door",
    perks: ["Full-day access", "Workshop seat (first come)", "Lunch and refreshments"],
  },
  {
    id: "general",
    name: "General",
    price: "£129",
    note: "Early-bird price until general sale",
    perks: ["Full-day access", "Reserved workshop seat", "Lunch and refreshments", "Session recordings"],
    featured: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "£299",
    note: "Limited to 30 seats",
    perks: ["Everything in General", "Front-row seating", "Speaker dinner the night before", "Event merch pack"],
  },
] as const;

export type TicketId = (typeof tickets)[number]["id"];

// Partners and sponsors shown in the strip under the hero. Add a `logo` path
// (e.g. "/images/partners/acme.svg") to show a logo instead of the name.
// TBA: 2027 partners and sponsors. Empty slots read "Your logo" until filled.
export const partners: { name: string; logo?: string }[] = [{ name: "Sections" }];

export const faqs = [
  {
    q: "Who is Design Spin-off for?",
    a: "Designers, design leaders, students and the people who hire designers. If you’re working out what your role looks like now that AI can generate a thousand options, it’s for you.",
  },
  {
    q: "Where is it happening?",
    a: "We’re planning to host Design Spin-off 2027 at Design District on the Greenwich Peninsula in London. The venue and date are confirmed by email to everyone who registers.",
  },
  {
    q: "How do I get there?",
    a: "Design District is a short walk from North Greenwich station on the Jubilee line, and close to the IFS Cloud Cable Car and Thames Clippers pier.",
  },
  {
    q: "Do I need to code for the workshop?",
    a: "No. The afternoon workshop has two tracks. Track A is no-code, using tools like Claude Design or Figma Make plus an AI chat, and ends in a clickable prototype. Track B is for people comfortable in a code editor and ends with a feature running locally and a pull request.",
  },
  {
    q: "Is there a virtual option?",
    a: "The day is in person. Main-stage sessions are recorded and published after the event, and General and VIP tickets include access to the recordings.",
  },
  {
    q: "Can I get a refund or transfer my ticket?",
    a: "You can transfer your ticket to someone else at no cost up to 48 hours before the event. Refunds are available up to 14 days before the event.",
  },
  {
    q: "Who are the speakers?",
    a: "Speakers are invited from a curated list of UK designers, design engineers and design leaders, covering all five topics. We announce names in stages; register and we’ll email you as each one is confirmed.",
  },
  {
    q: "Do you offer group or team tickets?",
    a: "Yes. Teams of five or more get 15% off General tickets. Choose Tickets in the contact form and we’ll send an invoice.",
  },
];

// Design Spin-off 2025 (Lagos), from the 2025 partner deck. Used on the
// Journey page.
export const recap2025 = {
  speakers: [
    { name: "Namnso Ukpanah", role: "Chief Design Officer", org: "Kimoyo Insights" },
    { name: "Damilare Fakorede", role: "Founder", org: "AI Nova" },
    { name: "Isreal Sobaloju", role: "Design Lead", org: "Treepz" },
    { name: "Azeez Adeniran", role: "Engineering Manager", org: "Piggyvest" },
    { name: "Frank Ikemefuna", role: "Global Influence", org: "Creative Economy" },
    { name: "Samuel Adehoun", role: "Product Manager", org: "Paystack" },
    { name: "Kehinde Titiloye", role: "Head, Financial Crimes Ops", org: "Multigate" },
    { name: "Emmanuel Faith", role: "HR Manager", org: "Africhange" },
  ],
};

// Journey carousel: one card per chapter of the 2025 edition. Each card
// carries the headline number shown beside the carousel while it is active.
export const journeyCards = [
  {
    title: "Designing for an AI-powered ecosystem",
    body: "How AI is reshaping product design, UX and creative processes.",
    photo: { src: "/images/2025-panel.webp", alt: "Two panelists in conversation on the Design Spin-off 2025 stage" },
    stat: { value: "200+", label: "Attended in person" },
  },
  {
    title: "Finance, trade and consumer behaviour",
    body: "The evolution of trade, progressive finance and remittance in Africa.",
    photo: { src: "/images/2025-audience-qa.webp", alt: "An attendee asking a question during the Q&A" },
    stat: { value: "500+", label: "Registered interest" },
  },
  {
    title: "Compliance, regulation and trust",
    body: "The regulatory and governance frameworks shaping Africa’s AI future.",
    photo: { src: "/images/2025-host.webp", alt: "The host speaking in front of the Design Spin-off backdrop" },
    stat: { value: "5,000+", label: "Post-event views" },
  },
  {
    title: "The creative and talent economy",
    body: "Where technology, talent and creativity meet storytelling.",
    photo: { src: "/images/2025-mic.webp", alt: "A speaker holding the microphone on stage" },
    stat: { value: "50,000+", label: "Content impressions" },
  },
  {
    title: "The people in the room",
    body: "Designers, founders, fintech leaders and regulators, with eight speakers on stage.",
    photo: { src: "/images/2025-laughter.webp", alt: "Attendees laughing together between sessions" },
    stat: { value: "8", label: "Speakers on stage" },
  },
  {
    title: "The Polygon HQ, Victoria Island",
    body: "A raw, four-decade-old building that shifts from co-working hub to event venue to studio.",
    photo: { src: "/images/2025-venue-polygon-hq.webp", alt: "Rows of chairs set out inside The Polygon HQ" },
    stat: { value: "6", label: "Sponsors and partners" },
  },
];

// The opening hook from the 2027 talk outline: two numbers that seem to
// disagree. Sources as cited in the outline.
export const dilemma = {
  numbers: [
    { value: "82%", label: "of hiring leaders say their need for designers has held steady or grown", source: "Figma" },
    { value: "57%", label: "fall in graphic design job postings worldwide over the past year", source: "Via News" },
  ],
  line: "Both of these are true. Design Spin-off 2027 is about why.",
  takeaways: [
    {
      title: "Own the decision, not the deliverable",
      body: "Taste, research and judgement are what clients still pay for.",
    },
    { title: "Build systems, not just screens", body: "Design systems, prompt frameworks and trust patterns." },
    { title: "Learn the rules", body: "Accessibility and copyright are now part of design work." },
  ],
  close: "AI can generate a thousand options. Someone still has to decide which one is right, and why.",
};
