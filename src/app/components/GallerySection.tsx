'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Exterior'];

const galleryItems = [
{ cat: 'Exterior', src:"/assets/images/Exterior m.PNG", alt: 'Extended Stay Suite Ghana hotel building exterior — modern gated property in Tema Community 6' },
{ cat: 'Bedroom', src:"/assets/images/BEDROOM1.PNG", alt: 'Elegantly furnished bedroom at Extended Stay Suite Ghana with comfortable bed and quality linens' },
{ cat: 'Bathroom', src: "/assets/images/Toil.PNG", alt: 'Modern clean toilet and bathroom at Extended Stay Suite Ghana with quality fixtures and fittings' },
{ cat: 'Kitchen', src: "/assets/images/KITCHEN1.PNG", alt: 'Fully equipped kitchen at Extended Stay Suite Ghana with modern appliances and countertops' },
{ cat: 'Exterior', src: "/assets/images/EXT1.PNG", alt: 'Extended Stay Suite Ghana hotel building exterior — modern gated property in Tema Community 6' },
{ cat: 'Bedroom', src: "/assets/images/Bedroom2.PNG", alt: 'Elegantly furnished bedroom at Extended Stay Suite Ghana with comfortable bed and modern decor' },
{ cat: 'Living Room', src: "/assets/images/HALL1.PNG", alt: 'Spacious guest room hallway and living area at Extended Stay Suite Ghana, Tema' },
{ cat: 'Bathroom', src: "/assets/images/WASH2.PNG", alt: 'Modern clean bathroom at Extended Stay Suite Ghana with quality fixtures and fittings' },
{ cat: 'Living Room', src: "/assets/images/BALCONY.PNG", alt: 'Private balcony at Extended Stay Suite Ghana with scenic views of Tema Community 6' },
{ cat: 'Living Room', src: "/assets/images/HALL3.PNG", alt: 'Modern living room with comfortable sectional sofa, wooden coffee table, and bright natural light from large windows' },
{ cat: 'Kitchen', src: "/assets/images/KITCHEN2.PNG", alt: 'Fully equipped kitchen with stainless steel appliances, granite countertops, and organized cabinet storage' },
{ cat: 'Exterior', src: "/assets/images/EX3.PNG", alt: 'Exterior view of modern apartment building with landscaped entrance and gated parking area at dusk' },
{ cat: 'Living Room', src: "/assets/images/HALL2.PNG", alt: 'Bright living room with comfortable seating, warm lighting, and modern decor' },
{ cat: 'Living Room', src: "/assets/images/HALL4.PNG", alt: 'Second living room angle showing dining area with wooden table and pendant lights over it' },
{ cat: 'Bedroom', src: "/assets/images/Bedroom3.PNG", alt: 'Second bedroom with twin beds, neutral bedding, and curtains allowing soft morning light' },
{ cat: 'Staircase', src: "/assets/images/STAIRS.PNG", alt: 'Bright kitchen with bar seating, pendant lights, and open shelving displaying neatly arranged kitchenware' },
{ cat: 'Bedroom', src:"/assets/images/BEDROOm4.PNG", alt: 'Elegantly furnished bedroom at Extended Stay Suite Ghana with comfortable bed and quality line' },
{ cat: 'Bathroom', src: "/assets/images/WASH1.PNG", alt: 'Modern clean bathroom at Extended Stay Suite Ghana with quality fixtures and fittings' },
{ cat: 'Exterior', src: "/assets/images/EX2.PNG", alt: 'Well-lit apartment building exterior at night with security lights and palm trees in foreground' }];


export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  const filtered = activeCategory === 'All' ?
  galleryItems :
  galleryItems?.filter((item) => item?.cat === activeCategory);

  return (
    <section id="gallery" className="scroll-mt-24 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Photo Gallery</div>
          <h2 className="text-section-title font-display font-medium text-foreground mb-4">
            See Every Detail<br />
            <span className="gold-gradient-text">Before You Arrive</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories?.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`tab-pill ${activeCategory === cat ? 'tab-pill-active' : 'tab-pill-inactive'}`}>
            
              {cat}
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered?.map((item, i) =>
          <div
            key={`${item?.src}-${i}`}
            className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? 'auto' : '1 / 1', minHeight: i === 0 ? '360px' : '160px' }}
            onClick={() => {setLightboxSrc(item?.src);setLightboxAlt(item?.alt);}}>
            
              <AppImage
              src={item?.src}
              alt={item?.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {item?.cat}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Lightbox */}
      {lightboxSrc &&
      <div
        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
        onClick={() => setLightboxSrc(null)}>
        
          <button
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close lightbox">
          
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full" onClick={(e) => e?.stopPropagation()}>
            <AppImage
            src={lightboxSrc}
            alt={lightboxAlt}
            fill
            className="object-contain"
            sizes="100vw"
            priority />
          
          </div>
        </div>
      }
    </section>);

}