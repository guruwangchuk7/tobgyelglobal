"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Handshake,
  Globe,
  Landmark,
  Plane,
  FileText,
  Building,
  Truck,
  Shield,
  Receipt,
  Compass,
  Car,
  Sun,
  Contact,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import {
  getCMSWhyExhibit,
  getCMSParticipants,
  getCMSRegulations,
  getCMSVisit,
  WhyExhibitCMS,
  ParticipantsCMS,
  RegulationsCMS,
  VisitCMS
} from "@/app/lib/cmsStore";

interface InfoHubProps {
  whyExhibitConfig?: WhyExhibitCMS | null;
  participantsConfig?: ParticipantsCMS | null;
  regulationsConfig?: RegulationsCMS | null;
  visitConfig?: VisitCMS | null;
}

export default function InfoHub({
  whyExhibitConfig: propWhy,
  participantsConfig: propPart,
  regulationsConfig: propReg,
  visitConfig: propVisit,
}: InfoHubProps) {
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [regulationsOpen, setRegulationsOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const [whyConfig, setWhyConfig] = useState<WhyExhibitCMS | null>(propWhy || null);
  const [partConfig, setPartConfig] = useState<ParticipantsCMS | null>(propPart || null);
  const [regConfig, setRegConfig] = useState<RegulationsCMS | null>(propReg || null);
  const [visConfig, setVisConfig] = useState<VisitCMS | null>(propVisit || null);

  useEffect(() => {
    if (propWhy !== undefined) setWhyConfig(propWhy);
    else setWhyConfig(getCMSWhyExhibit());

    if (propPart !== undefined) setPartConfig(propPart);
    else setPartConfig(getCMSParticipants());

    if (propReg !== undefined) setRegConfig(propReg);
    else setRegConfig(getCMSRegulations());

    if (propVisit !== undefined) setVisConfig(propVisit);
    else setVisConfig(getCMSVisit());
  }, [propWhy, propPart, propReg, propVisit]);

  const whyPoints = whyConfig?.points?.map(p => p.title) || [
    "Meet qualified buyers",
    "Expand into Bhutan",
    "Connect with regional partners",
    "Increase brand visibility",
    "Launch products & services",
  ];

  const participantLinks = partConfig?.links?.map(l => ({ icon: FileText, text: l.title, href: l.href || "/participants" })) || [
    { icon: FileText, text: "Visa & Entry", href: "/participants" },
    { icon: Building, text: "Hotels", href: "/participants" },
    { icon: Truck, text: "Logistics", href: "/participants" },
    { icon: Shield, text: "Customs", href: "/participants" },
    { icon: Receipt, text: "Tax Information", href: "/participants" },
  ];

  const regulationItems = regConfig?.guidelines?.map(g => ({ icon: FileText, text: g.title, href: "/regulations" })) || [
    { icon: FileText, text: "Immigration Rules", href: "/regulations" },
    { icon: FileText, text: "Import Procedures", href: "/regulations" },
    { icon: FileText, text: "Tax & Duty Regulations", href: "/regulations" },
    { icon: FileText, text: "Business Compliance", href: "/regulations" },
    { icon: FileText, text: "Event Participation", href: "/regulations" },
  ];

  const visitItems = visConfig?.cards?.map(c => ({ icon: Compass, text: c.title, href: "/visit" })) || [
    { icon: Compass, text: "Travel Information", href: "/visit" },
    { icon: Building, text: "Accommodation", href: "/visit" },
    { icon: Car, text: "Transportation", href: "/visit" },
    { icon: Sun, text: "Weather", href: "/visit" },
    { icon: Contact, text: "Useful Contacts", href: "/visit" },
  ];

  return (
    <section className="py-10 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MOBILE VIEW (< 768px): Progressive Disclosure Accordions & Compact Summaries */}
        <div className="md:hidden space-y-4 text-left">

          {/* Mobile Card 1: WHY EXHIBIT? Compact Summary */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <Handshake className="w-6 h-6 text-[#03142A] stroke-[1.5] shrink-0" />
              <div>
                <h3 className="text-sm font-black tracking-wider text-[#03142A] uppercase font-sans">
                  {whyConfig?.title || "WHY EXHIBIT?"}
                </h3>
                <div className="w-8 h-0.5 bg-[#EAA500] mt-1" />
              </div>
            </div>

            <ul className="space-y-2 pt-1 text-xs text-slate-800 font-semibold">
              {whyPoints.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008E48] stroke-[2.5] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/exhibit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
              >
                {whyConfig?.ctaText || "Learn More"}
              </Link>
            </div>
          </div>

          {/* Mobile Accordion 2: INTERNATIONAL PARTICIPANTS */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
            <button
              onClick={() => setParticipantsOpen(!participantsOpen)}
              className="w-full p-4 flex items-center justify-between min-h-[48px] text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-xs font-black tracking-wider text-[#03142A] uppercase font-sans">
                    {partConfig?.title || "INTERNATIONAL PARTICIPANTS"}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {partConfig?.subtitle || "Visa, Hotels, Customs & Logistics"}
                  </span>
                </div>
              </div>
              {participantsOpen ? (
                <ChevronUp className="w-5 h-5 text-[#EAA500] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
              )}
            </button>

            {participantsOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-200/80 space-y-3 animate-fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-slate-800">
                  {participantLinks.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 py-1 text-slate-800 hover:text-[#0A4D8C] transition-colors"
                        >
                          <ItemIcon className="w-4 h-4 text-slate-500 shrink-0 stroke-[1.8]" />
                          <span>{item.text}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/participants"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
                  >
                    Participant Guide
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Accordion 3: GOVERNMENT REGULATIONS */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
            <button
              onClick={() => setRegulationsOpen(!regulationsOpen)}
              className="w-full p-4 flex items-center justify-between min-h-[48px] text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <Landmark className="w-6 h-6 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-xs font-black tracking-wider text-[#03142A] uppercase font-sans">
                    {regConfig?.title || "GOVERNMENT REGULATIONS"}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {regConfig?.subtitle || "Immigration, Import & Compliance"}
                  </span>
                </div>
              </div>
              {regulationsOpen ? (
                <ChevronUp className="w-5 h-5 text-[#EAA500] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
              )}
            </button>

            {regulationsOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-200/80 space-y-3 animate-fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-slate-800">
                  {regulationItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 py-1 text-slate-800 hover:text-[#0A4D8C] transition-colors"
                        >
                          <ItemIcon className="w-4 h-4 text-slate-500 shrink-0 stroke-[1.8]" />
                          <span>{item.text}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/regulations"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
                  >
                    Read Regulations
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Accordion 4: PLAN YOUR VISIT */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
            <button
              onClick={() => setVisitOpen(!visitOpen)}
              className="w-full p-4 flex items-center justify-between min-h-[48px] text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <Plane className="w-6 h-6 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-xs font-black tracking-wider text-[#03142A] uppercase font-sans">
                    {visConfig?.title || "PLAN YOUR VISIT"}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {visConfig?.subtitle || "Travel, Flights & Weather"}
                  </span>
                </div>
              </div>
              {visitOpen ? (
                <ChevronUp className="w-5 h-5 text-[#EAA500] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
              )}
            </button>

            {visitOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-200/80 space-y-3 animate-fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-slate-800">
                  {visitItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 py-1 text-slate-800 hover:text-[#0A4D8C] transition-colors"
                        >
                          <ItemIcon className="w-4 h-4 text-slate-500 shrink-0 stroke-[1.8]" />
                          <span>{item.text}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/visit"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
                  >
                    {visConfig?.ctaText || "Visitor Guide"}
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* DESKTOP VIEW (>= 768px): Original 4-Column Layout */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">

          {/* Column 1: WHY EXHIBIT? */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 pb-6 lg:pb-0 border-b sm:border-b-0 border-slate-200 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Handshake className="w-8 h-8 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-sm font-black tracking-wider text-[#03142A] uppercase font-sans">
                    {whyConfig?.title || "WHY EXHIBIT?"}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#EAA500] mt-1" />
                </div>
              </div>

              <ul className="space-y-3 pt-3">
                {whyPoints.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                    <Check className="w-4 h-4 text-[#008E48] stroke-[2.5] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/exhibit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                {whyConfig?.ctaText || "Learn More"}
              </Link>
            </div>
          </div>

          {/* Column 2: INTERNATIONAL PARTICIPANTS */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 pb-6 lg:pb-0 border-b sm:border-b-0 border-slate-200 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-sm font-black tracking-wider text-[#03142A] uppercase font-sans leading-tight">
                    {partConfig?.title || "INTERNATIONAL PARTICIPANTS"}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#EAA500] mt-1" />
                </div>
              </div>

              <ul className="space-y-3 pt-3">
                {participantLinks.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold hover:text-[#0A4D8C] transition-colors"
                      >
                        <ItemIcon className="w-4 h-4 text-slate-600 shrink-0 stroke-[1.8]" />
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/participants"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Participant Guide
              </Link>
            </div>
          </div>

          {/* Column 3: GOVERNMENT REGULATIONS */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 pb-6 lg:pb-0 border-b sm:border-b-0 border-slate-200 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Landmark className="w-8 h-8 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-sm font-black tracking-wider text-[#03142A] uppercase font-sans leading-tight">
                    {regConfig?.title || "GOVERNMENT REGULATIONS"}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#EAA500] mt-1" />
                </div>
              </div>

              <ul className="space-y-3 pt-3">
                {regulationItems.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold hover:text-[#0A4D8C] transition-colors"
                      >
                        <ItemIcon className="w-4 h-4 text-slate-600 shrink-0 stroke-[1.8]" />
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/regulations"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Read Regulations
              </Link>
            </div>
          </div>

          {/* Column 4: PLAN YOUR VISIT */}
          <div className="flex flex-col justify-between space-y-6 lg:px-6 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Plane className="w-8 h-8 text-[#03142A] stroke-[1.5] shrink-0" />
                <div>
                  <h3 className="text-sm font-black tracking-wider text-[#03142A] uppercase font-sans">
                    {visConfig?.title || "PLAN YOUR VISIT"}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#EAA500] mt-1" />
                </div>
              </div>

              <ul className="space-y-3 pt-3">
                {visitItems.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold hover:text-[#0A4D8C] transition-colors"
                      >
                        <ItemIcon className="w-4 h-4 text-slate-600 shrink-0 stroke-[1.8]" />
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/visit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#03142A] hover:bg-[#072448] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                {visConfig?.ctaText || "Visitor Guide"}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
