'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [kycStatus, setKycStatus] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">RealYield</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {!isConnected ? (
          <div>
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
        ) : (
          <div>
            <p>Connected: {address}</p>
            <button
              onClick={() => disconnect()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded mb-4"
            >
              Disconnect
            </button>
            {!kycStatus ? (
              <button
                onClick={() => setKycStatus(true)}
                className="w-full bg-green-500 text-white py-2 px-4 rounded"
              >
                Complete KYC
              </button>
            ) : (
              <p>KYC Approved</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
