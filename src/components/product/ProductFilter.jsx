import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [],
  sortBy,
  onSortChange,
  totalResults = 0,
  onResetFilters,
}) {
  const categoryLabels = {
    all: 'All Products',
    electronics: 'Electronics',
    jewelery: 'Jewelry',
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };

  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'default';

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products by title or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-border rounded-xl text-sm placeholder:text-slate-400 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-white border border-border rounded-xl pl-8 pr-8 py-2.5 text-xs font-semibold text-slate-700 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', ...categories].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-soft font-semibold'
                    : 'bg-white border border-border text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-soft'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Counter and reset */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{totalResults}</strong> {totalResults === 1 ? 'item' : 'items'}
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
