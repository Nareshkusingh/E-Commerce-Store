import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'roy_cart_items';
const PROMO_STORAGE_KEY = 'roy_applied_promo';

export function CartProvider({ children }) {
  const toast = useToast();

  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed reading cart from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(() => {
    return localStorage.getItem(PROMO_STORAGE_KEY) || '';
  });
  const [discountPercent, setDiscountPercent] = useState(() => {
    return localStorage.getItem(PROMO_STORAGE_KEY) === 'WELCOME10' || localStorage.getItem(PROMO_STORAGE_KEY) === 'SAVE10' ? 10 : 0;
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed writing cart to localStorage', e);
    }
  }, [items]);

  // Save promo to localStorage
  useEffect(() => {
    if (promoCode) {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }, [promoCode]);

  /**
   * Add item to cart
   */
  const addToCart = (product, quantity = 1, showToast = true) => {
    if (!product || !product.id) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price),
            image: product.image,
            category: product.category,
            quantity: quantity,
          },
        ];
      }
    });

    if (showToast) {
      toast.success(`Added "${product.title.slice(0, 24)}..." to cart`);
    }
  };

  /**
   * Remove item completely from cart
   */
  const removeFromCart = (productId, showToast = true) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.id === productId);
      const filtered = prevItems.filter((item) => item.id !== productId);
      if (showToast && itemToRemove) {
        toast.info(`Removed "${itemToRemove.title.slice(0, 24)}..." from cart`);
      }
      return filtered;
    });
  };

  /**
   * Update quantity by delta (+1 or -1)
   */
  const updateQuantity = (productId, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  /**
   * Set specific quantity
   */
  const setQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Clear all items in cart
   */
  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercent(0);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(PROMO_STORAGE_KEY);
  };

  /**
   * Apply discount promo code
   */
  const applyPromo = (code) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'WELCOME10' || formatted === 'SAVE10') {
      setPromoCode(formatted);
      setDiscountPercent(10);
      toast.success('Promo applied: 10% discount added.');
      return { success: true, message: '10% discount applied!' };
    } else {
      toast.error('Invalid promo code');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
    toast.info('Promo code removed');
  };

  // Calculations
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const discountedSubtotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  // Free shipping threshold = $50
  const freeShippingThreshold = 50;
  const isFreeShipping = discountedSubtotal >= freeShippingThreshold || items.length === 0;
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : 9.99;

  // Estimated tax (8%)
  const tax = useMemo(() => {
    return items.length === 0 ? 0 : Number((discountedSubtotal * 0.08).toFixed(2));
  }, [discountedSubtotal, items.length]);

  const total = useMemo(() => {
    if (items.length === 0) return 0;
    return Number((discountedSubtotal + shipping + tax).toFixed(2));
  }, [discountedSubtotal, shipping, tax, items.length]);

  const value = {
    items,
    totalItems,
    subtotal,
    discountPercent,
    discountAmount,
    discountedSubtotal,
    shipping,
    freeShippingThreshold,
    isFreeShipping,
    tax,
    total,
    promoCode,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
    toggleDrawer: () => setIsDrawerOpen((prev) => !prev),
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
