import Link from "next/link";
import { Waypoints, Lightbulb, Sparkles } from "lucide-react";

export const metadata = {
  title: "LED Light Manufacturer in Aurangabad | Street Lights & Flood Lights",
  description:
    "Top LED light manufacturer in Aurangabad. Sudeep Engineers makes LED street lights, flood lights & pixel LED lighting. Energy-efficient, durable industrial LED solutions.",
  keywords: "led light manufacturer aurangabad, led street light aurangabad, led flood light manufacturer, industrial led lighting aurangabad, led manufacturer waluj midc",
  alternates: { canonical: "https://sudeepengineers.com/led-light-manufacturer-aurangabad" },
};

export default function LEDManufacturerAurangabad() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: "LED Lighting Products",
        manufacturer: { "@type": "Organization", name: "Sudeep Engineers", address: { "@type": "PostalAddress", addressLocality: "Aurangabad", addressRegion: "Maharashtra" }},
        description: "High-quality LED street lights, flood lights, and pixel LED lighting manufactured in Aurangabad.",
      })}} />

      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0f172a 100%)" }}>
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[color:var(--color-text-muted)] mb-6 flex gap-2">
            <Link href="/" className="hover:text-blue-400 no-underline text-[color:var(--color-text-muted)]">Home</Link>
            <span>/</span><span className="text-[color:var(--color-text-secondary)]">LED Light Manufacturer Aurangabad</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4" style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            LED Light Manufacturer in <span className="gradient-text">Aurangabad</span>
          </h1>
          <p className="text-[color:var(--color-text-secondary)] text-lg max-w-[600px]" style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Energy-efficient LED lighting solutions manufactured locally in Waluj MIDC.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-on-scroll blog-prose">
            <h2>Premium LED Lighting Manufacturing in Aurangabad</h2>
            <p>Sudeep Engineers is a trusted LED light manufacturer based in Waluj MIDC, Aurangabad. We design and manufacture a comprehensive range of LED lighting products for industrial, commercial, municipal, and outdoor applications. Our LED lights are built for Indian conditions — durable, energy-efficient, and competitively priced.</p>

            <h2>Our LED Product Range</h2>

            <h3>LED Street Lights (20W — 200W)</h3>
            <p>Our LED street lights are designed for reliable outdoor illumination of roads, highways, residential colonies, and industrial estates. Features include die-cast aluminum housing, IP66 weatherproofing, and precision optics for uniform light distribution. Available in multiple wattages from 20W to 200W to suit different road widths and lighting standards.</p>

            <h3>LED Flood Lights (50W — 500W)</h3>
            <p>High-power LED flood lights for area lighting, sports facilities, factory yards, and building facades. Our flood lights deliver excellent lumen output with a wide beam angle for maximum coverage. IP65 rated with built-in surge protection for reliable outdoor performance.</p>

            <h3>Pixel LED Lighting</h3>
            <p>Advanced pixel LED lighting solutions for architectural and decorative applications. Individually addressable LEDs with DMX512 control enable dynamic lighting effects, color-changing displays, and creative lighting installations. IP67 rated for outdoor use.</p>

            <h2>Why Choose Our LED Lights?</h2>
            <ul>
              <li><strong>Energy Savings</strong> — 60-70% reduction in energy consumption compared to conventional lighting</li>
              <li><strong>Long Lifespan</strong> — 50,000+ hours of operational life with minimal maintenance</li>
              <li><strong>Weatherproof</strong> — IP65/IP66 rated for reliable outdoor performance in Indian weather</li>
              <li><strong>Quality Components</strong> — Premium LED chips, drivers, and thermal management systems</li>
              <li><strong>Made in Aurangabad</strong> — Local manufacturing ensures quick delivery and after-sales support</li>
              <li><strong>Customizable</strong> — Custom wattages, color temperatures, and mounting options available</li>
            </ul>

            <h2>LED Lighting Applications</h2>
            <ul>
              <li>Municipal street and road lighting</li>
              <li>Highway and expressway illumination</li>
              <li>Industrial factory and warehouse lighting</li>
              <li>Sports ground and stadium floodlighting</li>
              <li>Commercial building exterior lighting</li>
              <li>Decorative and architectural lighting</li>
              <li>Garden and landscape lighting</li>
            </ul>

            <h2>Government &amp; Municipal LED Projects</h2>
            <p>As an MSME-registered company, Sudeep Engineers is qualified for government tenders for LED street lighting and smart city projects. We have the capability to handle municipal-scale LED lighting projects with installation support across Aurangabad and Maharashtra.</p>

            <blockquote>Looking for a reliable LED light manufacturer in Aurangabad? Sudeep Engineers delivers quality, efficiency, and value in every product.</blockquote>
          </div>

          <div className="mt-12 animate-on-scroll">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-[color:var(--color-foreground)] font-semibold hover:-translate-y-0.5 transition-all no-underline">
              Get LED Lighting Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Product Quick Cards */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-center mb-10 animate-on-scroll">Our LED Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Waypoints color="currentColor" size={48} />, name: "LED Street Lights", range: "20W - 200W", feature: "IP66 Rated" },
              { icon: <Lightbulb color="currentColor" size={48} />, name: "LED Flood Lights", range: "50W - 500W", feature: "IP65 Rated" },
              { icon: <Sparkles color="currentColor" size={48} />, name: "Pixel LED Lights", range: "RGB/RGBW", feature: "DMX512 Control" },
            ].map((p, i) => (
              <div key={i} className={`glass-card p-8 text-center animate-on-scroll delay-${i + 1}`}>
                <div className="text-blue-400 mb-4 flex justify-center [&>svg]:w-12 [&>svg]:h-12">{p.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-2">{p.name}</h3>
                <div className="flex justify-center gap-2 mb-3">
                  <span className="bg-blue-500/8 border border-blue-500/12 rounded-full px-3 py-0.5 text-xs text-blue-400">{p.range}</span>
                  <span className="bg-blue-500/8 border border-blue-500/12 rounded-full px-3 py-0.5 text-xs text-blue-400">{p.feature}</span>
                </div>
                <Link href="/contact" className="text-blue-400 text-sm font-semibold no-underline hover:text-blue-300">
                  Get Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
