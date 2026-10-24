'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { CustomizationViewer } from '../../../components/customization/CustomizationViewer';
import { Badge } from '../../../components/common/Badge';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CustomizeProductPage() {
  const params = useParams();
  const productId = params?.productId as string;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-sphereo-border pb-4">
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-sphereo-wood hover:text-sphereo-terracotta transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          <span>Back to Product Details</span>
        </Link>

        <Badge variant="terracotta" size="sm">
          Interactive Artisan Studio
        </Badge>
      </div>

      {/* Main Interactive Customization Workspace */}
      <CustomizationViewer product={product} />
    </div>
  );
}
