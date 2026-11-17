import React from 'react';
import { Star } from 'lucide-react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-primary-light text-primary border-primary/20',
    rating: 'bg-amber-50 text-amber-700 border-amber-200/60',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    category: 'bg-slate-100 text-slate-600 border-slate-200/80 hover:bg-slate-200/70',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border select-none transition-colors ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </span>
  );
}

export function RatingBadge({ rate = 0, count, size = 'sm' }) {
  return (
    <div className="inline-flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 text-amber-800 rounded-md px-2 py-0.5 text-xs font-medium">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span>{rate.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-amber-600/70 text-[11px]">({count})</span>
      )}
    </div>
  );
}
