'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ARTISANS } from '../../../data/artisans';
import { PRODUCTS } from '../../../data/products';
import { ProductCard } from '../../../components/product/ProductCard';
import { RatingStars } from '../../../components/common/RatingStars';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { ConsultationModal } from '../../../components/artisan/ConsultationModal';
import {
  ShieldCheck,
  Video,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Layers,
  ChevronRight,
  ArrowLeft,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function ArtisanProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const artisan = ARTISANS.find((a) => a.slug === slug || a.id === `artisan-${slug}`) || ARTISANS[0];
  const artisanProducts = PRODUCTS.filter((p) => p.artisanId === artisan.id);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Workshop Banner */}
      <section className="relative bg-sphereo-charcoal text-sphereo-linen py-12 lg:py-16 border-b border-sphereo-charcoal/40 overflow-hidden">
        {/* Background workshop image with dark gradient */}
        <div className="absolute inset-0 opacity-25">
          <Image
            src={artisan.workshopImage || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1400&q=80'}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sphereo-linen/60 mb-6">
            <Link href="/artisans" className="hover:text-sphereo-ivory flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>All Artisans</span>
            </Link>
            <ChevronRight size={12} />
            <span className="text-sphereo-brass font-medium">{artisan.craftName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Avatar & Bio */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-sphereo-brass shadow-modal shrink-0 bg-sphereo-sand">
                <Image
                  src={artisan.avatar}
                  alt={artisan.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brass" size="sm">
                    {artisan.experienceYears} Years Ancestral Heritage
                  </Badge>
                  {artisan.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <ShieldCheck size={14} />
                      Verified GI Master
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-ivory">
                  {artisan.name}
                </h1>
                <p className="text-sm sm:text-base text-sphereo-brass font-serif italic">
                  {artisan.headline}
                </p>

                <div className="flex items-center gap-4 text-xs text-sphereo-linen/80">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-sphereo-terracotta" />
                    {artisan.region}
                  </span>
                  <RatingStars rating={artisan.rating} reviewCount={artisan.reviewCount} size="sm" />
                </div>

                <p className="text-xs sm:text-sm text-sphereo-linen/85 max-w-2xl leading-relaxed pt-1">
                  {artisan.bio}
                </p>
              </div>
            </div>

            {/* Right: Quick Action Card */}
            <div className="lg:col-span-4 bg-sphereo-ivory text-sphereo-charcoal p-6 rounded-lg border border-sphereo-border shadow-modal space-y-4">
              <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
                <span>Direct Collaboration</span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded uppercase">
                  Available
                </span>
              </h3>

              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                Connect directly with Master {artisan.name}. Book an in-platform video consultation or co-create a bespoke design with SphereO AI.
              </p>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setIsConsultModalOpen(true)}
                >
                  <Video size={14} />
                  <span>Book 45-Min Video Consultation</span>
                </Button>

                <Link
                  href={`/ai-studio?artisan=${artisan.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-sphereo-charcoal text-sphereo-ivory rounded text-xs font-semibold hover:bg-sphereo-terracotta transition-colors shadow-xs"
                >
                  <Sparkles size={14} className="text-sphereo-brass" />
                  <span>Co-Design with SphereO AI</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Workshop Inventory Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Badge variant="terracotta" size="sm" className="mb-2">
            Verified Craft Capabilities
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
            Ancestral Techniques & Verified Materials
          </h2>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
            Parameters audited by SphereO AI before custom design feasibility is approved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Col 1: Techniques */}
          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-3">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block border-b border-sphereo-border pb-1.5">
              Verified Techniques
            </span>
            <ul className="space-y-1.5 text-sphereo-wood/85">
              {artisan.capabilities.techniques.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Materials & Stock */}
          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-3">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block border-b border-sphereo-border pb-1.5">
              Workshop Raw Materials in Stock
            </span>
            <ul className="space-y-1.5 text-sphereo-wood/85">
              {artisan.materialsInStock.map((mat) => (
                <li key={mat.name} className="flex items-center justify-between">
                  <span className="font-semibold">{mat.name}</span>
                  <span className="text-[10px] text-sphereo-wood/70 bg-sphereo-ivory px-2 py-0.5 rounded border border-sphereo-border">
                    {mat.quantityDesc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pigments & Finishes */}
          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-3">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block border-b border-sphereo-border pb-1.5">
              Active Natural Pigments & Colors
            </span>
            <div className="flex flex-wrap gap-1.5">
              {artisan.capabilities.colors.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded bg-sphereo-ivory border border-sphereo-border font-medium text-sphereo-charcoal"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-sphereo-border text-[11px] text-sphereo-wood/75">
              <span>Standard Production Window: </span>
              <strong className="text-sphereo-charcoal">
                {artisan.capabilities.minLeadTimeDays} – {artisan.capabilities.maxLeadTimeDays} Days
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Public Catalog Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-sphereo-border pb-4">
          <div>
            <Badge variant="sage" size="sm" className="mb-2">
              Studio Catalog
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Handmade Pieces by {artisan.name} ({artisanProducts.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisanProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        artisan={artisan}
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </div>
  );
}
