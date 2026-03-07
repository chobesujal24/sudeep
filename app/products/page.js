import Link from "next/link";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import { products } from "@/lib/productData";

export const metadata = {
  title: "Products - LED Lights, Solar Solutions & Poles | Sudeep Lights",
  description:
    "High-quality LED street lights, flood lights, solar high masts, and customized poles manufactured by Sudeep Lights, Aurangabad.",
  alternates: { canonical: "https://sudeepengineers.com/products" },
  openGraph: {
    title: "Products | Premium Lighting & Solar Solutions | Sudeep Lights",
    description: "Premium LED lighting & solar solutions from Waluj MIDC, Aurangabad.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://sudeepengineers.com/products" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}
      >
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-sky-400 no-underline text-[color:var(--color-text-muted)] transition-colors">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Products</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Premium LED lighting, robust poles, and next-generation solar lighting solutions manufactured in Aurangabad.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div key={i} className={`glass-card overflow-hidden flex flex-col animate-on-scroll delay-${(i % 5) + 1} group`}>
                {/* Image placeholder */}
                <div className="h-[240px] bg-gradient-to-br from-[#111827] to-[#0f172a] relative overflow-hidden flex items-center justify-center">
                  {product.images?.[0] ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <Lightbulb className="w-12 h-12 text-slate-700 opacity-50" />
                  )}
                  <div className="absolute top-3 right-3 bg-sky-500/20 backdrop-blur-md border border-sky-500/30 text-sky-400 text-[0.65rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.slice(0, 3).map((spec, j) => (
                      <span
                        key={j}
                        className="bg-sky-500/10 border border-sky-500/20 rounded-full px-3 py-1 text-[0.7rem] text-sky-300 font-medium"
                      >
                        {spec.value}
                      </span>
                    ))}
                    {product.specs.length > 3 && (
                      <span className="bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] rounded-full px-2 py-1 text-[0.7rem] text-[color:var(--color-text-secondary)] font-medium">
                        +{product.specs.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full block text-center px-4 py-2.5 rounded-md border border-[color:var(--color-border)] group-hover:border-sky-500/50 bg-[color:var(--color-bg-secondary)] group-hover:bg-sky-500/10 text-[color:var(--color-foreground)] font-semibold text-sm transition-all no-underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-sky-600 to-sky-400 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <div className="absolute -top-1/2 -right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[color:var(--color-foreground)] mb-4 relative z-10">
              Need Custom Lighting Solutions?
            </h2>
            <p className="text-[color:var(--color-foreground)]/85 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              We manufacture custom LED lighting and solar solutions tailored to your exact specifications.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-white text-sky-600 font-semibold hover:-translate-y-0.5 hover:bg-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all no-underline">
              Request Product Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
