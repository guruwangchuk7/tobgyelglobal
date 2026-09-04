"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Globe, ArrowLeft, Ticket } from "lucide-react";
import { addVisitor, VisitorSubmission } from "@/app/lib/registrationStore";
import VisitorTicketPass from "@/app/components/VisitorTicketPass";

export default function RegisterVisitorPage() {
  const router = useRouter();
  const [submittedPass, setSubmittedPass] = useState<VisitorSubmission | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Bhutan",
    profession: "",
    purpose: "B2B Networking & Trade Showcase",
    daysAttending: ["All Expo Days"],
    website: "", // honeypot — must stay empty for real users
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const newVisitor = await addVisitor(formData);
      setSubmittedPass(newVisitor);
    } catch (err) {
      console.error(err);
      alert("Sorry, your visitor pass could not be generated right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020D1B] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className={`${submittedPass ? "max-w-5xl" : "max-w-2xl"} w-full relative z-10 transition-all duration-300`}>
        
        {/* Back Link */}
        <div className="no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#EAA500] font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {submittedPass ? (
          <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="space-y-2 no-print">
              <span className="text-xs font-black uppercase tracking-widest text-[#EAA500]">
                Registration Successful
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide font-sans">
                Official Trade Pass Generated!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your entry ticket has been issued. Download or print your pass below, or present your Pass Code ID at the entrance gate.
              </p>
            </div>

            {/* Official Ticket Pass */}
            <VisitorTicketPass
              visitor={submittedPass}
              onClose={() => setSubmittedPass(null)}
            />

            <div className="no-print pt-2">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors"
              >
                Return to Home Website
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Header */}
            <div className="border-b border-slate-800 pb-6 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                Free Visitor Entry Registration
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Secure your complimentary fast-track entry pass for international exhibitions, trade forums, and cultural showcases.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Choki Gyeltshen"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="visitor@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone / Mobile *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+975 17933882"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Country of Residence *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bhutan, India, Thailand..."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Profession / Designation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director / Student..."
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Primary Purpose of Visit
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="B2B Networking & Trade Showcase">B2B Networking & Trade Showcase</option>
                    <option value="Exploring Business Investment">Exploring Business Investment</option>
                    <option value="General Public & Cultural Visitor">General Public & Cultural Visitor</option>
                    <option value="Press & Media Delegate">Press & Media Delegate</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{submitting ? "Generating…" : "Generate Free Visitor Pass"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}
