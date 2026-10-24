'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CRAFTS } from '../../data/crafts';
import { Badge } from '../../components/common/Badge';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-6">
        <Badge variant="brass" size="sm" className="mb-2">
          Heritage Taxonomy
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-charcoal">
          The 12 Living Craft Guilds of India
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-2 max-w-2xl leading-relaxed">
          Centuries of regional mastery preserved by indigenous communities. Explore the ancestral materials, geographic origins, and master makers of each tradition.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CRAFTS.map((craft) => (
          <article
            key={craft.id}
            className="group bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-hover hover:border-sphereo-terracotta/40 transition-all duration-300"
          >
            <div>
              {/* Category Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sphereo-sand">
                <Image
                  src={craft.image}
                  alt={craft.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin size={12} className="text-sphereo-brass" />
                    {craft.region}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta">
                    {craft.heritageEra.split('(')[0]}
                  </span>
                  {craft.featured && (
                    <span className="text-[10px] bg-sphereo-brass/15 text-sphereo-wood font-bold px-2 py-0.5 rounded uppercase">
                      Featured Guild
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors">
                  <Link href={`/categories/${craft.slug}`}>
                    {craft.name}
                  </Link>
                </h3>

                <p className="text-xs text-sphereo-wood/85 leading-relaxed line-clamp-2">
                  {craft.shortDescription}
                </p>

                {/* Primary Materials */}
                <div className="pt-2 border-t border-sphereo-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sphereo-charcoal block mb-1">
                    Ancestral Materials:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {craft.primaryMaterials.map((mat) => (
                      <span
                        key={mat}
                        className="text-[10px] bg-sphereo-linen px-2 py-0.5 rounded text-sphereo-charcoal/80"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Link Footer */}
            <div className="p-5 pt-0">
              <Link
                href={`/categories/${craft.slug}`}
                className="w-full flex items-center justify-between py-2 px-3 bg-sphereo-linen/50 group-hover:bg-sphereo-terracotta group-hover:text-white rounded text-xs font-semibold text-sphereo-charcoal transition-all"
              >
                <span>Explore Guild & Masterpieces</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
