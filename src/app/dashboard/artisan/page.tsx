'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSphereoStore } from '../../../lib/store';
import { ARTISANS } from '../../../data/artisans';
import { PRODUCTS } from '../../../data/products';
import { formatINR } from '../../../lib/pricing';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  Sparkles,
  Package,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  UserCheck,
} from 'lucide-react';

export default function ArtisanDashboardPage() {
  const { activeArtisanId, selectActiveArtisan, proposals, orders, bookings } = useSphereoStore();

  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];
  const pendingProposals = proposals.filter((p) => p.artisanId === artisan.id && p.status === 'Ready for Review');
  const artisanOrders = orders.filter((o) => o.items.some((i) => i.artisanId === artisan.id));
  const artisanBookings = bookings.filter((b) => b.artisanId === artisan.id);
  const artisanProducts = PRODUCTS.filter((p) => p.artisanId === artisan.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Studio Header Banner */}
      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sphereo-terracotta shrink-0">
            <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="terracotta" size="sm">
                Artisan Studio Console
              </Badge>
              {artisan.isVerified && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} />
                  Verified GI Master
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal mt-1">
              Master {artisan.name}&apos;s Studio
            </h1>
            <p className="text-xs text-sphereo-wood/80">
              {artisan.craftName} • {artisan.region}
            </p>
          </div>
        </div>

        {/* Switch demo artisan profile */}
        <div className="text-xs space-y-1 sm:text-right">
          <span className="text-sphereo-wood/70 block">Active Master Guild Persona:</span>
          <select
            value={activeArtisanId}
            onChange={(e) => selectActiveArtisan(e.target.value)}
            className="p-2 bg-sphereo-linen border border-sphereo-border rounded text-xs text-sphereo-charcoal font-semibold focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
          >
            {ARTISANS.slice(0, 8).map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.craftName.split('&')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Link
          href="/dashboard/artisan/design-requests"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2 relative"
        >
          {pendingProposals.length > 0 && (
            <span className="absolute top-3 right-3 bg-sphereo-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {pendingProposals.length} Action Needed
            </span>
          )}
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {pendingProposals.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">AI Designs Awaiting Review</span>
          </div>
        </Link>

        <Link
          href="/dashboard/artisan/orders"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Package size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {artisanOrders.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Active Commissions</span>
          </div>
        </Link>

        <Link
          href="/dashboard/artisan/bookings"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-2"
        >
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Calendar size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {artisanBookings.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Patron Consultations</span>
          </div>
        </Link>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Layers size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {artisanProducts.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Listed Catalog Pieces</span>
          </div>
        </div>
      </div>

      {/* Urgent AI Review Queue Highlight */}
      <div className="bg-sphereo-linen/50 border border-sphereo-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-sphereo-terracotta">
              Mandatory Artisan Authority
            </span>
            <h2 className="font-serif text-lg font-bold text-sphereo-charcoal">
              AI Design Proposals Awaiting Sign-Off ({pendingProposals.length})
            </h2>
          </div>

          <Link
            href="/dashboard/artisan/design-requests"
            className="text-xs font-bold text-sphereo-terracotta hover:underline flex items-center gap-1"
          >
            <span>Open Dedicated Review Queue</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {pendingProposals.length > 0 ? (
          <div className="space-y-3">
            {pendingProposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-sphereo-ivory border border-sphereo-border rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-xs"
              >
                <div className="space-y-1">
                  <span className="font-bold text-sphereo-charcoal text-sm font-serif">
                    {prop.productConceptTitle}
                  </span>
                  <p className="text-sphereo-wood/80 italic font-serif">
                    “{prop.customerPrompt}”
                  </p>
                  <div className="text-[11px] text-sphereo-wood/75">
                    Patron: <strong>{prop.customerName}</strong> • Color: {prop.validatedSpecification.color} • Material: {prop.validatedSpecification.material}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif font-bold text-sphereo-charcoal text-sm">
                    {formatINR(prop.estimatedPrice)}
                  </span>
                  <Link
                    href="/dashboard/artisan/design-requests"
                    className="px-3.5 py-1.5 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors"
                  >
                    Inspect & Approve
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-sphereo-wood/80">
            No pending AI design proposals awaiting review for this artisan studio. You can generate a new one from the AI Studio.
          </p>
        )}
      </div>

      {/* Navigation Sub-Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
        <Link
          href="/dashboard/artisan/orders"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-1.5"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Manage Order Production Stages →
          </span>
          <p className="text-sphereo-wood/80">
            Advance fulfillment timeline from Material Preparation to Crafting and Quality Check.
          </p>
        </Link>

        <Link
          href="/dashboard/artisan/inventory"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-1.5"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Material & Pigment Inventory →
          </span>
          <p className="text-sphereo-wood/80">
            Audit in-stock resin, raw clay, natural dyes, and metal alloys for the capability engine.
          </p>
        </Link>

        <Link
          href="/dashboard/artisan/profile"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-1.5"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Artisan Profile & Constraints →
          </span>
          <p className="text-sphereo-wood/80">
            Configure consultation availability, lead times, and disallowed chemical material combinations.
          </p>
        </Link>
      </div>
    </div>
  );
}
