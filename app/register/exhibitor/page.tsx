"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Building, Mail, Phone, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import { addExhibitor } from "@/app/lib/registrationStore";

export default function RegisterExhibitorPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sector: "Renewable Energy & Technology",
    boothSize: "Standard (3m x 3m)",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addExhibitor(formData);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#020D1B] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0A4D8C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EAA500]/10 rounded-full blur-3xl pointer-events-none" />

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
          <div className="bg-[#03142A] border border-emerald-500/40 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                Exhibitor Application Received!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for applying to exhibit at Tobgyel Global Expos. Our team will review your application and send booth confirmation details shortly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="font-bold text-white">{formData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="font-bold text-white">{formData.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Booth Size:</span>
                <span className="font-bold text-[#EAA500]">{formData.boothSize}</span>
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
                Submit Another Application
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-xs font-bold uppercase tracking-wider text-white"
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
                Register as an Exhibitor
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Showcase your products, technologies, and services to thousands of regional and international buyers in Bhutan.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Company / Entity Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Druk Enterprise Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sonam Dorji"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Official Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+975 17 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Industry Sector *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#EAA500]"
                  >
                    <option value="Renewable Energy & Technology">Renewable Energy & Technology</option>
                    <option value="Organic Agriculture & Food Processing">Organic Agriculture & Food Processing</option>
                    <option value="Tourism, Culture & Hospitality">Tourism, Culture & Hospitality</option>
                    <option value="Construction & Infrastructure">Construction & Infrastructure</option>
                    <option value="Handicrafts, Textiles & Art">Handicrafts, Textiles & Art</option>
                    <option value="Logistics & International Trade">Logistics & International Trade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Booth Size Preference *
                  </label>
                  <select
                    value={formData.boothSize}
                    onChange={(e) => setFormData({ ...formData, boothSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#EAA500]"
                  >
                    <option value="Standard (3m x 3m)">Standard (3m x 3m)</option>
                    <option value="Double (6m x 3m)">Double (6m x 3m)</option>
                    <option value="Large (6m x 6m)">Large (6m x 6m)</option>
                    <option value="Premium Island Pavilion (10m x 10m)">Premium Island Pavilion (10m x 10m)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                  Products & Services Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what you plan to exhibit..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Exhibitor Application</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}
