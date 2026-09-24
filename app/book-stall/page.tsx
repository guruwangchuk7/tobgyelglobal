"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  CheckCircle2,
  Lock,
  User,
  Building,
  Mail,
  Phone,
  Send,
  X,
  Store,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  STALL_ZONES,
  ALL_STALLS,
  TOTAL_STALLS,
  COUNTRY_STYLES,
  type StallDef,
  type StallZone,
} from "@/app/lib/stalls";
import {
  bookStall,
  fetchStallAvailability,
} from "@/app/lib/stallStore";


export default function BookStallPage() {
  const [takenIds, setTakenIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<StallDef | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<StallDef | null>(null);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: "",
    website: "", // honeypot
  });

  const loadAvailability = async () => {
    const list = await fetchStallAvailability();
    setTakenIds(new Set(list.map((l) => l.stallId)));
    setLoading(false);
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const bookedCount = takenIds.size;
  const availableCount = TOTAL_STALLS - bookedCount;

  const openBooking = (stall: StallDef) => {
    if (takenIds.has(stall.id)) return;
    setSelected(stall);
    setFormError("");
    setForm({
      contactName: "",
      companyName: "",
      email: "",
      phone: "",
      notes: "",
      website: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || submitting) return;
    setSubmitting(true);
    setFormError("");
    try {
      await bookStall({
        stallId: selected.id,
        stallLabel: selected.label,
        zone: selected.zoneId,
        size: selected.size,
        country: selected.country,
        contactName: form.contactName,
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        website: form.website,
      });
      // Optimistically mark as taken, then refresh from server.
      setTakenIds((prev) => new Set(prev).add(selected.id));
      setConfirmed(selected);
      setSelected(null);
      loadAvailability();
    } catch (err: any) {
      setFormError(err?.message || "Could not book this stall. Please try again.");
      // If it was taken in a race, refresh so the map updates.
      loadAvailability();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020D1B] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#EAA500] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAA500]/10 border border-[#EAA500]/40 text-[#EAA500] text-[11px] font-extrabold uppercase tracking-widest">
            <Store className="w-3.5 h-3.5" /> Book a Stall
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Himalayan Food, Trade &amp; Innovatives Expo
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#EAA500]" />
              30th Dec 2026 to 3rd Jan 2027
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EAA500]" />
              Old vegetables market opp. of Bhutan Telecom
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">
            Select an available stall from the live floor plan below and reserve it
            instantly. Booked stalls are locked in real time. Your booking is
            confirmed once approved by the organiser.
          </p>
        </div>

        {/* Legend + counts */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 bg-[#03142A] border border-slate-800 rounded-xl p-4">
          <LegendSwatch className="bg-green-600/80 border-green-400/60" label="Available" />
          <LegendSwatch className="bg-slate-700 border-slate-600" label="Booked" />
          <LegendSwatch className="bg-[#EAA500] border-[#EAA500]" label="Selected" />
          <div className="ml-auto flex items-center gap-4 text-xs font-bold">
            <span className="text-emerald-300">{availableCount} Available</span>
            <span className="text-slate-400">{bookedCount} Booked</span>
            <span className="text-slate-500">{TOTAL_STALLS} Total</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            Loading live stall availability…
          </div>
        ) : (
          <FloorPlan takenIds={takenIds} selected={selected} onSelect={openBooking} />
        )}
      </div>

      {/* Booking modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#03142A] border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative space-y-6 shadow-2xl my-8">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-8">
              <span className="text-[10px] font-black uppercase text-[#EAA500] tracking-widest">
                Reserve Stall
              </span>
              <h3 className="text-xl font-black text-white">{selected.label}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{selected.size}</span>
                {selected.country !== "OPEN" && (
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                      COUNTRY_STYLES[selected.country]
                    }`}
                  >
                    {selected.country}
                  </span>
                )}
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </label>
              </div>

              <Field
                icon={<User className="w-4 h-4 text-slate-500" />}
                label="Contact Person *"
              >
                <input
                  type="text"
                  required
                  placeholder="e.g. Sonam Dorji"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className={inputCls}
                />
              </Field>

              <Field
                icon={<Building className="w-4 h-4 text-slate-500" />}
                label="Company / Business"
              >
                <input
                  type="text"
                  placeholder="e.g. Druk Enterprise"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className={inputCls}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  icon={<Mail className="w-4 h-4 text-slate-500" />}
                  label="Email *"
                >
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </Field>

                <Field
                  icon={<Phone className="w-4 h-4 text-slate-500" />}
                  label="Phone *"
                >
                  <input
                    type="tel"
                    required
                    placeholder="+975 17xxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="What will you sell / display?"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "Booking…" : "Confirm Booking"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success modal */}
      {confirmed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#03142A] border border-emerald-500/40 rounded-2xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-wide">
                Stall Reserved!
              </h2>
              <p className="text-sm text-slate-300">
                <span className="font-bold text-[#EAA500]">{confirmed.label}</span> is
                now held for you. The organiser will confirm your booking shortly.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Stall:</span>
                <span className="font-bold text-white">{confirmed.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size:</span>
                <span className="font-bold text-white">{confirmed.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  Pending Approval
                </span>
              </div>
            </div>
            <button
              onClick={() => setConfirmed(null)}
              className="w-full py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-xs font-bold uppercase tracking-widest text-white"
            >
              Book Another Stall
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const inputCls =
  "w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500]";

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-3.5">{icon}</div>
        {children}
      </div>
    </div>
  );
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
      <span className={`w-4 h-4 rounded border ${className}`} />
      {label}
    </div>
  );
}

/* -------------------- Floor plan -------------------- */
// Faithful recreation of the printed expo site map on a grey canvas: the road
// runs down the middle, the green Smart-Techs grid + Parking sit on the right,
// and café / stage / food / SME / children zones stack on the left.
const CANVAS = "#63635f"; // medium grey background
const GREY_LIGHT = "#8a8a86"; // road + parking
const BLUE = "#4472c4"; // resident / toilet / arrows

function FloorPlan({
  takenIds,
  selected,
  onSelect,
}: {
  takenIds: Set<string>;
  selected: StallDef | null;
  onSelect: (s: StallDef) => void;
}) {
  const zoneById = useMemo(
    () => Object.fromEntries(STALL_ZONES.map((z) => [z.id, z])),
    []
  );

  const cellProps = { takenIds, selected, onSelect };

  const innov = zoneById["innov"];

  return (
    <div
      className="rounded-2xl border border-slate-700 p-3 sm:p-5 overflow-x-auto"
      style={{ backgroundColor: CANVAS }}
    >
      <div className="min-w-[1000px]">
        {/* Title banner (dark text on grey, like the printed plan) */}
        <div className="mb-4">
          <div className="text-sm sm:text-base font-black italic tracking-wide text-slate-900">
            HIMALAYAN FOOD, TRADE &amp; INNOVATIVES EXPO
          </div>
          <div className="text-[11px] font-semibold text-slate-800">
            Date: 30th Dec 2026 to 3rd Jan 2027&nbsp;&nbsp;Venue: Old vegetables
            market opp. of Bhutan Telecom
          </div>
        </div>

        {/* Main site map laid out with named grid areas so the road spans the
            full height and parking stretches from the road to the toilet. */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,3.3fr) 48px auto minmax(0,5.6fr)",
            gridTemplateRows: "auto auto 1fr",
            gridTemplateAreas: [
              '"cafe road . resident"',
              '"content road innov smart"',
              '"children road parking parking"',
            ].join(" "),
            gap: "10px",
          }}
        >
          {/* Resident café — centered at the top, directly above the Stage. */}
          <div style={{ gridArea: "cafe" }} className="flex justify-center">
            <ContextBlock
              className="h-11 w-44 text-white"
              style={{ backgroundColor: BLUE }}
              label="Resident Café"
            />
          </div>

          {/* Resident — top-right */}
          <div style={{ gridArea: "resident" }} className="flex justify-end">
            <ContextBlock
              className="h-9 w-28 text-white"
              style={{ backgroundColor: BLUE }}
              label="Resident"
            />
          </div>

          {/* Stage (centered, directly below the café) + Food courts + SME */}
          <div style={{ gridArea: "content" }} className="flex flex-col gap-3">
            <div className="flex justify-center">
              <div
                className="w-44 h-14 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wide [clip-path:polygon(14%_0,86%_0,100%_50%,86%_100%,14%_100%,0_50%)]"
                style={{ backgroundColor: "#7030a0" }}
              >
                Stage
              </div>
            </div>

            <div>
              <ZoneLabel name="Food courts" size={zoneById["food"].size} stacked />
              <VerticalLabelGrid zone={zoneById["food"]} cols={3} {...cellProps} />
            </div>

            <div className="mt-1">
              <ZoneLabel name="SME Businesses" size={zoneById["sme"].size} />
              <VerticalLabelGrid zone={zoneById["sme"]} cols={4} {...cellProps} />
            </div>
          </div>

          {/* Road — spans all three rows via the named area */}
          <div
            style={{ gridArea: "road", backgroundColor: GREY_LIGHT }}
            className="rounded flex flex-col items-center py-3 gap-2"
          >
            <ChevronDown className="w-5 h-5" style={{ color: BLUE }} strokeWidth={3} />
            <span className="[writing-mode:vertical-rl] rotate-180 flex-1 flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest">
              Road
            </span>
            <ChevronUp className="w-5 h-5" style={{ color: BLUE }} strokeWidth={3} />
          </div>

          {/* Innovatives — white vertical label + red column */}
          <div style={{ gridArea: "innov" }} className="flex gap-1.5">
            <div className="bg-white rounded flex items-center justify-center px-0.5">
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[9px] font-bold text-slate-900 py-1">
                Innovatives / Entrepreneurs ({innov.size})
              </span>
            </div>
            <div className="flex flex-col gap-1.5 w-14 flex-1">
              {innov.stalls.map((s) => (
                <StallCell
                  key={s.id}
                  stall={s}
                  zone={innov}
                  taken={takenIds.has(s.id)}
                  isSelected={selected?.id === s.id}
                  onSelect={onSelect}
                  fill
                />
              ))}
            </div>
          </div>

          {/* Smart techs grid + extra stalls */}
          <div style={{ gridArea: "smart" }} className="flex flex-col gap-2">
            <ZoneLabel
              name="Smart techs, mobility, industrials"
              size={zoneById["smart"].size}
            />
            <GroupedSmart zone={zoneById["smart"]} {...cellProps} />

            <div className="mt-0.5">
              <div className="grid grid-cols-5 gap-1.5">
                {zoneById["extra"].stalls.map((s) => (
                  <StallCell
                    key={s.id}
                    stall={s}
                    zone={zoneById["extra"]}
                    taken={takenIds.has(s.id)}
                    isSelected={selected?.id === s.id}
                    onSelect={onSelect}
                    wide
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-center">
                <span className="bg-white text-slate-900 text-[9px] font-bold px-4 py-0.5 rounded uppercase tracking-wide">
                  Extra Stalls ({zoneById["extra"].size})
                </span>
              </div>
            </div>
          </div>

          {/* Children zones — bottom-left */}
          <ContextBlock
            className="min-h-[120px] text-slate-900"
            style={{ gridArea: "children", backgroundColor: "#a9d18e" }}
            label="Children Zones"
          />

          {/* Parking + Toilet — spans road-edge to the right */}
          <div
            style={{ gridArea: "parking" }}
            className="flex gap-2.5 min-h-[120px]"
          >
            <ContextBlock
              className="flex-1 text-slate-900"
              style={{ backgroundColor: GREY_LIGHT }}
              label="Parking Lot"
            />
            <ContextBlock
              className="w-16 text-white"
              style={{ backgroundColor: BLUE }}
              label="Toilet"
              vertical
            />
          </div>
        </div>

        {/* Exit & entry gate */}
        <div className="mt-3 flex items-center gap-2 pl-[26%]">
          <span
            className="w-5 h-4 rounded-sm border border-slate-900/40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#166534 0 3px,#052e16 3px 6px)",
            }}
          />
          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">
            Exit &amp; Entry Gate Point
          </span>
        </div>

        {/* Highway footer */}
        <div
          className="mt-3 rounded flex items-center justify-center gap-4 py-3"
          style={{ backgroundColor: "#57574f" }}
        >
          <ChevronsRight className="w-5 h-5" style={{ color: BLUE }} strokeWidth={3} />
          <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wide">
            Samtsi Highway Road to Phuentsholing
          </span>
          <ChevronsLeft className="w-5 h-5" style={{ color: BLUE }} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

// A dark zone label with italic size, e.g. "Food courts (3m x 6m)".
function ZoneLabel({
  name,
  size,
  stacked,
}: {
  name: string;
  size: string;
  stacked?: boolean;
}) {
  return (
    <div className="mb-1.5 text-[11px] font-black text-slate-900 leading-tight">
      {name}
      {stacked ? <br /> : " "}
      <span className="italic font-bold text-slate-800">({size})</span>
    </div>
  );
}

function ContextBlock({
  className,
  label,
  vertical,
  style,
}: {
  className: string;
  label: string;
  vertical?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded flex items-center justify-center text-center px-2 ${className}`}
      style={style}
    >
      <span
        className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
          vertical ? "[writing-mode:vertical-rl] rotate-180" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Food / SME: columns each with a rotated country label + a vertical stack.
function VerticalLabelGrid({
  zone,
  cols,
  takenIds,
  selected,
  onSelect,
}: {
  zone: StallZone;
  cols: number;
  takenIds: Set<string>;
  selected: StallDef | null;
  onSelect: (s: StallDef) => void;
}) {
  const rows = Math.ceil(zone.stalls.length / cols);
  const columns = Array.from({ length: cols }, (_, c) => {
    const stalls: StallDef[] = [];
    for (let r = 0; r < rows; r++) {
      const s = zone.stalls[r * cols + c];
      if (s) stalls.push(s);
    }
    return { country: stalls[0]?.country, stalls };
  });

  return (
    <div className="flex gap-1.5">
      {columns.map((col, i) => (
        <div key={i} className="flex items-stretch gap-1">
          {col.country && col.country !== "OPEN" && (
            <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold text-slate-900 tracking-wide">
              {col.country}
            </span>
          )}
          <div className="flex flex-col gap-1.5 w-14">
            {col.stalls.map((s) => (
              <StallCell
                key={s.id}
                stall={s}
                zone={zone}
                taken={takenIds.has(s.id)}
                isSelected={selected?.id === s.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Smart techs: 3 rows of 5 with a centered white country label above each row.
function GroupedSmart({
  zone,
  takenIds,
  selected,
  onSelect,
}: {
  zone: StallZone | undefined;
  takenIds: Set<string>;
  selected: StallDef | null;
  onSelect: (s: StallDef) => void;
}) {
  if (!zone) return null;
  const rows: { country: string; stalls: StallDef[] }[] = [
    { country: "INDIA", stalls: zone.stalls.slice(0, 5) },
    { country: "BHUTAN", stalls: zone.stalls.slice(5, 10) },
    { country: "NEPAL", stalls: zone.stalls.slice(10, 15) },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((row) => (
        <div key={row.country}>
          <div className="flex justify-center mb-1">
            <span className="bg-white text-slate-900 text-[9px] font-bold px-4 py-0.5 rounded tracking-wide">
              {row.country}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {row.stalls.map((s) => (
              <StallCell
                key={s.id}
                stall={s}
                zone={zone}
                taken={takenIds.has(s.id)}
                isSelected={selected?.id === s.id}
                onSelect={onSelect}
                wide
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StallCell({
  stall,
  zone,
  taken,
  isSelected,
  onSelect,
  wide,
  fill,
}: {
  stall: StallDef;
  zone: StallZone;
  taken: boolean;
  isSelected: boolean;
  onSelect: (s: StallDef) => void;
  wide?: boolean;
  fill?: boolean;
}) {
  const base = `relative w-full ${
    fill ? "flex-1 min-h-[34px]" : wide ? "min-h-[44px]" : "min-h-[44px]"
  } rounded-md border-2 flex items-center justify-center text-sm font-black transition-all select-none`;
  let cls: string;
  let style: React.CSSProperties | undefined;
  if (taken) {
    cls = "bg-slate-800 border-slate-600 text-slate-400 cursor-not-allowed";
  } else if (isSelected) {
    cls =
      "bg-[#EAA500] border-[#EAA500] text-slate-900 ring-2 ring-[#EAA500] ring-offset-2 cursor-pointer";
    style = { ["--tw-ring-offset-color" as string]: CANVAS };
  } else {
    cls = `${zone.available} cursor-pointer`;
  }

  return (
    <button
      type="button"
      disabled={taken}
      onClick={() => onSelect(stall)}
      title={taken ? `${stall.label} — Booked` : `${stall.label} — Available`}
      className={`${base} ${cls}`}
      style={style}
    >
      {taken ? <Lock className="w-3.5 h-3.5" /> : `${stall.number}.`}
    </button>
  );
}
