import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { RatingBadge } from '../common/Badge';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="block relative p-6 bg-white aspect-square flex items-center justify-center overflow-hidden border-b border-slate-100"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <span className="absolute top-3 left-3 bg-slate-100/90 backdrop-blur-xs text-slate-600 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border border-slate-200/60">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-2">
            {product.rating && (
              <RatingBadge
                rate={product.rating.rate}
                count={product.rating.count}
              />
            )}
          </div>

          {/* Title clamped to 2 lines */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-slate-heading group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400 block -mb-0.5">Price</span>
            <span className="text-lg font-bold text-slate-heading">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-soft active:scale-95 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-primary text-white hover:bg-primary-hover'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 flex-shrink-0 animate-fade-in" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
