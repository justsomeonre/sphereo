'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { calculateOrderPricing, formatINR, VALID_COUPONS } from '../../lib/pricing';
import { Button } from '../common/Button';
import { Tag, ShieldCheck, Truck, ArrowRight, Check } from 'lucide-react';

interface CartSummaryProps {
  items: Array<{ unitTotalPrice: number; quantity: number }>;
  onProceedToCheckout?: () => void;
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  onProceedToCheckout,
  showCheckoutButton = true,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | undefined>('HERITAGE10');
  const [couponError, setCouponError] = useState('');

  const pricing = calculateOrderPricing(items, appliedCouponCode);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (!VALID_COUPONS[code]) {
      setCouponError('Invalid voucher code. Try HERITAGE10 or SPHEREO500.');
      return;
    }

    const coupon = VALID_COUPONS[code];
    if (pricing.subtotal < coupon.minOrder) {
      setCouponError(`This code requires a minimum order of ${formatINR(coupon.minOrder)}.`);
      return;
    }

    setAppliedCouponCode(code);
    setCouponInput('');
  };

  const isFreeShipping = pricing.subtotal >= 1999;

  return (
    <div className="bg-sphereo-linen/50 border border-sphereo-border rounded-lg p-5 sm:p-6 space-y-5">
      <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-3">
        Order Summary
      </h3>

      {/* Coupon Application Box */}
      <div className="space-y-2">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code (e.g. HERITAGE10)"
              className="w-full pl-8 pr-3 py-2 text-xs uppercase tracking-wider bg-sphereo-ivory border border-sphereo-border rounded focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs bg-sphereo-charcoal text-sphereo-ivory hover:bg-sphereo-terracotta rounded font-semibold transition-colors"
          >
            Apply
          </button>
        </form>

        {appliedCouponCode && (
          <div className="flex items-center justify-between text-xs bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded text-emerald-900">
            <span className="flex items-center gap-1 font-semibold">
              <Check size={12} className="text-emerald-700" />
              Coupon &quot;{appliedCouponCode}&quot; Active
            </span>
            <button
              type="button"
              onClick={() => setAppliedCouponCode(undefined)}
              className="text-[11px] underline hover:text-emerald-950"
            >
              Remove
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-xs text-red-600 font-medium">{couponError}</p>
        )}
      </div>

      {/* Numerical Line Items */}
      <div className="space-y-2.5 text-xs text-sphereo-charcoal/80 border-t border-sphereo-border pt-4">
        <div className="flex items-center justify-between">
          <span>Artisan Subtotal:</span>
          <span className="font-semibold text-sphereo-charcoal">{formatINR(pricing.subtotal)}</span>
        </div>

        {pricing.discount > 0 && (
          <div className="flex items-center justify-between text-emerald-800 font-medium">
            <span>Patron Heritage Discount:</span>
            <span>-{formatINR(pricing.discount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span>Handicrafts GST (5% Demo):</span>
          </span>
          <span className="font-semibold text-sphereo-charcoal">{formatINR(pricing.tax)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Truck size={13} className="text-sphereo-terracotta" />
            <span>Insured Courier Delivery:</span>
          </span>
          <span className="font-semibold">
            {isFreeShipping ? (
              <span className="text-emerald-800 uppercase text-[10px] tracking-wider font-bold">
                Complimentary
              </span>
            ) : (
              formatINR(pricing.shipping)
            )}
          </span>
        </div>

        {!isFreeShipping && pricing.subtotal > 0 && (
          <p className="text-[11px] text-sphereo-terracotta font-medium">
            Add {formatINR(1999 - pricing.subtotal)} more to qualify for Free Insured Shipping.
          </p>
        )}
      </div>

      {/* Final Total */}
      <div className="border-t border-sphereo-border pt-4 flex items-center justify-between">
        <div>
          <span className="font-serif text-lg font-bold text-sphereo-charcoal block leading-none">
            Estimated Total:
          </span>
          <span className="text-[10px] text-sphereo-wood/70">Includes all artisanal taxes & insurance</span>
        </div>
        <span className="font-serif text-2xl font-bold text-sphereo-charcoal">
          {formatINR(pricing.total)}
        </span>
      </div>

      {/* Checkout Action */}
      {showCheckoutButton && (
        <div className="pt-2">
          {items.length > 0 ? (
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-sm bg-sphereo-terracotta text-sphereo-ivory font-semibold text-sm hover:bg-sphereo-terracotta-dark transition-all shadow-sm"
            >
              <span>Proceed to Simulated Checkout</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Button variant="primary" size="lg" className="w-full" disabled>
              Cart is Empty
            </Button>
          )}
        </div>
      )}

      {/* Trust & Guarantee Notes */}
      <div className="pt-2 border-t border-sphereo-border text-[11px] text-sphereo-wood/75 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
          <span>Direct payments deposited into artisan guild accounts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck size={13} className="text-sphereo-terracotta shrink-0" />
          <span>Insured door-to-door transit protection</span>
        </div>
      </div>
    </div>
  );
};
