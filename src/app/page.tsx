import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import BookingWidget from './components/BookingWidget';
import AmenitiesSection from './components/AmenitiesSection';
import ApartmentShowcase from './components/ApartmentShowcase';
import GallerySection from './components/GallerySection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationSection from './components/LocationSection';
import WhyBookDirect from './components/WhyBookDirect';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import FloatingActions from './components/FloatingActions';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BookingWidget />
      <AmenitiesSection />
      <ApartmentShowcase />
      <GallerySection />
      <PricingSection />
      <TestimonialsSection />
      <LocationSection />
      <WhyBookDirect />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </main>
  );
}