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
  X,
  ArrowLeft,
  Check,
  Tag,
  Share2,
  Monitor,
  Tablet,
  Smartphone
} from "lucide-react";

import {
  getExhibitors,
  fetchExhibitorsAsync,
  getSponsors,
  fetchSponsorsAsync,
  getVisitors,
  fetchVisitorsAsync,
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
  fetchCMSEventsAsync,
  saveCMSEvent,
  deleteCMSEvent,
  getCMSNews,
  fetchCMSNewsAsync,
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
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_HERO,
  INITIAL_ABOUT,
  INITIAL_CONTACT
} from "@/app/lib/cmsStore";

import AdminLivePreview from "./components/AdminLivePreview";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Partners from "../components/Partners";
import ProductsAds from "../components/ProductsAds";
import InfoHub from "../components/InfoHub";
import { CompactCardCountdown } from "../components/CountdownTimer";

export default function AdminPage() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Mobile Navigation Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Module
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

  // Split Workspace & Live Editor Active Item State
  const [editingEvent, setEditingEvent] = useState<Partial<TradeEventCMS> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsArticleCMS> | null>(null);
  const [editingAd, setEditingAd] = useState<Partial<ProductAdCMS> | null>(null);

  // Editor Tabs ("details" | "seo" | "settings")
  const [editorTab, setEditorTab] = useState<"details" | "seo" | "settings">("details");

  // Unsaved changes indicator state
  const [isDirty, setIsDirty] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

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

  const refreshData = async () => {
    setExhibitors(getExhibitors());
    setSponsors(getSponsors());
    setVisitors(getVisitors());

    const exh = await fetchExhibitorsAsync();
    const sp = await fetchSponsorsAsync();
    const vis = await fetchVisitorsAsync();
    setExhibitors(exh);
    setSponsors(sp);
    setVisitors(vis);

    const evts = await fetchCMSEventsAsync();
    const news = await fetchCMSNewsAsync();
    setCmsEvents(evts);
    setCmsNews(news);
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

  const selectModule = (module: typeof mainModule) => {
    setMainModule(module);
    setIsMobileMenuOpen(false);
    setEditingEvent(null);
    setEditingNews(null);
    setEditingAd(null);
    setIsDirty(false);
    setSaveSuccessMsg("");
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
  const handleSaveEvent = (publishStatus: "Published" | "Draft" = "Published") => {
    if (!editingEvent?.title || !editingEvent?.date) {
      alert("Please fill in Title and Date fields.");
      return;
    }
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
      highlights: editingEvent.highlights || ["Over 300 international exhibition booths"],
      sectors: editingEvent.sectors || ["Construction", "Tourism"],
      status: publishStatus,
      featuredOnHome: editingEvent.featuredOnHome !== false,
      updatedAt: new Date().toLocaleDateString(),
    };
    saveCMSEvent(itemToSave);
    setIsDirty(false);
    setSaveSuccessMsg(`Event ${publishStatus === "Published" ? "Published Live!" : "Saved as Draft"}`);
    setTimeout(() => setSaveSuccessMsg(""), 3000);
    refreshData();
  };

  const handleDeleteEventCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this CMS event listing?")) {
      deleteCMSEvent(id);
      if (editingEvent?.id === id) setEditingEvent(null);
      refreshData();
    }
  };

  // CMS News Actions
  const handleSaveNews = (publishStatus: "Published" | "Draft" = "Published") => {
    if (!editingNews?.title || !editingNews?.date) {
      alert("Please fill in Title and Date fields.");
      return;
    }
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
      status: publishStatus,
      featuredOnHome: editingNews.featuredOnHome !== false,
      updatedAt: new Date().toLocaleDateString(),
    };
    saveCMSNews(itemToSave);
    setIsDirty(false);
    setSaveSuccessMsg(`Article ${publishStatus === "Published" ? "Published Live!" : "Saved as Draft"}`);
    setTimeout(() => setSaveSuccessMsg(""), 3000);
    refreshData();
  };

  const handleDeleteNewsCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this CMS news article?")) {
      deleteCMSNews(id);
      if (editingNews?.id === id) setEditingNews(null);
      refreshData();
    }
  };

  // CMS Product Ads Actions
  const handleSaveAd = () => {
    if (!editingAd || !editingAd.title) {
      alert("Please enter product ad title.");
      return;
    }
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
    setIsDirty(false);
    setSaveSuccessMsg("Product Ad Saved!");
    setTimeout(() => setSaveSuccessMsg(""), 3000);
    refreshData();
  };

  const handleDeleteAdCMS = (id: string) => {
    if (confirm("Are you sure you want to delete this product ad?")) {
      deleteCMSProductAd(id);
      if (editingAd?.id === id) setEditingAd(null);
      refreshData();
    }
  };

  // Page CMS Actions
  const handleSaveHero = () => {
    if (heroConfig) {
      saveCMSHeroConfig(heroConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Hero Banner Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveWhyExhibit = () => {
    if (whyExhibitConfig) {
      saveCMSWhyExhibit(whyExhibitConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Why Exhibit Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveParticipants = () => {
    if (participantsConfig) {
      saveCMSParticipants(participantsConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Participants Guide Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveVisit = () => {
    if (visitConfig) {
      saveCMSVisit(visitConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Plan Your Visit Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSavePartners = () => {
    if (partnersConfig) {
      saveCMSPartners(partnersConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Partners Config Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveAbout = () => {
    if (aboutConfig) {
      saveCMSAbout(aboutConfig);
      setIsDirty(false);
      setSaveSuccessMsg("About Vision Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveContact = () => {
    if (contactConfig) {
      saveCMSContact(contactConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Contact & Footer Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
      refreshData();
    }
  };

  const handleSaveRegulations = () => {
    if (regulationsConfig) {
      saveCMSRegulations(regulationsConfig);
      setIsDirty(false);
      setSaveSuccessMsg("Regulations Saved!");
      setTimeout(() => setSaveSuccessMsg(""), 3000);
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

  // Filtered Submissions
  const filteredExhibitors = exhibitors.filter((e) => {
    const matchesSearch = e.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || e.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) || e.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSponsors = sponsors.filter((s) => {
    const matchesSearch = s.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) || s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch = v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || v.email.toLowerCase().includes(searchQuery.toLowerCase()) || v.passCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered CMS Items
  const filteredEvents = cmsEvents.filter((evt) => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || evt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredNews = cmsNews.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || news.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || news.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                Visual Content Management &amp; Live Website Editor
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
                <span>Sign In to Visual CMS</span>
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
        /* PROTECTED SIDEBAR + SPLIT WORKSPACE LAYOUT */
        <div className="flex-1 flex flex-col md:flex-row min-h-screen relative">

          {/* MOBILE TOP BAR (< 768px) */}
          <div className="md:hidden bg-[#03142A] border-b border-slate-800 p-3.5 flex items-center justify-between sticky top-0 z-40">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white hover:text-[#EAA500] min-h-[42px] min-w-[42px] flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#0A4D8C] text-[#EAA500] shrink-0">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h2 className="text-xs font-black uppercase text-white tracking-wider leading-tight">
                  Tobgyel Visual CMS
                </h2>
                <p className="text-[10px] text-slate-400 font-medium capitalize leading-tight">
                  {mainModule.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE BACKDROP OVERLAY */}
          {isMobileMenuOpen && (
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
            />
          )}

          {/* SIDEBAR NAVIGATION */}
          <aside
            className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-[#03142A] border-r border-slate-800 flex flex-col justify-between shrink-0 p-5 space-y-6 overflow-y-auto transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
              }`}
          >
            <div className="space-y-6">

              {/* Brand Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#0A4D8C] text-[#EAA500]">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase text-white tracking-wider">
                      Tobgyel CMS
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">Visual Editor</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="md:hidden p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Section 1: Dashboard */}
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

              {/* Menu Section 2: Submissions Group */}
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

              {/* Menu Section 3: Live CMS Modules */}
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
                  <span>Open Public Website</span>
                </div>
              </Link>

              <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Supabase DB</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Connected
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

          {/* MAIN WORKSPACE AREA */}
          <main className="flex-1 bg-[#020D1B] p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto w-full max-w-full">

            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 text-left">
              <div>
                <h1 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wide flex items-center gap-2">
                  <span>
                    {mainModule === "dashboard" && "Dashboard Overview"}
                    {mainModule === "exhibitors" && "Exhibitor Registrations"}
                    {mainModule === "sponsors" && "Sponsorship Applications"}
                    {mainModule === "visitors" && "Visitor Pass Issuances"}
                    {mainModule === "events" && (editingEvent ? "Editing Trade Event" : "Trade Fairs & Events Manager")}
                    {mainModule === "news" && (editingNews ? "Editing Press Release" : "News & Press Bureau")}
                    {mainModule === "product-ads" && (editingAd ? "Editing Product Showcase Ad" : "Products & Services Ads Manager")}
                    {mainModule === "hero" && "Landing Hero Configuration"}
                    {mainModule === "why-exhibit" && "Why Exhibit Content"}
                    {mainModule === "participants" && "International Participants Guide"}
                    {mainModule === "visit" && "Plan Your Visit Configuration"}
                    {mainModule === "partners" && "Partners & Sponsors"}
                    {mainModule === "about" && "About & Vision"}
                    {mainModule === "contact" && "Contact Info & Footer"}
                    {mainModule === "regulations" && "Government Regulations"}
                  </span>
                  {isDirty && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/40 animate-pulse">
                      ● Unsaved Changes
                    </span>
                  )}
                  {saveSuccessMsg && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/40 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {saveSuccessMsg}
                    </span>
                  )}
                </h1>
                <p className="text-xs text-slate-400 pt-0.5">
                  Visual Live Preview Editor &bull; Real-time rendering on keypress
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

                {mainModule === "events" && !editingEvent && (
                  <button
                    onClick={() => {
                      setEditingEvent({
                        id: `evt-${Date.now()}`,
                        slug: "new-trade-expo",
                        title: "New International Trade Expo 2027",
                        category: "Trade & Commerce",
                        date: "May 20 – 23, 2027",
                        location: "Phuentsholing, Bhutan",
                        venue: "Phuentsholing International Expo Pavilion",
                        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                        description: "Premier international trade exhibition connecting enterprises across Bhutan and South Asia.",
                        highlights: ["Over 300 international exhibition booths", "B2B Matchmaking lounges"],
                        sectors: ["Building & Construction", "Tourism"],
                        status: "Draft",
                        featuredOnHome: true,
                      });
                      setIsDirty(true);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 text-[#EAA500]" />
                    <span>Create Event</span>
                  </button>
                )}

                {mainModule === "news" && !editingNews && (
                  <button
                    onClick={() => {
                      setEditingNews({
                        id: `news-${Date.now()}`,
                        slug: "new-press-announcement",
                        title: "Official Announcement: Global Trade Delegations Confirmed",
                        category: "Press Release | Trade & Commerce",
                        date: new Date().toLocaleDateString(),
                        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
                        excerpt: "Delegates from international chambers of commerce confirm participation for upcoming expos in Bhutan.",
                        content: [
                          "Tobgyel Global Expos is pleased to announce confirmed participation from regional trade delegations across South Asia.",
                          "Foreign delegates will benefit from expedited visa clearance, dry-port customs assistance, and curated B2B matchmaking lounges."
                        ],
                        mediaContactEmail: "info@tobgyelglobalxpos.com",
                        status: "Draft",
                        featuredOnHome: true,
                      });
                      setIsDirty(true);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[40px]"
                  >
                    <Plus className="w-4 h-4 text-[#EAA500]" />
                    <span>Create Article</span>
                  </button>
                )}

                {mainModule === "product-ads" && !editingAd && (
                  <button
                    onClick={() => {
                      setEditingAd({
                        id: `ad-${Date.now()}`,
                        title: "Organic Bhutanese Cordyceps & Herbal Teas",
                        companyName: "Himalayan Bio Products Bhutan",
                        category: "Food & Organic",
                        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
                        description: "Premium wild-harvested Cordyceps Sinensis and high-altitude organic green herbal infusions.",
                        badgeTag: "Featured Exhibitor Ad",
                        ctaText: "Inquire Product",
                        ctaUrl: "/register/exhibitor",
                        active: true,
                      });
                      setIsDirty(true);
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

            {/* TRADE EVENTS MODULE: LISTING VIEW vs SPLIT LIVE-EDITOR VIEW */}
            {mainModule === "events" && (
              <>
                {!editingEvent ? (
                  /* VISUAL CARDS LISTING VIEW */
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#03142A] border border-slate-800 p-4 rounded-xl">
                      <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Search trade events..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                        {["All", "Published", "Draft"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === tab
                                ? "bg-[#0A4D8C] text-white shadow"
                                : "bg-slate-900 text-slate-400 hover:text-white"
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="bg-[#03142A] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all group"
                        >
                          <div className="space-y-3 p-5">
                            <div className="relative h-40 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                              <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('${evt.image}')` }}
                              />
                              <div className="absolute top-3 right-3">
                                <span
                                  className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider ${evt.status === "Published"
                                      ? "bg-emerald-500/90 text-white shadow"
                                      : "bg-amber-500/90 text-slate-950 shadow"
                                    }`}
                                >
                                  ● {evt.status}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-base font-black text-white uppercase group-hover:text-[#EAA500] transition-colors leading-snug">
                                {evt.title}
                              </h3>
                              <p className="text-xs text-[#EAA500] font-semibold">{evt.category}</p>
                              <p className="text-xs text-slate-400 line-clamp-2 pt-1">{evt.description}</p>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-medium">{evt.date}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingEvent(evt);
                                  setIsDirty(false);
                                }}
                                className="px-3.5 py-1.5 rounded bg-[#0A4D8C] hover:bg-[#083e73] text-white font-bold flex items-center gap-1.5 transition-all shadow"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                                <span>Edit Live &rarr;</span>
                              </button>
                              <button
                                onClick={() => handleDeleteEventCMS(evt.id)}
                                className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* SPLIT TWO-PANEL LIVE EDITOR VIEW */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">

                    {/* LEFT PANEL: EDITOR FORM (4 COLS) */}
                    <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">

                      {/* Top Header Bar inside Editor */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <button
                          onClick={() => setEditingEvent(null)}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#EAA500] font-bold"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Listings</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveEvent("Draft")}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider"
                          >
                            Save Draft
                          </button>
                          <button
                            onClick={() => handleSaveEvent("Published")}
                            className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4 text-[#EAA500]" />
                            <span>Publish Live</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-5 text-xs">
                        {/* Title with Character Counter */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold uppercase tracking-wider text-slate-300">
                              Event Title *
                            </label>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {(editingEvent.title || "").length} / 80
                            </span>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. BIN Trade Showcase 2027"
                            value={editingEvent.title || ""}
                            onChange={(e) => {
                              setEditingEvent({ ...editingEvent, title: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                              Event Category *
                            </label>
                            <input
                              type="text"
                              value={editingEvent.category || ""}
                              onChange={(e) => {
                                setEditingEvent({ ...editingEvent, category: e.target.value });
                                setIsDirty(true);
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                            />
                          </div>

                          <div>
                            <label className="block font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                              Dates / Duration *
                            </label>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5 font-bold uppercase">Start Date</span>
                                  <input
                                    type="date"
                                    onChange={(e) => {
                                      const startVal = e.target.value;
                                      const endVal = (document.getElementById("event-end-date") as HTMLInputElement)?.value;
                                      if (startVal) {
                                        const formatDateRange = (s: string, en: string) => {
                                          const startDate = new Date(s);
                                          if (isNaN(startDate.getTime())) return s;
                                          const startFormatted = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                          if (!en) return startFormatted;
                                          const endDate = new Date(en);
                                          if (isNaN(endDate.getTime())) return startFormatted;
                                          const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
                                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                                          if (startDate.getFullYear() === endDate.getFullYear()) {
                                            if (startDate.getMonth() === endDate.getMonth()) {
                                              const monthStr = startDate.toLocaleDateString("en-US", { month: "short" });
                                              return `${monthStr} ${startDate.getDate()} – ${endDate.getDate()}, ${startDate.getFullYear()} (${diffDays} Days)`;
                                            }
                                            const startMonthDay = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                            const endMonthDay = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                            return `${startMonthDay} – ${endMonthDay}, ${startDate.getFullYear()} (${diffDays} Days)`;
                                          }
                                          const endFormatted = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                          return `${startFormatted} – ${endFormatted} (${diffDays} Days)`;
                                        };
                                        setEditingEvent({ ...editingEvent, date: formatDateRange(startVal, endVal) });
                                        setIsDirty(true);
                                      }
                                    }}
                                    id="event-start-date"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                                  />
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5 font-bold uppercase">End Date</span>
                                  <input
                                    type="date"
                                    onChange={(e) => {
                                      const startVal = (document.getElementById("event-start-date") as HTMLInputElement)?.value;
                                      const endVal = e.target.value;
                                      if (startVal || endVal) {
                                        const formatDateRange = (s: string, en: string) => {
                                          const startDate = new Date(s);
                                          if (isNaN(startDate.getTime())) return s;
                                          const startFormatted = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                          if (!en) return startFormatted;
                                          const endDate = new Date(en);
                                          if (isNaN(endDate.getTime())) return startFormatted;
                                          const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
                                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                                          if (startDate.getFullYear() === endDate.getFullYear()) {
                                            if (startDate.getMonth() === endDate.getMonth()) {
                                              const monthStr = startDate.toLocaleDateString("en-US", { month: "short" });
                                              return `${monthStr} ${startDate.getDate()} – ${endDate.getDate()}, ${startDate.getFullYear()} (${diffDays} Days)`;
                                            }
                                            const startMonthDay = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                            const endMonthDay = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                            return `${startMonthDay} – ${endMonthDay}, ${startDate.getFullYear()} (${diffDays} Days)`;
                                          }
                                          const endFormatted = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                          return `${startFormatted} – ${endFormatted} (${diffDays} Days)`;
                                        };
                                        setEditingEvent({ ...editingEvent, date: formatDateRange(startVal, endVal) });
                                        setIsDirty(true);
                                      }
                                    }}
                                    id="event-end-date"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                                  />
                                </div>
                              </div>
                              <input
                                type="text"
                                placeholder="e.g. Dec 30, 2026 – Jan 3, 2027 (5 Days)"
                                value={editingEvent.date || ""}
                                onChange={(e) => {
                                  setEditingEvent({ ...editingEvent, date: e.target.value });
                                  setIsDirty(true);
                                }}
                                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                              Location (City, Country)
                            </label>
                            <input
                              type="text"
                              value={editingEvent.location || ""}
                              onChange={(e) => {
                                setEditingEvent({ ...editingEvent, location: e.target.value });
                                setIsDirty(true);
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                            />
                          </div>

                          <div>
                            <label className="block font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                              Expo Venue
                            </label>
                            <input
                              type="text"
                              value={editingEvent.venue || ""}
                              onChange={(e) => {
                                setEditingEvent({ ...editingEvent, venue: e.target.value });
                                setIsDirty(true);
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                            />
                          </div>
                        </div>

                        {/* Visual Drag & Drop Image Upload Dropzone */}
                        <div>
                          <label className="block font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                            Cover Image Banner
                          </label>
                          <div className="space-y-3">
                            {editingEvent.image ? (
                              <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
                                <img
                                  src={editingEvent.image}
                                  alt="Cover Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                  <label htmlFor="cover-file-event" className="px-4 py-2 rounded-lg bg-[#EAA500] hover:bg-[#d49400] text-slate-950 font-black text-xs cursor-pointer shadow-md flex items-center gap-1.5 transition">
                                    <UploadCloud className="w-4 h-4" /> Replace Image
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingEvent({ ...editingEvent, image: "" });
                                      setIsDirty(true);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    const file = e.dataTransfer.files[0];
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (ev.target?.result) {
                                        setEditingEvent({ ...editingEvent, image: ev.target.result as string });
                                        setIsDirty(true);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="border-2 border-dashed border-slate-700 hover:border-[#EAA500] rounded-xl p-6 text-center bg-slate-900/60 hover:bg-slate-900 transition cursor-pointer group"
                              >
                                <label htmlFor="cover-file-event" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                                  <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-[#EAA500]/20 text-slate-400 group-hover:text-[#EAA500] flex items-center justify-center transition">
                                    <UploadCloud className="w-6 h-6" />
                                  </div>
                                  <span className="text-xs font-bold text-white group-hover:text-[#EAA500] transition">
                                    Upload Photo or Drag &amp; Drop Image
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Supports PNG, JPG, WEBP, GIF (Max 5MB)
                                  </span>
                                </label>
                              </div>
                            )}

                            <input
                              type="file"
                              id="cover-file-event"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      setEditingEvent({ ...editingEvent, image: ev.target.result as string });
                                      setIsDirty(true);
                                    }
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                            />

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold text-slate-500">Or Paste URL:</span>
                              <input
                                type="text"
                                placeholder="https://..."
                                value={editingEvent.image || ""}
                                onChange={(e) => {
                                  setEditingEvent({ ...editingEvent, image: e.target.value });
                                  setIsDirty(true);
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold uppercase tracking-wider text-slate-300">
                              Event Description
                            </label>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {(editingEvent.description || "").length} / 500
                            </span>
                          </div>
                          <textarea
                            rows={4}
                            value={editingEvent.description || ""}
                            onChange={(e) => {
                              setEditingEvent({ ...editingEvent, description: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                          />
                        </div>

                        {/* Publish Status */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                          <div>
                            <p className="font-bold text-white text-xs">Publish Status</p>
                            <p className="text-[11px] text-slate-400">Make event public on website</p>
                          </div>
                          <select
                            value={editingEvent.status || "Published"}
                            onChange={(e) => {
                              setEditingEvent({ ...editingEvent, status: e.target.value as any });
                              setIsDirty(true);
                            }}
                            className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white font-bold text-xs"
                          >
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        {/* Homepage Feature Toggle */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                          <div>
                            <p className="font-bold text-white text-xs">Feature on Homepage</p>
                            <p className="text-[11px] text-slate-400">Show in main homepage upcoming events section</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={editingEvent.featuredOnHome !== false}
                            onChange={(e) => {
                              setEditingEvent({ ...editingEvent, featuredOnHome: e.target.checked });
                              setIsDirty(true);
                            }}
                            className="w-4 h-4 accent-[#EAA500] rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: LIVE WEBSITE PREVIEW (8 COLS STICKY) */}
                    <div className="lg:col-span-8">
                      <AdminLivePreview
                        title="Live Event Card & Detail Preview"
                        subtitle="Updates instantly as you edit fields on the left"
                      >
                        <div className="p-6 bg-[#03142A] text-white min-h-[480px] flex flex-col justify-end relative overflow-hidden text-left">
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                            style={{ backgroundImage: `url('${editingEvent.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#03142A] via-[#03142A]/80 to-transparent" />

                          <div className="relative z-10 space-y-3">
                            <span className="px-3 py-1 rounded bg-[#EAA500] text-slate-950 text-[10px] font-black uppercase tracking-wider w-fit block">
                              {editingEvent.category || "Trade & Commerce"}
                            </span>

                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                              {editingEvent.title || "Untitled Trade Event"}
                            </h2>

                            <p className="text-xs text-slate-200 font-medium leading-relaxed">
                              {editingEvent.description || "Event description preview..."}
                            </p>

                            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-200 font-semibold">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#EAA500]" />
                                <span>{editingEvent.date || "Date Pending"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#EAA500]" />
                                <span>{editingEvent.venue || "Phuentsholing Expo Pavilion"}, {editingEvent.location || "Bhutan"}</span>
                              </div>
                            </div>

                            <div className="pt-2">
                              <CompactCardCountdown />
                            </div>
                          </div>
                        </div>
                      </AdminLivePreview>
                    </div>

                  </div>
                )}
              </>
            )}

            {/* NEWS & PRESS BUREAU MODULE: LISTING VIEW vs SPLIT LIVE-EDITOR VIEW */}
            {mainModule === "news" && (
              <>
                {!editingNews ? (
                  /* VISUAL CARDS LISTING VIEW */
                  <div className="space-y-6 text-left">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#03142A] border border-slate-800 p-4 rounded-xl">
                      <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="Search news releases..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                        {["All", "Published", "Draft"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === tab
                                ? "bg-[#0A4D8C] text-white shadow"
                                : "bg-slate-900 text-slate-400 hover:text-white"
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredNews.map((news) => (
                        <div
                          key={news.id}
                          className="bg-[#03142A] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all group"
                        >
                          <div className="space-y-3 p-5">
                            <div className="relative h-36 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                              <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('${news.image}')` }}
                              />
                              <div className="absolute top-2.5 right-2.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${news.status === "Published"
                                      ? "bg-emerald-500/90 text-white shadow"
                                      : "bg-amber-500/90 text-slate-950 shadow"
                                    }`}
                                >
                                  ● {news.status}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#0A4D8C] transition-colors">
                                {news.title}
                              </h3>
                              <p className="text-[11px] text-[#EAA500] font-semibold">{news.date}</p>
                              <p className="text-xs text-slate-400 line-clamp-3 pt-1">{news.excerpt}</p>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <Link href={`/news/${news.id}`} target="_blank" className="text-slate-400 hover:text-[#EAA500] underline text-[11px]">
                              View Live
                            </Link>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingNews(news);
                                  setIsDirty(false);
                                }}
                                className="px-3.5 py-1.5 rounded bg-[#0A4D8C] hover:bg-[#083e73] text-white font-bold flex items-center gap-1.5 transition-all shadow"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                                <span>Edit Live &rarr;</span>
                              </button>
                              <button
                                onClick={() => handleDeleteNewsCMS(news.id)}
                                className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* SPLIT TWO-PANEL LIVE EDITOR VIEW FOR NEWS */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">

                    {/* LEFT PANEL: NEWS EDITOR FORM (4 COLS) */}
                    <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">

                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <button
                          onClick={() => setEditingNews(null)}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#EAA500] font-bold"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to News List</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveNews("Draft")}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider"
                          >
                            Save Draft
                          </button>
                          <button
                            onClick={() => handleSaveNews("Published")}
                            className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4 text-[#EAA500]" />
                            <span>Publish Live</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold uppercase tracking-wider text-slate-300">
                              Article Headline Title *
                            </label>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {(editingNews.title || "").length} / 90
                            </span>
                          </div>
                          <input
                            type="text"
                            required
                            value={editingNews.title || ""}
                            onChange={(e) => {
                              setEditingNews({ ...editingNews, title: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-extrabold uppercase text-slate-300 mb-1">Category Badge</label>
                            <input
                              type="text"
                              value={editingNews.category || ""}
                              onChange={(e) => {
                                setEditingNews({ ...editingNews, category: e.target.value });
                                setIsDirty(true);
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                            />
                          </div>
                          <div>
                            <label className="block font-extrabold uppercase text-slate-300 mb-1">Publication Date</label>
                            <input
                              type="text"
                              value={editingNews.date || ""}
                              onChange={(e) => {
                                setEditingNews({ ...editingNews, date: e.target.value });
                                setIsDirty(true);
                              }}
                              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Header Image URL</label>
                          <input
                            type="text"
                            value={editingNews.image || ""}
                            onChange={(e) => {
                              setEditingNews({ ...editingNews, image: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold uppercase tracking-wider text-slate-300">
                              Short Summary Excerpt *
                            </label>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {(editingNews.excerpt || "").length} / 250
                            </span>
                          </div>
                          <textarea
                            rows={2}
                            value={editingNews.excerpt || ""}
                            onChange={(e) => {
                              setEditingNews({ ...editingNews, excerpt: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="font-extrabold uppercase tracking-wider text-slate-300">
                              Full Article Content Body (Paragraphs)
                            </label>
                            <span className="text-[10px] text-slate-400">Separate paragraphs with new lines</span>
                          </div>
                          <textarea
                            rows={6}
                            placeholder="Enter full article text..."
                            value={Array.isArray(editingNews.content) ? editingNews.content.join("\n\n") : (editingNews.content || "")}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const paras = raw.split("\n\n").filter(p => p.trim() !== "");
                              setEditingNews({ ...editingNews, content: paras.length > 0 ? paras : [raw] });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-y"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Media Contact Email</label>
                          <input
                            type="email"
                            value={editingNews.mediaContactEmail || "info@tobgyelglobalxpos.com"}
                            onChange={(e) => {
                              setEditingNews({ ...editingNews, mediaContactEmail: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: FULL ARTICLE LIVE PREVIEW (8 COLS) */}
                    <div className="lg:col-span-8">
                      <AdminLivePreview
                        title="Live Article Page Preview"
                        subtitle="Real-time rendering of full press release article"
                      >
                        <div className="bg-slate-50 text-slate-900 text-left min-h-[500px]">
                          {/* Hero Header */}
                          <div className="bg-[#03142A] text-white p-6 relative overflow-hidden">
                            {editingNews.image && (
                              <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                                style={{ backgroundImage: `url('${editingNews.image}')` }}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#03142A] via-[#03142A]/90 to-transparent" />

                            <div className="relative z-10 space-y-2">
                              <span className="text-[11px] text-[#EAA500] font-bold uppercase tracking-wider">
                                ← Back to All News
                              </span>
                              <h1 className="text-lg sm:text-xl font-black uppercase text-white leading-snug">
                                {editingNews.title || "Article Title Preview"}
                              </h1>
                              <div className="flex items-center gap-3 text-xs text-slate-300 pt-1 border-t border-slate-800">
                                <span>Published: {editingNews.date || new Date().toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{editingNews.category || "Official Press Release"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Body Content */}
                          <div className="p-6 space-y-5">
                            {editingNews.excerpt && (
                              <p className="text-sm font-bold text-[#03142A] leading-relaxed border-l-4 border-[#EAA500] pl-3 bg-white p-3 rounded-r-lg border border-slate-200">
                                {editingNews.excerpt}
                              </p>
                            )}

                            <div className="space-y-3 text-xs text-slate-700 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                              {(Array.isArray(editingNews.content) ? editingNews.content : [editingNews.content || "Article text body preview..."]).map((para, idx) => (
                                <p key={idx}>{para}</p>
                              ))}

                              {/* Media Contact Box */}
                              <div className="mt-4 p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
                                <p className="font-bold text-slate-900">Media &amp; Press Contact</p>
                                <p>Tobgyel Global Expos Press Bureau &bull; Phuentsholing, Bhutan</p>
                                <p>Email: <span className="text-[#0A4D8C] font-semibold underline">{editingNews.mediaContactEmail || "info@tobgyelglobalxpos.com"}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AdminLivePreview>
                    </div>

                  </div>
                )}
              </>
            )}

            {/* PRODUCTS & ADS MODULE */}
            {mainModule === "product-ads" && (
              <>
                {!editingAd ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
                    {productAds.map((ad) => (
                      <div key={ad.id} className="bg-[#03142A] border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between shadow-lg">
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
                              setEditingAd(ad);
                              setIsDirty(false);
                            }}
                            className="px-3.5 py-1.5 rounded bg-[#0A4D8C] hover:bg-[#083e73] text-white font-bold flex items-center gap-1.5 shadow"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#EAA500]" />
                            <span>Edit Live &rarr;</span>
                          </button>

                          <button
                            onClick={() => handleDeleteAdCMS(ad.id)}
                            className="p-2 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* SPLIT TWO-PANEL LIVE EDITOR VIEW FOR PRODUCTS & ADS */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">

                    {/* LEFT PANEL: PRODUCT AD FORM (4 COLS) */}
                    <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <button
                          onClick={() => setEditingAd(null)}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#EAA500] font-bold"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Ads</span>
                        </button>

                        <button
                          onClick={handleSaveAd}
                          className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4 text-[#EAA500]" />
                          <span>Save Product Ad</span>
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Product Title *</label>
                          <input
                            type="text"
                            value={editingAd.title || ""}
                            onChange={(e) => {
                              setEditingAd({ ...editingAd, title: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Exhibitor Company Name *</label>
                          <input
                            type="text"
                            value={editingAd.companyName || ""}
                            onChange={(e) => {
                              setEditingAd({ ...editingAd, companyName: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={editingAd.image || ""}
                            onChange={(e) => {
                              setEditingAd({ ...editingAd, image: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold uppercase text-slate-300 mb-1">Ad Description</label>
                          <textarea
                            rows={3}
                            value={editingAd.description || ""}
                            onChange={(e) => {
                              setEditingAd({ ...editingAd, description: e.target.value });
                              setIsDirty(true);
                            }}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: LIVE PRODUCT AD PREVIEW (8 COLS) */}
                    <div className="lg:col-span-8">
                      <AdminLivePreview
                        title="Live Product Ad Card Preview"
                        subtitle="Updates live as you edit exhibitor ads"
                      >
                        <div className="p-6 bg-white text-slate-900 text-left space-y-4">
                          <div className="relative h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img src={editingAd.image} alt="Ad Cover" className="w-full h-full object-cover" />
                          </div>

                          <div className="space-y-1">
                            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-700 text-[10px] font-bold uppercase">
                              {editingAd.category || "Exhibitor Showcase"}
                            </span>
                            <h3 className="text-lg font-extrabold text-[#03142A]">{editingAd.title || "Product Title"}</h3>
                            <p className="text-xs font-semibold text-slate-500">By {editingAd.companyName || "Exhibitor Enterprise"}</p>
                            <p className="text-xs text-slate-600 leading-relaxed pt-1">{editingAd.description || "Description preview..."}</p>
                          </div>
                        </div>
                      </AdminLivePreview>
                    </div>

                  </div>
                )}
              </>
            )}

            {/* HERO BANNER MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "hero" && heroConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Hero Banner Fields</h3>
                    <button
                      onClick={handleSaveHero}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Hero</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Main White Headline</label>
                      <input
                        type="text"
                        value={heroConfig.headlineMain || ""}
                        onChange={(e) => {
                          setHeroConfig({ ...heroConfig, headlineMain: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Gold Highlight Line 1</label>
                      <input
                        type="text"
                        value={heroConfig.headlineHighlight1 || ""}
                        onChange={(e) => {
                          setHeroConfig({ ...heroConfig, headlineHighlight1: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle Description</label>
                      <textarea
                        rows={3}
                        value={heroConfig.subtitle || ""}
                        onChange={(e) => {
                          setHeroConfig({ ...heroConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Homepage Hero Preview">
                    <Hero />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* CONTACT MODULE WITH LIVE FOOTER PREVIEW */}
            {mainModule === "contact" && contactConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Contact &amp; Footer Info</h3>
                    <button
                      onClick={handleSaveContact}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Footer</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Company Name</label>
                      <input
                        type="text"
                        value={contactConfig.companyName || ""}
                        onChange={(e) => {
                          setContactConfig({ ...contactConfig, companyName: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 uppercase mb-1">Phone Primary</label>
                        <input
                          type="text"
                          value={contactConfig.phonePrimary || ""}
                          onChange={(e) => {
                            setContactConfig({ ...contactConfig, phonePrimary: e.target.value });
                            setIsDirty(true);
                          }}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 uppercase mb-1">General Email</label>
                        <input
                          type="text"
                          value={contactConfig.emailGeneral || ""}
                          onChange={(e) => {
                            setContactConfig({ ...contactConfig, emailGeneral: e.target.value });
                            setIsDirty(true);
                          }}
                          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Footer Preview">
                    <Footer />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* WHY EXHIBIT MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "why-exhibit" && whyExhibitConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Why Exhibit Content</h3>
                    <button
                      onClick={handleSaveWhyExhibit}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Headline</label>
                      <input
                        type="text"
                        value={whyExhibitConfig.title || ""}
                        onChange={(e) => {
                          setWhyExhibitConfig({ ...whyExhibitConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle</label>
                      <textarea
                        rows={3}
                        value={whyExhibitConfig.subtitle || ""}
                        onChange={(e) => {
                          setWhyExhibitConfig({ ...whyExhibitConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">CTA Button Label</label>
                      <input
                        type="text"
                        value={whyExhibitConfig.ctaText || "Learn More"}
                        onChange={(e) => {
                          setWhyExhibitConfig({ ...whyExhibitConfig, ctaText: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Homepage InfoHub & Why Exhibit Preview">
                    <InfoHub whyExhibitConfig={whyExhibitConfig} />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* PARTICIPANTS GUIDE MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "participants" && participantsConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Participants Guide</h3>
                    <button
                      onClick={handleSaveParticipants}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Guide</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Guide Headline</label>
                      <input
                        type="text"
                        value={participantsConfig.title || ""}
                        onChange={(e) => {
                          setParticipantsConfig({ ...participantsConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle</label>
                      <textarea
                        rows={3}
                        value={participantsConfig.subtitle || ""}
                        onChange={(e) => {
                          setParticipantsConfig({ ...participantsConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Participants Guide Component Preview">
                    <InfoHub participantsConfig={participantsConfig} />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* GOVERNMENT REGULATIONS MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "regulations" && regulationsConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Gov Regulations</h3>
                    <button
                      onClick={handleSaveRegulations}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Regulations</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Regulations Title</label>
                      <input
                        type="text"
                        value={regulationsConfig.title || ""}
                        onChange={(e) => {
                          setRegulationsConfig({ ...regulationsConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle</label>
                      <textarea
                        rows={3}
                        value={regulationsConfig.subtitle || ""}
                        onChange={(e) => {
                          setRegulationsConfig({ ...regulationsConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Gov Regulations Component Preview">
                    <InfoHub regulationsConfig={regulationsConfig} />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* PLAN YOUR VISIT MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "visit" && visitConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Plan Your Visit</h3>
                    <button
                      onClick={handleSaveVisit}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Visit Info</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Headline</label>
                      <input
                        type="text"
                        value={visitConfig.title || ""}
                        onChange={(e) => {
                          setVisitConfig({ ...visitConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle</label>
                      <textarea
                        rows={3}
                        value={visitConfig.subtitle || ""}
                        onChange={(e) => {
                          setVisitConfig({ ...visitConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Plan Your Visit Component Preview">
                    <InfoHub visitConfig={visitConfig} />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* PARTNERS & SPONSORS MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "partners" && partnersConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">Partners &amp; Sponsors</h3>
                    <button
                      onClick={handleSavePartners}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Partners</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Partners Headline</label>
                      <input
                        type="text"
                        value={partnersConfig.title || ""}
                        onChange={(e) => {
                          setPartnersConfig({ ...partnersConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={partnersConfig.subtitle || ""}
                        onChange={(e) => {
                          setPartnersConfig({ ...partnersConfig, subtitle: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live Partners & Sponsors Component Preview">
                    <Partners />
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* ABOUT & VISION MODULE WITH LIVE SPLIT PREVIEW */}
            {mainModule === "about" && aboutConfig && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                <div className="lg:col-span-4 bg-[#03142A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase">About &amp; Vision</h3>
                    <button
                      onClick={handleSaveAbout}
                      className="px-4 py-1.5 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white text-xs font-extrabold uppercase tracking-wider shadow flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-[#EAA500]" />
                      <span>Save Vision</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Company Headline</label>
                      <input
                        type="text"
                        value={aboutConfig.title || ""}
                        onChange={(e) => {
                          setAboutConfig({ ...aboutConfig, title: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#EAA500]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 uppercase mb-1">Vision Statement</label>
                      <textarea
                        rows={4}
                        value={aboutConfig.visionStatement || ""}
                        onChange={(e) => {
                          setAboutConfig({ ...aboutConfig, visionStatement: e.target.value });
                          setIsDirty(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#EAA500] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <AdminLivePreview title="Live About & Vision Preview">
                    <div className="p-8 bg-[#03142A] text-white text-left space-y-4 min-h-[480px]">
                      <span className="px-3 py-1 rounded bg-[#EAA500] text-slate-950 text-[10px] font-black uppercase">
                        About Tobgyel Global Expos
                      </span>
                      <h2 className="text-2xl font-black uppercase text-white">
                        {aboutConfig.title || "Bhutan's Premier Trade Event Organizer"}
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed border-l-4 border-[#0A4D8C] pl-4">
                        {aboutConfig.visionStatement || "Connecting Himalayan and South Asian businesses through world-class trade fairs."}
                      </p>
                    </div>
                  </AdminLivePreview>
                </div>
              </div>
            )}

            {/* SUBMISSIONS MODULES (Exhibitors, Sponsors, Visitors) */}
            {(mainModule === "exhibitors" || mainModule === "sponsors" || mainModule === "visitors") && (
              <div className="bg-[#03142A] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#EAA500]"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                    {["All", "Pending", "Approved", "Rejected"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setStatusFilter(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === tab
                            ? "bg-[#0A4D8C] text-white shadow"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-300 font-extrabold uppercase border-b border-slate-800">
                        <th className="py-3 px-4">Entity / Name</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Category / Detail</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {mainModule === "exhibitors" &&
                        filteredExhibitors.map((exh) => (
                          <tr key={exh.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-white">
                              {exh.companyName}
                              <div className="text-[11px] text-slate-400 font-normal">{exh.contactPerson}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              <div>{exh.email}</div>
                              <div className="text-slate-400">{exh.phone}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              <span className="font-semibold text-[#EAA500]">{exh.boothSize}</span>
                              <div className="text-slate-400">{exh.sector}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${exh.status === "Approved"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                    : exh.status === "Pending"
                                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                      : "bg-red-500/20 text-red-300 border border-red-500/40"
                                  }`}
                              >
                                {exh.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleExhibitorStatus(exh.id, "Approved")}
                                  className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-bold text-[10px] uppercase"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleExhibitorStatus(exh.id, "Rejected")}
                                  className="px-2.5 py-1 rounded bg-red-600/20 hover:bg-red-600/40 text-red-300 font-bold text-[10px] uppercase"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleDeleteExhibitor(exh.id)}
                                  className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
