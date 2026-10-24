'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MESSAGES = [
  { text: 'Meet the maker behind what you wear.', link: '/artisans', cta: 'Explore Artisans' },
  { text: 'AI that respects human hands. Introducing SphereO AI Studio.', link: '/ai-studio', cta: 'Try AI Studio' },
  { text: 'Complimentary insured shipping on all handcrafted orders over ₹1,999.', link: '/discover', cta: 'Shop Catalog' },
  { text: 'Every craft has a story. Discover living Indian heritage.', link: '/stories', cta: 'Read Stories' },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  const current = MESSAGES[currentIndex];

  return (
    <aside 
      className="bg-sphereo-charcoal text-sphereo-ivory text-xs py-2 px-4 border-b border-sphereo-charcoal/20 relative z-30 transition-all"
      aria-label="Announcement"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <Sparkles size={13} className="text-sphereo-brass shrink-0 animate-pulse" />
          <span className="font-sans font-normal tracking-wide truncate">
            {current.text}
          </span>
          <Link
            href={current.link}
            className="inline-flex items-center gap-0.5 text-sphereo-brass hover:text-sphereo-brass-light underline font-medium ml-1 shrink-0 transition-colors"
          >
            {current.cta}
            <ChevronRight size={12} />
          </Link>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-sphereo-linen/60 hover:text-sphereo-ivory p-0.5 rounded transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};
