export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col bg-white animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* Header bar */}
      <div className="h-16 bg-[#03142A] flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700" />
          <div className="h-4 w-32 rounded bg-slate-700" />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="h-3 w-16 rounded bg-slate-700" />
          <div className="h-3 w-16 rounded bg-slate-700" />
          <div className="h-3 w-16 rounded bg-slate-700" />
          <div className="h-3 w-16 rounded bg-slate-700" />
        </div>
        <div className="md:hidden w-8 h-8 rounded bg-slate-700" />
      </div>

      {/* Hero block */}
      <div className="h-64 sm:h-80 bg-slate-200 flex flex-col items-center justify-center gap-4 px-6">
        <div className="h-6 sm:h-8 w-3/4 max-w-lg rounded bg-slate-300" />
        <div className="h-4 w-1/2 max-w-md rounded bg-slate-300" />
        <div className="h-10 w-40 rounded-lg bg-slate-300 mt-2" />
      </div>

      {/* Content: section heading + card grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="h-1 w-12 rounded-full bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-44 bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-1/4 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
