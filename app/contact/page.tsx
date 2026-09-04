"use client";

import { useState } from "react";
import Header from "../components/Header";
import { Phone, Mail, Globe, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Inquiry - Tobgyel Global Expos",
    message: "",
    website: "", // honeypot
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recipient: "info@tobgyelglobalxpos.com",
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || result?.success === false) {
        throw new Error(result?.error || "Message could not be delivered.");
      }
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "Inquiry - Tobgyel Global Expos",
        message: "",
        website: "",
      });
    } catch (err) {
      console.error(err);
      alert("Sorry, your message could not be sent right now. Please try again or email us directly at info@tobgyelglobalxpos.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#03142A] text-white selection:bg-[#EAA500] selection:text-slate-950 font-sans">
      <Header />

      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-10 sm:py-14 relative overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-3 z-10">
          <span className="text-xs font-extrabold tracking-widest text-[#EAA500] uppercase">
            Get In Touch &amp; Support Desk
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Contact Us
          </h1>
          <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
          <p className="text-xs sm:text-base text-slate-300 max-w-3xl font-medium leading-relaxed">
            Have questions about exhibition stall bookings, sponsorships, visitor passes, or official trade expo logistics in Bhutan? Reach out to our team directly.
          </p>
        </div>
      </section>

      {/* Main Contact Section: Left Info + Right Form */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Direct Company Contact Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-widest uppercase font-sans text-white">
                  Tobgyel Global Expos Pvt. Ltd.
                </h2>
                <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
              </div>

              <div className="space-y-4 pt-2 text-slate-200">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-slate-800/90 text-white shrink-0">
                    <Phone className="w-4 h-4 fill-current text-white" />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 font-bold text-sm">
                    <a href="tel:+97517933882" className="hover:text-[#EAA500] transition-colors py-1">
                      +975 17933882
                    </a>
                    <span className="text-slate-500">/</span>
                    <a href="tel:+97577933882" className="hover:text-[#EAA500] transition-colors py-1">
                      +975 77933882
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-slate-800/90 text-white shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <a href="mailto:info@tobgyelglobalxpos.com" className="hover:text-[#EAA500] transition-colors text-sm font-semibold break-all py-1">
                    info@tobgyelglobalxpos.com
                  </a>
                </div>

                {/* Website */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-slate-800/90 text-white shrink-0">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="https://www.tobgyelglobalxpos.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#EAA500] transition-colors text-sm font-semibold break-all py-1"
                  >
                    www.tobgyelglobalxpos.com
                  </a>
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-slate-800/90 text-white shrink-0">
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <a
                    href="https://www.facebook.com/tobgyelevnts.bhutan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#EAA500] transition-colors text-sm font-semibold break-all py-1"
                  >
                    facebook.com/tobgyelevnts.bhutan
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us A Message Form */}
            <div className="lg:col-span-7 space-y-4 text-left bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h3 className="text-base font-extrabold tracking-widest uppercase text-white">
                Send Us A Message
              </h3>

              {submitted ? (
                <div className="bg-emerald-950/90 border border-emerald-500/60 rounded-xl p-5 text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>Message Delivered to info@tobgyelglobalxpos.com!</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    Thank you! Your message has been received and routed directly to our official inbox. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
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

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500] transition-all min-h-[46px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500] transition-all min-h-[46px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Inquiry - Tobgyel Global Expos"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500] transition-all min-h-[46px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#EAA500] focus:ring-1 focus:ring-[#EAA500] transition-all resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#EAA500] hover:bg-[#d49400] active:bg-[#ba8200] disabled:opacity-50 text-[#03142A] font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl active:scale-[0.99] min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#03142A]" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
