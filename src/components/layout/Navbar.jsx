import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, openDrawer } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    toast.info('You have been logged out.');
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/?search=${encodeURIComponent(navSearch.trim())}`);
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'All Items', to: '/' },
    { label: 'Electronics', to: '/?category=electronics' },
    { label: 'Jewelry', to: '/?category=jewelery' },
    { label: "Men's Apparel", to: "/?category=men's clothing" },
    { label: "Women's Apparel", to: "/?category=women's clothing" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
      {/* Sleek Retail Top Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center">
        <span>Complimentary express delivery on all orders over $50 &bull; 30-day effortless returns</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo "Roy." */}
            <Link to="/" className="flex items-center gap-1.5 group select-none">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-slate-900 font-sans">
                Roy<span className="text-slate-400 font-normal">.</span>
              </span>
            </Link>
          </div>

          {/* Center-Left: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-colors ${
                    isActive && !searchParams.get('category') && link.to === '/'
                      ? 'text-slate-900 bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Search Bar in Header */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs relative ml-auto mr-2"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all"
            />
          </form>

          {/* Right Actions: Cart & Auth */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Live Cart Trigger Button */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative p-2.5 rounded-lg border border-border bg-white text-slate-800 hover:bg-slate-50 transition-all focus:outline-none shadow-sm active:scale-95"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* User Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-border bg-white hover:bg-slate-50 transition-colors shadow-sm"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-6 h-6 rounded-full object-cover border border-slate-200"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-slate-900">
                    {user.displayName || user.username}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-soft-lg z-30 py-2 animate-fade-in">
                      <div className="px-4 py-2.5 border-b border-border">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {user.displayName || user.username}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-slate-400" />
                        <span>My Account & Orders</span>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        <span>Cart ({totalItems})</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pt-4 pb-6 space-y-3 animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </form>

          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-2">
            Categories
          </p>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-border space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-500" />
                    <span>My Account ({user.displayName || user.username})</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <User className="w-4 h-4" />
                <span>Sign In to Account</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
