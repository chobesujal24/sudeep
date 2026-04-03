import Link from "next/link";
import Image from "next/image";
import { Sun, Battery, Zap, Shield, MapPin, Award } from "lucide-react";

export const metadata = {
  title: "Solar Street Light Manufacturer in India | All-in-One & Split Type Solar LED",
  description:
    "Leading solar street light manufacturer in India. Sudeep Engineers makes all-in-one solar street lights, integrated solar LED lights, solar highmast & solar poles. MNRE empaneled, BIS certified. Off-grid solar street lighting for highways, villages & smart cities.",
  keywords: "solar street light manufacturer, solar street light manufacturer india, all in one solar street light, integrated solar street light, solar led street light, solar highmast, solar pole manufacturer, off grid solar street light, solar street light price, solar street light for highway, solar street light for village",
  alternates: { canonical: "https://sudeepengineers.com/solar-street-light-manufacturer" },
  openGraph: {
    title: "Solar Street Light Manufacturer — All-in-One & Integrated Solar LED | Sudeep Engineers",
    description: "India's trusted solar street light manufacturer. All-in-one, integrated & split-type solar LED with lithium battery. Off-grid lighting for highways, villages & remote areas.",
  },
};

export default function SolarStreetLightManufacturer() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: "Solar Street Light",
        manufacturer: { "@type": "Organization", name: "Sudeep Engineers", address: { "@type": "PostalAddress", addressLocality: "Aurangabad", addressRegion: "Maharashtra" }},
        description: "All-in-one and split-type solar street lights manufactured in Aurangabad, India. Complete with solar panel, lithium battery, MPPT controller, and LED luminaire.",
        category: "Solar Lighting",
        brand: { "@type": "Brand", name: "Sudeep Engineers" },
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
          { "@type": "ListItem", position: 2, name: "Solar Street Light Manufacturer", item: "https://sudeepengineers.com/solar-street-light-manufacturer" },
        ],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What types of solar street lights does Sudeep Engineers manufacture?", acceptedAnswer: { "@type": "Answer", text: "Sudeep Engineers manufactures all-in-one solar street lights (12W to 120W), integrated solar street lights, split-type solar LED street lights, and solar highmast systems. All products include high-efficiency monocrystalline solar panels, lithium-ion batteries, MPPT charge controllers, and high-lumen LED luminaires." }},
          { "@type": "Question", name: "What is the warranty on solar street lights?", acceptedAnswer: { "@type": "Answer", text: "Our solar street lights come with a comprehensive warranty covering the LED luminaire, solar panel, battery, and charge controller. Standard warranty is 2-5 years depending on the product configuration. Extended warranty options are available for government and large-scale projects." }},
          { "@type": "Question", name: "Can Sudeep Engineers supply solar street lights for government projects?", acceptedAnswer: { "@type": "Answer", text: "Yes. Sudeep Engineers is registered on GeM (Government e-Marketplace) and is qualified for government tenders. We have supplied solar street lights for municipal corporations, smart city projects, and rural electrification programs across India." }},
          { "@type": "Question", name: "What is the cost of solar street light in India?", acceptedAnswer: { "@type": "Answer", text: "Solar street light prices in India range from ₹5,000 to ₹50,000+ depending on wattage, battery capacity, pole height, and configuration. Contact Sudeep Engineers for competitive OEM pricing with bulk order discounts." }},
        ],
      })}} />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-slate-500 mb-6 flex gap-2">
            <Link href="/" className="hover:text-green-700 no-underline text-slate-500">Home</Link>
            <span>/</span><span className="text-slate-800 font-medium">Solar Street Light Manufacturer</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4 text-slate-900">
            Solar Street Light <span className="text-green-700">Manufacturer in India</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-[700px]">
            All-in-one solar street lights, integrated solar LED systems, and solar highmast solutions — engineered and manufactured 
            by Sudeep Engineers in Waluj MIDC, Aurangabad.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            <h2>Premium Solar Street Light Manufacturing in India</h2>
            <p>
              Sudeep Engineers is a trusted <strong>solar street light manufacturer in India</strong>, specializing in high-performance 
              solar-powered outdoor lighting solutions for highways, urban roads, villages, parks, and industrial areas. Our solar street lights 
              are designed for Indian weather conditions — high temperatures, monsoon rains, and dusty environments — ensuring reliable 
              off-grid illumination throughout the year.
            </p>

            <h2>Our Solar Street Light Product Range</h2>

            <h3>All-in-One Solar Street Light (12W — 120W)</h3>
            <p>
              Our <strong>all-in-one solar street light</strong> integrates the solar panel, lithium-ion battery, MPPT charge controller, 
              LED luminaire, and motion sensor into a single compact unit. Easy to install with zero wiring, ideal for 
              <strong>village street lighting</strong>, <strong>rural road illumination</strong>, <strong>park lighting</strong>, and 
              <strong>residential colony lighting</strong>. Available from 12W to 120W with 2-4 days battery backup autonomy.
            </p>

            <h3>Integrated Solar Street Light</h3>
            <p>
              The <strong>integrated solar street light</strong> features a semi-integrated design where the solar panel is mounted 
              separately on top while the battery and LED are housed together. This design allows for larger solar panel capacity 
              and better battery life, suitable for <strong>highway solar street lighting</strong> and <strong>national highway illumination</strong>.
            </p>

            <h3>Split-Type Solar LED Street Light</h3>
            <p>
              Our <strong>split-type solar street light</strong> separates the solar panel, battery box, and LED luminaire for maximum 
              flexibility. Ideal for <strong>municipal solar street lighting</strong> projects where existing poles can be retrofitted 
              with solar lighting, or for areas requiring high wattage (up to 200W) with larger panel arrays.
            </p>

            <h3>Solar Highmast Lighting System</h3>
            <p>
              <strong>Solar highmast systems</strong> combine our robust highmast poles (15m-25m) with high-wattage solar panels and 
              multiple LED fixtures for large area illumination. Perfect for <strong>highway intersections</strong>, 
              <strong>toll plazas</strong>, <strong>bus depots</strong>, and <strong>railway yards</strong> where grid power is unavailable.
            </p>

            <h2>Solar Street Light Components</h2>
            <ul>
              <li><strong>Solar Panel</strong> — High-efficiency monocrystalline panels (50Wp to 400Wp), 25-year lifespan</li>
              <li><strong>Battery</strong> — LiFePO4 lithium-ion batteries (20Ah to 200Ah), 2000+ charge cycles</li>
              <li><strong>Controller</strong> — MPPT charge controller with dusk-to-dawn auto operation and dimming profiles</li>
              <li><strong>LED Luminaire</strong> — High-lumen LED chips (150 lm/W+), IP66 rated, die-cast aluminum housing</li>
              <li><strong>Pole</strong> — Hot-dip galvanized mild steel poles (3m to 8m) with anchor bolts and foundation design</li>
            </ul>

            <h2>Solar Street Light Applications</h2>
            <ul>
              <li>Village road and rural street lighting under PMGY/DDUGJY schemes</li>
              <li>Highway and national highway solar lighting</li>
              <li>Municipal corporation smart city solar projects</li>
              <li>Industrial estate and factory campus lighting</li>
              <li>Garden, park, and landscape solar lighting</li>
              <li>Residential colony and township perimeter lighting</li>
              <li>Border area and defense installation solar lighting</li>
              <li>Railway station and bus depot solar lighting</li>
            </ul>

            <h2>Why Choose Sudeep Engineers for Solar Street Lights?</h2>
            <ul>
              <li><strong>Complete in-house manufacturing</strong> — panel assembly, battery integration, LED luminaire, and pole</li>
              <li><strong>BIS & MNRE compliant</strong> products meeting all government tender specifications</li>
              <li><strong>GeM registered</strong> for easy government procurement</li>
              <li><strong>ISO 9001:2015 certified</strong> quality management system</li>
              <li><strong>Custom configurations</strong> — wattage, battery backup days, pole height, and smart features</li>
              <li><strong>Pan India installation support</strong> with dedicated project management teams</li>
              <li><strong>Competitive OEM pricing</strong> with volume discounts for bulk orders</li>
            </ul>

            <blockquote>
              Looking for a reliable solar street light manufacturer? Sudeep Engineers delivers quality solar lighting solutions 
              from our ISO certified facility in Aurangabad, Maharashtra.
            </blockquote>
          </div>

          <div className="mt-12">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-green-700 text-white font-semibold hover:bg-green-600 transition-all no-underline">
              Get Solar Street Light Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12 text-slate-900">Solar Street Light Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Sun className="w-8 h-8" />, title: "High-Efficiency Solar Panel", desc: "Monocrystalline panels with 20%+ conversion efficiency for maximum energy harvest." },
              { icon: <Battery className="w-8 h-8" />, title: "LiFePO4 Battery", desc: "Lithium iron phosphate batteries with 2000+ cycles and 2-4 day autonomy backup." },
              { icon: <Zap className="w-8 h-8" />, title: "MPPT Controller", desc: "Smart charge controller with dusk-to-dawn operation, dimming, and battery protection." },
              { icon: <Shield className="w-8 h-8" />, title: "IP66 Weatherproof", desc: "Die-cast aluminum housing rated IP66 for rain, dust, and extreme temperature resistance." },
              { icon: <MapPin className="w-8 h-8" />, title: "Pan India Delivery", desc: "Complete installation support across all states. Suitable for all Indian climate zones." },
              { icon: <Award className="w-8 h-8" />, title: "BIS & MNRE Certified", desc: "Products meeting Bureau of Indian Standards and MNRE specifications for government tenders." },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <div className="text-green-600 mb-4 flex justify-center">{f.icon}</div>
                <h3 className="font-bold text-base mb-2 text-slate-900">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
