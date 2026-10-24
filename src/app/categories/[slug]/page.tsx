'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { CRAFTS } from '../../../data/crafts';
import { ARTISANS } from '../../../data/artisans';
import { PRODUCTS } from '../../../data/products';
import { ProductCard } from '../../../components/product/ProductCard';
import { ArtisanCard } from '../../../components/artisan/ArtisanCard';
import { Badge } from '../../../components/common/Badge';
import { MapPin, Sparkles, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const craft = CRAFTS.find((c) => c.slug === slug);
  if (!craft) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Craft Category Not Found</h2>
        <Link href="/categories" className="text-sphereo-terracotta underline text-sm">
          Return to All Crafts
        </Link>
      </div>
    );
  }

  const artisansInCraft = ARTISANS.filter((a) => a.craftId === craft.id);
  const productsInCraft = PRODUCTS.filter((p) => p.craftId === craft.id);

  return (
    <div className="space-y-16 pb-16">
      {/* Category Hero Header */}
      <section className="relative bg-sphereo-linen/50 border-b border-sphereo-border pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs text-sphereo-wood/75">
            <Link href="/categories" className="hover:text-sphereo-terracotta flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>All Crafts</span>
            </Link>
            <ChevronRight size={12} />
            <span className="font-semibold text-sphereo-charcoal">{craft.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="terracotta" size="sm">
                GI Certified Guild
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-charcoal">
                {craft.name}
              </h1>
              <p className="text-sm sm:text-base text-sphereo-wood/85 leading-relaxed max-w-xl">
                {craft.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-sphereo-terracotta" />
                  <span>Regional Hearth: <strong>{craft.region}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Heritage Era: <strong>{craft.heritageEra}</strong></span>
                </div>
              </div>

              {/* Primary Materials Pill List */}
              <div className="pt-3">
                <span className="text-xs uppercase font-bold tracking-wider text-sphereo-charcoal block mb-2">
                  Verified Raw Materials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {craft.primaryMaterials.map((mat) => (
                    <span
                      key={mat}
                      className="text-xs px-3 py-1 rounded bg-sphereo-ivory border border-sphereo-border font-medium text-sphereo-charcoal"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Cover */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-sphereo-border shadow-card bg-sphereo-sand">
              <Image
                src={craft.image}
                alt={craft.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Master Artisans in this Guild */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Badge variant="brass" size="sm" className="mb-2">
            Living Masters
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
            Guild Masters of {craft.name}
          </h2>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
            Certified artisans currently accepting custom orders and consultation bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisansInCraft.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      {/* Catalog Products in this Craft */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="sage" size="sm" className="mb-2">
              Guild Collection
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Available Handmade Creations ({productsInCraft.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsInCraft.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* AI Studio Callout for this Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sphereo-charcoal text-sphereo-linen p-8 sm:p-10 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-sphereo-brass">
              Bespoke AI Collaboration
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-ivory">
              Have a custom vision for {craft.name}?
            </h3>
            <p className="text-xs sm:text-sm text-sphereo-linen/80">
              Use SphereO AI Studio to co-design a piece validated against the verified pigments and kiln rules of this craft guild.
            </p>
          </div>
          <Link
            href={`/ai-studio?artisan=${artisansInCraft[0]?.id || ''}`}
            className="px-6 py-3 bg-sphereo-terracotta text-white rounded font-semibold text-xs uppercase tracking-wider hover:bg-sphereo-terracotta-dark transition-colors flex items-center gap-2 shrink-0"
          >
            <Sparkles size={14} />
            <span>Launch AI Studio for this Craft</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
