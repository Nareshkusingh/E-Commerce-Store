import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export default function Footer() {
  const features = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      desc: 'On all domestic orders over $50',
    },
    {
      icon: RefreshCw,
      title: '30-Day Easy Returns',
      desc: 'Hassle-free exchanges & returns',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure Payment',
      desc: '256-bit encrypted checkout',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      desc: 'Instant help whenever you need',
    },
  ];

  return (
    <footer className="mt-20 bg-white border-t border-border">
      {/* Assurances Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-border flex items-center justify-center flex-shrink-0 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-heading">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-muted mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-soft">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-heading">
                AURA
              </span>
            </div>
            <p className="text-xs text-slate-muted max-w-sm leading-relaxed">
              Crafted for modern simplicity. Designed as a production-grade single page application showcasing minimalist aesthetics, seamless cart interactions, and high-performance state management.
            </p>
            <div className="text-xs text-slate-400">
              Powered by <span className="text-slate-600 font-medium">FakeStoreAPI</span> &middot; React 18+ &middot; Vite
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-heading mb-3">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/?category=electronics" className="hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=jewelery" className="hover:text-primary transition-colors">
                  Jewelry & Accessories
                </Link>
              </li>
              <li>
                <Link to="/?category=men's clothing" className="hover:text-primary transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=women's clothing" className="hover:text-primary transition-colors">
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-heading mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-primary transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-heading mb-3">
              Demo Credentials
            </h5>
            <div className="bg-slate-50 border border-border rounded-xl p-3 text-xs space-y-1 text-slate-600">
              <p>User: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono">mor_2314</code></p>
              <p>Pass: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono">83r5^_</code></p>
              <p className="text-[11px] text-slate-400 pt-1">One-click auto-fill available on login page</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} AURA Minimalist Store. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span>&middot;</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span>&middot;</span>
            <span className="hover:text-slate-600 cursor-pointer">Security</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
