'use client';

import { useState, useMemo } from 'react';

const mockTransactions = [
  { id: 1, type: 'Deposit', amount: '100 MOCK', date: '2023-10-01', status: 'Success' },
  { id: 2, type: 'Withdraw', amount: '50 MOCK', date: '2023-10-05', status: 'Success' },
  { id: 3, type: 'Yield', amount: '10 MOCK', date: '2023-10-10', status: 'Success' },
  { id: 4, type: 'Mint', amount: '200 MOCK', date: '2023-10-15', status: 'Success' },
];

export default function TransactionHistory() {
  const [transactions] = useState(mockTransactions);
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx =>
      (filter === '' || tx.type.toLowerCase().includes(filter.toLowerCase())) &&
      (typeFilter === '' || tx.type === typeFilter)
    );
  }, [transactions, filter, typeFilter]);

  return (
    <div>
      <h3 className="text-lg mb-4">Transaction History</h3>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Yield">Yield</option>
          <option value="Mint">Mint</option>
        </select>
      </div>
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
            {filteredTransactions.map((tx) => (
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