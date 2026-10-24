'use client';

import React, { useState, useMemo } from 'react';
import { CRAFTS } from '../../data/crafts';
import { ARTISANS } from '../../data/artisans';
import { filterCatalog, CatalogFilterOptions } from '../../lib/catalog';
import { ProductCard } from '../../components/product/ProductCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';

export default function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [selectedCraftId, setSelectedCraftId] = useState<string>('all');
  const [selectedArtisanId, setSelectedArtisanId] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 35000]);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [isReadyToShip, setIsReadyToShip] = useState(false);
  const [sortBy, setSortBy] = useState<CatalogFilterOptions['sortBy']>('relevance');
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const PAGE_SIZE = 16;

  const filterOptions: CatalogFilterOptions = useMemo(
    () => ({
      query,
      craftId: selectedCraftId === 'all' ? undefined : selectedCraftId,
      artisanId: selectedArtisanId === 'all' ? undefined : selectedArtisanId,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      isCustomizable: isCustomizable || undefined,
      isReadyToShip: isReadyToShip || undefined,
      sortBy,
    }),
    [query, selectedCraftId, selectedArtisanId, priceRange, isCustomizable, isReadyToShip, sortBy]
  );

  const filteredProducts = useMemo(() => filterCatalog(filterOptions), [filterOptions]);

  // Paginated slice
  const displayedProducts = useMemo(
    () => filteredProducts.slice(0, page * PAGE_SIZE),
    [filteredProducts, page]
  );

  const hasActiveFilters =
    query.trim() !== '' ||
    selectedCraftId !== 'all' ||
    selectedArtisanId !== 'all' ||
    priceRange[0] > 0 ||
    priceRange[1] < 35000 ||
    isCustomizable ||
    isReadyToShip;

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCraftId('all');
    setSelectedArtisanId('all');
    setPriceRange([0, 35000]);
    setIsCustomizable(false);
    setIsReadyToShip(false);
    setSortBy('relevance');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-sphereo-border pb-6">
        <Badge variant="terracotta" size="sm" className="mb-2">
          Global Craft Catalog
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
          Discover Handcrafted Heirlooms
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1 max-w-2xl">
          Search over 300 distinctive pieces across 12 GI-certified Indian artisan guilds. Every purchase supports independent master makers directly.
        </p>
      </div>

      {/* Search & Mobile Filter Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by craft, material, motif, or artisan name..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta placeholder:text-sphereo-charcoal/45"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50 hover:text-sphereo-charcoal"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs border border-sphereo-border rounded bg-sphereo-ivory font-medium"
          >
            <Filter size={14} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-sphereo-terracotta" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-sphereo-wood/75 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-2 bg-sphereo-ivory border border-sphereo-border rounded text-xs text-sphereo-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
            >
              <option value="relevance">Featured & Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Patron Rating</option>
              <option value="newest">Newest Creations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout (Sidebar Filters + Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          } bg-sphereo-linen/40 lg:bg-transparent p-5 lg:p-0 rounded-lg lg:rounded-none border lg:border-none border-sphereo-border`}
        >
          <div className="flex items-center justify-between border-b border-sphereo-border pb-3">
            <span className="font-serif text-base font-bold text-sphereo-charcoal flex items-center gap-2">
              <SlidersHorizontal size={16} />
              Filter Catalog
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-sphereo-terracotta hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Quick Toggles: Customizable & Ready to Ship */}
          <div className="space-y-2.5 border-b border-sphereo-border pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Preferences
            </span>
            <label className="flex items-center gap-2 text-xs text-sphereo-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => {
                  setIsCustomizable(e.target.checked);
                  setPage(1);
                }}
                className="rounded text-sphereo-terracotta focus:ring-sphereo-terracotta"
              />
              <span className="flex items-center gap-1 font-medium">
                <Sparkles size={12} className="text-sphereo-terracotta" />
                Customizable Only
              </span>
            </label>
            <label className="flex items-center gap-2 text-xs text-sphereo-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={isReadyToShip}
                onChange={(e) => {
                  setIsReadyToShip(e.target.checked);
                  setPage(1);
                }}
                className="rounded text-sphereo-terracotta focus:ring-sphereo-terracotta"
              />
              <span className="font-medium">Ready to Ship Immediately</span>
            </label>
          </div>

          {/* Craft Guild Selection */}
          <div className="space-y-2 border-b border-sphereo-border pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Craft Guild
            </span>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedCraftId('all');
                  setPage(1);
                }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                  selectedCraftId === 'all'
                    ? 'bg-sphereo-terracotta text-white font-semibold'
                    : 'text-sphereo-charcoal/80 hover:bg-sphereo-linen'
                }`}
              >
                All 12 Craft Guilds
              </button>
              {CRAFTS.map((craft) => (
                <button
                  key={craft.id}
                  type="button"
                  onClick={() => {
                    setSelectedCraftId(craft.id);
                    setPage(1);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors truncate ${
                    selectedCraftId === craft.id
                      ? 'bg-sphereo-terracotta text-white font-semibold'
                      : 'text-sphereo-charcoal/80 hover:bg-sphereo-linen'
                  }`}
                >
                  {craft.name}
                </button>
              ))}
            </div>
          </div>

          {/* Artisan Selection */}
          <div className="space-y-2 border-b border-sphereo-border pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              Artisan Master
            </span>
            <select
              value={selectedArtisanId}
              onChange={(e) => {
                setSelectedArtisanId(e.target.value);
                setPage(1);
              }}
              className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded text-xs text-sphereo-charcoal focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
            >
              <option value="all">All Master Artisans</option>
              {ARTISANS.slice(0, 16).map((artisan) => (
                <option key={artisan.id} value={artisan.id}>
                  {artisan.name} ({artisan.region.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 border-b border-sphereo-border pb-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-sphereo-charcoal">
                Max Price
              </span>
              <span className="font-semibold text-sphereo-terracotta">
                ₹{priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={35000}
              step={500}
              value={priceRange[1]}
              onChange={(e) => {
                setPriceRange([priceRange[0], Number(e.target.value)]);
                setPage(1);
              }}
              className="w-full accent-sphereo-terracotta"
            />
            <div className="flex justify-between text-[10px] text-sphereo-wood/70">
              <span>₹500</span>
              <span>₹35,000+</span>
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active Chips & Total Count */}
          <div className="flex items-center justify-between text-xs text-sphereo-wood/80">
            <span>
              Showing <strong>{displayedProducts.length}</strong> of{' '}
              <strong>{filteredProducts.length}</strong> artisan pieces
            </span>
            {hasActiveFilters && (
              <span className="text-sphereo-terracotta font-medium">
                Filters active
              </span>
            )}
          </div>

          {/* Products Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-sphereo-linen/30 border border-sphereo-border rounded-lg space-y-3">
              <div className="w-12 h-12 bg-sphereo-linen rounded-full flex items-center justify-center mx-auto text-sphereo-charcoal/50">
                <Search size={22} />
              </div>
              <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
                No matching handmade creations found
              </h3>
              <p className="text-xs text-sphereo-wood/80 max-w-sm mx-auto">
                Try widening your price range or clearing specific craft filters to discover other heirloom crafts.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}

          {/* Pagination Load More */}
          {displayedProducts.length < filteredProducts.length && (
            <div className="pt-8 text-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load More Creations ({filteredProducts.length - displayedProducts.length} remaining)
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
