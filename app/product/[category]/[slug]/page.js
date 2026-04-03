import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { Icons } from "@/components/Icons";
import { getProductData } from "@/lib/getProductData";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const products = await getProductData();
  const productsArray = Array.isArray(products) ? products : [];
  const product = productsArray.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!product) return {};

  const title = `${product.name} — ${product.category} | Sudeep Engineers`;
  const description = `${product.description} Manufactured by Sudeep Engineers, Aurangabad. ISO 9001:2015 certified, BIS approved. Request OEM pricing.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://sudeepengineers.com/product/${categorySlug}/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description,
      url: `https://sudeepengineers.com/product/${categorySlug}/${product.slug}`,
      type: "website",
      images: product.images?.length > 0 ? product.images.map(img => ({ url: img, alt: product.name })) : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Sudeep Engineers`,
      description,
      images: product.images?.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { category: categorySlug, slug } = await params;
  
  const products = await getProductData();
  const productsArray = Array.isArray(products) ? products : [];
  
  const product = productsArray.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

  if (!product) {
    notFound();
  }

  const { data: categoryData } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', categorySlug)
    .single();

  const categoryName = categoryData?.name || product.category;

  // Find related products in same category
  const relatedProducts = productsArray
    .filter(p => p.category?.toLowerCase() === product.category?.toLowerCase() && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Product Schema.org */}
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
              name: "Sudeep Engineers",
            },
            manufacturer: {
              "@type": "Organization",
              name: "Sudeep Engineers",
              url: "https://sudeepengineers.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Waluj MIDC",
                addressLocality: "Aurangabad",
                addressRegion: "Maharashtra",
                postalCode: "431136",
                addressCountry: "IN",
              },
            },
            category: product.category,
            offers: {
              "@type": "Offer",
              url: `https://sudeepengineers.com/product/${categorySlug}/${product.slug}`,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Sudeep Engineers",
              },
            },
            additionalProperty: (product.specs || []).map(spec => ({
              "@type": "PropertyValue",
              name: spec.label,
              value: spec.value,
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://sudeepengineers.com/product" },
              { "@type": "ListItem", position: 3, name: categoryName, item: `https://sudeepengineers.com/product/${categorySlug}` },
              { "@type": "ListItem", position: 4, name: product.name, item: `https://sudeepengineers.com/product/${categorySlug}/${product.slug}` },
            ],
          }),
        }}
      />

      {/* Corporate Breadcrumbs Header */}
      <section className="bg-slate-900 border-b-4 border-green-600 pt-28 pb-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          <nav className="text-xs font-bold text-slate-400 flex flex-wrap gap-2 tracking-widest uppercase items-center" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/product/${categorySlug}`} className="hover:text-white transition-colors">
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Col: Imagery */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 p-2 shadow-sm sticky top-28 rounded-lg">
                <ImageGallery images={product.images || []} productName={product.name} />
              </div>
            </div>

            {/* Right Col: Specifications */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="mb-8 border-b-2 border-slate-200 pb-6">
                <div className="inline-block bg-green-50 text-green-700 text-[0.65rem] font-bold px-3 py-1 mb-4 uppercase tracking-widest rounded-full border border-green-200">
                  {product.category}
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Datasheet */}
              <div className="mb-12">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-100 flex items-center justify-center rounded text-green-700">
                    <Icons.Specs className="w-4 h-4" />
                  </span>
                  Technical Specifications
                </h2>
                
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 divide-y divide-slate-200">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="col-span-1 border-r border-slate-200 p-4 font-bold text-slate-700 uppercase tracking-wide text-xs flex items-center">
                          {spec.label}
                        </div>
                        <div className="col-span-2 p-4 text-slate-800 font-medium font-mono text-sm">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="mb-12">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-100 flex items-center justify-center rounded text-green-700">
                    <Icons.Factory className="w-4 h-4" />
                  </span>
                  Ideal Applications
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 text-slate-700 text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documentation Downloads */}
              {(product.models?.length > 0 || (product.catalogs && product.catalogs.length > 0)) && (
                <div className="mb-12 flex flex-col gap-4">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-2 uppercase tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 bg-rose-100 flex items-center justify-center rounded text-rose-700">
                      <Icons.Doc className="w-4 h-4" />
                    </span>
                    Datasheets & Compliance
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.models && product.models.length > 0 ? (
                      product.models.map((model, idx) => (
                        <a
                          key={idx}
                          href={model.tds}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-green-400 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-12 h-12 bg-slate-100 flex items-center justify-center border border-slate-200 font-mono font-bold text-slate-800 text-sm rounded">
                              {model.wattage}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900 uppercase">TDS Sheet</span>
                              <span className="text-[0.65rem] text-slate-500 uppercase tracking-widest font-bold">PDF Format</span>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-green-600 transition-colors">
                            <Icons.Envelope className="w-5 h-5" />
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
                          className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-green-400 transition-colors group col-span-1 sm:col-span-2"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 bg-rose-50 flex items-center justify-center border border-rose-100 text-rose-600 rounded">
                              <Icons.Envelope className="w-4 h-4" /> 
                            </span>
                            <span className="text-sm font-bold text-slate-700 uppercase truncate">
                              Download Complete Technical Brochure
                            </span>
                          </div>
                          <span className="text-xs font-bold text-green-700 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Download →
                          </span>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Action Ribbon */}
              <div className="mt-8 bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-green-500 rounded-lg">
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-extrabold uppercase tracking-tight mb-2">Request OEM Pricing</h3>
                  <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Minimum Order Quantity Applies</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/919922996236?text=Hello%2C%20I%20need%20a%20quotation%20for%20${encodeURIComponent(product.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#20BE5A] transition-colors rounded-lg"
                  >
                    <Icons.WhatsApp className="w-4 h-4" /> WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 sm:flex-none text-center px-6 py-3 bg-green-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors rounded-lg"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 border-t border-slate-200 pt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                More {categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp, i) => (
                  <Link
                    key={i}
                    href={`/product/${categorySlug}/${rp.slug}`}
                    className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-200 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-square bg-slate-50 p-4 flex items-center justify-center">
                      {rp.images?.[0] ? (
                        <img src={rp.images[0]} alt={rp.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="text-slate-300 text-4xl">💡</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-slate-900 group-hover:text-green-700 transition-colors line-clamp-2">{rp.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{rp.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
