'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { PRODUCTS } from '../../../../data/products';
import { formatINR } from '../../../../lib/pricing';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import { ArrowLeft, Plus, Sparkles, Check } from 'lucide-react';

export default function ArtisanProductsPage() {
  const { activeArtisanId } = useSphereoStore();
  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];
  const products = PRODUCTS.filter((p) => p.artisanId === artisan.id);

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
              Studio Catalog Inventory
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Listed Pieces by {artisan.name} ({products.length})
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('New product listing modal: specify craft category, raw materials, pricing rules, and photography.')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors"
        >
          <Plus size={14} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-sphereo-terracotta/40 transition-colors"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-sphereo-sand">
                <Image
                  src={prod.images[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80'}
                  alt={prod.title}
                  fill
                  className="object-cover"
                />
                {prod.isCustomizable && (
                  <span className="absolute top-2 left-2 bg-sphereo-ivory/90 text-sphereo-terracotta text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs">
                    Customizable
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif text-base font-bold text-sphereo-charcoal line-clamp-1">
                  {prod.title}
                </h3>
                <p className="text-xs text-sphereo-wood/75 line-clamp-2">
                  {prod.shortDescription}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-sphereo-border">
                  <span className="font-serif font-bold text-base text-sphereo-charcoal">
                    {formatINR(prod.basePrice)}
                  </span>
                  <span className="text-[11px] text-sphereo-wood/70">
                    Stock: <strong>{prod.inventory} units</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-sphereo-border mt-2">
              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href={`/customize/${prod.id}`}
                  className="text-sphereo-terracotta font-semibold hover:underline"
                >
                  Test Customization →
                </Link>
                <Link
                  href={`/product/${prod.slug}`}
                  className="text-sphereo-charcoal/70 hover:underline"
                >
                  View Public Page
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
