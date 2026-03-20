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

      {/* Page Hero Image */}
      <section className="relative mt-20 overflow-hidden bg-black border-b border-[color:var(--color-border)]">
        <div className="w-full relative">
          <Image
            src="/product-hero-section.png"
            alt={`${category.name} - Sudeep Lights`}
            width={1920}
            height={480}
            className="w-full h-auto brightness-[0.85]"
            priority
          />
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="pt-8 pb-2 bg-[color:var(--color-background)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <nav className="text-xs font-medium text-[color:var(--color-text-muted)] flex gap-2 tracking-wide uppercase">
            <Link href="/" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">Home</Link>
            <span className="text-[color:var(--color-text-muted)]/40">/</span>
            <Link href="/product" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">Product</Link>
            <span className="text-[color:var(--color-text-muted)]/40">/</span>
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
