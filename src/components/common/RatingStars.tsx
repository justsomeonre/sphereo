import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-600">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={
              star <= Math.round(rating)
                ? 'fill-amber-500 text-amber-500'
                : 'text-stone-300'
            }
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-sphereo-charcoal">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-sphereo-charcoal/60">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
