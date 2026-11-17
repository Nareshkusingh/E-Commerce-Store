import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export default function Footer() {
  const assurances = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      desc: 'Complimentary on orders above $50',
    },
    {
      icon: RefreshCw,
      title: '30-Day Effortless Returns',
      desc: 'Simple return & exchange service',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      desc: '256-bit encrypted transactions',
    },
    {
      icon: Headphones,
      title: 'Customer Care',
      desc: 'Dedicated support Monday to Friday',
    },
  ];

  return (
    <footer className="mt-24 bg-white border-t border-border">
      {/* Assurances */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-border flex items-center justify-center flex-shrink-0 text-slate-800">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
              Roy<span className="text-slate-400 font-normal">.</span>
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Modern essentials crafted with precision. Focused on timeless design, enduring utility, and uncompromising quality.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/?category=electronics" className="hover:text-slate-900 transition-colors">
                  Electronics & Tech
                </Link>
              </li>
              <li>
                <Link to="/?category=jewelery" className="hover:text-slate-900 transition-colors">
                  Fine Jewelry & Silver
                </Link>
              </li>
              <li>
                <Link to="/?category=men's clothing" className="hover:text-slate-900 transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=women's clothing" className="hover:text-slate-900 transition-colors">
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Customer Support
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/cart" className="hover:text-slate-900 transition-colors">
                  Track Order & Bag
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Shipping & Deliveries
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Exchange & Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Help Center & FAQs
                </span>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              About Roy
            </h5>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  About Our Studio
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Sustainability
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-slate-900 transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean copyright */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; 2026 Roy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms</span>
            <span className="hover:text-slate-600 cursor-pointer">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
