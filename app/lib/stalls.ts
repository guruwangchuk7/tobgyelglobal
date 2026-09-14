// ============================================================================
// Stall catalog for the "Himalayan Food, Trade & Innovatives Expo" floor plan.
// This is the single source of truth for which stalls exist, their zone, size,
// country allocation and display label. Shared by the public Book-a-Stall page
// and the admin panel. Safe to import from both server and client (no side-effects).
// ============================================================================

export type Country = "INDIA" | "BHUTAN" | "NEPAL" | "OPEN";

export interface StallDef {
  id: string; // globally-unique catalog id, e.g. "smart-1"
  zoneId: string; // parent zone id
  number: number; // number shown on the plan
  label: string; // full human label, e.g. "Smart Techs #1 (INDIA)"
  size: string; // physical size
  country: Country;
}

export interface StallZone {
  id: string;
  name: string;
  size: string;
  // Base tailwind classes for an AVAILABLE stall in this zone (matches the map colours).
  available: string;
  stalls: StallDef[];
}

// Helper: build the stall list for a zone.
function buildStalls(
  zoneId: string,
  zoneName: string,
  size: string,
  countryByNumber: (n: number) => Country,
  count: number
): StallDef[] {
  return Array.from({ length: count }, (_, i) => {
    const number = i + 1;
    const country = countryByNumber(number);
    const label =
      country === "OPEN"
        ? `${zoneName} #${number}`
        : `${zoneName} #${number} (${country})`;
    return { id: `${zoneId}-${number}`, zoneId, number, label, size, country };
  });
}

// --- Food courts (3m x 3m): 1 IND, 2 BHU, 3 NEP, 4 IND, 5 BHU, 6 NEP -------
const foodCountry = (n: number): Country =>
  n % 3 === 1 ? "INDIA" : n % 3 === 2 ? "BHUTAN" : "NEPAL";

// --- SME Businesses (3m x 3m): row of 4 x 2. Cols 1/2/3 = IND/BHU/NEP, col 4 open
const smeCountry = (n: number): Country => {
  const col = ((n - 1) % 4) + 1; // 1..4
  return col === 1 ? "INDIA" : col === 2 ? "BHUTAN" : col === 3 ? "NEPAL" : "OPEN";
};

// --- Smart techs, mobility, industrials (6m x 6m): 1-5 IND, 6-10 BHU, 11-15 NEP
const smartCountry = (n: number): Country =>
  n <= 5 ? "INDIA" : n <= 10 ? "BHUTAN" : "NEPAL";

export const STALL_ZONES: StallZone[] = [
  {
    id: "smart",
    name: "Smart Techs, Mobility & Industrials",
    size: "6m x 6m",
    available:
      "bg-green-600/80 hover:bg-green-500 border-green-400/60 text-white",
    stalls: buildStalls("smart", "Smart Techs", "6m x 6m", smartCountry, 15),
  },
  {
    id: "innov",
    name: "Innovatives / Entrepreneurs",
    size: "3m x 3m",
    available: "bg-red-600/80 hover:bg-red-500 border-red-400/60 text-white",
    stalls: buildStalls("innov", "Innovatives", "3m x 3m", () => "OPEN", 6),
  },
  {
    id: "food",
    name: "Food Courts",
    size: "3m x 3m",
    available:
      "bg-orange-400/80 hover:bg-orange-300 border-orange-300/60 text-slate-900",
    stalls: buildStalls("food", "Food Court", "3m x 3m", foodCountry, 6),
  },
  {
    id: "sme",
    name: "SME Businesses",
    size: "3m x 3m",
    available:
      "bg-yellow-600/80 hover:bg-yellow-500 border-yellow-400/60 text-white",
    stalls: buildStalls("sme", "SME Business", "3m x 3m", smeCountry, 8),
  },
  {
    id: "extra",
    name: "Extra Stalls",
    size: "6m x 6m",
    available:
      "bg-emerald-300/80 hover:bg-emerald-200 border-emerald-200/60 text-slate-900",
    stalls: buildStalls("extra", "Extra Stall", "6m x 6m", () => "OPEN", 5),
  },
];

// Flat lookup of every bookable stall.
export const ALL_STALLS: StallDef[] = STALL_ZONES.flatMap((z) => z.stalls);

export const getStallById = (id: string): StallDef | undefined =>
  ALL_STALLS.find((s) => s.id === id);

export const TOTAL_STALLS = ALL_STALLS.length;

export const COUNTRY_STYLES: Record<Country, string> = {
  INDIA: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  BHUTAN: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  NEPAL: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  OPEN: "bg-slate-500/20 text-slate-300 border-slate-500/40",
};
