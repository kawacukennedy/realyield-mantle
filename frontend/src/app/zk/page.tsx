'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '../components/Button';

const ZKProofUX = dynamic(() => import('../components/ZKProofUX'), { ssr: false });

export default function ZKPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ZK Proof</h1>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>
      <ZKProofUX />
    </div>
  );
}