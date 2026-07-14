import React from 'react';
import Link from 'next/link';

const pricing = [
  { label: 'Daily Rate', desc: 'Standard (Mon–Thu)', price: 'GHS 700', unit: '/ night' },
  { label: 'Weekend Rate', desc: 'Friday – Sunday', price: 'GHS 740', unit: '/ night' },
  { label: 'Weekly Rate', desc: '7 consecutive nights', price: 'GHS 4,500', unit: '/ week', highlight: true },
  { label: 'Monthly Rate', desc: '30 nights — best value', price: 'GHS 16,300', unit: '/ month', highlight: true },
  { label: 'Security Deposit', desc: 'Fully refundable', price: 'GHS 1,160', unit: 'once' },
  { label: 'Cleaning Fee', desc: 'Per stay', price: 'GHS 155', unit: 'per stay' },
];

const addOns = [
  { label: 'Laundry Service', desc: 'Per load', price: 'GHS 80' },
  { label: 'Breakfast', desc: 'Continental or local, per person', price: 'GHS 50' },
  { label: 'Extra Guest', desc: 'Per additional guest / night', price: 'GHS 100' },
];

function PricingRow({ label, desc, price, unit, highlight }: { label: string; desc: string; price: string; unit: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3.5 border-b border-white/10 last:border-0 ${highlight ? 'bg-accent/10 -mx-4 px-4 rounded-lg' : ''}`}>
      <div>
        <span className={`text-sm font-semibold ${highlight ? 'text-accent' : 'text-white'}`}>{label}</span>
        <span className="text-xs text-white/40 block mt-0.5">{desc}</span>
      </div>
      <div className="text-right">
        <span className={`font-display text-lg font-medium ${highlight ? 'text-accent' : 'text-white'}`}>{price}</span>
        <span className="text-xs text-white/40 block">{unit}</span>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 blob-gold opacity-50" />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-4">Transparent Pricing</div>
          <h2 className="text-section-title font-display font-medium text-foreground mb-4">
            No Hidden Fees.<br />
            <span className="gold-gradient-text">No Surprises.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            All rates include Wi-Fi, water, and electricity. Corporate and long-stay discounts available.
          </p>
        </div>

        <div className="pricing-card-featured rounded-2xl p-6 lg:p-8 shadow-xl mb-10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-display text-2xl font-medium text-white">Two Bedroom Apartment</h3>
              <p className="text-white/50 text-sm mt-1">Up to 4 guests · 2 Queen beds</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
          </div>
          <div>
            {pricing.map((row) => (
              <PricingRow key={row.label} {...row} />
            ))}
          </div>
          <Link
            href="/booking"
            className="mt-6 w-full block text-center py-3.5 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </div>

        {/* Add-ons */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-display text-xl font-medium text-foreground mb-4">Add-On Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {addOns.map((addon) => (
              <div key={addon.label} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div>
                  <span className="text-sm font-semibold text-foreground">{addon.label}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5">{addon.desc}</span>
                </div>
                <span className="font-display text-base font-medium text-accent">{addon.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Check-in: 2:00 PM · Check-out: 11:00 AM · Extra guests: GHS 100/night · Corporate & repeat guest discounts available upon request.
          </p>
        </div>
      </div>
    </section>
  );
}