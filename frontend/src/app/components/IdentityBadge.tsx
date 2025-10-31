import React from 'react';

interface IdentityBadgeProps {
  address: string;
  kycVerified?: boolean;
}

export default function IdentityBadge({ address, kycVerified = false }: IdentityBadgeProps) {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
        {address.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-sm">{shortAddress}</span>
      {kycVerified && (
        <span className="text-xs bg-success text-white px-2 py-1 rounded">KYC</span>
      )}
    </div>
  );
}