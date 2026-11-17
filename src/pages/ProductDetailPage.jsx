import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getProductById,
  getProducts,
} from '../services/api';
import { useCart } from '../hooks/useCart';
import { RatingBadge } from '../components/common/Badge';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import ProductCard from '../components/product/ProductCard';
import {
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Zap,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Load related products from same category
        if (data?.category) {
          try {
            const related = await getProducts(data.category);
            setRelatedProducts(related.filter((p) => String(p.id) !== String(id)).slice(0, 4));
          } catch (relErr) {
            console.warn('Could not load related products', relErr);
          }
        }
      } catch (err) {
        console.error('Failed fetching product', err);
        setError('This product could not be found or was removed.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Skeleton className="h-6 w-64 mb-8" rounded="rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-4 w-28" rounded="rounded-md" />
            <Skeleton className="h-10 w-full" rounded="rounded-lg" />
            <Skeleton className="h-6 w-32" rounded="rounded-md" />
            <Skeleton className="h-8 w-24" rounded="rounded-md" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" rounded="rounded" />
              <Skeleton className="h-4 w-full" rounded="rounded" />
              <Skeleton className="h-4 w-2/3" rounded="rounded" />
            </div>
            <div className="pt-6 space-y-3">
              <Skeleton className="h-12 w-full" rounded="rounded-xl" />
              <Skeleton className="h-12 w-full" rounded="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-heading mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-muted mb-6">
          {error || "The item you're looking for doesn't exist or is currently unavailable."}
        </p>
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Store
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/?category=${encodeURIComponent(product.category)}`}
          className="capitalize hover:text-slate-700 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-medium truncate max-w-xs sm:max-w-md">
          {product.title}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column: Image Showcase */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 flex items-center justify-center aspect-square shadow-soft relative group">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-lg border border-slate-200">
            {product.category}
          </span>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {product.rating && (
                  <RatingBadge
                    rate={product.rating.rate}
                    count={product.rating.count}
                    size="md"
                  />
                )}
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  In Stock & Ready to Ship
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-heading tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-border">
              <span className="text-3xl sm:text-4xl font-bold text-slate-heading tracking-tight">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">USD + Free Shipping over $50</span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="pt-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Quantity
              </span>
              <div className="inline-flex items-center border border-border rounded-xl bg-white shadow-soft overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                icon={isAddedRecently ? Check : ShoppingBag}
              >
                {isAddedRecently ? 'Added to Cart!' : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="sm:w-44"
                onClick={handleBuyNow}
                icon={Zap}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Fast Dispatched</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-primary flex-shrink-0" />
                <span>30-Day Free Return</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Authentic Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Similar Items
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-heading tracking-tight mt-1">
                More in {product.category}
              </h2>
            </div>
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
