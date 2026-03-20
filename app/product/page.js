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

      {/* Page Hero Image */}
      <section className="relative mt-20 overflow-hidden bg-black border-b border-[color:var(--color-border)]">
        <div className="w-full relative">
          <Image
            src="/product-hero-section.png"
            alt="Sudeep Lights Industrial Lighting"
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
            <span className="text-[color:var(--color-text-muted)]/40">/</span><span className="text-[color:var(--color-foreground)]">Product</span>
          </nav>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-[color:var(--color-section)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          {/* Section heading */}
          <div className="text-center mb-14">
            <span className="inline-block text-[color:var(--color-primary)] text-xs font-bold uppercase tracking-[0.3em] mb-3">Browse Collection</span>
            <h2 className="font-heading font-bold text-[color:var(--color-foreground)] text-[clamp(1.8rem,3.5vw,2.5rem)] mb-4">Product Categories</h2>
            <p className="text-[color:var(--color-text-secondary)] text-base max-w-[500px] mx-auto">High-performance industrial lighting solutions engineered for reliability.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/product/${cat.slug}`} className="group no-underline block">
                <div className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col relative">
                  {/* Accent bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <div className="relative h-[280px] overflow-hidden">
                    <Image 
                      src={cat.image || "/placeholder-image.jpg"} 
                      alt={cat.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-xl font-heading font-bold text-white mb-1 drop-shadow-lg">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 mb-6">
                      {cat.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold text-[color:var(--color-primary)] uppercase tracking-wider group-hover:gap-3 transition-all">
                      Explore Products <span className="transition-transform group-hover:translate-x-1">→</span>
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
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #166534, #15803D, #166534)" }}>
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-heading font-bold text-[#FFFFFF] mb-4 relative z-10">
              Need Custom Lighting Solutions?
            </h2>
            <p className="text-[#FFFFFF]/90 text-[1.05rem] mb-8 max-w-[500px] mx-auto relative z-10">
              We manufacture custom LED lighting and solar solutions tailored to your exact specifications.
            </p>
            <Link href="/contact"
              className="relative z-10 inline-flex px-8 py-3.5 rounded-full bg-[#FFFFFF] text-[#166534] font-bold hover:opacity-90 hover:shadow-xl transition-all no-underline">
              Request Product Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
