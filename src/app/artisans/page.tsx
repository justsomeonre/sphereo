'use client';

import React, { useState } from 'react';
import { ARTISANS } from '../../data/artisans';
import { CRAFTS } from '../../data/crafts';
import { ArtisanCard } from '../../components/artisan/ArtisanCard';
import { Badge } from '../../components/common/Badge';
import { Search, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export default function ArtisansDirectoryPage() {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtisans = ARTISANS.filter((a) => {
    const matchesCraft = selectedCraftId === 'all' || a.craftId === selectedCraftId;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.region.toLowerCase().includes(q) ||
      a.craftName.toLowerCase().includes(q) ||
      a.capabilities.materials.some((m) => m.toLowerCase().includes(q));
    return matchesCraft && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-sphereo-border pb-6 space-y-3">
        <Badge variant="terracotta" size="sm">
          Master Guild Custodians
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-charcoal">
          Meet the 40 Master Artisans of SphereO
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80 max-w-2xl leading-relaxed">
          Artisans on SphereO are not anonymous suppliers—they are recognized creators, guild leaders, and generational mentors. Explore their studios, inspect their verified materials, and collaborate directly.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artisan name, region (Jaipur, Kutch, Bastar)..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta placeholder:text-sphereo-charcoal/45"
          />
        </div>

        {/* Craft filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-sphereo-wood/75 hidden sm:inline">Craft Guild:</span>
          <select
            value={selectedCraftId}
            onChange={(e) => setSelectedCraftId(e.target.value)}
            className="px-3 py-2 bg-sphereo-ivory border border-sphereo-border rounded text-xs text-sphereo-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
          >
            <option value="all">All 12 Craft Guilds</option>
            {CRAFTS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>

      {filteredArtisans.length === 0 && (
        <div className="p-12 text-center bg-sphereo-linen/40 border border-sphereo-border rounded-md text-xs text-sphereo-wood space-y-2">
          <p className="font-semibold text-sphereo-charcoal text-sm">No artisans found matching your query.</p>
          <button
            onClick={() => {
              setSelectedCraftId('all');
              setSearchQuery('');
            }}
            className="text-sphereo-terracotta underline font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
