'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STORIES } from '../../data/stories';
import { Badge } from '../../components/common/Badge';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export default function StoriesListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-6 space-y-3">
        <Badge variant="terracotta" size="sm">
          SphereO Journal & Cultural Archive
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-charcoal">
          Stories of the Earth, Hearth & Hand
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80 max-w-2xl leading-relaxed">
          Deep-dive essays into the living techniques, chemical alchemies, and generational master makers preserving Indian heritage craft.
        </p>
      </div>

      {/* Featured Lead Story */}
      <article className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full bg-sphereo-sand">
          <Image
            src={STORIES[0].coverImage}
            alt={STORIES[0].title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta">
              Featured Studio Essay • {STORIES[0].readTime}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal leading-snug">
              <Link href={`/stories/${STORIES[0].slug}`} className="hover:text-sphereo-terracotta transition-colors">
                {STORIES[0].title}
              </Link>
            </h2>
            <p className="text-xs sm:text-sm text-sphereo-wood/80 leading-relaxed">
              {STORIES[0].excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-sphereo-border flex items-center justify-between">
            <span className="text-xs text-sphereo-wood/75">
              Featuring {STORIES[0].featuredArtisanName}
            </span>
            <Link
              href={`/stories/${STORIES[0].slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-sphereo-terracotta hover:underline"
            >
              <span>Read Full Article</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </article>

      {/* Grid of Remaining Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.slice(1).map((story) => (
          <article
            key={story.id}
            className="group bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-sphereo-terracotta/40 transition-all"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sphereo-sand">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-sphereo-wood/75">
                  <span className="uppercase font-bold tracking-widest text-sphereo-terracotta">
                    {story.region.split(',')[0]}
                  </span>
                  <span>{story.readTime}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors leading-snug">
                  <Link href={`/stories/${story.slug}`}>
                    {story.title}
                  </Link>
                </h3>

                <p className="text-xs text-sphereo-wood/80 line-clamp-2 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-sphereo-border mt-2">
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-sphereo-wood/70">
                  {story.featuredArtisanName}
                </span>
                <Link
                  href={`/stories/${story.slug}`}
                  className="text-xs font-semibold text-sphereo-charcoal underline"
                >
                  Read →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
