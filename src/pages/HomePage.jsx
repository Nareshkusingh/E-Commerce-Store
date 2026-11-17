import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import useDebounce from '../hooks/useDebounce';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [sortBy, setSortBy] = useState('default');

  // Load categories once
  useEffect(() => {
    async function loadCategories() {
      try {
        const catData = await getCategories();
        setCategories(catData);
      } catch (e) {
        console.error('Failed fetching categories', e);
      }
    }
    loadCategories();
  }, []);

  // Fetch products when categoryParam changes
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(categoryParam === 'all' ? '' : categoryParam);
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
      setError('Unable to load products from server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryParam]);

  // Handle Category Filter change
  const handleCategoryChange = (cat) => {
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, debouncedSearch, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Announcement */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 mb-10 overflow-hidden shadow-soft-lg">
        {/* Background glow circle */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-primary-light text-xs font-semibold tracking-wide border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Spring / Summer 2026 Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Minimalist Essentials for Modern Living.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Explore curated electronics, premium jewelry, and refined apparel. High aesthetics, honest pricing, and instant checkout.
          </p>
        </div>
      </div>

      {/* Product Filter & Controls */}
      <ProductFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={categoryParam}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredProducts.length}
        onResetFilters={handleResetFilters}
      />

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        onRetry={fetchProducts}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
