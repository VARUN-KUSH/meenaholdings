// Placeholder content — replace with real apps, numbers and people.

export type App = {
  id: string;
  name: string;
  niche: string;
  color: string;
  tagline: string;
  description: string;
  rating: string;
  downloads: string;
  launched: string;
  screen: { sub: string; label: string; big: string; note: string; bars: number[] };
};

export const apps: App[] = [
  {
    id: "pulse",
    name: "Pulse",
    niche: "Health & Fitness",
    color: "#ff6a3d",
    tagline: "Workouts that adapt to you.",
    description: "Adaptive training plans that adjust to your energy, schedule and progress — every single day.",
    rating: "4.8",
    downloads: "8M+",
    launched: "2022",
    screen: { sub: "Good morning", label: "Today's streak", big: "42 days", note: "Personal best", bars: [40, 65, 50, 80, 95, 60, 70] },
  },
  {
    id: "ledger",
    name: "Ledger",
    niche: "Finance",
    color: "#3ddc97",
    tagline: "Budgeting that doesn't feel like homework.",
    description: "Connect your accounts once and get a calm, clear view of where every dollar goes.",
    rating: "4.7",
    downloads: "5M+",
    launched: "2022",
    screen: { sub: "October", label: "Left to spend", big: "$1,284", note: "On track this month", bars: [70, 55, 60, 45, 50, 35, 30] },
  },
  {
    id: "lumen",
    name: "Lumen",
    niche: "Productivity",
    color: "#ffd23f",
    tagline: "Deep focus, one session at a time.",
    description: "A focus timer, task list and soundscape in one — designed to get you into flow and keep you there.",
    rating: "4.9",
    downloads: "6M+",
    launched: "2023",
    screen: { sub: "Tuesday", label: "Focus today", big: "3h 20m", note: "+18% vs last week", bars: [30, 50, 85, 60, 75, 90, 45] },
  },
  {
    id: "lingo-leap",
    name: "Lingo Leap",
    niche: "Education",
    color: "#8b7bff",
    tagline: "A new language in ten minutes a day.",
    description: "Bite-sized lessons, real conversations and spaced repetition that actually sticks.",
    rating: "4.8",
    downloads: "11M+",
    launched: "2021",
    screen: { sub: "Spanish", label: "Level 4", big: "1,920 XP", note: "Lesson 12 of 30", bars: [55, 60, 70, 65, 80, 85, 95] },
  },
  {
    id: "drift",
    name: "Drift",
    niche: "Wellness",
    color: "#5ec2ff",
    tagline: "Sleep better, starting tonight.",
    description: "Sleep stories, smart alarms and gentle wind-down routines backed by sleep science.",
    rating: "4.8",
    downloads: "4M+",
    launched: "2023",
    screen: { sub: "Last night", label: "Sleep score", big: "92", note: "7h 48m in bed", bars: [60, 80, 90, 70, 85, 95, 75] },
  },
  {
    id: "petal",
    name: "Petal",
    niche: "Lifestyle",
    color: "#ff8ad1",
    tagline: "A gentle nudge for every plant you own.",
    description: "Snap a photo, identify the plant and get watering reminders tuned to your home's light.",
    rating: "4.7",
    downloads: "2M+",
    launched: "2024",
    screen: { sub: "My jungle", label: "Needs water", big: "3 plants", note: "Monstera, Fern, Pothos", bars: [30, 40, 35, 60, 45, 50, 40] },
  },
  {
    id: "wander",
    name: "Wander",
    niche: "Travel",
    color: "#ffa94d",
    tagline: "Group trips without the group-chat chaos.",
    description: "Plan, vote, split costs and build day-by-day itineraries together, in one shared space.",
    rating: "4.6",
    downloads: "3M+",
    launched: "2024",
    screen: { sub: "Lisbon", label: "Trip in", big: "12 days", note: "4 friends · 23 spots", bars: [20, 35, 50, 45, 70, 85, 90] },
  },
  {
    id: "tiny-tales",
    name: "Tiny Tales",
    niche: "Kids",
    color: "#b8f34a",
    tagline: "Bedtime stories that grow with your child.",
    description: "Illustrated, narrated stories that adapt to your child's age, interests and reading level.",
    rating: "4.9",
    downloads: "3M+",
    launched: "2025",
    screen: { sub: "Tonight", label: "Story time", big: "Moon Fox", note: "8 min · Ages 3–6", bars: [50, 45, 60, 55, 65, 70, 80] },
  },
  {
    id: "mealwise",
    name: "Mealwise",
    niche: "Food",
    color: "#ff6f91",
    tagline: "Dinner, sorted from what's in your fridge.",
    description: "Weekly meal plans and grocery lists built around what you already have and what you love.",
    rating: "4.7",
    downloads: "2M+",
    launched: "2025",
    screen: { sub: "This week", label: "Dinner tonight", big: "Miso salmon", note: "25 min · 540 kcal", bars: [45, 55, 40, 65, 50, 70, 60] },
  },
];

export const niches = Array.from(new Set(apps.map((a) => a.niche)));

export const stats = [
  { value: 25, suffix: "+", label: "Apps launched" },
  { value: 40, suffix: "M", label: "Downloads worldwide" },
  { value: 150, suffix: "+", label: "Countries reached" },
  { value: 4.8, suffix: "★", label: "Average store rating", decimals: 1 },
];

export const process = [
  {
    title: "Spot the gap",
    text: "We study app stores, search trends and real user complaints to find niches where people are underserved.",
    tags: ["Market research", "Keyword data", "User interviews"],
  },
  {
    title: "Prototype fast",
    text: "Small squads ship a working prototype in weeks, not months, then put it in front of real users immediately.",
    tags: ["Design sprints", "Clickable prototypes", "Usability tests"],
  },
  {
    title: "Launch & learn",
    text: "We launch lean, instrument everything and let data — not opinions — decide what gets built next.",
    tags: ["A/B testing", "Analytics", "ASO"],
  },
  {
    title: "Scale what works",
    text: "Winners get more people, more polish and more markets. Everything else teaches us how to build the next one.",
    tags: ["Growth", "Localization", "Monetization"],
  },
];

export const values = [
  { title: "Users over everything", text: "We earn attention by being genuinely useful. No dark patterns, no shortcuts." },
  { title: "Small teams, big ownership", text: "Every app is run by a tight squad who own it end to end — from idea to revenue." },
  { title: "Craft is a feature", text: "Polish, motion and detail are why people choose one app over another. We sweat them." },
  { title: "Data decides", text: "Strong opinions, loosely held. We test fast and let the numbers settle the debate." },
];

export const timeline = [
  { year: "2021", title: "The first app", text: "meenaholdings starts with one product and a simple belief: great apps can come from small, focused teams." },
  { year: "2022", title: "Going multi-niche", text: "We launch in health and finance and build the playbook we still use today." },
  { year: "2023", title: "10 million downloads", text: "Our portfolio crosses ten million downloads across more than 100 countries." },
  { year: "2024", title: "A studio, not a single app", text: "Dedicated squads, shared infrastructure and a growth engine that lets us launch faster." },
  { year: "2026", title: "Just getting started", text: "25+ apps, nine niches and many more ideas in the pipeline." },
];

export const team = [
  { name: "Founder", role: "Founder & CEO", color: "#d4ff3a", initials: "MH" },
  { name: "Head of Product", role: "Product", color: "#8b7bff", initials: "HP" },
  { name: "Head of Design", role: "Design", color: "#ff8ad1", initials: "HD" },
  { name: "Head of Engineering", role: "Engineering", color: "#5ec2ff", initials: "HE" },
  { name: "Head of Growth", role: "Growth & Marketing", color: "#ffa94d", initials: "HG" },
  { name: "Lead iOS Engineer", role: "Engineering", color: "#3ddc97", initials: "iOS" },
  { name: "Lead Android Engineer", role: "Engineering", color: "#ffd23f", initials: "AN" },
  { name: "Data Lead", role: "Analytics", color: "#ff6a3d", initials: "DL" },
];

export const perks = [
  { icon: "🌍", title: "Remote-friendly", text: "Work from wherever you do your best thinking." },
  { icon: "🚀", title: "Ship weekly", text: "Your work reaches millions of users within days, not quarters." },
  { icon: "📈", title: "Profit sharing", text: "When the apps win, the team that built them wins too." },
  { icon: "📚", title: "Learning budget", text: "Courses, books and conferences — on us, every year." },
  { icon: "🩺", title: "Health cover", text: "Comprehensive health insurance for you and your family." },
  { icon: "🏝️", title: "Real time off", text: "Generous leave plus a studio-wide reset week every year." },
];

export const roles = [
  {
    title: "Senior iOS Engineer",
    team: "Engineering",
    location: "Remote / Hybrid",
    about: "Build polished, high-performance SwiftUI experiences used by millions across our portfolio.",
    looking: ["5+ years building iOS apps", "Deep SwiftUI & Swift concurrency", "An eye for motion and detail"],
  },
  {
    title: "Senior Android Engineer",
    team: "Engineering",
    location: "Remote / Hybrid",
    about: "Own Android across multiple apps, from architecture to the last pixel of a transition.",
    looking: ["5+ years with Kotlin", "Jetpack Compose in production", "Experience shipping to large audiences"],
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    about: "Shape new apps from first sketch to launch, and keep improving them with real user data.",
    looking: ["A portfolio of shipped mobile products", "Strong interaction & motion skills", "Comfort with fast iteration"],
  },
  {
    title: "Growth Marketing Manager",
    team: "Growth",
    location: "Hybrid",
    about: "Scale user acquisition across paid, ASO and lifecycle channels for our fastest-growing apps.",
    looking: ["3+ years in mobile growth", "Hands-on with paid social & ASO", "Fluent in cohorts and LTV"],
  },
  {
    title: "Product Analyst",
    team: "Data",
    location: "Remote",
    about: "Turn product data into decisions — experiments, funnels and the insights that find our next app.",
    looking: ["Strong SQL & experimentation", "Mobile analytics experience", "Clear storytelling with data"],
  },
];
