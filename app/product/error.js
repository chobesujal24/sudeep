"use client";

export default function ProductError({ reset }) {
  return (
    <div role="alert" className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Products are temporarily unavailable</h1>
      <p className="text-slate-600">Please try again in a moment, or contact us for assistance.</p>
      <button onClick={reset} className="rounded bg-green-700 px-5 py-3 font-semibold text-white">Try again</button>
    </div>
  );
}
