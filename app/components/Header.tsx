"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "EVENTS", href: "/events" },
    { name: "EXHIBIT", href: "/exhibit" },
    { name: "VISIT", href: "/visit" },
    { name: "PARTNERS", href: "/partners" },
    { name: "NEWS", href: "/news" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#03142A] text-white border-b border-slate-900 shadow-lg pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 py-1">
            {/* Official Logo Image */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white border border-[#EAA500]/40 group-hover:border-[#EAA500] transition-colors shadow-sm">
              <img
                src="/logo.jpeg"
                alt="Tobgyel Global Expos Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-widest text-white font-sans uppercase leading-none">
                Tobgyel
              </span>
              <span className="text-[11px] sm:text-sm font-extrabold tracking-[0.2em] text-white uppercase leading-tight mt-0.5">
                Global Expos
              </span>
              <span className="text-[10px] text-[#EAA500] tracking-wider font-semibold leading-tight hidden sm:inline-block">
                Connect • Collaborate • Grow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm font-bold tracking-widest transition-colors py-2 relative ${isActive
                    ? "text-[#EAA500] border-b-2 border-[#EAA500]"
                    : "text-white hover:text-[#EAA500]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Vertical Separator + Search Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="hidden lg:block h-6 w-[1px] bg-slate-700/60 mx-1" />

            <button
              aria-label="Search"
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#EAA500] transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAA500]"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Mobile Burger Button with 44x44px minimum touch area */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAA500] active:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#EAA500]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay & Content */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-black/75 backdrop-blur-sm z-40 lg:hidden flex flex-col justify-between">
          <div className="bg-[#03142A] border-b border-slate-800 px-4 pt-4 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-4 py-2 border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-widest text-[#EAA500]">
              Navigation Menu
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 rounded-lg text-sm font-extrabold tracking-widest transition-colors min-h-[48px] flex items-center ${isActive
                    ? "bg-[#0a2347] text-[#EAA500] border-l-4 border-[#EAA500]"
                    : "text-white hover:bg-slate-800/80 active:bg-slate-800"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
}
