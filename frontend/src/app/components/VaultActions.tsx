'use client';

import { useState } from 'react';
import { useWriteContract, useEstimateGas } from 'wagmi';
import { parseEther } from 'viem';
import Modal from './Modal';

// Mock vault contract
const vaultAddress = '0x...';
const vaultAbi: readonly any[] = [];

export default function VaultActions() {
  const [amount, setAmount] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const { writeContract, isPending } = useWriteContract();

  const { data: gasEstimate } = useEstimateGas({
    to: vaultAddress,
    data: '0x', // Mock
  });

  const handleAction = (type: 'deposit' | 'withdraw') => {
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === 'deposit') {
      writeContract({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'deposit',
        args: [parseEther(amount)],
      });
    } else {
      writeContract({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'withdraw',
        args: [parseEther(amount), 'mock-proof'],
      });
    }
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Vault Actions</h2>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
      />
      {gasEstimate && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Estimated Gas: {gasEstimate.toString()}</p>
      )}
      <button
        onClick={() => handleAction('deposit')}
        disabled={isPending || !amount}
        className="w-full bg-green-500 text-white py-2 px-4 rounded mb-2 disabled:opacity-50"
      >
        Deposit
      </button>
      <button
        onClick={() => handleAction('withdraw')}
        disabled={isPending || !amount}
        className="w-full bg-red-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        Withdraw
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action">
        <p>Are you sure you want to {actionType} {amount} tokens?</p>
        <div className="flex justify-end mt-4">
          <button onClick={() => setModalOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={confirmAction} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        </div>
      </Modal>
    </div>
  );
}