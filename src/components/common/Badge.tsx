import React from 'react';

interface BadgeProps {
  variant?: 'terracotta' | 'brass' | 'sage' | 'charcoal' | 'linen' | 'indigo' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'terracotta',
  size = 'sm',
  children,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  const variantClasses = {
    terracotta: 'bg-sphereo-terracotta/15 text-sphereo-terracotta-dark font-medium border border-sphereo-terracotta/25',
    brass: 'bg-sphereo-brass/15 text-sphereo-wood font-medium border border-sphereo-brass/30',
    sage: 'bg-sphereo-sage/20 text-sphereo-charcoal font-medium border border-sphereo-sage/40',
    indigo: 'bg-sphereo-indigo/15 text-sphereo-indigo font-medium border border-sphereo-indigo/30',
    charcoal: 'bg-sphereo-charcoal text-sphereo-ivory font-medium',
    linen: 'bg-sphereo-linen text-sphereo-charcoal border border-sphereo-border',
    outline: 'border border-sphereo-charcoal/30 text-sphereo-charcoal',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full uppercase tracking-wider ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
