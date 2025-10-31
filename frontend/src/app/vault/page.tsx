'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '../components/Button';

const VaultPage = dynamic(() => import('../components/VaultActions'), { ssr: false });

export default function VaultPageWrapper() {
  return (
    <div className="min-h-screen bg-bg-dark text-text p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vault</h1>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>
      <VaultPage />
    </div>
  );
}