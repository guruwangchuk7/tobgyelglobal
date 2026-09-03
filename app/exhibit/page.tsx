"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { CheckCircle2, UserCheck, BarChart3, Globe2 } from "lucide-react";

export default function ExhibitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      
      {/* Page Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-10 sm:py-18 relative overflow-hidden border-b border-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/85 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-2.5 sm:space-y-3 z-10">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Exhibit With Us
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-medium pt-1">
            Showcase your products, services, and innovations to key government stakeholders, regional distributors, and qualified global buyers.
          </p>
        </div>
      </section>

      <main className="flex-1 py-10 sm:py-18 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          
          {/* Key Benefits Grid */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-3xl font-black tracking-wider text-[#03142A] uppercase font-sans">
                Why Exhibit At Tobgyel Global Expos?
              </h2>
              <div className="w-12 h-1 bg-[#EAA500] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: UserCheck,
                  title: "Direct B2B Access",
                  desc: "Connect directly with decision-makers, government officials, and vetted regional trade partners.",
                },
                {
                  icon: Globe2,
                  title: "Bhutan Market Expansion",
                  desc: "Establish your brand presence in Bhutan's rapidly growing trade and investment ecosystem.",
                },
                {
                  icon: BarChart3,
                  title: "Maximized ROI",
                  desc: "Benefit from targeted media coverage, curated business matching, and high-footfall expo halls.",
                },
              ].map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4 text-left hover:shadow-md transition-all">
                    <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-lg w-fit">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#03142A]">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registration Form / Callout */}
          <div className="bg-[#03142A] text-white rounded-2xl p-6 sm:p-12 shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-left">
              <h3 className="text-xl sm:text-3xl font-black uppercase text-white">
                Book Your Booth Space Today
              </h3>
              <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed">
                Booths are allocated on a first-come, first-served basis. Secure prime hall locations for the BIN Trade Showcase 2027.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                  <span>Customizable Shell Scheme &amp; Raw Space Options</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                  <span>Complimentary B2B Matchmaking Portal Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0" />
                  <span>Official Exhibitor Badge &amp; Catalog Listing</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
              <Link
                href="/register/exhibitor"
                className="w-full py-3.5 sm:py-4 px-6 rounded-lg bg-[#D49900] hover:bg-[#bd8800] active:bg-[#a37500] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest text-center shadow-lg transition-all min-h-[48px] flex items-center justify-center"
              >
                Register As Exhibitor
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
