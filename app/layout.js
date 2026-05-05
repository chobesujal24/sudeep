import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollAnimations from "@/components/ScrollAnimations";
import Chatbot from "@/components/Chatbot";
import SmoothScroll from "@/components/SmoothScroll";
import AnnouncementBar from "@/components/AnnouncementBar";

export const metadata = {
  metadataBase: new URL("https://sudeepengineers.com"),
  title: {
    default: "Sudeep Engineers — LED Street Light, Flood Light, Solar Light & Pole Manufacturer in India | Aurangabad",
    template: "%s | Sudeep Engineers — LED & Solar Manufacturer India",
  },
  description:
    "India's leading manufacturer of LED street lights, LED flood lights, LED highbay lights, solar street lights, highmast poles, octagonal poles, and solar infrastructure. ISO 9001:2015 certified, BIS approved, GeM registered. Serving BHEL, NTPC, Indian Railways from Waluj MIDC, Aurangabad, Maharashtra.",
  keywords: [
    // Primary product keywords
    "led street light manufacturer",
    "led street light manufacturer india",
    "led street light manufacturer aurangabad",
    "led flood light manufacturer",
    "led flood light manufacturer india",
    "led highbay light manufacturer",
    "led highbay manufacturer india",
    "solar street light manufacturer",
    "solar street light manufacturer india",
    "solar led street light",
    "all in one solar street light",
    "integrated solar street light",
    // Poles & infrastructure
    "octagonal pole manufacturer",
    "octagonal pole manufacturer india",
    "highmast pole manufacturer",
    "highmast lighting pole",
    "street light pole manufacturer",
    "solar pole manufacturer",
    "galvanized street light pole",
    "swaged pole manufacturer",
    "conical pole manufacturer",
    "decorative pole manufacturer",
    "lighting pole manufacturer india",
    // Solar keywords
    "solar highmast manufacturer",
    "solar panel street light",
    "solar infrastructure manufacturer",
    "solar epc company aurangabad",
    "solar lighting system manufacturer",
    "solar power infrastructure",
    "off grid solar street light",
    // LED specific
    "led driver manufacturer",
    "led luminaire manufacturer",
    "led outdoor light manufacturer",
    "industrial led light manufacturer",
    "led warehouse light",
    "led factory light",
    "led area light manufacturer",
    "led post top light manufacturer",
    "post top luminaire manufacturer",
    // Location keywords
    "led light manufacturer aurangabad",
    "led manufacturer waluj midc",
    "led manufacturer maharashtra",
    "lighting company aurangabad",
    "solar company aurangabad",
    "led factory aurangabad",
    // B2B & government
    "oem led lighting manufacturer",
    "gem approved led manufacturer",
    "gem registered lighting company",
    "government led street light supplier",
    "smart city led lighting",
    "municipal street light manufacturer",
    "bis certified led lights",
    "iso certified led manufacturer",
    "msme led lighting company",
    // Application keywords
    "highway led street light",
    "road led street light",
    "stadium flood light manufacturer",
    "warehouse led highbay",
    "parking area led light",
    "garden light manufacturer",
    "landscape lighting manufacturer",
    "pathway led light",
    "security flood light",
    "industrial flood light",
  ],
  authors: [{ name: "Sudeep Engineers", url: "https://sudeepengineers.com" }],
  creator: "Sudeep Engineers",
  publisher: "Sudeep Engineers",
  category: "Industrial Manufacturing",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sudeepengineers.com",
    siteName: "Sudeep Engineers",
    title: "Sudeep Engineers — LED Street Light, Flood Light & Solar Manufacturer India",
    description:
      "ISO 9001:2015 certified manufacturer of LED street lights, flood lights, highbay lights, solar street lights, highmast poles & octagonal poles. Serving BHEL, NTPC, Indian Railways. OEM manufacturer from Aurangabad, Maharashtra.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sudeep Engineers — LED & Solar Pole Manufacturer India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudeep Engineers — LED & Solar Lighting Manufacturer India",
    description:
      "India's trusted LED street light, flood light, highbay & solar street light manufacturer. ISO certified, BIS approved, GeM registered. Octagonal poles, highmast poles.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://sudeepengineers.com" },
  // Add Google Search Console verification code here when available
  // verification: { google: "your-verification-code" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://sudeepengineers.com/#organization",
              name: "Sudeep Engineers",
              legalName: "Sudeep Engineers",
              description:
                "India's leading manufacturer of LED street lights, LED flood lights, LED highbay lights, solar street lights, highmast poles, octagonal poles, conical poles, and complete solar infrastructure. ISO 9001:2015 certified, BIS approved, MSME registered, GeM registered company in Waluj MIDC, Aurangabad, Maharashtra.",
              url: "https://sudeepengineers.com",
              logo: "https://sudeepengineers.com/logo.png",
              image: "https://sudeepengineers.com/logo.png",
              telephone: "+91-9922996236",
              email: "info@sudeepengineers.com",
              foundingDate: "2019",
              numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 200 },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Waluj MIDC",
                addressLocality: "Aurangabad",
                addressRegion: "Maharashtra",
                postalCode: "431136",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "19.8762",
                longitude: "75.3433",
              },
              areaServed: [
                { "@type": "Country", name: "India" },
                { "@type": "AdministrativeArea", name: "Maharashtra" },
              ],
              knowsAbout: [
                "LED Street Lights",
                "LED Flood Lights",
                "LED Highbay Lights",
                "Solar Street Lights",
                "All-in-One Solar Street Lights",
                "LED Highmast Lights",
                "Solar Highmast",
                "Octagonal Poles",
                "Conical Poles",
                "Swaged Poles",
                "Decorative Poles",
                "Street Light Poles",
                "Galvanized Poles",
                "Highmast Poles",
                "LED Post Top Lights",
                "LED Area Lights",
                "LED Drivers",
                "Solar Infrastructure",
                "Solar EPC",
                "OEM LED Manufacturing",
                "Smart City Lighting",
              ],
              hasCredential: [
                { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 9001:2015" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "BIS Certification - LED Street Light" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "BIS Certification - LED Flood Light" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "BIS Certification - LED Highbay" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "BIS Certification - LED Driver" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "MSME/Udyam Registration" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "GeM Registration" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "Trademark Registration" },
              ],
              sameAs: [],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "LED Street Lights",
                    description: "High-performance LED street lights from 20W to 200W for highway, urban road, and residential colony lighting. IP66 rated, BIS certified.",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.9",
                      reviewCount: "142"
                    }
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "LED Flood Lights",
                    description: "Industrial LED flood lights from 50W to 500W for stadium, warehouse, and area lighting. IP65 rated, BIS certified.",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.8",
                      reviewCount: "96"
                    }
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Solar Street Lights",
                    description: "All-in-one and split-type solar street lights for off-grid and remote area lighting. Complete with solar panel, battery, and LED luminaire.",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.7",
                      reviewCount: "115"
                    }
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Octagonal Poles",
                    description: "Hot-dip galvanized octagonal poles from 4m to 12m height for street light mounting. IS 2713 compliant.",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.9",
                      reviewCount: "88"
                    }
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Highmast Poles",
                    description: "Highmast lighting poles from 15m to 35m with raising and lowering mechanism for highway interchanges, airports, and stadiums.",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.8",
                      reviewCount: "54"
                    }
                  },
                },
              ],
            }),
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://sudeepengineers.com/#localbusiness",
              name: "Sudeep Engineers",
              image: "https://sudeepengineers.com/logo.png",
              telephone: "+91-9922996236",
              email: "info@sudeepengineers.com",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Waluj MIDC",
                addressLocality: "Aurangabad",
                addressRegion: "Maharashtra",
                postalCode: "431136",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "19.8762",
                longitude: "75.3433",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
            }),
          }}
        />

        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://sudeepengineers.com/#website",
              name: "Sudeep Engineers",
              url: "https://sudeepengineers.com",
              description: "LED street light, flood light, solar street light & pole manufacturer in India",
              publisher: { "@id": "https://sudeepengineers.com/#organization" },
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <ScrollAnimations />
        <Chatbot />
      </body>
    </html>
  );
}
