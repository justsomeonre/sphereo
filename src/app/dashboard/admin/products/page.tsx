'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '../../../../data/products';
import { formatINR } from '../../../../lib/pricing';
import { Badge } from '../../../../components/common/Badge';
import { ArrowLeft, Search } from 'lucide-react';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const filtered = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.craftName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayed = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="charcoal" size="sm" className="mb-0.5">
              Catalog Governance
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Platform Catalog Inventory ({PRODUCTS.length})
            </h1>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search piece or artisan..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-sphereo-ivory border border-sphereo-border rounded"
          />
        </div>
      </div>

      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sphereo-charcoal">
            <thead className="bg-sphereo-linen/60 border-b border-sphereo-border text-[11px] uppercase tracking-wider text-sphereo-wood font-semibold">
              <tr>
                <th className="p-3.5">Piece Name</th>
                <th className="p-3.5">Craft Guild</th>
                <th className="p-3.5">Artisan Master</th>
                <th className="p-3.5">Base Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Customizable</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sphereo-border">
              {displayed.map((p) => (
                <tr key={p.id} className="hover:bg-sphereo-linen/30 transition-colors">
                  <td className="p-3.5 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded overflow-hidden bg-sphereo-sand shrink-0">
                      <Image src={p.images[0] || ''} alt="" fill className="object-cover" />
                    </div>
                    <span className="font-semibold truncate max-w-[220px]">{p.title}</span>
                  </td>
                  <td className="p-3.5">{p.craftName.split('&')[0]}</td>
                  <td className="p-3.5">{p.artisanName}</td>
                  <td className="p-3.5 font-serif font-semibold">{formatINR(p.basePrice)}</td>
                  <td className="p-3.5">{p.inventory} units</td>
                  <td className="p-3.5">
                    {p.isCustomizable ? (
                      <span className="text-emerald-700 font-bold text-[10px] uppercase">Yes</span>
                    ) : (
                      <span className="text-stone-400 text-[10px] uppercase">Fixed</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-xs text-sphereo-terracotta underline hover:text-sphereo-terracotta-dark"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {displayed.length < filtered.length && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-sphereo-border rounded text-xs font-semibold hover:bg-sphereo-linen"
          >
            Load Next 20 Items ({filtered.length - displayed.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
