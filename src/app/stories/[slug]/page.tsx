'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { STORIES } from '../../../data/stories';
import { ARTISANS } from '../../../data/artisans';
import { Badge } from '../../../components/common/Badge';
import { ArrowLeft, Clock, MapPin, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const story = STORIES.find((s) => s.slug === slug) || STORIES[0];
  const artisan = ARTISANS.find((a) => a.id === story.featuredArtisanId) || ARTISANS[0];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs text-sphereo-wood hover:text-sphereo-terracotta transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          <span>All Craft Stories</span>
        </Link>
      </div>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="terracotta" size="sm">
            {story.craftName}
          </Badge>
          <span className="text-xs text-sphereo-wood/75">
            {story.readTime} • Published {story.publishedDate}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-charcoal leading-tight">
          {story.title}
        </h1>

        <p className="font-serif italic text-lg sm:text-xl text-sphereo-wood/85 leading-relaxed">
          {story.subtitle}
        </p>

        <div className="flex items-center gap-3 pt-2 text-xs text-sphereo-wood/75 border-b border-sphereo-border pb-6">
          <span className="flex items-center gap-1 font-semibold text-sphereo-charcoal">
            <User size={13} className="text-sphereo-terracotta" />
            Featuring {story.featuredArtisanName}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-sphereo-terracotta" />
            {story.region}
          </span>
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-sphereo-sand border border-sphereo-border shadow-card">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Multi-Paragraph Editorial Body */}
      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-sphereo-charcoal/90 font-sans max-w-none">
        {story.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Cultural Context & Preservation Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-sphereo-linen/50 border border-sphereo-border rounded-lg text-xs">
        <div className="space-y-1.5">
          <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Cultural & Ritual Context</span>
          </span>
          <p className="text-sphereo-wood/85 leading-relaxed">
            {story.culturalContext}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block flex items-center gap-1.5">
            <Sparkles size={14} className="text-sphereo-terracotta" />
            <span>Preservation & Guild Support</span>
          </span>
          <p className="text-sphereo-wood/85 leading-relaxed">
            {story.preservationEffort}
          </p>
        </div>
      </div>

      {/* Featured Artisan Profile Card */}
      <div className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-sphereo-border shrink-0">
            <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
          </div>
          <div>
            <span className="text-[11px] text-sphereo-wood/70 block">Featured Master Artisan</span>
            <h4 className="font-serif text-lg font-bold text-sphereo-charcoal">{artisan.name}</h4>
            <p className="text-xs text-sphereo-wood/80">{artisan.region} • {artisan.craftName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/artisan/${artisan.slug}`}
            className="flex-1 sm:flex-initial px-4 py-2 bg-sphereo-charcoal text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta transition-colors text-center"
          >
            View Artisan Profile
          </Link>
          <Link
            href={`/ai-studio?artisan=${artisan.id}`}
            className="flex-1 sm:flex-initial px-4 py-2 border border-sphereo-border rounded text-xs font-semibold hover:bg-sphereo-linen transition-colors text-center"
          >
            Create with AI
          </Link>
        </div>
      </div>
    </article>
  );
}
