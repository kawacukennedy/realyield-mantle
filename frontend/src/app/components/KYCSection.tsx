'use client';

import { useState } from 'react';
import axios from 'axios';

interface KYCSectionProps {
  kycStatus: boolean;
  setKycStatus: (status: boolean) => void;
}

export default function KYCSection({ kycStatus, setKycStatus }: KYCSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleKYC = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/kyc/attest', {
        userAddress: 'mock-address', // Use actual address from wagmi
      });
      if (response.data.success) {
        setKycStatus(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">KYC Attestation</h2>
      {!kycStatus ? (
        <button
          onClick={handleKYC}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded"
        >
          {loading ? 'Processing...' : 'Complete KYC'}
        </button>
      ) : (
        <p className="text-green-600">KYC Approved</p>
      )}
    </div>
  );
}