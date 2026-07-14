'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const heroSlides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7e03430-1772751062559.png",
  alt: 'Bright modern living room with floor-to-ceiling windows, white walls, warm afternoon light streaming in'
},
{
  src: "https://images.unsplash.com/photo-1719368420509-059a3b22579e",
  alt: 'Elegant furnished bedroom with crisp white linen, wooden floors, and soft ambient lighting'
},
{
  src: "https://images.unsplash.com/photo-1651519842134-73ff9d2b203b",
  alt: 'Contemporary open-plan kitchen and dining area with granite countertops and warm pendant lighting'
}];


export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Slides */}
      {heroSlides?.map((slide, i) =>
      <div
        key={i}
        className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
        
          <div className="w-full h-full animate-ken-burns">
            <AppImage
            src={slide?.src}
            alt={slide?.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw" />
          
          </div>
        </div>
      )}
      {/* Scrims */}
      <div className="absolute inset-0 hero-scrim hidden lg:block" />
      <div className="absolute inset-0 hero-scrim-mobile lg:hidden" />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-32 sm:pb-40 lg:pb-56">
        <div className="max-w-2xl">
          <div className="section-label text-accent mb-3 sm:mb-6 animate-fade-in-left opacity-100 text-xs sm:text-sm">
            Extended Stay Suite · Tema, Ghana
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4 sm:mb-6 animate-fade-in-up opacity-100 stagger-1 leading-tight">
            Luxury Furnished<br />
            Apartments in<br />
            <span className="gold-gradient-text">Tema, Ghana.</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-6 sm:mb-10 animate-fade-in-up opacity-100 stagger-2 max-w-xl">
            Experience comfort, privacy, and convenience for short and extended stays. Hotel-grade amenities, apartment-style living.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up opacity-100 stagger-3">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 gold-gradient text-accent-foreground font-semibold text-sm sm:text-base rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5">
              
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book Now
            </Link>
            <a
              href="#apartments"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">
              
              View Apartments
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-12 animate-fade-in-up opacity-100 stagger-4">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </div>
              <span className="text-white/70 text-xs sm:text-sm">Available Now</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5]?.map((s) =>
              <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#C9A227"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              )}
              <span className="text-white/70 text-xs sm:text-sm ml-1">5.0 Rating</span>
            </div>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <span className="text-white/70 text-xs sm:text-sm hidden sm:block">2 Units Available</span>
          </div>
        </div>
      </div>
      {/* Slide indicators */}
      <div className="absolute bottom-28 sm:bottom-36 lg:bottom-40 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides?.map((_, i) =>
        <button
          key={i}
          onClick={() => setActiveSlide(i)}
          className={`h-1 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-8 bg-accent' : 'w-3 bg-white/40'}`}
          aria-label={`Slide ${i + 1}`} />

        )}
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>);

}