"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Globe as GlobeIcon, CheckCircle, Loader2 } from "lucide-react";
import Globe from "./Globe";
import { getCMSContact, INITIAL_CONTACT, ContactConfigCMS } from "@/app/lib/cmsStore";

export default function Footer() {
  const [contact, setContact] = useState<ContactConfigCMS>(INITIAL_CONTACT);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Inquiry - Tobgyel Global Expos",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = getCMSContact();
    if (loaded) {
      setContact(loaded);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recipient: contact.emailGeneral || "info@tobgyelglobalxpos.com",
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "Inquiry - Tobgyel Global Expos", message: "" });
    }
  };

  return (
    <footer id="contact" className="bg-[#03142A] text-white pt-10 sm:pt-14 pb-6 border-t border-slate-900 relative overflow-hidden pb-safe">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* MOBILE RESPONSIVE LAYOUT (< 1024px) - Matches reference picture layout */}
        <div className="lg:hidden space-y-8 pb-10 border-b border-slate-800/80 text-left max-w-xl mx-auto">
          
          {/* 1. First show the Map / Globe on Mobile */}
          <div className="flex items-center justify-center pt-2">
            <Globe className="w-full max-w-[280px] sm:max-w-[340px] mx-auto" />
          </div>

          {/* 2. Contact Us Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif sm:font-sans">
              {contact.sectionTitle || "Contact Us"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed pt-1">
              Please feel free to contact us and we will get back to you as soon as we can.
            </p>
          </div>

          {/* 3. Sleek Minimalist Contact Form */}
          {submitted ? (
            <div className="bg-emerald-950/90 border border-emerald-500/60 rounded-xl p-4 text-emerald-200 text-xs space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Message Delivered!</span>
              </div>
              <p className="text-slate-200 leading-relaxed">Thank you! Your inquiry has been sent directly to <strong className="text-white">info@tobgyelglobalxpos.com</strong>. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/60 border-b border-slate-700 px-3 py-3 text-white text-sm placeholder-slate-400 focus:border-[#EAA500] focus:outline-none transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/60 border-b border-slate-700 px-3 py-3 text-white text-sm placeholder-slate-400 focus:border-[#EAA500] focus:outline-none transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject || ""}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900/60 border-b border-slate-700 px-3 py-3 text-white text-sm placeholder-slate-400 focus:border-[#EAA500] focus:outline-none transition-colors min-h-[44px]"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Message"
                  value={formData.message || ""}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/60 border-b border-slate-700 px-3 py-3 text-white text-sm placeholder-slate-400 focus:border-[#EAA500] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded bg-[#D49900] hover:bg-[#bd8800] active:bg-[#a37500] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>{contact.formButtonLabel || "Send Message"}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 4. Visit Us & Talk To Us Blocks (CMS Driven) */}
          <div className="space-y-6 pt-4 border-t border-slate-800/60">
            {(contact.addressLine1 || contact.addressLine2) && (
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Visit us
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {[contact.addressLine1, contact.addressLine2, contact.cityCountry].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Talk to us
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed space-y-0.5">
                <a href={`tel:${contact.phonePrimary}`} className="hover:text-[#EAA500] block py-0.5">
                  {contact.phonePrimary}
                </a>
                {contact.phoneSecondary && (
                  <a href={`tel:${contact.phoneSecondary}`} className="hover:text-[#EAA500] block py-0.5">
                    {contact.phoneSecondary}
                  </a>
                )}
                <a href={`mailto:${contact.emailGeneral}`} className="hover:text-[#EAA500] block py-0.5 break-all">
                  {contact.emailGeneral}
                </a>
              </div>
            </div>

            {/* 5. Mobile Social Icons */}
            <div className="flex items-center space-x-5 pt-2 text-slate-300">
              <a href={contact.socialLinks?.twitter || "#"} aria-label="Twitter" className="hover:text-[#EAA500] transition-colors p-1">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={contact.socialLinks?.linkedin || "#"} aria-label="LinkedIn" className="hover:text-[#EAA500] transition-colors p-1">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
              <a href={contact.socialLinks?.instagram || "#"} aria-label="Instagram" className="hover:text-[#EAA500] transition-colors p-1">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="Website" className="hover:text-[#EAA500] transition-colors p-1">
                <GlobeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* DESKTOP LAYOUT (>= 1024px) - 100% UNCHANGED ORIGINAL 3-COLUMN GRID */}
        <div className="hidden lg:grid grid-cols-12 gap-6 pb-12 border-b border-slate-800/80 items-center">

          {/* Left Column: Contact Details (CMS Driven) */}
          <div className="col-span-4 space-y-6 flex flex-col justify-between py-2">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-widest uppercase font-sans text-white">
                {contact.sectionTitle || "Contact Us"}
              </h2>
              <div className="w-12 h-1 bg-[#EAA500] rounded-full" />
            </div>

            <div className="space-y-4 pt-1 text-slate-200">
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white tracking-wide">
                  {contact.companyName}
                </h3>
                {(contact.addressLine1 || contact.addressLine2) && (
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {[contact.addressLine1, contact.addressLine2, contact.cityCountry].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-1 text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-slate-800/80 text-white shrink-0">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`tel:${contact.phonePrimary}`} className="hover:text-[#EAA500] transition-colors py-1">
                      {contact.phonePrimary}
                    </a>
                    {contact.phoneSecondary && (
                      <>
                        <span className="text-slate-500">/</span>
                        <a href={`tel:${contact.phoneSecondary}`} className="hover:text-[#EAA500] transition-colors py-1">
                          {contact.phoneSecondary}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-slate-800/80 text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={`mailto:${contact.emailGeneral}`} className="hover:text-[#EAA500] transition-colors py-1 break-all">
                    {contact.emailGeneral}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-slate-800/80 text-white shrink-0">
                    <GlobeIcon className="w-4 h-4" />
                  </div>
                  <a href={`https://${contact.websiteUrl || "www.tobgyelglobalxpos.com"}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#EAA500] transition-colors py-1 break-all">
                    {contact.websiteUrl || "www.tobgyelglobalxpos.com"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: High-Visibility Interactive 3D Globe */}
          <div className="col-span-4 flex items-center justify-center py-2 my-auto">
            <Globe className="w-full max-w-[380px] mx-auto" />
          </div>

          {/* Right Column: Send Us A Message Form */}
          <div className="col-span-4 space-y-4">
            <h3 className="text-base font-extrabold tracking-widest uppercase text-white">
              {contact.formTitle || "Send Us A Message"}
            </h3>

            {submitted ? (
              <div className="bg-emerald-950/90 border border-emerald-500/60 rounded-xl p-5 text-emerald-200 text-xs space-y-2 text-left">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Message Delivered to info@tobgyelglobalxpos.com!</span>
                </div>
                <p className="text-slate-200 leading-relaxed">Thank you! Your message has been received and routed directly to our official inbox. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EAA500] min-h-[44px]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EAA500] min-h-[44px]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject || ""}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EAA500] min-h-[44px]"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    value={formData.message || ""}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-900 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EAA500] resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#D49900] hover:bg-[#bd8800] active:bg-[#a37500] disabled:opacity-50 text-white font-extrabold text-sm uppercase tracking-widest transition-colors shadow-md min-h-[48px] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <span>{contact.formButtonLabel || "Send Message"}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 font-medium">
          <p className="text-center sm:text-left">
            © 2024 Tobgyel Global Expos. All Rights Reserved.{" "}
            <span className="hidden sm:inline text-slate-500">|</span>{" "}
            <span className="block sm:inline mt-1 sm:mt-0">
              Developed by{" "}
              <a
                href="https://kodadevportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAA500] hover:underline font-bold transition-colors"
              >
                KodaDev
              </a>{" "}
              <span className="text-slate-500">•</span>{" "}
              <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
                Admin Portal
              </Link>
            </span>
          </p>

          <div className="flex items-center space-x-3">
            <a href={contact.socialLinks?.facebook || "#"} aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-100 text-[#03142A] hover:bg-[#EAA500] hover:text-white transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href={contact.socialLinks?.linkedin || "#"} aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-slate-100 text-[#03142A] hover:bg-[#EAA500] hover:text-white transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
            </a>
            <a href={contact.socialLinks?.instagram || "#"} aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-100 text-[#03142A] hover:bg-[#EAA500] hover:text-white transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
