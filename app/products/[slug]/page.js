import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { Icons } from "@/components/Icons";

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  
  // Fetch from the API to get the latest CMS-controlled JSON data
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products`, { cache: 'no-store' });
  const products = await res.json();
  
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

      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="text-xs text-[#475569] mb-8 flex gap-2 items-center">
            <Link href="/" className="hover:text-[#38BDF8] no-underline text-[#475569] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#38BDF8] no-underline text-[#475569] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#1E293B] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="w-full">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/25 rounded-full px-3 py-1 text-[0.7rem] font-bold text-[#2563EB] uppercase tracking-widest mb-4 w-fit">
                {product.category}
              </div>

              <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-heading font-extrabold text-[#1E293B] mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-[#1E293B] opacity-80 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                  <Icons.Engineering className="w-5 h-5 text-[#2563EB]" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-4 flex flex-col gap-1"
                    >
                      <span className="text-[0.75rem] text-[#475569] font-semibold uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-[#1E293B] opacity-90 text-sm font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="mb-10">
                <h3 className="text-lg font-heading font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                  <Icons.Factory className="w-5 h-5 text-[#2563EB]" /> Ideal Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-[#2563EB]/5 border border-[#2563EB]/10 text-[#2563EB] text-sm px-3 py-1.5 rounded-md"
                    >
                      ✔ {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-auto pt-8 border-t border-[#E2E8F0] flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex-1 min-w-[200px] text-center px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline shrink-0"
                >
                  Request Detailed Quote
                </Link>
                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 text-center px-8 py-3.5 rounded-md border border-[#25d366] bg-[#25d366]/10 text-[#1E293B] font-bold hover:-translate-y-0.5 hover:bg-[#25d366]/20 transition-all no-underline shrink-0"
                >
                  <Icons.WhatsApp className="w-5 h-5 text-[#25d366]" /> Chat on WhatsApp
                </a>
              </div>

              {/* Specific Models / Technical Documentation */}
              {(product.models?.length > 0 || (product.catalogs && product.catalogs.length > 0)) && (
                <div className="mt-8 pt-8 border-t border-[#E2E8F0]">
                  <h3 className="text-lg font-heading font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                    <Icons.Structure className="w-5 h-5 text-[#2563EB]" /> Available Models & Documentation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.models && product.models.length > 0 ? (
                      product.models.map((model, idx) => (
                        <a
                          key={idx}
                          href={model.tds}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:border-[#38BDF8] hover:shadow-md transition-all text-[#1E293B] no-underline group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-bold rounded-lg text-sm shrink-0">
                              {model.wattage}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-[#1E293B]">TDS Sheet</span>
                              <span className="text-xs text-[#64748B]">PDF Document</span>
                            </div>
                          </div>
                          <span className="text-[#38BDF8] bg-[#38BDF8]/10 p-2 rounded-full group-hover:bg-[#38BDF8] group-hover:text-white transition-colors shrink-0">
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
                          className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#38BDF8] hover:shadow-sm transition-all text-[#1E293B] text-sm font-medium no-underline group col-span-1 sm:col-span-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-2 bg-[#2563EB]/10 text-[#2563EB] rounded-md">
                              <Icons.Envelope className="w-4 h-4" /> 
                            </span>
                            <span className="truncate max-w-[250px] sm:max-w-xs">{catalog.split('/').pop().replace(/%20/g, ' ')}</span>
                          </div>
                          <span className="text-[#38BDF8] group-hover:translate-x-1 transition-transform">→ Download</span>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Location Map */}
              <div className="mt-12 animate-on-scroll">
                <h3 className="text-lg font-heading font-bold text-[#1E293B] mb-4">Visit Our Manufacturing Facility</h3>
                <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] h-[300px]">
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
