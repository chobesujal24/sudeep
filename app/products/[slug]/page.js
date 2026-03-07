import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { products } from "@/lib/productData";
import { Icons } from "@/components/Icons";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return { title: "Product Not Found | Sudeep Lights" };

  return {
    title: `${product.name} - ${product.category} | Sudeep Lights`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "Sudeep Lights",
            },
          }),
        }}
      />

      <section className="pt-32 pb-20 bg-[color:var(--color-bg-secondary)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-8 flex gap-2 items-center">
            <Link href="/" className="hover:text-sky-400 no-underline text-[color:var(--color-text-muted)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sky-400 no-underline text-[color:var(--color-text-muted)] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[color:var(--color-text-secondary)]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="w-full">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/25 rounded-full px-3 py-1 text-[0.7rem] font-bold text-sky-400 uppercase tracking-widest mb-4 w-fit">
                {product.category}
              </div>

              <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-heading font-extrabold text-[color:var(--color-foreground)] mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-[color:var(--color-text-secondary)] text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4 flex items-center gap-2">
                  <Icons.Engineering className="w-5 h-5 text-sky-400" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border)] rounded-xl p-4 flex flex-col gap-1"
                    >
                      <span className="text-[0.75rem] text-[color:var(--color-text-muted)] font-semibold uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-[color:var(--color-text-secondary)] text-sm font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4 flex items-center gap-2">
                  <Icons.Factory className="w-5 h-5 text-sky-400" /> Ideal Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-sky-500/5 border border-sky-500/10 text-sky-300 text-sm px-3 py-1.5 rounded-md"
                    >
                      ✔ {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-auto pt-8 border-t border-[color:var(--color-border)] flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex-1 min-w-[200px] text-center px-8 py-3.5 rounded-md bg-gradient-to-r from-sky-600 to-sky-400 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(14,165,233,0.2)] transition-all no-underline"
                >
                  Request Detailed Quote
                </Link>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 text-center px-8 py-3.5 rounded-md border border-[#25d366]/50 bg-[#25d366]/10 text-[#25d366] font-semibold hover:-translate-y-0.5 hover:bg-[#25d366]/20 transition-all no-underline"
                >
                  <Icons.WhatsApp className="w-5 h-5" /> Chat on WhatsApp
                </a>
              </div>

              {/* Location Map */}
              <div className="mt-12 animate-on-scroll">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4">Visit Our Manufacturing Facility</h3>
                <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7!2d75.34!3d19.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzEyLjAiTiA3NcKwMjAnMzUuOSJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Sudeep Engineers - Waluj MIDC, Aurangabad"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
