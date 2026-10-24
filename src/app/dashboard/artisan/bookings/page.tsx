'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import { Video, Calendar, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ArtisanBookingsPage() {
  const { activeArtisanId, bookings } = useSphereoStore();
  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];

  const artisanBookings = bookings.filter((b) => b.artisanId === artisan.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/artisan"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="terracotta" size="sm" className="mb-0.5">
              Live Consultations
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Appointments for {artisan.name} ({artisanBookings.length})
            </h1>
          </div>
        </div>

        <span className="text-xs text-sphereo-wood/75">
          Dedicated 45-min video consultations booked by patrons
        </span>
      </div>

      {artisanBookings.length > 0 ? (
        <div className="space-y-4">
          {artisanBookings.map((b) => (
            <div
              key={b.id}
              className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sphereo-border pb-3 text-xs">
                <div>
                  <span className="font-bold text-sphereo-charcoal text-sm font-serif">
                    Patron: {b.customerName}
                  </span>
                  <span className="text-sphereo-wood/70 ml-2">
                    Topic: {b.topic}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-sphereo-wood/70 flex items-center gap-1">
                    <Calendar size={13} className="text-sphereo-terracotta" />
                    Scheduled Date & Time
                  </span>
                  <strong className="text-sphereo-charcoal">
                    {b.date} • {b.timeSlot} ({b.timezone})
                  </strong>
                </div>

                <div className="space-y-1">
                  <span className="text-sphereo-wood/70">Patron Design Brief</span>
                  <p className="text-sphereo-wood/85 italic font-serif">
                    “{b.brief}”
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-sphereo-border flex justify-end">
                <Link
                  href={b.meetingLink || `/consultation/${b.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors shadow-xs"
                >
                  <Video size={14} />
                  <span>Join Simulated Consultation as Artisan</span>
                </Link>
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
            Patrons can book available time slots directly from your public artisan profile.
          </p>
        </div>
      )}
    </div>
  );
}
