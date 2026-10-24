'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import { ArrowLeft, Layers, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ArtisanInventoryPage() {
  const { activeArtisanId } = useSphereoStore();
  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];

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
              Material Logistics & Stock
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Raw Materials & Pigments ({artisan.name})
            </h1>
          </div>
        </div>

        <span className="text-xs text-sphereo-wood/75">
          Integrated directly into SphereO AI capability validation matrix
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Raw Materials in Stock */}
        <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
            <span>Primary Craft Base Materials</span>
            <span className="text-[10px] text-emerald-800 font-bold uppercase">Audited</span>
          </h3>

          <div className="space-y-3">
            {artisan.materialsInStock.map((mat) => (
              <div key={mat.name} className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sphereo-charcoal block">{mat.name}</span>
                  <span className="text-[11px] text-sphereo-wood/70">{mat.quantityDesc}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] uppercase">
                  Verified In Stock
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prepared Natural Colors & Pigments */}
        <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
            <span>Active Workshop Color Batches</span>
            <span className="text-[10px] text-sphereo-brass font-bold uppercase">Natural Minerals</span>
          </h3>

          <div className="space-y-2">
            {artisan.capabilities.colors.map((color) => (
              <div key={color} className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded flex items-center justify-between">
                <span className="font-semibold text-sphereo-charcoal">{color}</span>
                <span className="text-[11px] text-sphereo-wood/75">Available for AI Proposals</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
