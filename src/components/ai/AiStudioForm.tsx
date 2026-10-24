'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISANS } from '../../data/artisans';
import { CRAFTS } from '../../data/crafts';
import { DesignProposal } from '../../lib/types';
import { generateDesignProposal } from '../../lib/ai-engine';
import { useSphereoStore } from '../../lib/store';
import { formatINR } from '../../lib/pricing';
import { Button } from '../common/Button';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Send,
  Bookmark,
  RefreshCw,
  Info,
} from 'lucide-react';

const SAMPLE_PROMPTS = [
  {
    title: 'Starry Sky Lac Bangles',
    prompt: 'I want a traditional Rajasthani lac bangle set inspired by the night sky, in deep indigo, with tiny brass and gold details, designed for a wedding gift.',
    artisanId: 'artisan-ramesh-chandra',
  },
  {
    title: 'Persian Blue Quartz Urn',
    prompt: 'A large floral blue pottery vase painted with cobalt blue and turquoise poppy vines for our living room mantlepiece.',
    artisanId: 'artisan-leela-devi',
  },
  {
    title: 'Alluvial Terracotta Planter',
    prompt: 'River clay hand-fluted planter in natural earthen rust with red ochre pebble-burnished finish for bonsai botanicals.',
    artisanId: 'artisan-arjun-prajapati',
  },
  {
    title: 'Ajrakh Indigo Stole',
    prompt: 'A geometric double-sided Ajrakh modal silk stole in fermented indigo and madder red with star motifs.',
    artisanId: 'artisan-mukesh-khatri',
  },
  {
    title: 'Incompatible Test: Electric Blue & Plastic',
    prompt: 'I want neon electric blue lac bangles with synthetic polymer stones and acrylic coating.',
    artisanId: 'artisan-ramesh-chandra',
  },
];

interface AiStudioFormProps {
  initialArtisanId?: string;
}

export const AiStudioForm: React.FC<AiStudioFormProps> = ({ initialArtisanId }) => {
  const { addProposal } = useSphereoStore();

  const [selectedArtisanId, setSelectedArtisanId] = useState(
    initialArtisanId || 'artisan-ramesh-chandra'
  );
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeProposal, setActiveProposal] = useState<DesignProposal | null>(null);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const selectedArtisan = ARTISANS.find((a) => a.id === selectedArtisanId) || ARTISANS[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setSubmitFeedback(null);

    // Simulate AI parsing, capability audit, and constraint validation
    setTimeout(() => {
      const proposal = generateDesignProposal(
        'cust-demo-1',
        'Ananya Deshmukh',
        selectedArtisanId,
        prompt.trim()
      );
      setActiveProposal(proposal);
      setIsGenerating(false);
    }, 900);
  };

  const handleSubmitToArtisan = () => {
    if (!activeProposal) return;
    addProposal(activeProposal);
    setSubmitFeedback(
      `Proposal #${activeProposal.id} has been submitted directly to Master ${activeProposal.artisanName}'s studio queue for verification!`
    );
  };

  return (
    <div className="space-y-10">
      {/* Prompt Interface Card */}
      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 sm:p-8 shadow-card">
        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Artisan Selector & Philosophy Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-sphereo-border pb-6">
            <div className="md:col-span-6 space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-sphereo-charcoal">
                1. Select Master Artisan & Craft Guild
              </label>
              <select
                value={selectedArtisanId}
                onChange={(e) => {
                  setSelectedArtisanId(e.target.value);
                  setActiveProposal(null);
                }}
                className="w-full p-2.5 bg-sphereo-linen/50 border border-sphereo-border rounded text-sm text-sphereo-charcoal focus:outline-none focus:ring-2 focus:ring-sphereo-terracotta/40 font-medium"
              >
                {ARTISANS.slice(0, 12).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.craftName} ({a.region})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-6 bg-sphereo-linen/50 p-3.5 rounded border border-sphereo-border text-xs flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sphereo-charcoal">Artisan-Aware Capability Matrix</strong>
                <p className="text-sphereo-wood/75 mt-0.5">
                  SphereO AI validates your idea against {selectedArtisan.name}&apos;s verified materials, oven temperatures, allowable natural pigments, and tool capacities.
                </p>
              </div>
            </div>
          </div>

          {/* Prompt Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal">
                2. Describe Your Dream Creation
              </label>
              <span className="text-xs text-sphereo-wood/70">
                Mention colors, materials, occasions, or memories
              </span>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your design in detail. e.g., 'A pair of traditional indigo lac bangles with fine brass micro-studs inspired by a clear starry night...'"
                className="w-full p-4 bg-sphereo-ivory border border-sphereo-border rounded-md text-sm text-sphereo-charcoal focus:outline-none focus:ring-2 focus:ring-sphereo-terracotta/40 placeholder:text-sphereo-charcoal/40 leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Sample Inspiration Chips */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-sphereo-wood/70">
              Or explore vetted test prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((sample) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => {
                    setPrompt(sample.prompt);
                    setSelectedArtisanId(sample.artisanId);
                    setActiveProposal(null);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-sphereo-linen hover:bg-sphereo-sand border border-sphereo-border text-sphereo-charcoal transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={11} className="text-sphereo-terracotta" />
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate CTA Button */}
          <div className="pt-2 flex items-center justify-between">
            <p className="text-xs text-sphereo-wood/70 italic flex items-center gap-1.5">
              <Info size={13} />
              AI checks feasibility; the artisan maintains final manufacturing approval.
            </p>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isGenerating}
            >
              <Sparkles size={16} />
              <span>Generate Feasible Proposal</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Structured Proposal Output Card */}
      {activeProposal && (
        <div className="bg-sphereo-ivory border-2 border-sphereo-terracotta/30 rounded-lg overflow-hidden shadow-modal animate-fadeIn">
          {/* Proposal Header Banner */}
          <div className="bg-sphereo-linen/80 px-6 py-4 border-b border-sphereo-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-sphereo-terracotta">
                  Design Proposal #{activeProposal.id}
                </span>
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    activeProposal.status === 'Ready for Review'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {activeProposal.status}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-sphereo-charcoal mt-1">
                {activeProposal.productConceptTitle}
              </h3>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-xs text-sphereo-wood/70 block">Estimated Artisan Price</span>
              <span className="font-serif text-2xl font-bold text-sphereo-charcoal">
                {formatINR(activeProposal.estimatedPrice)}
              </span>
            </div>
          </div>

          {/* Proposal Body Details */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visual Sketch Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-sphereo-linen/50 border border-sphereo-border">
                <Image
                  src={activeProposal.previewUrl}
                  alt={activeProposal.productConceptTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-sphereo-ivory text-xs">
                  <span className="uppercase text-[10px] tracking-widest text-sphereo-brass font-bold block">
                    Conceptual Material Visualization
                  </span>
                  <span className="font-serif italic">
                    {activeProposal.validatedSpecification.technique}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded text-[11px] text-amber-900 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-amber-700" />
                <span>
                  <strong>Ethical AI Disclosure:</strong> Visualizations represent conceptual aesthetic targets. Every handmade piece will feature subtle natural grain and hand-formed variations.
                </span>
              </div>
            </div>

            {/* Validation & Constraint Audit */}
            <div className="lg:col-span-7 space-y-5">
              {/* Constraint Checks List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal flex items-center justify-between">
                  <span>Artisan Constraint Validation Engine</span>
                  <span className="text-sphereo-wood/70 text-[11px] font-normal">
                    Checked against {activeProposal.artisanName}
                  </span>
                </h4>

                <div className="space-y-2">
                  {activeProposal.constraintChecks.map((check, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded border text-xs flex items-start gap-2.5 ${
                        check.status === 'passed'
                          ? 'bg-emerald-50/70 border-emerald-200/60 text-emerald-950'
                          : check.status === 'warning'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-red-50/70 border-red-200 text-red-950'
                      }`}
                    >
                      {check.status === 'passed' && (
                        <CheckCircle2 size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                      )}
                      {check.status === 'warning' && (
                        <AlertTriangle size={15} className="text-amber-700 shrink-0 mt-0.5" />
                      )}
                      {check.status === 'failed' && (
                        <XCircle size={15} className="text-red-700 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold">{check.item}</div>
                        <p className="mt-0.5 opacity-90">{check.message}</p>
                        {check.alternativeSuggestion && (
                          <p className="mt-1 font-medium text-sphereo-terracotta">
                            ✦ Recommended Alternative: {check.alternativeSuggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validated Craft Specifications */}
              <div className="p-4 bg-sphereo-linen/50 border border-sphereo-border rounded-md text-xs space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-[11px] text-sphereo-charcoal border-b border-sphereo-border pb-1">
                  Validated Production Specifications
                </h5>
                <div className="grid grid-cols-2 gap-3 text-sphereo-charcoal/80">
                  <div>
                    <span className="text-sphereo-wood/70 block">Material Base:</span>
                    <strong>{activeProposal.validatedSpecification.material}</strong>
                  </div>
                  <div>
                    <span className="text-sphereo-wood/70 block">Color Formulation:</span>
                    <strong>{activeProposal.validatedSpecification.color}</strong>
                  </div>
                  <div>
                    <span className="text-sphereo-wood/70 block">Ancestral Technique:</span>
                    <strong>{activeProposal.validatedSpecification.technique}</strong>
                  </div>
                  <div>
                    <span className="text-sphereo-wood/70 block">Surface Finish:</span>
                    <strong>{activeProposal.validatedSpecification.finish}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-sphereo-border flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-sphereo-wood">
                    <Clock size={13} className="text-sphereo-terracotta" />
                    Estimated Production Window:
                  </span>
                  <strong className="text-sphereo-charcoal">
                    {activeProposal.estimatedLeadTimeDays} Days
                  </strong>
                </div>
              </div>

              {/* Submission & Save Actions */}
              {submitFeedback ? (
                <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-md text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    <span>Successfully Transmitted to Artisan Studio!</span>
                  </div>
                  <p>{submitFeedback}</p>
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href="/dashboard/artisan/design-requests"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-950 underline"
                    >
                      <span>Switch to Master {activeProposal.artisanName}&apos;s View to Review</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:flex-1"
                    onClick={handleSubmitToArtisan}
                  >
                    <Send size={15} />
                    <span>Submit Proposal for Artisan Review</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      addProposal(activeProposal);
                      alert('Proposal saved to your design portfolio!');
                    }}
                  >
                    <Bookmark size={15} />
                    <span>Save to Designs</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
