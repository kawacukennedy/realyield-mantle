'use client';

import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './components/Card';
import { Upload, Vault, TrendingUp, Shield, Eye, Banknote } from 'lucide-react';
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
      <section className="py-16 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
          >
            Live Vault Statistics
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">$2,500,000</div>
              <div className="text-text-muted">TVL</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-secondary mb-2">7.8%</div>
              <div className="text-text-muted">APY</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-accent mb-2">1,247</div>
              <div className="text-text-muted">Depositors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-success mb-2">$185,000</div>
              <div className="text-text-muted">Yield Distributed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
        >
          How it Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <Card className="text-center h-full hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Upload size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">Tokenize Assets</h3>
                <p className="text-text-muted leading-relaxed">Upload and tokenize real-world assets with custody settlement.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <Card className="text-center h-full hover:border-secondary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Vault size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">Pool in Vaults</h3>
                <p className="text-text-muted leading-relaxed">Deposit assets into KYC-gated yield vaults for passive income.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <Card className="text-center h-full hover:border-accent/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">Earn Yield</h3>
                <p className="text-text-muted leading-relaxed">Receive audited yield distributions automatically.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Vault Explorer Preview */}
      <section className="py-24 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
        >
          Top Vaults
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
            <option>APY: High to Low</option>
            <option>APY: Low to High</option>
          </select>
          <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
            <option>Risk: All</option>
            <option>Risk: Low</option>
            <option>Risk: Medium</option>
            <option>Risk: High</option>
          </select>
          <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
            <option>Asset Type: All</option>
            <option>Real Estate</option>
            <option>Bonds</option>
            <option>Invoices</option>
          </select>
          <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
            <option>Jurisdiction: Any</option>
            <option>US</option>
            <option>EU</option>
          </select>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Card className="h-full group-hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Real Estate</span>
                  <span className="text-success font-semibold">8.5% APY</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text">Premium Real Estate Vault</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">TVL</span>
                    <span className="text-text">$1,000,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Risk</span>
                    <span className="text-warning">Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Jurisdiction</span>
                    <span className="text-text">US</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25">
                  Deposit
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Card className="h-full group-hover:border-secondary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Bonds</span>
                  <span className="text-success font-semibold">5.2% APY</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text">Government Bond Vault</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">TVL</span>
                    <span className="text-text">$500,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Risk</span>
                    <span className="text-success">Low</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Jurisdiction</span>
                    <span className="text-text">EU</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/25">
                  Deposit
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Card className="h-full group-hover:border-accent/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Invoices</span>
                  <span className="text-success font-semibold">6.8% APY</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text">Invoice Financing Vault</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">TVL</span>
                    <span className="text-text">$300,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Risk</span>
                    <span className="text-warning">Medium</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Jurisdiction</span>
                    <span className="text-text">US</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/25">
                  Deposit
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
        >
          Security & Compliance
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <Card className="h-full hover:border-success/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-success to-success/80 rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">KYC Required</h3>
                <p className="text-text-muted leading-relaxed">All participants undergo thorough identity verification for regulatory compliance.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <Card className="h-full hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">ZK Privacy</h3>
                <p className="text-text-muted leading-relaxed">Zero-knowledge proofs ensure privacy while maintaining compliance and security.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <Card className="h-full hover:border-secondary/50 transition-all duration-300">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Banknote size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-text">Custodial Settlement</h3>
                <p className="text-text-muted leading-relaxed">Professional custodians handle asset settlement with institutional-grade security.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

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
