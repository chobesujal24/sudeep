import { notFound } from "next/navigation";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { Shield, MapPin, Award, Truck, CheckCircle2 } from "lucide-react";
import { SEO_PRODUCTS, SEO_LOCATIONS } from "@/lib/seoConfig";
import { supabase } from "@/lib/supabase";
import { getProductData } from "@/lib/getProductData";

export const revalidate = 86400; // Cache these pages heavily (1 day)

// Helper to get ALL dynamically mapped products + categories + static ones
async function getSEOItems() {
  const items = { ...SEO_PRODUCTS };

  try {
    const { data: categories } = await supabase.from('categories').select('name, slug, description');
    if (categories) {
      categories.forEach(cat => {
        if (!items[cat.slug]) {
          items[cat.slug] = {
             name: cat.name,
             plural: cat.name,
             specs: "Premium OEM Manufacturing & Infrastructure",
             desc: cat.description || `Industrial ${cat.name} solutions for municipal and government applications.`
          };
        }
      });
    }

    const { data: dbData } = await supabase
      .from('settings')
      .select('data')
      .eq('id', 'productData')
      .single();

    if (dbData && dbData.data && Array.isArray(dbData.data.products)) {
       dbData.data.products.forEach(prod => {
          if (!items[prod.slug] && prod.name) {
             items[prod.slug] = {
                name: prod.name,
                plural: `${prod.name}`,
                specs: prod.wattage ? `${prod.wattage} Options, IP66, BIS` : "Custom Specifications Built to Order",
                desc: prod.description || `High-performance ${prod.name} for highway, infrastructure, and smart city projects.`
             };
          }
       });
    }
  } catch (error) {
    console.warn("Failed to fetch dynamic products for SEO:", error);
  }

  return items;
}

// 1. Generate Static Params to pre-build all Database Product x Location pages
export async function generateStaticParams() {
  const params = [];
  const items = await getSEOItems();
  const productSlugs = Object.keys(items);
  
  for (const productSlug of productSlugs) {
    for (const location of SEO_LOCATIONS) {
      params.push({
        product: productSlug,
        location: location.slug
      });
    }
  }
  return params;
}

// 2. Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const items = await getSEOItems();
  const product = items[resolvedParams.product];
  const location = SEO_LOCATIONS.find(l => l.slug === resolvedParams.location);

  if (!product || !location) return {};

  return {
    title: `${product.name} Manufacturer in ${location.name} | Sudeep Engineers`,
    description: `Leading ${product.name.toLowerCase()} manufacturer and supplier serving ${location.name}, ${location.state}. ISO certified, GeM registered OEM for ${product.plural.toLowerCase()}.`,
    keywords: `${product.name} manufacturer ${location.name}, ${product.plural} supplier ${location.name}, ${product.name} wholesale ${location.name}, lighting manufacturer ${location.state}`,
    alternates: { canonical: `https://sudeepengineers.com/manufacturer/${resolvedParams.product}/${resolvedParams.location}` },
    openGraph: {
      title: `${product.name} Manufacturer serving ${location.name}`,
      description: `Get direct OEM pricing on ${product.plural} for industrial and municipal projects in ${location.name}.`,
    }
  };
}

// 3. Page Component
export default async function ProgrammaticManufacturerPage({ params }) {
  const resolvedParams = await params;
  const items = await getSEOItems();
  const product = items[resolvedParams.product];
  const location = SEO_LOCATIONS.find(l => l.slug === resolvedParams.location);

  if (!product || !location) {
    notFound();
  }

  // Generate localized schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // We use LocalBusiness mapped to areaServed instead of pricing
    "name": `Sudeep Engineers - ${product.name} Manufacturer`,
    "description": `OEM Manufacturer of ${product.plural} servicing municipal and industrial clients in ${location.name}, ${location.state}.`,
    "url": `https://sudeepengineers.com/manufacturer/${resolvedParams.product}/${resolvedParams.location}`,
    "telephone": "+91-9922996236",
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "knowsAbout": product.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Waluj MIDC",
      "addressLocality": "Aurangabad",
      "addressRegion": "Maharashtra",
      "postalCode": "431136",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <article className="min-h-screen bg-slate-50 pb-20">
        {/* Dynamic Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full fill-green-900">
                <polygon points="0,100 100,0 100,100" />
             </svg>
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            
            <nav className="text-xs text-slate-500 mb-8 flex justify-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
              <Link href="/" className="hover:text-green-700 font-medium transition-colors shrink-0">Home</Link>
              <span className="shrink-0 text-slate-300">/</span>
              <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">{location.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-green-700" />
              <span className="text-xs font-bold uppercase tracking-widest text-green-700">Serving {location.name}, {location.state}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Trusted <span className="text-green-700">{product.name}</span> Manufacturer & Supplier in {location.name}
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Sudeep Engineers provides ISO & BIS certified <strong>{product.plural.toLowerCase()}</strong> for infrastructure, municipal, and industrial projects across {location.state}. Direct OEM pricing available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-900/20">
                Request a Quote
              </Link>
              <Link href="/product" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-300 hover:border-green-600 text-slate-700 font-bold rounded-lg transition-colors">
                View Full Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Trust Badges */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-800">
              <div className="flex flex-col items-center px-4">
                <Shield className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">ISO 9001:2015</h3>
                <p className="text-xs text-slate-400">Certified Quality</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <Award className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">BIS Approved</h3>
                <p className="text-xs text-slate-400">Tested to Standards</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">GeM Registered</h3>
                <p className="text-xs text-slate-400">Government Tenders</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <Truck className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Pan India</h3>
                <p className="text-xs text-slate-400">Delivery to {location.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details targeted at location */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-6">
              Why Choose Our {product.name}s for Your Project in {location.name}?
            </h2>
            
            <div className="prose prose-lg prose-slate max-w-none text-slate-600">
              <p>
                As a leading OEM manufacturer, Sudeep Engineers specializes in high-performance <strong>{product.plural.toLowerCase()}</strong>. 
                Whether you are executing a smart city project, a highway expansion, or an industrial upgrade in {location.name}, our manufacturing 
                facility is equipped to deliver large-volume orders with stringent quality control.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 mt-0">Product Specifications Overview:</h3>
                <ul className="space-y-2 mb-0">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" /><strong>Product Series:</strong> {product.specs}</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" /><strong>Applications:</strong> {product.desc}</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" /><strong>Servicing Area:</strong> Fast logistics and fulfillment direct to {location.name}, {location.state}.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 shrink-0" /><strong>Customization:</strong> Dedicated design engineering specific to local structural and wind-loading requirements.</li>
                </ul>
              </div>

              <p>
                By sourcing your <strong>{product.plural.toLowerCase()}</strong> directly from our manufacturing plant, contractors and procurement 
                officers in {location.name} bypass middleman markups, ensuring competitive tender pricing and direct technical support.
              </p>
            </div>
          </div>
        </section>

        <CTABanner />

      </article>
    </>
  );
}
