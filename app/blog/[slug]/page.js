import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const params = [];
  try {
    const q = query(collection(db, "blogs"), where("status", "==", "Published"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slug) {
        params.push({ slug: data.slug });
      }
    });
  } catch (error) {
    console.error("Error generating static params for blog:", error);
  }
  return params;
}

async function getPostBySlug(slug) {
  try {
    const q = query(
      collection(db, "blogs"), 
      where("slug", "==", slug), 
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const docData = querySnapshot.docs[0].data();
    return { id: querySnapshot.docs[0].id, ...docData };
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

  // Format date correctly from Firestore Timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const publishDate = formatDate(post.createdAt);

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
            datePublished: post.createdAt ? new Date(post.createdAt.seconds * 1000).toISOString() : "",
            dateModified: post.updatedAt ? new Date(post.updatedAt.seconds * 1000).toISOString() : "",
            image: post.featuredImage ? [post.featuredImage] : [],
            author: { "@type": "Organization", name: "Sudeep Engineers" },
            publisher: { "@type": "Organization", name: "Sudeep Engineers" },
          }),
        }}
      />

      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}
      >
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[#94A3B8] mb-6 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-blue-400 no-underline text-[#94A3B8] shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/blog" className="hover:text-blue-400 no-underline text-[#94A3B8] shrink-0">Blog</Link>
            <span className="shrink-0">/</span>
            <span className="text-[#64748B] truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </nav>
          
          {post.tag && (
             <span className="inline-block bg-blue-500/10 border border-blue-500/15 rounded-full px-3 py-0.5 text-xs text-blue-400 font-semibold mb-4 uppercase tracking-wider">
               {post.tag}
             </span>
          )}
          
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-heading font-extrabold mb-4 leading-tight text-white"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-[#94A3B8] font-medium">
            {publishDate && <span>{publishDate}</span>}
          </div>
        </div>
      </section>

      {/* Featured Image if available */}
      {post.featuredImage && (
         <div className="bg-[#F8FAFC]">
           <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
              <div className="w-full aspect-video md:aspect-[21/9] relative rounded-xl overflow-hidden shadow-lg border border-[#E2E8F0]">
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

      <section className={`py-16 bg-[#F8FAFC] ${!post.featuredImage ? "pt-16" : "pt-12"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="blog-prose animate-on-scroll"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6 animate-on-scroll">
            <Link href="/blog" className="text-[#2563EB] text-sm font-bold no-underline hover:text-[#1D4ED8] flex items-center gap-2">
              ← Back to all articles
            </Link>
            <Link href="/contact"
              className="w-full sm:w-auto text-center px-8 py-3.5 rounded-md bg-[#38BDF8] text-[#0F172A] font-bold hover:opacity-90 transition-all no-underline shadow-sm">
              Contact Us for Your Project →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
