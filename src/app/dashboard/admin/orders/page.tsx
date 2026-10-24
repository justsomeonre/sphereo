'use client';

import React from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../../lib/store';
import { formatINR } from '../../../../lib/pricing';
import { Badge } from '../../../../components/common/Badge';
import { ArrowLeft } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders } = useSphereoStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="charcoal" size="sm" className="mb-0.5">
              Financial & Fulfillment Oversight
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Platform Commissions Ledger ({orders.length})
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sphereo-charcoal">
            <thead className="bg-sphereo-linen/60 border-b border-sphereo-border text-[11px] uppercase tracking-wider text-sphereo-wood font-semibold">
              <tr>
                <th className="p-3.5">Order No.</th>
                <th className="p-3.5">Patron</th>
                <th className="p-3.5">Pieces</th>
                <th className="p-3.5">Settlement Total</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sphereo-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-sphereo-linen/30 transition-colors">
                  <td className="p-3.5 font-bold font-serif">{o.orderNumber}</td>
                  <td className="p-3.5">
                    <strong>{o.customerName}</strong>
                    <span className="text-[10px] text-sphereo-wood/70 block">{o.customerEmail}</span>
                  </td>
                  <td className="p-3.5">{o.items.length} item(s)</td>
                  <td className="p-3.5 font-serif font-bold">{formatINR(o.total)}</td>
                  <td className="p-3.5">{o.paymentMethod}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sphereo-linen border border-sphereo-border">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/account/orders/${o.id}`}
                      className="text-xs text-sphereo-terracotta underline font-semibold"
                    >
                      Audit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
