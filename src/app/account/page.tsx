'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../lib/store';
import { formatINR } from '../../lib/pricing';
import { Badge } from '../../components/common/Badge';
import {
  Package,
  Sparkles,
  Calendar,
  Heart,
  ChevronRight,
  UserCheck,
  MapPin,
  Clock,
} from 'lucide-react';

export default function AccountPage() {
  const { orders, proposals, bookings, favorites, role } = useSphereoStore();

  const recentOrder = orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-sphereo-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="terracotta" size="sm" className="mb-1">
            Patron Studio Journal
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
            Welcome, Ananya Deshmukh
          </h1>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
            Track commissions, review custom AI design proposals, and manage live artisan consultations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/account/settings"
            className="px-3.5 py-2 border border-sphereo-border rounded text-xs font-semibold text-sphereo-charcoal hover:bg-sphereo-linen transition-colors"
          >
            Account Settings
          </Link>
        </div>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Link
          href="/account/orders"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Package size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {orders.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Active Commissions</span>
          </div>
        </Link>

        <Link
          href="/designs"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {proposals.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">AI Design Proposals</span>
          </div>
        </Link>

        <Link
          href="/account/bookings"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Calendar size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {bookings.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Artisan Consultations</span>
          </div>
        </Link>

        <Link
          href="/favorites"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Heart size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {favorites.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Curated Favorites</span>
          </div>
        </Link>
      </div>

      {/* Recent Commission Highlight */}
      {recentOrder && (
        <section className="bg-sphereo-linen/50 border border-sphereo-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-sphereo-terracotta">
                Most Recent Commission
              </span>
              <span className="text-xs font-semibold text-sphereo-charcoal">
                #{recentOrder.orderNumber}
              </span>
            </div>
            <Link
              href={`/account/orders/${recentOrder.id}`}
              className="text-xs font-bold text-sphereo-terracotta hover:underline flex items-center gap-1"
            >
              <span>View Tracking Timeline</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-sphereo-ivory rounded border border-sphereo-border">
              <span className="text-sphereo-wood/70 block mb-0.5">Current Status</span>
              <strong className="text-sphereo-charcoal text-sm font-serif">
                {recentOrder.status}
              </strong>
            </div>

            <div className="p-3 bg-sphereo-ivory rounded border border-sphereo-border">
              <span className="text-sphereo-wood/70 block mb-0.5">Order Total</span>
              <strong className="text-sphereo-charcoal text-sm font-serif">
                {formatINR(recentOrder.total)}
              </strong>
            </div>

            <div className="p-3 bg-sphereo-ivory rounded border border-sphereo-border">
              <span className="text-sphereo-wood/70 block mb-0.5">Pieces</span>
              <strong className="text-sphereo-charcoal">
                {recentOrder.items.length} Handcrafted item(s)
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* Quick Navigation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            Upcoming Artisan Consultations
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Review your calendar with master craftspeople and access the simulated in-platform video room.
          </p>
          <div className="pt-2">
            <Link
              href="/account/bookings"
              className="inline-flex items-center gap-1 text-xs font-bold text-sphereo-terracotta underline"
            >
              <span>Manage Appointments ({bookings.length}) →</span>
            </Link>
          </div>
        </div>

        <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            Custom AI Design Proposals
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Inspect the status of your submitted design proposals and see notes from the artisans.
          </p>
          <div className="pt-2">
            <Link
              href="/designs"
              className="inline-flex items-center gap-1 text-xs font-bold text-sphereo-terracotta underline"
            >
              <span>View All Submitted Proposals ({proposals.length}) →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
