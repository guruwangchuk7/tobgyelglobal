"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDateStr?: string; // e.g. "Dec 30, 2026"
  eventTitle?: string;
  location?: string;
}

export default function CountdownTimer({
  targetDateStr = "Dec 30, 2026 09:00:00",
  eventTitle = "HIMALAYAN FOOD, TRADE & INNOVATION EXPO",
  location = "Samtse, Bhutan",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date("2026-12-30T09:00:00+06:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  if (!isMounted) return null;

  return (
    <div className="w-full bg-[#03142A]/90 border border-[#EAA500]/40 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-5 text-left relative overflow-hidden group">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EAA500]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#EAA500]/20 transition-all duration-500" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAA500] text-[#03142A] text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Next Major Expo Countdown</span>
          </span>
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide leading-tight pt-1">
            {eventTitle}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
          <div className="flex items-center gap-1.5 text-[#EAA500]">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Dec 30, 2026 – Jan 3, 2027</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 shrink-0 text-[#EAA500]" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* 4 Live Ticking Cards Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
        {/* DAYS */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 sm:p-4 space-y-1 shadow-inner relative">
          <span className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="block text-[10px] sm:text-xs font-extrabold uppercase text-[#EAA500] tracking-wider">
            DAYS
          </span>
        </div>

        {/* HOURS */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 sm:p-4 space-y-1 shadow-inner relative">
          <span className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="block text-[10px] sm:text-xs font-extrabold uppercase text-[#EAA500] tracking-wider">
            HOURS
          </span>
        </div>

        {/* MINUTES */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 sm:p-4 space-y-1 shadow-inner relative">
          <span className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="block text-[10px] sm:text-xs font-extrabold uppercase text-[#EAA500] tracking-wider">
            MINUTES
          </span>
        </div>

        {/* SECONDS */}
        <div className="bg-slate-900/90 border border-[#EAA500]/60 rounded-xl p-3 sm:p-4 space-y-1 shadow-inner relative bg-gradient-to-b from-slate-900 to-[#0A4D8C]/30">
          <span className="text-2xl sm:text-4xl font-black text-[#EAA500] tracking-tight font-mono animate-pulse">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="block text-[10px] sm:text-xs font-extrabold uppercase text-white tracking-wider">
            SECONDS
          </span>
        </div>
      </div>

    </div>
  );
}

export function CompactCardCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date("2026-12-30T09:00:00+06:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full bg-[#03142A]/95 border border-[#EAA500]/60 rounded-xl p-3 sm:p-4 shadow-xl backdrop-blur-md space-y-2 mt-3 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-black uppercase text-[#EAA500] tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#EAA500] animate-pulse" />
          <span>Expo Countdown Timer</span>
        </span>
        <span className="text-[9px] font-bold uppercase text-slate-400">Dec 30, 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
        <div className="bg-slate-900 border border-slate-700/90 rounded-lg py-1.5 px-1">
          <span className="block text-sm sm:text-lg font-black text-white leading-none">{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="block text-[8px] font-black uppercase text-[#EAA500] mt-0.5">DAYS</span>
        </div>
        <div className="bg-slate-900 border border-slate-700/90 rounded-lg py-1.5 px-1">
          <span className="block text-sm sm:text-lg font-black text-white leading-none">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="block text-[8px] font-black uppercase text-[#EAA500] mt-0.5">HOURS</span>
        </div>
        <div className="bg-slate-900 border border-slate-700/90 rounded-lg py-1.5 px-1">
          <span className="block text-sm sm:text-lg font-black text-white leading-none">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="block text-[8px] font-black uppercase text-[#EAA500] mt-0.5">MINS</span>
        </div>
        <div className="bg-[#0A4D8C]/50 border border-[#EAA500]/70 rounded-lg py-1.5 px-1">
          <span className="block text-sm sm:text-lg font-black text-[#EAA500] leading-none animate-pulse">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="block text-[8px] font-black uppercase text-white mt-0.5">SECS</span>
        </div>
      </div>
    </div>
  );
}
