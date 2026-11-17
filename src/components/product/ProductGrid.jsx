import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { PackageOpen, RotateCcw } from 'lucide-react';
import Button from '../common/Button';

export default function ProductGrid({
  products = [],
  isLoading = false,
  error = null,
  onRetry,
  onResetFilters,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-100 p-12 text-center max-w-lg mx-auto shadow-soft">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
          <RotateCcw className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-heading mb-1">
          Unable to Load Products
        </h3>
        <p className="text-xs text-slate-muted mb-6">
          {error || 'An error occurred while fetching the product catalog.'}
        </p>
        {onRetry && (
          <Button variant="primary" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center max-w-md mx-auto shadow-soft">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-border text-slate-400 mx-auto flex items-center justify-center mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-heading mb-1">
          No Products Found
        </h3>
        <p className="text-xs text-slate-muted mb-6">
          We couldn't find any products matching your current search or filter criteria.
        </p>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
