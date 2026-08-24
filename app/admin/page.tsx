"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  LogOut,
  User,
  Handshake,
  Users,
  Search,
  Clock,
  Trash2,
  Download,
  LayoutDashboard,
  Calendar,
  Newspaper,
  Plus,
  Edit3,
  CheckCircle,
  Eye,
  Sliders,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  UploadCloud,
  MapPin,
  Sparkles,
  Building,
  ShoppingBag,
  ShieldCheck as ShieldIcon,
  PhoneCall,
  Info,
  BookOpen,
  Globe,
  Landmark,
  Plane,
  Menu,
  X
} from "lucide-react";

import {
  getExhibitors,
  getSponsors,
  getVisitors,
  updateExhibitorStatus,
  deleteExhibitor,
  updateSponsorStatus,
  deleteSponsor,
  updateVisitorStatus,
  deleteVisitor,
  ExhibitorSubmission,
  SponsorSubmission,
  VisitorSubmission,
} from "@/app/lib/registrationStore";

import {
  getCMSEvents,
  saveCMSEvent,
  deleteCMSEvent,
  getCMSNews,
  saveCMSNews,
  deleteCMSNews,
  getCMSHeroConfig,
  saveCMSHeroConfig,
  getCMSWhyExhibit,
  saveCMSWhyExhibit,
  getCMSParticipants,
  saveCMSParticipants,
  getCMSVisit,
  saveCMSVisit,
  getCMSPartners,
  saveCMSPartners,
  getCMSAbout,
  saveCMSAbout,
  getCMSContact,
  saveCMSContact,
  getCMSRegulations,
  saveCMSRegulations,
  getCMSProductAds,
  saveCMSProductAd,
  deleteCMSProductAd,
  getPageViewCount,
  ProductAdCMS,
  TradeEventCMS,
  NewsArticleCMS,
  HeroConfigCMS,
  WhyExhibitCMS,
  ParticipantsCMS,
  VisitCMS,
  PartnersCMS,
  AboutCMS,
  ContactConfigCMS,
  RegulationsCMS,
} from "@/app/lib/cmsStore";

export default function AdminPage() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Mobile Navigation Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Module & Active Sub-Tab (All Website Pages CMS Modules)
  const [mainModule, setMainModule] = useState<
    "dashboard" | "exhibitors" | "sponsors" | "visitors" | "events" | "news" | "product-ads" | "hero" | "why-exhibit" | "participants" | "visit" | "partners" | "about" | "contact" | "regulations"
  >("dashboard");

  // Submissions Data State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [exhibitors, setExhibitors] = useState<ExhibitorSubmission[]>([]);
  const [sponsors, setSponsors] = useState<SponsorSubmission[]>([]);
  const [visitors, setVisitors] = useState<VisitorSubmission[]>([]);

  // CMS Content State
  const [cmsEvents, setCmsEvents] = useState<TradeEventCMS[]>([]);
  const [cmsNews, setCmsNews] = useState<NewsArticleCMS[]>([]);
  const [productAds, setProductAds] = useState<ProductAdCMS[]>([]);
  const [pageViews, setPageViews] = useState<number>(3840);
  const [heroConfig, setHeroConfig] = useState<HeroConfigCMS | null>(null);
  const [whyExhibitConfig, setWhyExhibitConfig] = useState<WhyExhibitCMS | null>(null);
  const [participantsConfig, setParticipantsConfig] = useState<ParticipantsCMS | null>(null);
  const [visitConfig, setVisitConfig] = useState<VisitCMS | null>(null);
  const [partnersConfig, setPartnersConfig] = useState<PartnersCMS | null>(null);
  const [aboutConfig, setAboutConfig] = useState<AboutCMS | null>(null);
  const [contactConfig, setContactConfig] = useState<ContactConfigCMS | null>(null);
  const [regulationsConfig, setRegulationsConfig] = useState<RegulationsCMS | null>(null);

  // Edit Modals & Live Preview State
  const [editingEvent, setEditingEvent] = useState<Partial<TradeEventCMS> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsArticleCMS> | null>(null);
  const [editingAd, setEditingAd] = useState<Partial<ProductAdCMS> | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  // Modal View Toggle: "edit" vs "preview"
  const [eventModalTab, setEventModalTab] = useState<"edit" | "preview">("edit");
  const [newsModalTab, setNewsModalTab] = useState<"edit" | "preview">("edit");

  // Sidebar Submenu Expansion
  const [contentOpen, setContentOpen] = useState(true);
  const [submissionsOpen, setSubmissionsOpen] = useState(true);

  // Check login session on mount
  useEffect(() => {
    const session = localStorage.getItem("tobgyel_admin_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
    refreshData();
  }, []);

  const refreshData = () => {
    setExhibitors(getExhibitors());
    setSponsors(getSponsors());
    setVisitors(getVisitors());
    setCmsEvents(getCMSEvents());
    setCmsNews(getCMSNews());
    setProductAds(getCMSProductAds());
    setPageViews(getPageViewCount());
    setHeroConfig(getCMSHeroConfig());
    setWhyExhibitConfig(getCMSWhyExhibit());
    setParticipantsConfig(getCMSParticipants());
    setVisitConfig(getCMSVisit());
    setPartnersConfig(getCMSPartners());
    setAboutConfig(getCMSAbout());
    setContactConfig(getCMSContact());
    setRegulationsConfig(getCMSRegulations());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("tobgyel_admin_session", "active");
      setLoginError("");
      refreshData();
    } else {
      setLoginError("Invalid username or password. (Use admin / admin123)");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("tobgyel_admin_session");
  };

  // Switch Module & Auto-Close Mobile Menu
  const selectModule = (module: typeof mainModule) => {
    setMainModule(module);
    setIsMobileMenuOpen(false);
  };

  // Submissions Actions
  const handleExhibitorStatus = (id: string, status: "Pending" | "Approved" | "Rejected") => {
    updateExhibitorStatus(id, status);
    refreshData();
  };

  const handleDeleteExhibitor = (id: string) => {
    if (confirm("Are you sure you want to delete this exhibitor entry?")) {
      deleteExhibitor(id);
      refreshData();
    }
  };

  const handleSponsorStatus = (id: string, status: "Pending" | "Approved" | "Rejected") => {
    updateSponsorStatus(id, status);
    refreshData();
  };

  const handleDeleteSponsor = (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor entry?")) {
      deleteSponsor(id);
      refreshData();
    }
  };

  const handleVisitorStatus = (id: string, status: "Pending" | "Approved" | "Rejected") => {
    updateVisitorStatus(id, status);
    refreshData();
  };

  const handleDeleteVisitor = (id: string) => {
    if (confirm("Are you sure you want to delete this visitor pass entry?")) {
      deleteVisitor(id);
      refreshData();
    }
  };

  // CMS Events Actions
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title || !editingEvent?.date) return;
    const itemToSave: TradeEventCMS = {
      id: editingEvent.id || `evt-${Date.now()}`,
      slug: editingEvent.slug || editingEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: editingEvent.title || "",
      category: editingEvent.category || "Trade & Commerce",
      date: editingEvent.date || "",
      location: editingEvent.location || "Phuentsholing, Bhutan",
      venue: editingEvent.venue || "Phuentsholing International Expo Pavilion",
      image: editingEvent.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      description: editingEvent.description || "",
      highlights: editingEvent.highlights || [],
      sectors: editingEvent.sectors || [],
      status: editingEvent.status || "Published",
      featuredOnHome: editingEvent.featuredOnHome !== false,
      updatedAt: new Date().toLocaleDateString(),
    };
    saveCMSEvent(itemToSave);
    setShowEventModal(false);
    setEditingEvent(null);
    refreshData();
  };

  const handleDeleteEventCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this CMS event listing?")) {
      deleteCMSEvent(id);
      refreshData();
    }
  };

  // CMS News Actions
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.title || !editingNews?.date) return;
    const itemToSave: NewsArticleCMS = {
      id: editingNews.id || `news-${Date.now()}`,
      slug: editingNews.slug || editingNews.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: editingNews.title || "",
      date: editingNews.date || "",
      category: editingNews.category || "Press Release",
      image: editingNews.image || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      excerpt: editingNews.excerpt || "",
      content: editingNews.content || [editingNews.excerpt || ""],
      mediaContactEmail: editingNews.mediaContactEmail || "info@tobgyelglobalxpos.com",
      status: editingNews.status || "Published",
      featuredOnHome: editingNews.featuredOnHome !== false,
      updatedAt: new Date().toLocaleDateString(),
    };
    saveCMSNews(itemToSave);
    setShowNewsModal(false);
    setEditingNews(null);
    refreshData();
  };

  const handleDeleteNewsCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this CMS news article?")) {
      deleteCMSNews(id);
      refreshData();
    }
  };

  // CMS Product Ads Actions
  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAd || !editingAd.title) return;
    const adToSave: ProductAdCMS = {
      id: editingAd.id || `ad-${Date.now()}`,
      title: editingAd.title || "",
      companyName: editingAd.companyName || "Exhibitor Enterprise",
      category: (editingAd.category as any) || "Food & Organic",
      image: editingAd.image || "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
      description: editingAd.description || "",
      badgeTag: editingAd.badgeTag || "Featured Ad",
      ctaText: editingAd.ctaText || "Inquire Product",
      ctaUrl: editingAd.ctaUrl || "/register/exhibitor",
      active: editingAd.active !== false,
    };
    saveCMSProductAd(adToSave);
    setShowAdModal(false);
    setEditingAd(null);
    refreshData();
  };

  const handleDeleteAdCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this product ad?")) {
      deleteCMSProductAd(id);
      refreshData();
    }
  };

  // Page CMS Actions
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroConfig) {
      saveCMSHeroConfig(heroConfig);
      alert("Landing Page Hero Configuration saved successfully!");
      refreshData();
    }
  };

  const handleSaveWhyExhibit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whyExhibitConfig) {
      saveCMSWhyExhibit(whyExhibitConfig);
      alert("Why Exhibit Content saved successfully!");
      refreshData();
    }
  };

  const handleSaveParticipants = (e: React.FormEvent) => {
    e.preventDefault();
    if (participantsConfig) {
      saveCMSParticipants(participantsConfig);
      alert("International Participants Content saved successfully!");
      refreshData();
    }
  };

  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitConfig) {
      saveCMSVisit(visitConfig);
      alert("Plan Your Visit Content saved successfully!");
      refreshData();
    }
  };

  const handleSavePartners = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnersConfig) {
      saveCMSPartners(partnersConfig);
      alert("Partners & Sponsors Content saved successfully!");
      refreshData();
    }
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    if (aboutConfig) {
      saveCMSAbout(aboutConfig);
      alert("About Section & Company Vision saved successfully!");
      refreshData();
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactConfig) {
      saveCMSContact(contactConfig);
      alert("Contact Details & Footer Configuration saved successfully!");
      refreshData();
    }
  };

  const handleSaveRegulations = (e: React.FormEvent) => {
    e.preventDefault();
    if (regulationsConfig) {
      saveCMSRegulations(regulationsConfig);
      alert("Exhibitor Regulations & Guidelines saved successfully!");
      refreshData();
    }
  };

  // Export Submissions CSV
  const exportToCSV = (type: "exhibitors" | "sponsors" | "visitors") => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === "exhibitors") {
      csvContent += "ID,Company Name,Contact Person,Email,Phone,Sector,Booth Size,Status,Submitted At\n";
      exhibitors.forEach((item) => {
        csvContent += `"${item.id}","${item.companyName}","${item.contactPerson}","${item.email}","${item.phone}","${item.sector}","${item.boothSize}","${item.status}","${item.submittedAt}"\n`;
      });
    } else if (type === "sponsors") {
      csvContent += "ID,Organization Name,Contact Person,Email,Phone,Tier,Budget,Status,Submitted At\n";
      sponsors.forEach((item) => {
        csvContent += `"${item.id}","${item.organizationName}","${item.contactPerson}","${item.email}","${item.phone}","${item.tier}","${item.budget}","${item.status}","${item.submittedAt}"\n`;
      });
    } else {
      csvContent += "ID,Full Name,Email,Phone,Country,Profession,Pass Code,Status,Submitted At\n";
      visitors.forEach((item) => {
        csvContent += `"${item.id}","${item.fullName}","${item.email}","${item.phone}","${item.country}","${item.profession}","${item.passCode}","${item.status}","${item.submittedAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tobgyel_${type}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalPending =
    exhibitors.filter(e => e.status === "Pending").length +
    sponsors.filter(s => s.status === "Pending").length +
    visitors.filter(v => v.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#020D1B] text-white font-sans flex flex-col">

      {!isLoggedIn ? (
        /* Login Screen */
        <main className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
          <div className="max-w-md w-full bg-[#03142A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#0A4D8C]/30 border border-[#0A4D8C] text-[#EAA500] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide font-sans">
                Tobgyel CMS Admin Portal
              </h1>
              <p className="text-xs text-slate-300">
                Manage Content, Events, News &amp; Submissions
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                />
              </div>

              <div className="p-3 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                <span className="font-bold text-[#EAA500]">Credentials:</span> Username: <code className="text-white">admin</code> | Password: <code className="text-white">admin123</code>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to CMS Dashboard</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-400 hover:text-[#EAA500] transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </main>
      ) : (
        /* PROTECTED SIDEBAR + WORKSPACE LAYOUT */
        <div className="flex-1 flex flex-col md:flex-row min-h-screen relative">

          {/* MOBILE RESPONSIVE TOP BAR (< 768px) */}
          <div className="md:hidden bg-[#03142A] border-b border-slate-800 p-3.5 flex items-center justify-between sticky top-0 z-40">
            {/* Left Side: Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white hover:text-[#EAA500] focus:outline-none min-h-[42px] min-w-[42px] flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Right Side: Tobgyel CMS Logo & Active Module Title */}
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#0A4D8C] text-[#EAA500] shrink-0">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h2 className="text-xs font-black uppercase text-white tracking-wider leading-tight">
                  Tobgyel CMS
                </h2>
                <p className="text-[10px] text-slate-400 font-medium capitalize leading-tight">
                  {mainModule.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE RESPONSIVE BACKDROP OVERLAY */}
          {isMobileMenuOpen && (
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
            />
          )}

          {/* SIDEBAR NAVIGATION (Desktop permanent left sidebar w-64 / Mobile slide-in drawer from left) */}
          <aside
            className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-[#03142A] border-r border-slate-800/80 flex flex-col justify-between shrink-0 p-5 space-y-6 overflow-y-auto transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="space-y-6">

              {/* Brand Header & Mobile Close */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#0A4D8C] text-[#EAA500]">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase text-white tracking-wider">
                      Tobgyel CMS
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">Control Center</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="md:hidden p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Menu Section 1: Dashboard Overview */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">Overview</p>
                <button
                  onClick={() => selectModule("dashboard")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all min-h-[40px] ${mainModule === "dashboard"
                      ? "bg-[#0A4D8C] text-white shadow"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-[#EAA500]" />
                    <span>Dashboard</span>
                  </div>
                  {totalPending > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold">
                      {totalPending}
                    </span>
                  )}
                </button>
              </div>

              {/* Sidebar Menu Section 2: Submissions Collapsible Group */}
              <div className="space-y-1">
                <button
                  onClick={() => setSubmissionsOpen(!submissionsOpen)}
                  className="w-full flex items-center justify-between px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 hover:text-slate-200 py-1"
                >
                  <span>Submissions</span>
                  {submissionsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {submissionsOpen && (
                  <div className="space-y-1 pl-2">
                    <button
                      onClick={() => selectModule("exhibitors")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "exhibitors"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        <span>Exhibitors</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {exhibitors.length}
                      </span>
                    </button>

                    <button
                      onClick={() => selectModule("sponsors")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "sponsors"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Sponsors</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {sponsors.length}
                      </span>
                    </button>

                    <button
                      onClick={() => selectModule("visitors")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "visitors"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        <span>Visitor Passes</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {visitors.length}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Menu Section 3: Exact Content CMS Order */}
              <div className="space-y-1">
                <button
                  onClick={() => setContentOpen(!contentOpen)}
                  className="w-full flex items-center justify-between px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 hover:text-slate-200 py-1"
                >
                  <span>Content CMS</span>
                  {contentOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {contentOpen && (
                  <div className="space-y-1 pl-2">
                    {/* 1. Trade Events (with count badge) */}
                    <button
                      onClick={() => selectModule("events")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "events"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Trade Events</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {cmsEvents.length}
                      </span>
                    </button>

                    {/* 2. News & Press Bureau (with count badge) */}
                    <button
                      onClick={() => selectModule("news")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "news"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Newspaper className="w-3.5 h-3.5" />
                        <span>News &amp; Press Bureau</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {cmsNews.length}
                      </span>
                    </button>

                    {/* Products & Services Ads Manager */}
                    <button
                      onClick={() => selectModule("product-ads")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "product-ads"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Products &amp; Ads</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        {productAds.length}
                      </span>
                    </button>

                    {/* 3. Hero Banner */}
                    <button
                      onClick={() => selectModule("hero")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "hero"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Hero Banner</span>
                      </div>
                    </button>

                    {/* 4. About & Vision */}
                    <button
                      onClick={() => selectModule("about")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "about"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" />
                        <span>About &amp; Vision</span>
                      </div>
                    </button>

                    {/* 5. Contact & Footer */}
                    <button
                      onClick={() => selectModule("contact")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "contact"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Contact &amp; Footer</span>
                      </div>
                    </button>

                    {/* Additional CMS Modules */}
                    <button
                      onClick={() => selectModule("why-exhibit")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "why-exhibit"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Why Exhibit Page</span>
                      </div>
                    </button>

                    <button
                      onClick={() => selectModule("participants")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "participants"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Participants Guide</span>
                      </div>
                    </button>

                    <button
                      onClick={() => selectModule("regulations")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "regulations"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>Gov Regulations</span>
                      </div>
                    </button>

                    <button
                      onClick={() => selectModule("visit")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "visit"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Plane className="w-3.5 h-3.5" />
                        <span>Plan Your Visit</span>
                      </div>
                    </button>

                    <button
                      onClick={() => selectModule("partners")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${mainModule === "partners"
                          ? "bg-slate-800 text-[#EAA500] font-bold"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5" />
                        <span>Partners &amp; Sponsors</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar Bottom Footer Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors min-h-[40px]"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#EAA500]" />
                  <span>Open in browser</span>
                </div>
              </Link>

              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Status</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Online
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-300 text-xs font-bold transition-colors min-h-[40px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* MAIN RIGHT WORKSPACE AREA */}
          <main className="flex-1 bg-[#020D1B] p-4 sm:p-8 space-y-6 overflow-y-auto w-full max-w-full">

            {/* Top Workspace Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-left">
              <div>
                <h1 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wide">
                  {mainModule === "dashboard" && "Dashboard Overview"}
                  {mainModule === "exhibitors" && "Exhibitor Registrations"}
                  {mainModule === "sponsors" && "Sponsorship Packages"}
                  {mainModule === "visitors" && "Visitor Pass Issuances"}
                  {mainModule === "events" && "Trade Fairs & Events Manager"}
                  {mainModule === "news" && "News & Press Bureau"}
                  {mainModule === "product-ads" && "Products & Services Ads Manager"}
                  {mainModule === "hero" && "Landing Hero Configuration"}
                  {mainModule === "why-exhibit" && "Why Exhibit Page Content"}
                  {mainModule === "participants" && "International Participants Guide"}
                  {mainModule === "visit" && "Plan Your Visit Page"}
                  {mainModule === "partners" && "Partners & Sponsors"}
                  {mainModule === "about" && "About & Vision"}
                  {mainModule === "contact" && "Contact Info & Footer"}
                  {mainModule === "regulations" && "Government Regulations"}
                </h1>
                <p className="text-xs text-slate-400 pt-0.5">
                  Manage records, edit fields, and publish updates to Tobgyel Global Expos
                </p>
              </div>

              <div className="flex items-center gap-3">
                {(mainModule === "exhibitors" || mainModule === "sponsors" || mainModule === "visitors") && (
                  <button
                    onClick={() => exportToCSV(mainModule)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 min-h-[40px]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#EAA500]" />
                    <span>Export CSV</span>
                  </button>
                )}

                {mainModule === "events" && (
                  <button
                    onClick={() => {
                      setEditingEvent({
                        id: "",
                        title: "",
                        category: "Trade & Commerce",
                        date: "",
                        location: "Phuentsholing, Bhutan",
                        venue: "Phuentsholing International Expo Pavilion",
                        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                        description: "",
                        highlights: ["Over 300 international exhibition booths"],
                        sectors: ["Construction", "Tourism"],
                        status: "Published",
                        featuredOnHome: true,
                      });
                      setEventModalTab("edit");
                      setShowEventModal(true);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 text-[#EAA500]" />
                    <span>Create Event</span>
                  </button>
                )}

                {mainModule === "news" && (
                  <button
                    onClick={() => {
                      setEditingNews({
                        id: "",
                        title: "",
                        category: "Press Release | Trade & Commerce",
                        date: new Date().toLocaleDateString(),
                        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
                        excerpt: "",
                        content: [""],
                        mediaContactEmail: "info@tobgyelglobalxpos.com",
                        status: "Published",
                        featuredOnHome: true,
                      });
                      setNewsModalTab("edit");
                      setShowNewsModal(true);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 text-[#EAA500]" />
                    <span>Create Article</span>
                  </button>
                )}

                {mainModule === "product-ads" && (
                  <button
                    onClick={() => {
                      setEditingAd({
                        id: "",
                        title: "",
                        companyName: "",
                        category: "Food & Organic",
                        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
                        description: "",
                        badgeTag: "Featured Ad",
                        ctaText: "Inquire Product",
                        ctaUrl: "/register/exhibitor",
                        active: true,
                      });
                      setShowAdModal(true);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 text-[#EAA500]" />
                    <span>Create Product Ad</span>
                  </button>
                )}
              </div>
            </div>

            {/* DASHBOARD MODULE */}
            {mainModule === "dashboard" && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#03142A] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-slate-400">Total Exhibitors</span>
                      <User className="w-5 h-5 text-[#0A4D8C]" />
                    </div>
                    <div className="text-2xl font-black text-white">{exhibitors.length}</div>
                    <div className="text-[11px] text-amber-400 font-semibold">
                      {exhibitors.filter(e => e.status === "Pending").length} Pending Review
                    </div>
                  </div>

                  <div className="bg-[#03142A] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-slate-400">Total Sponsors</span>
                      <Handshake className="w-5 h-5 text-[#EAA500]" />
                    </div>
                    <div className="text-2xl font-black text-white">{sponsors.length}</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">
                      {sponsors.filter(s => s.status === "Approved").length} Approved Partners
                    </div>
                  </div>

                  <div className="bg-[#03142A] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-slate-400">Visitor Passes</span>
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{visitors.length}</div>
                    <div className="text-[11px] text-slate-400 font-semibold">Issued Passes</div>
                  </div>

                  <div className="bg-[#03142A] border border-slate-800 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-slate-400">Product Ads</span>
                      <ShoppingBag className="w-5 h-5 text-[#EAA500]" />
                    </div>
                    <div className="text-2xl font-black text-white">{productAds.length}</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">
                      {productAds.filter(a => a.active).length} Active Ads
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EVENTS MODULE */}
            {mainModule === "events" && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {cmsEvents.map((evt) => (
                    <div key={evt.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase ${evt.status === "Published" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300"
                            }`}>
                            {evt.status}
                          </span>
                          <span className="text-[11px] text-slate-400">ID: {evt.id}</span>
                        </div>

                        <h3 className="text-base font-black text-white uppercase">{evt.title}</h3>
                        <p className="text-xs text-[#EAA500] font-semibold">{evt.category}</p>
                        <p className="text-xs text-slate-300 line-clamp-2">{evt.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">{evt.date}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingEvent(evt);
                              setEventModalTab("edit");
                              setShowEventModal(true);
                            }}
                            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 min-h-[36px]"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEventCMS(evt.id)}
                            className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NEWS & PRESS BUREAU MODULE */}
            {mainModule === "news" && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {cmsNews.map((news) => (
                    <div key={news.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase ${news.status === "Published" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300"
                            }`}>
                            {news.status}
                          </span>
                          <span className="text-[11px] text-slate-400">{news.date}</span>
                        </div>

                        <h3 className="text-sm font-bold text-white leading-snug">{news.title}</h3>
                        <p className="text-[11px] text-[#EAA500] font-medium">{news.category}</p>
                        <p className="text-xs text-slate-300 line-clamp-3">{news.excerpt}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <Link href={`/news/${news.id}`} target="_blank" className="text-slate-400 hover:text-[#EAA500] underline">
                          View Article
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingNews(news);
                              setNewsModalTab("edit");
                              setShowNewsModal(true);
                            }}
                            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 min-h-[36px]"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteNewsCMS(news.id)}
                            className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTS & SERVICES ADS MODULE */}
            {mainModule === "product-ads" && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {productAds.map((ad) => (
                    <div key={ad.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase ${ad.active !== false ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-red-500/20 text-red-300"}`}>
                            {ad.active !== false ? "Active Ad" : "Inactive"}
                          </span>
                          <span className="text-[11px] text-[#EAA500] font-bold">{ad.category}</span>
                        </div>

                        <div className="h-32 rounded-lg bg-cover bg-center border border-slate-800" style={{ backgroundImage: `url('${ad.image}')` }} />

                        <h3 className="text-sm font-bold text-white leading-snug">{ad.title}</h3>
                        <p className="text-[11px] text-slate-300 font-semibold">{ad.companyName}</p>
                        <p className="text-xs text-slate-400 line-clamp-2">{ad.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            const updated = { ...ad, active: !ad.active };
                            saveCMSProductAd(updated);
                            refreshData();
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors ${ad.active ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30" : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"}`}
                        >
                          {ad.active ? "Deactivate" : "Activate"}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingAd(ad);
                              setShowAdModal(true);
                            }}
                            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 min-h-[36px]"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteAdCMS(ad.id)}
                            className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HERO BANNER MODULE */}
            {mainModule === "hero" && heroConfig && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-8 space-y-8 shadow-xl text-left max-w-4xl">
                <form onSubmit={handleSaveHero} className="space-y-8 text-xs">

                  {/* Row 1: Main Headline & Gold Accents */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Title Headline Lines</p>
                      <p className="text-[11px] text-slate-400">Main hero title &amp; gold text accents</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Main White Headline Line</label>
                        <input
                          type="text"
                          value={heroConfig.headlineMain || ""}
                          onChange={(e) => setHeroConfig({ ...heroConfig, headlineMain: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Gold Accent Line 1</label>
                        <input
                          type="text"
                          value={heroConfig.headlineHighlight1 || ""}
                          onChange={(e) => setHeroConfig({ ...heroConfig, headlineHighlight1: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Gold Accent Line 2</label>
                        <input
                          type="text"
                          value={heroConfig.headlineHighlight2 || ""}
                          onChange={(e) => setHeroConfig({ ...heroConfig, headlineHighlight2: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Subtitle Description */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Subtitle Description</p>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <textarea
                        rows={3}
                        value={heroConfig.subtitle || ""}
                        onChange={(e) => setHeroConfig({ ...heroConfig, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Hero Backdrop Image Upload / Drag & Drop */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Backdrop Image</p>
                      <p className="text-[11px] text-slate-400">Drag &amp; drop or URL</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            const file = e.dataTransfer.files[0];
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              if (ev.target?.result) {
                                setHeroConfig({ ...heroConfig, backgroundImageUrl: ev.target.result as string });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="border-2 border-dashed border-slate-700 hover:border-[#EAA500] rounded-xl p-4 text-center bg-slate-900/60 transition-colors cursor-pointer group"
                      >
                        <input
                          type="file"
                          id="hero-image-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                if (ev.target?.result) {
                                  setHeroConfig({ ...heroConfig, backgroundImageUrl: ev.target.result as string });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label htmlFor="hero-image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                          <UploadCloud className="w-6 h-6 text-[#EAA500] group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold text-slate-200">
                            Drag &amp; drop background image, or <span className="text-[#EAA500] underline">browse file</span>
                          </span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0 relative">
                          {heroConfig.backgroundImageUrl ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${heroConfig.backgroundImageUrl}')` }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Or paste image URL (/hero-bhutan-expo.jpg or https://...)"
                          value={heroConfig.backgroundImageUrl || ""}
                          onChange={(e) => setHeroConfig({ ...heroConfig, backgroundImageUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: 5 Stats Counters */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">5 Stats Bar Counters</p>
                      <p className="text-[11px] text-slate-400">Homepage hero metric counters</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-4">
                      {heroConfig.stats && heroConfig.stats.map((st, idx) => (
                        <div key={idx} className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
                          <p className="text-[10px] font-extrabold uppercase text-[#EAA500]">Stat Counter #{idx + 1}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Title e.g. GLOBAL NETWORK"
                              value={st.title}
                              onChange={(e) => {
                                const newStats = [...heroConfig.stats];
                                newStats[idx] = { ...newStats[idx], title: e.target.value };
                                setHeroConfig({ ...heroConfig, stats: newStats });
                              }}
                              className="px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Subtitle e.g. Connecting Markets"
                              value={st.subtitle}
                              onChange={(e) => {
                                const newStats = [...heroConfig.stats];
                                newStats[idx] = { ...newStats[idx], subtitle: e.target.value };
                                setHeroConfig({ ...heroConfig, stats: newStats });
                              }}
                              className="px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Hero Configuration</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ABOUT CMS MODULE */}
            {mainModule === "about" && aboutConfig && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-8 space-y-8 shadow-xl text-left max-w-4xl">
                <form onSubmit={handleSaveAbout} className="space-y-8 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">About Title &amp; Subtitle</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <input
                        type="text"
                        value={aboutConfig.title}
                        onChange={(e) => setAboutConfig({ ...aboutConfig, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                      <textarea
                        rows={2}
                        value={aboutConfig.subtitle}
                        onChange={(e) => setAboutConfig({ ...aboutConfig, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#EAA500]" />
                      <span>Save About Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* CONTACT CMS MODULE */}
            {mainModule === "contact" && contactConfig && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-8 space-y-8 shadow-xl text-left max-w-4xl">
                <form onSubmit={handleSaveContact} className="space-y-8 text-xs">

                  {/* Row 1: Section Title & Form Titles */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Section &amp; Form Headings</p>
                      <p className="text-[11px] text-slate-400">Main footer titles</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Section Title</label>
                        <input
                          type="text"
                          value={contactConfig.sectionTitle || "Contact Us"}
                          onChange={(e) => setContactConfig({ ...contactConfig, sectionTitle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Form Heading</label>
                        <input
                          type="text"
                          value={contactConfig.formTitle || "Send Us A Message"}
                          onChange={(e) => setContactConfig({ ...contactConfig, formTitle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Form Submit Button Label</label>
                        <input
                          type="text"
                          value={contactConfig.formButtonLabel || "Send Message"}
                          onChange={(e) => setContactConfig({ ...contactConfig, formButtonLabel: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Company Name & Address */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Company Name &amp; Physical Address</p>
                      <p className="text-[11px] text-slate-400">Headquarters location details</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Company Name</label>
                        <input
                          type="text"
                          value={contactConfig.companyName}
                          onChange={(e) => setContactConfig({ ...contactConfig, companyName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Address Line 1</label>
                        <input
                          type="text"
                          value={contactConfig.addressLine1}
                          onChange={(e) => setContactConfig({ ...contactConfig, addressLine1: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Address Line 2 &amp; Country</label>
                        <input
                          type="text"
                          value={contactConfig.addressLine2}
                          onChange={(e) => setContactConfig({ ...contactConfig, addressLine2: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Phone, Email & Website */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-dashed border-slate-800/80 pb-6">
                    <div className="w-full sm:w-1/3 space-y-1">
                      <p className="font-bold text-white uppercase tracking-wider text-xs">Direct Contact Details</p>
                      <p className="text-[11px] text-slate-400">Phone numbers, email, website URL</p>
                    </div>
                    <div className="w-full sm:w-2/3 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={contactConfig.phonePrimary}
                          onChange={(e) => setContactConfig({ ...contactConfig, phonePrimary: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          value={contactConfig.emailGeneral}
                          onChange={(e) => setContactConfig({ ...contactConfig, emailGeneral: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Website URL Text</label>
                        <input
                          type="text"
                          value={contactConfig.websiteUrl || "www.tobgyelglobalxpos.com"}
                          onChange={(e) => setContactConfig({ ...contactConfig, websiteUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Contact Details</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>

        </div>
      )}

      {/* FULL-FEATURED ARTICLE CREATION & EDIT MODAL WITH LIVE PREVIEW */}
      {showNewsModal && editingNews && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#03142A] border border-slate-800 rounded-2xl max-w-3xl w-full p-4 sm:p-8 space-y-6 text-left shadow-2xl my-auto max-h-[90vh] overflow-y-auto">

            {/* Modal Top Bar with Live Preview Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-sm sm:text-lg font-black uppercase text-white leading-tight">
                  {editingNews.id ? "Edit Press Article" : "Create Press Article"}
                </h3>

                <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setNewsModalTab("edit")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${newsModalTab === "edit" ? "bg-[#0A4D8C] text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setNewsModalTab("preview")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${newsModalTab === "preview" ? "bg-[#EAA500] text-[#03142A] shadow" : "text-slate-400 hover:text-white"
                      }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-white text-xl p-1">✕</button>
            </div>

            {/* TAB 1: EDIT FIELDS FORM */}
            {newsModalTab === "edit" && (
              <form onSubmit={handleSaveNews} className="space-y-5 text-xs">

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Article Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter press release headline..."
                    value={editingNews.title || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white uppercase mb-1">Category Sector Tag</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Press Release | Trade & Commerce"
                      value={editingNews.category || ""}
                      onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-white uppercase mb-1">Publish Date</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. May 15, 2024"
                      value={editingNews.date || ""}
                      onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                {/* Featured Cover Image: Drag & Drop + URL */}
                <div className="space-y-2">
                  <label className="block font-bold text-white uppercase mb-1">
                    Cover Image (URL or Drag &amp; Drop File Upload)
                  </label>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setEditingNews({ ...editingNews, image: ev.target.result as string });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border-2 border-dashed border-slate-700 hover:border-[#EAA500] rounded-xl p-4 text-center bg-slate-900/60 transition-colors cursor-pointer group"
                  >
                    <input
                      type="file"
                      id="news-image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              setEditingNews({ ...editingNews, image: ev.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="news-image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <UploadCloud className="w-7 h-7 text-[#EAA500] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-200">
                        Drag &amp; drop image here, or <span className="text-[#EAA500] underline">browse file</span>
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0 relative">
                      {editingNews.image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${editingNews.image}')` }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={editingNews.image || ""}
                      onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Card Excerpt Summary</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Short summary displayed on homepage card..."
                    value={editingNews.excerpt || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500] resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Full Article Paragraphs</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write detailed body paragraphs..."
                    value={Array.isArray(editingNews.content) ? editingNews.content.join("\n\n") : editingNews.content || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value.split("\n\n") })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewsModalTab("preview")}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#EAA500] font-bold text-xs flex items-center gap-1.5 min-h-[40px]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNewsModal(false)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold min-h-[40px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold uppercase tracking-wider shadow-lg min-h-[40px]"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: LIVE PREVIEW */}
            {newsModalTab === "preview" && (
              <div className="space-y-6">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Live Preview Mode: Exact preview of public article card.</span>
                </div>

                <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xl max-w-sm mx-auto text-left text-slate-900">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${editingNews.image}')` }}
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-bold text-[#EAA500] uppercase tracking-wider">
                      {editingNews.category || "Press Release"}
                    </span>
                    <h3 className="text-base font-bold text-[#03142A] leading-snug">
                      {editingNews.title || "Untitled Article"}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">{editingNews.date || "May 15, 2024"}</p>
                    <p className="text-xs text-slate-600 line-clamp-3">{editingNews.excerpt}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setNewsModalTab("edit")}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs min-h-[40px]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveNews}
                    className="px-6 py-2.5 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 min-h-[40px]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm &amp; Commit</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FULL-FEATURED EVENT CREATION & EDIT MODAL WITH LIVE PREVIEW */}
      {showEventModal && editingEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#03142A] border border-slate-800 rounded-2xl max-w-3xl w-full p-4 sm:p-8 space-y-6 text-left shadow-2xl my-auto max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-sm sm:text-lg font-black uppercase text-white leading-tight">
                  {editingEvent.id ? "Edit Trade Event" : "Create Trade Event"}
                </h3>

                <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setEventModalTab("edit")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${eventModalTab === "edit" ? "bg-[#0A4D8C] text-white shadow" : "text-slate-400 hover:text-white"
                      }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setEventModalTab("preview")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${eventModalTab === "preview" ? "bg-[#EAA500] text-[#03142A] shadow" : "text-slate-400 hover:text-white"
                      }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-white text-xl p-1">✕</button>
            </div>

            {eventModalTab === "edit" && (
              <form onSubmit={handleSaveEvent} className="space-y-5 text-xs">
                <div>
                  <label className="block font-bold text-white uppercase mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter trade expo title..."
                    value={editingEvent.title || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white uppercase mb-1">Category Sectors</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Construction | Food | Tourism"
                      value={editingEvent.category || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-white uppercase mb-1">Date Range</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. May 20 – 23, 2027"
                      value={editingEvent.date || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                {/* Cover Image: Drag & Drop + URL */}
                <div className="space-y-2">
                  <label className="block font-bold text-white uppercase mb-1">
                    Cover Image (URL or Drag &amp; Drop File Upload)
                  </label>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setEditingEvent({ ...editingEvent, image: ev.target.result as string });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border-2 border-dashed border-slate-700 hover:border-[#EAA500] rounded-xl p-4 text-center bg-slate-900/60 transition-colors cursor-pointer group"
                  >
                    <input
                      type="file"
                      id="event-image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              setEditingEvent({ ...editingEvent, image: ev.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label htmlFor="event-image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <UploadCloud className="w-7 h-7 text-[#EAA500] group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-200">
                        Drag &amp; drop image here, or <span className="text-[#EAA500] underline">browse file</span>
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0 relative">
                      {editingEvent.image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${editingEvent.image}')` }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">No Image</div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={editingEvent.image || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Detailed Description</label>
                  <textarea
                    rows={4}
                    required
                    value={editingEvent.description || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
                  <button
                    type="button"
                    onClick={() => setEventModalTab("preview")}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#EAA500] font-bold text-xs flex items-center gap-1.5 min-h-[40px]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold min-h-[40px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold uppercase tracking-wider shadow-lg min-h-[40px]"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </form>
            )}

            {eventModalTab === "preview" && (
              <div className="space-y-6">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Live Preview Mode: Exact preview of public event card.</span>
                </div>

                <div className="group relative rounded-xl overflow-hidden shadow-xl border border-slate-700 bg-[#03142A] min-h-[340px] flex flex-col justify-end text-left max-w-md mx-auto">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${editingEvent.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/85 to-transparent" />

                  <div className="relative p-6 space-y-2.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAA500] text-[#03142A] text-[10px] font-extrabold uppercase">
                      <Sparkles className="w-3 h-3" />
                      <span>{editingEvent.category || "Trade & Commerce"}</span>
                    </span>

                    <h3 className="text-xl font-black text-white uppercase leading-tight">
                      {editingEvent.title || "Untitled Event"}
                    </h3>

                    <div className="pt-2 flex flex-col gap-1.5 text-xs font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#EAA500]" />
                        <span>{editingEvent.date || "May 20 – 23, 2027"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#EAA500]" />
                        <span>{editingEvent.location || "Phuentsholing, Bhutan"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEventModalTab("edit")}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs min-h-[40px]"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEvent}
                    className="px-6 py-2.5 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 min-h-[40px]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm &amp; Commit</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* PRODUCT AD EDIT / CREATE MODAL */}
      {showAdModal && editingAd && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#03142A] border border-slate-700/80 rounded-2xl max-w-2xl w-full p-4 sm:p-6 space-y-5 shadow-2xl text-left my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#0A4D8C] text-[#EAA500]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  {editingAd.id ? "Edit Product Advertisement" : "Create Product Advertisement"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowAdModal(false);
                  setEditingAd(null);
                }}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAd} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-white uppercase mb-1">Product / Service Ad Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Bhutanese Cordyceps & Herbal Tea Range"
                  value={editingAd.title || ""}
                  onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white uppercase mb-1">Company / Exhibitor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Himalayan Bio Products Bhutan"
                    value={editingAd.companyName || ""}
                    onChange={(e) => setEditingAd({ ...editingAd, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Category</label>
                  <select
                    value={editingAd.category || "Food & Organic"}
                    onChange={(e) => setEditingAd({ ...editingAd, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  >
                    <option value="Food & Organic">Food &amp; Organic</option>
                    <option value="Machinery & Tech">Machinery &amp; Tech</option>
                    <option value="Handicrafts & Luxury">Handicrafts &amp; Luxury</option>
                    <option value="Services & Tourism">Services &amp; Tourism</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white uppercase mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Featured Exhibitor Ad"
                    value={editingAd.badgeTag || ""}
                    onChange={(e) => setEditingAd({ ...editingAd, badgeTag: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Button CTA Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Inquire Booth Samples"
                    value={editingAd.ctaText || ""}
                    onChange={(e) => setEditingAd({ ...editingAd, ctaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={editingAd.image || ""}
                  onChange={(e) => setEditingAd({ ...editingAd, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                />
              </div>

              <div>
                <label className="block font-bold text-white uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter product description..."
                  value={editingAd.description || ""}
                  onChange={(e) => setEditingAd({ ...editingAd, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="adActiveCheck"
                  checked={editingAd.active !== false}
                  onChange={(e) => setEditingAd({ ...editingAd, active: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#EAA500] focus:ring-0"
                />
                <label htmlFor="adActiveCheck" className="text-xs font-bold text-white cursor-pointer">
                  Activate Ad (Visible on Website Marketplace)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdModal(false);
                    setEditingAd(null);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#008E48] hover:bg-[#00773d] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 min-h-[40px]"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Advertisement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
