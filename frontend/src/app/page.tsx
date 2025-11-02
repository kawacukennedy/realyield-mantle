'use client';

import { useState, Suspense, lazy } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './components/Button';
import Modal from './components/Modal';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import LoadingSkeleton from './components/LoadingSkeleton';

// Lazy load heavy sections
const VaultStatsSection = lazy(() => import('./components/VaultStatsSection'));
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection'));
const VaultExplorerSection = lazy(() => import('./components/VaultExplorerSection'));
const SecuritySection = lazy(() => import('./components/SecuritySection'));

export default function Landing() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setShowWalletModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-dark via-bg-dark to-bg-muted text-text">
      {/* Header */}
      <header className="p-6 flex justify-between items-center glass-effect border-b border-white/10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          RealYield
        </h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button onClick={() => setShowWalletModal(true)} className="bg-gradient-to-r from-primary to-accent">
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-shift bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full morph"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full morph" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/10 rounded-full morph" style={{ animationDelay: '4s' }}></div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent leading-tight"
        >
          Compliant On-Chain Yield Vaults for Real-World Assets
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" onClick={() => setShowWalletModal(true)} className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25 heartbeat">
            Connect Wallet
          </Button>
        </motion.div>
      </section>

      {/* Live Vault Stats */}
      <Suspense fallback={
        <section className="py-16 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
          <div className="max-w-6xl mx-auto">
            <LoadingSkeleton width="300px" height="40px" className="mx-auto mb-12" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <LoadingSkeleton width="120px" height="40px" className="mx-auto mb-2" />
                  <LoadingSkeleton width="80px" height="16px" className="mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      }>
        <VaultStatsSection />
      </Suspense>

      {/* How it works */}
      <Suspense fallback={
        <section className="py-24 px-6">
          <LoadingSkeleton width="400px" height="48px" className="mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <LoadingSkeleton width="80px" height="80px" className="rounded-full mx-auto mb-6" />
                <LoadingSkeleton width="200px" height="24px" className="mx-auto mb-4" />
                <LoadingSkeleton width="250px" height="16px" className="mx-auto" />
                <LoadingSkeleton width="200px" height="16px" className="mx-auto" />
              </div>
            ))}
          </div>
        </section>
      }>
        <HowItWorksSection />
      </Suspense>

      {/* Vault Explorer Preview */}
      <Suspense fallback={
        <section className="py-24 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
          <LoadingSkeleton width="300px" height="48px" className="mx-auto mb-12" />
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} width="150px" height="40px" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-bg-card rounded-xl p-6 border border-border">
                <LoadingSkeleton width="120px" height="24px" className="mb-4" />
                <LoadingSkeleton width="200px" height="28px" className="mb-3" />
                <div className="space-y-2 mb-6">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <LoadingSkeleton width="60px" height="16px" />
                      <LoadingSkeleton width="80px" height="16px" />
                    </div>
                  ))}
                </div>
                <LoadingSkeleton width="100%" height="40px" />
              </div>
            ))}
          </div>
        </section>
      }>
        <VaultExplorerSection />
      </Suspense>

      {/* Security & Compliance */}
      <Suspense fallback={
        <section className="py-24 px-6 text-center">
          <LoadingSkeleton width="400px" height="48px" className="mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <LoadingSkeleton width="80px" height="80px" className="rounded-full mx-auto mb-6" />
                <LoadingSkeleton width="150px" height="24px" className="mx-auto mb-4" />
                <LoadingSkeleton width="250px" height="16px" className="mx-auto" />
                <LoadingSkeleton width="200px" height="16px" className="mx-auto" />
              </div>
            ))}
          </div>
        </section>
      }>
        <SecuritySection />
      </Suspense>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-r from-bg-card to-bg-muted border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-6 text-text">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="text-text-muted hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/create-asset" className="text-text-muted hover:text-primary transition-colors">Create Asset</Link></li>
                <li><Link href="/vault" className="text-text-muted hover:text-primary transition-colors">Vaults</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-text">Company</h3>
              <ul className="space-y-3">
                <li><a href="https://github.com/kawacukennedy/realyield-mantle" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-text">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/docs" className="text-text-muted hover:text-primary transition-colors">Docs</a></li>
                <li><a href="/api" className="text-text-muted hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-text">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-text-muted">Powered by</span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-lg">Mantle Network</span>
            </div>
            <p className="text-text-muted">© 2024 RealYield. All rights reserved.</p>
          </div>
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
