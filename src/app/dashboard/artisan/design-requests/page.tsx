'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { formatINR } from '../../../../lib/pricing';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react';

export default function ArtisanDesignRequestsPage() {
  const { activeArtisanId, proposals, updateProposalStatus } = useSphereoStore();

  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];
  const artisanProposals = proposals.filter((p) => p.artisanId === artisan.id);

  const [reviewNote, setReviewNote] = useState('Approved for production. Kusmi lac batch is seasoned and ready.');
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  const handleApprove = (proposalId: string) => {
    updateProposalStatus(
      proposalId,
      'Approved',
      reviewNote || 'Approved for studio production by Master Artisan.'
    );
    setActiveReviewId(null);
    alert('Design Proposal approved! Patron has been notified and production stage unlocked.');
  };

  const handleReject = (proposalId: string) => {
    const reason = prompt('Please provide reason for declining custom production:') || 'Requested dimensions exceed kiln capacity.';
    updateProposalStatus(proposalId, 'Rejected', `Declined by artisan: ${reason}`);
    setActiveReviewId(null);
  };

  const handleRequestChanges = (proposalId: string) => {
    const note = prompt('Enter recommended modifications for patron:') || 'Please select natural cobalt rather than chemical synthetic blue.';
    updateProposalStatus(proposalId, 'Needs Changes', note, ['Use natural mineral cobalt wash']);
    setActiveReviewId(null);
  };

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
              AI Review & Authorization Queue
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Custom Proposals for {artisan.name} ({artisanProposals.length})
            </h1>
          </div>
        </div>

        <span className="text-xs text-sphereo-wood/75">
          Master Artisan holds 100% final creative & manufacturing approval
        </span>
      </div>

      {artisanProposals.length > 0 ? (
        <div className="space-y-6">
          {artisanProposals.map((prop) => {
            const isApproved = prop.status === 'Approved';
            const isRejected = prop.status === 'Rejected';
            const isReviewing = activeReviewId === prop.id;

            return (
              <div
                key={prop.id}
                className="bg-sphereo-ivory border-2 border-sphereo-border rounded-lg p-6 sm:p-8 space-y-6 shadow-sm"
              >
                {/* Header & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sphereo-border pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold text-sphereo-terracotta">
                        Proposal #{prop.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRejected
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-sphereo-charcoal mt-1">
                      {prop.productConceptTitle}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-sphereo-wood/70 block">Estimated Patron Price</span>
                    <span className="font-serif text-2xl font-bold text-sphereo-charcoal">
                      {formatINR(prop.estimatedPrice)}
                    </span>
                  </div>
                </div>

                {/* Body Details: Visual + Specs */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4 relative aspect-square rounded-md overflow-hidden bg-sphereo-linen/50 border border-sphereo-border">
                    <Image
                      src={prop.previewUrl}
                      alt={prop.productConceptTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-4 text-xs">
                    {/* Patron Inspiration Prompt */}
                    <div className="p-3 bg-sphereo-linen/50 rounded border border-sphereo-border space-y-1">
                      <span className="font-bold text-sphereo-charcoal block">
                        Patron&apos;s Creative Brief ({prop.customerName}):
                      </span>
                      <p className="italic text-sphereo-charcoal/85 font-serif text-xs leading-relaxed">
                        “{prop.customerPrompt}”
                      </p>
                    </div>

                    {/* Validated Specs */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-sphereo-ivory border border-sphereo-border rounded">
                      <div>
                        <span className="text-sphereo-wood/70 block">Material Base:</span>
                        <strong className="text-sphereo-charcoal">{prop.validatedSpecification.material}</strong>
                      </div>
                      <div>
                        <span className="text-sphereo-wood/70 block">Color Formulation:</span>
                        <strong className="text-sphereo-charcoal">{prop.validatedSpecification.color}</strong>
                      </div>
                      <div>
                        <span className="text-sphereo-wood/70 block">Technique:</span>
                        <strong className="text-sphereo-charcoal">{prop.validatedSpecification.technique}</strong>
                      </div>
                      <div>
                        <span className="text-sphereo-wood/70 block">Estimated Lead Time:</span>
                        <strong className="text-sphereo-charcoal">~{prop.estimatedLeadTimeDays} Days</strong>
                      </div>
                    </div>

                    {/* Active Review Notes */}
                    {prop.artisanReviewNotes && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                        <strong>Recorded Artisan Note:</strong> {prop.artisanReviewNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Artisan Approval Actions Bar */}
                {!isApproved && !isRejected && (
                  <div className="pt-4 border-t border-sphereo-border space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-sphereo-charcoal">
                        Master Artisan Note / Sign-Off Comments:
                      </label>
                      <input
                        type="text"
                        value={reviewNote}
                        onChange={(e) => setReviewNote(e.target.value)}
                        placeholder="e.g. Approved. Natural kusmi resin prepared; casting scheduled for Tuesday."
                        className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs text-sphereo-charcoal focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleApprove(prop.id)}
                      >
                        <CheckCircle2 size={15} />
                        <span>Approve Custom Production</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => handleRequestChanges(prop.id)}
                      >
                        <AlertTriangle size={15} />
                        <span>Request Material / Sizing Changes</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        className="text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(prop.id)}
                      >
                        <XCircle size={15} />
                        <span>Decline Proposal</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
          <Sparkles size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            No design requests awaiting review
          </h3>
          <p className="text-xs text-sphereo-wood/80 max-w-sm mx-auto">
            When patrons submit creative ideas to {artisan.name}&apos;s studio from the SphereO AI Studio, they will appear here for verification.
          </p>
        </div>
      )}
    </div>
  );
}
