export default function sitemap() {
  const baseUrl = "https://sudeepengineers.com";

  const mainPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const seoPages = [
    { url: `${baseUrl}/fabrication-aurangabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/metal-fabrication-waluj-midc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/industrial-fabrication-services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/led-light-manufacturer-aurangabad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const blogPosts = [
    "engineering-fabrication-services-aurangabad",
    "metal-fabrication-industrial-projects",
    "best-led-lighting-industrial-use",
    "benefits-local-manufacturing-waluj-midc",
    "structural-fabrication-infrastructure",
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...mainPages, ...seoPages, ...blogPosts];
}
