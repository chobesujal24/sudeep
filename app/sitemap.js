import { supabase } from "@/lib/supabase";
import { getProductData } from "@/lib/getProductData";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://sudeepengineers.com";

  // Static pages
  const mainPages = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/product`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/industries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/certifications`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const seoPages = [
    { url: `${baseUrl}/led-light-manufacturer-aurangabad`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solar-street-light-manufacturer`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/street-light-pole-manufacturer`, changeFrequency: "monthly", priority: 0.8 },
  ];

  let blogPosts = [];
  try {
    const { data, error } = await supabase.from('blogs').select('slug, updated_at, created_at').eq('status', 'Published');
    if (error) throw error;
    blogPosts = (data || []).filter((post) => post.slug).map((post) => ({
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updated_at || post.created_at || undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch published posts", error);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw error;
  }

  // Dynamic category pages
  let categoryPages = [];
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('slug')
      .order('sequence', { ascending: true });
    if (error) throw error;

    if (categories) {
      categoryPages = categories.filter((cat) => cat.slug).map((cat) => ({
        url: `${baseUrl}/product/${cat.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error("Sitemap: Failed to fetch categories", e);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw e;
  }

  // Dynamic product pages
  let productPages = [];
  try {
    const products = await getProductData();
    const productsArray = Array.isArray(products) ? products : [];

    const { data: categories, error } = await supabase
      .from('categories')
      .select('name, slug');
    if (error) throw error;

    const catSlugMap = {};
    if (categories) {
      categories.forEach((c) => {
        catSlugMap[c.name.toLowerCase()] = c.slug;
      });
    }

    productPages = productsArray
      .filter((p) => p.slug && p.category && catSlugMap[p.category.toLowerCase()])
      .map((p) => {
        const catSlug = catSlugMap[p.category.toLowerCase()];
        return {
          url: `${baseUrl}/product/${catSlug}/${p.slug}`,
          changeFrequency: "monthly",
          priority: 0.7,
        };
      });
  } catch (e) {
    console.error("Sitemap: Failed to fetch products", e);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw e;
  }

  // Templated location pages remain accessible, but are not promoted in the sitemap.
  return [...mainPages, ...seoPages, ...blogPosts, ...categoryPages, ...productPages];
}
