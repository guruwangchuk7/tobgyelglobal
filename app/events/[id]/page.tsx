"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import Link from "next/link";
import { Calendar, MapPin, Sparkles, UserCheck, Ticket, Building, ShieldCheck } from "lucide-react";
import { getCMSEventById, fetchCMSEventsAsync, TradeEventCMS, INITIAL_EVENTS } from "@/app/lib/cmsStore";

export default function EventDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = use(params);
  const { from } = use(searchParams);

  // Initialize with server-safe initial seed data to prevent hydration mismatch
  const [eventItem, setEventItem] = useState<TradeEventCMS | undefined>(
    () => INITIAL_EVENTS.find((e) => e.id === id || e.slug === id)
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load local storage or DB data safely after mount
    const local = getCMSEventById(id);
    if (local) {
      setEventItem(local);
    }
    fetchCMSEventsAsync()
      .then((eventsList) => {
        const found = eventsList.find((e) => e.id === id || e.slug === id);
        if (found) setEventItem(found);
      })
      .finally(() => setLoaded(true));
  }, [id]);

  const isFromHome = from === "home";
  const backHref = isFromHome ? "/#events" : "/events";
  const backText = isFromHome ? "Back to Home" : "Back to All Events";

  if (!eventItem) {
    // Once loading is complete and no event matched, render the real 404.
    if (loaded) notFound();
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#03142A] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${eventItem.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 z-10">
          <BackButton fallbackHref={backHref} label={backText} />

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAA500] text-[#03142A] text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eventItem.category}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans leading-tight">
              {eventItem.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-200 font-semibold pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#EAA500]" />
              <span>{eventItem.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EAA500]" />
              <span>{eventItem.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 text-left">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#03142A] uppercase">About The Event</h2>
              <div className="w-10 h-1 bg-[#EAA500] rounded-full" />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal pt-2">
                {eventItem.description}
              </p>
            </div>

            {/* Event Venue Card */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3">
              <Building className="w-5 h-5 text-[#0A4D8C] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700">
                <p className="font-bold text-slate-900">Official Venue</p>
                <p>{eventItem.venue}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold text-[#03142A] uppercase">Event Highlights</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {eventItem.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#008E48] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Sectors */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-base font-extrabold text-[#03142A] uppercase">Participating Industry Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {eventItem.sectors.map((sec, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                    {sec}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h3 className="text-lg font-black uppercase text-white">Ready To Participate?</h3>
              <p className="text-xs text-slate-300">Reserve your exhibition booth space or request visitor passes.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/register/exhibitor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D49900] hover:bg-[#bd8800] text-white text-xs font-extrabold uppercase tracking-wider min-h-[48px]"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register As Exhibitor</span>
              </Link>
              <Link
                href="/register/visitor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white text-xs font-extrabold uppercase tracking-wider min-h-[48px]"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Visitor Pass</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
