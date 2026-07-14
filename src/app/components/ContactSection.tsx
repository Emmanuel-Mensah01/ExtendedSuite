'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactSection() {
  const [state, handleSubmit] = useForm('xdaqklvl');

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(201,162,39,0.4) 0%, transparent 50%)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="section-label mb-4 text-accent">Get In Touch</div>
            <h2 className="text-section-title font-display font-medium text-white mb-6">
              Ready to Book or<br />
              <span className="gold-gradient-text">Have a Question?</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              Reach us directly — no call centres, no automated responses. Our team responds within the hour.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'phone', label: 'Primary Phone', value: '+233 542 758 210', href: 'tel:+233248537939' },
                { icon: 'phone', label: 'Secondary Phone', value: '+233 248 537 939', href: 'tel:+233542758210' },
                { icon: 'phone', label: 'International Line', value: '+1 201 201 2577 915', href: 'tel:+12012012577915' },
                { icon: 'email', label: 'Email', value: 'extendedstaysuitegh@gmail.com', href: 'mailto:extendedstaysuitegh@gmail.com' },
                { icon: 'location', label: 'Address', value: 'Okyeame Anum St, GB-047-4376, Tema Community 6', href: '#' },
                { icon: 'clock', label: 'Check-in / Check-out', value: 'Check-in: 2:00 PM · Check-out: 11:00 AM', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/40 transition-colors">
                    {item.icon === 'phone' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                    {item.icon === 'email' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                    {item.icon === 'location' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                    {item.icon === 'clock' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-white/80 text-sm mt-0.5 group-hover:text-accent transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            
             <a href="https://wa.me/233248537939?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20booking%20at%20Extended%20Stay%20Suite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 px-6 py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-xl hover:bg-[#1ebe5d] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us Now
            </a>
          </div>

          {/* Right: Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <h3 className="font-display text-xl font-medium text-white mb-6">Send a Message</h3>
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="font-display text-xl text-white mb-2">Message Sent!</h4>
                <p className="text-white/60 text-sm">We&apos;ll get back to you within the hour.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1.5">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+233 or international"
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="text-xs font-semibold text-white/40 uppercase tracking-wider block mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your stay requirements..."
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-3.5 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}