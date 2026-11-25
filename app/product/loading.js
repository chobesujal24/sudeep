export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-slate-50" role="status" aria-live="polite">
      <div className="bg-slate-900 border-b-4 border-green-600 px-6 pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest">Product catalog</p>
          <p className="mt-4 text-2xl font-bold text-white">Loading products…</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <div key={item} className="bg-white border border-slate-200 rounded-xl overflow-hidden motion-safe:animate-pulse">
            <div className="h-56 bg-slate-200" />
            <div className="p-6 space-y-4"><div className="h-5 w-2/3 rounded bg-slate-200" /><div className="h-4 w-full rounded bg-slate-100" /><div className="h-4 w-4/5 rounded bg-slate-100" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
