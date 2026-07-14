'use client';
import React, { useState } from 'react';

const faqs = [
  { q: 'Is Wi-Fi included in the rate?', a: 'Yes. High-speed fibre Wi-Fi is included in all rates — daily, weekly, and monthly. No data caps or throttling.' },
  { q: 'Is there parking available?', a: 'Yes. Secure gated parking is available on-site at no additional charge. The compound is monitored 24/7.' },
  { q: 'Can I cook in the apartment?', a: 'Absolutely. Both units come with a fully equipped kitchenette — hob, microwave, fridge, kettle, cookware, and utensils. A continental or local breakfast add-on is also available for GHS 50 per person.' },
  { q: 'What payment methods are accepted?', a: 'We accept bank transfer (Ghana), mobile money (MTN MoMo, Vodafone Cash, AirtelTigo), and international wire transfers for overseas guests. Cash is also accepted on arrival.' },
  { q: 'Can I stay longer than 3 months?', a: 'Yes, extended stays of 3 months or more are available. Contact us directly for a customised long-stay rate — corporate and repeat guests receive preferential pricing.' },
  { q: 'Is airport pickup available?', a: 'Airport pickup from Kotoka International Airport (approximately 30 minutes) can be arranged for an additional fee. Contact us at least 24 hours before arrival to organise.' },
  { q: 'What is the cancellation policy?', a: 'Cancellations made 48+ hours before check-in receive a full refund of the rate paid (excluding the security deposit processing fee). Last-minute cancellations are subject to a one-night charge.' },
  { q: 'Are utilities included?', a: 'Yes. Water and electricity are included in all rates. There are no surprise utility bills at checkout.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">FAQ</div>
          <h2 className="text-section-title font-display font-medium text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground">Everything you need to know before you arrive.</p>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-foreground text-sm pr-4">{faq?.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-accent text-accent-foreground rotate-45' : 'bg-muted text-muted-foreground'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </button>
              <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq?.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}