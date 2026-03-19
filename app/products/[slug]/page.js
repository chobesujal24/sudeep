import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { Icons } from "@/components/Icons";

export const dynamic = 'force-dynamic';

import { getProductData } from "@/lib/getProductData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const products = await getProductData();
  const productsArray = Array.isArray(products) ? products : [];
  const product = productsArray.find((p) => p.slug.toLowerCase() === resolvedParams.slug.toLowerCase());

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `https://sudeepengineers.com/products/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://sudeepengineers.com/products/${product.slug}`,
      images: product.images?.length > 0 ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  
  // Fetch from the API to get the latest CMS-controlled JSON data
  const products = await getProductData();
  const productsArray = Array.isArray(products) ? products : [];
  
  const product = productsArray.find((p) => p.slug.toLowerCase() === resolvedParams.slug.toLowerCase());

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
            offers: {
              "@type": "Offer",
              url: `https://sudeepengineers.com/products/${product.slug}`,
              priceCurrency: "INR",
              price: "0",
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
                price: "0",
                valueAddedTaxIncluded: false
              }
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "24"
            }
          }),
        }}
      />

      <section className="pt-32 pb-20 bg-[color:var(--color-section)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-8 flex gap-2 items-center">
            <Link href="/" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[color:var(--color-foreground)] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="w-full">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/25 rounded-full px-3 py-1 text-[0.7rem] font-bold text-[color:var(--color-primary)] uppercase tracking-widest mb-4 w-fit">
                {product.category}
              </div>

              <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-heading font-extrabold text-[color:var(--color-foreground)] mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-[color:var(--color-text-secondary)] opacity-80 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4 flex items-center gap-2">
                  <Icons.Specs className="w-5 h-5 text-[color:var(--color-primary)]" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-xl p-4 flex flex-col gap-1"
                    >
                      <span className="text-[0.75rem] text-[color:var(--color-text-muted)] font-semibold uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-[color:var(--color-foreground)] opacity-90 text-sm font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4 flex items-center gap-2">
                  <Icons.Factory className="w-5 h-5 text-[color:var(--color-primary)]" /> Ideal Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/10 text-[color:var(--color-foreground)] text-sm px-3 py-1.5 rounded-md"
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
                  className="flex-1 min-w-[200px] text-center px-8 py-3.5 rounded-md bg-[color:var(--color-primary)] text-[#FFFFFF] font-bold hover:opacity-90 transition-all no-underline shrink-0"
                >
                  Request Detailed Quote
                </Link>
                <a
                  href={`https://wa.me/919922996236?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 text-center px-8 py-3.5 rounded-md border border-[#25d366] bg-[#25d366]/10 text-[color:var(--color-foreground)] font-bold hover:-translate-y-0.5 hover:bg-[#25d366]/20 transition-all no-underline shrink-0"
                >
                  <Icons.WhatsApp className="w-5 h-5 text-[#25d366]" /> Chat on WhatsApp
                </a>
              </div>

              {/* Specific Models / Technical Documentation */}
              {(product.models?.length > 0 || (product.catalogs && product.catalogs.length > 0)) && (
                <div className="mt-8 pt-8 border-t border-[color:var(--color-border)]">
                  <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4 flex items-center gap-2">
                    <Icons.Doc className="w-5 h-5 text-[color:var(--color-primary)]" /> Available Models & Documentation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.models && product.models.length > 0 ? (
                      product.models.map((model, idx) => (
                        <a
                          key={idx}
                          href={model.tds}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] shadow-sm hover:border-[color:var(--color-accent)] hover:shadow-md transition-all text-[color:var(--color-foreground)] no-underline group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-2.5 bg-[color:var(--color-section)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] font-bold rounded-lg text-sm shrink-0">
                              {model.wattage}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-[color:var(--color-foreground)]">TDS Sheet</span>
                              <span className="text-xs text-[color:var(--color-text-muted)]">PDF Document</span>
                            </div>
                          </div>
                          <span className="text-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 p-2 rounded-full group-hover:bg-[color:var(--color-accent)] group-hover:text-white transition-colors shrink-0">
                            <Icons.Envelope className="w-4 h-4" />
                          </span>
                        </a>
                      ))
                    ) : (
                      product.catalogs.map((catalog, idx) => (
                        <a
                          key={idx}
                          href={catalog}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 rounded-lg bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] hover:shadow-sm transition-all text-[color:var(--color-foreground)] text-sm font-medium no-underline group col-span-1 sm:col-span-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-2 bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] rounded-md">
                              <Icons.Envelope className="w-4 h-4" /> 
                            </span>
                            <span className="truncate max-w-[250px] sm:max-w-xs">{catalog.split('/').pop().replace(/%20/g, ' ')}</span>
                          </div>
                          <span className="text-[color:var(--color-accent)] group-hover:translate-x-1 transition-transform">→ Download</span>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Location Map */}
              <div className="mt-12 animate-on-scroll">
                <h3 className="text-lg font-heading font-bold text-[color:var(--color-foreground)] mb-4">Manufacturing Facility</h3>
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
