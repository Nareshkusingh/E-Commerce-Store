import React from 'react';
import Skeleton from '../common/Skeleton';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft p-5 flex flex-col justify-between">
      <div>
        {/* Image skeleton */}
        <div className="aspect-square w-full rounded-xl bg-slate-100 flex items-center justify-center p-4 mb-4">
          <Skeleton className="w-2/3 h-2/3" rounded="rounded-xl" />
        </div>

        {/* Rating and category */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-16" rounded="rounded-md" />
          <Skeleton className="h-4 w-12" rounded="rounded-md" />
        </div>

        {/* Title skeleton - 2 lines */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" rounded="rounded" />
          <Skeleton className="h-4 w-3/4" rounded="rounded" />
        </div>
      </div>

      {/* Price & button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <Skeleton className="h-3 w-8" rounded="rounded" />
          <Skeleton className="h-5 w-16" rounded="rounded" />
        </div>
        <Skeleton className="h-9 w-20" rounded="rounded-xl" />
      </div>
    </div>
  );
}
