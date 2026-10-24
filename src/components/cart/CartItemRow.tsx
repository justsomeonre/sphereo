'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '../../lib/types';
import { formatINR } from '../../lib/pricing';
import { Trash2, Plus, Minus, Sparkles } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const custom = item.customization;

  return (
    <div className="py-4 border-b border-sphereo-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Product Image & Info */}
      <div className="flex items-start gap-3.5 flex-1">
        <div className="relative w-20 h-20 rounded overflow-hidden bg-sphereo-linen/40 border border-sphereo-border shrink-0">
          <Image
            src={item.productImage || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80'}
            alt={item.productTitle}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-sm sm:text-base font-semibold text-sphereo-charcoal leading-snug">
            {item.productTitle}
          </h4>
          <p className="text-xs text-sphereo-wood/75">
            Crafted by <span className="font-medium text-sphereo-charcoal">{item.artisanName}</span>
          </p>

          {/* Customization Details if applied */}
          {custom && (
            <div className="mt-1.5 p-2 bg-sphereo-linen/40 border border-sphereo-border rounded text-[11px] text-sphereo-charcoal/80 space-y-0.5">
              <div className="flex items-center gap-1 text-sphereo-terracotta font-semibold">
                <Sparkles size={11} />
                <span>Bespoke Artisan Customization:</span>
              </div>
              <div className="text-[10px] space-x-2">
                {custom.color && <span>Color: <strong>{custom.color}</strong></span>}
                {custom.material && <span>Material: <strong>{custom.material}</strong></span>}
                {custom.size && <span>Size: <strong>{custom.size}</strong></span>}
                {custom.finish && <span>Finish: <strong>{custom.finish}</strong></span>}
              </div>
              {custom.engravingText && (
                <div className="text-[10px] text-sphereo-brass font-medium">
                  Engraved: “{custom.engravingText}”
                </div>
              )}
            </div>
          )}

          <div className="text-xs font-semibold text-sphereo-charcoal sm:hidden pt-1">
            {formatINR(item.unitTotalPrice)} each
          </div>
        </div>
      </div>

      {/* Quantity & Price Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-sphereo-border rounded bg-sphereo-ivory">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1.5 text-sphereo-charcoal/70 hover:text-sphereo-charcoal hover:bg-sphereo-linen/50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-xs font-bold text-sphereo-charcoal">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 text-sphereo-charcoal/70 hover:text-sphereo-charcoal hover:bg-sphereo-linen/50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right min-w-[90px]">
          <span className="font-serif text-sm sm:text-base font-bold text-sphereo-charcoal block">
            {formatINR(item.unitTotalPrice * item.quantity)}
          </span>
          <span className="text-[10px] text-sphereo-wood/70 hidden sm:block">
            {formatINR(item.unitTotalPrice)} each
          </span>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="p-1.5 text-sphereo-charcoal/40 hover:text-red-700 transition-colors"
          title="Remove from cart"
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
