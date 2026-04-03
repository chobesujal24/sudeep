import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { transformUrls } from "@/lib/getProductData";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const params = [];
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('slug')
      .eq('status', 'Published');
      
    if (data) {
      data.forEach((post) => {
        if (post.slug) {
          params.push({ slug: post.slug });
        }
      });
    }
  } catch (error) {
    console.error("Error generating static params for blog:", error);
  }
  return params;
}

async function getPostBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();
      
    if (error || !data) {
      return null;
    }
    
    return transformUrls(data);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post || post.status !== "Published") return {};
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `https://sudeepengineers.com/blog/${resolvedParams.slug}` },
    openGraph: { 
      title: post.metaTitle || post.title, 
      description: post.metaDescription || post.excerpt, 
      type: "article",
      images: post.featuredImage ? [post.featuredImage] : []
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post || post.status !== "Published") {
    notFound();
  }

  // Format date correctly from Supabase ISO string
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const publishDate = formatDate(post.created_at);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            datePublished: post.created_at ? new Date(post.created_at).toISOString() : "",
            dateModified: post.updated_at ? new Date(post.updated_at).toISOString() : "",
            image: post.featuredImage ? [post.featuredImage] : [],
            author: { "@type": "Organization", name: "Sudeep Engineers" },
            publisher: { "@type": "Organization", name: "Sudeep Engineers" },
          }),
        }}
      />

      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full text-green-100 fill-current">
              <polygon points="0,100 100,0 100,100" />
           </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <nav className="text-xs text-slate-500 mb-8 flex justify-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-green-700 font-medium transition-colors shrink-0">Home</Link>
            <span className="shrink-0 text-slate-300">/</span>
            <Link href="/blog" className="hover:text-green-700 font-medium transition-colors shrink-0">Blog</Link>
            <span className="shrink-0 text-slate-300">/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </nav>
          
          {post.tag && (
             <span className="inline-block bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-700 shadow-sm mb-6">
               {post.tag}
             </span>
          )}
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight leading-[1.15]">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500 font-bold uppercase tracking-wider">
            {publishDate && <span>{publishDate}</span>}
          </div>
        </div>
      </section>

      {/* Featured Image if available */}
      {post.featuredImage && (
         <div className="bg-white">
           <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
              <div className="w-full aspect-video md:aspect-[21/9] relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                 <Image 
                   src={post.featuredImage} 
                   alt={post.title} 
                   fill
                   priority
                   className="object-cover" 
                 />
              </div>
           </div>
         </div>
      )}

      <section className={`py-16 md:py-24 bg-white ${!post.featuredImage ? "pt-16" : "pt-16"}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-green-700 hover:prose-a:text-green-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/blog" className="text-slate-500 text-sm font-bold no-underline hover:text-green-700 flex items-center gap-2 group transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to all articles
            </Link>
            <Link href="/contact"
              className="w-full sm:w-auto text-center px-8 py-3.5 rounded-lg bg-green-700 text-white font-bold hover:bg-green-600 transition-colors shadow-sm">
              Contact Us for Your Project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
