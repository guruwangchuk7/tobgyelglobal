"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw, Eye } from "lucide-react";

interface AdminLivePreviewProps {
  title?: string;
  subtitle?: string;
  publicUrl?: string;
  children: React.ReactNode;
}

export default function AdminLivePreview({
  title = "Live Website Preview",
  subtitle = "Renders current unsaved draft state instantly on keypress",
  publicUrl,
  children,
}: AdminLivePreviewProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [key, setKey] = useState(0);

  const getFrameWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      case "desktop":
      default:
        return "max-w-full";
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl sticky top-6">
      {/* Top Preview Control Header Bar */}
      <div className="bg-[#03142A] border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 text-left">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                {title}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Device Switcher & Controls */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                device === "desktop"
                  ? "bg-[#0A4D8C] text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice("tablet")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                device === "tablet"
                  ? "bg-[#0A4D8C] text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">Tablet</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                device === "mobile"
                  ? "bg-[#0A4D8C] text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px]">Mobile</span>
            </button>
          </div>

          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#EAA500] hover:border-slate-700 transition-all flex items-center justify-center text-xs"
              title="Open Live URL in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-y-auto bg-slate-950/80 p-2 sm:p-4 flex justify-center items-start min-h-[550px] max-h-[calc(100vh-100px)]">
        <div
          key={key}
          className={`w-full ${getFrameWidth()} transition-all duration-300 bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800/60 flex flex-col`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
