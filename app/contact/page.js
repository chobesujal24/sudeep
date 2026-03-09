import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us - Get a Free Quote for Engineering Services",
  description:
    "Contact Sudeep Engineers for engineering fabrication, metal manufacturing & LED lighting quotes. Visit us at Waluj MIDC, Aurangabad or call for inquiries.",
  alternates: { canonical: "https://sudeepengineers.com/contact" },
};

const contactInfo = [
  {
    icon: <MapPin color="currentColor" size={24} />,
    title: "Visit Our Facility",
    content: "Waluj MIDC, Aurangabad,\nMaharashtra 431136, India",
  },
  {
    icon: <Phone color="currentColor" size={24} />,
    title: "Call Us",
    content: "+91 9922996236",
    link: "tel:+919922996236",
  },
  {
    icon: <Mail color="currentColor" size={24} />,
    title: "Email Us",
    content: "info@sudeepengineers.com",
    link: "mailto:info@sudeepengineers.com",
  },
  {
    icon: <MessageCircle color="currentColor" size={24} />,
    title: "WhatsApp",
    content: "Chat with us on WhatsApp",
    link: "https://api.whatsapp.com/send/?phone=919922996236&text=Hello%20Sudeep%20Engineers,%20I%20have%20an%20enquiry",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sudeepengineers.com" },
              { "@type": "ListItem", position: 2, name: "Contact", item: "https://sudeepengineers.com/contact" },
            ],
          }),
        }}
      />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-[#FFFFFF]">
        <div className="absolute -top-[30%] -right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav className="text-xs text-[#475569] mb-6 flex gap-2">
            <Link href="/" className="hover:text-[#38BDF8] no-underline text-[#475569]">Home</Link>
            <span>/</span><span className="text-[#1E293B]">Contact</span>
          </nav>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-heading font-extrabold mb-4 text-[#1E293B]"
            style={{ animation: "fade-in-up 0.6s ease forwards" }}>
            Get in <span className="text-[#2563EB]">Touch</span>
          </h1>
          <p className="text-[#1E293B] opacity-80 text-lg max-w-[600px]"
            style={{ animation: "fade-in-up 0.6s ease 0.1s forwards", opacity: 0 }}>
            Ready to discuss your project? Contact us for a free consultation and competitive quote.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-[color:var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <div key={i} className={`glass-card p-6 animate-on-scroll delay-${i + 1}`}>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mb-4 [&>svg]:w-6 [&>svg]:h-6">
                  {info.icon}
                </div>
                <h3 className="font-heading font-semibold text-sm mb-2">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-[color:var(--color-text-secondary)] text-sm no-underline hover:text-blue-400 transition-colors" target={info.link.startsWith("http") ? "_blank" : undefined} rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                    {info.content}
                  </a>
                ) : (
                  <p className="text-[color:var(--color-text-secondary)] text-sm whitespace-pre-line">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-on-scroll">
              <h2 className="font-heading font-bold text-2xl mb-2">Send Us a Message</h2>
              <p className="text-[color:var(--color-text-secondary)] text-sm mb-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Map */}
            <div className="animate-on-scroll delay-2">
              <h2 className="font-heading font-bold text-2xl mb-2">Our Location</h2>
              <p className="text-[color:var(--color-text-secondary)] text-sm mb-6">
                Visit our manufacturing facility in Waluj MIDC, Aurangabad.
              </p>
              <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7!2d75.34!3d19.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzEyLjAiTiA3NcKwMjAnMzUuOSJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Sudeep Engineers - Waluj MIDC, Aurangabad"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-[color:var(--color-bg-secondary)] border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-on-scroll">
            <h2 className="font-heading font-bold text-2xl mb-6">Business Hours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="glass-card p-6 text-center">
                <h4 className="font-semibold text-sm mb-2">Monday - Friday</h4>
                <p className="text-blue-400 font-bold">9:00 AM - 6:00 PM</p>
              </div>
              <div className="glass-card p-6 text-center">
                <h4 className="font-semibold text-sm mb-2">Saturday</h4>
                <p className="text-blue-400 font-bold">9:00 AM - 2:00 PM</p>
              </div>
              <div className="glass-card p-6 text-center">
                <h4 className="font-semibold text-sm mb-2">Sunday</h4>
                <p className="text-[color:var(--color-text-muted)] font-bold">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
