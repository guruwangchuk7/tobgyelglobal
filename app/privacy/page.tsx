import Header from "../components/Header";
import Footer from "../components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, Mail, CheckCircle2, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tobgyel Global Expos",
  description: "Official Privacy Policy for Tobgyel Global Expos. Learn how we collect, protect, use, and handle participant data, exhibitor information, and online transactions.",
};

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      desc: "We collect personal and organization details necessary to deliver event management and exhibition services.",
      points: [
        "Personal Identifiers: Full name, designation, organization name, phone number, and official email address provided during event registration or inquiry.",
        "Exhibitor & Participant Details: Passport/Voter ID numbers (for government entry clearance), passport photos, company profiles, and booth requirements.",
        "Financial Transaction Data: Payment reference numbers, transaction receipts, and billing addresses (we do not store credit card details).",
        "Technical Data: IP address, browser type, device information, and site interaction metrics via cookies and web analytics.",
      ],
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      desc: "Your data is used strictly for event administration, participant facilitation, and legal compliance.",
      points: [
        "Processing exhibitor registrations, booth allocations, and visitor delegate passes.",
        "Facilitating government liaison, border clearance, and entry permits with Bhutanese authorities (e.g., Department of Immigration, MoICE).",
        "Sending official event updates, confirmation invoices, schedules, and administrative notices.",
        "Improving website functionality, user experience, and security.",
      ],
    },
    {
      icon: Lock,
      title: "3. Payment & Data Security",
      desc: "We implement industry-standard security measures to safeguard all participant data and financial transactions.",
      points: [
        "All online payment transactions are processed through encrypted, bank-grade payment gateways.",
        "We do not store complete payment card numbers or banking passwords on our local servers.",
        "Access to participant databases is restricted to authorized Tobgyel Global Expos personnel and security-audited system administrators.",
        "Regular data audits and SSL encryption protect user interactions on our portal.",
      ],
    },
    {
      icon: UserCheck,
      title: "4. Third-Party Sharing & Disclosure",
      desc: "We respect your privacy and never sell or rent personal information to third-party marketers.",
      points: [
        "Statutory Authorities: Data may be shared with government agencies (Ministry of Industry, Commerce & Employment, Immigration, Customs) solely for official event approvals.",
        "Service Partners: Official event contractors, venue management, and badge printing vendors bound by strict confidentiality agreements.",
        "Legal Requirements: Disclosure required by law, court orders, or regulatory mandates under Bhutanese jurisdiction.",
      ],
    },
    {
      icon: Shield,
      title: "5. Cookies & Analytics",
      desc: "Our website uses cookies to enhance user experience and analyze website traffic.",
      points: [
        "Essential Cookies: Required for navigation, security, and session management.",
        "Analytics Cookies: Google Analytics helps us understand website visitor demographics and performance metrics.",
        "Cookie Control: You can modify your browser settings to disable cookies, though some site functions may be limited.",
      ],
    },
    {
      icon: FileText,
      title: "6. Data Retention & Your Rights",
      desc: "You retain full control over your personal data submitted to Tobgyel Global Expos.",
      points: [
        "Data Retention: We retain event participant data as required by commercial tax regulations and historical event archives.",
        "Right to Access & Update: You may request a copy of your stored personal details or request updates at any time.",
        "Opt-Out Rights: You can unsubscribe from marketing communications by following the unsubscribe link or contacting our support team.",
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
            Tobgyel Global Expos (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy and ensuring the security of your personal and financial information when participating in our trade exhibitions and using our portal.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Main Content Grid */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#03142A]">
                Overview &amp; Policy Scope
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                This Privacy Policy outlines how Tobgyel Global Expos collects, uses, discloses, and protects your personal data when you visit <strong className="text-slate-900">www.tobgyelglobalxpos.com</strong>, register for trade expos, book exhibitor spaces, or contact our support team. By using our website or registering for our events, you agree to the collection and use of information in accordance with this policy.
              </p>
              <p className="text-xs text-slate-500 font-medium pt-1">
                Last updated: August 2026 | Effective Date: August 2026
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
                  If you have any questions about this Privacy Policy, wish to exercise your data rights, or need to update your registered information, please reach out to our Data Privacy Officer.
                </p>
              </div>
              <a
                href="mailto:info@tobgyelglobalxpos.com?subject=Privacy%20Inquiry"
                className="w-full md:w-auto px-6 py-3.5 rounded-lg bg-[#EAA500] hover:bg-[#c98e00] text-[#03142A] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Privacy Officer</span>
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
