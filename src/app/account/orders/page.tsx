'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../lib/store';
import { formatINR } from '../../../lib/pricing';
import { Badge } from '../../../components/common/Badge';
import { Package, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AccountOrdersPage() {
  const { orders } = useSphereoStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="terracotta" size="sm" className="mb-0.5">
              Patron Ledger
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Commission History ({orders.length})
            </h1>
          </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 shadow-xs hover:border-sphereo-terracotta/40 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sphereo-border pb-3 text-xs">
                <div>
                  <span className="font-bold text-sphereo-charcoal text-sm font-serif">
                    {order.orderNumber}
                  </span>
                  <span className="text-sphereo-wood/70 ml-2">
                    Placed {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sphereo-linen text-sphereo-charcoal border border-sphereo-border">
                    {order.status}
                  </span>
                  <span className="font-serif font-bold text-sphereo-charcoal text-sm">
                    {formatINR(order.total)}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-sphereo-charcoal">{item.productTitle}</span>
                      <span className="text-sphereo-wood/70 text-[11px] block">
                        Qty {item.quantity} • by {item.artisanName}
                        {item.customization ? ` (Customized)` : ''}
                      </span>
                    </div>
                    <span className="font-serif font-medium">
                      {formatINR(item.unitTotalPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-sphereo-border flex items-center justify-between text-xs">
                <span className="text-sphereo-wood/75">
                  Delivering to: {order.shippingAddress.city}, {order.shippingAddress.state}
                </span>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="inline-flex items-center gap-1 font-bold text-sphereo-terracotta hover:underline"
                >
                  <span>View Timeline & Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
          <Package size={24} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
            No commissions placed yet
          </h3>
          <p className="text-xs text-sphereo-wood/80">
            Browse our catalog or use SphereO AI to commission your first piece.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-1 px-4 py-2 bg-sphereo-terracotta text-white rounded text-xs font-semibold"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
