'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import Modal from './Modal';

// Mock contracts
const vaultAddress = '0x...';
const vaultAbi: readonly any[] = [];

export default function VaultPage() {
  const { isConnected } = useAccount();
  const [depositType, setDepositType] = useState<'fiat' | 'stablecoin'>('stablecoin');
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { writeContract, isPending } = useWriteContract();

  const handleDeposit = () => {
    if (!isConnected) return;
    setModalOpen(true);
  };

  const confirmDeposit = () => {
    if (depositType === 'stablecoin') {
      writeContract({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'depositAsset',
        args: [1], // mock assetId
      });
    } else {
      // Fiat flow: show transfer instructions
      alert('Fiat deposit: Transfer to custodian account');
    }
    setModalOpen(false);
  };

  const handleWithdraw = () => {
    setWithdrawModalOpen(true);
  };

  const confirmWithdraw = () => {
    writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: 'requestWithdrawal',
      args: [parseInt(withdrawAmount)], // shares
    });
    setWithdrawModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-panel p-6 rounded-lg mb-6">
        <h2 className="text-2xl mb-2">Vault Name</h2>
        <p>TVL: $100,000 | APY: 8.5% | Jurisdiction: US | Risk Score: 3</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg mb-4">Action Buttons</h3>
          <button onClick={handleDeposit} className="w-full mb-2 px-4 py-2 bg-primary text-white rounded">Deposit — requires KYC</button>
          <button onClick={handleWithdraw} className="w-full mb-2 px-4 py-2 bg-secondary text-white rounded">Withdraw</button>
          <button className="w-full mb-2 px-4 py-2 bg-ghost text-white rounded">View Terms</button>
          <button className="w-full px-4 py-2 bg-ghost text-white rounded">Audit Reports</button>
        </div>

        <div className="bg-panel p-4 rounded-lg">
          <h3 className="text-lg mb-4">Holdings</h3>
          <p>Assets backing vault</p>
          {/* Table of assets */}
        </div>
      </div>

      <div className="bg-panel p-4 rounded-lg mb-6">
        <h3 className="text-lg mb-4">Yield Schedule & History</h3>
        {/* Charts */}
      </div>

      <div className="bg-panel p-4 rounded-lg">
        <h3 className="text-lg mb-4">Withdrawal Queue</h3>
        <p>Expected fulfillment time: 24 hours</p>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Deposit">
        <div className="mb-4">
          <label className="block mb-2">Deposit Type</label>
          <select value={depositType} onChange={(e) => setDepositType(e.target.value as 'fiat' | 'stablecoin')} className="w-full p-2 bg-panel border rounded">
            <option value="fiat">Fiat (Custodial)</option>
            <option value="stablecoin">Stablecoin</option>
          </select>
        </div>
        <p className="mb-4">Estimate shares: 100</p>
        <button onClick={confirmDeposit} disabled={isPending} className="px-4 py-2 bg-primary text-white rounded">
          {isPending ? 'Depositing...' : 'Sign Deposit Tx'}
        </button>
      </Modal>

      <Modal isOpen={withdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} title="Withdraw">
        <div className="mb-4">
          <label className="block mb-2">Shares to Withdraw</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full p-2 bg-panel border rounded"
          />
        </div>
        <button onClick={confirmWithdraw} disabled={isPending} className="px-4 py-2 bg-primary text-white rounded">
          {isPending ? 'Withdrawing...' : 'Request Withdrawal'}
        </button>
      </Modal>
    </div>
  );
}