'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const navLinks = [
  { label: 'Apartments', href: '#apartments' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
          scrolled ? 'py-3 shadow-xl' : 'py-5'
        }`}
        style={{
          // #1F2937 (--primary) expressed as rgba so opacity actually
          // renders — Tailwind's bg-primary/NN opacity modifier does not
          // work with hex values stored in CSS custom properties.
          backgroundColor: scrolled ? 'rgba(31, 41, 55, 0.95)' : 'rgba(31, 41, 55, 0.65)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <AppLogo
              src="/assets/images/C992D299-51BD-4FAF-BDA1-F5F154CAB93B-1783963398314.png"
              size={40}
              className="rounded-lg flex-shrink-0 sm:!w-11 sm:!h-11"
            />
            <div className="block min-w-0">
              <span className="font-display text-sm sm:text-lg font-semibold text-white leading-tight block whitespace-nowrap truncate">
                Extended Stay Suite
              </span>
              <span className="text-accent text-[10px] sm:text-xs tracking-widest uppercase font-medium whitespace-nowrap">
                Tema, Ghana
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-shrink-0">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-white/80 hover:text-accent transition-colors tracking-wide"
              >
                {link?.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/booking"
              className="px-5 py-2.5 gold-gradient text-accent-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white flex-shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-primary flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <AppLogo
                src="/assets/images/C992D299-51BD-4FAF-BDA1-F5F154CAB93B-1783963398314.png"
                size={40}
              />
              <span className="font-display text-white font-semibold">Extended Stay Suite</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-display font-medium text-white hover:text-accent transition-colors"
              >
                {link?.label}
              </a>
            ))}
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 gold-gradient text-accent-foreground text-base font-semibold rounded-xl"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}