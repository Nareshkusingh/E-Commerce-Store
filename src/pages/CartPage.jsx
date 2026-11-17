import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import Button from '../components/common/Button';

export default function CartPage() {
  const { items, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-border p-10 shadow-soft">
          <div className="w-20 h-20 rounded-full bg-slate-50 border border-border flex items-center justify-center text-slate-400 mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-heading tracking-tight mb-2">
            Your Cart is Currently Empty
          </h1>
          <p className="text-xs text-slate-muted mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Discover trending essentials and timeless designs.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full" icon={ArrowRight} iconPosition="right">
              Explore Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-heading tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-muted mt-1">
            You have <strong className="text-slate-800">{totalItems}</strong> {totalItems === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
          <Link to="/">
            <Button variant="outline" size="sm" icon={ArrowLeft}>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Items List (Left 7-8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-border p-6 shadow-soft divide-y divide-border">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary (Right 4-5 columns) */}
        <div className="lg:col-span-4 sticky top-28">
          <OrderSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
