'use client';

import { useAccount } from 'wagmi';

export default function Dashboard() {
  const { address } = useAccount();

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Wallet: {address}</p>
      <p>Vault Balance: 0</p>
      <p>Yield Accrued: 0</p>
      {/* Add more metrics */}
    </div>
  );
}