import { supabase } from "@/lib/supabase";
import { getProductData } from "@/lib/getProductData";
import { SEO_PRODUCTS, SEO_LOCATIONS } from "@/lib/seoConfig";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://sudeepengineers.com";

  // Static pages
  const mainPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/product`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const seoPages = [
    { url: `${baseUrl}/led-light-manufacturer-aurangabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solar-street-light-manufacturer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/street-light-pole-manufacturer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
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
  let fetchedCategories = null;
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('slug, updated_at')
      .order('sequence', { ascending: true });
    if (error) throw error;
    fetchedCategories = categories;

    if (categories) {
      categoryPages = categories.map((cat) => ({
        url: `${baseUrl}/product/${cat.slug}`,
        lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
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
  let fetchedProductsArray = [];
  try {
    const products = await getProductData();
    const productsArray = Array.isArray(products) ? products : [];
    fetchedProductsArray = productsArray;

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
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        };
      });
  } catch (e) {
    console.error("Sitemap: Failed to fetch products", e);
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) throw e;
  }

  // Programmatic SEO Manufacturer Location Pages
  const locationPages = [];
  
  // Combine hardcoded products with dynamically fetched ones from DB
  const dynamicCategories = typeof fetchedCategories !== 'undefined' && fetchedCategories ? fetchedCategories.map(c => c.slug) : [];
  const dynamicProducts = typeof fetchedProductsArray !== 'undefined' && fetchedProductsArray ? fetchedProductsArray.map(p => p.slug) : [];
  
  const allProductSlugs = new Set([
    ...Object.keys(SEO_PRODUCTS),
    ...dynamicCategories,
    ...dynamicProducts
  ]);

  for (const productSlug of allProductSlugs) {
    if (!productSlug) continue;
    for (const location of SEO_LOCATIONS) {
      locationPages.push({
        url: `${baseUrl}/manufacturer/${productSlug}/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9, // High priority for local SEO
      });
    }
  }

  return [...mainPages, ...seoPages, ...blogPosts, ...categoryPages, ...productPages, ...locationPages];
}
