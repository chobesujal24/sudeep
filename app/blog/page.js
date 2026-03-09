import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Blog - Engineering & Manufacturing Insights",
  description:
    "Expert articles on engineering fabrication, metal manufacturing, LED lighting, and industrial manufacturing in Aurangabad. Stay informed with Sudeep Engineers blog.",
  alternates: { canonical: "https://sudeepengineers.com/blog" },
  revalidate: 60 // Revalidate cache every minute or as needed
};

// Next.js page component
export default async function BlogPage() {
  // Fetch posts from Supabase Server-Side
  let posts = [];

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (data) posts = data;
  } catch (error) {
    console.error("Error fetching blogs from Supabase:", error);
  }

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "Recent Update";
    const date = new Date(timestamp); // Supabase 'created_at' is typically an ISO string
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

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
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://sudeepengineers.com/blog" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}
      >
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[#94A3B8] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[#94A3B8]">Home</Link>
            <span>/</span><span className="text-[#64748B]">Blog</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Engineering <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-[#94A3B8] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Expert articles on fabrication, manufacturing, and LED lighting from our team.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id || i}
                className={`bg-white border border-[#E2E8F0] rounded-xl overflow-hidden no-underline group shadow-sm hover:shadow-md transition-shadow animate-on-scroll delay-${(i % 5) + 1}`}
              >
                <div className="h-[200px] bg-gradient-to-br from-[#1E293B] to-[#0F172A] relative overflow-hidden flex items-center justify-center text-slate-700">
                  {post.featuredImage ? (
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title} 
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                  ) : (
                    <svg className="w-16 h-16 opacity-30 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  )}
                </div>
                <div className="p-6">
                  {post.tag && (
                    <span className="inline-block bg-blue-500/10 border border-blue-500/15 rounded-full px-3 py-0.5 text-[0.72rem] text-[#2563EB] font-bold uppercase tracking-wider mb-3">
                      {post.tag}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-lg mb-2 text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-medium border-t border-[#F1F5F9] pt-4 mt-auto">
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {posts.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-[#CBD5E1] rounded-2xl bg-white">
                 <svg className="w-12 h-12 mx-auto text-[#94A3B8] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 <h3 className="text-xl font-bold text-[#1E293B]">Check back later</h3>
                 <p className="text-[#64748B]">We are currently preparing new insights and articles. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
