import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 space-y-5">
        <p className="text-6xl sm:text-7xl font-black text-[#EAA500]">404</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#03142A] uppercase tracking-wide">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 max-w-md">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-colors shadow-md min-h-[48px]"
        >
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
