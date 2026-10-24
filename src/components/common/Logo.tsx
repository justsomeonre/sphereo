import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'symbol' | 'wordmark';
  theme?: 'light' | 'dark' | 'terracotta';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

export function SphereoSymbol({ className = 'w-8 h-8', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SphereO artisan emblem"
    >
      <defs>
        <linearGradient id="sphereoWarmGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B66A4B" />
          <stop offset="0.5" stopColor="#B69A63" />
          <stop offset="1" stopColor="#C47D61" />
        </linearGradient>
        <linearGradient id="sphereoThreadGrad" x1="20" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2B3E51" />
          <stop offset="1" stopColor="#B66A4B" />
        </linearGradient>
      </defs>
      
      {/* Outer spherical celestial ring representing the global circle of makers */}
      <circle cx="50" cy="50" r="44" stroke={color === 'currentColor' ? 'url(#sphereoWarmGrad)' : color} strokeWidth="3" strokeDasharray="3 3" opacity="0.6" />
      
      {/* Interwoven artisan warp and weft ribbon curves (Human hand / weaver warp) */}
      <path
        d="M 22 50 C 22 30, 40 22, 50 22 C 60 22, 78 30, 78 50 C 78 70, 60 78, 50 78 C 40 78, 22 70, 22 50 Z"
        stroke={color === 'currentColor' ? 'url(#sphereoWarmGrad)' : color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Dynamic intersecting craft loop representing tactile connection & AI harmony */}
      <path
        d="M 32 30 C 45 42, 55 58, 68 70 M 68 30 C 55 42, 45 58, 32 70"
        stroke={color === 'currentColor' ? 'url(#sphereoThreadGrad)' : color}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      
      {/* Central artisan core bead */}
      <circle cx="50" cy="50" r="6.5" fill={color === 'currentColor' ? '#B66A4B' : color} />
      <circle cx="50" cy="50" r="2.5" fill="#F7F4ED" />
      
      {/* Cardinal artisan points */}
      <circle cx="50" cy="12" r="2.5" fill="#B69A63" />
      <circle cx="88" cy="50" r="2.5" fill="#B69A63" />
      <circle cx="50" cy="88" r="2.5" fill="#B69A63" />
      <circle cx="12" cy="50" r="2.5" fill="#B69A63" />
    </svg>
  );
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  className = '',
  href = '/',
}) => {
  const sizeMap = {
    sm: { symbol: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]' },
    md: { symbol: 'w-8 h-8', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { symbol: 'w-10 h-10', text: 'text-3xl', sub: 'text-xs' },
    xl: { symbol: 'w-14 h-14', text: 'text-4xl', sub: 'text-sm' },
  };

  const textColor = {
    dark: 'text-sphereo-charcoal',
    light: 'text-sphereo-ivory',
    terracotta: 'text-sphereo-terracotta',
  }[theme];

  const subColor = {
    dark: 'text-sphereo-wood/70',
    light: 'text-sphereo-linen/80',
    terracotta: 'text-sphereo-charcoal/70',
  }[theme];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {variant !== 'wordmark' && (
        <SphereoSymbol className={`${sizeMap[size].symbol} shrink-0`} />
      )}
      {variant !== 'symbol' && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif tracking-wider font-semibold ${textColor} ${sizeMap[size].text}`}>
            SPHEREO
          </span>
          <span className={`font-sans uppercase tracking-[0.22em] font-medium mt-0.5 ${subColor} ${sizeMap[size].sub}`}>
            Artisan Studio
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-sphereo-terracotta/40 rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
};
