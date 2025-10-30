'use client';

import { useState } from 'react';

const mockTransactions = [
  { id: 1, type: 'Deposit', amount: '100 MOCK', date: '2023-10-01', status: 'Success' },
  { id: 2, type: 'Withdraw', amount: '50 MOCK', date: '2023-10-05', status: 'Success' },
  { id: 3, type: 'Yield', amount: '10 MOCK', date: '2023-10-10', status: 'Success' },
];

export default function TransactionHistory() {
  const [transactions] = useState(mockTransactions);

  return (
    <div>
      <h3 className="text-lg mb-4">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="py-2 px-4 border-b">{tx.type}</td>
                <td className="py-2 px-4 border-b">{tx.amount}</td>
                <td className="py-2 px-4 border-b">{tx.date}</td>
                <td className="py-2 px-4 border-b text-green-600">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}