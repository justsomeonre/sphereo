'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../../components/common/Logo';
import { Badge } from '../../components/common/Badge';
import { ShieldCheck, HeartHandshake, Sparkles, Flame, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Brand Mission Header */}
      <div className="text-center space-y-4">
        <Badge variant="terracotta" size="sm">
          SphereO Brand Identity & Philosophy
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sphereo-charcoal">
          AI That Respects Human Hands.
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-sphereo-terracotta max-w-xl mx-auto">
          Technology should expand the possibilities of human craftsmanship, not replace the people behind it.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-sphereo-charcoal/90 font-sans border-y border-sphereo-border py-8">
        <p>
          SphereO was founded on a singular realization: true luxury is not mass-produced uniformity. It is the unhurried touch of an artisan who understands the temper of acacia charcoal embers, the exact drying tempo of quartz powder, or the breathing rate of a five-year-old living indigo vat.
        </p>
        <p>
          For centuries, master craftspeople across Rajasthan, Kutch, Bengal, and Uttar Pradesh have preserved techniques that cannot be replicated by silicon or conveyor belts. Yet traditional artisans have historically faced exploitative middlemen, limited geographic reach, and an opaque global market.
        </p>
        <p>
          SphereO changes this equation. We pair verified GI master craftspeople directly with patrons around the world. And through <strong>SphereO AI</strong>, we provide a collaborative design engine that honors physical constraints: auditing raw material stock, chemical compatibility, and kiln rules before any custom piece is commissioned.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <div className="w-8 h-8 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <HeartHandshake size={16} />
          </div>
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            Dignified Fair Wages
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Artisans set their own pricing and production effort. 100% of the craft fee is deposited directly into artisan guild accounts.
          </p>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <div className="w-8 h-8 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <ShieldCheck size={16} />
          </div>
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            Ancestral Verification
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Every artisan on SphereO is vetted for genuine lineage knowledge, authentic GI certification, and zero synthetic shortcuts.
          </p>
        </div>

        <div className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2">
          <div className="w-8 h-8 rounded-full bg-sphereo-linen flex items-center justify-center text-sphereo-terracotta">
            <Sparkles size={16} />
          </div>
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            Ethical Intelligence
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            SphereO AI never promises physical manufacturability without artisan approval. The human maker retains final authority.
          </p>
        </div>
      </div>

      {/* Direct CTA */}
      <div className="p-8 bg-sphereo-linen/60 border border-sphereo-border rounded-lg text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-sphereo-charcoal">
          Experience Living Indian Heritage Today
        </h3>
        <p className="text-xs text-sphereo-wood/80 max-w-md mx-auto">
          Explore our collection of over 300 distinctive pieces or co-create with a master artisan.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/discover"
            className="px-6 py-2.5 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors"
          >
            Explore Catalog
          </Link>
          <Link
            href="/ai-studio"
            className="px-6 py-2.5 bg-sphereo-charcoal text-white rounded text-xs font-semibold hover:bg-sphereo-charcoal/90 transition-colors"
          >
            Try AI Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
