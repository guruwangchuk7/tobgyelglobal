"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Handshake, Users, Globe, Calendar, MapPin, TrendingUp } from "lucide-react";
import { getCMSHeroConfig, INITIAL_HERO, HeroConfigCMS } from "@/app/lib/cmsStore";
import CountdownTimer from "@/app/components/CountdownTimer";

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
};

export default function Hero() {
  const [config, setConfig] = useState<HeroConfigCMS>(INITIAL_HERO);

  useEffect(() => {
    const loaded = getCMSHeroConfig();
    if (loaded) {
      setConfig(loaded);
    }
  }, []);

  return (
    <section className="relative bg-[#03142A] text-white overflow-hidden font-sans">
      {/* Background Image Overlay featuring high-res Bhutan Trade Pavilion & Delegates */}
      <div 
        className="absolute inset-0 bg-cover bg-right lg:bg-center"
        style={{
          backgroundImage: `url('${config.backgroundImageUrl}')`,
        }}
      />
      
      {/* Gradient Overlay for high text contrast while revealing the Bhutan trade pavilion on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 lg:via-[#03142A]/70 to-[#03142A]/40" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-20 lg:pb-28 z-10">
        <div className="max-w-3xl space-y-5 sm:space-y-6 text-left">
          
          {/* Main Heading matching landing page */}
          <div className="space-y-3">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.18] text-white font-sans">
              {config.headlineMain}{" "}
              <span className="block text-[#EAA500]">
                {config.headlineHighlight1}
              </span>
              <span className="block text-[#EAA500]">
                {config.headlineHighlight2}
              </span>
            </h1>
            {/* Small Yellow Accent Line under Heading */}
            <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-200 font-medium leading-relaxed max-w-xl">
            {config.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
            {/* Button 1: Exhibitor */}
            <Link
              href="/register/exhibitor"
              className="flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] active:bg-[#06305a] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <User className="w-5 h-5 text-white shrink-0" />
              <span>Register as Exhibitor</span>
            </Link>

            {/* Button 2: Sponsor */}
            <Link
              href="/register/sponsor"
              className="flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 rounded-lg bg-[#D49900] hover:bg-[#bd8800] active:bg-[#a37500] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <Handshake className="w-5 h-5 text-white shrink-0" />
              <span>Become a Sponsor</span>
            </Link>

            {/* Button 3: Visitor */}
            <Link
              href="/register/visitor"
              className="flex items-center justify-center gap-3 px-5 py-3.5 sm:px-6 rounded-lg bg-[#008E48] hover:bg-[#00773d] active:bg-[#006031] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <Users className="w-5 h-5 text-white shrink-0" />
              <span>Visitor Registration</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Highlights / Stats Bar */}
      <div className="relative bg-[#020b18] border-t border-slate-800/80 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-slate-700/60">
            {config.stats.map((item, idx) => {
              const IconComponent = iconMap[item.iconName] || Globe;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-3.5 px-1 lg:px-6 py-1.5 lg:py-0 text-left ${
                    idx === config.stats.length - 1 ? "col-span-2 sm:col-span-1 lg:col-span-1" : ""
                  }`}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-[#EAA500] shrink-0 stroke-[1.8]" />
                  <div>
                    <h3 className="text-[11px] sm:text-xs xl:text-sm font-black tracking-wider text-white uppercase leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
