import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileCheck, ShieldCheck, Compass, HelpCircle, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Quick Links | Tobgyel Global Expos",
  description: "Official quick links and external government portals including Department of Revenue & Customs (DRC), Bhutan Immigration, SDF Information, and Department of Tourism.",
};

export default function QuickLinksPage() {
  const quickLinks = [
    {
      title: "Import & Export — Department of Revenue & Customs (DRC)",
      linkText: "drc.gov.bt",
      href: "https://www.drc.gov.bt/?utm_source=chatgpt.com",
      desc: "Essential customs clearance, import & export tax guidelines, and revenue clearance procedures.",
      icon: FileCheck,
    },
    {
      title: "Immigration / Visa & Permit",
      linkText: "Bhutan Immigration Services Portal",
      href: "https://immi.gov.bt/home/?utm_source=chatgpt.com",
      desc: "Official portal for visa applications, entry permits, and immigration regulations for international delegates.",
      icon: ShieldCheck,
    },
    {
      title: "SDF Information",
      linkText: "Bhutan Travel – SDF Information",
      href: "https://bhutan.travel/faqs?utm_source=chatgpt.com",
      desc: "Sustainable Development Fee (SDF) rates, exemptions, guidelines, and FAQs for foreign visitors.",
      icon: HelpCircle,
    },
    {
      title: "Department of Tourism",
      linkText: "Department of Tourism – Bhutan Tourism Services Portal",
      href: "https://services.bhutan.travel/?utm_source=chatgpt.com",
      desc: "Official Bhutan tourism services portal, operator verification, tourism policies, and visitor support.",
      icon: Compass,
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
            Everything you need to know about traveling to Bhutan, securing entry visas, booking partner hotels, and navigating Phuentsholing &amp; Thimphu.
          </p>
        </div>
      </section>

      {/* Main Content: Official Government Quick Links */}
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#EAA500]/70 transition-all flex flex-col justify-between space-y-5 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-xl group-hover:bg-[#EAA500] group-hover:text-[#03142A] transition-colors shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[#EAA500] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-[#03142A] group-hover:text-[#EAA500] transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-[#03142A] transition-colors">
                    <span className="truncate max-w-[260px] text-slate-600 font-mono">{item.linkText}</span>
                    <span className="text-[#EAA500] font-sans text-[11px] uppercase tracking-wider font-extrabold group-hover:underline flex items-center gap-1 shrink-0">
                      Open Link &rarr;
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

