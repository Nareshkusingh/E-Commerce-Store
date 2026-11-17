import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { User, Mail, Shield, Package, LogOut, CheckCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="space-y-8">
        {/* User Header Card */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={user?.avatar}
              alt={user?.displayName || user?.username}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-1 border border-emerald-100">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified Account</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {user?.displayName || user?.username}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            icon={LogOut}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
          >
            Sign Out
          </Button>
        </div>

        {/* Account Details & Recent Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Overview */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <span>Personal Details</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Username</span>
                <span className="font-semibold text-slate-800">{user?.username}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email Address</span>
                <span className="font-semibold text-slate-800">{user?.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Security Status</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> Standard 256-bit encryption
                </span>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-500" />
              <span>Order History</span>
            </h2>

            <div className="divide-y divide-slate-100">
              <div className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">Order #ROY-92841</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-100">
                      Delivered
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> May 12, 2026 &bull; 2 items
                  </span>
                </div>
                <span className="font-bold text-slate-900">$132.25</span>
              </div>

              <div className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">Order #ROY-81920</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium">
                      Archived
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> February 28, 2026 &bull; 1 item
                  </span>
                </div>
                <span className="font-bold text-slate-900">$55.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
