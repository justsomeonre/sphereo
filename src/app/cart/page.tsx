'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../lib/store';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartSummary } from '../../components/cart/CartSummary';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useSphereoStore();

  const cartItemsData = cart.map((item) => ({
    unitTotalPrice: item.unitTotalPrice,
    quantity: item.quantity,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sphereo-border pb-4">
        <div>
          <Badge variant="terracotta" size="sm" className="mb-1">
            Artisan Bag
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
            Shopping Cart ({cart.reduce((t, i) => t + i.quantity, 0)})
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-sphereo-charcoal/60 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={13} />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Items List Column */}
          <div className="lg:col-span-8 space-y-2">
            <div className="divide-y divide-sphereo-border border-t border-sphereo-border">
              {cart.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href="/discover"
                className="inline-flex items-center gap-1 text-xs text-sphereo-wood hover:text-sphereo-terracotta underline font-semibold"
              >
                <ArrowLeft size={13} />
                <span>Continue Exploring Crafts</span>
              </Link>
            </div>
          </div>

          {/* Cart Pricing Summary Column */}
          <div className="lg:col-span-4">
            <CartSummary items={cartItemsData} />
          </div>
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-sphereo-linen rounded-full flex items-center justify-center mx-auto text-sphereo-charcoal/60">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-sphereo-charcoal">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-sphereo-wood/80 leading-relaxed">
            Discover hand-turned Channapatna woodcraft, royal lac bangles, or Jaipur blue pottery to fill your bag with authentic Indian craft.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sphereo-terracotta text-white rounded font-semibold text-xs hover:bg-sphereo-terracotta-dark transition-colors"
            >
              <span>Explore Marketplace</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
