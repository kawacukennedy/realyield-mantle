'use client';

import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './components/Button';
import Modal from './components/Modal';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';

export default function Landing() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setShowWalletModal(false);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-mantle-blue">RealYield</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button onClick={() => setShowWalletModal(true)}>
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-semibold mb-4"
        >
          Compliant On-Chain Yield Vaults for Real-World Assets
        </motion.h1>
        <p className="text-body mb-8 max-w-2xl mx-auto">
          Tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle.
        </p>
        <Button size="lg" onClick={() => setShowWalletModal(true)}>
          Connect Wallet
        </Button>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <h2 className="text-h2 font-semibold text-center mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-panel p-6 rounded-lg text-center cardLift"
          >
            <div className="w-16 h-16 bg-mantle-blue rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">1</div>
            <h3 className="text-lg font-semibold mb-2">Tokenize Assets</h3>
            <p className="text-muted">Upload and tokenize real-world assets with custody settlement.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-panel p-6 rounded-lg text-center"
          >
            <div className="w-16 h-16 bg-mantle-green rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">2</div>
            <h3 className="text-lg font-semibold mb-2">Pool in Vaults</h3>
            <p className="text-muted">Deposit assets into KYC-gated yield vaults for passive income.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-panel p-6 rounded-lg text-center"
          >
            <div className="w-16 h-16 bg-mantle-green rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">3</div>
            <h3 className="text-lg font-semibold mb-2">Earn Yield</h3>
            <p className="text-muted">Receive audited yield distributions automatically.</p>
          </motion.div>
        </div>
      </section>

      {/* Vault Explorer Preview */}
      <section className="py-20 px-6 bg-panel">
        <h2 className="text-h2 font-semibold text-center mb-12">Top Vaults</h2>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <select className="p-2 bg-bg-dark border rounded">
            <option>APY: High to Low</option>
            <option>APY: Low to High</option>
          </select>
          <select className="p-2 bg-bg-dark border rounded">
            <option>Risk: All</option>
            <option>Risk: Low</option>
            <option>Risk: Medium</option>
            <option>Risk: High</option>
          </select>
          <select className="p-2 bg-bg-dark border rounded">
            <option>Asset Type: All</option>
            <option>Real Estate</option>
            <option>Bonds</option>
            <option>Invoices</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-bg-dark p-6 rounded-lg cardLift">
            <h3 className="text-lg font-semibold mb-2">Real Estate Vault</h3>
            <p className="text-muted">TVL: $1,000,000 | APY: 8.5% | Risk: Medium</p>
            <Button className="mt-4">Deposit</Button>
          </div>
          <div className="bg-bg-dark p-6 rounded-lg cardLift">
            <h3 className="text-lg font-semibold mb-2">Bond Vault</h3>
            <p className="text-muted">TVL: $500,000 | APY: 5.2% | Risk: Low</p>
            <Button className="mt-4">Deposit</Button>
          </div>
          <div className="bg-bg-dark p-6 rounded-lg cardLift">
            <h3 className="text-lg font-semibold mb-2">Invoice Vault</h3>
            <p className="text-muted">TVL: $300,000 | APY: 6.8% | Risk: Medium</p>
            <Button className="mt-4">Deposit</Button>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-h2 font-semibold mb-12">Security & Compliance</h2>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">✓</div>
            <p>KYC Required</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">🔒</div>
            <p>ZK Privacy</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-mantle-blue rounded-full mx-auto mb-4 flex items-center justify-center">🏦</div>
            <p>Custodial Settlement</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-panel text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/create-asset">Create Asset</Link></li>
                <li><Link href="/vault">Vaults</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted">
                <li><a href="#">Docs</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>
          <p className="text-muted">© 2024 RealYield. All rights reserved.</p>
        </div>
      </footer>

      {/* Wallet Modal */}
      <Modal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} title="Connect Wallet">
        <div className="space-y-4">
          <Button onClick={() => handleConnect(metaMask())} className="w-full">
            MetaMask
          </Button>
          <Button onClick={() => handleConnect(walletConnect({ projectId: 'your-project-id' }))} variant="secondary" className="w-full">
            WalletConnect
          </Button>
        </div>
      </Modal>

      <Toast />
    </div>
  );
}
