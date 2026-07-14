import React from 'react';

const amenities = [
  { icon: 'wifi', label: 'High-Speed Wi-Fi', desc: 'Reliable fibre connection throughout' },
  { icon: 'tv', label: 'Smart TV', desc: 'Netflix, YouTube & satellite channels' },
  { icon: 'kitchen', label: 'Full Kitchenette', desc: 'Fully equipped for home cooking' },
  { icon: 'ac', label: 'Air Conditioning', desc: 'Climate-controlled comfort' },
  { icon: 'security', label: '24/7 Security', desc: 'Gated compound, CCTV & guard' },
  { icon: 'power', label: 'Backup Power', desc: 'Generator for uninterrupted stays' },
  { icon: 'parking', label: 'Secure Parking', desc: 'Gated on-site parking space' },
  { icon: 'laundry', label: 'Laundry Service', desc: 'Per-load service available' },
  { icon: 'utilities', label: 'Utilities Included', desc: 'Water & electricity in rate' },
  { icon: 'flexible', label: 'Flexible Stays', desc: 'Daily, weekly, or monthly' },
  { icon: 'breakfast', label: 'Breakfast Add-on', desc: 'Continental or local — GHS 50/person' },
  { icon: 'housekeeping', label: 'Housekeeping', desc: 'Regular cleaning service' },
];

const iconPaths: Record<string, React.ReactNode> = {
  wifi: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  tv: <><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></>,
  kitchen: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>,
  ac: <><path d="M8 6h12"/><path d="M2 12h20"/><path d="M8 18h12"/><path d="M3 6v4"/><path d="M3 14v4"/></>,
  security: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  power: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
  parking: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>,
  laundry: <><path d="M21 3H3v18h18V3z"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 8h.01"/></>,
  utilities: <><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></>,
  flexible: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  breakfast: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
  housekeeping: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 blob-gold opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-4">Everything Included</div>
          <h2 className="text-section-title font-display font-medium text-foreground mb-4">
            Hotel Amenities.<br />
            <span className="gold-gradient-text">Apartment Freedom.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every rate includes Wi-Fi, water, electricity, and security. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {amenities.map((amenity, i) => (
            <div
              key={amenity.icon}
              className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border card-hover cursor-default"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="amenity-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  {iconPaths[amenity.icon]}
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-0.5">{amenity.label}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{amenity.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}