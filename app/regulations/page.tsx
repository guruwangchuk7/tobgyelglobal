import Header from "../components/Header";
import Footer from "../components/Footer";
import { Landmark, FileText, ShieldCheck, Scale, AlertCircle, PhoneCall, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Government Regulations & Compliance | Tobgyel Global Expos",
  description: "Official government regulations, immigration rules, import procedures, tax & duty regulations, business compliance, and event participation guidelines for Bhutan trade expos.",
};

export default function RegulationsPage() {
  const regulationSections = [
    {
      icon: Landmark,
      title: "Immigration & Entry Rules",
      desc: "Official border entry procedures governed by the Department of Immigration, Ministry of Home Affairs, Royal Government of Bhutan.",
      points: [
        "All non-Bhutanese national delegates require valid entry clearance approved by the Department of Immigration.",
        "Indian citizens must carry original Passport or Voter Identity Card issued by the Election Commission of India.",
        "Exhibitors bringing foreign booth staff must submit accredited passport lists 10 days prior to event opening.",
      ],
    },
    {
      icon: FileText,
      title: "Import & Customs Procedures",
      desc: "Guidelines on temporary importation of exhibition goods overseen by the Department of Revenue & Customs.",
      points: [
        "Temporary import permits granted for non-saleable display machinery, prototypes, and exhibition stall structures.",
        "All commercial samples declared for sale must comply with standard Bhutan import duty assessments.",
        "Prohibited goods list applies (hazardous substances, unregistered pharmaceuticals, restricted flora/fauna).",
      ],
    },
    {
      icon: Scale,
      title: "Tax & Duty Regulations",
      desc: "Tax structures, tariff exemptions, and commercial transaction rules applicable to trade expo participants.",
      points: [
        "Exhibition display materials and promotional catalogs exempted from customs duty under event clearance.",
        "Sales tax (BST) applies to all commercial retail transactions conducted within the exhibition pavilion.",
        "Foreign currency remittance guidance provided by the Royal Monetary Authority of Bhutan (RMA).",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Business Compliance & Standards",
      desc: "Corporate compliance, safety regulations, and quality standards mandated by MoICE & BSB.",
      points: [
        "Product safety and food health standards inspected by the Bhutan Food & Drug Authority (BFDA).",
        "Fire safety, structural stability, and electrical load limits compliance certified by local Thromde authorities.",
        "Mandatory display of official exhibitor badges across all exhibition halls and B2B lounge areas.",
      ],
    },
    {
      icon: AlertCircle,
      title: "Event Participation Guidelines",
      desc: "Code of conduct, booth operation hours, and venue security protocols enforced by Tobgyel Global Expos.",
      points: [
        "Booth setup must be completed 12 hours prior to official inaugural ribbon-cutting ceremony.",
        "Dismantling of booth structures allowed only after official event closing hours on the final day.",
        "Security personnel present 24/7; official exhibitor pass required for after-hours hall entry.",
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
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-2.5 sm:space-y-3 z-10">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Government Regulations Dashboard
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium pt-1 leading-relaxed">
            Official statutory rules, immigration clearance, customs procedures, duty exemptions, and business compliance standards for participating in trade fairs in Bhutan.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Regulations Grid */}
        <section className="py-10 sm:py-18 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-black tracking-widest text-[#0A4D8C] uppercase">
                Statutory Framework &amp; Compliance
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-wider text-[#03142A] uppercase font-sans">
                Regulatory Guidelines for Participants
              </h2>
              <div className="w-12 h-1 bg-[#EAA500] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regulationSections.map((sec, idx) => {
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
                            <CheckCircle2 className="w-4 h-4 text-[#EAA500] shrink-0 mt-0.5" />
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
                Legal &amp; Regulatory Liaison
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                Have Specific Compliance or Customs Questions?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
                Our government liaison desk is ready to assist exhibitors with temporary import permits, customs clearance, and statutory compliance.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
              <a
                href="mailto:info@tobgyelglobalxpos.com"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] active:bg-[#aa7800] text-[#03142A] uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Regulatory Desk</span>
              </a>
              <Link
                href="/visit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Download className="w-4 h-4 text-[#EAA500]" />
                <span>Plan Your Visit</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
