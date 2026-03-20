import Link from "next/link";
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
    description: category.seo_description || `Explore our high-quality ${category.name} products. manufactured in Waluj MIDC, Aurangabad.`,
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

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[color:var(--color-background)]">
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-[color:var(--color-accent)] no-underline text-[color:var(--color-text-muted)] transition-colors">Product</Link>
            <span>/</span>
            <span className="text-[color:var(--color-foreground)]">{category.name}</span>
          </nav>
          <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-heading font-extrabold mb-4 text-[color:var(--color-foreground)]">
            {category.name} <span className="text-[color:var(--color-primary)]">Collection</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] opacity-80 text-lg max-w-[750px]">
            {category.description}
          </p>
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
          <div className="bg-[#1E40AF] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Custom {category.name} Solutions
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              Looking for specific dimensions or power ratings? We manufacture custom solutions tailored to your project.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#FFFFFF] text-[#1E40AF] font-bold hover:opacity-90 transition-all no-underline">
              Request a Custom Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
