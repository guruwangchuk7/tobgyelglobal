"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white text-slate-900 font-sans px-6 space-y-5">
      <h1 className="text-2xl sm:text-3xl font-black text-[#03142A] uppercase tracking-wide">
        Something Went Wrong
      </h1>
      <p className="text-sm text-slate-600 max-w-md">
        An unexpected error occurred. Please try again in a moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#0A4D8C] hover:bg-[#083e73] text-white font-extrabold text-xs uppercase tracking-widest transition-colors shadow-md min-h-[48px]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#03142A] font-extrabold text-xs uppercase tracking-widest transition-colors border border-slate-200 min-h-[48px]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
