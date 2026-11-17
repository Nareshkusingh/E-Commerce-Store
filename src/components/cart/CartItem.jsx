import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border last:border-0">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Link
          to={`/product/${item.id}`}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-border rounded-xl p-2.5 flex items-center justify-center flex-shrink-0 group overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            {item.category}
          </span>
          <Link
            to={`/product/${item.id}`}
            className="block text-sm sm:text-base font-semibold text-slate-heading hover:text-primary transition-colors line-clamp-1"
          >
            {item.title}
          </Link>
          <div className="text-xs text-slate-500 mt-1">
            Unit Price: <span className="font-medium text-slate-700">${item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center border border-border rounded-xl bg-white shadow-soft overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-slate-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <span className="text-base font-bold text-slate-heading">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-slate-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
