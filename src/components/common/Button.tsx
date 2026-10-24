import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'brass' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-sm';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-sphereo-terracotta text-sphereo-ivory hover:bg-sphereo-terracotta-dark focus:ring-sphereo-terracotta shadow-sm active:translate-y-0.5',
    secondary:
      'bg-sphereo-charcoal text-sphereo-ivory hover:bg-sphereo-charcoal/90 focus:ring-sphereo-charcoal shadow-sm',
    outline:
      'border border-sphereo-charcoal/30 text-sphereo-charcoal hover:bg-sphereo-linen/50 focus:ring-sphereo-charcoal/40',
    brass:
      'bg-sphereo-brass text-sphereo-charcoal hover:bg-sphereo-brass-light focus:ring-sphereo-brass font-semibold shadow-sm',
    ghost:
      'text-sphereo-charcoal hover:bg-sphereo-linen/40 focus:ring-sphereo-charcoal/20',
    danger:
      'bg-red-700 text-white hover:bg-red-800 focus:ring-red-600 shadow-sm',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
