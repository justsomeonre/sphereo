'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../lib/store';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/product/ProductCard';
import { Badge } from '../../components/common/Badge';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useSphereoStore();

  const favoritedProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div>
          <Badge variant="terracotta" size="sm" className="mb-1">
            Personal Curation
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
            Saved Favorites ({favoritedProducts.length})
          </h1>
        </div>
      </div>

      {favoritedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoritedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3 max-w-md mx-auto">
          <Heart size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-xl font-bold text-sphereo-charcoal">
            No saved favorites yet
          </h3>
          <p className="text-xs text-sphereo-wood/80 leading-relaxed">
            Click the heart icon on any handcrafted piece in our catalog to save it for later review.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-sphereo-terracotta text-white rounded text-xs font-semibold hover:bg-sphereo-terracotta-dark transition-colors"
            >
              <span>Explore Creations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
