import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, Building, Truck, ShieldCheck, Receipt, PhoneCall, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "International Participants Guide | Tobgyel Global Expos",
  description: "Official guide for international trade delegates, exhibitors, and visitors: visa & entry permits, hotel accommodations, freight logistics, customs procedures, and tax information in Bhutan.",
};

export default function ParticipantsPage() {
  const participantSections = [
    {
      icon: FileText,
      title: "Visa & Entry Formalities",
      desc: "All international trade delegates receive expedited visa clearance through Tobgyel Global Expos accredited portal.",
      points: [
        "Online trade visa applications processed within 3 to 5 business days.",
        "Indian nationals can present original Voter ID or Passport at Phuentsholing entry terminal.",
        "Sustainable Development Fee (SDF) waiver assistance for certified trade exhibitors.",
      ],
    },
    {
      icon: Building,
      title: "Official Partner Hotels",
      desc: "Exclusive discounted room rates and VIP hospitality packages for registered international attendees.",
      points: [
        "20% to 35% room discount at 4-star and 5-star partner hotels in Phuentsholing & Thimphu.",
        "Complimentary breakfast, high-speed Wi-Fi, and daily venue shuttle transfers included.",
        "Featured Partner Hotels: Druk Hotel, Hotel Tara Phendeyling, Le Méridien, Taj Tashi.",
      ],
    },
    {
      icon: Truck,
      title: "Freight & Cargo Logistics",
      desc: "Comprehensive door-to-booth freight forwarding and cargo handling for exhibition materials.",
      points: [
        "Temporary import bond assistance for foreign exhibition booth equipment.",
        "On-site warehouse storage and forklift handling at Phuentsholing & Thimphu expo halls.",
        "Cross-border shipping coordination from Kolkata Port, Bagdogra Airport, and Jaigaon ICD.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Customs & Clearance",
      desc: "Streamlined customs inspection and duty-free entry for promotional materials and display samples.",
      points: [
        "Fast-track customs clearance at Paro Airport and Phuentsholing land border checkpoint.",
        "Duty-free allowance for non-saleable promotional brochures, catalogs, and giveaway banners.",
        "On-site customs helpdesk available during exhibition setup days.",
      ],
    },
    {
      icon: Receipt,
      title: "Tax & Financial Information",
      desc: "Guidelines on commercial transactions, foreign currency exchange, and tax compliance in Bhutan.",
      points: [
        "Bhutanese Ngultrum (BTN) pegged 1:1 with Indian Rupee (INR).",
        "INR currency notes up to ₹500 widely accepted across commercial establishments.",
        "International credit card POS terminals available at all official venue counters.",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Header />
      
      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-10 sm:py-18 relative overflow-hidden border-b border-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-2.5 sm:space-y-3 z-10">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            International Participants Guide
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium pt-1 leading-relaxed">
            Essential guidelines for global exhibitors, overseas business delegations, and international buyers attending Tobgyel Global Expos in Bhutan.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Sections Grid */}
        <section className="py-10 sm:py-18 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-black tracking-widest text-[#0A4D8C] uppercase">
                Delegate Services &amp; Logistics
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-wider text-[#03142A] uppercase font-sans">
                Overseas Participant Support
              </h2>
              <div className="w-12 h-1 bg-[#EAA500] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {participantSections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <div key={idx} className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-lg w-fit shadow-sm">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#03142A]">
                        {sec.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        {sec.desc}
                      </p>

                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {sec.points.map((p, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#008E48] shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Support Callout */}
        <section className="py-10 sm:py-18 bg-[#03142A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black tracking-widest text-[#EAA500] uppercase">
                International Helpdesk
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                Need Dedicated Overseas Delegate Assistance?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
                Our international relations team is ready to assist your trade delegation with invitation letters, visa processing, and booth logistics.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
              <a
                href="mailto:info@tobgyelglobalxpos.com"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] active:bg-[#aa7800] text-[#03142A] uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Overseas Concierge</span>
              </a>
              <Link
                href="/exhibit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Download className="w-4 h-4 text-[#EAA500]" />
                <span>Exhibitor Prospectus</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
