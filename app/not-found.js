import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}
    >
      <div className="text-center px-6">
        <h1 className="text-[6rem] font-heading font-extrabold text-blue-500/20 mb-0 leading-none">404</h1>
        <h2 className="text-2xl font-heading font-bold mb-4">Page Not Found</h2>
        <p className="text-[color:var(--color-text-secondary)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. It may have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex px-8 py-3.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline"
        >
          Go to Homepage →
        </Link>
      </div>
    </section>
  );
}
