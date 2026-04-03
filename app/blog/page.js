import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import { transformUrls } from "@/lib/getProductData";

export const revalidate = 60; // Revalidate cache every minute

export const metadata = {
  title: "Industrial LED Lighting & Solar Blog | Sudeep Engineers",
  description:
    "Insights, case studies, and industry updates on LED lighting manufacturing, solar street lights, and highmast pole infrastructure in India.",
  keywords: "led lighting blog, solar street light blog, highmast pole lighting, street light manufacturer india, led manufacturing updates",
  alternates: { canonical: "https://sudeepengineers.com/blog" },
  openGraph: {
    title: "Engineering Insights & News | Sudeep Engineers Blog",
    description: "Expert articles on solar energy, sustainable manufacturing, and industrial LED lighting solutions.",
  },
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
    if (data) posts = transformUrls(data);
  } catch (error) {
    console.error("Error fetching blogs from Supabase:", error);
  }

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "Recent Update";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Sudeep Engineers Engineering Insights",
            "url": "https://sudeepengineers.com/blog",
            "description": "Insights, case studies, and industry updates on LED lighting manufacturing and solar infrastructure.",
            "publisher": {
              "@type": "Organization",
              "name": "Sudeep Engineers"
            }
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full text-green-100 fill-current">
              <polygon points="0,100 100,0 100,100" />
           </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <nav className="text-xs text-slate-500 mb-6 flex justify-center gap-2">
            <Link href="/" className="hover:text-green-700 font-medium transition-colors">Home</Link>
            <span className="text-slate-300">/</span><span className="text-slate-800 font-bold">Blog</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-green-700 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">Industry Updates</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">
            Engineering <span className="text-green-700">Insights</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Expert articles, project case studies, and latest trends in solar energy, sustainable manufacturing, and industrial LED lighting infrastructure.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id || i}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-[240px] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                        <svg className="w-16 h-16 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                    </div>
                  )}
                  {post.tag && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-700 shadow-sm">
                      {post.tag}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-t border-slate-100 pt-5 mt-auto uppercase tracking-wider">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="text-green-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read Article <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Check back later</h3>
                <p className="text-slate-500 max-w-sm mx-auto">We are currently preparing new engineering insights and articles. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
