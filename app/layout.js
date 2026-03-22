import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollAnimations from "@/components/ScrollAnimations";
import Chatbot from "@/components/Chatbot";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  metadataBase: new URL("https://sudeepengineers.com"),
  title: {
    default: "Sudeep Engineers | LED Lighting & Solar Solutions Aurangabad",
    template: "%s | Sudeep Engineers",
  },
  description:
    "Leading LED manufacturer & Solar Infrastructure provider in Waluj MIDC, Aurangabad. MSME registered company delivering custom industrial energy solutions since 2019.",
  keywords: [
    "led light manufacturer aurangabad",
    "solar street lights maharashtra",
    "industrial led lighting india",
    "commercial solar solutions",
    "waluj midc led manufacturing",
    "solar infrastructure aurangabad",
    "msme lighting company maharashtra",
    "custom energy solutions india",
  ],
  authors: [{ name: "Sudeep Engineers" }],
  creator: "Sudeep Engineers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sudeepengineers.com",
    siteName: "Sudeep Lights",
    title: "Sudeep Lights | Premium LED Lighting & Solar Infrastructure",
    description:
      "Leading LED manufacturer & solar energy provider in Waluj MIDC, Aurangabad, Maharashtra.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sudeep Lights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudeep Engineers | Solar & LED Manufacturing",
    description:
      "Leading solar infrastructure & LED lighting manufacturer in Aurangabad.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://sudeepengineers.com" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://sudeepengineers.com",
              name: "Sudeep Engineers",
              description:
                "Premium LED lighting and solar power infrastructure company in Waluj MIDC, Aurangabad, Maharashtra.",
              url: "https://sudeepengineers.com",
              logo: "https://sudeepengineers.com/logo.png",
              image: "https://sudeepengineers.com/logo.png",
              telephone: "+91-9922996236",
              email: "info@sudeepengineers.com",
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
              foundingDate: "2019",
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [],
              areaServed: {
                "@type": "Place",
                name: "Aurangabad, Maharashtra, India",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
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
