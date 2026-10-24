'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AiStudioForm } from '../../components/ai/AiStudioForm';
import { Badge } from '../../components/common/Badge';
import { Sparkles, ShieldCheck, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react';

function AiStudioInner() {
  const searchParams = useSearchParams();
  const initialArtisanId = searchParams.get('artisan') || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="terracotta" size="sm" className="mb-1">
          Artisan-Aware Intelligence
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sphereo-charcoal tracking-tight">
          SphereO AI Creative Studio
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-sphereo-terracotta">
          “AI that respects human hands.”
        </p>
        <p className="text-xs sm:text-sm text-sphereo-wood/85 max-w-xl mx-auto leading-relaxed">
          Translate your aesthetic ideas into feasible designs grounded in real workshop materials, mineral pigments, and the verified capabilities of master artisans.
        </p>
      </div>

      {/* Main Studio Interaction Form */}
      <AiStudioForm initialArtisanId={initialArtisanId} />

      {/* Educational Charter & Constraint Audit Breakdown */}
      <section id="how-it-works" className="border-t border-sphereo-border pt-12 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <Badge variant="brass" size="sm" className="mb-1">
            Engine Architecture
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
            How Feasibility Auditing Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 bg-sphereo-linen/40 border border-sphereo-border rounded-lg space-y-2">
            <span className="font-serif text-xl font-bold text-sphereo-terracotta block">
              01. Natural Pigments Only
            </span>
            <p className="text-sphereo-wood/85 leading-relaxed">
              If you request synthetic volatile or neon dyes, the engine detects the incompatibility and automatically recommends the artisan’s natural mineral indigo, turmeric, or ochre alternative.
            </p>
          </div>

          <div className="p-6 bg-sphereo-linen/40 border border-sphereo-border rounded-lg space-y-2">
            <span className="font-serif text-xl font-bold text-sphereo-terracotta block">
              02. Material Integrity Rules
            </span>
            <p className="text-sphereo-wood/85 leading-relaxed">
              The engine checks for chemical incompatibilities (such as sterling silver in acidic natural lac resin or plastic fillers in quartz pottery) to protect durability.
            </p>
          </div>

          <div className="p-6 bg-sphereo-linen/40 border border-sphereo-border rounded-lg space-y-2">
            <span className="font-serif text-xl font-bold text-sphereo-terracotta block">
              03. The Artisan Decides
            </span>
            <p className="text-sphereo-wood/85 leading-relaxed">
              A computer-generated preview is never treated as permission to build. Every proposal is submitted to the artisan&apos;s personal studio queue for review and sign-off.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
          >
            <Bookmark size={14} />
            <span>View All My Submitted & Saved Design Proposals →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function AiStudioPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-sphereo-wood">Loading SphereO AI Studio...</div>}>
      <AiStudioInner />
    </Suspense>
  );
}
