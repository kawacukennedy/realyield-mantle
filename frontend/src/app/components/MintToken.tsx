'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import toast from 'react-hot-toast';

// Mock contract ABI and address
const assetTokenizerAddress = '0x...'; // Replace with deployed address
const assetTokenizerAbi = [
  // Add ABI here
];

export default function MintToken() {
  const [metadataURI, setMetadataURI] = useState('');
  const [amount, setAmount] = useState(1);
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();

  const handleMint = () => {
    writeContract({
      address: assetTokenizerAddress,
      abi: assetTokenizerAbi,
      functionName: 'mintAsset',
      args: ['0x...', amount, metadataURI, '0x...', '0x...'], // Mock args
    });
  };

  if (isSuccess) {
    toast.success('Token minted successfully!');
  }

  if (isError) {
    toast.error('Minting failed!');
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Mint Asset Token</h2>
      <input
        type="text"
        placeholder="Metadata URI"
        value={metadataURI}
        onChange={(e) => setMetadataURI(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleMint}
        disabled={isPending || !metadataURI}
        className="w-full bg-purple-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {isPending ? 'Minting...' : 'Mint Token'}
      </button>
    </div>
  );
}