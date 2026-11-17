import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber,
  totalPaid,
  itemCount,
  customerEmail,
}) {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={handleContinueShopping} maxWidth="max-w-md">
      <div className="text-center py-2 space-y-5">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center border border-emerald-100 shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Payment Confirmed
          </span>
          <h2 className="text-2xl font-bold text-slate-heading tracking-tight mt-1">
            Thank you for your order!
          </h2>
          <p className="text-xs text-slate-muted mt-1.5">
            Order confirmation and receipt has been sent to{' '}
            <strong className="text-slate-800">{customerEmail || 'your email'}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-border rounded-xl p-4 text-xs text-left space-y-2.5">
          <div className="flex justify-between pb-2 border-b border-border">
            <span className="text-slate-500">Order Number</span>
            <span className="font-mono font-semibold text-slate-800">
              #{orderNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Items Purchased</span>
            <span className="font-medium text-slate-800">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estimated Delivery</span>
            <span className="font-medium text-slate-800 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {formattedDelivery}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border font-semibold text-sm">
            <span className="text-slate-800">Total Charged</span>
            <span className="text-primary font-bold">${totalPaid.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleContinueShopping}
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </Modal>
  );
}
