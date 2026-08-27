"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Tag, 
  ExternalLink, 
  Building, 
  ShoppingBag, 
  Eye,
  CheckCircle,
  ArrowRight
} from "lucide-react";

import { 
  getCMSProductAds, 
  getPageViewCount,
  incrementPageViewCount,
  ProductAdCMS, 
  INITIAL_PRODUCT_ADS 
} from "@/app/lib/cmsStore";

export default function ProductsAds() {
  const [ads, setAds] = useState<ProductAdCMS[]>(INITIAL_PRODUCT_ADS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [pageViews, setPageViews] = useState<number>(3840);

  useEffect(() => {
    setAds(getCMSProductAds());
    const count = incrementPageViewCount();
    setPageViews(count);
  }, []);

  const categories = ["All", "Food & Organic", "Machinery & Tech", "Handicrafts & Luxury", "Services & Tourism"];

  const filteredAds = activeCategory === "All"
    ? ads.filter(a => a.active !== false)
    : ads.filter(a => a.active !== false && a.category === activeCategory);

  return (
    <section className="py-14 sm:py-20 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#0A4D8C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#EAA500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left border-b border-slate-800 pb-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight font-sans leading-tight">
              Featured Products &amp; Services Ads
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
              Explore authentic Bhutanese organic produce, green agri-machinery, heritage silk handicrafts, and regional travel services from certified expo exhibitors.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
                activeCategory === cat
                  ? "bg-[#EAA500] text-[#03142A] shadow-md font-extrabold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MOBILE VIEW (< 768px): Horizontal Swipeable Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 -mx-1 scrollbar-none">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="snap-start shrink-0 w-[82%] max-w-[300px] group bg-[#03142A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  {/* Ad Image Container */}
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <img
                      src={ad.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/40 to-transparent pointer-events-none" />
                    
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#0A4D8C] text-white text-[10px] font-black uppercase tracking-wider shadow z-10">
                      {ad.badgeTag || "Featured Ad"}
                    </span>
                  </div>

                  {/* Ad Info */}
                  <div className="px-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EAA500]">
                      <Building className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ad.companyName}</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                      {ad.title}
                    </h3>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {ad.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 pt-3">
                  <Link
                    href={ad.ctaUrl || "/register/exhibitor"}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 active:bg-[#0A4D8C] text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[38px]"
                  >
                    <span>{ad.ctaText || "Inquire Product"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#EAA500]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] font-bold text-[#EAA500] uppercase tracking-widest">
            <span>Swipe for more ads</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EAA500]" />
          </div>
        </div>

        {/* DESKTOP VIEW (>= 768px): Original Product Ads 4-Column Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="group bg-[#03142A] border border-slate-800 hover:border-[#EAA500]/60 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Ad Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={ad.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/40 to-transparent pointer-events-none" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A4D8C] text-white text-[10px] font-black uppercase tracking-wider shadow z-10">
                    {ad.badgeTag || "Featured Ad"}
                  </span>
                </div>

                {/* Ad Info */}
                <div className="px-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EAA500]">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{ad.companyName}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#EAA500] transition-colors">
                    {ad.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {ad.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-4">
                <Link
                  href={ad.ctaUrl || "/register/exhibitor"}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 group-hover:bg-[#0A4D8C] text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
                >
                  <span>{ad.ctaText || "Inquire Product"}</span>
                  <ArrowRight className="w-4 h-4 text-[#EAA500] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
