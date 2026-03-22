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

  return {
    title: `${category.name} | Sudeep Lights`,
    description: category.seo_description || `Explore our high-quality ${category.name} products manufactured in Waluj MIDC, Aurangabad.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;

  // 1. Fetch category details to get the proper name
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (!category) {
    notFound();
  }

  // 2. Fetch all products and filter locally (since they are stored as JSON in settings)
  const allProducts = await getProductData();
  const productsArray = Array.isArray(allProducts) ? allProducts : [];
  
  // Filter products that belong to this category name
  const filteredProducts = productsArray.filter(
    p => p.category?.toLowerCase() === category.name?.toLowerCase()
  );

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
              { "@type": "ListItem", position: 2, name: "Product", item: "https://sudeepengineers.com/product" },
              { "@type": "ListItem", position: 3, name: category.name, item: `https://sudeepengineers.com/product/${categorySlug}` },
            ],
          }),
        }}
      />

      {/* ═══════════════════════════════════════
          Category Page Hero — Premium Image
          ═══════════════════════════════════════ */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden" style={{ background: "#000000" }}>
        {/* Stunning High-Res Hero Image (Alternative Industrial Shot) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/product-hero-section.png"
            alt={`${category.name} - Sudeep Engineers`}
            fill
            className="object-cover"
            priority /* Crucial for LCP */
            unoptimized
          />
        </div>

        {/* Cinematic Dark Overlay */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, #000000 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 mt-16 max-w-4xl mx-auto">
          <span className="inline-block text-[#4ADE80] text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Category
          </span>
          <h1 className="font-heading font-bold text-white mb-6 tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
            {category.name}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {category.seo_description || `Engineered for scale. Explore our line of high-performance ${category.name} solutions.`}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-4 border-b border-[color:var(--color-border)]" style={{ background: "var(--color-background)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="text-xs font-medium text-[color:var(--color-text-muted)] flex gap-2 tracking-[0.1em] uppercase items-center flex-wrap">
            <Link href="/" className="hover:text-[color:var(--color-primary)] transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/product" className="hover:text-[color:var(--color-primary)] transition-colors">Products</Link>
            <span className="opacity-50">/</span>
            <span className="text-[color:var(--color-foreground)]">{category.name}</span>
          </nav>
        </div>
      </section>
      {/* Products Grid */}
      <section className="py-6 md:py-10 bg-[color:var(--color-section)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
           <ProductFilterView 
             products={filteredProducts} 
             dbCatMap={{ [category.name]: category }} 
             basePath={`/product/${categorySlug}`}
           />
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[color:var(--color-section)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #166534, #15803D, #166534)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Custom {category.name} Solutions
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Looking for specific dimensions or power ratings? We manufacture custom solutions tailored to your project.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-full bg-[#FFFFFF] text-[#166534] font-bold hover:opacity-90 hover:shadow-xl transition-all no-underline">
              Request a Custom Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
