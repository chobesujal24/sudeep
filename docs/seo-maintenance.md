# SEO maintenance notes — 25 November 2026

## Report observations

The supplied Search Console exports are daily charts, not issue or URL exports. Coverage fell from 663 indexed URLs on 28 August to 145 on 16 November (the last coverage row). Product snippets rose to 66 invalid items on 24 November; the chart does not identify the errors or URLs. The HTTPS chart reports zero non-HTTPS URLs throughout, not evidence that every possible URL has been checked. Daily search numbers are small and fluctuate; these charts alone cannot establish the cause of the decline.

## Changes and trade-offs

- The sitemap now lists core pages, published blogs and catalog URLs, without claiming pages changed on every regeneration. Templated product-by-location pages remain available and indexable, but are no longer promoted in the sitemap. Review them individually for genuinely useful local information before promoting them again. Sitemap removal alone does not deindex pages.
- Removed Product/Offer markup from catalog and generic manufacturer pages because no verified price, review or availability is provided. This avoids publishing unsupported stock and incomplete offers, but these pages will **not** be eligible for product rich results until accurate, visible qualifying product data is available and marked up. Other causes of Search Console errors may remain.
- The homepage canonical is explicit rather than inherited by routes without their own canonical. Removed the global one-item breadcrumb, duplicate local-business markup on location templates, and nested generic product offers. Removed FAQ markup where the questions and answers were not visible on the page.
- Robots now permits crawling Next.js assets, which are needed for rendering. The admin path remains disallowed; robots.txt is not access control.

## After deployment

1. Export Search Console's **Page indexing reasons and example URLs**, **Product snippets issue details and examples**, and search performance **queries and pages**. Compare affected URLs and dates before deciding whether to redirect, improve, consolidate or noindex pages. Do not assume the sitemap change resolves the decline.
2. Check the deployed sitemap and robots.txt, and inspect representative catalog, blog, and manufacturer URLs with URL Inspection. Submit the sitemap and request validation only after checking actual affected URLs. Check redirects and canonical host/HTTPS behavior at the hosting layer.
3. If actual prices or reviews are published on individual product pages, add corresponding accurate Product structured data and test with Google's Rich Results Test. Never fabricate prices, availability, ratings or reviews.
4. Verify business address, opening hours, certifications, customer claims and specifications against current records; the existing content contains assertions that cannot be verified from these charts. Review thin location pages and prioritize unique, useful content and internal links over city-keyword variations.
5. Monitor indexing, clicks, impressions and query-level performance over several weeks, alongside Core Web Vitals and server errors. Search engines decide indexing and rich-result display; neither is guaranteed.

Production catalog and blog checks require configured Supabase environment variables and access to the live backend. A local build without them uses placeholder settings and cannot verify production content.
