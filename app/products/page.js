import Link from "next/link";
import Image from "next/image";
import ProductFilterView from "@/components/ProductFilterView";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Industrial Lighting Products | Sudeep Lights",
  description: "Browse our extensive range of high-performance LED industrial and outdoor lighting solutions. Flame proof, High Mast, Solar, and more.",
};

import { getProductData } from "@/lib/getProductData";

import { supabase } from "@/lib/supabase";

export default async function Products() {
  const products = await getProductData();
  
  // Group products by category dynamically
  // Defensive check: ensure products is an array
  const productsArray = Array.isArray(products) ? products : [];

  let dbCategories = [];
  try {
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
    if (data) dbCategories = data;
  } catch (e) {
    // Ignore missing table error
  }

  const dbCatMap = {};
  dbCategories.forEach(c => { dbCatMap[c.name] = c; });

  const categories = productsArray.reduce((acc, current) => {
    const catName = current.category || "Uncategorized";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(current);
    return acc;
  }, {});

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
              { "@type": "ListItem", position: 2, name: "Products", item: "https://sudeepengineers.com/products" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[#FFFFFF]">
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <nav className="text-xs text-[#475569] mb-6 flex gap-2">
            <Link href="/" className="hover:text-[#38BDF8] no-underline text-[#475569] transition-colors">Home</Link>
            <span>/</span><span className="text-[#1E293B]">Products</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[#1E293B]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Our <span className="text-[#1E40AF]">Products</span>
          </h1>
          <p className="text-[#1E293B] opacity-80 text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Premium LED lighting, robust poles, and next-generation solar lighting solutions manufactured in Aurangabad.
          </p>
        </div>
      </section>

      {/* Interactive Products Grid */}
      <section className="py-12 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
           <ProductFilterView products={productsArray} dbCatMap={dbCatMap} />
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1E40AF] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Need Custom Lighting Solutions?
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              We manufacture custom LED lighting and solar solutions tailored to your exact specifications.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#FFFFFF] text-[#1E40AF] font-bold hover:opacity-90 transition-all no-underline">
              Request Product Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
