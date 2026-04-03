import Link from "next/link";
import { Shield, Ruler, Wrench, Award, Factory, MapPin } from "lucide-react";

export const metadata = {
  title: "Street Light Pole & Highmast Pole Manufacturer in India | Octagonal, Conical, Swaged Poles",
  description:
    "Leading street light pole manufacturer in India. Sudeep Engineers makes octagonal poles, conical poles, swaged poles, decorative poles, highmast poles (15m-35m) & galvanized steel poles. IS 2713 & IS 4759 compliant. Hot-dip galvanized for maximum durability.",
  keywords: "street light pole manufacturer, octagonal pole manufacturer, highmast pole manufacturer, conical pole manufacturer, swaged pole manufacturer, decorative pole manufacturer, galvanized pole manufacturer india, lighting pole manufacturer, street light pole price india, highmast pole price, ms lighting pole, gi pole manufacturer",
  alternates: { canonical: "https://sudeepengineers.com/street-light-pole-manufacturer" },
  openGraph: {
    title: "Street Light Pole & Highmast Pole Manufacturer India | Sudeep Engineers",
    description: "Octagonal, conical, swaged & decorative poles. Highmast poles 15m-35m. Hot-dip galvanized, IS 2713 compliant. OEM manufacturer Aurangabad.",
  },
};

export default function PolesManufacturer() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
          { "@type": "ListItem", position: 2, name: "Street Light Pole Manufacturer", item: "https://sudeepengineers.com/street-light-pole-manufacturer" },
        ],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What types of street light poles does Sudeep Engineers manufacture?", acceptedAnswer: { "@type": "Answer", text: "Sudeep Engineers manufactures octagonal poles (4m-12m), conical poles, swaged poles, tabular poles, decorative poles, and highmast poles (15m-35m). All poles are available in mild steel with hot-dip galvanized finish as per IS 4759 standards." }},
          { "@type": "Question", name: "What is the height range of highmast poles?", acceptedAnswer: { "@type": "Answer", text: "Our highmast poles are available from 15 meters to 35 meters height with manual or motorized raising and lowering mechanism. They are used for highway interchanges, airports, stadiums, and large industrial areas." }},
          { "@type": "Question", name: "Are the poles IS 2713 compliant?", acceptedAnswer: { "@type": "Answer", text: "Yes, all our tubular steel poles comply with IS 2713 (Tubular Steel Poles for Overhead Power Lines) specifications. The galvanization process follows IS 4759 standards." }},
          { "@type": "Question", name: "Can you supply poles with foundation design?", acceptedAnswer: { "@type": "Answer", text: "Yes, we provide complete pole installation packages including foundation design drawings, anchor bolt cages, base plates, and installation guidelines. Custom foundation designs are available based on soil conditions and wind loading requirements." }},
        ],
      })}} />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-slate-500 mb-6 flex gap-2">
            <Link href="/" className="hover:text-green-700 no-underline text-slate-500">Home</Link>
            <span>/</span><span className="text-slate-800 font-medium">Street Light Pole Manufacturer</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4 text-slate-900">
            Street Light Pole &amp; Highmast Pole <span className="text-green-700">Manufacturer in India</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-[700px]">
            Octagonal poles, conical poles, swaged poles, decorative poles, and highmast poles — 
            hot-dip galvanized for maximum durability. Manufactured by Sudeep Engineers, Aurangabad.
          </p>
        </div>
      </section>

      {/* Pole Types Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-green-700 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-4">Our Pole Range</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Types of Lighting Poles We Manufacture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Octagonal Poles", height: "4m — 12m", desc: "Eight-sided steel poles ideal for urban street lighting, highway lighting, and smart city projects. Available with single or double arm brackets.", specs: ["Mild Steel / CRCA", "Hot-dip Galvanized", "IS 2713 Compliant", "Base plate & anchor bolts"] },
              { title: "Conical Poles", height: "4m — 10m", desc: "Tapered single-piece poles offering sleek aesthetics and structural strength. Perfect for urban roads, commercial areas, and residential townships.", specs: ["Single piece taper", "Wind speed rated", "Powder coat finish", "Custom arm brackets"] },
              { title: "Swaged Poles", height: "6m — 12m", desc: "Multi-section telescopic poles for easy transportation and installation. Ideal for highway and national highway street lighting projects.", specs: ["2-3 section design", "Socket joint assembly", "Heavy duty construction", "Large-scale deployments"] },
              { title: "Decorative Poles", height: "3m — 6m", desc: "Ornamental lighting poles for parks, gardens, heritage areas, and smart city beautification projects. Cast iron or mild steel with designer finish.", specs: ["Victorian / Modern styles", "LED post top compatible", "RAL color options", "Foundation kits included"] },
              { title: "Highmast Poles", height: "15m — 35m", desc: "Heavy-duty high-mast poles with raising and lowering mechanism for interchange lighting, airports, stadiums, and large industrial yards.", specs: ["Manual / motorized winch", "Crown assembly 4-16 lights", "Hot-dip galvanized", "Aircraft warning lights"] },
              { title: "Solar Poles", height: "3m — 8m", desc: "Purpose-designed poles for solar street light mounting with built-in panel brackets, battery box supports, and cable management channels.", specs: ["Panel mounting bracket", "Battery box support", "Cable routing channel", "Foundation drawings"] },
            ].map((pole, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-green-300 hover:shadow-lg transition-all group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-green-700 transition-colors">{pole.title}</h3>
                    <span className="bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-3">{pole.height}</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{pole.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pole.specs.map((spec, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-200 px-6 py-3 bg-white">
                  <Link href="/contact" className="text-green-700 text-sm font-semibold no-underline hover:text-green-600">Get Quote →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-slate max-w-none">
            <h2>Premium Street Light Pole Manufacturing in India</h2>
            <p>
              Sudeep Engineers is a leading <strong>street light pole manufacturer in India</strong> with manufacturing facilities in 
              Waluj MIDC, Aurangabad, Maharashtra. We specialize in the design and production of <strong>hot-dip galvanized steel poles</strong> 
              for street lighting, highway lighting, solar lighting, and area lighting applications across India.
            </p>

            <h3>Manufacturing Process</h3>
            <p>
              Our <strong>pole manufacturing</strong> process includes CNC plasma cutting, press brake forming, automatic welding, 
              <strong>hot-dip galvanization</strong> as per IS 4759, and quality inspection at every stage. We use IS 2062 grade 
              mild steel plates and tubes to ensure structural integrity and long service life.
            </p>

            <h3>Standards &amp; Compliance</h3>
            <ul>
              <li><strong>IS 2713</strong> — Tubular Steel Poles for Overhead Power Lines</li>
              <li><strong>IS 4759</strong> — Hot-Dip Zinc Coating on Structural Steel</li>
              <li><strong>IS 2062</strong> — Steel for General Structural Purposes</li>
              <li><strong>IS 875</strong> — Code of Practice for Design Loads (Wind)</li>
              <li><strong>ISO 1461</strong> — Hot-Dip Galvanized Coatings</li>
            </ul>

            <h3>Pole Applications</h3>
            <ul>
              <li>National highway and state highway <strong>street light pole</strong> installation</li>
              <li>Municipal corporation and smart city <strong>lighting pole</strong> projects</li>
              <li>Industrial estate and factory campus <strong>area lighting poles</strong></li>
              <li>Stadium and sports facility <strong>highmast pole</strong> installation</li>
              <li>Residential township and housing society <strong>decorative poles</strong></li>
              <li>Solar street light projects — <strong>solar pole</strong> with panel bracket</li>
              <li>Airport and defense perimeter <strong>highmast lighting</strong></li>
              <li>Park and garden <strong>landscape lighting poles</strong></li>
            </ul>

            <blockquote>
              Need custom poles? Sudeep Engineers manufactures poles to your exact height, loading, and finish specifications. 
              Contact us for competitive OEM pricing.
            </blockquote>
          </div>

          <div className="mt-12">
            <Link href="/contact" className="inline-flex px-8 py-3.5 rounded-md bg-green-700 text-white font-semibold hover:bg-green-600 transition-all no-underline">
              Get Pole Manufacturing Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, label: "IS 2713 Compliant" },
              { icon: <Ruler className="w-6 h-6" />, label: "4m to 35m Height" },
              { icon: <Wrench className="w-6 h-6" />, label: "Hot-Dip Galvanized" },
              { icon: <Award className="w-6 h-6" />, label: "ISO 9001:2015" },
              { icon: <Factory className="w-6 h-6" />, label: "In-House Mfg" },
              { icon: <MapPin className="w-6 h-6" />, label: "PAN India" },
            ].map((f, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-green-600 flex justify-center mb-2">{f.icon}</div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
