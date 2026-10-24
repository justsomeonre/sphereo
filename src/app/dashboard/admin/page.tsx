'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../lib/store';
import { ARTISANS } from '../../../data/artisans';
import { PRODUCTS } from '../../../data/products';
import { CRAFTS } from '../../../data/crafts';
import { formatINR } from '../../../lib/pricing';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  ShieldCheck,
  Package,
  Sparkles,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders, proposals } = useSphereoStore();

  const totalCatalogValue = PRODUCTS.reduce((sum, p) => sum + p.basePrice, 0);
  const totalOrdersValue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="charcoal" size="sm" className="mb-1">
            Platform Governance Console
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
            SphereO Platform Administration
          </h1>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
            Global artisan marketplace monitoring, verification reviews, and commission ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="brass" size="sm">
            Demo Analytics Simulation
          </Badge>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Package size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {PRODUCTS.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Active Catalog Pieces</span>
          </div>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Users size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {ARTISANS.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">Master Artisans</span>
          </div>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <TrendingUp size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {formatINR(totalOrdersValue)}
            </span>
            <span className="text-xs text-sphereo-wood/75">Commissions Value</span>
          </div>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-sphereo-charcoal block">
              {proposals.length}
            </span>
            <span className="text-xs text-sphereo-wood/75">AI Design Proposals</span>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        <Link
          href="/dashboard/admin/artisans"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-2 shadow-xs"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Artisan Guild Verifications ({ARTISANS.length}) →
          </span>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Review GI certificates, proof of ancestral lineages, and fair wage compliance.
          </p>
        </Link>

        <Link
          href="/dashboard/admin/products"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-2 shadow-xs"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Catalog Governance ({PRODUCTS.length}) →
          </span>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Inspect product metadata, non-synthetic raw materials, and photo quality.
          </p>
        </Link>

        <Link
          href="/dashboard/admin/orders"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-2 shadow-xs"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            Platform Orders Ledger ({orders.length}) →
          </span>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Audit simulated payment statuses, shipping timelines, and dispute resolutions.
          </p>
        </Link>

        <Link
          href="/dashboard/admin/categories"
          className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg hover:border-sphereo-terracotta/40 transition-colors space-y-2 shadow-xs"
        >
          <span className="font-serif text-base font-bold text-sphereo-charcoal block">
            12 Heritage Craft Categories →
          </span>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Taxonomy mapping, geographic GI regions, and preservation benchmarks.
          </p>
        </Link>
      </div>

      {/* Recent Platform Commissions Table */}
      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4 shadow-xs">
        <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2">
          Recent Platform Commissions
        </h3>

        <div className="divide-y divide-sphereo-border text-xs">
          {orders.map((order) => (
            <div key={order.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sphereo-charcoal">{order.orderNumber}</span>
                <span className="text-sphereo-wood/70 ml-2">
                  Patron: {order.customerName} ({order.customerEmail})
                </span>
                <div className="text-[11px] text-sphereo-wood/80 mt-0.5">
                  Items: {order.items.map((i) => i.productTitle).join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sphereo-linen border border-sphereo-border">
                  {order.status}
                </span>
                <span className="font-serif font-bold text-sphereo-charcoal text-sm">
                  {formatINR(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
