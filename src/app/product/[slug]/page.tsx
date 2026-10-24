'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { ARTISANS } from '../../../data/artisans';
import { formatINR } from '../../../lib/pricing';
import { useSphereoStore } from '../../../lib/store';
import { ProductCard } from '../../../components/product/ProductCard';
import { RatingStars } from '../../../components/common/RatingStars';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  Heart,
  Share2,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Clock,
  SlidersHorizontal,
  ChevronRight,
  ArrowLeft,
  Check,
  MessageSquare,
  Flame,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const artisan = ARTISANS.find((a) => a.id === product.artisanId) || ARTISANS[0];

  const { addToCart, favorites, toggleFavorite } = useSphereoStore();
  const isFav = favorites.includes(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const moreFromArtisan = PRODUCTS.filter(
    (p) => p.artisanId === product.artisanId && p.id !== product.id
  ).slice(0, 4);

  const relatedCraftProducts = PRODUCTS.filter(
    (p) => p.craftId === product.craftId && p.id !== product.id && p.artisanId !== product.artisanId
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-sphereo-wood/75">
        <Link href="/discover" className="hover:text-sphereo-terracotta flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>All Creations</span>
        </Link>
        <ChevronRight size={12} />
        <Link href={`/categories/${product.craftId.replace('craft-', '')}`} className="hover:text-sphereo-terracotta">
          {product.craftName}
        </Link>
        <ChevronRight size={12} />
        <span className="font-semibold text-sphereo-charcoal truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* Main Product Showcase (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-sphereo-linen/40 border border-sphereo-border shadow-card">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />

            {/* Favorite button */}
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
                isFav
                  ? 'bg-red-50 text-red-600 shadow-sm'
                  : 'bg-sphereo-ivory/80 text-sphereo-charcoal/70 hover:text-sphereo-charcoal hover:bg-sphereo-ivory'
              }`}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} className={isFav ? 'fill-current' : ''} />
            </button>

            {product.isCustomizable && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-sphereo-ivory/95 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-sphereo-terracotta border border-sphereo-terracotta/30 shadow-xs">
                <Sparkles size={13} />
                <span>Customizable Piece</span>
              </div>
            )}
          </div>

          {/* Thumbnail Selector */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-sphereo-terracotta ring-1 ring-sphereo-terracotta'
                      : 'border-sphereo-border hover:border-sphereo-charcoal/40'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Artisan Lineage Attribution */}
          <div className="flex items-center justify-between border-b border-sphereo-border pb-3">
            <Link
              href={`/artisan/${artisan.slug}`}
              className="group flex items-center gap-2.5"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-sphereo-border shrink-0">
                <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-[11px] text-sphereo-wood/70 block">Crafted by</span>
                <span className="font-serif text-sm font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors flex items-center gap-1">
                  {artisan.name}
                  {artisan.isVerified && <ShieldCheck size={14} className="text-emerald-700" />}
                </span>
              </div>
            </Link>

            <span className="text-xs text-sphereo-wood/75 font-medium">
              {artisan.region.split(',')[0]}
            </span>
          </div>

          {/* Title & Rating */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal leading-snug">
              {product.title}
            </h1>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>

          {/* Price & Taxes */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-sphereo-charcoal">
                {formatINR(product.basePrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-sphereo-charcoal/50 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-sphereo-wood/70">
              Includes 5% artisanal craft tax. Free insured delivery over ₹1,999.
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-sphereo-charcoal/85 leading-relaxed">
            {product.description}
          </p>

          {/* Customization Callout / Studio Trigger */}
          {product.isCustomizable && (
            <div className="p-4 bg-sphereo-linen/60 border border-sphereo-terracotta/30 rounded-md space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-sphereo-charcoal">
                <span className="flex items-center gap-1.5 text-sphereo-terracotta">
                  <Sparkles size={14} />
                  <span>Artisan Customization Available</span>
                </span>
                <span className="text-[11px] text-sphereo-wood/75">
                  Colors • Materials • Sizes • Inscriptions
                </span>
              </div>
              <p className="text-xs text-sphereo-wood/80">
                You can customize this piece with {artisan.name}&apos;s verified materials and workshop pigments before ordering.
              </p>
              <Link
                href={`/customize/${product.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-sphereo-terracotta text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-sphereo-terracotta-dark transition-colors shadow-xs"
              >
                <SlidersHorizontal size={14} />
                <span>Open Customization Studio</span>
              </Link>
            </div>
          )}

          {/* Quantity & Cart Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-sphereo-border rounded bg-sphereo-ivory">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen/50 text-xs"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-sphereo-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.inventory, q + 1))}
                  className="px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen/50 text-xs"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} />
                <span>{isAddedFeedback ? 'Added to Cart!' : 'Add to Cart'}</span>
              </Button>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleBuyNow}
            >
              <span>Instant Buy (Simulated Checkout)</span>
            </Button>
          </div>

          {/* Production & Shipping Highlights */}
          <div className="border-t border-sphereo-border pt-4 space-y-2 text-xs text-sphereo-wood/80">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-sphereo-terracotta shrink-0" />
              <span>
                Availability:{' '}
                <strong className="text-sphereo-charcoal">
                  {product.isReadyToShip
                    ? 'In Stock, Ready to Ship (~3 days)'
                    : `Made to Order (~${product.leadTimeDays} days handcrafting)`}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-sphereo-terracotta shrink-0" />
              <span>
                Insured Door-to-Door Delivery throughout India & Worldwide.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
              <span>
                Authenticity Guarantee: 100% handmade, non-synthetic raw materials.
              </span>
            </div>
          </div>

          {/* Inquire / Custom AI Design Link */}
          <div className="pt-2">
            <Link
              href={`/ai-studio?artisan=${artisan.id}`}
              className="text-xs text-sphereo-wood hover:text-sphereo-terracotta underline flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare size={13} />
              <span>Have a unique vision? Co-create with {artisan.name} in SphereO AI Studio</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Technical Specifications Accordion / Grid */}
      <section className="border-t border-sphereo-border pt-10">
        <h3 className="font-serif text-xl font-bold text-sphereo-charcoal mb-6">
          Authentic Specifications & Care
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-2">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Materials & Composition
            </span>
            <ul className="space-y-1 text-sphereo-wood/85 list-disc list-inside">
              {product.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-2">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Dimensions & Weight
            </span>
            <div className="space-y-1 text-sphereo-wood/85">
              <div>Dimensions: <strong className="text-sphereo-charcoal">{product.dimensions}</strong></div>
              <div>Weight: <strong className="text-sphereo-charcoal">{product.weight}</strong></div>
            </div>
          </div>

          <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-2">
            <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Artisan Care Instructions
            </span>
            <p className="text-sphereo-wood/85 leading-relaxed">
              {product.careInstructions}
            </p>
          </div>
        </div>
      </section>

      {/* More From This Artisan */}
      {moreFromArtisan.length > 0 && (
        <section className="border-t border-sphereo-border pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-sphereo-charcoal">
              More Creations by {artisan.name}
            </h3>
            <Link
              href={`/artisan/${artisan.slug}`}
              className="text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
            >
              View Artisan Profile →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreFromArtisan.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Products in this Craft */}
      {relatedCraftProducts.length > 0 && (
        <section className="border-t border-sphereo-border pt-10 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-sphereo-charcoal">
            Related {product.craftName} Pieces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCraftProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
