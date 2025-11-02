'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Users, DollarSign, Calendar, Building, Upload, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { ProgressStepper } from '../../components/ProgressStepper';
import Breadcrumb from '../../components/Breadcrumb';
import Link from 'next/link';

// Mock data - in production, fetch from API
const mockVaultData = {
  id: '1',
  name: 'Premium Real Estate Vault',
  type: 'Real Estate',
  apy: 8.5,
  tvl: 1000000,
  depositors: 150,
  yieldDistributed: 85000,
  strategy: 'Residential Rental Portfolio',
  riskScore: 3,
  custodian: 'Institutional Custodian LLC',
  performance: [
    { date: '2024-01', value: 1000000 },
    { date: '2024-02', value: 1050000 },
    { date: '2024-03', value: 1085000 },
    { date: '2024-04', value: 1120000 },
  ]
};

export default function VaultDetailsPage() {
  const params = useParams();
  const vaultId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [vaultData, setVaultData] = useState(mockVaultData);

  // Mock API call
  useEffect(() => {
    // fetch(`/api/vaults/${vaultId}`)
    //   .then(res => res.json())
    //   .then(data => setVaultData(data));
  }, [vaultId]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deposits', label: 'Deposits' },
    { id: 'withdrawals', label: 'Withdrawals' },
    { id: 'proofs', label: 'Proofs' }
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-text p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: vaultData.name }
      ]} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{vaultData.name}</h1>
              <div className="flex items-center space-x-4 text-text-muted">
                <span className="flex items-center">
                  <Building size={16} className="mr-1" />
                  {vaultData.type}
                </span>
                <span className="flex items-center">
                  <Shield size={16} className="mr-1" />
                  Risk: {vaultData.riskScore}/10
                </span>
                <span className="flex items-center">
                  <Users size={16} className="mr-1" />
                  {vaultData.custodian}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-success mb-1">{vaultData.apy}% APY</div>
              <div className="text-text-muted">Current Yield</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold">${vaultData.tvl.toLocaleString()}</p>
                    <p className="text-text-muted">TVL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-secondary" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{vaultData.depositors}</p>
                    <p className="text-text-muted">Depositors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-accent" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold">${vaultData.yieldDistributed.toLocaleString()}</p>
                    <p className="text-text-muted">Yield Distributed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold">{vaultData.strategy}</p>
                    <p className="text-text-muted">Strategy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-muted hover:text-text hover:border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-text-muted">
                      <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Performance chart would be implemented with Recharts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button onClick={() => setShowDepositModal(true)} className="bg-gradient-to-r from-primary to-accent">
                  <Upload className="mr-2 h-4 w-4" />
                  Deposit
                </Button>
                <Button onClick={() => setShowWithdrawModal(true)} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'deposits' && (
            <Card>
              <CardHeader>
                <CardTitle>Deposit Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Deposit Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Token</label>
                  <select className="w-full p-3 bg-bg-card border border-border rounded-lg text-text">
                    <option>ETH</option>
                    <option>USDC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">KYC Proof</label>
                  <Input type="file" accept=".json,.pdf" />
                  <p className="text-sm text-text-muted mt-1">Upload your KYC attestation proof</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Confirm Deposit
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'withdrawals' && (
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Withdrawal Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZK Proof</label>
                  <select className="w-full p-3 bg-bg-card border border-border rounded-lg text-text">
                    <option>Generate New Proof</option>
                    <option>Use Existing Proof</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary">
                  Preview Transaction
                </Button>
                <Button variant="outline" className="w-full">
                  Withdraw Now
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'proofs' && (
            <Card>
              <CardHeader>
                <CardTitle>ZK Proofs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Proof #1234</p>
                      <p className="text-sm text-text-muted">Generated 2 hours ago</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">Verified</span>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Deposit Modal */}
      <Modal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="Deposit to Vault">
        <div className="space-y-4">
          <ProgressStepper
            steps={[
              { label: 'Amount', completed: true },
              { label: 'Confirm', completed: false },
              { label: 'Complete', completed: false }
            ]}
            currentStep={1}
          />
          <p>Deposit modal content would go here</p>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal isOpen={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} title="Withdraw from Vault">
        <div className="space-y-4">
          <p>Withdraw modal content would go here</p>
        </div>
      </Modal>
    </div>
  );
}