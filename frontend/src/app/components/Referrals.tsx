'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Referrals() {
  const [referralCode] = useState('REALYIELD2024');
  const [referrals] = useState([
    { name: 'Alice', status: 'Active', reward: '10 MOCK' },
    { name: 'Bob', status: 'Pending', reward: '0 MOCK' },
  ]);

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Referral Program</h2>
      <div className="mb-6">
        <h3 className="text-lg mb-2">Your Referral Code</h3>
        <div className="flex items-center">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="p-2 border rounded mr-2 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={copyCode}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Copy
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Share this code with friends. Earn 10 MOCK for each successful referral!
        </p>
      </div>
      <div>
        <h3 className="text-lg mb-4">Your Referrals</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Reward</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{ref.name}</td>
                  <td className="py-2 px-4 border-b">{ref.status}</td>
                  <td className="py-2 px-4 border-b">{ref.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}