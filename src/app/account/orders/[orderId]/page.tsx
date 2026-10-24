'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSphereoStore } from '../../../../lib/store';
import { formatINR } from '../../../../lib/pricing';
import { Badge } from '../../../../components/common/Badge';
import {
  Package,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders } = useSphereoStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Order Not Found</h2>
        <Link href="/account/orders" className="text-sphereo-terracotta underline text-xs">
          Return to All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="border-b border-sphereo-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/account/orders"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta block">
              Commission Provenance Timeline
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Order {order.orderNumber}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-sphereo-wood/75">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-sphereo-border pb-3">
          <h2 className="font-serif text-lg font-bold text-sphereo-charcoal flex items-center gap-2">
            <Clock size={16} className="text-sphereo-terracotta" />
            <span>Making & Fulfillment Milestones</span>
          </h2>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sphereo-terracotta/10 text-sphereo-terracotta border border-sphereo-terracotta/30 uppercase tracking-wider">
            Current: {order.status}
          </span>
        </div>

        {/* Vertical/Horizontal Timeline Component */}
        <div className="space-y-6 pt-2">
          {order.timeline.map((event, index) => {
            const isDone = event.completed;
            const isCurrent = order.status === event.status;

            return (
              <div key={event.status} className="flex items-start gap-4 relative">
                {/* Connecting Line */}
                {index < order.timeline.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                      isDone ? 'bg-emerald-600' : 'bg-sphereo-border'
                    }`}
                  />
                )}

                {/* Node icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-sphereo-terracotta text-white animate-pulse'
                      : 'bg-sphereo-linen text-sphereo-charcoal/40 border border-sphereo-border'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={16} /> : index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className={`font-serif text-sm font-bold ${isDone || isCurrent ? 'text-sphereo-charcoal' : 'text-sphereo-charcoal/50'}`}>
                      {event.status}
                    </span>
                    {event.timestamp && (
                      <span className="text-[11px] text-sphereo-wood/70">
                        {new Date(event.timestamp).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                  <p className={`mt-0.5 ${isDone || isCurrent ? 'text-sphereo-wood/85' : 'text-sphereo-charcoal/40'}`}>
                    {event.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commissioned Items List with Customization Details */}
      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-3">
          Handcrafted Pieces in this Order ({order.items.length})
        </h3>

        <div className="divide-y divide-sphereo-border">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-sphereo-sand border border-sphereo-border shrink-0">
                  <Image
                    src={item.productImage || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80'}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-sphereo-charcoal">
                    {item.productTitle}
                  </h4>
                  <p className="text-sphereo-wood/70 text-[11px]">
                    Qty: {item.quantity} • Made by <strong>{item.artisanName}</strong>
                  </p>

                  {item.customization && (
                    <div className="p-2 bg-sphereo-linen/50 border border-sphereo-border rounded text-[10px] text-sphereo-charcoal/80 space-y-0.5 mt-1">
                      <div className="font-semibold text-sphereo-terracotta flex items-center gap-1">
                        <Sparkles size={10} />
                        <span>Customized Configuration:</span>
                      </div>
                      <div className="space-x-2">
                        {item.customization.color && <span>Color: <strong>{item.customization.color}</strong></span>}
                        {item.customization.material && <span>Material: <strong>{item.customization.material}</strong></span>}
                        {item.customization.size && <span>Size: <strong>{item.customization.size}</strong></span>}
                      </div>
                      {item.customization.engravingText && (
                        <div className="text-sphereo-brass font-bold">
                          Engraving: “{item.customization.engravingText}”
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right sm:text-right min-w-[90px]">
                <span className="font-serif font-bold text-sm text-sphereo-charcoal block">
                  {formatINR(item.unitTotalPrice * item.quantity)}
                </span>
                <span className="text-[10px] text-sphereo-wood/70">
                  {formatINR(item.unitTotalPrice)} each
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial & Delivery Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Shipping Address */}
        <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-lg space-y-2">
          <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block border-b border-sphereo-border pb-1.5 flex items-center gap-1.5">
            <Truck size={14} className="text-sphereo-terracotta" />
            <span>Delivery Destination</span>
          </span>
          <div className="space-y-0.5 text-sphereo-charcoal/80">
            <p className="font-bold text-sphereo-charcoal">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-5 bg-sphereo-linen/40 border border-sphereo-border rounded-lg space-y-2">
          <span className="font-bold uppercase tracking-wider text-sphereo-charcoal block border-b border-sphereo-border pb-1.5 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Settlement Breakdown</span>
          </span>
          <div className="space-y-1 text-sphereo-charcoal/80">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatINR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Voucher Discount:</span>
                <span>-{formatINR(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Handicraft Tax (5% GST):</span>
              <span>{formatINR(order.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Transit:</span>
              <span className="font-bold text-emerald-800">
                {order.shipping === 0 ? 'Complimentary' : formatINR(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between font-serif text-base font-bold text-sphereo-charcoal pt-1.5 border-t border-sphereo-border">
              <span>Settled Total:</span>
              <span>{formatINR(order.total)}</span>
            </div>
            <p className="text-[10px] text-sphereo-wood/70 pt-1">
              Method: {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
