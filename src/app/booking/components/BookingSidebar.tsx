import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function BookingSidebar() {
  return (
    <div className="space-y-5 lg:sticky lg:top-28">
      {/* Property Card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-48 overflow-hidden">
          <AppImage
            src="/assets/images/BEDROOM4.PNG"
            alt="Bright modern bedroom interior with white linen bed, wooden floors, and warm ambient lighting"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw" />
          
          <div className="absolute inset-0 img-overlay-scrim" />
          <div className="absolute bottom-3 left-4">
            <span className="text-white font-display text-lg font-medium">Extended Stay Suite</span>
            <p className="text-white/70 text-xs">Tema Community 6, Ghana</p>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5]?.map((s) =>
            <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#C9A227"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            )}
            <span className="text-muted-foreground text-xs ml-1">5.0 · All reviews</span>
          </div>
          <div className="space-y-2 pt-1">
            {[
            { label: 'Wi-Fi', icon: '📶' },
            { label: 'A/C & Backup Power', icon: '❄️' },
            { label: '24/7 Security', icon: '🔒' },
            { label: 'Full Kitchen', icon: '🍳' },
            { label: 'Gated Parking', icon: '🚗' }]?.
            map((a) =>
            <div key={a?.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{a?.icon}</span>
                <span>{a?.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contact Card */}
      <div className="bg-primary rounded-2xl p-5 text-white space-y-4">
        <h3 className="font-semibold text-sm">Need help booking?</h3>
        <div className="space-y-3">
          <a
            href="https://wa.me/233542758210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <div>
              <p className="text-xs font-semibold">WhatsApp</p>
              <p className="text-white/60 text-xs">+233 248 537 939</p>
            </div>
          </a>
          <a
            href="tel:+233248537939"
            className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/15 transition-colors">
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <div>
              <p className="text-xs font-semibold">Call Direct</p>
              <p className="text-white/60 text-xs">+233 542 758 210</p>
            </div>
          </a>
        </div>
      </div>
      {/* Why Book Direct */}
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 space-y-3">
        <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          Why Book Direct
        </h3>
        {[
        'No Airbnb service fees',
        'Best available rate',
        'Instant WhatsApp confirmation',
        'Flexible long-stay discounts']?.
        map((b) =>
        <div key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            {b}
          </div>
        )}
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
        Back to Homepage
      </Link>
    </div>);

}