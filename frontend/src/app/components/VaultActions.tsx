'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Clock, FileText, ExternalLink, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Button from './Button';
import Badge from './Badge';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { motion, AnimatePresence } from 'framer-motion';

const vaultAddress = '0x...';
const vaultAbi: readonly any[] = [];

export default function VaultPage() {
  const { isConnected } = useAccount();
  const [depositType, setDepositType] = useState<'fiat' | 'stablecoin'>('stablecoin');
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'holdings' | 'yield' | 'withdrawals'>('overview');
  const { writeContract, isPending } = useWriteContract();

  const handleDeposit = () => {
    if (!isConnected) return;
    setModalOpen(true);
  };

  const confirmDeposit = () => {
    if (depositType === 'stablecoin') {
      writeContract({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'depositAsset',
        args: [1], // mock assetId
      });
      toast.success('Deposit transaction submitted!');
    } else {
      // Fiat flow: show transfer instructions
      toast('Fiat deposit: Please transfer to the custodian account provided.', { icon: 'ℹ️' });
    }
    setModalOpen(false);
  };

  const handleWithdraw = () => {
    setWithdrawModalOpen(true);
  };

  const confirmWithdraw = () => {
    writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: 'requestWithdrawal',
      args: [parseInt(withdrawAmount)], // shares
    });
    setWithdrawModalOpen(false);
  };

  const mockHoldings = [
    { id: '0', valuation: 1000000, status: 'Deposited', cid: 'QmMockCID123...', issuer: 'RealYield Corp' },
    { id: '1', valuation: 500000, status: 'Deposited', cid: 'QmMockCID456...', issuer: 'Asset Manager LLC' },
  ];

  const mockYieldData = [
    { date: '2023-09-01', yield: 100, cumulative: 100 },
    { date: '2023-09-02', yield: 150, cumulative: 250 },
    { date: '2023-09-03', yield: 180, cumulative: 430 },
    { date: '2023-09-04', yield: 220, cumulative: 650 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'holdings', label: 'Holdings', icon: DollarSign },
    { id: 'yield', label: 'Yield History', icon: TrendingUp },
    { id: 'withdrawals', label: 'Withdrawals', icon: Clock },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Vault Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-bg-card to-bg-muted border border-border rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">Premium Real Estate Vault</h1>
            <p className="text-text-muted">High-yield real estate backed securities with institutional custody</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary" animated>8.5% APY</Badge>
            <Badge variant="success">US Jurisdiction</Badge>
            <Badge variant="warning">Medium Risk</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-text">$1,250,000</p>
            <p className="text-sm text-text-muted">Total Value Locked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">$12,500</p>
            <p className="text-sm text-text-muted">Total Yield Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text">24</p>
            <p className="text-sm text-text-muted">Active Depositors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text">98.5%</p>
            <p className="text-sm text-text-muted">Uptime</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-bg-muted p-1 rounded-lg">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTab === tab.id
                  ? 'bg-bg-card text-primary shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-bg-card/50'
              }`}
            >
              <IconComponent size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleDeposit} className="w-full" disabled={!isConnected}>
                    <DollarSign size={16} className="mr-2" />
                    Deposit Funds
                  </Button>
                  <Button onClick={handleWithdraw} variant="secondary" className="w-full" disabled={!isConnected}>
                    Withdraw Funds
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText size={16} className="mr-2" />
                    View Terms & Conditions
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink size={16} className="mr-2" />
                    Audit Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Vault Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Vault Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Liquidity Ratio</span>
                      <span className="font-semibold text-text">95.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Avg. Deposit Size</span>
                      <span className="font-semibold text-text">$52,083</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Custodian</span>
                      <span className="font-semibold text-text">Prime Trust</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted">Last Audit</span>
                      <span className="font-semibold text-text">2024-01-15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'holdings' && (
            <Card>
              <CardHeader>
                <CardTitle>Asset Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHoldings.map((holding, index) => (
                    <motion.div
                      key={holding.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-text">Asset #{holding.id}</p>
                        <p className="text-sm text-text-muted">{holding.issuer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text">${holding.valuation.toLocaleString()}</p>
                        <Badge variant="success" size="sm">{holding.status}</Badge>
                      </div>
                      <a
                        href={`https://ipfs.io/ipfs/${holding.cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === 'yield' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Yield Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockYieldData}>
                      <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00FFB2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" stroke="var(--text-muted)" />
                      <YAxis stroke="var(--text-muted)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="yield"
                        stroke="#00FFB2"
                        fillOpacity={1}
                        fill="url(#yieldGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cumulative Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockYieldData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="date" stroke="var(--text-muted)" />
                      <YAxis stroke="var(--text-muted)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="cumulative" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'withdrawals' && (
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <AlertCircle size={20} className="text-warning" />
                    <div>
                      <p className="font-medium text-text">Processing Queue</p>
                      <p className="text-sm text-text-muted">Expected fulfillment: 24-48 hours</p>
                    </div>
                  </div>
                  <div className="text-center py-8">
                    <Clock size={48} className="text-text-muted mx-auto mb-4" />
                    <p className="text-text-muted">No pending withdrawals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Deposit Funds">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-3">Deposit Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDepositType('fiat')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  depositType === 'fiat'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">Fiat Currency</div>
                <div className="text-sm text-text-muted">Custodial settlement</div>
              </button>
              <button
                onClick={() => setDepositType('stablecoin')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  depositType === 'stablecoin'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">Stablecoin</div>
                <div className="text-sm text-text-muted">Direct on-chain</div>
              </button>
            </div>
          </div>

          <div className="bg-bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-muted">Deposit Amount</span>
              <span className="font-medium text-text">$10,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Estimated Shares</span>
              <span className="font-medium text-text">100.00</span>
            </div>
          </div>

          {depositType === 'fiat' && (
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <p className="text-sm text-text-muted">
                Fiat deposits require KYC verification and will be processed through our custodial partner.
                Settlement typically takes 1-3 business days.
              </p>
            </div>
          )}

          <Button onClick={confirmDeposit} disabled={isPending} className="w-full">
            {isPending ? 'Processing Deposit...' : 'Confirm Deposit'}
          </Button>
        </div>
      </Modal>

      <Modal isOpen={withdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} title="Withdraw Funds">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Shares to Withdraw</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter number of shares"
              className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {withdrawAmount && (
            <div className="bg-bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Shares</span>
                <span className="font-medium text-text">{withdrawAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Estimated Value</span>
                <span className="font-medium text-text">${(parseFloat(withdrawAmount) * 125).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Processing Time</span>
                <span className="font-medium text-text">24-48 hours</span>
              </div>
            </div>
          )}

          <div className="bg-info/10 border border-info/20 p-4 rounded-lg">
            <p className="text-sm text-text-muted">
              Withdrawals are queued and processed in order. You will receive an email notification when your withdrawal is ready.
            </p>
          </div>

          <Button onClick={confirmWithdraw} disabled={isPending || !withdrawAmount} className="w-full">
            {isPending ? 'Processing Withdrawal...' : 'Request Withdrawal'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}