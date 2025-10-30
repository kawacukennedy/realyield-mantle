'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';

// Mock vault contract
const vaultAddress = '0x...';
const vaultAbi = [];

export default function VaultActions() {
  const [amount, setAmount] = useState('');
  const { writeContract, isPending } = useWriteContract();

  const handleDeposit = () => {
    writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: 'deposit',
      args: [parseEther(amount)],
    });
  };

  const handleWithdraw = () => {
    writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: 'withdraw',
      args: [parseEther(amount), 'mock-proof'],
    });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Vault Actions</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleDeposit}
        disabled={isPending}
        className="w-full bg-green-500 text-white py-2 px-4 rounded mb-2"
      >
        Deposit
      </button>
      <button
        onClick={handleWithdraw}
        disabled={isPending}
        className="w-full bg-red-500 text-white py-2 px-4 rounded"
      >
        Withdraw
      </button>
    </div>
  );
}