import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  FileText, 
  Info, 
  UserCheck, 
  Building2, 
  CreditCard, 
  CalendarDays, 
  ShieldAlert, 
  ExternalLink, 
  Scale, 
  RefreshCw, 
  Mail, 
  CheckCircle2,
  Award
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Tobgyel Global Expos",
  description: "Official Terms & Conditions and Exhibitor Cancellation & Refund Policy for Tobgyel Global Expos.",
};

export default function TermsAndConditionsPage() {
  const termsSections = [
    {
      icon: Info,
      title: "1. About the Website",
      desc: "General overview of site contents and services.",
      points: [
        "This website provides information about Tobgyel Global Expos, its exhibitions, trade showcases, conferences, business activities, registration opportunities, exhibitors, sponsors, partners and related services.",
      ],
    },
    {
      icon: FileText,
      title: "2. Website Information",
      desc: "Accuracy of information and operational modifications.",
      points: [
        "We make reasonable efforts to ensure that information published on the website is accurate and current.",
        "However, event dates, venues, exhibitors, programmes, speakers, stall arrangements, prices and other details may change due to operational, regulatory, safety or other circumstances.",
        "Tobgyel Global Expos reserves the right to modify event information where reasonably necessary.",
      ],
    },
    {
      icon: UserCheck,
      title: "3. Registration",
      desc: "Account requirements and confirmation policies.",
      points: [
        "Certain website features may require registration.",
        "Users are responsible for providing accurate and complete information and for keeping their contact information up to date.",
        "Submitting a registration or application does not automatically guarantee acceptance or participation unless confirmation is provided by Tobgyel Global Expos.",
      ],
    },
    {
      icon: Building2,
      title: "4. Exhibitor Participation",
      desc: "Compliance requirements for participating exhibitors.",
      points: [
        "Exhibitors must comply with applicable laws and regulations, venue requirements, event rules, safety requirements, customs and import requirements where applicable, product-specific regulatory requirements, and instructions issued by Tobgyel Global Expos.",
        "The organizer may refuse or cancel participation where an exhibitor, product, activity or conduct presents legal, safety, reputational or operational concerns.",
      ],
    },
    {
      icon: CreditCard,
      title: "5. Payments",
      desc: "Pricing transparency and payment confirmation.",
      points: [
        "Where participation, stall booking, sponsorship or other services require payment, applicable prices and payment conditions will be communicated during the relevant registration or booking process.",
        "Payment does not necessarily constitute final confirmation until the organizer confirms the booking.",
      ],
    },
    {
      icon: CalendarDays,
      title: "6. Event Changes",
      desc: "Schedule and venue adjustments.",
      points: [
        "Tobgyel Global Expos may reasonably change event schedules, programmes, venues, exhibitors, speakers, stall locations or other arrangements.",
        "Where significant changes occur, reasonable efforts will be made to communicate them to affected participants.",
      ],
    },
    {
      icon: Award,
      title: "7. Intellectual Property",
      desc: "Protection of website content and trademarks.",
      points: [
        "Unless otherwise stated, website content including logos, graphics, photographs, text, designs, branding and other materials is owned by or used with permission by Tobgyel Global Expos or its respective rights holders.",
        "Such materials may not be reproduced, modified, distributed or commercially used without appropriate authorization.",
      ],
    },
    {
      icon: ShieldAlert,
      title: "8. User Conduct",
      desc: "Prohibited uses of the website and portal.",
      points: [
        "Must not use the website for unlawful purposes",
        "Must not provide false or misleading information",
        "Must not attempt to gain unauthorized access to website systems",
        "Must not interfere with website operation",
        "Must not upload malicious software",
        "Must not misuse information obtained through the website",
      ],
    },
    {
      icon: ExternalLink,
      title: "9. Third-Party Links",
      desc: "External website references and disclaimers.",
      points: [
        "The website may contain links to third-party websites.",
        "These links are provided for convenience and do not necessarily constitute endorsement by Tobgyel Global Expos.",
      ],
    },
    {
      icon: Scale,
      title: "10. Limitation of Liability",
      desc: "Liability boundaries under applicable law.",
      points: [
        "To the extent permitted by applicable law, Tobgyel Global Expos will not be responsible for losses arising from reliance on information that has subsequently changed, temporary website unavailability, third-party services or circumstances beyond our reasonable control.",
      ],
    },
    {
      icon: RefreshCw,
      title: "11. Changes to These Terms",
      desc: "Terms updates and user acceptance.",
      points: [
        "We may update these Terms & Conditions from time to time.",
        "Continued use of the website after an updated version is published constitutes acceptance of the updated terms to the extent permitted by applicable law.",
      ],
    },
  ];

  const cancellationPoints = [
    {
      title: "1. Booking Confirmation",
      text: "An exhibition stall, sponsorship package or other service is considered confirmed only after the required registration and payment conditions have been completed and confirmation has been issued by Tobgyel Global Expos.",
    },
    {
      title: "2. Cancellation by Exhibitor",
      text: "Cancellation requests must be submitted in writing to Tobgyel Global Expos. The applicable refund, if any, will depend on the cancellation date and the terms communicated for the specific event.",
    },
    {
      title: "3. Cancellation by the Organizer",
      text: "If Tobgyel Global Expos cancels an event, affected exhibitors will be informed of the available refund, credit or alternative arrangements. Where cancellation results from circumstances beyond the reasonable control of the organizer, arrangements may be made based on the costs already incurred, available insurance, venue conditions and applicable law.",
    },
    {
      title: "4. Event Postponement",
      text: "If an event is postponed, the organizer may transfer an exhibitor's booking to the revised event date. Where appropriate, exhibitors will be informed of any alternative refund or credit arrangements.",
    },
    {
      title: "5. Non-Refundable Costs",
      text: "Certain costs paid to third parties, transaction charges, customized services, advertising production, accommodation, transportation or other services may be non-refundable where such costs have already been incurred.",
    },
    {
      title: "6. Refund Processing",
      text: "Approved refunds will normally be processed through the original payment method where reasonably possible. Processing time may depend on the payment provider or financial institution.",
    },
    {
      title: "7. No-Show",
      text: "If an exhibitor fails to attend the event without providing an eligible cancellation notice, the payment may be treated as non-refundable.",
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
            Legal &amp; Governance
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Terms &amp; Conditions
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Welcome to the website of Tobgyel Global Expos. By accessing or using this website, you agree to comply with these Terms &amp; Conditions. If you do not agree with these terms, please do not use the website.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Main Terms & Conditions Section */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#03142A]">
                General Terms Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Please review these Terms &amp; Conditions carefully before using our website, submitting exhibitor applications, or registering for trade exhibitions organized by Tobgyel Global Expos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {termsSections.map((sec, idx) => {
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Exhibitor Cancellation & Refund Policy Card Block */}
            <div id="cancellation-policy" className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 text-left">
              <div className="border-b border-slate-200 pb-4 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-[#03142A] text-xs font-bold rounded-full border border-amber-200">
                  <RefreshCw className="w-3.5 h-3.5 text-[#EAA500]" />
                  <span>Commercial &amp; Financial Policy</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-[#03142A] uppercase tracking-tight">
                  Exhibitor Cancellation &amp; Refund Policy
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Last Updated: 1 September 2026
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  This policy applies to exhibitors, sponsors and other participants who make payments to Tobgyel Global Expos for exhibition-related services, unless a specific written agreement provides otherwise.
                </p>
              </div>

              {/* Refund Schedule Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[#03142A] uppercase tracking-wider">
                  Recommended Refund Schedule
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[480px]">
                    <thead>
                      <tr className="bg-[#03142A] text-white text-xs font-extrabold uppercase tracking-wider">
                        <th className="py-3.5 px-4 sm:px-6">Cancellation Period</th>
                        <th className="py-3.5 px-4 sm:px-6">Refund Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/50">
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">More than 90 days before the event</td>
                        <td className="py-3 px-4 sm:px-6 text-emerald-700 font-extrabold">80% Refund</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">60–89 days before the event</td>
                        <td className="py-3 px-4 sm:px-6 text-amber-700 font-extrabold">50% Refund</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">30–59 days before the event</td>
                        <td className="py-3 px-4 sm:px-6 text-orange-700 font-extrabold">25% Refund</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors bg-rose-50/40">
                        <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">Less than 30 days before the event</td>
                        <td className="py-3 px-4 sm:px-6 text-rose-700 font-extrabold">No Refund</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 italic">
                  Note: The above schedule may be replaced by event-specific terms communicated at the time of booking.
                </p>
              </div>

              {/* Details List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                {cancellationPoints.map((cp, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#03142A]">
                      {cp.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {cp.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Need a dedicated copy of the Exhibitor Cancellation &amp; Refund Policy?</span>
                <Link 
                  href="/cancellation-policy" 
                  className="text-[#03142A] hover:text-[#EAA500] font-extrabold underline inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Dedicated Cancellation Policy Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Support / Accounts Inquiry Banner */}
            <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-xl space-y-4 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-sans">
                  Billing, Invoicing or Policy Assistance Needed?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  For stall bookings, payment terms, or policy clarification, please contact our administrative desk.
                </p>
              </div>
              <a
                href="mailto:info@tobgyelglobalxpos.com?subject=Terms%20and%20Cancellation%20Inquiry"
                className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Desk</span>
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

