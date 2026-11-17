import React, { useState } from 'react';
import { Tag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';

export default function OrderSummary({
  onCheckout,
  showCheckoutButton = true,
  checkoutButtonText = 'Proceed to Checkout',
  isCheckoutLoading = false,
}) {
  const {
    subtotal,
    discountPercent,
    discountAmount,
    discountedSubtotal,
    shipping,
    tax,
    total,
    promoCode,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    isFreeShipping,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromo(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setInputCode('');
    }
  };

  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diff = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-6">
      <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-border uppercase">
        Summary
      </h2>

      {/* Free Shipping Tracker */}
      <div className="p-3 bg-slate-50 rounded-xl border border-border text-xs">
        {isFreeShipping ? (
          <div className="text-emerald-700 font-medium">
            You qualify for <strong>Complimentary Standard Shipping</strong>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center text-slate-600 mb-1.5">
              <span>Free Shipping Eligibility</span>
              <span className="font-semibold text-slate-900">${diff.toFixed(2)} remaining</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Promo ({promoCode} -{discountPercent}%)
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Estimated Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-700 font-semibold uppercase text-xs">
                Free
              </span>
            ) : (
              <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Sales Tax (8%)</span>
          <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-baseline">
          <span className="text-sm sm:text-base font-bold text-slate-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ${total.toFixed(2)}
            </span>
            <p className="text-[11px] text-slate-400">USD &bull; Taxes calculated</p>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      {!promoCode ? (
        <form onSubmit={handleApplyPromo} className="space-y-1.5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Promo Code"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  setPromoError('');
                }}
                className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 placeholder:normal-case placeholder:tracking-normal"
              />
            </div>
            <Button type="submit" variant="secondary" size="sm">
              Apply
            </Button>
          </div>
          {promoError && <p className="text-xs text-rose-600">{promoError}</p>}
        </form>
      ) : (
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Code <strong>{promoCode}</strong> applied</span>
          </div>
          <button
            onClick={removePromo}
            className="text-xs text-slate-500 underline hover:text-slate-800 ml-2"
          >
            Remove
          </button>
        </div>
      )}

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCheckout}
          isLoading={isCheckoutLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          {checkoutButtonText}
        </Button>
      )}

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>256-bit SSL encrypted checkout</span>
      </div>
    </div>
  );
}
