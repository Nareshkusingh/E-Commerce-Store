import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import useDebounce from '../hooks/useDebounce';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const urlSearchParam = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(urlSearchParam);
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [sortBy, setSortBy] = useState('default');

  // Sync internal state if url search changes
  useEffect(() => {
    if (urlSearchParam !== searchQuery) {
      setSearchQuery(urlSearchParam);
    }
  }, [urlSearchParam]);

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
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const params = new URLSearchParams(searchParams);
    if (val.trim()) {
      params.set('search', val.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
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
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
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
      {/* Sleek Retail Editorial Banner */}
      <div className="relative rounded-2xl bg-slate-900 text-white p-8 sm:p-12 md:p-14 mb-10 overflow-hidden shadow-sm">
        <div className="relative max-w-2xl space-y-3 z-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300">
            Curated Essentials
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            Refined Living. Enduring Design.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
            Discover tailored wardrobe pieces, fine accessories, and everyday technical essentials designed for contemporary utility.
          </p>
        </div>
      </div>

      {/* Product Filter & Controls */}
      <ProductFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
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
