'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '../components/Button';
import Breadcrumb from '../components/Breadcrumb';

const Dashboard = dynamic(() => import('../components/Dashboard'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-text p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard' }
      ]} />
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/create-asset">
            <Button variant="outline">Create Asset</Button>
          </Link>
        </div>
      </header>
      <Dashboard />
    </div>
  );
}