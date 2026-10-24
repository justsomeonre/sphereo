'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSphereoStore } from '../../lib/store';
import { formatINR } from '../../lib/pricing';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';

export default function SavedDesignsPage() {
  const { proposals, addToCart } = useSphereoStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="terracotta" size="sm" className="mb-1">
            Artisan Collaboration Pipeline
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
            My AI Design Proposals ({proposals.length})
          </h1>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-0.5">
            Concepts generated via SphereO AI and currently in review with master craftspeople.
          </p>
        </div>

        <Link
          href="/ai-studio"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors shadow-xs"
        >
          <Sparkles size={13} />
          <span>New AI Concept</span>
        </Link>
      </div>

      {proposals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proposals.map((proposal) => {
            const isApproved = proposal.status === 'Approved';
            const isReady = proposal.status === 'Ready for Review';
            const needsChanges = proposal.status === 'Needs Changes';

            return (
              <div
                key={proposal.id}
                className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-sphereo-terracotta/40 transition-all"
              >
                <div>
                  {/* Proposal Image & Header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-sphereo-sand border-b border-sphereo-border">
                    <Image
                      src={proposal.previewUrl}
                      alt={proposal.productConceptTitle}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs ${
                          isApproved
                            ? 'bg-emerald-600 text-white'
                            : isReady
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-800 text-white'
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span>Artisan: <strong>{proposal.artisanName}</strong></span>
                      <span className="font-serif font-bold text-sphereo-brass">
                        {formatINR(proposal.estimatedPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-sphereo-charcoal leading-snug">
                      {proposal.productConceptTitle}
                    </h3>

                    <p className="text-xs text-sphereo-wood/80 italic font-serif line-clamp-2">
                      “{proposal.customerPrompt}”
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-sphereo-border">
                      <div>
                        <span className="text-sphereo-wood/70 text-[10px] block">Material:</span>
                        <strong className="text-sphereo-charcoal">{proposal.validatedSpecification.material}</strong>
                      </div>
                      <div>
                        <span className="text-sphereo-wood/70 text-[10px] block">Color:</span>
                        <strong className="text-sphereo-charcoal">{proposal.validatedSpecification.color}</strong>
                      </div>
                    </div>

                    {/* Artisan Feedback Notes if present */}
                    {proposal.artisanReviewNotes && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950 space-y-1">
                        <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-800">
                          <CheckCircle2 size={12} />
                          Note from Master {proposal.artisanName}:
                        </span>
                        <p>{proposal.artisanReviewNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0 border-t border-sphereo-border mt-2">
                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-sphereo-wood/70 flex items-center gap-1">
                      <Clock size={12} />
                      Lead time: ~{proposal.estimatedLeadTimeDays} days
                    </span>

                    {isApproved ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          alert(`Design #${proposal.id} added to cart as an approved bespoke creation!`);
                        }}
                      >
                        <ShoppingBag size={13} />
                        <span>Commission Now</span>
                      </Button>
                    ) : (
                      <Link
                        href="/dashboard/artisan/design-requests"
                        className="text-xs text-sphereo-terracotta underline font-semibold"
                      >
                        Simulate Artisan Review →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
          <Sparkles size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            No design proposals yet
          </h3>
          <p className="text-xs text-sphereo-wood/80 max-w-sm mx-auto">
            Use SphereO AI to translate your ideas into feasible, artisan-validated designs.
          </p>
          <div className="pt-2">
            <Link
              href="/ai-studio"
              className="inline-flex items-center gap-1 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold"
            >
              Open SphereO AI Studio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
