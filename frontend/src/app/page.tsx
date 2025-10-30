'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, Upload, Coins, Vault, BarChart3, HelpCircle } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import dynamic from 'next/dynamic';

// Dynamically import components that use wagmi to avoid SSR issues
const KYCSection = dynamic(() => import('./components/KYCSection'), { ssr: false });
const AssetUpload = dynamic(() => import('./components/AssetUpload'), { ssr: false });
const MintToken = dynamic(() => import('./components/MintToken'), { ssr: false });
const VaultActions = dynamic(() => import('./components/VaultActions'), { ssr: false });
const Dashboard = dynamic(() => import('./components/Dashboard'), { ssr: false });
const Referrals = dynamic(() => import('./components/Referrals'), { ssr: false });

const ThemeToggle = dynamic(() => import('./components/ThemeToggle'), { ssr: false });
const Modal = dynamic(() => import('./components/Modal'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [kycStatus, setKycStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('kyc');
  const [showTutorial, setShowTutorial] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('tutorialShown');
    }
    return false;
  });

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">RealYield</h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Connect Wallet</h2>
          <button
            onClick={() => handleConnect(metaMask())}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded mb-2"
          >
            Connect MetaMask
          </button>
          <button
            onClick={() => handleConnect(walletConnect({ projectId: 'your-project-id' }))}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Connect WalletConnect
          </button>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mr-4">RealYield</h1>
          <HelpCircle
            data-tooltip-id="help-tooltip"
            data-tooltip-content="RealYield is a platform for tokenizing real-world assets into yield-bearing vaults on Mantle blockchain."
            className="cursor-pointer"
            size={24}
          />
        </div>
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <p>Connected: {address}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('kyc')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'kyc' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            <Shield className="mr-2" size={16} />
            KYC
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            <Upload className="mr-2" size={16} />
            Upload Asset
          </button>
          <button
            onClick={() => setActiveTab('mint')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'mint' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            <Coins className="mr-2" size={16} />
            Mint Token
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'vault' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            <Vault className="mr-2" size={16} />
            Vault Actions
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            <BarChart3 className="mr-2" size={16} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex items-center py-2 px-4 rounded ${activeTab === 'referrals' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            Referrals
          </button>
        </div>
        {activeTab === 'kyc' && <KYCSection kycStatus={kycStatus} setKycStatus={setKycStatus} />}
        {activeTab === 'upload' && <AssetUpload />}
        {activeTab === 'mint' && <MintToken />}
        {activeTab === 'vault' && <VaultActions />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'referrals' && <Referrals />}
      </motion.div>
      <Toaster />
      <Tooltip id="help-tooltip" />
      <Modal isOpen={showTutorial} onClose={() => { setShowTutorial(false); localStorage.setItem('tutorialShown', 'true'); }} title="Welcome to RealYield">
        <div className="text-center">
          <p className="mb-4">Welcome! RealYield helps you tokenize real-world assets into yield-bearing vaults.</p>
          <p className="mb-4">Start by connecting your wallet and completing KYC.</p>
          <button
            onClick={() => { setShowTutorial(false); localStorage.setItem('tutorialShown', 'true'); }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Get Started
          </button>
        </div>
      </Modal>
      <Footer />
    </div>
  );
}
