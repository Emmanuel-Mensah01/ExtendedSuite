import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

// NOTE: `cover` is the large hero photo shown on the left of the card —
// it should be your best/most flattering shot (bed or living space, not
// the bathroom). `secondary` are the two smaller stacked photos on the
// right. If a photo looks wrong once rendered, just swap which src sits
// in `cover` vs `secondary` below — filenames/alt text aren't a reliable
// guide to actual photo content, so verify visually in the browser.
const apartment = {
  id: '2bed',
  type: 'Two Bedroom Apartment',
  tagline: 'Ideal for families, couples & corporate teams',
  guests: 'Up to 4 Guests',
  price: 'GHS 700',
  period: '/ night',
  features: ['2 Queen Beds', 'Expansive Living Room', 'Full Kitchen', '2 Bathrooms', 'Dining Area', 'Smart TV + A/C'],
  cover: {
    src: "/assets/images/Bedroom3.PNG",
    alt: 'Elegantly furnished bedroom at Extended Stay Suite Ghana with comfortable bed and quality linens'
  },
  secondary: [
  {
    src: "/assets/images/KITCHEN1.PNG",
    alt: 'Fully equipped kitchen at Extended Stay Suite Ghana with modern appliances and countertops'
  },
  {
    src: "/assets/images/HALL2.PNG",
    alt: 'Extended Stay Suite Ghana hotel building exterior — modern gated compound in Tema Community 6'
  }]
};

export default function ApartmentShowcase() {
  return (
    <section id="apartments" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,162,39,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,162,39,0.2) 0%, transparent 40%)' }} />
        
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4 text-accent">Our Apartment</div>
          <h2 className="text-section-title font-display font-medium text-white mb-4">
            Your Perfect<br />
            <span className="gold-gradient-text">Home Away from Home</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Fully furnished, serviced, and secure — one beautifully designed apartment in Tema Community 6.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-accent/40 shadow-[0_0_40px_rgba(201,162,39,0.12)] card-hover">
          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-1 h-80 lg:h-96">
            <div className="col-span-2 relative overflow-hidden">
              <AppImage
                src={apartment.cover.src}
                alt={apartment.cover.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 66vw, 66vw" />
              <div className="absolute top-3 left-3 px-3 py-1 gold-gradient text-accent-foreground text-xs font-bold rounded-full">
                Available Now
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {apartment.secondary.map((img, i) => (
                <div key={i} className="relative flex-1 overflow-hidden">
                  <AppImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 33vw, 16vw" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-6 lg:p-8 bg-card/5 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
              <div>
                <span className="text-xs text-accent font-semibold uppercase tracking-widest">{apartment.guests}</span>
                <h3 className="font-display text-2xl lg:text-3xl font-medium text-white mt-1">{apartment.type}</h3>
                <p className="text-white/50 text-sm mt-1">{apartment.tagline}</p>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl lg:text-4xl font-medium text-accent">{apartment.price}</span>
                <span className="text-white/50 text-sm block">{apartment.period}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {apartment.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-white/70 text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link
                href="/booking"
                className="flex-1 py-3 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl text-center hover:opacity-90 transition-all hover:-translate-y-0.5">
                Book This Apartment
              </Link>
              <a
                href="#pricing"
                className="px-5 py-3 bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                See Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}