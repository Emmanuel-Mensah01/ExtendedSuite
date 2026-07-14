import React from 'react';

const nearbyPlaces = [
  { name: 'Tema Motorway', type: 'Transport', distance: '2 min drive', icon: 'road' },
  { name: 'Beach Road', type: 'Leisure', distance: '5 min drive', icon: 'beach' },
  { name: 'Tema Port', type: 'Business', distance: '10 min drive', icon: 'anchor' },
  { name: 'Kotoka Airport', type: 'Transport', distance: '30 min drive', icon: 'plane' },
  { name: 'Community 6 Market', type: 'Shopping', distance: '3 min walk', icon: 'shop' },
  { name: 'Tema General Hospital', type: 'Medical', distance: '8 min drive', icon: 'hospital' },
  { name: 'Meridian Port Services', type: 'Business', distance: '12 min drive', icon: 'business' },
  { name: 'Apapa Mall', type: 'Shopping', distance: '15 min drive', icon: 'mall' },
];

const iconPaths: Record<string, React.ReactNode> = {
  road: <><path d="M3 17l4-10h10l4 10"/><path d="M12 7v10"/></>,
  beach: <><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></>,
  anchor: <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
  plane: <><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></>,
  shop: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
  hospital: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
  business: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  mall: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
};

export default function LocationSection() {
  return (
    <section id="location" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <div className="section-label mb-4">Location</div>
            <h2 className="text-section-title font-display font-medium text-foreground mb-6">
              Perfectly Placed<br />
              <span className="gold-gradient-text">in Tema Community 6</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Located on Okyeame Anum Street, just minutes from the Tema Motorway and Beach Road. Ideal for business travelers, port workers, and visitors to Greater Accra.
            </p>

            {/* Address Card */}
            <div className="bg-card border border-border rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="amenity-icon-wrap flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Okyeame Anum Street</p>
                  <p className="text-muted-foreground text-sm">GB-047-4376</p>
                  <p className="text-muted-foreground text-sm">Tema Community 6, Greater Accra, Ghana</p>
                  <a
                    href="https://maps.google.com/?q=Okyeame+Anum+Street+Tema+Community+6+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-accent text-sm font-semibold hover:underline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Nearby Grid */}
            <div className="grid grid-cols-2 gap-3">
              {nearbyPlaces.map((place) => (
                <div key={place.name} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-accent/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      {iconPaths[place.icon]}
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{place.name}</p>
                    <p className="text-xs text-muted-foreground">{place.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map embed */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl h-[500px] lg:h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.815!2d-0.0166!3d5.6698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDAnMTEuMyJOIDDCsDAwJzU5LjgiVw!5e0!3m2!1sen!2sgh!4v1689000000000!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Extended Stay Suite location on Google Maps, Tema Community 6, Ghana"
            />
          </div>
        </div>
      </div>
    </section>
  );
}