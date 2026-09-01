import Header from "../components/Header";
import Footer from "../components/Footer";
import { CreditCard, FileCheck, Scale, AlertTriangle, ShieldCheck, RefreshCw, Mail, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Tobgyel Global Expos",
  description: "Official Terms of Use & Payment Policy for Tobgyel Global Expos. Details on exhibitor registrations, booth allocations, payment schedules, cancellation refunds, and legal compliance.",
};

export default function TermsAndPaymentPage() {
  const termsSections = [
    {
      icon: FileCheck,
      title: "1. Acceptance of Terms & Event Scope",
      desc: "Terms governing participation, attendance, and portal usage for Tobgyel Global Expos.",
      points: [
        "Binding Agreement: By registering as an exhibitor, delegate, sponsor, or trade visitor, you agree to comply with all terms stated herein.",
        "Event Organization: Tobgyel Global Expos manages space allocation, hall layouts, schedules, and official trade show guidelines.",
        "Right of Admission: Management reserves the right to reject or revoke registrations that do not meet trade expo criteria or safety requirements.",
      ],
    },
    {
      icon: CreditCard,
      title: "2. Payment Terms & Accepted Currencies",
      desc: "Structured payment terms for exhibition stall bookings, sponsorships, and delegate passes.",
      points: [
        "Accepted Currencies: Payments are accepted in Bhutanese Ngultrum (BTN), Indian Rupees (INR), and US Dollars (USD).",
        "Payment Schedule: A minimum deposit (50%) is required upon booth reservation, with full balance settlement due 14 days prior to event commencement.",
        "Banking Charges: All wire transfer fees, intermediary banking costs, or foreign conversion charges must be covered by the remitting exhibitor.",
        "Tax & Invoicing: Invoices are issued inclusive of applicable sales taxes (BST) and official receipts are rendered upon payment confirmation.",
      ],
    },
    {
      icon: RefreshCw,
      title: "3. Cancellation, Refunds & Transfers",
      desc: "Transparent procedures regarding booking cancellations and registration transfers.",
      points: [
        "Cancellation Notice: Cancellations requested more than 30 days prior to event opening are eligible for a 70% refund of fees paid.",
        "Late Cancellations: Cancellations within 30 days of the event opening date are non-refundable due to pre-allocated hall space and infrastructure costs.",
        "Booth Transfers: Booth registrations may be transferred to an affiliated partner company subject to prior written approval by Tobgyel Global Expos.",
        "Force Majeure Event Rescheduling: If an event is postponed or cancelled due to government restrictions, natural disasters, or force majeure, fees will be applied to the rescheduled event date or credited to future expos.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "4. Payment Security & Disclosures",
      desc: "Security protocols for digital transactions and billing compliance.",
      points: [
        "Secure Gateway: All digital payments processed on our website utilize encrypted 256-bit SSL connections via authorized financial service providers.",
        "No Card Storage: Tobgyel Global Expos does not store credit card numbers, CVVs, or bank credentials on server storage.",
        "Official Confirmation: Valid payment transactions generate an official electronic voucher and invoice sent directly to the registered email.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "5. Exhibitor Conduct & Venue Rules",
      desc: "Mandatory guidelines for exhibitors operating within exhibition halls.",
      points: [
        "Setup & Dismantling: Stalls must be completely fabricated before the official ribbon-cutting ceremony and dismantled strictly after official closing hours.",
        "Prohibited Items: Hazardous materials, uncertified pharmaceuticals, and contraband goods strictly forbidden under Royal Government of Bhutan statutes.",
        "Subletting Restrictions: Exhibitors may not sublet, reassign, or share allotted booth space with non-registered third parties.",
      ],
    },
    {
      icon: Scale,
      title: "6. Liability, Indemnity & Governing Law",
      desc: "Legal parameters and dispute resolution jurisdiction.",
      points: [
        "Limitation of Liability: Tobgyel Global Expos is not liable for indirect loss, commercial damage, or stolen personal merchandise during event setup or operational hours.",
        "Insurance Requirement: Exhibitors are strongly advised to hold comprehensive commercial insurance covering goods in transit and display items.",
        "Jurisdiction: These terms shall be governed by and construed in accordance with the laws of the Kingdom of Bhutan. Any legal disputes shall be subject to the exclusive jurisdiction of the Royal Courts of Justice, Thimphu.",
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
            Terms of Use &amp; Commercial Policy
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Terms of Use
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Standard terms of service, exhibitor booth registration conditions, accepted payment methods, fee schedules, and cancellation policies for Tobgyel Global Expos.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Main Content Grid */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#03142A]">
                General Commercial Framework
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                These Terms and Payment Conditions constitute a legally binding agreement between you (&quot;Exhibitor&quot;, &quot;Participant&quot;, or &quot;User&quot;) and Tobgyel Global Expos. Please read these terms carefully before submitting booth applications, making financial payments, or registering as an event delegate.
              </p>
              <p className="text-xs text-slate-500 font-medium pt-1">
                Last updated: August 2026 | Effective Date: August 2026
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

            {/* Support / Accounts Inquiry Banner */}
            <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-xl space-y-4 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-sans">
                  Billing, Invoicing or Payment Assistance Needed?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  For wire transfer details, pro-forma invoices, receipt confirmation, or specific payment policy queries, please contact our accounts and finance desk.
                </p>
              </div>
              <a
                href="mailto:info@tobgyelglobalxpos.com?subject=Payment%20and%20Terms%20Inquiry"
                className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Accounts Desk</span>
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
