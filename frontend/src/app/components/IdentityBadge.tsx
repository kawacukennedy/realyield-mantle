import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface IdentityBadgeProps {
  status: 'verified' | 'pending' | 'expired' | 'revoked';
  type: 'wallet' | 'kyc';
  address?: string;
}

export default function IdentityBadge({ status, type, address }: IdentityBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} className="text-success" />;
      case 'pending':
        return <Clock size={16} className="text-muted" />;
      case 'expired':
      case 'revoked':
        return <AlertCircle size={16} className="text-danger" />;
      default:
        return null;
    }
  };

  const getText = () => {
    switch (status) {
      case 'verified':
        return type === 'kyc' ? 'KYC Verified' : 'Wallet Connected';
      case 'pending':
        return type === 'kyc' ? 'KYC Pending' : 'Connecting...';
      case 'expired':
        return 'Expired';
      case 'revoked':
        return 'Revoked';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-panel rounded-full text-sm">
      {getIcon()}
      <span>{getText()}</span>
      {address && <span className="text-muted">{address.slice(0, 6)}...{address.slice(-4)}</span>}
    </div>
  );
}