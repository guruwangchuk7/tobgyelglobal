"use client";

import { useState } from "react";
import { QrCode, Download, ShieldCheck, Ticket as TicketIcon, Loader2 } from "lucide-react";
import { VisitorSubmission } from "@/app/lib/registrationStore";

interface VisitorTicketPassProps {
  visitor: VisitorSubmission;
  onClose?: () => void;
  showActions?: boolean;
}

export default function VisitorTicketPass({ visitor, onClose, showActions = true }: VisitorTicketPassProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const element = document.getElementById("printable-visitor-pass");
      if (!element) throw new Error("Ticket element not found");

      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      // Capture ticket at 3x resolution with fixed 860px width for pixel-perfect clarity
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        cacheBust: true,
        width: 860,
        height: 390,
      });

      // Create A4 Landscape PDF (297mm x 210mm)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297;
      const pdfHeight = 210;

      // Fit ticket perfectly on A4 page with margins (250mm wide x 113.37mm high)
      const targetWidth = 250;
      const targetHeight = (390 / 860) * targetWidth; // ~113.37mm

      const xPos = (pdfWidth - targetWidth) / 2; // ~23.5mm horizontal margin
      const yPos = (pdfHeight - targetHeight) / 2; // ~48.3mm vertical margin

      pdf.addImage(dataUrl, "PNG", xPos, yPos, targetWidth, targetHeight);
      pdf.save(`Tobgyel_E-Ticket_${visitor.passCode}.pdf`);
    } catch (err) {
      console.error("Direct PDF export failed, attempting PNG fallback download:", err);
      try {
        const { toPng } = await import("html-to-image");
        const element = document.getElementById("printable-visitor-pass");
        if (element) {
          const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3, width: 860, height: 390 });
          const link = document.createElement("a");
          link.download = `Tobgyel_E-Ticket_${visitor.passCode}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (fallbackErr) {
        console.error("PNG fallback failed:", fallbackErr);
        alert("Failed to download ticket file automatically. Please try again.");
      }
    } finally {
      setDownloading(false);
    }
  };

  const formattedProfession = visitor.profession && visitor.profession.trim().length > 0
    ? visitor.profession
    : "Trade Visitor";

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left font-sans">

      {/* Scrollable Container so Mobile Viewers can see full horizontal pass smoothly */}
      <div className="w-full overflow-x-auto pb-4 flex justify-center no-scrollbar">

        {/* Printable E-Ticket Container with Fixed 860px x 390px Landscape Dimensions */}
        <div
          id="printable-visitor-pass"
          style={{ width: "860px", minWidth: "860px", height: "390px", minHeight: "390px" }}
          className="print-area bg-white text-slate-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-slate-300 relative overflow-hidden flex flex-row items-stretch shrink-0"
        >

          {/* Notch Cutouts (Top & Bottom Perforations at 265px tear line) */}
          <div className="absolute left-[265px] -translate-x-1/2 -top-4 w-7 h-7 rounded-full bg-[#020D1B] border border-slate-300 z-30 shadow-inner" />
          <div className="absolute left-[265px] -translate-x-1/2 -bottom-4 w-7 h-7 rounded-full bg-[#020D1B] border border-slate-300 z-30 shadow-inner" />

          {/* Left & Right Outer Notch Cutouts */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#020D1B] border border-slate-300 z-30 shadow-inner" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#020D1B] border border-slate-300 z-30 shadow-inner" />

          {/* ========================================================
              LEFT STUB: TEAR-OFF GATE PASS (265px Width)
             ======================================================== */}
          <div className="w-[265px] min-w-[265px] bg-gradient-to-b from-[#03142A] via-[#071F3D] to-[#03142A] text-white p-5 flex flex-col justify-between items-center text-center relative border-r-2 border-dashed border-slate-500/60 shrink-0 space-y-2">

            {/* Header Tag */}
            <div className="w-full space-y-0.5">
              <div className="inline-flex items-center justify-center gap-1.5 bg-[#EAA500] text-[#03142A] px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-amber-300 w-full shadow-xs">
                <TicketIcon className="w-3 h-3" /> E &bull; T I C K E T &bull; STUB
              </div>
              <span className="text-[9px] font-bold text-slate-300 block uppercase tracking-wider">
                ROYAL KINGDOM OF BHUTAN
              </span>
            </div>

            {/* Event Mini Title */}
            <div className="space-y-0.5">
              <h4 className="text-base font-black uppercase tracking-tight text-white leading-tight">
                TOBGYEL GLOBAL EXPOS
              </h4>
              <p className="text-[10px] text-amber-400 font-bold leading-snug">
                Himalayan Food, Trade &amp; Innovation Expo 2026–2027
              </p>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-2.5 rounded-xl border-2 border-[#EAA500] shadow-md text-center w-fit mx-auto">
              <QrCode className="w-24 h-24 text-[#03142A] mx-auto" />
              <span className="text-[8px] font-mono font-black text-[#03142A] block mt-0.5 tracking-widest uppercase">
                SCAN AT GATE
              </span>
            </div>

            {/* Pass Code Badge & Barcode */}
            <div className="w-full space-y-1.5">
              <div className="bg-slate-900/90 py-1 px-3 rounded-lg border border-slate-700">
                <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider">PASS ID</span>
                <span className="text-xs font-mono font-black text-[#EAA500] tracking-widest block">
                  {visitor.passCode}
                </span>
              </div>

              {/* Gate Barcode */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-center gap-0.5 bg-white p-1 rounded border border-slate-300 shadow-inner">
                  {[...Array(24)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-5 bg-[#03142A] inline-block ${i % 3 === 0 ? "w-1" : i % 5 === 0 ? "w-1.5" : "w-0.5"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Fast-Track Gate Clearance
                </span>
              </div>
            </div>

          </div>

          {/* ========================================================
              RIGHT MAIN TICKET BODY (595px Width)
             ======================================================== */}
          <div className="w-[595px] bg-white text-slate-900 p-5 flex flex-col justify-between space-y-3 relative shrink-0">

            {/* Top Banner Row */}
            <div className="flex items-start justify-between gap-4 border-b-2 border-slate-200 pb-2.5">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-[#03142A] uppercase tracking-tight leading-none font-sans">
                  Tobgyel Global Expos
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  Himalayan Food, Trade &amp; Innovation Expo
                </p>
              </div>

              {/* Date Badge Box */}
              <div className="bg-[#03142A] text-white py-2 px-3 rounded-xl border border-[#EAA500] text-center shrink-0 shadow-md">
                <span className="text-[8px] font-black text-[#EAA500] uppercase tracking-widest block">EVENT DATES</span>
                <span className="text-xs font-black uppercase tracking-wider block text-white">
                  30 DEC 2026 &ndash; 03 JAN 2027
                </span>
              </div>
            </div>

            {/* Ticket Information Grid (2 Columns) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs">

              {/* Delegate Name */}
              <div className="col-span-2 space-y-0.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  REGISTERED VISITOR NAME
                </span>
                <h3 className="text-xl font-black text-[#03142A] uppercase tracking-tight leading-tight">
                  {visitor.fullName}
                </h3>
              </div>

              {/* Ticket Code & Profession */}
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">PASS CODE ID</span>
                <span className="font-mono font-black text-sm text-[#0A4D8C] block">{visitor.passCode}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">CATEGORY / PROFESSION</span>
                <span className="font-extrabold text-slate-800 text-xs block">{formattedProfession}</span>
              </div>

              {/* Email & Phone */}
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">EMAIL ADDRESS</span>
                <span className="font-bold text-slate-800 break-all text-[11px] block">{visitor.email}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">PHONE / CONTACT</span>
                <span className="font-mono font-bold text-slate-800 text-[11px] block">{visitor.phone}</span>
              </div>

              {/* Country & Venue */}
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">COUNTRY OF RESIDENCE</span>
                <span className="font-bold text-slate-800 text-[11px] block">{visitor.country || "Bhutan"}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">VENUE LOCATION</span>
                <span className="font-bold text-slate-800 text-[11px] block">Samtse International Ground, Bhutan</span>
              </div>

            </div>

            {/* Bottom Barcode & Official Footer */}
            <div className="border-t-2 border-slate-200 pt-2.5 flex items-center justify-between gap-4">

              {/* Long Horizontal Barcode */}
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between gap-0.5 bg-slate-100 p-1.5 rounded-lg border border-slate-300">
                  {[...Array(44)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-6 bg-[#03142A] inline-block ${i % 5 === 0 ? "w-1.5" : i % 3 === 0 ? "w-1" : "w-0.5 opacity-90"
                        }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[8px] text-slate-500 font-extrabold tracking-wider uppercase px-1">
                  <span>GATE TURNSTILE SCANNER</span>
                  <span>NON-TRANSFERABLE</span>
                </div>
              </div>

              {/* Official Branding Footer */}
              <div className="text-right space-y-0.5 shrink-0">
                <div className="flex items-center justify-end gap-1 text-xs font-black text-[#03142A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008E48]" />
                  <span>Tobgyel Global Expos</span>
                </div>
                <p className="text-[9px] font-bold text-slate-500">
                  www.tobgyelglobalexpos.com
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="no-print flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#EAA500] via-[#f5bd38] to-[#EAA500] hover:brightness-105 text-[#03142A] font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl flex items-center gap-2.5 cursor-pointer active:scale-95 min-h-[48px] border border-amber-300 disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                <span>Generating Ticket PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Download E-Ticket (PDF)</span>
              </>
            )}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[48px] border border-slate-700"
            >
              Close Ticket View
            </button>
          )}
        </div>
      )}

      {/* Print CSS */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-visitor-pass, #printable-visitor-pass * {
            visibility: visible !important;
          }
          #printable-visitor-pass {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 860px !important;
            min-width: 860px !important;
            height: 390px !important;
            min-height: 390px !important;
            box-shadow: none !important;
            border: 2px solid #03142A !important;
            background-color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
