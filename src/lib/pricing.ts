export interface PriceCalculation {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
  subtotalInPaise: number;
  totalInPaise: number;
}

export const VALID_COUPONS: Record<string, { code: string; type: 'percentage' | 'fixed'; value: number; minOrder: number; description: string }> = {
  HERITAGE10: {
    code: 'HERITAGE10',
    type: 'percentage',
    value: 10,
    minOrder: 1500,
    description: '10% off on authentic handcrafted orders above ₹1,500',
  },
  SPHEREO500: {
    code: 'SPHEREO500',
    type: 'fixed',
    value: 500,
    minOrder: 2500,
    description: '₹500 flat discount on artisan custom orders above ₹2,500',
  },
  CRAFTFIRST: {
    code: 'CRAFTFIRST',
    type: 'percentage',
    value: 15,
    minOrder: 3000,
    description: '15% welcome patron discount for first-time craft orders above ₹3,000',
  },
};

/**
 * Calculates cart pricing with integer paise accuracy
 * Indian Handicrafts GST demo rule: 5%
 * Shipping rule: Free above ₹1,999, else flat ₹150
 */
export function calculateOrderPricing(
  items: Array<{ unitTotalPrice: number; quantity: number }>,
  couponCode?: string
): PriceCalculation {
  // Compute subtotal in paise to guarantee zero floating point drift
  let subtotalPaise = 0;
  for (const item of items) {
    const itemPaise = Math.round(item.unitTotalPrice * 100);
    subtotalPaise += itemPaise * item.quantity;
  }

  const subtotalRupees = Math.round(subtotalPaise / 100);

  // Discount calculation
  let discountPaise = 0;
  let appliedCoupon: string | undefined = undefined;

  if (couponCode && VALID_COUPONS[couponCode.toUpperCase()]) {
    const coupon = VALID_COUPONS[couponCode.toUpperCase()];
    if (subtotalRupees >= coupon.minOrder) {
      appliedCoupon = coupon.code;
      if (coupon.type === 'percentage') {
        discountPaise = Math.round((subtotalPaise * coupon.value) / 100);
      } else {
        discountPaise = coupon.value * 100;
      }
    }
  }

  // Ensure discount does not exceed subtotal
  discountPaise = Math.min(discountPaise, subtotalPaise);
  const discountedSubtotalPaise = subtotalPaise - discountPaise;

  // 5% GST for handmade artisanal crafts
  const taxPaise = Math.round((discountedSubtotalPaise * 5) / 100);

  // Free shipping above ₹1,999, else ₹150 (15,000 paise)
  const isFreeShipping = subtotalRupees >= 1999 || items.length === 0;
  const shippingPaise = isFreeShipping ? 0 : 15000;

  const totalPaise = discountedSubtotalPaise + taxPaise + shippingPaise;

  return {
    subtotal: Math.round(subtotalPaise / 100),
    tax: Math.round(taxPaise / 100),
    shipping: Math.round(shippingPaise / 100),
    discount: Math.round(discountPaise / 100),
    total: Math.round(totalPaise / 100),
    appliedCoupon,
    subtotalInPaise: subtotalPaise,
    totalInPaise: totalPaise,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
