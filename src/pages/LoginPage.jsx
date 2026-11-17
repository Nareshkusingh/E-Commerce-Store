import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  const toast = useToast();

  const redirectUrl = searchParams.get('redirect') || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  const handleFillDemo = () => {
    setUsername('mor_2314');
    setPassword('83r5^_');
    setErrors({});
    setAuthError('');
    toast.info('Demo credentials auto-filled!');
  };

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = 'Username is required';
    }
    if (!password.trim()) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validate()) return;

    try {
      await login(username, password);
      toast.success('Successfully logged in! Welcome back.');
      navigate(redirectUrl, { replace: true });
    } catch (err) {
      console.error('Login failed', err);
      setAuthError(err.message || 'Invalid username or password. Please try again.');
      toast.error('Authentication failed. Check your credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow-soft">
            A
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-heading tracking-tight">
            Sign In to AURA
          </h1>
          <p className="text-xs text-slate-muted">
            Access your orders, saved addresses, and express checkout.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-100 rounded-2xl p-4 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Demo Credentials (FakeStoreAPI)
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-semibold text-primary hover:text-primary-hover bg-white border border-indigo-200 px-2.5 py-1 rounded-lg shadow-soft hover:shadow-soft-md transition-all active:scale-95"
            >
              Fill Demo Credentials
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/80 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Username</span>
              <code className="text-slate-800 font-mono font-semibold">mor_2314</code>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Password</span>
              <code className="text-slate-800 font-mono font-semibold">83r5^_</code>
            </div>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-soft-md">
          {authError && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2 animate-fade-in">
              <KeyRound className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="username"
              placeholder="e.g. mor_2314"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: '' }));
              }}
              error={errors.username}
              icon={User}
              autoComplete="username"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={errors.password}
              icon={Lock}
              autoComplete="current-password"
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-end encrypted session</span>
          </div>
        </div>

        {/* Guest Return */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-800 hover:underline transition-colors"
          >
            &larr; Return to store without signing in
          </Link>
        </div>
      </div>
    </div>
  );
}
