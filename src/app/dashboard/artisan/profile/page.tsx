'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import { ArrowLeft, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function ArtisanProfileSettingsPage() {
  const { activeArtisanId } = useSphereoStore();
  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/artisan"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="terracotta" size="sm" className="mb-0.5">
              Guild Profile Settings
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Profile & Constraints: {artisan.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-xs">
        <div className="lg:col-span-4 bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-sphereo-terracotta mx-auto">
            <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">{artisan.name}</h3>
            <p className="text-sphereo-wood/80">{artisan.craftName}</p>
            <p className="text-sphereo-wood/70 flex items-center justify-center gap-1">
              <MapPin size={12} />
              {artisan.region}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2">
            Artisan-Defined AI Restrictions & Rules
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            These rules are enforced by SphereO AI when evaluating patron prompts:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded">
              <span className="font-bold text-sphereo-charcoal block">Allows Custom Sizing:</span>
              <p className="text-sphereo-wood/80">{artisan.capabilities.customizationRules.allowsCustomSize ? 'Yes — footwheel and lathe dimensions are adaptable.' : 'No — fixed traditional molds.'}</p>
            </div>

            <div className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded">
              <span className="font-bold text-sphereo-charcoal block">Allows Custom Inscription/Engraving:</span>
              <p className="text-sphereo-wood/80">{artisan.capabilities.customizationRules.allowsEngraving ? 'Yes — hand-inscribed by artisan.' : 'Not supported for this craft technique.'}</p>
            </div>

            {artisan.capabilities.customizationRules.disallowedCombinations && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-950 space-y-1">
                <span className="font-bold text-red-900 block">Disallowed Combinations:</span>
                {artisan.capabilities.customizationRules.disallowedCombinations.map((d, i) => (
                  <p key={i}>
                    • <strong>{d.material}:</strong> {d.reason}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
