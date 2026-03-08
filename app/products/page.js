import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Industrial Lighting Products | Sudeep Lights",
  description: "Browse our extensive range of high-performance LED industrial and outdoor lighting solutions. Flame proof, High Mast, Solar, and more.",
};

import fs from "fs/promises";
import path from "path";

export default async function Products() {
  const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.json');
  const fileContent = await fs.readFile(PRODUCT_DATA_PATH, 'utf8');
  const products = JSON.parse(fileContent);
  
  // Group products by category dynamically
  const categories = products.reduce((acc, current) => {
    if (!acc[current.category]) acc[current.category] = [];
    acc[current.category].push(current);
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
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[#475569] mb-6 flex gap-2">
            <Link href="/" className="hover:text-[#38BDF8] no-underline text-[#475569] transition-colors">Home</Link>
            <span>/</span><span className="text-[#1E293B]">Products</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[#1E293B]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Our <span className="text-[#2563EB]">Products</span>
          </h1>
          <p className="text-[#1E293B] opacity-80 text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Premium LED lighting, robust poles, and next-generation solar lighting solutions manufactured in Aurangabad.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div key={i} className={`bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden flex flex-col animate-on-scroll delay-${(i % 5) + 1} group`}>
                {/* Image placeholder */}
                <div className="h-[240px] bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center">
                  {product.images?.[0] ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <Lightbulb className="w-12 h-12 text-[#1E293B] opacity-50" />
                  )}
                  <div className="absolute top-3 right-3 bg-[#2563EB]/10 backdrop-blur-md border border-[#2563EB]/20 text-[#2563EB] text-[0.65rem] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg mb-2 text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#1E293B] opacity-80 text-sm leading-relaxed mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.slice(0, 3).map((spec, j) => (
                      <span
                        key={j}
                        className="bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-3 py-1 text-[0.7rem] text-[#2563EB] font-medium"
                      >
                        {spec.value}
                      </span>
                    ))}
                    {product.specs.length > 3 && (
                      <span className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-2 py-1 text-[0.7rem] text-[#475569] font-medium">
                        +{product.specs.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full block text-center px-4 py-2.5 rounded-md border border-[#E2E8F0] group-hover:border-[#38BDF8]/50 bg-[#F8FAFC] group-hover:bg-[#38BDF8]/10 text-[#1E293B] font-semibold text-sm transition-all no-underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#2563EB] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-on-scroll">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Need Custom Lighting Solutions?
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              We manufacture custom LED lighting and solar solutions tailored to your exact specifications.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline">
              Request Product Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
