import React, { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from './components/BookingForm';
import BookingSidebar from './components/BookingSidebar';

function BookingContent() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to homepage — always visible, top of page, works on every device */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mb-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to Homepage
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Direct Booking</div>
          <h1 className="text-section-title font-display font-medium text-foreground mb-4">
            Reserve Your Apartment
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fill in your details below. You&apos;ll receive a confirmation within minutes via email and WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <div className="lg:col-span-1">
            <BookingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="pt-28 pb-20 flex items-center justify-center min-h-[60vh]"><div className="text-muted-foreground">Loading booking form...</div></div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  );
}