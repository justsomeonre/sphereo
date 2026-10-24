'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSphereoStore } from '../../../lib/store';
import { formatINR } from '../../../lib/pricing';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import {
  CheckCircle2,
  Package,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';

function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useSphereoStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-center">
      {/* Success Badge */}
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 size={36} />
      </div>

      <div className="space-y-2">
        <Badge variant="terracotta" size="sm">
          Artisan Commission Recorded
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
          Thank You for Supporting Handcrafted Heritage!
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80 max-w-md mx-auto leading-relaxed">
          Your commission has been registered in the SphereO studio ledger. The artisans have been notified to inspect materials and begin unhurried preparation.
        </p>
      </div>

      {order && (
        <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 sm:p-8 text-left space-y-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sphereo-border pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta block">
                Order Tracking Reference
              </span>
              <span className="font-serif text-xl font-bold text-sphereo-charcoal">
                {order.orderNumber}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-sphereo-wood/70 block">Total Settled</span>
              <span className="font-serif text-xl font-bold text-sphereo-charcoal">
                {formatINR(order.total)}
              </span>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="p-4 bg-sphereo-linen/50 border border-sphereo-border rounded-md flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sphereo-terracotta" />
              <span>
                Status: <strong className="text-sphereo-charcoal">{order.status}</strong>
              </span>
            </div>
            <span className="text-[11px] text-sphereo-wood/75">
              Simulated {order.paymentMethod}
            </span>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal">
              Commissioned Pieces ({order.items.length})
            </h4>
            <div className="divide-y divide-sphereo-border border-y border-sphereo-border">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-serif font-bold text-sphereo-charcoal">{item.productTitle}</span>
                    <span className="text-[11px] text-sphereo-wood/70 block">
                      Qty {item.quantity} • by {item.artisanName}
                    </span>
                  </div>
                  <span className="font-serif font-semibold">
                    {formatINR(item.unitTotalPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="text-xs text-sphereo-wood/80 space-y-1">
            <span className="font-bold text-sphereo-charcoal block">Shipping To:</span>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
          </div>

          {/* Next Steps Buttons */}
          <div className="pt-4 border-t border-sphereo-border flex flex-col sm:flex-row gap-3">
            <Link
              href={`/account/orders/${order.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-sm bg-sphereo-charcoal text-white text-xs font-semibold hover:bg-sphereo-terracotta transition-colors shadow-xs"
            >
              <Package size={14} />
              <span>Track Order Timeline</span>
            </Link>

            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-sm border border-sphereo-border text-xs font-semibold hover:bg-sphereo-linen transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-sphereo-wood">Loading commission details...</div>}>
      <CheckoutSuccessInner />
    </Suspense>
  );
}
