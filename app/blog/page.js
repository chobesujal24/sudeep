import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Blog - Engineering & Manufacturing Insights",
  description:
    "Expert articles on engineering fabrication, metal manufacturing, LED lighting, and industrial manufacturing in Aurangabad. Stay informed with Sudeep Engineers blog.",
  alternates: { canonical: "https://sudeepengineers.com/blog" },
};

const blogPosts = [
  {
    slug: "engineering-fabrication-services-aurangabad",
    title: "Engineering Fabrication Services in Aurangabad: A Complete Guide",
    excerpt: "Discover the full range of engineering fabrication services available in Aurangabad and how Waluj MIDC has become a hub for precision manufacturing.",
    date: "March 1, 2025",
    readTime: "8 min read",
    tag: "Fabrication",
  },
  {
    slug: "metal-fabrication-industrial-projects",
    title: "Metal Fabrication for Industrial Projects: What You Need to Know",
    excerpt: "A comprehensive overview of metal fabrication processes, materials, and best practices for industrial projects of all scales.",
    date: "February 20, 2025",
    readTime: "10 min read",
    tag: "Manufacturing",
  },
  {
    slug: "best-led-lighting-industrial-use",
    title: "Choosing the Best LED Lighting for Industrial Use",
    excerpt: "Expert guide to selecting the right LED lighting solutions for factories, warehouses, and industrial facilities. Energy savings and ROI analysis included.",
    date: "February 10, 2025",
    readTime: "9 min read",
    tag: "LED Lighting",
  },
  {
    slug: "benefits-local-manufacturing-waluj-midc",
    title: "Benefits of Local Manufacturing in Waluj MIDC",
    excerpt: "Why choosing a local manufacturer in Waluj MIDC, Aurangabad offers advantages in quality, cost, and delivery for your engineering projects.",
    date: "January 28, 2025",
    readTime: "7 min read",
    tag: "Industry",
  },
  {
    slug: "structural-fabrication-infrastructure",
    title: "Structural Fabrication for Infrastructure Projects",
    excerpt: "How structural metal fabrication supports India's growing infrastructure sector, from bridges to industrial plants.",
    date: "January 15, 2025",
    readTime: "8 min read",
    tag: "Infrastructure",
  },
];

export default function BlogPage() {
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
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">Blog</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Engineering <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Expert articles on fabrication, manufacturing, and LED lighting from our team.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <Link
                href={`/blog/${post.slug}`}
                key={i}
                className={`glass-card overflow-hidden no-underline group animate-on-scroll delay-${(i % 5) + 1}`}
              >
                <div className="h-[200px] bg-gradient-to-br from-[#111827] to-[#0f172a] flex items-center justify-center text-slate-700 opacity-50 group-hover:opacity-70 group-hover:text-slate-600 transition-colors">
                  <FileText className="w-16 h-16" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-500/10 border border-blue-500/15 rounded-full px-3 py-0.5 text-[0.72rem] text-blue-400 font-semibold mb-3">
                    {post.tag}
                  </span>
                  <h3 className="font-heading font-bold text-base mb-2 text-[color:var(--color-foreground)] group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[color:var(--color-text-muted)]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
