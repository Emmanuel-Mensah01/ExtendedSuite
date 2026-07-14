import React from 'react';
import Link from 'next/link';

const benefits = [
  {
    icon: 'tag',
    title: 'Best Available Rates',
    desc: 'No third-party markup. What you see is exactly what you pay — direct from the property.',
  },
  {
    icon: 'fee',
    title: 'Zero Service Fees',
    desc: 'Skip Airbnb\'s 15% guest fee. Book directly and keep that money for your stay.',
  },
  {
    icon: 'confirm',
    title: 'Instant Confirmation',
    desc: 'Receive your booking confirmation within minutes via email and WhatsApp.',
  },
  {
    icon: 'support',
    title: 'Direct Support',
    desc: 'Call or WhatsApp management directly. No chatbots, no wait queues.',
  },
  {
    icon: 'flex',
    title: 'Flexible Long-Stay Deals',
    desc: 'Corporate, repeat guest, and 30+ day discounts negotiated directly with the owner.',
  },
  {
    icon: 'privacy',
    title: 'Your Data Stays Private',
    desc: 'We never share your details with third-party platforms or marketing lists.',
  },
];

const iconPaths: Record<string, React.ReactNode> = {
  tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  fee: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  confirm: <><polyline points="20 6 9 17 4 12"/></>,
  support: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
  flex: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  privacy: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
};

export default function WhyBookDirect() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-muted relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 blob-gold opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">Why Book Direct</div>
            <h2 className="text-section-title font-display font-medium text-foreground mb-6">
              Skip the Middleman.<br />
              <span className="gold-gradient-text">Book Direct & Save.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Booking directly with Extended Stay Suite means better rates, faster responses, and a personal relationship with your host — not a faceless platform.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-accent-foreground font-semibold text-base rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Book Directly Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.icon} className="bg-card rounded-xl border border-border p-5 card-hover">
                <div className="amenity-icon-wrap mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {iconPaths[b.icon]}
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1.5">{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}