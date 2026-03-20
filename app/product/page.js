import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Product Categories | Sudeep Lights",
  description: "Explore our range of industrial lighting categories including LED Street Lights, Flood Lights, Solar Solutions, and more.",
};

export default async function ProductCategories() {
  let categories = [];
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) categories = data;
  } catch (e) {
    console.error("Error fetching categories:", e);
  }

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
            <span>/</span><span className="text-[color:var(--color-foreground)]">Product</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[color:var(--color-foreground)]">
            Our <span className="text-[color:var(--color-primary)]">Product Categories</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] opacity-80 text-lg max-w-[600px]">
            High-performance industrial lighting solutions tailored for infrastructure and industrial projects.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-[color:var(--color-section)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/product/${cat.slug}`} className="group no-underline block">
                <div className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-[240px] overflow-hidden">
                    <Image 
                      src={cat.image || "/placeholder-image.jpg"} 
                      alt={cat.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-[color:var(--color-foreground)] mb-3 group-hover:text-[color:var(--color-primary)] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 mb-6">
                      {cat.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold text-[color:var(--color-primary)] uppercase tracking-wider">
                      Explore Products <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {categories.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[color:var(--color-text-muted)]">No categories found. Please add them in the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-20 bg-[color:var(--color-background)] border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1E40AF] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
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
