import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  MapPin,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
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

  // Shipping form state pre-filled with user info if available
  const [addressData, setAddressData] = useState({
    fullName: user?.name || 'Morrison David',
    email: user?.email || 'morrison@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
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
      toast.error('Please complete all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment gateway processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const orderNum = Math.floor(100000 + Math.random() * 900000).toString();
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
      toast.success('Order placed successfully!');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      toast.error('Payment processing failed. Please try again.');
    }
  };

  if (items.length === 0 && !successModalOpen) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-heading mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-slate-muted mb-6">
          You don't have any items in your cart to proceed with checkout.
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
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Protected Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-heading tracking-tight mt-1">
            Shipping & Payment
          </h1>
        </div>

        {/* Authenticated user badge */}
        <div className="flex items-center gap-2.5 bg-white border border-border rounded-xl px-3.5 py-2 shadow-soft">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-6 h-6 rounded-md object-cover border border-slate-200"
          />
          <div className="text-xs">
            <span className="text-slate-400">Authenticated: </span>
            <span className="font-semibold text-slate-800">{user?.username}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Columns (Form) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-base font-semibold text-slate-heading">
                Shipping Address
              </h2>
            </div>
            <AddressForm
              formData={addressData}
              onChange={handleAddressChange}
              errors={addressErrors}
            />
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-base font-semibold text-slate-heading">
                Payment Method
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
            checkoutButtonText={`Pay $${total.toFixed(2)}`}
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
