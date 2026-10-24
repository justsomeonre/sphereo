'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../../lib/store';
import { ARTISANS } from '../../../../data/artisans';
import { formatINR } from '../../../../lib/pricing';
import { OrderStatus } from '../../../../lib/types';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import {
  Package,
  ArrowLeft,
  Clock,
  ArrowRight,
  CheckCircle2,
  Truck,
  Flame,
} from 'lucide-react';

export default function ArtisanOrdersPage() {
  const { activeArtisanId, orders, updateOrderStatus } = useSphereoStore();
  const artisan = ARTISANS.find((a) => a.id === activeArtisanId) || ARTISANS[0];

  const artisanOrders = orders.filter((o) =>
    o.items.some((i) => i.artisanId === artisan.id)
  );

  const statusTransitions: Record<string, OrderStatus> = {
    'Order Placed': 'Awaiting Artisan Confirmation',
    'Awaiting Artisan Confirmation': 'Materials Prepared',
    'Materials Prepared': 'Crafting in Progress',
    'Crafting in Progress': 'Quality Check',
    'Quality Check': 'Ready to Ship',
    'Ready to Ship': 'Shipped',
    'Shipped': 'Delivered',
  };

  const handleAdvanceStatus = (orderId: string, currentStatus: string) => {
    const nextStatus = statusTransitions[currentStatus];
    if (nextStatus) {
      updateOrderStatus(
        orderId,
        nextStatus,
        `Stage advanced to "${nextStatus}" by Master ${artisan.name}.`
      );
    }
  };

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
              Workshop Studio Ledger
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Active Production Orders ({artisanOrders.length})
            </h1>
          </div>
        </div>

        <span className="text-xs text-sphereo-wood/75">
          Studio: {artisan.name} ({artisan.region})
        </span>
      </div>

      {artisanOrders.length > 0 ? (
        <div className="space-y-6">
          {artisanOrders.map((order) => {
            const nextStatus = statusTransitions[order.status];

            return (
              <div
                key={order.id}
                className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-5 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sphereo-border pb-3 text-xs">
                  <div>
                    <span className="font-bold text-sphereo-charcoal text-sm font-serif">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-sphereo-wood/70 ml-2">
                      Patron: {order.customerName} ({order.customerEmail})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sphereo-terracotta/10 text-sphereo-terracotta border border-sphereo-terracotta/30">
                      Current: {order.status}
                    </span>
                    <span className="font-serif font-bold text-sphereo-charcoal text-sm">
                      {formatINR(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2 text-xs">
                  {order.items
                    .filter((item) => item.artisanId === artisan.id)
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sphereo-charcoal">{item.productTitle}</span>
                          <span className="text-[11px] text-sphereo-wood/75 block">
                            Qty: {item.quantity} • Unit Price: {formatINR(item.unitTotalPrice)}
                          </span>
                          {item.customization && (
                            <div className="text-[10px] text-sphereo-terracotta font-medium mt-0.5">
                              Custom Specs: {item.customization.color} • {item.customization.material}
                              {item.customization.engravingText ? ` • Inscribed: “${item.customization.engravingText}”` : ''}
                            </div>
                          )}
                        </div>
                        <span className="font-serif font-bold">
                          {formatINR(item.unitTotalPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Shipping & Delivery Address */}
                <div className="text-xs text-sphereo-wood/80">
                  <span className="font-bold text-sphereo-charcoal">Delivery Address: </span>
                  <span>{order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </div>

                {/* Artisan Stage Transition Controls */}
                <div className="pt-3 border-t border-sphereo-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-sphereo-wood/75 flex items-center gap-1.5">
                    <Clock size={13} className="text-sphereo-terracotta" />
                    <span>Advance order stage to notify patron in real time:</span>
                  </div>

                  {nextStatus ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAdvanceStatus(order.id, order.status)}
                    >
                      <CheckCircle2 size={14} />
                      <span>Advance to &quot;{nextStatus}&quot;</span>
                    </Button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Order Delivered & Settled
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
          <Package size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            No active orders for this artisan studio
          </h3>
          <p className="text-xs text-sphereo-wood/80 max-w-sm mx-auto">
            Place a demo order from the catalog or switch master artisan profiles above.
          </p>
        </div>
      )}
    </div>
  );
}
