'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../lib/types';
import { formatINR } from '../../lib/pricing';
import { useSphereoStore } from '../../lib/store';
import { RatingStars } from '../common/RatingStars';
import { Heart, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { favorites, toggleFavorite, addToCart } = useSphereoStore();
  const isFav = favorites.includes(product.id);

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';

  return (
    <article
      className={`group bg-sphereo-ivory border border-sphereo-border rounded-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-hover hover:border-sphereo-terracotta/40 ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-sphereo-linen/40">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFav
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-sphereo-ivory/85 text-sphereo-charcoal/70 hover:text-sphereo-charcoal hover:bg-sphereo-ivory'
          }`}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} className={isFav ? 'fill-current' : ''} />
        </button>

        {/* Customizable Badge */}
        {product.isCustomizable && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-sphereo-ivory/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider text-sphereo-terracotta uppercase border border-sphereo-terracotta/20 shadow-xs">
            <Sparkles size={11} />
            <span>Customizable</span>
          </div>
        )}

        {/* Ready to ship badge */}
        {product.isReadyToShip && !product.isCustomizable && (
          <div className="absolute top-3 left-3 bg-emerald-950/80 text-emerald-100 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase shadow-xs">
            Ready to Ship
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Artisan & Region Attribution */}
          <div className="flex items-center justify-between text-[11px] text-sphereo-wood/75">
            <Link
              href={`/artisan/${product.artisanId.replace('artisan-', '')}`}
              className="hover:text-sphereo-terracotta underline-offset-2 hover:underline font-medium truncate max-w-[70%]"
            >
              by {product.artisanName}
            </Link>
            <span className="truncate">{product.craftName.split('&')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-semibold text-sphereo-charcoal line-clamp-1 group-hover:text-sphereo-terracotta transition-colors">
            <Link href={`/product/${product.slug}`} className="focus:outline-none">
              {product.title}
            </Link>
          </h3>

          {/* Star Rating */}
          <div className="pt-0.5">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 mt-3 border-t border-sphereo-border flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold text-sphereo-charcoal">
                {formatINR(product.basePrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-sphereo-charcoal/45 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-sphereo-wood/70">
              {product.isReadyToShip ? 'Ships in 3 days' : `Made to order (~${product.leadTimeDays}d)`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {product.isCustomizable ? (
              <Link
                href={`/customize/${product.id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-sphereo-terracotta/10 text-sphereo-terracotta hover:bg-sphereo-terracotta hover:text-white border border-sphereo-terracotta/30 text-xs font-semibold transition-all"
                title="Customize this product with artisan options"
              >
                <SlidersHorizontal size={13} />
                <span>Customize</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-sphereo-charcoal text-sphereo-ivory hover:bg-sphereo-terracotta text-xs font-medium transition-colors"
              >
                <span>Add to Cart</span>
              </button>
            )}

            <Link
              href={`/product/${product.slug}`}
              className="p-1.5 rounded-sm border border-sphereo-border text-sphereo-charcoal hover:bg-sphereo-linen transition-colors"
              aria-label={`View ${product.title}`}
            >
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
