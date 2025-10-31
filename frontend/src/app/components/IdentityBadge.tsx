import React from 'react';
import { CheckCircle, AlertCircle, Clock, Wallet, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from './Badge';

interface IdentityBadgeProps {
  status: 'verified' | 'pending' | 'expired' | 'revoked';
  type: 'wallet' | 'kyc';
  address?: string;
  showAddress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function IdentityBadge({
  status,
  type,
  address,
  showAddress = true,
  size = 'md',
  animated = false
}: IdentityBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case 'verified':
        return type === 'kyc' ? Shield : Wallet;
      case 'pending':
        return Clock;
      case 'expired':
      case 'revoked':
        return AlertTriangle;
      default:
        return AlertCircle;
    }
  };

  const getVariant = (): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'warning';
      case 'expired':
      case 'revoked':
        return 'danger';
      default:
        return 'default';
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

  const IconComponent = getIcon();

  const badgeContent = (
    <div className="flex items-center gap-2">
      <IconComponent size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      <span className="font-medium">{getText()}</span>
      {address && showAddress && (
        <span className="text-text-muted font-mono text-xs">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Badge variant={getVariant()} size={size} animated={animated}>
          {badgeContent}
        </Badge>
      </motion.div>
    );
  }

  return (
    <Badge variant={getVariant()} size={size}>
      {badgeContent}
    </Badge>
  );
}