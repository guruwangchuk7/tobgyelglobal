import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Users, Building2, BadgeDollarSign, Ticket, FileCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Quick Links | Tobgyel Global Expos",
  description: "Official quick links for Tobgyel Global Expos including International Participants, Exhibitor Registration, Sponsor Registration, Visitor Registration, and Tax & Customs Regulations.",
};

export default function QuickLinksPage() {
  const quickLinks = [
    {
      title: "International Participants",
      href: "/participants",
      desc: "Overview for international trade delegations, foreign exhibitors, and global participants.",
      icon: Users,
    },
    {
      title: "Register as Exhibitor",
      href: "/register/exhibitor",
      desc: "Apply online to book your stall and showcase your products at upcoming international expos.",
      icon: Building2,
    },
    {
      title: "Become a Sponsor",
      href: "/register/sponsor",
      desc: "Explore sponsorship tiers, strategic branding opportunities, and premium event visibility.",
      icon: BadgeDollarSign,
    },
    {
      title: "Visitor Registration",
      href: "/register/visitor",
      desc: "Register online for official trade visitor badges and entry passes.",
      icon: Ticket,
    },
    {
      title: "Tax & Customs Regulations",
      href: "/regulations",
      desc: "Essential customs clearance, import tax guidelines, and goods entry procedures.",
      icon: FileCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#03142A] font-sans">
      <Header />

      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-3 z-10">
          <span className="block text-xs font-extrabold tracking-widest text-[#EAA500] uppercase">
            Official Shortcuts &amp; Portals
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Quick Links
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
            Direct access to key registration portals, participant guides, sponsorship applications, and customs regulations.
          </p>
        </div>
      </section>

      {/* Main Content: The 5 Requested Quick Links */}
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#EAA500]/70 transition-all flex flex-col justify-between space-y-5 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-xl group-hover:bg-[#EAA500] group-hover:text-[#03142A] transition-colors shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[#EAA500] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-[#03142A] group-hover:text-[#EAA500] transition-colors">
                        • {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#03142A] transition-colors font-mono">
                    <span>{item.href}</span>
                    <span className="text-[#EAA500] font-sans text-[11px] uppercase tracking-wider font-extrabold group-hover:underline">
                      Open Link &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
