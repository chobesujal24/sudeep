export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin/"],
      },
    ],
    sitemap: "https://sudeepengineers.com/sitemap.xml",
  };
}
