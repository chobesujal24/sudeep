import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollAnimations from "@/components/ScrollAnimations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://sudeepengineers.com"),
  title: {
    default: "Sudeep Lights | Premium LED Lighting & Engineering Fabrication in Aurangabad",
    template: "%s | Sudeep Lights",
  },
  description:
    "Leading LED light manufacturer, engineering fabrication, and solar lighting solutions company in Waluj MIDC, Aurangabad. MSME registered. Custom industrial solutions since 2019.",
  keywords: [
    "engineering fabrication aurangabad",
    "metal fabrication waluj midc",
    "industrial fabrication aurangabad",
    "led light manufacturer aurangabad",
    "engineering job work waluj midc",
    "industrial metal fabrication india",
    "msme engineering company aurangabad",
    "custom metal fabrication maharashtra",
  ],
  authors: [{ name: "Sudeep Engineers" }],
  creator: "Sudeep Engineers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sudeepengineers.com",
    siteName: "Sudeep Lights",
    title: "Sudeep Lights | Premium LED Lighting & Engineering Fabrication",
    description:
      "Leading LED light manufacturer & engineering fabrication in Waluj MIDC, Aurangabad, Maharashtra.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sudeep Lights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudeep Engineers | Engineering Fabrication & LED Manufacturing",
    description:
      "Leading engineering fabrication & LED lighting manufacturer in Waluj MIDC, Aurangabad.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://sudeepengineers.com" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://sudeepengineers.com",
              name: "Sudeep Engineers",
              description:
                "Engineering fabrication, structural metal manufacturing and LED lighting company in Waluj MIDC, Aurangabad, Maharashtra.",
              url: "https://sudeepengineers.com",
              telephone: "+91-XXXXXXXXXX",
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
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <ScrollAnimations />
      </body>
    </html>
  );
}
