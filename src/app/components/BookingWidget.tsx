'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingWidget() {
  const router = useRouter();
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    type: '1bed',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 mb-0">
      <div className="max-w-5xl mx-auto">
        <div className="glass-light rounded-2xl shadow-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-accent rounded-full" />
            <h2 className="font-display text-primary font-semibold text-lg">Check Availability & Book</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check In */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check-in</label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                    className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Check-out</label>
                <input
                  type="date"
                  value={form.checkOut}
                  min={form.checkIn || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  required
                />
              </div>

              {/* Apartment Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Apartment</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none cursor-pointer"
                >
                  <option value="1bed">1 Bedroom (1–2 guests)</option>
                  <option value="2bed">2 Bedroom (up to 4 guests)</option>
                </select>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Guests</label>
                <div className="flex gap-3">
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="flex-1 h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none cursor-pointer"
                  >
                    {[1,2,3,4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="h-12 px-6 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                No Airbnb fees
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Best available rates
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Instant confirmation
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}