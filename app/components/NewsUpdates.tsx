"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { getCMSNews, fetchCMSNewsAsync, INITIAL_NEWS, NewsArticleCMS } from "@/app/lib/cmsStore";

interface NewsUpdatesProps {
  from?: "home" | "news";
}

export default function NewsUpdates({ from = "news" }: NewsUpdatesProps) {
  const [newsItems, setNewsItems] = useState<NewsArticleCMS[]>([]);

  useEffect(() => {
    const loaded = getCMSNews();
    if (Array.isArray(loaded)) {
      setNewsItems(loaded.filter((n) => n.status === "Published"));
    }
    fetchCMSNewsAsync().then((fetched) => {
      if (Array.isArray(fetched)) {
        setNewsItems(fetched.filter((n) => n.status === "Published"));
      }
    });
  }, []);

  // On the home page: only news flagged featuredOnHome.
  // On the /news page: every published article.
  const displayNews =
    from === "home" ? newsItems.filter((n) => n.featuredOnHome) : newsItems;

  return (
    <section id="news" className="py-12 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#03142A] uppercase font-sans">
            Latest News &amp; Updates
          </h2>
          <div className="w-16 h-1 bg-[#EAA500] mx-auto rounded-full" />
        </div>

        {displayNews.length === 0 ? (
          <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto space-y-2">
            <Newspaper className="w-8 h-8 text-[#EAA500] mx-auto opacity-80" />
            <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">No Latest News &amp; Updates Scheduled</p>
            <p className="text-xs text-slate-500">Check back soon for official press releases and news updates from Tobgyel Global Expos.</p>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW (< 768px): Horizontal Swipeable News Carousel */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 -mx-1 scrollbar-none">
                {displayNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/news/${news.id}?from=${from}`}
                    className="snap-start shrink-0 w-[82%] max-w-[300px] group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md text-left transition-transform active:scale-98"
                  >
                    {/* Card Image */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${news.image}')` }}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-bold text-[#03142A] leading-snug group-hover:text-[#0A4D8C] transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-semibold">
                          {news.date}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4D8C] group-hover:text-[#EAA500] transition-colors underline underline-offset-4 py-1">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Swipe for more news</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EAA500]" />
              </div>
            </div>

            {/* DESKTOP VIEW (>= 768px): Original 3-Column News Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.id}?from=${from}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${news.image}')` }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#03142A] group-hover:text-[#0A4D8C] transition-colors leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold">
                        {news.date}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A4D8C] group-hover:text-[#EAA500] transition-colors underline underline-offset-4">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* View All News Button — only on the home page (the /news page already
            shows the full list, so linking back to it would be circular) */}
        {from === "home" && (
          <div className="text-center">
            <Link
              href="/news"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#03142A] hover:bg-[#072448] active:bg-[#020b18] text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors shadow-md border border-slate-700 min-h-[44px]"
            >
              View All News
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
