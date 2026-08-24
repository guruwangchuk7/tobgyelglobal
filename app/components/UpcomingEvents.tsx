"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getCMSEvents, INITIAL_EVENTS, TradeEventCMS } from "@/app/lib/cmsStore";
import { CompactCardCountdown } from "@/app/components/CountdownTimer";

interface UpcomingEventsProps {
  from?: "home" | "events";
}

export default function UpcomingEvents({ from = "events" }: UpcomingEventsProps) {
  const [events, setEvents] = useState<TradeEventCMS[]>(INITIAL_EVENTS);

  useEffect(() => {
    const loaded = getCMSEvents();
    if (loaded && loaded.length > 0) {
      setEvents(loaded.filter((e) => e.status === "Published"));
    }
  }, []);

  return (
    <section id="events" className="py-10 sm:py-18 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-widest text-[#03142A] uppercase font-sans">
            Upcoming Events
          </h2>
          <div className="w-12 h-1 bg-[#EAA500] mx-auto rounded-full" />
        </div>

        {/* MOBILE VIEW (< 768px): Horizontal Swipeable Card Carousel */}
        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 -mx-1 scrollbar-none">
            {events.map((evt) => {
              const isTargetEvent = evt.id === "himalayan-food-trade-innovation-expo-2026" || evt.date.includes("2026");
              return (
                <Link
                  key={evt.id}
                  href={`/events/${evt.id}?from=${from}`}
                  className="snap-start shrink-0 w-[85%] max-w-[320px] group relative rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-[#03142A] min-h-[380px] flex flex-col justify-end transition-all cursor-pointer active:scale-98"
                >
                  {/* Background Image with Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${evt.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/85 to-transparent" />

                  {/* Event Info Content */}
                  <div className="relative p-5 space-y-2 z-10 text-left">
                    <h3 className="text-lg font-black text-white tracking-wide uppercase leading-snug group-hover:text-[#EAA500] transition-colors">
                      {evt.title}
                    </h3>
                    
                    <p className="text-xs text-slate-200 font-medium tracking-wide">
                      {evt.category}
                    </p>

                    <div className="pt-1 flex flex-col gap-1 text-xs font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#EAA500] shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#EAA500] shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    {/* Live Ticking Countdown directly inside post card */}
                    {isTargetEvent && <CompactCardCountdown />}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] font-bold text-[#EAA500] uppercase tracking-widest">
            <span>Swipe for more</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EAA500]" />
          </div>
        </div>

        {/* DESKTOP VIEW (>= 768px): Original 2-Column Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {events.map((evt) => {
            const isTargetEvent = evt.id === "himalayan-food-trade-innovation-expo-2026" || evt.date.includes("2026");
            return (
              <Link
                key={evt.id}
                href={`/events/${evt.id}?from=${from}`}
                className="group relative rounded-xl overflow-hidden shadow-md border border-slate-200/80 bg-[#03142A] min-h-[380px] sm:min-h-[420px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Background Image with Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${evt.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/85 to-transparent" />

                {/* Event Info Content */}
                <div className="relative p-6 sm:p-7 space-y-2.5 z-10 text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase leading-tight group-hover:text-[#EAA500] transition-colors">
                    {evt.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                    {evt.category}
                  </p>

                  <div className="pt-1 flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  {/* Live Ticking Countdown directly inside post card */}
                  {isTargetEvent && <CompactCardCountdown />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Events Button */}
        <div className="text-center pb-6 sm:pb-8">
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-7 py-3 rounded-md bg-[#03142A] hover:bg-[#072448] active:bg-[#020b18] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-colors shadow-md min-h-[44px]"
          >
            View All Events
          </Link>
        </div>

      </div>

      {/* Subtle Horizontal Divider with Yellow Accent Line */}
      <div className="relative w-full border-t border-slate-200 flex justify-center">
        <div className="w-8 h-1.5 bg-[#EAA500] -mt-0.5 rounded-full" />
      </div>
    </section>
  );
}
