'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';
import toast, { Toaster } from 'react-hot-toast';
import KYCSection from './components/KYCSection';
import AssetUpload from './components/AssetUpload';
import MintToken from './components/MintToken';
import VaultActions from './components/VaultActions';
import Dashboard from './components/Dashboard';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [kycStatus, setKycStatus] = useState(false);
  const [activeTab, setActiveTab] = useState('kyc');

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">RealYield</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <p>Connected: {address}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('kyc')}
            className={`py-2 px-4 rounded ${activeTab === 'kyc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            KYC
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-4 rounded ${activeTab === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Upload Asset
          </button>
          <button
            onClick={() => setActiveTab('mint')}
            className={`py-2 px-4 rounded ${activeTab === 'mint' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Mint Token
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`py-2 px-4 rounded ${activeTab === 'vault' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Vault Actions
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-4 rounded ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Dashboard
          </button>
        </div>
        {activeTab === 'kyc' && <KYCSection kycStatus={kycStatus} setKycStatus={setKycStatus} />}
        {activeTab === 'upload' && <AssetUpload />}
        {activeTab === 'mint' && <MintToken />}
        {activeTab === 'vault' && <VaultActions />}
        {activeTab === 'dashboard' && <Dashboard />}
      </div>
      <Toaster />
    </div>
  );
}
