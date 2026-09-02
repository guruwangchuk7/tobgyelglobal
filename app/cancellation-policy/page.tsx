import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { RefreshCw, Mail, CheckCircle2, ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Exhibitor Cancellation & Refund Policy | Tobgyel Global Expos",
  description: "Official Exhibitor Cancellation & Refund Policy for Tobgyel Global Expos. Details on booking confirmations, exhibitor cancellations, refund schedules, event postponement, non-refundable costs, and refund processing.",
};

export default function CancellationPolicyPage() {
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
          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EAA500] hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Terms &amp; Conditions</span>
          </Link>
          <span className="block text-xs font-extrabold tracking-widest text-[#EAA500] uppercase">
            Commercial &amp; Financial Governance
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Exhibitor Cancellation &amp; Refund Policy
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            This policy applies to exhibitors, sponsors and other participants who make payments to Tobgyel Global Expos for exhibition-related services, unless a specific written agreement provides otherwise.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Overview Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#03142A]">
                Policy Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Tobgyel Global Expos provides clear and transparent guidelines regarding stall booking cancellations, organizer postponements, refund eligibility periods, and cost structures for all exhibition participants.
              </p>
              <p className="text-xs text-slate-500 font-semibold pt-1">
                Last Updated: 1 September 2026
              </p>
            </div>

            {/* Recommended Refund Schedule Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#03142A] text-[#EAA500] rounded-lg shadow-sm">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#03142A]">
                    Recommended Refund Schedule
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Standard refund calculation tiers based on cancellation notice date prior to event start.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm pt-2">
                <table className="w-full text-left border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-[#03142A] text-white text-xs font-extrabold uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Cancellation Period</th>
                      <th className="py-3.5 px-4 sm:px-6">Refund Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/50">
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">More than 90 days before the event</td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-700 font-extrabold">80% Refund</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">60–89 days before the event</td>
                      <td className="py-3.5 px-4 sm:px-6 text-amber-700 font-extrabold">50% Refund</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">30–59 days before the event</td>
                      <td className="py-3.5 px-4 sm:px-6 text-orange-700 font-extrabold">25% Refund</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors bg-rose-50/40">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Less than 30 days before the event</td>
                      <td className="py-3.5 px-4 sm:px-6 text-rose-700 font-extrabold">No Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic">
                Note: The above schedule may be replaced by event-specific terms communicated at the time of booking.
              </p>
            </div>

            {/* Policy Detailed Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cancellationPoints.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2 text-left hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-[#03142A]">
                    <CheckCircle2 className="w-4 h-4 text-[#EAA500] shrink-0" />
                    <h3 className="text-sm font-extrabold">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Callout Banner */}
            <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-xl space-y-4 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-sans">
                  Cancellation or Refund Queries?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  To submit a written cancellation request or check the status of an eligible refund, please contact our administrative desk.
                </p>
              </div>
              <a
                href="mailto:info@tobgyelglobalxpos.com?subject=Cancellation%20Policy%20Inquiry"
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
