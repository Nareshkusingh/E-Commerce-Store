# AURA — Minimalist Modern E-Commerce SPA

A complete, production-ready E-Commerce Single Page Application (SPA) built with **React 18+**, **React Router DOM (v6/v7)**, **Context API**, and styled with **Tailwind CSS**.

---

## 🚀 Features

### 1. Minimalist Design Language
- **Soft, Clean Palette:**
  - Background: Crisp off-white (`#F8FAFC`)
  - Cards & Surfaces: Pure white (`#FFFFFF`) with subtle soft shadows
  - Primary Accent: Slate blue / Indigo muted (`#4F46E5`)
  - Typography: Dark slate headings (`#0F172A`) and slate body text (`#475569`)
  - Borders: Subtle neutral borders (`#E2E8F0`)
- **Responsive Layout:** Mobile-first design with hamburger navigation, responsive product grids, and slide-out cart drawer.

### 2. Architecture & Global State Management
- **`AuthContext` (`src/context/AuthContext.jsx`):**
  - Manages authentication state, user profile (avatar, name, email), and JWT token storage in `localStorage`.
  - Seamless login/logout flows with automatic redirection to previously attempted protected routes.
- **`CartContext` (`src/context/CartContext.jsx`):**
  - Handles adding items, removing items, updating quantity, and clearing cart.
  - Automatic calculations: subtotal, promo code discounts (`SAVE10`), free shipping progress tracker, and 8% tax.
  - Cart persistence across page reloads via `localStorage`.
  - State controls for the slide-out quick Cart Drawer.
- **`ToastContext` (`src/context/ToastContext.jsx`):**
  - Floating toast notifications system for real-time feedback (item added, quantity adjusted, promo applied, login success/error, checkout confirmation).

### 3. API Integration ([FakeStoreAPI](https://fakestoreapi.com))
- **Products Catalog:** `GET https://fakestoreapi.com/products`
  - Real-time client-side search by title/keywords with debouncing.
  - Category filtering: `electronics`, `jewelery`, `men's clothing`, `women's clothing`.
  - Sorting: Featured, Price (Low to High), Price (High to Low), Highest Rated.
  - Clean skeleton loaders during data fetch.
  - Robust offline fallback dataset if the public API experiences latency.
- **Product Details:** `GET https://fakestoreapi.com/products/:id`
  - High-res image display, star rating badge, category breadcrumbs, full description, quantity selector.
  - "Add to Cart" and "Buy Now" express checkout.
  - Related items section from the same category.
- **Authentication:** `POST https://fakestoreapi.com/auth/login`
  - Demo Credentials:
    - **Username:** `mor_2314`
    - **Password:** `83r5^_`
  - One-click "Fill Demo Credentials" button for instant testing.

### 4. Pages & Routing
- `/` — Product Catalog / Home Page with hero banner, filters, and product grid.
- `/product/:id` — Single Product Details Page.
- `/cart` — Dedicated Shopping Cart Page with line items, quantity controls, and order summary.
- `/login` — Centered login card with validation, demo auto-fill, and error messaging.
- `/checkout` — **Protected Route** (redirects unauthenticated users to login, returns upon success) with shipping address form, test credit card payment, and order confirmation modal.
- `*` — 404 Not Found Page.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── cart/
│   │   ├── CartDrawer.jsx        # Slide-out quick cart drawer
│   │   ├── CartItem.jsx          # Reusable cart row component
│   │   └── OrderSummary.jsx      # Subtotal, shipping, promo & total card
│   ├── checkout/
│   │   ├── AddressForm.jsx       # Shipping address input fields
│   │   ├── PaymentForm.jsx       # Card payment simulation form
│   │   └── OrderSuccessModal.jsx # Order confirmation modal
│   ├── common/
│   │   ├── Badge.jsx             # Category & Rating badges
│   │   ├── Button.jsx            # Reusable button with variants & loading states
│   │   ├── Input.jsx             # Accessible input with error & icon support
│   │   ├── Modal.jsx             # Dialog overlay with backdrop blur
│   │   ├── ScrollToTop.jsx       # Scroll restoration on route transitions
│   │   └── Skeleton.jsx          # Shimmer skeleton loader
│   ├── layout/
│   │   ├── Footer.jsx            # Assurances & footer links
│   │   └── Navbar.jsx            # Sticky header with cart badge & auth menu
│   └── product/
│       ├── ProductCard.jsx       # Clamped title, price, image & add-to-cart
│       ├── ProductFilter.jsx     # Search bar, category pills & sort dropdown
│       ├── ProductGrid.jsx       # Responsive grid with empty & error states
│       └── ProductSkeleton.jsx   # Product card skeleton loader
├── context/
│   ├── AuthContext.jsx           # User authentication & token management
│   ├── CartContext.jsx           # Cart items, persistence, math & drawer state
│   └── ToastContext.jsx          # Global toast notifications
├── hooks/
│   ├── useAuth.js                # Hook to consume AuthContext
│   ├── useCart.js                # Hook to consume CartContext
│   ├── useDebounce.js            # Debounce hook for smooth search queries
│   └── useToast.js               # Hook to trigger toast notifications
├── pages/
│   ├── CartPage.jsx              # Full shopping cart page
│   ├── CheckoutPage.jsx          # Protected checkout page
│   ├── HomePage.jsx              # Product catalog & home page
│   ├── LoginPage.jsx             # Login page with demo credentials
│   ├── NotFoundPage.jsx          # 404 page
│   └── ProductDetailPage.jsx     # Product details & related items
├── routes/
│   ├── AppRoutes.jsx             # React Router route definitions
│   └── ProtectedRoute.jsx        # Authentication route guard
├── services/
│   └── api.js                    # FakeStoreAPI service layer & fallbacks
├── App.jsx                       # Root component with Providers & Layout
├── index.css                     # Tailwind CSS & custom design tokens
└── main.jsx                      # React 18+ root mount
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized bundle in the `dist/` directory.
