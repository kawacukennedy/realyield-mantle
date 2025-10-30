'use client';

import { useAccount } from 'wagmi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import TransactionHistory from './TransactionHistory';

const yieldData = [
  { month: 'Jan', yield: 100 },
  { month: 'Feb', yield: 120 },
  { month: 'Mar', yield: 150 },
  { month: 'Apr', yield: 180 },
];

const balanceData = [
  { asset: 'Asset1', balance: 500 },
  { asset: 'Asset2', balance: 300 },
  { asset: 'Asset3', balance: 200 },
];

export default function Dashboard() {
  const { address } = useAccount();

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg mb-2">Wallet Address</h3>
          <p className="text-sm text-gray-600">{address}</p>
        </div>
        <div>
          <h3 className="text-lg mb-2">Vault Balance</h3>
          <p className="text-2xl font-bold">1,000 MOCK</p>
        </div>
        <div>
          <h3 className="text-lg mb-2">Yield Accrued</h3>
          <p className="text-2xl font-bold text-green-600">150 MOCK</p>
        </div>
        <div>
          <h3 className="text-lg mb-2">Portfolio Exposure</h3>
          <p className="text-2xl font-bold">85%</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg mb-4">Yield Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="yield" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <h3 className="text-lg mb-4">Asset Balances</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="asset" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="balance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <TransactionHistory />
      </div>
    </div>
  );
}