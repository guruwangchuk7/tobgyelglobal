import Header from "../components/Header";
import Footer from "../components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, Mail, CheckCircle2, FileText, ExternalLink, HelpCircle, Bell } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tobgyel Global Expos",
  description: "Official Privacy Policy for Tobgyel Global Expos. Learn how we collect, protect, use, store, and handle participant data, exhibitor information, and online transactions.",
};

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      desc: "Depending on how you use our website or participate in our events, we may collect:",
      points: [
        "Name and designation",
        "Company or organization name",
        "Country and business location",
        "Email address",
        "Telephone / mobile number",
        "Website or social media details",
        "Exhibitor and sponsorship requirements",
        "Visitor registration information",
        "Event preferences and enquiries",
        "Payment and transaction information where applicable",
        "Information voluntarily provided through forms, applications or correspondence",
      ],
      note: "Where necessary for event participation, travel coordination, venue security or regulatory requirements, additional identification information may be requested. We will explain the purpose of collecting such information at the time it is requested.",
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      desc: "We may use collected information to:",
      points: [
        "Process visitor and exhibitor registrations",
        "Communicate regarding events, applications and bookings",
        "Provide exhibitor and sponsorship services",
        "Process payments where applicable",
        "Coordinate event logistics",
        "Respond to enquiries",
        "Provide event updates and announcements",
        "Improve our website and services",
        "Maintain records relating to participation",
        "Prevent misuse, fraud or unauthorized activity",
        "Comply with applicable legal and regulatory requirements",
      ],
    },
    {
      icon: UserCheck,
      title: "3. Sharing of Information",
      desc: "We do not sell personal information for money.",
      points: [
        "Service Providers & Partners: Information may be shared with service providers, payment processors, venue operators, event contractors, technology providers or relevant authorities where reasonably necessary to provide requested services, operate an event, process a transaction, maintain security or comply with applicable requirements.",
        "Limited Disclosure: We will seek to limit information sharing to what is reasonably necessary for the relevant purpose.",
      ],
    },
    {
      icon: Bell,
      title: "4. Marketing Communications",
      desc: "Keeping you informed about event opportunities and announcements.",
      points: [
        "Where permitted and appropriate, we may use contact information to send information about our events, exhibitions, registration opportunities, announcements and related business activities.",
        "You may request that we stop sending promotional communications at any time.",
      ],
    },
    {
      icon: Lock,
      title: "5. Payment Information",
      desc: "Secure handling of commercial and registration payments.",
      points: [
        "Third-Party Processing: Where online payments are offered, payment transactions may be processed through third-party payment providers.",
        "Card Data Security: Tobgyel Global Expos does not intend to retain complete payment-card details unless this is necessary and lawfully permitted for the relevant service.",
        "Provider Terms: Users should review the privacy and security terms of the payment provider used for their transaction.",
      ],
    },
    {
      icon: Shield,
      title: "6. Data Security",
      desc: "Protection measures for electronic data and communications.",
      points: [
        "We take reasonable administrative, technical and organizational measures to protect information against unauthorized access, loss, misuse, alteration or disclosure.",
        "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
      ],
    },
    {
      icon: ExternalLink,
      title: "7. Third-Party Websites",
      desc: "Independent third-party links and services.",
      points: [
        "Our website may contain links to websites operated by third parties, including sponsors, partners, hotels, travel providers, payment providers and other organizations.",
        "We are not responsible for the privacy practices or content of third-party websites. Users should review the privacy policies of those websites separately.",
      ],
    },
    {
      icon: FileText,
      title: "8. Data Retention",
      desc: "Guidelines on how long we keep your information.",
      points: [
        "We retain information for as long as reasonably necessary for the purposes for which it was collected, including event administration, accounting, legal, regulatory and business record requirements.",
      ],
    },
    {
      icon: HelpCircle,
      title: "9. Your Requests",
      desc: "Access, corrections, and communication preferences.",
      points: [
        "You may contact us to request information about personal information we hold about you, request correction of inaccurate information, or ask us to stop certain communications, subject to applicable legal and operational requirements.",
      ],
    },
    {
      icon: Bell,
      title: "10. Changes to This Policy",
      desc: "Updates to privacy terms and effective dates.",
      points: [
        "We may update this Privacy Policy when our services, website or legal requirements change.",
        "The updated version will be published on this page with a revised “Last Updated” date.",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#03142A] font-sans">
      <Header />

      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-10 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-3 z-10">
          <span className="text-xs font-extrabold tracking-widest text-[#EAA500] uppercase">
            Legal &amp; Data Protection
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Privacy Policy
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Tobgyel Global Expos (&quot;Tobgyel Global Expos&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) respects the privacy of visitors, exhibitors, sponsors, partners, speakers and other users of our website. This Privacy Policy explains how we collect, use, store and protect information provided through our website and event registration services.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Main Content Grid */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#03142A]">
                Statement of Privacy Commitment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Tobgyel Global Expos is dedicated to protecting personal information collected through our official portal, event applications, and visitor registrations. Please review the detailed sections below regarding our data handling principles.
              </p>
              <p className="text-xs text-slate-500 font-medium pt-1">
                Last Updated: 1 September 2026
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {policySections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <div key={idx} className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-lg w-fit shadow-sm">
                        <Icon className="w-5 h-5 stroke-[2]" />
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
                      {sec.note && (
                        <div className="mt-3 p-3 bg-slate-50 border-l-4 border-[#EAA500] rounded-r text-xs text-slate-600 font-medium leading-relaxed">
                          {sec.note}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Officer Callout */}
            <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-xl space-y-4 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-sans">
                  Questions Regarding Our Privacy Practices?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  If you have any questions about this Privacy Policy, wish to exercise your data rights, or need to update your registered information, please reach out to our team.
                </p>
              </div>
              <a
                href="mailto:info@tobgyelglobalxpos.com?subject=Privacy%20Inquiry"
                className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Privacy Team</span>
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

