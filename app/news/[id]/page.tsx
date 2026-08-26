"use client";

import { use, useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import Link from "next/link";
import { Calendar, UserCheck, Ticket } from "lucide-react";
import { getCMSNewsById, fetchCMSNewsAsync, NewsArticleCMS, INITIAL_NEWS } from "@/app/lib/cmsStore";

export default function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = use(params);
  const { from } = use(searchParams);

  // Initialize with server-safe initial seed data to prevent hydration mismatch
  const [article, setArticle] = useState<NewsArticleCMS | undefined>(
    () => INITIAL_NEWS.find((n) => n.id === id || n.slug === id)
  );

  useEffect(() => {
    // Load local storage or DB data safely after mount
    const local = getCMSNewsById(id);
    if (local) {
      setArticle(local);
    }
    fetchCMSNewsAsync().then((newsList) => {
      const found = newsList.find((n) => n.id === id || n.slug === id);
      if (found) setArticle(found);
    });
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        <Header />
        <main className="flex-1 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold">News Article Not Found</h1>
          <Link href="/news" className="text-[#0A4D8C] font-semibold underline">
            Return to News Page
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isFromHome = from === "home";
  const backHref = isFromHome ? "/#news" : "/news";
  const backText = isFromHome ? "Back to Home" : "Back to All News";

  const paragraphs = Array.isArray(article.content) ? article.content : [article.content || article.excerpt];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#03142A] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-4 z-10">
          <BackButton fallbackHref={backHref} label={backText} />

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium pt-1 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#EAA500]" />
              <span>Published: {article.date}</span>
            </div>
            <span>•</span>
            <span>{article.category || "Official Press Release"}</span>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <main className="flex-1 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 text-left">
            {article.excerpt && (
              <p className="text-base sm:text-lg font-bold text-[#03142A] leading-relaxed border-l-4 border-[#EAA500] pl-4">
                {article.excerpt}
              </p>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Media &amp; Press Contact</p>
              <p>Tobgyel Global Expos Press Bureau • Phuentsholing, Bhutan</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${article.mediaContactEmail || "info@tobgyelglobalxpos.com"}`}
                  className="text-[#0A4D8C] font-semibold underline"
                  suppressHydrationWarning
                >
                  {article.mediaContactEmail || "info@tobgyelglobalxpos.com"}
                </a>
              </p>
            </div>
          </div>

          {/* Registration CTAs Callout */}
          <div className="bg-[#03142A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h3 className="text-lg font-black uppercase text-white">Join Tobgyel Global Expos 2027</h3>
              <p className="text-xs text-slate-300">Book exhibition booth space or request visitor entry clearance.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/register/exhibitor"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D49900] hover:bg-[#bd8800] text-white text-xs font-extrabold uppercase tracking-wider min-h-[44px]"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register Exhibitor</span>
              </Link>
              <Link
                href="/register/visitor"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white text-xs font-extrabold uppercase tracking-wider min-h-[44px]"
              >
                <Ticket className="w-4 h-4" />
                <span>Visitor Pass</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
