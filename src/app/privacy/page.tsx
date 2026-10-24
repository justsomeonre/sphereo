'use client';

import React from 'react';
import { Badge } from '../../components/common/Badge';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sphereo-border pb-4 space-y-1">
        <Badge variant="terracotta" size="sm">
          Privacy Policy
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
          Privacy & Data Protection Charter
        </h1>
        <p className="text-xs text-sphereo-wood/80">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-5 text-xs text-sphereo-charcoal/85 leading-relaxed">
        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            1. Respect for Patron and Artisan Data
          </h3>
          <p>
            SphereO operates on strict privacy-first principles. We collect only the information required to facilitate authentic craft commissions, delivery logistics, and consultation scheduling. We never sell or monetize patron or maker data to third-party ad networks.
          </p>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            2. Local Prototype Mode
          </h3>
          <p>
            This application runs in safe demo mode without external telemetry tracking. Orders, customized designs, and consultation bookings are stored locally within your browser session (via localStorage) and can be cleared at any time via the Demo Role Switcher.
          </p>
        </div>
      </div>
    </div>
  );
}
