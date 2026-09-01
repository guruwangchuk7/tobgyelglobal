import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | Tobgyel Global Expos",
  description: "Get in touch with Tobgyel Global Expos team in Phuentsholing, Bhutan for exhibition registration, sponsorship inquiries, and visitor info.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#03142A] text-white selection:bg-[#EAA500] selection:text-slate-950 font-sans">
      <Header />

      {/* Sub-hero Banner */}
      <section className="bg-[#03142A] text-white py-10 sm:py-16 relative overflow-hidden border-b border-slate-900">
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

      <main className="flex-1 bg-[#03142A]">
        <Footer />
      </main>
    </div>
  );
}
