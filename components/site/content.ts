// All copy for the Design Spin-off 2027 one-pager lives here, so details can
// be confirmed in one place. Anything marked DRAFT or TBA is a placeholder;
// anything labelled 2025 comes from the 2025 partner deck.

export const event = {
  name: "Design Spin-off",
  edition: "2027",
  organiser: "Sections",
  organiserUrl: "https://hellosections.framer.website",
  // DRAFT: confirm the 2027 theme.
  theme: "Africa, by Design",
  // TBA: confirm date and venue.
  date: "2027 · Date TBA",
  city: "Lagos, Nigeria",
  venue: "Venue announced soon",
  format: "One day, in person",
  // TBA: add a public inbox. The contact section hides the address while empty.
  contactEmail: "",
};

export const nav = [
  { href: "#topics", label: "Topics" },
  { href: "#speakers", label: "Speakers" },
  { href: "#agenda", label: "Agenda" },
  { href: "#tickets", label: "Tickets" },
  { href: "#sponsor", label: "Sponsor" },
  { href: "#faqs", label: "FAQs" },
];

export const hero = {
  pill: "2025 recap",
  ticker: "200+ designers, founders and policy leaders filled Polygon HQ for Design Spin-off 2025",
  title: "Design for the Africa we’re building next",
  body: "Design Spin-off is Sections’ annual conference on the practical reality of design and product work. In 2027 we go further: the products, people and policies the continent runs on next.",
};

// The org names the 2025 speakers came from (see speakers2025).
export const speakerOrgs2025 = [
  "Kimoyo Insights",
  "AI Nova",
  "Treepz",
  "Piggyvest",
  "Paystack",
  "Multigate",
  "Africhange",
];

// DRAFT: 2027 tracks, extended from the 2025 discussion tracks.
export const topics = [
  {
    tag: "AI",
    title: "Designing AI-native products",
    body: "How AI is reshaping product design, UX and the creative process, and what good looks like when the interface writes back.",
  },
  {
    tag: "Fintech",
    title: "Money, trade and the everyday user",
    body: "Progressive finance, remittance and cross-border trade, designed for the people who actually move the money.",
  },
  {
    tag: "Policy",
    title: "Trust, compliance and regulation",
    body: "The governance frameworks shaping Africa’s AI future, and how designers turn rules into products people trust.",
  },
  {
    tag: "Culture",
    title: "The creative and talent economy",
    body: "Where technology, talent and storytelling meet, and how African creative work travels the world.",
  },
  {
    tag: "Craft",
    title: "Design leadership and craft",
    body: "Building teams, systems and taste: what senior designers do differently, from critique to roadmap.",
  },
  {
    tag: "Access",
    title: "Designing for low bandwidth, high stakes",
    body: "Research, accessibility and performance for users on patchy networks, shared phones and second languages.",
  },
];

export const stats2025 = [
  { value: "200+", label: "Attended in person" },
  { value: "500+", label: "Registered interest" },
  { value: "5,000+", label: "Post-event views" },
  { value: "50,000+", label: "Content impressions" },
];

export const speakers2025 = [
  { name: "Namnso Ukpanah", role: "Chief Design Officer", org: "Kimoyo Insights" },
  { name: "Damilare Fakorede", role: "Founder", org: "AI Nova" },
  { name: "Isreal Sobaloju", role: "Design Lead", org: "Treepz" },
  { name: "Azeez Adeniran", role: "Engineering Manager", org: "Piggyvest" },
  { name: "Frank Ikemefuna", role: "Global Influence", org: "Creative Economy" },
  { name: "Samuel Adehoun", role: "Product Manager", org: "Paystack" },
  { name: "Kehinde Titiloye", role: "Head, Financial Crimes Ops", org: "Multigate" },
  { name: "Emmanuel Faith", role: "HR Manager", org: "Africhange" },
];

// DRAFT: programme shape for the day; sessions confirmed with speakers.
export const agenda = [
  { time: "09:00", kind: "Arrivals", title: "Doors open, registration and coffee" },
  { time: "10:00", kind: "Keynote", title: "Opening keynote: Africa, by Design" },
  { time: "10:45", kind: "Panel", title: "Designing AI-native products for African users" },
  { time: "11:45", kind: "Fireside", title: "Money, trade and the everyday user" },
  { time: "12:45", kind: "Break", title: "Lunch and portfolio walk" },
  { time: "14:00", kind: "Workshops", title: "Design systems for fintech · Research on low bandwidth" },
  { time: "15:30", kind: "Panel", title: "Trust, compliance and regulation in an AI Africa" },
  { time: "16:30", kind: "Showcase", title: "The creative and talent economy" },
  { time: "17:30", kind: "Social", title: "Closing remarks and networking mixer" },
];

// DRAFT: ticket tiers and prices.
export const tickets = [
  {
    id: "student",
    name: "Student",
    price: "₦15,000",
    note: "Valid student ID required at the door",
    perks: ["Full-day access", "Workshop seat (first come)", "Lunch and refreshments"],
  },
  {
    id: "general",
    name: "General",
    price: "₦35,000",
    note: "Early-bird price until tickets go on general sale",
    perks: ["Full-day access", "Reserved workshop seat", "Lunch and refreshments", "Session recordings"],
    featured: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "₦90,000",
    note: "Limited to 30 seats",
    perks: ["Everything in General", "Front-row seating", "Speaker dinner the night before", "Event merch pack"],
  },
] as const;

export type TicketId = (typeof tickets)[number]["id"];

export const sponsorValue = [
  {
    title: "Brand visibility",
    body: "Lead-partner placement across event materials, digital promotion and YouTube broadcasts.",
  },
  { title: "Thought leadership", body: "A keynote slot for your leadership on the main stage." },
  {
    title: "Ecosystem access",
    body: "Direct time with senior product leaders, fintech innovators and compliance experts.",
  },
  {
    title: "Content amplification",
    body: "Co-branded video, clips, insights and reports distributed after the event.",
  },
  { title: "Talent advantage", body: "Be seen as an employer of choice by top African product and design talent." },
];

// DRAFT: partnership tiers. The headline package comes from the 2025 deck.
export const sponsorTiers = [
  {
    id: "headline",
    name: "Headline partner",
    slots: "1 available",
    perks: [
      "Naming rights: “Design Spin-off 2027 in partnership with you”",
      "Keynote slot for an executive",
      "Top logo placement on site, social, banners and streams",
      "Co-branded post-event clips and report",
    ],
  },
  {
    id: "track",
    name: "Track partner",
    slots: "3 available",
    perks: [
      "Own one of the six topic tracks",
      "Panel seat in your track",
      "Logo on stage and site",
      "Curated networking session",
    ],
  },
  {
    id: "community",
    name: "Community partner",
    slots: "Open",
    perks: ["Logo on site and social", "Ticket allocation for your community", "Shout-out on stage"],
  },
];

export const faqs = [
  {
    q: "Who is Design Spin-off for?",
    a: "Senior and mid-level product designers, design and innovation leaders in fintech, compliance and regulatory leads, founders, investors and anyone building AI products for African users.",
  },
  {
    q: "When and where is it happening?",
    a: "Design Spin-off 2027 takes place in Lagos. We’ll announce the date and venue first to people who register interest. The 2025 edition was held at Polygon HQ on Victoria Island.",
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
    q: "How do I apply to speak?",
    a: "Send us a short pitch through the contact form with the topic set to Speaking. Tell us the track, your angle and one thing the audience will be able to do afterwards.",
  },
  {
    q: "Do you offer group or team tickets?",
    a: "Yes. Teams of five or more get 15% off General tickets. Choose Tickets as the topic in the contact form and we’ll send an invoice.",
  },
];
