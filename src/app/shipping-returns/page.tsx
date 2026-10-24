'use client';

import React from 'react';
import { Badge } from '../../components/common/Badge';
import { Truck, ShieldCheck, RefreshCw, Package } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-sphereo-border pb-6 space-y-2">
        <Badge variant="terracotta" size="sm">
          Transit & Policies
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
          Insured Shipping & Return Guarantee
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80">
          How we safely pack, insure, and deliver delicate handcrafted heirlooms to your doorstep.
        </p>
      </div>

      <div className="space-y-6 text-xs text-sphereo-charcoal/90 leading-relaxed">
        <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-3 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal flex items-center gap-2">
            <Truck size={16} className="text-sphereo-terracotta" />
            <span>Door-to-Door Insured Shipping</span>
          </h3>
          <p>
            Every piece crafted on SphereO is packaged in custom museum-grade archival boxes with biodegradable honeycomb wrap. All consignments are 100% insured against transit breakage or loss. Orders above ₹1,999 qualify for complimentary domestic express shipping across India.
          </p>
        </div>

        <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-3 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal flex items-center gap-2">
            <RefreshCw size={16} className="text-sphereo-terracotta" />
            <span>Returns on Ready-to-Ship Items</span>
          </h3>
          <p>
            Ready-to-ship catalog items can be returned within 7 days of delivery in their original unblemished condition and packaging. Due to the bespoke labor and raw material investment, personalized and custom-made creations are non-refundable once the artisan begins physical production, unless transit damage is verified.
          </p>
        </div>

        <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-3 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-700" />
            <span>Transit Damage Guarantee</span>
          </h3>
          <p>
            In the rare event that ceramic, terracotta, or lac items arrive damaged, simply share an unboxing photograph within 48 hours. The artisan guild will immediately handcraft a complimentary replacement or issue a full settlement.
          </p>
        </div>
      </div>
    </div>
  );
}
