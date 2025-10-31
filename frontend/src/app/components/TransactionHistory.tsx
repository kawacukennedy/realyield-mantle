'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, TrendingUp, Coins, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { motion } from 'framer-motion';

const mockTransactions = [
  { id: 1, type: 'Deposit', amount: '100 MOCK', date: '2023-10-01', status: 'Success', hash: '0x1234...abcd' },
  { id: 2, type: 'Withdraw', amount: '50 MOCK', date: '2023-10-05', status: 'Success', hash: '0x5678...efgh' },
  { id: 3, type: 'Yield', amount: '10 MOCK', date: '2023-10-10', status: 'Success', hash: '0x9abc...ijkl' },
  { id: 4, type: 'Mint', amount: '200 MOCK', date: '2023-10-15', status: 'Pending', hash: '0xdef0...mnop' },
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Deposit': return <ArrowDownLeft size={16} className="text-success" />;
      case 'Withdraw': return <ArrowUpRight size={16} className="text-warning" />;
      case 'Yield': return <TrendingUp size={16} className="text-primary" />;
      case 'Mint': return <Coins size={16} className="text-secondary" />;
      default: return <CheckCircle size={16} className="text-text-muted" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle size={14} className="text-success" />;
      case 'Pending': return <Clock size={14} className="text-warning" />;
      case 'Failed': return <XCircle size={14} className="text-danger" />;
      default: return <Clock size={14} className="text-text-muted" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">All Types</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Yield">Yield</option>
          <option value="Mint">Mint</option>
        </select>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search size={24} className="text-text-muted" />
              </div>
              <p className="text-text-muted">No transactions found</p>
            </CardContent>
          </Card>
        ) : (
          filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text">{tx.type}</span>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(tx.status)}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              tx.status === 'Success' ? 'bg-success/10 text-success' :
                              tx.status === 'Pending' ? 'bg-warning/10 text-warning' :
                              'bg-danger/10 text-danger'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-text-muted">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text">{tx.amount}</p>
                      <p className="text-xs text-text-muted font-mono">{tx.hash}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}