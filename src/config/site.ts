/**
 * Central site configuration for the landing experience.
 *
 * All outward-facing links and copy live here so content can be edited
 * without touching components. Public links read from `NEXT_PUBLIC_*`
 * env vars where set, falling back to sensible placeholders.
 */

const env = (key: string, fallback: string) =>
  (process.env[key] ?? "").trim() || fallback;

export type ValueProp = {
  title: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export const siteConfig = {
  brand: {
    name: env("NEXT_PUBLIC_BRAND_NAME", "Yadu Krishna"),
    tagline: "Scroll-stopping reels & branded films for growth-focused brands",
    url: env("NEXT_PUBLIC_SITE_URL", "https://example.com"),
  },

  hero: {
    eyebrow: "Multimedia storytelling studio",
    headline: "Video that turns attention into booked revenue.",
    subhead:
      "I produce conversion-driven reels, ads, and brand films for hospitality, automotive, events, and fashion teams — fast, on-brief, and built to perform.",
    primaryCtaLabel: "Book a free intro call",
    secondaryCtaLabel: "Message on WhatsApp",
  },

  valueProps: [
    {
      title: "Niche-fluent creative",
      description:
        "Hospitality, auto, events, and fashion — I speak each market's visual language and know what makes its audience stop scrolling.",
    },
    {
      title: "Built to convert",
      description:
        "Every cut is shaped around a goal: bookings, walk-ins, or sign-ups. Hooks, pacing, and CTAs are engineered, not guessed.",
    },
    {
      title: "Fast turnaround",
      description:
        "Templated workflows and AI-assisted production mean polished deliverables in days, not weeks — without cutting corners.",
    },
    {
      title: "End-to-end delivery",
      description:
        "From concept and shoot direction to edit, grade, and platform-ready exports, you get a single accountable partner.",
    },
  ] as ValueProp[],

  reel: {
    heading: "See the work in motion",
    subheading: "A short reel of recent brand and campaign edits.",
    // YouTube video ID (the part after watch?v=). Empty shows a placeholder.
    youtubeId: env("NEXT_PUBLIC_YOUTUBE_REEL_ID", ""),
  },

  cta: {
    // Digits only, international format (no +, spaces, or dashes).
    whatsappNumber: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "919999999999"),
    whatsappMessage:
      "Hi! I saw your portfolio and would like to discuss a project.",
    bookingUrl: env("NEXT_PUBLIC_BOOKING_URL", "https://calendar.app.google/"),
  },

  contact: {
    // Formspree form ID, e.g. "xmyzabcd" -> posts to https://formspree.io/f/xmyzabcd
    formspreeId: env("NEXT_PUBLIC_FORMSPREE_ID", ""),
    niches: [
      { value: "hospitality", label: "Hospitality" },
      { value: "automotive", label: "Automotive" },
      { value: "events", label: "Events" },
      { value: "fashion", label: "Fashion" },
      { value: "other", label: "Other" },
    ] as SelectOption[],
    budgets: [
      { value: "under-50k", label: "Under ₹50k" },
      { value: "50k-150k", label: "₹50k – ₹1.5L" },
      { value: "150k-500k", label: "₹1.5L – ₹5L" },
      { value: "500k-plus", label: "₹5L+" },
    ] as SelectOption[],
    timelines: [
      { value: "asap", label: "ASAP" },
      { value: "1-month", label: "Within a month" },
      { value: "1-3-months", label: "1 – 3 months" },
      { value: "exploring", label: "Just exploring" },
    ] as SelectOption[],
  },

  social: [
    {
      label: "Instagram",
      href: env("NEXT_PUBLIC_INSTAGRAM_URL", "https://instagram.com/"),
    },
    {
      label: "YouTube",
      href: env("NEXT_PUBLIC_YOUTUBE_URL", "https://youtube.com/"),
    },
    {
      label: "LinkedIn",
      href: env("NEXT_PUBLIC_LINKEDIN_URL", "https://linkedin.com/"),
    },
    {
      label: "Behance",
      href: env("NEXT_PUBLIC_BEHANCE_URL", "https://behance.net/"),
    },
  ] as SocialLink[],

  portfolio: {
    heading: "Selected work",
    subheading:
      "A snapshot of brands and campaigns. Full case studies coming soon.",
    items: [
      { title: "Boutique hotel launch", category: "Hospitality" },
      { title: "Dealership test-drive campaign", category: "Automotive" },
      { title: "Music festival aftermovie", category: "Events" },
      { title: "Seasonal lookbook film", category: "Fashion" },
      { title: "Restaurant week promo", category: "Hospitality" },
      { title: "EV reveal teaser", category: "Automotive" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a click-to-chat WhatsApp deep link. */
export function whatsappHref(): string {
  const { whatsappNumber, whatsappMessage } = siteConfig.cta;
  const text = encodeURIComponent(whatsappMessage);
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}

/** Resolve the Formspree endpoint, or null when unconfigured. */
export function formspreeEndpoint(): string | null {
  const id = siteConfig.contact.formspreeId;
  return id ? `https://formspree.io/f/${id}` : null;
}
