import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-soft">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-border text-primary mx-auto flex items-center justify-center mb-6">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          404 Error
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-heading tracking-tight mt-1 mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-muted mb-8 leading-relaxed">
          The page you're searching for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" className="w-full" icon={ArrowLeft}>
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
