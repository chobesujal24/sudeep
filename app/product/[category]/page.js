import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductFilterView from "@/components/ProductFilterView";
import { getProductData } from "@/lib/getProductData";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} — LED & Solar OEM Manufacturer | Sudeep Engineers`;
  const description = category.seo_description || `Explore our high-performance ${category.name} — manufactured in-house at Waluj MIDC, Aurangabad. ISO 9001:2015 certified, BIS approved. Request OEM pricing.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://sudeepengineers.com/product/${categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sudeepengineers.com/product/${categorySlug}`,
      type: "website",
      images: category.image ? [{ url: category.image, alt: category.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Sudeep Engineers`,
      description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (!category) {
    notFound();
  }

  const allProducts = await getProductData();
  const productsArray = Array.isArray(allProducts) ? allProducts : [];
  
  const filteredProducts = productsArray.filter(
    p => p.category?.toLowerCase() === category.name?.toLowerCase()
  );

  // Fetch all categories for sidebar navigation
  const { data: allCategories } = await supabase
    .from('categories')
    .select('id, name, slug, image')
    .order('sequence', { ascending: true });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Structured Data — BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://sudeepengineers.com/product" },
              { "@type": "ListItem", position: 3, name: category.name, item: `https://sudeepengineers.com/product/${categorySlug}` },
            ],
          }),
        }}
      />

      {/* Structured Data — CollectionPage + ItemList for products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category.name} — Sudeep Engineers`,
            description: category.seo_description || `High-performance ${category.name} manufactured in Aurangabad, India.`,
            url: `https://sudeepengineers.com/product/${categorySlug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: filteredProducts.slice(0, 30).map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Product",
                  name: p.name,
                  description: p.description,
                  url: `https://sudeepengineers.com/product/${categorySlug}/${p.slug}`,
                  image: p.images?.[0] || "",
                  brand: { "@type": "Brand", name: "Sudeep Engineers" },
                  manufacturer: {
                    "@type": "Organization",
                    name: "Sudeep Engineers",
                    url: "https://sudeepengineers.com",
                  },
                  offers: {
                    "@type": "Offer",
                    availability: "https://schema.org/InStock",
                    priceCurrency: "INR",
                    url: `https://sudeepengineers.com/product/${categorySlug}/${p.slug}`,
                  },
                },
              })),
            },
          }),
        }}
      />

      {/* FAQ Schema for category if applicable */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What types of ${category.name} does Sudeep Engineers manufacture?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Sudeep Engineers manufactures a comprehensive range of ${category.name} including models suitable for highways, urban roads, industrial areas, and commercial spaces. All products are ISO 9001:2015 certified and BIS approved.`,
                },
              },
              {
                "@type": "Question",
                name: `Are Sudeep Engineers' ${category.name} BIS certified?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes, all our ${category.name} products meet BIS (Bureau of Indian Standards) requirements. We hold valid BIS certificates for our LED lighting product range.`,
                },
              },
              {
                "@type": "Question",
                name: `Can I get custom ${category.name} manufactured?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Absolutely. We offer OEM/ODM manufacturing for custom ${category.name} with specific wattages, dimensions, and photometric requirements. Contact us with your specifications for a quote.`,
                },
              },
            ],
          }),
        }}
      />

      {/* ═══ Category Page Hero ═══ */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/product-hero-section.png"
            alt={`${category.name} - Sudeep Engineers Manufacturing`}
            fill
            className="object-cover opacity-40"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/90" />

        <div className="relative z-10 text-center px-6 pt-28 pb-16 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-bold uppercase tracking-[0.25em] mb-6 rounded-full">
            Product Category
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            {category.name}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {category.seo_description || `Engineered for scale. Explore our line of high-performance ${category.name} solutions.`}
          </p>
          {filteredProducts.length > 0 && (
            <p className="text-white/40 text-sm mt-4 font-medium">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      </section>

      {/* Breadcrumbs — sticky */}
      <section className="bg-white border-b border-slate-200 py-4 px-6 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <nav className="text-xs font-bold text-slate-500 flex gap-2 tracking-widest uppercase items-center" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/product" className="hover:text-green-700 transition-colors">Products</Link>
            <span className="text-slate-300">/</span>
            <span className="text-green-700">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* ═══ Sidebar + Products Grid ═══ */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            
            {/* Sidebar — Other Categories */}
            <aside className="hidden lg:block">
              <div className="sticky top-[140px]">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">All Categories</h3>
                <div className="flex flex-col gap-1">
                  {(allCategories || []).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/product/${cat.slug}`}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        cat.slug === categorySlug
                          ? "bg-green-50 text-green-700 font-semibold border border-green-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {cat.image && (
                        <img src={cat.image} alt="" className="w-6 h-6 object-contain rounded shrink-0" />
                      )}
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Quick CTA */}
                <div className="mt-8 p-4 bg-slate-900 rounded-xl text-center">
                  <p className="text-white text-sm font-bold mb-1">Need Custom Specs?</p>
                  <p className="text-slate-400 text-xs mb-3">OEM solutions available</p>
                  <Link href="/contact" className="block w-full py-2.5 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-green-500 transition-colors">
                    Get Quote
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div>
              <ProductFilterView 
                products={filteredProducts} 
                dbCatMap={{ [category.name]: category }} 
                basePath={`/product/${categorySlug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA Ribbon ═══ */}
      <section className="bg-green-800 py-16" aria-label="Custom manufacturing CTA">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
              Custom {category.name} Solutions
            </h2>
            <p className="text-green-100 text-lg max-w-2xl font-medium">
              Looking for specific wattage, dimensions, or photometric requirements? We manufacture custom solutions tailored to your project.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-800 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors border max-w-max shrink-0">
            Request Engineering Specs →
          </Link>
        </div>
      </section>

      {/* ═══ SEO Content Block ═══ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {category.name} Manufacturer in Aurangabad, India
          </h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            <p>
              Sudeep Engineers is a leading manufacturer of {category.name.toLowerCase()} based in Waluj MIDC, Aurangabad, Maharashtra. 
              Our {category.name.toLowerCase()} are designed and manufactured in-house using premium-grade components, ensuring maximum energy efficiency and durability 
              for demanding industrial and commercial environments.
            </p>
            <p>
              All our {category.name.toLowerCase()} products comply with BIS (Bureau of Indian Standards) requirements and are manufactured under 
              ISO 9001:2015 quality management systems. We serve government bodies, PSUs including BHEL, NTPC, and Indian Railways, 
              as well as private infrastructure companies across India.
            </p>
            <p>
              As a registered GeM (Government e-Marketplace) supplier and MSME enterprise, Sudeep Engineers provides competitive OEM pricing 
              with flexible minimum order quantities. Contact us today for customized {category.name.toLowerCase()} solutions with 
              specific wattage ratings, photometric distributions, and IP protection grades.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
