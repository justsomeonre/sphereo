import { Product } from './types';
import { PRODUCTS } from '../data/products';

export interface CatalogFilterOptions {
  query?: string;
  craftId?: string;
  artisanId?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  color?: string;
  isCustomizable?: boolean;
  isReadyToShip?: boolean;
  minRating?: number;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export function filterCatalog(options: CatalogFilterOptions): Product[] {
  let results = [...PRODUCTS];

  // Text search
  if (options.query && options.query.trim()) {
    const q = options.query.toLowerCase().trim();
    results = results.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchCraft = p.craftName.toLowerCase().includes(q);
      const matchArtisan = p.artisanName.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchMaterials = p.materials.some((m) => m.toLowerCase().includes(q));
      const matchColors = p.colors.some((c) => c.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCraft || matchArtisan || matchTags || matchMaterials || matchColors;
    });
  }

  // Craft filter
  if (options.craftId && options.craftId !== 'all') {
    results = results.filter((p) => p.craftId === options.craftId);
  }

  // Artisan filter
  if (options.artisanId && options.artisanId !== 'all') {
    results = results.filter((p) => p.artisanId === options.artisanId);
  }

  // Price range
  if (options.minPrice !== undefined) {
    results = results.filter((p) => p.basePrice >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    results = results.filter((p) => p.basePrice <= options.maxPrice!);
  }

  // Material filter
  if (options.material && options.material !== 'all') {
    const mat = options.material.toLowerCase();
    results = results.filter((p) => p.materials.some((m) => m.toLowerCase().includes(mat)));
  }

  // Color filter
  if (options.color && options.color !== 'all') {
    const col = options.color.toLowerCase();
    results = results.filter((p) => p.colors.some((c) => c.toLowerCase().includes(col)));
  }

  // Customizable only
  if (options.isCustomizable) {
    results = results.filter((p) => p.isCustomizable);
  }

  // Ready to ship only
  if (options.isReadyToShip) {
    results = results.filter((p) => p.isReadyToShip);
  }

  // Min rating
  if (options.minRating) {
    results = results.filter((p) => p.rating >= options.minRating!);
  }

  // Sorting
  switch (options.sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      results.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case 'relevance':
    default:
      // Featured items first
      results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return results;
}
