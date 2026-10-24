'use client';

import React from 'react';
import Link from 'next/link';
import { CRAFTS } from '../../../../data/crafts';
import { PRODUCTS } from '../../../../data/products';
import { ARTISANS } from '../../../../data/artisans';
import { Badge } from '../../../../components/common/Badge';
import { ArrowLeft } from 'lucide-react';

export default function AdminCategoriesPage() {
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
              Taxonomy Architecture
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              12 Craft Guild Categories
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sphereo-charcoal">
            <thead className="bg-sphereo-linen/60 border-b border-sphereo-border text-[11px] uppercase tracking-wider text-sphereo-wood font-semibold">
              <tr>
                <th className="p-3.5">Craft Guild</th>
                <th className="p-3.5">Regional GI Origin</th>
                <th className="p-3.5">Heritage Era</th>
                <th className="p-3.5">Master Artisans</th>
                <th className="p-3.5">Catalog Pieces</th>
                <th className="p-3.5 text-right">Guild Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sphereo-border">
              {CRAFTS.map((c) => {
                const countArtisans = ARTISANS.filter((a) => a.craftId === c.id).length;
                const countProducts = PRODUCTS.filter((p) => p.craftId === c.id).length;

                return (
                  <tr key={c.id} className="hover:bg-sphereo-linen/30 transition-colors">
                    <td className="p-3.5 font-bold font-serif">{c.name}</td>
                    <td className="p-3.5">{c.region}</td>
                    <td className="p-3.5">{c.heritageEra.split('(')[0]}</td>
                    <td className="p-3.5 font-semibold">{countArtisans} verified</td>
                    <td className="p-3.5 font-semibold">{countProducts} listed</td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/categories/${c.slug}`}
                        className="text-xs text-sphereo-terracotta underline font-semibold"
                      >
                        Explore Guild
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
