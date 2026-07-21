'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface FormData {
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  purpose: string;
  addOns: string[];
  specialRequests: string;
}

// Add-ons that have a fixed, calculable per-night or per-person rate get a
// `perGuestPerNight` or `flatPerNight` price so they can be folded into the
// estimated total. Add-ons priced "on request" (e.g. airport pickup) are
// left out of the calculation and clearly marked as such in the UI/summary.
const addOnOptions = [
  { id: 'laundry', label: 'Laundry Service', price: 'GHS 80/load', calculable: false },
  { id: 'breakfast', label: 'Daily Breakfast', price: 'GHS 50/person/day', calculable: true, perGuestPerNight: 50 },
  { id: 'airport', label: 'Airport Pickup', price: 'Contact for quote', calculable: false },
];

// ── Pricing config ──────────────────────────────────────────────────────
const BASE_RATE = 700; // GHS per night, up to 2 guests
const INCLUDED_GUESTS = 2;
const EXTRA_GUEST_RATE = 100; // GHS per night, per guest beyond INCLUDED_GUESTS

// ── PayPal payment config ─────────────────────────────────────────────
// Yawsei's PayPal is a US-registered business account, so it can receive.
// PayPal does not accept GHS directly, so we convert to USD using a rate
// you control below. Update USD_TO_GHS_RATE whenever the market rate
// shifts meaningfully, or set NEXT_PUBLIC_USD_TO_GHS_RATE in your env
// so you don't have to redeploy just to update the rate.
const PAYPAL_BUSINESS_EMAIL = 'Yawsei@aol.com';
const USD_TO_GHS_RATE = Number(
  process.env.NEXT_PUBLIC_USD_TO_GHS_RATE ?? 11.5
);
const ADMIN_WHATSAPP_NUMBER = '233248537939';

function buildPayPalUrl(orderNumber: string, amountGHS: number) {
  const amountUSD = (amountGHS / USD_TO_GHS_RATE).toFixed(2);
  const params = new URLSearchParams({
    cmd: '_xclick',
    business: PAYPAL_BUSINESS_EMAIL,
    item_name: `Extended Stay Suite Booking - ${orderNumber}`,
    amount: amountUSD,
    currency_code: 'USD',
    no_shipping: '1',
    custom: orderNumber, // shows up in the PayPal transaction details
  });
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

// Best-effort international formatter for WhatsApp deep links (wa.me needs
// digits only, no leading +). Handles:
//  - "+233 24 xxx xxxx"      -> already has a country code, strip the +
//  - "0244xxxxxx" (Ghana local) -> assume Ghana, prefix 233
//  - "233244xxxxxx"          -> already fully qualified, leave as-is
// This is a heuristic, not full E.164 validation — for guests dialing in
// from outside Ghana without a leading 0 or +, ask them to include their
// country code (the placeholder text already says "international format").
function formatPhoneForWhatsApp(raw: string) {
  let cleaned = raw.replace(/[\s\-().]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith('00')) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0')) {
    // Local-format number with no country code — assume Ghana.
    cleaned = `233${cleaned.slice(1)}`;
  }
  return cleaned;
}
// ──────────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [orderNumber, setOrderNumber] = useState<string>('');

  const [form, setForm] = useState<FormData>({
    checkIn: searchParams.get('checkIn') || '',
    checkInTime: '14:00',
    checkOut: searchParams.get('checkOut') || '',
    checkOutTime: '11:00',
    guests: searchParams.get('guests') || '1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    purpose: '',
    addOns: [],
    specialRequests: '',
  });

  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const diff = Math.ceil(
        (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 60 * 60 * 24)
      );
      setNights(diff > 0 ? diff : 0);
    }
  }, [form.checkIn, form.checkOut]);

  const guestCount = Number(form.guests) || 1;
  const extraGuests = Math.max(0, guestCount - INCLUDED_GUESTS);

  const roomTotal = BASE_RATE * nights;
  const extraGuestTotal = extraGuests * EXTRA_GUEST_RATE * nights;

  // Only fold in add-ons that have a known, calculable rate (currently just
  // breakfast). Anything marked calculable:false (laundry, airport pickup)
  // is quoted separately and flagged in the summary instead of silently
  // being left out of the "total".
  const calculableAddOnTotal = form.addOns.reduce((sum, id) => {
    const addon = addOnOptions.find((a) => a.id === id);
    if (addon?.calculable && addon.perGuestPerNight) {
      return sum + addon.perGuestPerNight * guestCount * nights;
    }
    return sum;
  }, 0);

  const hasQuoteOnlyAddOns = form.addOns.some((id) => {
    const addon = addOnOptions.find((a) => a.id === id);
    return addon && !addon.calculable;
  });

  const totalBase = roomTotal + extraGuestTotal + calculableAddOnTotal;

  const toggleAddOn = (id: string) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(id)
        ? prev.addOns.filter((a) => a !== id)
        : [...prev.addOns, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Generate unique order number: ESS-YYYYMMDD-XXXX (e.g. ESS-20260713-4F2A)
    const now = new Date();
    const datePart = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    const randomPart = Math.random().toString(36).toUpperCase().slice(2, 6);
    const orderNumber = `ESS-${datePart}-${randomPart}`;

    // Build WhatsApp message with all booking details
    const aptLabel = 'Two Bedroom Apartment';
    const addOnLabels = form.addOns.map((id) => addOnOptions.find((a) => a.id === id)?.label).filter(Boolean).join(', ') || 'None';
    const paypalLink = buildPayPalUrl(orderNumber, totalBase);
    const quoteNote = hasQuoteOnlyAddOns
      ? '\n⚠️ *Note:* Some selected add-ons (laundry / airport pickup) are priced on request and are NOT included in the total below.'
      : '';

    // Admin notification message
    const adminMessage = encodeURIComponent(
      `🏨 *NEW BOOKING REQUEST — Extended Stay Suite*\n` +
      `🔖 *Order No:* ${orderNumber}\n\n` +
      `👤 *Guest:* ${form.firstName} ${form.lastName}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `📧 *Email:* ${form.email}\n` +
      `🌍 *Nationality:* ${form.nationality || 'Not specified'}\n` +
      `🎯 *Purpose:* ${form.purpose || 'Not specified'}\n\n` +
      `🛏️ *Apartment:* ${aptLabel}\n` +
      `👥 *Guests:* ${form.guests}${extraGuests > 0 ? ` (${extraGuests} extra @ GHS ${EXTRA_GUEST_RATE}/night)` : ''}\n` +
      `📅 *Check-in:* ${form.checkIn} at ${form.checkInTime}\n` +
      `📅 *Check-out:* ${form.checkOut} at ${form.checkOutTime}\n` +
      `🌙 *Nights:* ${nights}\n\n` +
      `➕ *Add-ons:* ${addOnLabels}\n` +
      `📝 *Special Requests:* ${form.specialRequests || 'None'}\n\n` +
      `💰 *Estimated Total:* GHS ${totalBase.toLocaleString()}${quoteNote}\n\n` +
      `_Please confirm availability and respond to the guest._`
    );

    // Guest confirmation message
    const guestMessage = encodeURIComponent(
      `✅ *Booking Request Received — Extended Stay Suite*\n` +
      `🔖 *Your Order No:* ${orderNumber}\n\n` +
      `Dear ${form.firstName} ${form.lastName},\n\n` +
      `Thank you for choosing Extended Stay Suite, Tema, Ghana! 🏨\n\n` +
      `Here is a summary of your booking request:\n\n` +
      `🛏️ *Apartment:* ${aptLabel}\n` +
      `👥 *Guests:* ${form.guests}\n` +
      `📅 *Check-in:* ${form.checkIn} at ${form.checkInTime}\n` +
      `📅 *Check-out:* ${form.checkOut} at ${form.checkOutTime}\n` +
      `🌙 *Duration:* ${nights} night${nights !== 1 ? 's' : ''}\n` +
      `➕ *Add-ons:* ${addOnLabels}\n` +
      `💰 *Estimated Total:* GHS ${totalBase.toLocaleString()}${quoteNote}\n\n` +
      `Please quote your order number *${orderNumber}* in all communications with us.\n\n` +
      `💳 To secure your reservation, please complete your payment here:\n${paypalLink}\n\n` +
      `After payment, kindly reply to this chat with your payment confirmation.\n\n` +
      `Your reservation will be confirmed once payment and availability are verified.\n\n` +
      `📍 *Location:* Tema Community 6, Ghana\n` +
      `📞 *Contact:* +233 542 758 210\n\n` +
      `We look forward to hosting you! 🌟`
    );

    const waAdminUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${adminMessage}`;
    const waGuestUrl = `https://wa.me/${formatPhoneForWhatsApp(form.phone)}?text=${guestMessage}`;

    // Open both windows synchronously, back-to-back, inside the same click
    // handler. Browsers treat window.open() calls made after an `await` or
    // setTimeout as no longer "user-triggered" and are much more likely to
    // block them — so we fire both immediately, before any async work,
    // rather than staggering the second one with a delay.
    window.open(waAdminUrl, '_blank');
    window.open(waGuestUrl, '_blank');

    await new Promise((r) => setTimeout(r, 400));
    setOrderNumber(orderNumber);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="font-display text-2xl font-medium text-foreground mb-3">Booking Form Completed</h2>
        {orderNumber && (
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-5 py-2.5 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Order No.</span>
            <span className="font-mono font-bold text-accent text-base tracking-widest">{orderNumber}</span>
          </div>
        )}
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Thank you, <strong>{form.firstName}</strong>. Your details for the{' '}
          <strong>Two Bedroom Apartment</strong> are ready to send.
          A pre-filled WhatsApp message should have opened for <strong>{form.phone}</strong> — please
          review it and press <strong>Send</strong> to submit your booking request. If it didn't open
          automatically (some browsers block pop-ups), use the button below. Your reservation will only
          be confirmed after we receive that message and verify payment and availability.
        </p>
        <div className="bg-muted rounded-xl p-5 text-left mb-6 space-y-2">
          <div className="flex justify-between text-sm border-b border-border pb-2 mb-1">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-bold text-accent tracking-wider">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Apartment</span>
            <span className="font-semibold text-foreground">Two Bedroom Apartment</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Check-in</span>
            <span className="font-semibold text-foreground">{form.checkIn} at {form.checkInTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Check-out</span>
            <span className="font-semibold text-foreground">{form.checkOut} at {form.checkOutTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Guests</span>
            <span className="font-semibold text-foreground">
              {form.guests}{extraGuests > 0 ? ` (${extraGuests} extra)` : ''}
            </span>
          </div>
          {form.addOns.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Add-ons</span>
              <span className="font-semibold text-foreground text-right">
                {form.addOns.map((id) => addOnOptions.find((a) => a.id === id)?.label).join(', ')}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm border-t border-border pt-2 mt-1">
            <span className="text-muted-foreground">Estimated Total</span>
            <span className="font-semibold text-accent">GHS {totalBase.toLocaleString()}</span>
          </div>
          {hasQuoteOnlyAddOns && (
            <p className="text-xs text-muted-foreground pt-1">
              Some add-ons (laundry / airport pickup) are priced on request and aren't included above —
              we'll confirm those separately.
            </p>
          )}
        </div>

        {/* Payment options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${formatPhoneForWhatsApp(form.phone)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-xl hover:bg-[#1ebe5d] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Open my WhatsApp confirmation
          </a>
          <a
            href={buildPayPalUrl(orderNumber, totalBase)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#003087] text-white font-semibold text-sm rounded-xl hover:bg-[#001f6b] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.71a.641.641 0 0 1 .633-.541h6.964c3.94 0 5.964 1.913 5.964 5.037 0 3.902-3.11 6.784-7.463 6.784H8.24l-1.164 6.347zM19.5 8.44c0 3.5-2.78 6.06-6.66 6.06h-1.85l-.98 5.34h4.09c3.94 0 5.96-1.91 5.96-5.03.94-.13 1.5-.65 1.5-2.28 0-1.63-.98-4.09-2.06-4.09z"/>
            </svg>
            Pay via PayPal
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Payments are processed securely in USD using the current exchange rate — final amount can be confirmed via
          WhatsApp before you pay.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? 'gold-gradient text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ) : s}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s === 1 ? 'Stay Details' : s === 2 ? 'Your Info' : 'Extras'}
              </span>
            </div>
            {s < 3 && <div className={`flex-1 h-px mx-3 transition-all ${step > s ? 'bg-accent' : 'bg-border'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Stay Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium text-foreground mb-5">Stay Details</h2>

            {/* Apartment summary */}
            <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-accent bg-accent/5 mb-5">
              <span className="text-2xl">🏠</span>
              <div>
                <p className="font-semibold text-sm text-accent">Two Bedroom Apartment</p>
                <p className="text-xs text-muted-foreground mt-0.5">Up to 4 guests · GHS 700/night (first 2 guests included)</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Check-in Date</label>
                <input
                  type="date"
                  value={form.checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  required
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
                <select
                  value={form.checkInTime}
                  onChange={(e) => setForm({ ...form, checkInTime: e.target.value })}
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all appearance-none"
                >
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM (Noon)</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM (Standard)</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="22:00">10:00 PM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Check-out Date</label>
                <input
                  type="date"
                  value={form.checkOut}
                  min={form.checkIn || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  required
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
                <select
                  value={form.checkOutTime}
                  onChange={(e) => setForm({ ...form, checkOutTime: e.target.value })}
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all appearance-none"
                >
                  <option value="06:00">6:00 AM</option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM (Standard)</option>
                  <option value="12:00">12:00 PM (Noon)</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                </select>
              </div>
            </div>

            {/* Nights indicator */}
            {nights > 0 && (
              <div className="flex items-center gap-2 mb-5 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="text-sm font-semibold text-accent">{nights} night{nights !== 1 ? 's' : ''}</span>
                <span className="text-sm text-muted-foreground">· Estimated: <strong className="text-foreground">GHS {totalBase.toLocaleString()}</strong></span>
              </div>
            )}

            {/* Guests */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Number of Guests</label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}{n > INCLUDED_GUESTS ? ` (+GHS ${EXTRA_GUEST_RATE}/night per extra guest)` : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            disabled={!form.checkIn || !form.checkOut || nights < 1}
            onClick={() => setStep(2)}
            className="w-full py-4 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue to Your Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      )}

      {/* Step 2: Guest Info */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium text-foreground mb-5">Your Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="First name"
                  required
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Last name"
                  required
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+233 or international format"
                required
                className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1.5">📱 We'll open a pre-filled WhatsApp message to this number for you to send. If dialing from outside Ghana, please include your country code (e.g. +1, +44).</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Nationality</label>
                <input
                  type="text"
                  value={form.nationality}
                  onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  placeholder="e.g. Ghanaian, British"
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Purpose of Stay</label>
                <select
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  className="w-full h-12 bg-input border border-border rounded-xl px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all appearance-none"
                >
                  <option value="">Select purpose</option>
                  <option value="business">Business / Corporate</option>
                  <option value="leisure">Leisure / Vacation</option>
                  <option value="family">Family Visit</option>
                  <option value="medical">Medical</option>
                  <option value="relocation">Relocation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-4 bg-card border border-border text-foreground font-semibold text-sm rounded-xl hover:bg-muted transition-all flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back
            </button>
            <button
              type="button"
              disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
              onClick={() => setStep(3)}
              className="flex-1 py-4 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue to Extras
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Add-ons & Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium text-foreground mb-5">Add-On Services</h2>
            <div className="space-y-3 mb-6">
              {addOnOptions.map((addon) => (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddOn(addon.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                    form.addOns.includes(addon.id)
                      ? 'border-accent bg-accent/5' :'border-border bg-background hover:border-accent/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                      form.addOns.includes(addon.id) ? 'border-accent bg-accent' : 'border-muted-foreground'
                    }`}>
                      {form.addOns.includes(addon.id) && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                    <span className="font-medium text-sm text-foreground">{addon.label}</span>
                  </div>
                  <span className="text-xs text-accent font-semibold">{addon.price}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Special Requests</label>
              <textarea
                value={form.specialRequests}
                onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                placeholder="Dietary requirements, arrival time, early check-in request, etc."
                rows={4}
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 space-y-2">
            <h3 className="font-semibold text-foreground text-sm mb-3">Booking Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Apartment</span>
              <span className="font-medium text-foreground">Two Bedroom Apartment</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dates</span>
              <span className="font-medium text-foreground">{form.checkIn} {form.checkInTime} → {form.checkOut} {form.checkOutTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{nights} nights × GHS {BASE_RATE}</span>
              <span className="font-medium text-foreground">GHS {roomTotal.toLocaleString()}</span>
            </div>
            {extraGuests > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{extraGuests} extra guest{extraGuests !== 1 ? 's' : ''} × GHS {EXTRA_GUEST_RATE} × {nights} night{nights !== 1 ? 's' : ''}</span>
                <span className="font-medium text-foreground">GHS {extraGuestTotal.toLocaleString()}</span>
              </div>
            )}
            {calculableAddOnTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Add-ons (calculated)</span>
                <span className="font-medium text-foreground">GHS {calculableAddOnTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-accent/20 pt-2 flex justify-between text-sm font-semibold">
              <span className="text-foreground">Estimated Total</span>
              <span className="text-accent">GHS {totalBase.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">+ Security deposit (refundable) + cleaning fee. Final invoice sent on confirmation.</p>
            {hasQuoteOnlyAddOns && (
              <p className="text-xs text-amber-600">
                Laundry and/or airport pickup selected — these are priced on request and not included above.
              </p>
            )}
          </div>

          {/* WhatsApp confirmation notice */}
          <div className="flex items-start gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" className="flex-shrink-0 mt-0.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <p className="text-xs text-foreground/80">
              Clicking below will open a pre-filled WhatsApp message with your full booking details — including the payment link — addressed to <strong>{form.phone}</strong>. You'll need to press Send in WhatsApp to actually submit your request.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-4 bg-card border border-border text-foreground font-semibold text-sm rounded-xl hover:bg-muted transition-all flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back
            </button>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex-1 py-4 gold-gradient text-accent-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Send Booking via WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}