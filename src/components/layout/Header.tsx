'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../common/Logo';
import { DemoRoleSwitcher } from './DemoRoleSwitcher';
import { useSphereoStore } from '../../lib/store';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Compass,
  Layers,
  BookOpen,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, favorites, role } = useSphereoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/categories', label: 'Crafts', icon: Layers },
    { href: '/artisans', label: 'Artisans', icon: User },
    { href: '/ai-studio', label: 'SphereO AI', icon: Sparkles, highlight: true },
    { href: '/stories', label: 'Stories', icon: BookOpen },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-sphereo-ivory/95 backdrop-blur-md border-b border-sphereo-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-sphereo-charcoal hover:bg-sphereo-linen rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Logo variant="full" size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 py-1 tracking-wide transition-colors relative ${
                    isActive
                      ? 'text-sphereo-terracotta font-semibold'
                      : 'text-sphereo-charcoal/80 hover:text-sphereo-charcoal'
                  } ${link.highlight ? 'text-sphereo-terracotta font-semibold' : ''}`}
                >
                  {link.highlight && (
                    <Sparkles size={14} className="text-sphereo-terracotta animate-pulse" />
                  )}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sphereo-terracotta rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-sphereo-charcoal/80 hover:text-sphereo-charcoal hover:bg-sphereo-linen rounded-full transition-colors"
              aria-label="Search artisan crafts"
            >
              <Search size={20} />
            </button>

            {/* Role-specific dashboard direct shortcut */}
            {role === 'artisan' && (
              <Link
                href="/dashboard/artisan"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-sphereo-terracotta/10 text-sphereo-terracotta border border-sphereo-terracotta/30 text-xs font-semibold hover:bg-sphereo-terracotta/20 transition-colors"
              >
                <LayoutDashboard size={14} />
                <span>Artisan Studio</span>
              </Link>
            )}

            {role === 'admin' && (
              <Link
                href="/dashboard/admin"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-sphereo-charcoal text-sphereo-ivory text-xs font-semibold hover:bg-sphereo-charcoal/90 transition-colors"
              >
                <LayoutDashboard size={14} />
                <span>Admin Console</span>
              </Link>
            )}

            {/* Favorites Icon */}
            <Link
              href="/favorites"
              className="p-2 text-sphereo-charcoal/80 hover:text-sphereo-charcoal hover:bg-sphereo-linen rounded-full transition-colors relative"
              aria-label="Saved favorites"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-sphereo-terracotta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="p-2 text-sphereo-charcoal/80 hover:text-sphereo-charcoal hover:bg-sphereo-linen rounded-full transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-sphereo-charcoal text-sphereo-ivory text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account / Dashboard Link */}
            <Link
              href={role === 'artisan' ? '/dashboard/artisan' : role === 'admin' ? '/dashboard/admin' : '/account'}
              className="p-2 text-sphereo-charcoal/80 hover:text-sphereo-charcoal hover:bg-sphereo-linen rounded-full transition-colors"
              aria-label="Account menu"
            >
              <User size={20} />
            </Link>

            {/* Demo Role Switcher Dropdown */}
            <div className="ml-1">
              <DemoRoleSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-sphereo-border bg-sphereo-linen/60 py-3 px-4 sm:px-8 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sphereo-charcoal/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Jaipur blue pottery, Kutch Ajrakh stoles, lac bangles, artisans, materials..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-sphereo-ivory border border-sphereo-border rounded-sm focus:outline-none focus:ring-2 focus:ring-sphereo-terracotta/40 placeholder:text-sphereo-charcoal/50"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-sphereo-terracotta text-white rounded-sm font-medium hover:bg-sphereo-terracotta-dark transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 text-sphereo-charcoal/70 hover:text-sphereo-charcoal"
            >
              <X size={18} />
            </button>
          </form>
          <div className="max-w-3xl mx-auto mt-2 flex flex-wrap items-center gap-2 text-xs text-sphereo-wood/70">
            <span>Popular searches:</span>
            {['Blue Pottery', 'Indigo Bangles', 'Terracotta Planters', 'Ajrakh Stoles', 'Gifts under ₹2,000'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(tag)}`);
                  setSearchOpen(false);
                }}
                className="underline hover:text-sphereo-terracotta transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sphereo-border bg-sphereo-ivory p-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium text-sphereo-charcoal hover:bg-sphereo-linen transition-colors"
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sphereo-terracotta bg-sphereo-terracotta/10 px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-sphereo-border space-y-2 text-sm">
            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen rounded"
            >
              <span>Saved Favorites</span>
              <span className="text-xs font-semibold">{favorites.length}</span>
            </Link>
            <Link
              href="/designs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen rounded"
            >
              <span>My AI Designs</span>
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen rounded"
            >
              <span>Order Tracking</span>
            </Link>
            <Link
              href="/account/bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sphereo-charcoal hover:bg-sphereo-linen rounded"
            >
              <span>Artisan Consultations</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
