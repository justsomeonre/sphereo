'use client';

import React from 'react';
import { Badge } from '../../components/common/Badge';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-sphereo-border pb-4 space-y-1">
        <Badge variant="terracotta" size="sm">
          Platform Governance
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
          Terms of Craftsmanship & Service
        </h1>
        <p className="text-xs text-sphereo-wood/80">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-5 text-xs text-sphereo-charcoal/85 leading-relaxed">
        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            1. Handmade Authenticity & Natural Variations
          </h3>
          <p>
            Handmade crafts inherently exhibit organic variations in color saturation, hand-painted brushwork, natural clay slip grain, and metallic sheen. These variations are the certified hallmark of genuine human handcrafting rather than mass industrial flaws.
          </p>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            2. The Artisan&apos;s Creative Sovereignty
          </h3>
          <p>
            The artisan retains final authority over physical manufacturing feasibility. While SphereO AI generates feasible design proposals based on verified constraints, work begins strictly upon mutual confirmation between the patron and the master artisan.
          </p>
        </div>
      </div>
    </div>
  );
}
