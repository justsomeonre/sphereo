'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../lib/store';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  Video,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  XCircle,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export default function AccountBookingsPage() {
  const { bookings, cancelBooking } = useSphereoStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="terracotta" size="sm" className="mb-0.5">
              Live Artisan Sessions
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Consultation Appointments ({bookings.length})
            </h1>
          </div>
        </div>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sphereo-border pb-3 text-xs">
                <div>
                  <span className="font-serif text-base font-bold text-sphereo-charcoal">
                    Session with {booking.artisanName}
                  </span>
                  <span className="text-sphereo-wood/75 block">
                    Guild: {booking.craftName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-sphereo-wood/70 flex items-center gap-1">
                    <Calendar size={13} className="text-sphereo-terracotta" />
                    Appointment Date
                  </span>
                  <strong className="text-sphereo-charcoal text-sm font-serif">
                    {booking.date}
                  </strong>
                </div>

                <div className="space-y-1">
                  <span className="text-sphereo-wood/70 flex items-center gap-1">
                    <Clock size={13} className="text-sphereo-terracotta" />
                    Time Slot (IST)
                  </span>
                  <strong className="text-sphereo-charcoal text-sm font-serif">
                    {booking.timeSlot}
                  </strong>
                </div>

                <div className="space-y-1">
                  <span className="text-sphereo-wood/70 block">Discussion Topic</span>
                  <strong className="text-sphereo-charcoal truncate block">
                    {booking.topic}
                  </strong>
                </div>
              </div>

              {/* Patron's Brief */}
              <div className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded text-xs space-y-1">
                <span className="font-semibold text-sphereo-charcoal">Design Brief Shared:</span>
                <p className="text-sphereo-wood/85 italic font-serif">
                  “{booking.brief}”
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-sphereo-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {booking.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Cancel this consultation appointment?')) {
                          cancelBooking(booking.id);
                        }
                      }}
                      className="text-xs text-sphereo-charcoal/60 hover:text-red-700 underline"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>

                {booking.status === 'Confirmed' ? (
                  <Link
                    href={booking.meetingLink || `/consultation/${booking.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-sphereo-terracotta text-white font-semibold text-xs hover:bg-sphereo-terracotta-dark transition-colors shadow-xs"
                  >
                    <Video size={14} />
                    <span>Enter Simulated Video Consultation Room</span>
                  </Link>
                ) : (
                  <span className="text-xs text-stone-500">Appointment Cancelled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
          <Calendar size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            No consultations scheduled
          </h3>
          <p className="text-xs text-sphereo-wood/80 max-w-sm mx-auto">
            Book a 45-minute face-to-face video consultation with any master artisan to discuss custom motifs or sizing.
          </p>
          <div className="pt-2">
            <Link
              href="/artisans"
              className="inline-flex items-center gap-1 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold"
            >
              Browse Artisan Guilds
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
