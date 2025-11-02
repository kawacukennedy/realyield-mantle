'use client';

import Link from 'next/link';
import Button from './components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text mb-4">404 - Page Not Found</h1>
        <p className="text-muted mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}