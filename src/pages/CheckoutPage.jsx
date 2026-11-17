import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  MapPin,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSuccessModal from '../components/checkout/OrderSuccessModal';
import OrderSummary from '../components/cart/OrderSummary';
import Button from '../components/common/Button';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, total, totalItems, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState({
    orderNumber: '',
    totalPaid: 0,
    itemCount: 0,
    email: '',
  });

  // Shipping form state pre-filled with logged-in user info
  const [addressData, setAddressData] = useState({
    fullName: user?.displayName || user?.username || 'Alex Morgan',
    email: user?.email || 'alex.morgan@example.com',
    address: '450 Sutter Street, Suite 800',
    city: 'San Francisco',
    state: 'CA',
    zip: '94108',
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });
  const [paymentErrors, setPaymentErrors] = useState({});

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
    setAddressErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
    setPaymentErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForms = () => {
    const addrErrs = {};
    if (!addressData.fullName.trim()) addrErrs.fullName = 'Full name is required';
    if (!addressData.email.trim()) addrErrs.email = 'Email address is required';
    if (!addressData.address.trim()) addrErrs.address = 'Street address is required';
    if (!addressData.city.trim()) addrErrs.city = 'City is required';
    if (!addressData.state.trim()) addrErrs.state = 'State is required';
    if (!addressData.zip.trim()) addrErrs.zip = 'ZIP code is required';

    const payErrs = {};
    if (!paymentData.cardNumber.trim()) payErrs.cardNumber = 'Card number is required';
    if (!paymentData.cardExpiry.trim()) payErrs.cardExpiry = 'Expiry date required';
    if (!paymentData.cardCvc.trim()) payErrs.cardCvc = 'CVC required';

    setAddressErrors(addrErrs);
    setPaymentErrors(payErrs);

    return Object.keys(addrErrs).length === 0 && Object.keys(payErrs).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty. Add items before checking out.');
      return;
    }

    if (!validateForms()) {
      toast.error('Please complete all required shipping & payment fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Realistic payment processing simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const orderNum = 'ROY-' + Math.floor(100000 + Math.random() * 900000).toString();
      const currentTotal = total;
      const currentCount = totalItems;
      const email = addressData.email;

      setConfirmedOrder({
        orderNumber: orderNum,
        totalPaid: currentTotal,
        itemCount: currentCount,
        email: email,
      });

      // Clear cart
      clearCart();
      setIsSubmitting(false);
      setSuccessModalOpen(true);
      toast.success('Order placed successfully.');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      toast.error('Payment processing failed. Please try again.');
    }
  };

  if (items.length === 0 && !successModalOpen) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          You don't have any items in your bag to proceed with checkout.
        </p>
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Secure Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Shipping & Payment
          </h1>
        </div>

        {/* Authenticated user badge */}
        <div className="flex items-center gap-2.5 bg-white border border-border rounded-xl px-3.5 py-2 shadow-sm">
          <img
            src={user?.avatar}
            alt={user?.displayName || user?.username}
            className="w-6 h-6 rounded-full object-cover border border-slate-200"
          />
          <div className="text-xs">
            <span className="text-slate-400">Signed in: </span>
            <span className="font-semibold text-slate-800">{user?.displayName || user?.username}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Columns (Stacked form on mobile, left on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Delivery Address
              </h2>
            </div>
            <AddressForm
              formData={addressData}
              onChange={handleAddressChange}
              errors={addressErrors}
            />
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Payment Details
              </h2>
            </div>
            <PaymentForm
              paymentData={paymentData}
              onChange={handlePaymentChange}
              errors={paymentErrors}
            />
          </div>
        </div>

        {/* Right Columns (Order Summary) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <OrderSummary
            onCheckout={handlePlaceOrder}
            checkoutButtonText={`Confirm Order • $${total.toFixed(2)}`}
            isCheckoutLoading={isSubmitting}
          />
          <div className="text-center">
            <Link
              to="/cart"
              className="text-xs text-slate-500 hover:text-slate-800 hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modify Cart items</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        orderNumber={confirmedOrder.orderNumber}
        totalPaid={confirmedOrder.totalPaid}
        itemCount={confirmedOrder.itemCount}
        customerEmail={confirmedOrder.email}
      />
    </div>
  );
}
