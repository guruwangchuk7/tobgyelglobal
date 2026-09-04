"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Handshake, Building2, Mail, Phone, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import { addSponsor, SponsorSubmission } from "@/app/lib/registrationStore";

export default function RegisterSponsorPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    tier: "Gold ($2,500)" as SponsorSubmission["tier"],
    budget: "$500 - $2,500",
    message: "",
    website: "", // honeypot — must stay empty for real users
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await addSponsor(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Sorry, your sponsorship request could not be submitted right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020D1B] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D49900]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#EAA500] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {submitted ? (
          <div className="bg-[#03142A] border border-amber-500/40 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                Sponsorship Request Submitted!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for partnering with Tobgyel Global Expos. Our executive sponsorship team will contact you to finalize branding and privileges.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Organization:</span>
                <span className="font-bold text-white">{formData.organizationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Tier:</span>
                <span className="font-bold text-[#EAA500]">{formData.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  Pending Admin Approval
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-slate-200"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 rounded-lg bg-[#D49900] hover:bg-[#bd8800] text-xs font-bold uppercase tracking-wider text-white"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">

            {/* Header */}
            <div className="border-b border-slate-800 pb-6 space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                Become an Official Sponsor
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Gain high-visibility brand exposure across national television, digital media, and VIP trade summits in Bhutan.
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
                    Organization / Brand Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bank of Bhutan"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karma Tshering"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="sponsorship@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+975 17933882"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Sponsorship Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as SponsorSubmission["tier"] })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#EAA500]"
                  >
                    <option value="Gold ($2,500)">Gold ($2,500)</option>
                    <option value="Silver ($1,500)">Silver ($1,500)</option>
                    <option value="Bronze ($500)">Bronze ($500)</option>
                    <option value="Official Partner">Official Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Estimated Sponsorship Budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $500 - $2,500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                  Sponsorship Goals / Comments
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us your branding objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#D49900] hover:bg-[#bd8800] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Submitting…" : "Submit Sponsorship Request"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}
