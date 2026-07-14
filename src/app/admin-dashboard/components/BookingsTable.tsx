'use client';
import React, { useState } from 'react';

type BookingStatus = 'pending' | 'confirmed' | 'occupied' | 'declined' | 'completed';

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  apartment: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalGHS: number;
  status: BookingStatus;
  purpose: string;
  submittedAt: string;
  notes: string;
}

const mockBookings: Booking[] = [
  { id: 'ESS-001', guestName: 'Kwame Asante', email: 'k.asante@email.com', phone: '+233 244 123 456', apartment: 'One Bedroom', checkIn: '2026-07-15', checkOut: '2026-08-14', nights: 30, guests: 1, totalGHS: 10850, status: 'confirmed', purpose: 'Business', submittedAt: '2026-07-10', notes: 'Late check-in requested (after 6pm)' },
  { id: 'ESS-002', guestName: 'Abena Mensah', email: 'abena.m@gmail.com', phone: '+44 7700 900 123', apartment: 'Two Bedroom', checkIn: '2026-07-20', checkOut: '2026-07-30', nights: 10, guests: 3, totalGHS: 7400, status: 'pending', purpose: 'Family Visit', submittedAt: '2026-07-12', notes: 'Needs airport pickup from KIA' },
  { id: 'ESS-003', guestName: 'James Osei-Bonsu', email: 'j.osei@corp.gh', phone: '+233 302 987 654', apartment: 'One Bedroom', checkIn: '2026-07-01', checkOut: '2026-07-31', nights: 30, guests: 1, totalGHS: 10850, status: 'occupied', purpose: 'Business', submittedAt: '2026-06-25', notes: 'Monthly corporate rate. Repeat guest.' },
  { id: 'ESS-004', guestName: 'Efua Darko', email: 'edarko@health.gh', phone: '+233 277 456 789', apartment: 'One Bedroom', checkIn: '2026-08-01', checkOut: '2026-09-12', nights: 42, guests: 1, totalGHS: 15120, status: 'pending', purpose: 'Medical', submittedAt: '2026-07-13', notes: 'Medical rotation. Needs laundry service.' },
  { id: 'ESS-005', guestName: 'Michael Tetteh', email: 'mtetteh@gmail.com', phone: '+1 212 555 0198', apartment: 'Two Bedroom', checkIn: '2026-06-10', checkOut: '2026-06-24', nights: 14, guests: 4, totalGHS: 10360, status: 'completed', purpose: 'Leisure', submittedAt: '2026-06-05', notes: 'Family vacation. Requested extra towels.' },
  { id: 'ESS-006', guestName: 'Ama Boateng', email: 'ama.b@expat.com', phone: '+233 555 321 987', apartment: 'Two Bedroom', checkIn: '2026-07-25', checkOut: '2026-07-28', nights: 3, guests: 2, totalGHS: 2220, status: 'declined', purpose: 'Leisure', submittedAt: '2026-07-11', notes: 'Dates unavailable — unit already booked.' },
];

const statusConfig: Record<BookingStatus, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-orange-50 text-orange-700 border-orange-200' },
  confirmed: { label: 'Confirmed', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  occupied: { label: 'Occupied', classes: 'bg-green-50 text-green-700 border-green-200' },
  declined: { label: 'Declined', classes: 'bg-red-50 text-red-700 border-red-200' },
  completed: { label: 'Completed', classes: 'bg-gray-50 text-gray-600 border-gray-200' },
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const updateStatus = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filtered = filterStatus === 'all' ? bookings : bookings.filter((b) => b.status === filterStatus);

  return (
    <>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-border">
          <h2 className="font-display text-xl font-medium text-foreground">All Reservations</h2>
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'occupied', 'completed', 'declined'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`tab-pill capitalize text-xs ${filterStatus === s ? 'tab-pill-active' : 'tab-pill-inactive'}`}
              >
                {s === 'all' ? `All (${bookings.length})` : `${s} (${bookings.filter(b => b.status === s).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Guest</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Apartment</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dates</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((booking) => (
                <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{booking.guestName}</p>
                      <p className="text-xs text-muted-foreground">{booking.email}</p>
                      <p className="text-xs text-muted-foreground">{booking.phone}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-foreground">{booking.apartment}</p>
                    <p className="text-xs text-muted-foreground">{booking.guests} guest{booking.guests > 1 ? 's' : ''} · {booking.purpose}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-foreground">{booking.checkIn}</p>
                    <p className="text-xs text-muted-foreground">→ {booking.checkOut}</p>
                    <p className="text-xs text-accent font-medium">{booking.nights} nights</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-display text-base font-medium text-foreground">GHS {booking.totalGHS.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {booking.submittedAt}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[booking.status].classes}`}>
                      {statusConfig[booking.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-3 py-1.5 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-border transition-colors"
                      >
                        View
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, 'declined')}
                            className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'occupied')}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          Mark Occupied
                        </button>
                      )}
                      {booking.status === 'occupied' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'completed')}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No bookings found for this filter.</div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-border">
          {filtered.map((booking) => (
            <div key={booking.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{booking.guestName}</p>
                  <p className="text-xs text-muted-foreground">{booking.apartment} · {booking.nights} nights</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[booking.status].classes}`}>
                  {statusConfig[booking.status].label}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{booking.checkIn} → {booking.checkOut}</span>
                <span className="font-display text-sm font-medium text-foreground">GHS {booking.totalGHS.toLocaleString()}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="px-3 py-1.5 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-border transition-colors"
                >
                  View Details
                </button>
                {booking.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(booking.id, 'confirmed')} className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">Accept</button>
                    <button onClick={() => updateStatus(booking.id, 'declined')} className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">Decline</button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <button onClick={() => updateStatus(booking.id, 'occupied')} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">Mark Occupied</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-medium text-foreground">{selectedBooking.guestName}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{selectedBooking.id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-border transition-colors"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Email', value: selectedBooking.email },
                  { label: 'Phone', value: selectedBooking.phone },
                  { label: 'Apartment', value: selectedBooking.apartment },
                  { label: 'Guests', value: `${selectedBooking.guests} guest${selectedBooking.guests > 1 ? 's' : ''}` },
                  { label: 'Check-in', value: selectedBooking.checkIn },
                  { label: 'Check-out', value: selectedBooking.checkOut },
                  { label: 'Nights', value: `${selectedBooking.nights} nights` },
                  { label: 'Purpose', value: selectedBooking.purpose },
                  { label: 'Total', value: `GHS ${selectedBooking.totalGHS.toLocaleString()}` },
                  { label: 'Submitted', value: selectedBooking.submittedAt },
                ].map((item) => (
                  <div key={item.label} className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {selectedBooking.notes && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm text-foreground">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig[selectedBooking.status].classes}`}>
                  {statusConfig[selectedBooking.status].label}
                </span>
                <div className="flex gap-2 flex-1 justify-end">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(selectedBooking.id, 'confirmed')} className="px-4 py-2 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200 hover:bg-green-100 transition-colors">Accept</button>
                      <button onClick={() => updateStatus(selectedBooking.id, 'declined')} className="px-4 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200 hover:bg-red-100 transition-colors">Decline</button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button onClick={() => updateStatus(selectedBooking.id, 'occupied')} className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">Mark Occupied</button>
                  )}
                  {selectedBooking.status === 'occupied' && (
                    <button onClick={() => updateStatus(selectedBooking.id, 'completed')} className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">Mark Completed</button>
                  )}
                  <a
                    href={`https://wa.me/${selectedBooking.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(selectedBooking.guestName)}%2C%20regarding%20your%20booking%20${selectedBooking.id}%20at%20Extended%20Stay%20Suite.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366]/10 text-[#25D366] text-xs font-semibold rounded-lg border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}