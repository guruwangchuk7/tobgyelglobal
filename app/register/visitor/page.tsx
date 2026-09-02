"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, User, Mail, Phone, Globe, CheckCircle2, ArrowLeft, QrCode, Ticket } from "lucide-react";
import { addVisitor, VisitorSubmission } from "@/app/lib/registrationStore";

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
    daysAttending: [
      "Day 1 - Opening Ceremony & Expo Showcase",
      "Day 2 - B2B Summit & Investment Forum",
    ],
    website: "", // honeypot — must stay empty for real users
  });

  const handleCheckboxChange = (day: string) => {
    if (formData.daysAttending.includes(day)) {
      setFormData({
        ...formData,
        daysAttending: formData.daysAttending.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        daysAttending: [...formData.daysAttending, day],
      });
    }
  };

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

      <div className="max-w-2xl w-full relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#EAA500] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {submittedPass ? (
          <div className="bg-[#03142A] border border-emerald-500/40 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide font-sans">
                Digital Entry Pass Issued!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your visitor registration is confirmed. Present your pass code or QR badge at the Phuentsholing Expo Registration Counter.
              </p>
            </div>

            {/* Pass Preview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#06244a] to-[#020d1c] border-2 border-emerald-500/60 shadow-xl text-left space-y-4 relative overflow-hidden max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                    Official Visitor Badge
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase">
                  CONFIRMED
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">{submittedPass.fullName}</h3>
                <p className="text-xs text-slate-300">{submittedPass.profession || "Delegate Visitor"} • {submittedPass.country}</p>
                <p className="text-xs text-slate-400">{submittedPass.email}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">PASS ID CODE</span>
                  <span className="text-sm font-mono font-bold text-[#EAA500]">{submittedPass.passCode}</span>
                </div>
                <div className="p-2 rounded bg-white text-slate-900 flex items-center justify-center">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmittedPass(null)}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-slate-200"
              >
                Register Another Visitor
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-xs font-bold uppercase tracking-wider text-white"
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
                      placeholder="+975 17 000 000"
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

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                  Select Days Attending *
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    "Day 1 - Opening Ceremony & Expo Showcase",
                    "Day 2 - B2B Summit & Investment Forum",
                    "Day 3 - Cultural Exhibition & Product Launch",
                  ].map((day) => (
                    <label key={day} className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.daysAttending.includes(day)}
                        onChange={() => handleCheckboxChange(day)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
