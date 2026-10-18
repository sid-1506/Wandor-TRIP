export const navLinks = [
  { label: "DISCOVER", href: "#discover" },
  { label: "PRICING", href: "#pricing" },
  { label: "FAQS", href: "#faqs" },
];

export const samplePrompts = [
  "I'm planning a 7-day trip to Japan in October. I love food, hidden cafes and scenic hikes...",
  "A romantic long weekend in the Amalfi Coast with cliffside sunset dining and private boat tours...",
  "10 days road-tripping through the Scottish Highlands, exploring ancient castles and cozy coastal inns...",
  "A 5-day cultural deep-dive in Rome, focusing on hidden courtyards, Renaissance art and authentic trattorias...",
];

export const featureRows = [
  {
    id: "plan-around-you",
    tag: "PLAN AROUND YOU",
    tagColor: "var(--terracotta)",
    title: "Tailored to your curiosity, rhythm and passions",
    paragraph:
      "Tell Wandor where you're going, what you love and how you like to travel. It builds a trip that feels like yours, not a generic checklist.",
    reverse: false,
  },
  {
    id: "trip-figured-out",
    tag: "YOUR TRIP FIGURED OUT",
    tagColor: "var(--olive-dark)",
    title: "Every hour connected with effortless flow",
    paragraph:
      "From places to see to things worth doing, Wandor turns your ideas into a day-by-day itinerary you can actually follow.",
    reverse: true,
  },
  {
    id: "less-planning",
    tag: "LESS PLANNING, MORE WANDERING",
    tagColor: "var(--terracotta-dark)",
    title: "No tabs, no chaos. Just pure discovery",
    paragraph:
      "Skip the endless tabs and group chats. Wandor keeps every stop, booking and note organized so you can enjoy the trip itself.",
    reverse: false,
  },
];

export const romeGuideItems = [
  {
    id: 1,
    title: "Colosseum & Ludus Magnus",
    meta: "Colosseum • 2h • Ancient Rome",
    badge: "Must See",
    rating: "4.9",
    category: "Heritage",
  },
  {
    id: 2,
    title: "Trevi Fountain at Sunrise",
    meta: "Trevi Fountain • 45m • Baroque Landmark",
    badge: "Scenic Spot",
    rating: "4.8",
    category: "Photo",
  },
  {
    id: 3,
    title: "St. Peter's Dome Climb",
    meta: "St. Peter's Basilica • 3h • Vatican City",
    badge: "Panoramic",
    rating: "4.9",
    category: "Architecture",
  },
  {
    id: 4,
    title: "The Pantheon Oculus",
    meta: "Pantheon • 1h • Classical Rome",
    badge: "Architectural Marvel",
    rating: "4.9",
    category: "Heritage",
  },
  {
    id: 5,
    title: "Roman Forum & Palatine Hill",
    meta: "Roman Forum • 2.5h • Imperial Ruins",
    badge: "Archaeology",
    rating: "4.7",
    category: "History",
  },
  {
    id: 6,
    title: "Spanish Steps & Villa Medici",
    meta: "Spanish Steps • 45m • Historic Piazza",
    badge: "Leisure",
    rating: "4.8",
    category: "Culture",
  },
];

export const hotels = [
  {
    name: "Hotel Hassler Roma",
    location: "Trinità dei Monti 6, Rome",
    price: "$420",
    rating: "4.95",
    reviews: "328",
    highlight: "Panoramic terrace atop Spanish Steps",
    badge: "Wandor Pick",
  },
  {
    name: "Portrait Roma",
    location: "Via Bocca di Leone 23, Rome",
    price: "$380",
    rating: "4.9",
    reviews: "194",
    highlight: "Ferragamo boutique suites",
  },
  {
    name: "Hotel de Russie",
    location: "Via del Babuino 9, Rome",
    price: "$490",
    rating: "4.92",
    reviews: "260",
    highlight: "Terraced secret pine gardens",
  },
  {
    name: "Villa Spalletti Trivelli",
    location: "Via Piacenza 4, Rome",
    price: "$360",
    rating: "4.88",
    reviews: "142",
    highlight: "Historic noble residence & spa",
  },
];

export const footerLinks = {
  EXPLORE: [
    { label: "Destinations", href: "#" },
    { label: "Curated Itineraries", href: "#" },
    { label: "Boutique Stays", href: "#" },
    { label: "Unique Experiences", href: "#" },
  ],
  COMPANY: [
    { label: "About Wandor", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Travel Journal", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  LEGAL: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};

export const footerLandmarks = [
  { id: "sagrada-familia", name: "Sagrada Família", depth: 1.15, offset: -20 },
  { id: "sydney-opera", name: "Sydney Opera House", depth: 0.9, offset: 15 },
  { id: "eiffel-tower", name: "Eiffel Tower", depth: 1.25, offset: -10 },
  { id: "pyramids-giza", name: "Pyramids of Giza", depth: 0.85, offset: 25 },
  { id: "taj-mahal-mini", name: "Taj Mahal", depth: 1.1, offset: -5 },
  { id: "colosseum-mini", name: "Colosseum", depth: 0.95, offset: 10 },
  { id: "big-ben", name: "Big Ben", depth: 1.2, offset: -15 },
  { id: "torii-gate", name: "Torii Gate", depth: 1.05, offset: 20 },
  { id: "statue-liberty", name: "Statue of Liberty", depth: 1.3, offset: -25 },
];
