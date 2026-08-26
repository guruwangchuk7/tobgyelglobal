"use client";

import { supabase, isSupabaseConfigured } from "./supabaseClient";

// CMS Content Schemas (Full A - Z Coverage)

export interface TradeEventCMS {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  venue: string;
  image: string;
  description: string;
  highlights: string[];
  sectors: string[];
  status: "Draft" | "Published" | "Archived";
  featuredOnHome: boolean;
  updatedAt: string;
}

export interface NewsArticleCMS {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  mediaContactEmail: string;
  status: "Draft" | "Published" | "Archived";
  featuredOnHome: boolean;
  updatedAt: string;
}

export interface PartnerLogoCMS {
  id: string;
  name: string;
  category: "Institutional Patron" | "Corporate Partner";
  logoUrl: string;
  websiteUrl?: string;
  displayOrder: number;
  active: boolean;
}

export interface HeroConfigCMS {
  headlineMain: string;
  headlineHighlight1: string;
  headlineHighlight2: string;
  subtitle: string;
  backgroundImageUrl: string;
  stats: Array<{
    title: string;
    subtitle: string;
    iconName: string;
  }>;
}

export interface SponsorshipTierCMS {
  id: string;
  tierName: string;
  price: string;
  tagline: string;
  perks: string[];
  badgeColor: string;
  active: boolean;
}

export interface AboutCMS {
  title: string;
  subtitle: string;
  visionStatement: string;
  missionStatement: string;
  pillars: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
}

export interface ContactConfigCMS {
  sectionTitle: string;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  cityCountry: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailGeneral: string;
  emailSupport: string;
  websiteUrl: string;
  formTitle: string;
  formButtonLabel: string;
  workingHours: string;
  mapEmbedUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface RegulationsCMS {
  title: string;
  subtitle: string;
  guidelines: Array<{
    id: string;
    category: string;
    title: string;
    details: string;
  }>;
}

export interface WhyExhibitCMS {
  title: string;
  subtitle?: string;
  ctaText: string;
  points: Array<{ title: string; description?: string }>;
}

export interface ParticipantsCMS {
  title: string;
  subtitle?: string;
  links: Array<{ title: string; href?: string }>;
}

export interface VisitCMS {
  title: string;
  subtitle?: string;
  ctaText: string;
  cards: Array<{ title: string; description?: string }>;
}

export interface PartnersCMS {
  title: string;
  subtitle?: string;
  ctaText: string;
  partners: Array<{ name: string; category: string }>;
}

export interface ProductAdCMS {
  id: string;
  title: string;
  companyName: string;
  category: "Food & Organic" | "Machinery & Tech" | "Handicrafts & Luxury" | "Services & Tourism";
  image: string;
  description: string;
  badgeTag: string;
  ctaText: string;
  ctaUrl: string;
  active: boolean;
}

const CMS_KEYS = {
  EVENTS: "tobgyel_cms_events",
  NEWS: "tobgyel_cms_news",
  PARTNERS: "tobgyel_cms_partners",
  HERO: "tobgyel_cms_hero",
  TIERS: "tobgyel_cms_tiers",
  ABOUT: "tobgyel_cms_about",
  CONTACT: "tobgyel_cms_contact",
  REGULATIONS: "tobgyel_cms_regulations",
  WHY_EXHIBIT: "tobgyel_cms_why_exhibit",
  PARTICIPANTS: "tobgyel_cms_participants",
  VISIT: "tobgyel_cms_visit",
  PRODUCT_ADS: "tobgyel_cms_product_ads",
  PAGE_VIEWS: "tobgyel_cms_page_views",
};

export const INITIAL_PRODUCT_ADS: ProductAdCMS[] = [
  {
    id: "ad-1",
    title: "Organic Bhutanese Cordyceps & Herbal Tea Range",
    companyName: "Himalayan Bio Products Bhutan",
    category: "Food & Organic",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "Premium wild-harvested Cordyceps Sinensis and high-altitude organic green herbal infusions certified by Bhutan Food Authority.",
    badgeTag: "Featured Exhibitor Ad",
    ctaText: "Inquire Booth Samples",
    ctaUrl: "/register/exhibitor",
    active: true,
  },
  {
    id: "ad-2",
    title: "Solar Agri-Machinery & Micro-Hydro Systems",
    companyName: "Druk Green Tech Solutions Ltd.",
    category: "Machinery & Tech",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "Eco-friendly solar powered grain dryers, mountain farm tractors, and zero-emission micro-hydro electricity generators.",
    badgeTag: "Tech Showcase",
    ctaText: "Request Tech Demo",
    ctaUrl: "/register/exhibitor",
    active: true,
  },
  {
    id: "ad-3",
    title: "Hand-Woven Royal Silk Kishuthara Textiles",
    companyName: "Thimphu Heritage Weavers Guild",
    category: "Handicrafts & Luxury",
    image: "https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80",
    description: "Exquisite traditional Bhutanese handloom weaves, silk scarves, and cultural artifact collectibles for global collectors.",
    badgeTag: "Heritage Crafts",
    ctaText: "View Collection",
    ctaUrl: "/register/visitor",
    active: true,
  },
  {
    id: "ad-4",
    title: "VIP Exhibition Logistics & Paro Flight Concierge",
    companyName: "Dragon Express Freight & Travel",
    category: "Services & Tourism",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    description: "Customs dry-port clearance, refrigerated display transport, and discounted Drukair / Bhutan Airlines delegate bookings.",
    badgeTag: "Official Partner",
    ctaText: "Book Travel Package",
    ctaUrl: "/visit",
    active: true,
  },
];

export const INITIAL_WHY_EXHIBIT: WhyExhibitCMS = {
  title: "WHY EXHIBIT?",
  ctaText: "Learn More",
  points: [
    { title: "Meet qualified buyers" },
    { title: "Expand into Bhutan" },
    { title: "Connect with regional partners" },
    { title: "Increase brand visibility" },
    { title: "Launch products & services" },
  ],
};

export const INITIAL_PARTICIPANTS: ParticipantsCMS = {
  title: "INTERNATIONAL PARTICIPANTS",
  links: [
    { title: "Visa & Entry" },
    { title: "Hotels" },
    { title: "Logistics" },
    { title: "Customs" },
    { title: "Tax Information" },
    { title: "Participant Guide" },
  ],
};

export const INITIAL_VISIT: VisitCMS = {
  title: "PLAN YOUR VISIT",
  ctaText: "Visitor Guide",
  cards: [
    { title: "Travel Information" },
    { title: "Accommodation" },
    { title: "Transportation" },
    { title: "Weather" },
    { title: "Useful Contacts" },
    { title: "Visitor Guide" },
  ],
};

export const INITIAL_PARTNERS: PartnersCMS = {
  title: "OUR PARTNERS & SPONSORS",
  ctaText: "Become A Sponsor",
  partners: [
    { name: "Bhutan Chamber of Commerce & Industry", category: "Institutional Patron" },
    { name: "Drukair Corporation Ltd.", category: "Aviation Partner" },
    { name: "Bhutan Telecom Ltd.", category: "Connectivity Partner" },
  ],
};

// Initial Seed Data (Pre-populated from hardcoded data so public site never breaks)

export const INITIAL_EVENTS: TradeEventCMS[] = [
  {
    id: "himalayan-food-trade-innovation-expo-2026",
    slug: "himalayan-food-trade-innovation-expo-2026",
    title: "HIMALAYAN FOOD, TRADE & INNOVATION EXPO",
    category: "Trade • Technology • Tourism • Experience",
    date: "Dec 30, 2026 – Jan 3, 2027 (5 Days)",
    location: "Samtse, Bhutan",
    venue: "Samtse International Exhibition Ground, Samtse, Bhutan",
    image: "/himalayan-food-trade-innovation-expo.png",
    description: "Premier tri-nation exhibition (Bhutan, India & Nepal) connecting Agriculture & Food Trade, Machinery & Technology, Culinary Training, Tourism & Adventure, and Youth & Digital Experience.",
    highlights: [
      "BHUTAN • INDIA • NEPAL International Pavilions",
      "AGRICULTURE & FOOD TRADE: Promoting local produce & agri-business",
      "MACHINERY & TECHNOLOGY: Showcasing equipment & smart solutions",
      "CULINARY TRAINING: 15-day training & grand challenge",
      "TOURISM & ADVENTURE: B2B networking & destination showcase",
      "YOUTH & DIGITAL EXPERIENCE: Gaming, 3D/VR, anime & digital fun",
    ],
    sectors: [
      "Agriculture & Food Trade",
      "Machinery & Technology",
      "Culinary Training & Grand Challenge",
      "Tourism & Adventure",
      "Youth & Digital Experience (Gaming, 3D/VR)",
    ],
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "1",
    slug: "bin-trade-showcase-2027",
    title: "BIN TRADE SHOWCASE 2027",
    category: "Construction | Food | Tourism | Technology",
    date: "May 20 – 23, 2027",
    location: "Phuentsholing, Bhutan",
    venue: "Phuentsholing International Expo Pavilion, Chhukha District, Bhutan",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    description: "The premier international trade showcase connecting Himalayan and South Asian enterprises across construction, green technology, tourism, organic food processing, and logistics.",
    highlights: [
      "Over 300 international & regional trade exhibition booths",
      "Dedicated B2B matchmaking lounges & investor summits",
      "Official government delegation opening ceremony & ribbon cutting",
      "Product launch pavilion, live machinery demos & networking dinners",
    ],
    sectors: [
      "Building & Construction Materials",
      "Organic Agriculture & Food Processing",
      "Sustainable Eco-Tourism & Hospitality",
      "Information Technology & Smart Solutions",
      "Logistics & Heavy Machinery",
    ],
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    slug: "himalayan-food-culture-festival",
    title: "HIMALAYAN FOOD & CULTURE FESTIVAL",
    category: "Celebrating Heritage, Food, Arts & Traditions",
    date: "Oct 10 – 14, 2027",
    location: "Thimphu, Bhutan",
    venue: "Centenary Farmers Market & Expo Grounds, Thimphu, Bhutan",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "A landmark cultural exhibition and culinary trade forum celebrating organic Himalayan food, traditional crafts, sustainable agriculture, and cultural heritage.",
    highlights: [
      "Organic food tasting & organic agriculture trade forums",
      "Traditional Bhutanese handicrafts & handloom textile pavilions",
      "Cultural performances & international media showcase",
      "Culinary trade networking & regional export opportunities",
    ],
    sectors: [
      "Organic Food & Beverages",
      "Handicrafts & Cultural Artifacts",
      "Traditional Herbal Products",
      "Eco-Friendly Sustainable Goods",
    ],
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
];

export const INITIAL_NEWS: NewsArticleCMS[] = [
  {
    id: "1",
    slug: "bin-trade-showcase-2027-registration-open",
    title: "BIN Trade Showcase 2027 Registration Now Open",
    date: "May 15, 2024",
    category: "Press Release | Trade & Commerce",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Official registration for the BIN Trade Showcase 2027 is officially open to domestic and international exhibitors.",
    content: [
      "Official registration for the BIN Trade Showcase 2027 is officially open to domestic and international exhibitors. The landmark trade fair will take place in Phuentsholing, Bhutan, bringing together over 300 participating enterprises across construction, green energy, technology, tourism, and organic agriculture.",
      "Exhibitors registering during the early-bird phase receive prime booth allocations inside the main pavilion, complimentary inclusion in the official exhibition catalog, and full access to our B2B matchmaking portal.",
      "The event is organized under the patronage of the Royal Government of Bhutan and supported by the Ministry of Industry, Commerce & Employment (MoICE). Delegates from India, Bangladesh, Nepal, Thailand, and East Asia are expected to participate.",
    ],
    mediaContactEmail: "info@tobgyelglobalxpos.com",
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    slug: "new-international-partnerships-announced",
    title: "New International Partnerships Announced",
    date: "May 10, 2024",
    category: "Global Alliances | Economic Growth",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Tobgyel Global Expos formalizes strategic alliances with regional chambers of commerce and international trade federations.",
    content: [
      "Tobgyel Global Expos has formalized strategic partnerships with regional commerce chambers, including the Bhutan Chamber of Commerce & Industry (BCCI) and South Asian trade federations.",
      "These bilateral agreements facilitate expedited visa processing for foreign delegates, tax exemption assistance for exhibition display samples, and dedicated transport logistics via Drukair and Bhutan Airlines.",
      "By establishing direct connections between international investors and domestic Bhutanese entrepreneurs, Tobgyel Global Expos continues to position Bhutan as a sustainable trade nexus in South Asia.",
    ],
    mediaContactEmail: "info@tobgyelglobalxpos.com",
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "3",
    slug: "bhutan-next-hub-business-investment",
    title: "Bhutan: The Next Hub for Business & Investment",
    date: "May 5, 2024",
    category: "Market Insights | Investment",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Strategic trade infrastructure and eco-conscious policies position Bhutan as a prime destination for sustainable investments.",
    content: [
      "Positioned strategically at the crossroads of South and East Asia, Bhutan is rapidly expanding its sustainable trade infrastructure.",
      "With the visionary development of the Gelephu Mindful City Special Administrative Region (SAR) and the Phuentsholing dry port expansion, international investors have unprecedented access to renewable energy projects, organic agribusiness, eco-tourism, and digital technology ventures.",
      "Tobgyel Global Expos provides the ideal platform for foreign companies to gain first-mover advantage in Bhutan's high-growth green economy.",
    ],
    mediaContactEmail: "info@tobgyelglobalxpos.com",
    status: "Published",
    featuredOnHome: true,
    updatedAt: new Date().toLocaleDateString(),
  },
];

export const INITIAL_HERO: HeroConfigCMS = {
  headlineMain: "Bhutan's Gateway to",
  headlineHighlight1: "International Trade,",
  headlineHighlight2: "Culture & Business Events",
  subtitle: "Connecting global businesses, investors, innovators, and communities through world-class exhibitions and events.",
  backgroundImageUrl: "/hero-bhutan-expo.jpg",
  stats: [
    { title: "GLOBAL NETWORK", subtitle: "Connecting Markets", iconName: "Globe" },
    { title: "1000+ BUSINESSES", subtitle: "Participating", iconName: "Users" },
    { title: "WORLD CLASS EVENTS", subtitle: "Exhibitions & Forums", iconName: "Calendar" },
    { title: "BHUTAN PHUENTSHOLING", subtitle: "Strategic Location", iconName: "MapPin" },
    { title: "GROW TOGETHER", subtitle: "Collaborate • Expand • Succeed", iconName: "TrendingUp" },
  ],
};

export const INITIAL_ABOUT: AboutCMS = {
  title: "Empowering Bhutanese Enterprises & Global Trade",
  subtitle: "Tobgyel Global Expos is Bhutan's premier international exhibition & trade event management company.",
  visionStatement: "To become the leading catalyst for international trade, economic collaboration, and sustainable business expansion in the Himalayan region.",
  missionStatement: "Providing world-class trade fair platforms, B2B matchmaking infrastructure, and cultural showcases that elevate Bhutanese products globally.",
  pillars: [
    { title: "Strategic Location", description: "Based in Phuentsholing & Thimphu, serving as Bhutan's primary commercial gateway.", iconName: "MapPin" },
    { title: "B2B Matchmaking", description: "Facilitating direct investor meetings, government dialogues, and trade contracts.", iconName: "Handshake" },
    { title: "Global Network", description: "Partnering with regional chambers of commerce across South and East Asia.", iconName: "Globe" },
    { title: "Sustainable Focus", description: "Promoting organic products, green technologies, and eco-friendly hospitality.", iconName: "Sparkles" },
  ],
};

export const INITIAL_CONTACT: ContactConfigCMS = {
  sectionTitle: "Contact Us",
  companyName: "Tobgyel Global Expos Pvt. Ltd.",
  addressLine1: "",
  addressLine2: "",
  cityCountry: "",
  phonePrimary: "+975 17933882",
  phoneSecondary: "+975 77933882",
  emailGeneral: "info@tobgyelglobalxpos.com",
  emailSupport: "info@tobgyelglobalxpos.com",
  websiteUrl: "www.tobgyelglobalxpos.com",
  formTitle: "Send Us A Message",
  formButtonLabel: "Send Message",
  workingHours: "Monday – Saturday: 9:00 AM – 6:00 PM (BTT)",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.68305741639!2d89.3800!3d26.8600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4468f77341e3d%3A0x6b44f2d34a5d8b!2sPhuentsholing%2C%20Bhutan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

export const INITIAL_REGULATIONS: RegulationsCMS = {
  title: "Exhibitor Regulations & Visitor Guidelines",
  subtitle: "Official code of conduct, customs clearance rules, booth allocation policies, and visitor compliance.",
  guidelines: [
    {
      id: "reg-1",
      category: "Customs & Freight",
      title: "Exhibition Goods Customs Declaration",
      details: "All foreign equipment, display samples, and promotional materials imported into Bhutan for exhibition purposes must be declared at the Phuentsholing Dry Port customs checkpoint using Form EX-04 for duty-free entry.",
    },
    {
      id: "reg-2",
      category: "Booth Setup",
      title: "Structural Safety & Height Restrictions",
      details: "Maximum booth height allowance inside the main pavilion is 4.0 meters for standard shell schemes and 5.0 meters for custom wooden structures. Electrical wiring must comply with Bhutan Power Corporation safety standards.",
    },
    {
      id: "reg-3",
      category: "Visitor Pass",
      title: "Security Badge & ID Access Control",
      details: "Official visitor passes with unique QR codes must be worn visibly at all times within the exhibition complex. Passes are non-transferable and subject to security screening.",
    },
  ],
};

// CRUD Helper Functions for ALL Modules (A - Z)

export const fetchCMSEventsAsync = async (): Promise<TradeEventCMS[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("cms_events").select("*").order("updated_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const fetched: TradeEventCMS[] = data.map((d: any) => ({
          id: d.id,
          slug: d.slug,
          title: d.title,
          category: d.category,
          date: d.date,
          location: d.location,
          venue: d.venue,
          image: d.image,
          description: d.description || "",
          highlights: Array.isArray(d.highlights) ? d.highlights : [],
          sectors: Array.isArray(d.sectors) ? d.sectors : [],
          status: d.status || "Published",
          featuredOnHome: d.featured_on_home !== false,
          updatedAt: d.updated_at ? new Date(d.updated_at).toLocaleDateString() : new Date().toLocaleDateString(),
        }));
        const missingInitial = INITIAL_EVENTS.filter((ie) => !fetched.some((e) => e.id === ie.id || e.slug === ie.slug));
        const merged = [...fetched, ...missingInitial];
        if (typeof window !== "undefined") {
          localStorage.setItem(CMS_KEYS.EVENTS, JSON.stringify(merged));
        }
        return merged;
      }
    } catch (err) {
      console.error("Error fetching CMS events from Supabase:", err);
    }
  }
  return getCMSEvents();
};

export const getCMSEvents = (): TradeEventCMS[] => {
  if (typeof window === "undefined") return INITIAL_EVENTS;
  const stored = localStorage.getItem(CMS_KEYS.EVENTS);
  if (!stored) {
    localStorage.setItem(CMS_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    return INITIAL_EVENTS;
  }
  const parsed: TradeEventCMS[] = JSON.parse(stored);
  const missingInitial = INITIAL_EVENTS.filter((ie) => !parsed.some((e) => e.id === ie.id || e.slug === ie.slug));
  if (missingInitial.length > 0) {
    const merged = [...missingInitial, ...parsed];
    localStorage.setItem(CMS_KEYS.EVENTS, JSON.stringify(merged));
    return merged;
  }
  return parsed;
};

export const getCMSEventById = (id: string): TradeEventCMS | undefined => {
  const events = getCMSEvents();
  return events.find((e) => e.id === id || e.slug === id);
};

export const saveCMSEvent = (event: TradeEventCMS): TradeEventCMS => {
  const events = getCMSEvents();
  const index = events.findIndex((e) => e.id === event.id);
  let updated: TradeEventCMS[];
  if (index >= 0) {
    updated = events.map((e) => (e.id === event.id ? { ...event, updatedAt: new Date().toLocaleDateString() } : e));
  } else {
    updated = [{ ...event, id: `evt-${Date.now()}`, updatedAt: new Date().toLocaleDateString() }, ...events];
  }
  localStorage.setItem(CMS_KEYS.EVENTS, JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    const payload = {
      id: event.id || `evt-${Date.now()}`,
      slug: event.slug || event.id,
      title: event.title,
      category: event.category,
      date: event.date,
      location: event.location,
      venue: event.venue,
      image: event.image,
      description: event.description,
      highlights: event.highlights,
      sectors: event.sectors,
      status: event.status,
      featured_on_home: event.featuredOnHome,
      updated_at: new Date().toISOString(),
    };
    supabase
      .from("cms_events")
      .upsert([payload])
      .then(({ error }) => {
        if (error) console.error("Error upserting event to Supabase:", error);
      });
  }

  return event;
};

export const deleteCMSEvent = (id: string) => {
  const events = getCMSEvents();
  const updated = events.filter((e) => e.id !== id);
  localStorage.setItem(CMS_KEYS.EVENTS, JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    supabase.from("cms_events").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error deleting CMS event from Supabase:", error);
    });
  }
};

export const fetchCMSNewsAsync = async (): Promise<NewsArticleCMS[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("cms_news").select("*").order("updated_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const fetched: NewsArticleCMS[] = data.map((d: any) => ({
          id: d.id,
          slug: d.slug,
          title: d.title,
          date: d.date,
          category: d.category,
          image: d.image,
          excerpt: d.excerpt,
          content: Array.isArray(d.content) ? d.content : [d.excerpt],
          mediaContactEmail: d.media_contact_email || "info@tobgyelglobalxpos.com",
          status: d.status || "Published",
          featuredOnHome: d.featured_on_home !== false,
          updatedAt: d.updated_at ? new Date(d.updated_at).toLocaleDateString() : new Date().toLocaleDateString(),
        }));
        const missingInitial = INITIAL_NEWS.filter((ie) => !fetched.some((n) => n.id === ie.id || n.slug === ie.slug));
        const merged = [...fetched, ...missingInitial];
        if (typeof window !== "undefined") {
          localStorage.setItem(CMS_KEYS.NEWS, JSON.stringify(merged));
        }
        return merged;
      }
    } catch (err) {
      console.error("Error fetching CMS news from Supabase:", err);
    }
  }
  return getCMSNews();
};

export const getCMSNews = (): NewsArticleCMS[] => {
  if (typeof window === "undefined") return INITIAL_NEWS;
  const stored = localStorage.getItem(CMS_KEYS.NEWS);
  if (!stored) {
    localStorage.setItem(CMS_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
    return INITIAL_NEWS;
  }
  return JSON.parse(stored);
};

export const getCMSNewsById = (id: string): NewsArticleCMS | undefined => {
  const articles = getCMSNews();
  return articles.find((n) => n.id === id || n.slug === id);
};

export const saveCMSNews = (article: NewsArticleCMS): NewsArticleCMS => {
  const articles = getCMSNews();
  const index = articles.findIndex((n) => n.id === article.id);
  let updated: NewsArticleCMS[];
  if (index >= 0) {
    updated = articles.map((n) => (n.id === article.id ? { ...article, updatedAt: new Date().toLocaleDateString() } : n));
  } else {
    updated = [{ ...article, id: `news-${Date.now()}`, updatedAt: new Date().toLocaleDateString() }, ...articles];
  }
  localStorage.setItem(CMS_KEYS.NEWS, JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    const payload = {
      id: article.id || `news-${Date.now()}`,
      slug: article.slug || article.id,
      title: article.title,
      date: article.date,
      category: article.category,
      image: article.image,
      excerpt: article.excerpt,
      content: article.content,
      media_contact_email: article.mediaContactEmail,
      status: article.status,
      featured_on_home: article.featuredOnHome,
      updated_at: new Date().toISOString(),
    };
    supabase.from("cms_news").upsert([payload]).then(({ error }) => {
      if (error) console.error("Error saving CMS news to Supabase:", error);
    });
  }

  return article;
};

export const deleteCMSNews = (id: string) => {
  const articles = getCMSNews();
  const updated = articles.filter((n) => n.id !== id);
  localStorage.setItem(CMS_KEYS.NEWS, JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    supabase.from("cms_news").delete().eq("id", id).then(({ error }) => {
      if (error) console.error("Error deleting CMS news from Supabase:", error);
    });
  }
};

export const getCMSHeroConfig = (): HeroConfigCMS => {
  if (typeof window === "undefined") return INITIAL_HERO;
  const stored = localStorage.getItem(CMS_KEYS.HERO);
  if (!stored) return INITIAL_HERO;
  return JSON.parse(stored);
};

export const saveCMSHeroConfig = (config: HeroConfigCMS) => {
  localStorage.setItem(CMS_KEYS.HERO, JSON.stringify(config));
};

export const getCMSAbout = (): AboutCMS => {
  if (typeof window === "undefined") return INITIAL_ABOUT;
  const stored = localStorage.getItem(CMS_KEYS.ABOUT);
  if (!stored) return INITIAL_ABOUT;
  return JSON.parse(stored);
};

export const saveCMSAbout = (about: AboutCMS) => {
  localStorage.setItem(CMS_KEYS.ABOUT, JSON.stringify(about));
};

export const getCMSContact = (): ContactConfigCMS => {
  if (typeof window === "undefined") return INITIAL_CONTACT;
  const stored = localStorage.getItem(CMS_KEYS.CONTACT);
  if (!stored) return INITIAL_CONTACT;
  return JSON.parse(stored);
};

export const saveCMSContact = (contact: ContactConfigCMS) => {
  localStorage.setItem(CMS_KEYS.CONTACT, JSON.stringify(contact));
};

export const getCMSRegulations = (): RegulationsCMS => {
  if (typeof window === "undefined") return INITIAL_REGULATIONS;
  const stored = localStorage.getItem(CMS_KEYS.REGULATIONS);
  if (!stored) return INITIAL_REGULATIONS;
  return JSON.parse(stored);
};

export const saveCMSRegulations = (regulations: RegulationsCMS) => {
  localStorage.setItem(CMS_KEYS.REGULATIONS, JSON.stringify(regulations));
};

export const getCMSWhyExhibit = (): WhyExhibitCMS => {
  if (typeof window === "undefined") return INITIAL_WHY_EXHIBIT;
  const stored = localStorage.getItem(CMS_KEYS.WHY_EXHIBIT);
  if (!stored) return INITIAL_WHY_EXHIBIT;
  return JSON.parse(stored);
};

export const saveCMSWhyExhibit = (config: WhyExhibitCMS) => {
  localStorage.setItem(CMS_KEYS.WHY_EXHIBIT, JSON.stringify(config));
};

export const getCMSParticipants = (): ParticipantsCMS => {
  if (typeof window === "undefined") return INITIAL_PARTICIPANTS;
  const stored = localStorage.getItem(CMS_KEYS.PARTICIPANTS);
  if (!stored) return INITIAL_PARTICIPANTS;
  return JSON.parse(stored);
};

export const saveCMSParticipants = (config: ParticipantsCMS) => {
  localStorage.setItem(CMS_KEYS.PARTICIPANTS, JSON.stringify(config));
};

export const getCMSVisit = (): VisitCMS => {
  if (typeof window === "undefined") return INITIAL_VISIT;
  const stored = localStorage.getItem(CMS_KEYS.VISIT);
  if (!stored) return INITIAL_VISIT;
  return JSON.parse(stored);
};

export const saveCMSVisit = (config: VisitCMS) => {
  localStorage.setItem(CMS_KEYS.VISIT, JSON.stringify(config));
};

export const getCMSPartners = (): PartnersCMS => {
  if (typeof window === "undefined") return INITIAL_PARTNERS;
  const stored = localStorage.getItem(CMS_KEYS.PARTNERS);
  if (!stored) return INITIAL_PARTNERS;
  return JSON.parse(stored);
};

export const saveCMSPartners = (config: PartnersCMS) => {
  localStorage.setItem(CMS_KEYS.PARTNERS, JSON.stringify(config));
};

export const getPageViewCount = (): number => {
  if (typeof window === "undefined") return 1;
  const stored = localStorage.getItem(CMS_KEYS.PAGE_VIEWS);
  if (!stored || parseInt(stored, 10) > 100) {
    const initialCount = 1;
    localStorage.setItem(CMS_KEYS.PAGE_VIEWS, initialCount.toString());
    return initialCount;
  }
  return parseInt(stored, 10);
};

export const incrementPageViewCount = (): number => {
  if (typeof window === "undefined") return 1;
  const current = getPageViewCount();
  const updated = current + 1;
  localStorage.setItem(CMS_KEYS.PAGE_VIEWS, updated.toString());
  return updated;
};

export const getCMSProductAds = (): ProductAdCMS[] => {
  if (typeof window === "undefined") return INITIAL_PRODUCT_ADS;
  const stored = localStorage.getItem(CMS_KEYS.PRODUCT_ADS);
  if (!stored) {
    localStorage.setItem(CMS_KEYS.PRODUCT_ADS, JSON.stringify(INITIAL_PRODUCT_ADS));
    return INITIAL_PRODUCT_ADS;
  }
  const parsed: ProductAdCMS[] = JSON.parse(stored);
  const missingInitial = INITIAL_PRODUCT_ADS.filter((ia) => !parsed.some((a) => a.id === ia.id));
  if (missingInitial.length > 0) {
    const merged = [...parsed, ...missingInitial];
    localStorage.setItem(CMS_KEYS.PRODUCT_ADS, JSON.stringify(merged));
    return merged;
  }
  return parsed;
};

export const saveCMSProductAd = (ad: ProductAdCMS): ProductAdCMS => {
  const ads = getCMSProductAds();
  const index = ads.findIndex((a) => a.id === ad.id);
  let updated: ProductAdCMS[];
  if (index >= 0) {
    updated = ads.map((a) => (a.id === ad.id ? ad : a));
  } else {
    updated = [{ ...ad, id: `ad-${Date.now()}` }, ...ads];
  }
  localStorage.setItem(CMS_KEYS.PRODUCT_ADS, JSON.stringify(updated));
  return ad;
};

export const deleteCMSProductAd = (id: string) => {
  const ads = getCMSProductAds();
  const updated = ads.filter((a) => a.id !== id);
  localStorage.setItem(CMS_KEYS.PRODUCT_ADS, JSON.stringify(updated));
};
