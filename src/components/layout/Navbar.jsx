import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import Button from '../common/Button';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, openDrawer } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    toast.info('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { label: 'All Products', to: '/' },
    { label: 'Electronics', to: '/?category=electronics' },
    { label: 'Jewelry', to: '/?category=jewelery' },
    { label: "Men's", to: "/?category=men's clothing" },
    { label: "Women's", to: "/?category=women's clothing" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
        {/* Top Minimal Banner */}
        <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Complimentary worldwide shipping on orders over $50 with code <strong>SAVE10</strong></span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile menu button & Brand */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-soft group-hover:scale-105 transition-transform">
                  A
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-slate-heading leading-tight">
                    AURA
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                    Studio
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide uppercase transition-colors ${
                      isActive && link.to === '/'
                        ? 'text-primary bg-primary-light font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right: Cart, Auth, Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Live Cart Trigger Button */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative p-2.5 rounded-xl border border-border text-slate-700 hover:bg-slate-50 hover:text-primary transition-all focus:outline-none shadow-soft active:scale-95"
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-soft animate-fade-in">
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
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-border bg-white hover:bg-slate-50 transition-colors shadow-soft"
                    aria-expanded={userDropdownOpen}
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-slate-heading">
                      {user.username}
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
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-border shadow-soft-lg z-30 py-2 animate-fade-in">
                        <div className="px-4 py-2.5 border-b border-border">
                          <p className="text-xs font-semibold text-slate-heading truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            @{user.username}
                          </p>
                        </div>

                        <Link
                          to="/cart"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4 text-slate-400" />
                          <span>My Cart ({totalItems})</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="sm" icon={User}>
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pt-2">
              Explore Collections
            </p>
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-border mt-3">
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span>Cart</span>
                </span>
                <span className="bg-primary-light text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems} items
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
