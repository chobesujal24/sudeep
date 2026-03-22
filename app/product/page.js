import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Product Categories | Sudeep Engineers",
  description: "Explore our technical catalog of industrial LED lighting, including Street Lights, Flood Lights, High Masts, and Solar Solutions.",
};

export default async function ProductCategories() {
  let categories = [];
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sequence', { ascending: true })
      .order('created_at', { ascending: true });
    if (data) categories = data;
  } catch (e) {
    console.error("Error fetching categories:", e);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://sudeepengineers.com/product" },
            ],
          }),
        }}
      />

      {/* ═══════════════════════════════════════
          B2B Catalog Header
          ═══════════════════════════════════════ */}
      <section className="relative bg-slate-900 border-b-4 border-emerald-600 pt-32 pb-24 px-6 overflow-hidden">
        {/* Abstract Technical Background lines */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ background: "linear-gradient(90deg, transparent 99px, #ffffff 1px) 0 0 / 100px 100px" }} />
        
        <div className="relative z-10 max-w-[1400px] mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Official Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
              Industrial LED & Solar Infrastructure
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
              High-performance luminaires engineered for complete reliability in the most demanding commercial and municipal environments.
            </p>
          </div>
          <div className="hidden lg:block w-[400px] h-[250px] relative border border-slate-700 bg-slate-800 p-2">
            <div className="relative w-full h-full">
              <Image
                src="/product-hero-section.png"
                alt="Sudeep Engineers Industrial Lighting Catalog"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-white border-b border-slate-200 py-4 px-6 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <nav className="text-xs font-bold text-slate-500 flex gap-2 tracking-widest uppercase items-center">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-700">Products Range</span>
          </nav>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/product/${cat.slug}`} className="group block h-full bg-white border border-slate-200 hover:border-emerald-600 transition-colors shadow-sm hover:shadow-xl">
                <div className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative h-[280px] w-full border-b border-slate-100 p-6 flex items-center justify-center bg-white overflow-hidden">
                    <Image 
                      src={cat.image || "/placeholder-image.jpg"} 
                      alt={cat.name} 
                      fill 
                      className="object-contain p-6" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Category Details */}
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors uppercase tracking-wide">
                      {cat.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-8 border-l-2 border-emerald-100 pl-4">
                      {cat.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        View Models
                      </span>
                      <span className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-32 bg-white border border-slate-200">
              <p className="text-slate-500 tracking-widest uppercase text-sm font-bold">No categories found in catalog.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====== CTA Ribbon ====== */}
      <section className="bg-emerald-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
              Looking for Custom Manufacturing?
            </h2>
            <p className="text-emerald-100 text-lg max-w-2xl font-medium">
              Our Walk-in facility provides tailored specifications, custom wattage, and precision photometric calibration.
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-800 font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors border max-w-max shrink-0">
            Request Engineering Specs ➔
          </Link>
        </div>
      </section>
    </div>
  );
}
