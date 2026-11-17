# Roy. — Modern Minimalist E-Commerce SPA

A complete, production-grade E-Commerce Single Page Application (SPA) named **Roy.** built with **React 18+**, **Vite**, **Tailwind CSS**, **React Router DOM (v6+)**, and **Context API**.

---

## 🌟 Highlights

### 1. Minimalist & Authentic Retail Aesthetic
- **Brand Identity:** **Roy.** — clean, high-contrast typography and subtle layout.
- **Palette:**
  - Background: Soft off-white (`#F8FAFC`)
  - Cards & Surfaces: Pure white (`#FFFFFF`) with subtle borders (`border-slate-200`) and soft shadows (`shadow-sm`)
  - Accent & Buttons: Slate Black / Deep Slate (`#0F172A` / `#1E293B`) with crisp white text
  - Headings: Slate Black (`text-slate-900`)
  - Body & Secondary: Slate Gray (`text-slate-600`)
- **Zero Horizontal Overflow:** Mobile-first layout with smooth transitions and zero horizontal scrollbars (`overflow-x-hidden`).

### 2. Authentication & Session Persistence (`AuthContext`)
- **State:** `user`, `token`, `isAuthenticated`, `isLoading`.
- **Session Persistence:** Complete session management with `localStorage` (`roy_token` and `roy_user`).
- **Standard Login Form:** Clean email/username & password inputs (clean and empty by default, no dummy hints or template credentials).
- **Graceful Error Handling:** Inline error banners and toast notifications for invalid attempts.
- **Instant Logout:** Available in the header profile dropdown and user profile page; immediately purges `localStorage`, resets global state, and redirects to `/login`.
- **Protected Routes:** Both `/checkout` and `/profile` are guarded by `<ProtectedRoute>`. Unauthenticated visitors are directed to `/login?redirect=...` and returned upon authentication.

### 3. Shopping Cart & Checkout (`CartContext`)
- **Global State:** Add items, remove items, adjust quantities (`+` / `-`), clear bag.
- **Slide-out Cart Drawer & Full Cart Page:** Available from anywhere via the live navbar cart button (with live animated counter badge).
- **Accurate Pricing:** Subtotal, standard/express free shipping progress, sales tax (8%), promo codes (`WELCOME10`), and grand total.
- **Order Confirmation:** Multi-step delivery address form, test card payment simulation, and an order confirmation modal with generated Order ID (`ROY-XXXXXX`).

---

## 🧭 Routes & Architecture

```
/               -> Product Catalog with Live Search & Category Filter Pills
/product/:id    -> Single Product Details with Image Zoom, Breadcrumbs & Star Ratings
/cart           -> Shopping Bag Page with Line Items & Order Summary
/login          -> Clean Authentication Card
/checkout       -> Protected Delivery Address & Payment Screen (Auth Required)
/profile        -> Protected Account & Order History Screen (Auth Required)
*               -> 404 Not Found Screen
```

---

## 🛠️ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```
Local dev server runs at: `http://localhost:5173`
