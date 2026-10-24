'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Artisan } from '../../lib/types';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { ConsultationModal } from './ConsultationModal';
import { ShieldCheck, Video, Calendar, Sparkles, MapPin } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
  className?: string;
}

export const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan, className = '' }) => {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <>
      <article
        className={`group bg-sphereo-ivory border border-sphereo-border rounded-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-hover hover:border-sphereo-terracotta/40 ${className}`}
      >
        <div>
          {/* Workshop / Header Banner */}
          <div className="relative h-32 w-full overflow-hidden bg-sphereo-linen/50">
            <Image
              src={artisan.workshopImage || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'}
              alt={`${artisan.name}'s craft workshop`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/80 via-sphereo-charcoal/30 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-sphereo-brass" />
                {artisan.region}
              </span>
              <span className="font-semibold text-sphereo-brass">
                {artisan.experienceYears} Years Heritage
              </span>
            </div>
          </div>

          {/* Profile & Avatar Row */}
          <div className="px-5 pt-4 pb-2 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sphereo-ivory shadow-md -mt-8 bg-sphereo-sand shrink-0">
                  <Image
                    src={artisan.avatar}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-lg font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors">
                      <Link href={`/artisan/${artisan.slug}`}>
                        {artisan.name}
                      </Link>
                    </h3>
                    {artisan.isVerified && (
                      <span title="Verified Master Artisan">
                        <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sphereo-wood/80 font-medium">
                    {artisan.craftName}
                  </p>
                </div>
              </div>
            </div>

            {/* Ratings & Badges */}
            <div className="mt-3 flex items-center justify-between gap-2 border-b border-sphereo-border pb-3">
              <RatingStars rating={artisan.rating} reviewCount={artisan.reviewCount} size="sm" />
              <Badge variant="brass" size="sm">
                GI Certified
              </Badge>
            </div>

            {/* Quote / Short Story */}
            <p className="mt-3 text-xs text-sphereo-charcoal/80 line-clamp-2 italic font-serif leading-relaxed">
              {artisan.story}
            </p>

            {/* Supported materials preview */}
            <div className="mt-3 flex flex-wrap gap-1">
              {artisan.capabilities.materials.slice(0, 2).map((mat) => (
                <span
                  key={mat}
                  className="text-[10px] bg-sphereo-linen px-2 py-0.5 rounded text-sphereo-charcoal/80"
                >
                  {mat}
                </span>
              ))}
              {artisan.capabilities.materials.length > 2 && (
                <span className="text-[10px] bg-sphereo-linen px-1.5 py-0.5 rounded text-sphereo-charcoal/60">
                  +{artisan.capabilities.materials.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 pt-2 border-t border-sphereo-border mt-3 flex items-center gap-2">
          <Link
            href={`/artisan/${artisan.slug}`}
            className="flex-1 text-center py-2 px-3 rounded-sm bg-sphereo-charcoal text-sphereo-ivory hover:bg-sphereo-terracotta text-xs font-medium transition-colors"
          >
            View Collection
          </Link>

          <button
            type="button"
            onClick={() => setIsConsultOpen(true)}
            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-sm border border-sphereo-charcoal/30 text-sphereo-charcoal hover:bg-sphereo-linen text-xs font-semibold transition-colors"
            title="Book a live virtual consultation"
          >
            <Video size={13} className="text-sphereo-terracotta" />
            <span>Consult</span>
          </button>
        </div>
      </article>

      {/* Booking Consultation Modal */}
      <ConsultationModal
        artisan={artisan}
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </>
  );
};
