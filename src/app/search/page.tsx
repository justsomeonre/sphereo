'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { filterCatalog } from '../../lib/catalog';
import { ProductCard } from '../../components/product/ProductCard';
import { Badge } from '../../components/common/Badge';
import { Search, ArrowLeft } from 'lucide-react';

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return filterCatalog({ query: query.trim() });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="border-b border-sphereo-border pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs text-sphereo-wood">
          <Link href="/discover" className="hover:text-sphereo-terracotta flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Discover</span>
          </Link>
          <span>/</span>
          <span>Search Results</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="terracotta" size="sm" className="mb-1">
              Search Index
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-sphereo-charcoal">
              {query ? `Search Results for “${query}”` : 'Search Handmade Indian Heritage'}
            </h1>
          </div>

          <span className="text-xs text-sphereo-wood/80 font-medium">
            {results.length} pieces found
          </span>
        </div>

        {/* Search input field */}
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crafts, artisans, materials, motifs..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
          />
        </div>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : query.trim() ? (
        <div className="p-16 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg max-w-md mx-auto space-y-3">
          <Search size={28} className="mx-auto text-sphereo-charcoal/40" />
          <h3 className="font-serif text-xl font-bold text-sphereo-charcoal">
            No creations matched &quot;{query}&quot;
          </h3>
          <p className="text-xs text-sphereo-wood/80">
            Try searching for broad terms like &quot;pottery&quot;, &quot;silk&quot;, &quot;lac&quot;, &quot;bangles&quot;, or &quot;Jaipur&quot;.
          </p>
        </div>
      ) : (
        <div className="p-16 text-center text-xs text-sphereo-wood">
          Please enter a search keyword above.
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-sphereo-wood">Loading search catalog...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
