'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import TransactionHistory from './TransactionHistory';
import Skeleton from './Skeleton';

interface YieldData {
  month: string;
  yield: number;
}

interface BalanceData {
  asset: string;
  balance: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

export default function Dashboard() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [balanceData, setBalanceData] = useState<BalanceData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setYieldData([
        { month: 'Jan', yield: 100 },
        { month: 'Feb', yield: 120 },
        { month: 'Mar', yield: 150 },
        { month: 'Apr', yield: 180 },
      ]);
      setBalanceData([
        { asset: 'Asset1', balance: 500 },
        { asset: 'Asset2', balance: 300 },
        { asset: 'Asset3', balance: 200 },
      ]);
      setPieData([
        { name: 'Real Estate', value: 400, color: '#0088FE' },
        { name: 'Bonds', value: 300, color: '#00C49F' },
        { name: 'Invoices', value: 200, color: '#FFBB28' },
        { name: 'Other', value: 100, color: '#FF8042' },
      ]);
      setLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      // Mock real-time update
      setYieldData(prev => prev.map(item => ({ ...item, yield: item.yield + Math.random() * 10 })));
      setBalanceData(prev => prev.map(item => ({ ...item, balance: item.balance + Math.random() * 50 })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </div>
        <div className="mt-8">
          <Skeleton height="300px" />
        </div>
      </div>
    );
  }

  const exportData = () => {
    const dataStr = JSON.stringify({ yieldData, balanceData }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'realyield-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Dashboard</h2>
        <button
          onClick={exportData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg mb-2">Wallet Address</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{address}</p>
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
        <h3 className="text-lg mb-4">Asset Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <TransactionHistory />
      </div>
    </div>
  );
}